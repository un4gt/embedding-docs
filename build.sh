#!/usr/bin/env bash
set -euo pipefail

echo "[build] Installing dependencies and building..."

if command -v bun >/dev/null 2>&1; then
  echo "[build] Using bun"
  bun install --frozen-lockfile
  bun run build
else
  echo "[build] bun not found, falling back to npm"
  npm install --no-fund --no-audit
  npm run build
fi

echo "[build] Done. Output: dist/"
