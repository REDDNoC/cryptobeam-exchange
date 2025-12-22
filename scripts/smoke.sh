#!/usr/bin/env bash
set -euo pipefail
curl -fsS http://127.0.0.1:3000/health >/dev/null
curl -fsS http://127.0.0.1:3000/ready  >/dev/null
echo "smoke: ok"
