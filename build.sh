#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "[build] Installing dependencies and building..."
echo "[build] node: $(command -v node >/dev/null 2>&1 && node --version || echo 'not found')"
echo "[build] bun: $(command -v bun >/dev/null 2>&1 && bun --version || echo 'not found')"

install_bun() {
  if command -v bun >/dev/null 2>&1; then
    return 0
  fi

  echo "[build] bun not found, attempting to install bun..."

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL https://bun.sh/install | bash
  elif command -v wget >/dev/null 2>&1; then
    wget -qO- https://bun.sh/install | bash
  else
    echo "[build] curl/wget not found, cannot install bun automatically."
    return 1
  fi

  export BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
  export PATH="$BUN_INSTALL/bin:$PATH"

  command -v bun >/dev/null 2>&1
}

if install_bun; then
  echo "[build] Using bun"
  bun install --frozen-lockfile
  bun run build
elif command -v npm >/dev/null 2>&1; then
  echo "[build] Falling back to npm (no lockfile)"
  npm install --no-audit --no-fund --package-lock=false
  npm run build
else
  echo "[build] No bun and no npm found."
  exit 1
fi

echo "[build] Done. Output: dist/"
