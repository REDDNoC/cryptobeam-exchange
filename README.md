# ⚡ Cryptobeam Exchange

**Enterprise-Grade Crypto Exchange Infrastructure**

Cryptobeam Exchange is a modular, high-performance digital asset marketplace built for institutional-grade speed, compliance, and scalability.
It powers cross-asset trading with support for **OpenHFT**, **CCXT**, and **FIX Messaging Protocols**.

> **Note:** The legacy LAMP/PHP platform has been fully decommissioned and archived. This repository exclusively tracks the Java/OpenHFT microservices implementation described below.

## 💡 Core Features
- High-frequency trading engine using **OpenHFT** stack.
- Market connectivity via **CCXT** and **FIX/REST/WebSocket** APIs.
- **Fireblocks custody integration** for secure wallet management.
- **Chainalysis transaction monitoring** and **Auth0 identity verification**.
- Dynamic liquidity routing and institutional-grade reporting.

## 🧠 Tech Stack
| Layer | Description |
| --- | --- |
| **Core Services** | **Java 21 microservices** (Spring Boot + OpenHFT/Chronicle Queue) implement the matching, routing, risk, and compliance engines. |
| **Integration Runtimes** | **Python adapters** cover analytics, CCXT-based venue certification, and ML-driven surveillance. **Node.js orchestration** powers console tooling, admin workflows, and ETL scripts. |
| **Northbound APIs** | **FIX 4.4 / REST / WebSocket** for customer order flow; **gRPC** for intra-service RPC when Chronicle streams are not practical. |
| **Messaging Backbone** | **Kafka / Chronicle Queue** event mesh for deterministic sequencing, replay, and low-latency fan-out. |
| **Data Stores** | **PostgreSQL / Timescale** clusters for ledgers, balances, and market data; **Object storage** (S3/GCS) for regulatory exports and long-tail telemetry. |
| **Secrets & IAM** | Vault/KMS backed secrets, short-lived workload identities, and per-service IAM roles (no static credentials in code). |



## 🛡 Compliance
Aligned with **BSA**, **FinCEN**, and **OFAC** requirements under Cryptobeam’s AML program.

## 🧱 Core Microservices
- **Matching Engine Service** – deterministic limit-order book built atop Chronicle Queue for microsecond-level latency.
- **Market Gateway Service** – routes inbound FIX/REST/WebSocket order flow, performs schema validation, and rate limiting.
- **Risk & Compliance Service** – enforces pre-trade risk checks, sanctions controls, and Chainalysis intelligence matches.
- **Settlement & Custody Service** – orchestrates Fireblocks transfers, cold storage queues, and on/off-ramp instructions.
- **Reporting & Reconciliation Service** – generates immutable audit logs, OFAC/BSA-ready SAR exports, and ledger diffs.

## 🔁 Service Topology & Data Flow
1. **Client Connectivity** – Orders arrive via FIX or REST, ingress through Market Gateway, and are normalized into an internal protobuf schema.
2. **Event Sequencing** – Gateway publishes validated intents to Chronicle Queue topics keyed by instrument; Kafka mirrors provide downstream fan-out and replay.
3. **Matching & Risk** – Matching Engine processes intents while synchronously consulting Risk & Compliance for credit, exposure, and sanctions approval.
4. **Settlement Pipeline** – Filled trades stream into Settlement & Custody for Fireblocks instructions, fiat rails coordination, and vault reconciliation.
5. **Reporting & Analytics** – All events are ingested into Reporting & Reconciliation, which drives regulatory exports, SOC metrics, and BI datasets.

## 🗂 Messaging & Data Stores
- **Chronicle Queue** – deterministic sequencing within latency-critical services; persisted per instrument shard for hot replay.
- **Kafka (Tiered Storage)** – enterprise fan-out to downstream consumers, data science, and long-term audit trails.
- **PostgreSQL Ledger Cluster** – ACID ledgers with partitioning by asset + region; Timescale hypertables retain quote/order book snapshots.
- **Object Storage** – WORM buckets store compliance artifacts (SAR drafts, customer statements, FIX session logs).

## 🔐 Security & Compliance Controls
- **Identity & Access** – Auth0 handles customer identity proofing; internal services rely on OIDC + mTLS, scoped to least-privilege roles.
- **Transaction Monitoring** – Chainalysis reactor hooks stream suspicious activity alerts to the Risk service for quarantine workflows.
- **Data Governance** – PII is tokenized before leaving controlled subnets; encryption enforced at rest (KMS CMKs) and in transit (TLS 1.3+).
- **Auditability** – Every state mutation emits Chronicle + Kafka events tagged with correlation IDs for regulator-friendly tracing.

## 🧪 Operational Workflows
- **CI/CD** – Maven builds w/ SBOM generation, SAST, and FIX certification suites; blue/green deploys gated by automated health checks.
- **Observability** – OpenTelemetry traces, structured JSON logs, Chronicle snapshots, and Prometheus metrics with SLO burn-rate alerts.
- **Incident Response** – Playbooks codified in runbooks; immutable chat + ticketing archives for SOC2/FedRAMP-style evidence.
- **Secrets Hygiene** – Vault + short-lived JWTs for service auth, automatic key rotation, and tamper-evident audit logs.

## 🧩 Repository & Tooling Overview
- **Maven Multi-Module Build** – Services share BOM-managed dependencies while preserving isolation of matching, risk, custody, and reporting runtimes.
- **Contract & Integration Testing** – gRPC/FIX schemas are versioned under `/specs`, and Pact-style tests are required before promoting API changes.
- **Local Development** – `docker compose` spins up Kafka, PostgreSQL, and Chronicle proxies so contributors can replay sanitized order flow without touching production data.
- **Static Analysis Gates** – Checkstyle, SpotBugs, and OWASP Dependency-Check run in CI; failures block merge until remediated or risk-accepted by compliance.

## 📤 Deployment & Change Management
1. **Proposal** – Engineers open a design doc + tracking ticket describing scope, data lineage, and compliance impact.
2. **Review** – Peers and the security team validate chronicle topic usage, IAM changes, and ledger reconciliation effects.
3. **Verification** – Canary deploys run replay tests against captured FIX sessions; settlement workflows are simulated with Fireblocks sandbox credentials (never production keys).
4. **Promotion** – After automated and manual sign-off, artifacts are promoted through staging to production via GitOps; all steps emit audit events to the compliance datastore.

## 📚 Contribution Expectations
- **Traceability** – Reference the governing ticket/incident in commit messages so ops can map changes to approvals.
- **Config Discipline** – Secrets belong in Vault or the organization’s KMS; contributors must never commit API keys, customer data, or real FIX logs.
- **Compliance Partnering** – Any change that touches custody, KYC/AML, or reporting logic must include updated runbooks and, when relevant, Chainalysis/Fireblocks configuration notes.
- **Post-Deployment Review** – Major features require a 24-hour monitoring window with enhanced logging to confirm Chronicle/Kafka parity and ledger balances.

## 🚀 Vision
To merge speed, security, and compliance into a single institutional exchange ecosystem.

---
© Cryptobeam 2025. All Rights Reserved.
