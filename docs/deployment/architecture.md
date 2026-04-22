# Deployment Architecture

## Purpose

This document specifies the production deployment architecture for the rebuilt application. It resolves the previous open provider decisions and standardizes on Vercel for the frontend, AWS for backend infrastructure, S3 for object storage, Stripe for payments, managed auth for identity, and Terraform for infrastructure.

## Locked Production Topology

Production components:

- Vercel hosts the TypeScript frontend.
- AWS ECS Fargate runs the FastAPI API service.
- AWS ECS Fargate runs separate worker services.
- AWS Application Load Balancer exposes the public API.
- AWS ECR stores backend container images.
- AWS RDS PostgreSQL stores durable application data.
- AWS ElastiCache Redis stores short-lived coordination state, active SSE buffers, rate-limit counters, and run state.
- AWS SQS provides durable background queues, each with a dead-letter queue.
- AWS S3 stores reports, exports, thumbnails, uploaded assets, source documents, and generated AI artifacts.
- AWS Secrets Manager stores backend secrets.
- AWS CloudWatch stores logs, metrics, and alarms.
- AWS Route 53 and ACM manage API DNS and TLS certificates.
- Stripe handles checkout, customer portal, subscriptions, invoices, and payment webhooks.
- Managed auth provider handles identity, login, password reset, email verification, and optional MFA/SSO later.

## Environments

### Local

- Frontend runs locally against either local FastAPI or staging FastAPI.
- FastAPI runs locally.
- PostgreSQL runs locally or through Docker.
- Redis runs locally or through Docker.
- SQS can be emulated with LocalStack or bypassed with a local worker queue in development.
- S3 can be emulated with MinIO or LocalStack.
- Stripe CLI forwards webhooks.
- Managed auth uses a development application/tenant.

### Staging

- Vercel staging deployment uses staging environment variables.
- AWS staging stack is provisioned by Terraform.
- Staging has separate RDS, ElastiCache, SQS, S3, Secrets Manager, and ECS services.
- Staging receives deploys before production.
- Staging should support production-like smoke tests, webhook tests, report generation, and SSE stream tests.

### Production

- Vercel production deployment uses production environment variables.
- AWS production stack is provisioned by Terraform.
- Production has isolated RDS, ElastiCache, SQS, S3, Secrets Manager, ECS, Route 53, ACM, CloudWatch, and ECR resources.
- Production deploy requires manual approval after staging smoke tests.

## Service Boundaries

Public services:

- Vercel frontend.
- API ALB over HTTPS.
- Public share-link viewer route served by frontend.
- Public share-link API endpoints with token/password controls.

Private services:

- ECS worker services.
- RDS PostgreSQL.
- ElastiCache Redis.
- SQS queues.
- S3 buckets, private by default.
- Secrets Manager.

Network rules:

- API service can reach RDS, Redis, SQS, S3, Stripe, managed auth provider, and email provider.
- Worker service can reach RDS, Redis, SQS, S3, Stripe when needed, model providers when enabled, and email provider.
- RDS and Redis are not publicly reachable.
- S3 object access is through IAM roles and signed URLs only.

## AWS Runtime Layout

Recommended ECS services:

- `api`: FastAPI web service behind ALB.
- `worker-default`: general jobs, emails, billing reconciliation.
- `worker-reports`: report and export generation.
- `worker-agent`: AI agent and calculation jobs when enabled.

Recommended SQS queues:

- `agent-runs` with `agent-runs-dlq`.
- `report-generation` with `report-generation-dlq`.
- `calculation-runs` with `calculation-runs-dlq`.
- `email` with `email-dlq`.
- `knowledge-ingestion` with `knowledge-ingestion-dlq`.

Recommended ECS deployment defaults:

- API desired count: 2 in production, 1 in staging.
- Worker desired count: 1 per worker service initially.
- API autoscaling based on CPU, memory, and request count.
- Worker autoscaling based on queue depth and oldest message age.

## Storage Architecture

PostgreSQL is the durable source of truth for:

- Users.
- Organizations.
- Memberships.
- Entitlements.
- Projects.
- Designs.
- Design versions.
- Design snapshots.
- Reports.
- File metadata.
- Share links.
- Chat messages.
- Agent runs.
- Tool calls.
- Calculation runs and results.
- Audit/activity events.

Redis is short-lived infrastructure for:

- Active SSE event buffers.
- Agent run state.
- Rate limits.
- Idempotency locks.
- Temporary coordination state.

