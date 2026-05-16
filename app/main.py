"""
MBURU Marketing Intelligence System — Local AI Operating System
FastAPI backend with Claude API streaming, prompt caching, and analytics.
"""

import json
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from brand_system import MBURU_SYSTEM_PROMPT
from database import (
    add_metrics,
    create_ab_test,
    get_analytics_summary,
    get_content,
    init_db,
    list_content,
    list_metrics,
    resolve_ab_test,
    save_content,
)
from modules import MODULE_PROMPTS, MODULES

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="MBURU Marketing OS", version="2.0.0", lifespan=lifespan)

STATIC_DIR = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# ── Request models ────────────────────────────────────────────────────────────

class GenerateRequest(BaseModel):
    module_id: str
    inputs: dict[str, str]
    model: str = "claude-haiku-4-5-20251001"


class SaveContentRequest(BaseModel):
    module_id: str
    title: str
    content: str
    model: str
    hook: str = ""
    pillar: str = ""
    funnel_stage: str = ""
    format_: str = ""
    notes: str = ""


class AddMetricsRequest(BaseModel):
    content_id: str
    views: int = 0
    saves: int = 0
    shares: int = 0
    comments: int = 0
    dms_generated: int = 0
    free_class_bookings: int = 0
    enrollments: int = 0
    platform: str = "instagram"
    posted_at: str = ""
    notes: str = ""


class CreateABTestRequest(BaseModel):
    test_name: str
    variant_a_id: str
    variant_b_id: Optional[str] = None
    notes: str = ""


class ResolveABTestRequest(BaseModel):
    winner_id: str
    notes: str = ""


class InsightsRequest(BaseModel):
    model: str = "claude-haiku-4-5-20251001"


# ── Helpers ───────────────────────────────────────────────────────────────────

def build_user_prompt(module_id: str, inputs: dict[str, str]) -> str:
    template = MODULE_PROMPTS.get(module_id)
    if not template:
        raise HTTPException(status_code=400, detail=f"Unknown module: {module_id}")
    try:
        return template.format(**{k: v or "—" for k, v in inputs.items()})
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing input field: {e}")


def get_api_client(api_key: str | None = None) -> anthropic.AsyncAnthropic:
    key = api_key or os.getenv("ANTHROPIC_API_KEY")
    if not key:
        raise HTTPException(
            status_code=500,
            detail="ANTHROPIC_API_KEY not set. Add it to your .env file.",
        )
    return anthropic.AsyncAnthropic(api_key=key)


# ── Core routes ───────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def root():
    return HTMLResponse(content=(STATIC_DIR / "index.html").read_text(encoding="utf-8"))


@app.get("/api/health")
async def health():
    return {"status": "ok", "api_key_configured": bool(os.getenv("ANTHROPIC_API_KEY"))}


@app.get("/api/modules")
async def get_modules():
    return [
        {"id": m.id, "name": m.name, "icon": m.icon,
         "description": m.description, "fields": m.fields}
        for m in MODULES
    ]


# ── Content generation ────────────────────────────────────────────────────────

@app.post("/api/generate")
async def generate(request: GenerateRequest):
    client = get_api_client()
    user_prompt = build_user_prompt(request.module_id, request.inputs)

    async def event_stream():
        try:
            async with client.messages.stream(
                model=request.model,
                max_tokens=4096,
                system=[{
                    "type": "text",
                    "text": MBURU_SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }],
                messages=[{"role": "user", "content": user_prompt}],
            ) as stream:
                async for text in stream.text_stream:
                    yield f"data: {json.dumps({'type': 'text', 'text': text})}\n\n"

                message = await stream.get_final_message()
                usage = message.usage
                yield f"data: {json.dumps({'type': 'done', 'usage': {'input': usage.input_tokens, 'output': usage.output_tokens, 'cache_read': getattr(usage, 'cache_read_input_tokens', 0), 'cache_created': getattr(usage, 'cache_creation_input_tokens', 0)}})}\n\n"

        except anthropic.AuthenticationError:
            yield f"data: {json.dumps({'type': 'error', 'text': 'Invalid API key.'})}\n\n"
        except anthropic.RateLimitError:
            yield f"data: {json.dumps({'type': 'error', 'text': 'Rate limit. Esperá un momento.'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'text': str(e)})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Content library ───────────────────────────────────────────────────────────

@app.post("/api/content", status_code=201)
async def create_content(req: SaveContentRequest):
    cid = await save_content(
        module_id=req.module_id,
        title=req.title,
        content=req.content,
        model=req.model,
        hook=req.hook,
        pillar=req.pillar,
        funnel_stage=req.funnel_stage,
        format_=req.format_,
        notes=req.notes,
    )
    return {"id": cid}


@app.get("/api/content")
async def get_content_list():
    return await list_content()


