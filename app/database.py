"""
MBURU Analytics — SQLite persistence layer.
Stores generated content, post metrics, and A/B tests.
All operations are async via aiosqlite.
"""

import aiosqlite
import uuid
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "data" / "mburu.db"


async def init_db():
    DB_PATH.parent.mkdir(exist_ok=True)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.executescript("""
            CREATE TABLE IF NOT EXISTS content_library (
                id          TEXT PRIMARY KEY,
                module_id   TEXT NOT NULL,
                title       TEXT NOT NULL,
                content     TEXT NOT NULL,
                hook        TEXT,
                pillar      TEXT,
                funnel_stage TEXT,
                format      TEXT,
                model       TEXT,
                created_at  TEXT NOT NULL,
                notes       TEXT
            );

            CREATE TABLE IF NOT EXISTS post_metrics (
                id                   INTEGER PRIMARY KEY AUTOINCREMENT,
                content_id           TEXT NOT NULL REFERENCES content_library(id),
                platform             TEXT DEFAULT 'instagram',
                views                INTEGER DEFAULT 0,
                saves                INTEGER DEFAULT 0,
                shares               INTEGER DEFAULT 0,
                comments             INTEGER DEFAULT 0,
                dms_generated        INTEGER DEFAULT 0,
                free_class_bookings  INTEGER DEFAULT 0,
                enrollments          INTEGER DEFAULT 0,
                posted_at            TEXT,
                measured_at          TEXT NOT NULL,
                notes                TEXT
            );

            CREATE TABLE IF NOT EXISTS ab_tests (
                id              TEXT PRIMARY KEY,
                test_name       TEXT NOT NULL,
                variant_a_id    TEXT NOT NULL REFERENCES content_library(id),
                variant_b_id    TEXT REFERENCES content_library(id),
                winner_id       TEXT REFERENCES content_library(id),
                created_at      TEXT NOT NULL,
                completed_at    TEXT,
                notes           TEXT
            );
        """)
        await db.commit()


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


async def save_content(
    module_id: str,
    title: str,
    content: str,
    model: str,
    hook: str = "",
    pillar: str = "",
    funnel_stage: str = "",
    format_: str = "",
    notes: str = "",
) -> str:
    cid = str(uuid.uuid4())
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT INTO content_library
               (id, module_id, title, content, hook, pillar, funnel_stage, format, model, created_at, notes)
               VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
            (cid, module_id, title, content, hook, pillar, funnel_stage, format_, model, _now(), notes),
        )
        await db.commit()
    return cid


async def list_content(limit: int = 100) -> list[dict]:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT cl.*,
               (SELECT COUNT(*) FROM post_metrics pm WHERE pm.content_id = cl.id) AS metrics_count,
               (SELECT MAX(pm.views) FROM post_metrics pm WHERE pm.content_id = cl.id) AS max_views,
               (SELECT MAX(pm.saves) FROM post_metrics pm WHERE pm.content_id = cl.id) AS max_saves,
               (SELECT MAX(pm.dms_generated) FROM post_metrics pm WHERE pm.content_id = cl.id) AS max_dms
               FROM content_library cl
               ORDER BY cl.created_at DESC LIMIT ?""",
            (limit,),
        ) as cur:
            return [dict(r) for r in await cur.fetchall()]


async def get_content(content_id: str) -> dict | None:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM content_library WHERE id=?", (content_id,)
        ) as cur:
            row = await cur.fetchone()
            return dict(row) if row else None


async def add_metrics(
    content_id: str,
    views: int = 0,
    saves: int = 0,
    shares: int = 0,
    comments: int = 0,
    dms_generated: int = 0,
    free_class_bookings: int = 0,
    enrollments: int = 0,
    platform: str = "instagram",
    posted_at: str = "",
    notes: str = "",
) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute(
            """INSERT INTO post_metrics
               (content_id, platform, views, saves, shares, comments,
                dms_generated, free_class_bookings, enrollments,
                posted_at, measured_at, notes)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
            (
                content_id, platform, views, saves, shares, comments,
                dms_generated, free_class_bookings, enrollments,
                posted_at, _now(), notes,
            ),
        )
        await db.commit()
        return cur.lastrowid


async def list_metrics(content_id: str) -> list[dict]:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM post_metrics WHERE content_id=? ORDER BY measured_at DESC",
            (content_id,),
        ) as cur:
            return [dict(r) for r in await cur.fetchall()]


