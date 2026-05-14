"""
MBURU Marketing Intelligence System — Local AI Operating System
FastAPI backend with Claude API streaming and prompt caching.
"""

import json
import os
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from brand_system import MBURU_SYSTEM_PROMPT
from modules import MODULE_PROMPTS, MODULES

load_dotenv()

app = FastAPI(title="MBURU Marketing OS", version="1.0.0")

STATIC_DIR = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


class GenerateRequest(BaseModel):
    module_id: str
    inputs: dict[str, str]
    model: str = "claude-haiku-4-5-20251001"


def build_user_prompt(module_id: str, inputs: dict[str, str]) -> str:
    template = MODULE_PROMPTS.get(module_id)
    if not template:
        raise HTTPException(status_code=400, detail=f"Unknown module: {module_id}")
    try:
        return template.format(**{k: v or "—" for k, v in inputs.items()})
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing input field: {e}")


@app.get("/", response_class=HTMLResponse)
async def root():
    html_file = STATIC_DIR / "index.html"
    return HTMLResponse(content=html_file.read_text(encoding="utf-8"))


@app.get("/api/modules")
async def get_modules():
    return [
        {
            "id": m.id,
            "name": m.name,
            "icon": m.icon,
            "description": m.description,
            "fields": m.fields,
        }
        for m in MODULES
    ]


@app.post("/api/generate")
async def generate(request: GenerateRequest):
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="ANTHROPIC_API_KEY not set. Add it to your .env file.",
        )

    user_prompt = build_user_prompt(request.module_id, request.inputs)
    client = anthropic.AsyncAnthropic(api_key=api_key)

    async def event_stream():
        try:
            async with client.messages.stream(
                model=request.model,
                max_tokens=4096,
                system=[
                    {
                        "type": "text",
                        "text": MBURU_SYSTEM_PROMPT,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": user_prompt}],
            ) as stream:
                async for text in stream.text_stream:
                    yield f"data: {json.dumps({'type': 'text', 'text': text})}\n\n"

                # Emit usage stats after completion
                message = await stream.get_final_message()
                usage = message.usage
                yield f"data: {json.dumps({'type': 'done', 'usage': {'input': usage.input_tokens, 'output': usage.output_tokens, 'cache_read': getattr(usage, 'cache_read_input_tokens', 0), 'cache_created': getattr(usage, 'cache_creation_input_tokens', 0)}})}\n\n"

        except anthropic.AuthenticationError:
            yield f"data: {json.dumps({'type': 'error', 'text': 'Invalid API key. Check your ANTHROPIC_API_KEY in .env'})}\n\n"
        except anthropic.RateLimitError:
            yield f"data: {json.dumps({'type': 'error', 'text': 'Rate limit reached. Wait a moment and try again.'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'text': str(e)})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


@app.get("/api/health")
async def health():
    has_key = bool(os.getenv("ANTHROPIC_API_KEY"))
    return {"status": "ok", "api_key_configured": has_key}
