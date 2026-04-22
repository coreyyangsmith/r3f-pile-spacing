# Project Planning Docs

This folder captures the current state of the application and the planning work needed to rebuild it into a deployable product.

## Recommended Reading Order

1. [CURRENT.md](./CURRENT.md) - understand the existing prototype and its gaps.
2. [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) - understand the target product, monetization, and first profitable workflows.
3. [TECHNICAL_ROADMAP.md](./TECHNICAL_ROADMAP.md) - follow the phased technical rebuild plan.
4. [frontend/](./frontend/README.md) and [backend/](./backend/README.md) - use these as the implementation handoff specs.
5. [deployment/](./deployment/README.md) - use these docs for production architecture, CI/CD, operations, and security.

## Current State And Product Planning

- [CURRENT.md](./CURRENT.md) - current purpose, architecture, data flow, and known gaps from repository inspection.
- [PRODUCT_STRATEGY.md](./PRODUCT_STRATEGY.md) - monetizable feature ideas, best bets to block out first, positioning, and pricing tiers.
- [PLANNING_QUESTIONS.md](./PLANNING_QUESTIONS.md) - questions to answer before committing to product, technical, and business decisions.

## Rebuild Specifications

- [TECHNICAL_ROADMAP.md](./TECHNICAL_ROADMAP.md) - technical plan for persistence, authentication, project management, deployment, scalability, billing, and operations.
- [frontend/](./frontend/README.md) - frontend rebuild plan using TypeScript, React, Tailwind, shadcn/ui, Three.js, typed API clients, editor state, and product workflows.
- [backend/](./backend/README.md) - FastAPI backend rebuild plan covering authentication, accounts, billing, data/storage, reports, share links, files, and AI-ready APIs.

## Domain, Data, And AI Systems

- [database.md](./database.md) - database design for projects, design versions, reports, billing, AI chat, retrieval, assets, and feature support.
- [three_environment_design.md](./three_environment_design.md) - 3D environment object structure, scene layers, Three.js representation options, assets, previews, and persistence boundaries.
- [chat_design.md](./chat_design.md) - AI chat, geotechnical knowledge retrieval, agent pipeline, 3D tool interaction, and JSON design generation.
- [math.md](./math.md) - cross-cutting math and streaming feature design for SSE agent output, deterministic calculations, Redis/queue coordination, and frontend equation/chart rendering.

## Deployment And Operations

- [deployment/](./deployment/README.md) - deployment architecture, CI/CD, operations, security, and compliance for Vercel plus AWS with S3, RDS, ElastiCache Redis, SQS, ECS Fargate, Terraform, and Stripe.
- [deployment/architecture.md](./deployment/architecture.md) - production topology, environments, service boundaries, S3 layout, runtime contracts, and environment variables.
- [deployment/ci_cd.md](./deployment/ci_cd.md) - Vercel and AWS CI/CD, promotion, smoke tests, migrations, and rollback.
- [deployment/operations.md](./deployment/operations.md) - observability, alerts, backups, restore drills, runbooks, and production readiness scenarios.
- [deployment/security_compliance.md](./deployment/security_compliance.md) - managed auth integration, secrets, IAM, tenant isolation, legal docs, and compliance gates.

## Planning-Only Boundary

These documents intentionally do not implement features. They define the current baseline, the target rebuild, and the operational decisions needed before production implementation.