@app.get("/api/content/{content_id}")
async def get_single_content(content_id: str):
    item = await get_content(content_id)
    if not item:
        raise HTTPException(status_code=404, detail="Content not found")
    item["metrics"] = await list_metrics(content_id)
    return item


# ── Metrics ───────────────────────────────────────────────────────────────────

@app.post("/api/metrics", status_code=201)
async def create_metrics(req: AddMetricsRequest):
    mid = await add_metrics(
        content_id=req.content_id,
        views=req.views,
        saves=req.saves,
        shares=req.shares,
        comments=req.comments,
        dms_generated=req.dms_generated,
        free_class_bookings=req.free_class_bookings,
        enrollments=req.enrollments,
        platform=req.platform,
        posted_at=req.posted_at,
        notes=req.notes,
    )
    return {"id": mid}


# ── Analytics ─────────────────────────────────────────────────────────────────

@app.get("/api/analytics")
async def analytics():
    return await get_analytics_summary()


@app.post("/api/analytics/insights")
async def analytics_insights(req: InsightsRequest):
    summary = await get_analytics_summary()
    client = get_api_client()

    def build_insights_prompt(data: dict) -> str:
        totals = data["totals"]
        by_pillar = data["by_pillar"]
        by_module = data["by_module"]
        top = data["top_performers"]

        pillar_lines = "\n".join(
            f"  - {r['pillar']}: {r['posts']} posts | {r['views']} views | {r['saves']} saves | {r['dms']} DMs"
            for r in by_pillar
        ) or "  (sin datos por pilar)"

        module_lines = "\n".join(
            f"  - {r['module_id']}: {r['posts']} generaciones | {r['saves']} saves | {r['dms']} DMs"
            for r in by_module
        ) or "  (sin datos por módulo)"

        top_lines = "\n".join(
            f"  - \"{r['title']}\" ({r['pillar']}): {r['views']} views, {r['saves']} saves, {r['dms']} DMs"
            for r in top[:5]
        ) or "  (ningún post con métricas aún)"

        return f"""Analizá los datos de performance de contenido de MBURU Fitness Center (Paraguay) y generá insights accionables.

RESUMEN DE DATOS:
- Total posts guardados: {totals.get('total_posts', 0)}
- Total mediciones: {totals.get('total_measurements', 0)}
- Total views: {totals.get('total_views', 0)}
- Total saves: {totals.get('total_saves', 0)}
- Total DMs generados: {totals.get('total_dms', 0)}
- Total clases de prueba reservadas: {totals.get('total_bookings', 0)}
- Total inscripciones: {totals.get('total_enrollments', 0)}

POR PILAR:
{pillar_lines}

POR MÓDULO DE CONTENIDO:
{module_lines}

TOP PERFORMERS:
{top_lines}

Generá un análisis estructurado con:

1. **DIAGNÓSTICO RÁPIDO** — Qué está funcionando y qué no en 3 puntos concretos.

2. **PILARES QUE CONVIERTEN** — Qué pilar genera más saves y DMs y por qué.

3. **PILARES A REFORZAR** — Qué pilar está underperforming y qué cambiar.

4. **RECOMENDACIONES DE HOOKS** — Qué categoría de hook deberían usar más basado en los top performers.

5. **PRÓXIMOS 3 CONTENIDOS** — Qué producir esta semana para maximizar performance, con hook sugerido para cada uno.

6. **ALERTA DE A/B TEST** — Un test específico que deberían correr ahora mismo basado en los datos.

Respuesta en español (vos form). Directa, accionable, específica para MBURU."""

    async def stream_insights():
        try:
            prompt = build_insights_prompt(summary)
            async with client.messages.stream(
                model=req.model,
                max_tokens=2048,
                system=[{
                    "type": "text",
                    "text": MBURU_SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }],
                messages=[{"role": "user", "content": prompt}],
            ) as stream:
                async for text in stream.text_stream:
                    yield f"data: {json.dumps({'type': 'text', 'text': text})}\n\n"
                message = await stream.get_final_message()
                usage = message.usage
                yield f"data: {json.dumps({'type': 'done', 'usage': {'input': usage.input_tokens, 'output': usage.output_tokens}})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'text': str(e)})}\n\n"

    return StreamingResponse(
        stream_insights(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── A/B Tests ─────────────────────────────────────────────────────────────────

@app.post("/api/ab-tests", status_code=201)
async def create_test(req: CreateABTestRequest):
    tid = await create_ab_test(req.test_name, req.variant_a_id, req.variant_b_id, req.notes)
    return {"id": tid}


@app.post("/api/ab-tests/{test_id}/resolve")
async def resolve_test(test_id: str, req: ResolveABTestRequest):
    await resolve_ab_test(test_id, req.winner_id, req.notes)
    return {"ok": True}
