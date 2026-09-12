#!/usr/bin/env sh
# resume.sh — reactivate the dashboard for a stopped/paused fullstack-builder
# run, then hand off to the engine's resume driver.
# Usage: node scripts/resume.sh <project-dir> [driver args...]
#
# Why this exists: the dashboard is a background process tied to the shell, so
# when you come back to a stopped run it is gone. Running the dashboard command
# directly works, but resuming also means restarting the build — this wraps both
# in one step so you don't have to remember two commands.
set -e

PROJECT="${1:-}"; [ -n "$PROJECT" ] || { echo "usage: node scripts/resume.sh <project-dir> [driver args...]" >&2; exit 2; }
shift
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# 1. Reactivate the dashboard (auto-detects an already-running one; no duplicate)
node "$SKILL_DIR/scripts/dashboard.js" "$PROJECT" || true

# 2. Tell the user where to look
if [ -f "$PROJECT/.dashboard-url" ]; then
  URL="$(node -e "try{console.log(require('$PROJECT/.dashboard-url').url)}catch(e){process.exit(1)}" 2>/dev/null || true)"
  [ -n "$URL" ] && echo "monitor: $URL"
fi

# 3. Hand off to the engine's resume driver (engine-owned; pass through args)
DRIVER="$HOME/.agents/ralph/scripts/ralph/ralph-driver.sh"
if [ ! -x "$DRIVER" ] && [ ! -f "$DRIVER" ]; then
  echo "resume.sh: engine driver not found at $DRIVER — dashboard is up; run your resume command manually." >&2
  exit 0
fi
exec sh "$DRIVER" "$PROJECT" "$@"