async def get_analytics_summary() -> dict:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row

        # Overall totals
        async with db.execute("""
            SELECT
                COUNT(DISTINCT cl.id)  AS total_posts,
                COUNT(pm.id)           AS total_measurements,
                SUM(pm.views)          AS total_views,
                SUM(pm.saves)          AS total_saves,
                SUM(pm.shares)         AS total_shares,
                SUM(pm.dms_generated)  AS total_dms,
                SUM(pm.free_class_bookings) AS total_bookings,
                SUM(pm.enrollments)    AS total_enrollments
            FROM content_library cl
            LEFT JOIN post_metrics pm ON pm.content_id = cl.id
        """) as cur:
            totals = dict(await cur.fetchone())

        # By pillar
        async with db.execute("""
            SELECT cl.pillar,
                   COUNT(DISTINCT cl.id) AS posts,
                   COALESCE(SUM(pm.views),0) AS views,
                   COALESCE(SUM(pm.saves),0) AS saves,
                   COALESCE(SUM(pm.dms_generated),0) AS dms
            FROM content_library cl
            LEFT JOIN post_metrics pm ON pm.content_id = cl.id
            WHERE cl.pillar != '' AND cl.pillar IS NOT NULL
            GROUP BY cl.pillar ORDER BY saves DESC
        """) as cur:
            by_pillar = [dict(r) for r in await cur.fetchall()]

        # By module
        async with db.execute("""
            SELECT cl.module_id,
                   COUNT(DISTINCT cl.id) AS posts,
                   COALESCE(SUM(pm.views),0) AS views,
                   COALESCE(SUM(pm.saves),0) AS saves,
                   COALESCE(SUM(pm.dms_generated),0) AS dms
            FROM content_library cl
            LEFT JOIN post_metrics pm ON pm.content_id = cl.id
            GROUP BY cl.module_id ORDER BY saves DESC
        """) as cur:
            by_module = [dict(r) for r in await cur.fetchall()]

        # By funnel stage
        async with db.execute("""
            SELECT cl.funnel_stage,
                   COALESCE(SUM(pm.saves),0) AS saves,
                   COALESCE(SUM(pm.dms_generated),0) AS dms,
                   COALESCE(SUM(pm.free_class_bookings),0) AS bookings,
                   COALESCE(SUM(pm.enrollments),0) AS enrollments
            FROM content_library cl
            LEFT JOIN post_metrics pm ON pm.content_id = cl.id
            WHERE cl.funnel_stage != '' AND cl.funnel_stage IS NOT NULL
            GROUP BY cl.funnel_stage
        """) as cur:
            by_funnel = [dict(r) for r in await cur.fetchall()]

        # Top performers (by saves)
        async with db.execute("""
            SELECT cl.id, cl.title, cl.module_id, cl.pillar, cl.created_at,
                   COALESCE(SUM(pm.views),0) AS views,
                   COALESCE(SUM(pm.saves),0) AS saves,
                   COALESCE(SUM(pm.dms_generated),0) AS dms,
                   COALESCE(SUM(pm.enrollments),0) AS enrollments
            FROM content_library cl
            LEFT JOIN post_metrics pm ON pm.content_id = cl.id
            GROUP BY cl.id
            HAVING saves > 0 OR views > 0
            ORDER BY saves DESC, dms DESC
            LIMIT 10
        """) as cur:
            top_performers = [dict(r) for r in await cur.fetchall()]

        # A/B tests
        async with db.execute("""
            SELECT abt.*,
                   a.title AS variant_a_title,
                   b.title AS variant_b_title,
                   w.title AS winner_title
            FROM ab_tests abt
            JOIN content_library a ON a.id = abt.variant_a_id
            LEFT JOIN content_library b ON b.id = abt.variant_b_id
            LEFT JOIN content_library w ON w.id = abt.winner_id
            ORDER BY abt.created_at DESC LIMIT 20
        """) as cur:
            ab_tests = [dict(r) for r in await cur.fetchall()]

        return {
            "totals": totals,
            "by_pillar": by_pillar,
            "by_module": by_module,
            "by_funnel": by_funnel,
            "top_performers": top_performers,
            "ab_tests": ab_tests,
        }


async def create_ab_test(test_name: str, variant_a_id: str, variant_b_id: str = None, notes: str = "") -> str:
    tid = str(uuid.uuid4())
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO ab_tests (id, test_name, variant_a_id, variant_b_id, created_at, notes) VALUES (?,?,?,?,?,?)",
            (tid, test_name, variant_a_id, variant_b_id, _now(), notes),
        )
        await db.commit()
    return tid


async def resolve_ab_test(test_id: str, winner_id: str, notes: str = ""):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "UPDATE ab_tests SET winner_id=?, completed_at=?, notes=? WHERE id=?",
            (winner_id, _now(), notes, test_id),
        )
        await db.commit()