Redis is not the durable replay store. If Redis events expire or are unavailable, the frontend recovers from PostgreSQL-backed run/message state.

SQS is the durable production queue for:

- Report generation.
- AI agent runs.
- Calculation runs.
- Emails.
- Knowledge ingestion.
- Billing reconciliation jobs when needed.

## S3 Buckets And Prefixes

Use private S3 buckets by environment.

Recommended bucket naming pattern:

- `pile-spacing-staging-app-files`.
- `pile-spacing-production-app-files`.

Recommended prefixes:

- `reports/{organization_id}/{report_id}/`.
- `exports/{organization_id}/{export_id}/`.
- `thumbnails/{organization_id}/{design_id}/`.
- `uploads/assets/{organization_id}/{asset_id}/`.
- `uploads/source-documents/{organization_id}/{source_id}/`.
- `ai-artifacts/{organization_id}/{agent_run_id}/`.
- `temporary/{organization_id}/`.

Rules:

- S3 Block Public Access enabled.
- Server-side encryption enabled.
- Versioning enabled for production.
- Lifecycle rules expire temporary objects.
- Signed download URLs are short-lived.
- Uploads use signed upload URLs with content type and size limits.

## API Runtime Contracts

Health endpoints:

- `GET /healthz` returns process health.
- `GET /readyz` returns dependency readiness for API, database, Redis, and required config.

SSE endpoints:

- `GET /agent-runs/{run_id}/events`.
- `GET /reports/{report_id}/events`.
- `GET /calculation-runs/{run_id}/events`.

File access:

- All private file access uses short-lived signed URLs.
- Reports and exports are generated asynchronously through SQS-backed workers and stored in S3.

Billing:

- Stripe webhooks are handled by FastAPI.
- Webhook signature validation is required.
- Webhook event ids are stored for idempotency.

## Environment Variables

### Frontend

- `VITE_API_BASE_URL`.
- Managed auth public config, such as issuer/domain/client id.
- `VITE_STRIPE_PUBLISHABLE_KEY`.
- `VITE_SENTRY_DSN`.
- `VITE_APP_ENV`.
- `VITE_FEATURE_FLAGS`.

### Backend

- `APP_ENV`.
- `APP_SECRET_KEY`.
- `DATABASE_URL`.
- `REDIS_URL`.
- `AWS_REGION`.
- `S3_APP_FILES_BUCKET`.
- `SQS_AGENT_RUNS_URL`.
- `SQS_REPORT_GENERATION_URL`.
- `SQS_CALCULATION_RUNS_URL`.
- `SQS_EMAIL_URL`.
- `SQS_KNOWLEDGE_INGESTION_URL`.
- Managed auth issuer, audience, JWKS URL, client secret if needed.
- `STRIPE_SECRET_KEY`.
- `STRIPE_WEBHOOK_SECRET`.
- `SENTRY_DSN`.
- Email provider API key.

### Terraform

- AWS region.
- Environment name.
- Root domain and API domain.
- Vercel project id and environment bindings if Terraform-managed.
- ECS CPU/memory settings.
- ECS desired counts.
- RDS instance class and storage.
- RDS backup retention.
- Redis node type.
- SQS visibility timeout and retention.
- S3 bucket names.
- Alert notification targets.

## Terraform Ownership

Terraform owns:

- AWS networking.
- ECS clusters and services.
- ECR repositories.
- ALB/listeners/target groups.
- RDS.
- ElastiCache Redis.
- SQS queues and DLQs.
- S3 buckets and lifecycle rules.
- IAM roles and policies.
- CloudWatch log groups, metrics, and alarms.
- Route 53 records and ACM certificates where applicable.
- Secrets Manager secret containers, with secret values injected securely outside source control.

Vercel project configuration should be Terraform-managed where practical. If not fully Terraform-managed, document the bootstrap steps and keep environment variable names synchronized with this architecture.

## Deployment Acceptance Scenarios

- Fresh staging environment bootstraps from Terraform and migrations.
- Frontend preview deploy calls staging API.
- Backend image deploys to ECS and passes health checks.
- Worker consumes SQS jobs and writes report output to S3.
- Stripe checkout, webhook, entitlement update, and reconciliation succeed.
- SSE stream starts, reconnects, and recovers from persisted run state.
- Cross-tenant API access is blocked.
- RDS restore drill succeeds.
- Rollback path is documented for frontend, API, worker, and migrations.
