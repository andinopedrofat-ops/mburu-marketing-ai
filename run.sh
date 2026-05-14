#!/bin/bash
# MBURU Marketing Intelligence System — Launch Script

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT/app"

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  MBURUCUYA Marketing Intelligence OS   ║"
echo "║  Deep Blue · Yellow · Paraguay         ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check .env
if [ ! -f "$ROOT/.env" ]; then
  echo "⚠  .env not found. Creating from .env.example..."
  cp "$ROOT/.env.example" "$ROOT/.env"
  echo "✎  Edit .env and add your ANTHROPIC_API_KEY, then run again."
  exit 1
fi

# Check API key
if ! grep -q "ANTHROPIC_API_KEY=sk-ant" "$ROOT/.env" 2>/dev/null; then
  echo "⚠  ANTHROPIC_API_KEY not configured in .env"
  echo "   Add: ANTHROPIC_API_KEY=sk-ant-..."
  echo ""
fi

# Install deps if needed
if ! python3 -c "import anthropic, fastapi, uvicorn" 2>/dev/null; then
  echo "📦 Installing dependencies..."
  pip3 install -r "$APP_DIR/requirements.txt" --quiet
fi

echo "🚀 Starting MBURU Marketing OS..."
echo "   → http://localhost:8000"
echo "   → Press Ctrl+C to stop"
echo ""

cd "$APP_DIR"
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
