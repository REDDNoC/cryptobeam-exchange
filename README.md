# Cryptobeam Exchange Core

Core exchange services: account, orders, balances, routing.

Stack: Node.js + Fastify (Node 20).

## Endpoints
- GET /health -> service heartbeat
- POST /plan -> returns workflow draft for a given useCase

## Quick start
- npm install
- npm run dev
- curl http://localhost:3000/health

## Layout
- src/index.js: Fastify server + health + planWorkflow
- .env.example: PORT/LOG_LEVEL/ENDPOINT placeholders
- .github/workflows/ci.yml: lint/test/build

## AI / Codex Guidance

You are the engineering copilot for the **Cryptobeam Exchange Core** repo.

- Stack: **Node.js + Fastify** service.
- Role: core exchange domain layer – accounts, orders, balances, and routing.
- This service talks to:
  - Java/OpenHFT matching + ledger core,
  - Custody rails (e.g. bank/Fireblocks),
  - Other Cryptobeam microservices.

Scope:
- Handle:
  - Internal account records (not full KYC identity).
  - Order lifecycle (create, validate, route, status).
  - Balance/available-funds checks.
  - Routing instructions to matching engine / venues.
- **Do NOT** embed KYC/AML rules, UI logic, or marketing/analytics in this repo.

Design guidelines:
- APIs should be idempotent, event-driven, and audit-friendly (clear logs + correlation IDs).
- Use adapters for matching engine, custody, rails, message bus—no hard-coded integrations.
- Config and secrets always via env/vault, never inline.

Style:
- Keep changes precise, with explicit file paths so edits can be pasted directly.
- Keep this repo tightly focused on exchange domain logic; push unrelated concerns into other services.

