# CI/CD And Release Plan

## Purpose

This document defines build, test, deploy, promotion, and rollback behavior for the Vercel frontend and AWS backend.

## Branch And Environment Policy

Recommended branch policy:

- Pull requests create frontend Vercel preview deployments.
- Pull requests run frontend and backend checks.
- Merging to `main` deploys to staging automatically.
- Production deploys require manual approval after staging smoke tests pass.

Environment mapping:

- Pull request: Vercel preview plus staging or ephemeral API target.
- `main`: staging.
- Production release: manually approved promotion from a known commit/image tag.

## Frontend CI

Frontend CI must run:

- Install dependencies with lockfile enforcement.
- TypeScript typecheck.
- ESLint.
- Prettier check.
- Unit tests.
- Production build.
- Playwright smoke tests where possible.
- Source map upload to Sentry for staging/production builds.

Vercel behavior:

- Every PR gets a preview deployment.
- Preview deployments use preview environment variables.
- Staging deployment uses staging API URL and managed auth staging config.
- Production deployment uses production API URL and managed auth production config.

Frontend smoke tests:

- Marketing page loads.
- Login route loads.
- Authenticated dashboard shell loads against staging.
- Editor route loads a known seeded design.
- Share viewer loads a seeded public share link.
- SSE chat stream smoke test can connect to staging API when enabled.

## Backend CI

Backend CI must run:

- Ruff format/check.
- Type checking with mypy or pyright once adopted.
- Unit tests.
- Integration tests with a test PostgreSQL database.
- Integration tests with Redis where queue/SSE code is touched.
- Alembic migration check.
- OpenAPI schema generation.
- Frontend client compatibility check when frontend is present.
- Docker image build.
- Security/dependency scan.

Backend build artifact:

- Build Docker image.
- Tag image with commit SHA.
- Push image to ECR for staging/production deploys.

## Terraform CI

Terraform CI must run:

- `terraform fmt -check`.
- `terraform validate`.
- Static IaC scan if available.
- Plan for staging on PRs that touch infra.
- Plan for production before manual approval.

Terraform apply rules:

- Staging apply can be automatic after merge.
- Production apply requires manual approval.
- Production destructive changes require explicit review.

## Backend Deployment Flow

Staging deploy:

1. Build backend image.
2. Push image to ECR.
3. Apply Terraform changes if needed.
4. Run database migrations against staging.
5. Update ECS API task definition.
6. Update ECS worker task definitions.
7. Wait for health checks.
8. Run staging smoke tests.

Production deploy:

1. Confirm staging smoke tests passed for the same image tag.
2. Create production Terraform plan.
3. Manually approve production deployment.
4. Run production migration pre-check.
5. Run migrations using a one-off ECS task.
6. Update ECS API task definition.
7. Update ECS worker task definitions.
8. Monitor health checks, error rates, queue age, and logs.
9. Run production smoke tests.

## Migration Policy

Migration defaults:

- Prefer backward-compatible migrations.
- Deploy additive database changes before code that depends on them.
- Avoid long locks.
- Avoid destructive migrations in the same deploy as application changes.
- Use expand/contract migrations for column/table removals.

Rollback policy:

- Application rollback should not require database rollback for normal deploys.
- If a migration is unsafe, stop the deploy before ECS rollout.
- Production migration rollback requires an explicit runbook.
- Forward-fix is preferred after compatible migrations.

## OpenAPI Contract

Backend CI generates the OpenAPI schema.

Rules:

- OpenAPI schema changes should be visible in PRs.
- Frontend generated client should be updated when backend API changes.
- Breaking API changes require frontend compatibility plan.
- Staging smoke tests must use the generated client.

## Stripe Deployment Checks

Stripe deployment checks:

- Webhook endpoint configured per environment.
- Webhook signing secret stored in Secrets Manager.
- Stripe event idempotency table exists.
- Checkout session creation works in staging.
- Customer portal session creation works in staging.
- Webhook replay succeeds in staging.
- Entitlement recomputation job can be run manually.

## SQS Worker Deployment Checks

Worker deployment checks:

- Each queue exists with a DLQ.
- Queue visibility timeout matches job runtime.
- Worker IAM role can receive/delete messages.
- Worker IAM role can write required S3 prefixes.
- Failed jobs move to DLQ after configured retries.
- Queue age and DLQ size alarms exist.

## Rollback Plan

Frontend rollback:

- Use Vercel deployment rollback to a known good deployment.
- Confirm production environment variables are unchanged.
- Run frontend smoke tests after rollback.

API rollback:

- Roll ECS API service to prior task definition/image tag.
- Confirm `/healthz` and `/readyz`.
- Monitor 5xx rate, latency, and logs.

Worker rollback:

- Roll ECS worker services to prior task definitions/image tags.
- Pause or reduce worker desired count if bad jobs are being generated.
- Inspect SQS DLQs before replaying failed jobs.

Database rollback:

- Prefer forward-fix for backward-compatible migrations.
- For destructive or failed migrations, follow the database restore/migration runbook in `operations.md`.
- Never restore production from backup without explicit approval and RPO/RTO assessment.

## Production Smoke Tests

Run after every production deploy:

- Frontend loads production app.
- API `/healthz` and `/readyz` pass.
- Managed auth session can load `/auth/me` equivalent.
- Dashboard loads for a test account.
- A seeded design can be loaded.
- Report request creates an SQS job.
- Worker completes report and stores output in S3.
- Signed report download URL works.
- Stripe webhook test or replay is accepted in non-destructive mode.
- SSE stream smoke endpoint connects and completes.

## Release Acceptance

A release is complete only when:

- All CI checks pass.
- Staging deploy passes smoke tests.
- Production deploy passes health checks and smoke tests.
- CloudWatch/Sentry show no new critical errors.
- Queue age and DLQs remain normal.
- Stripe webhook delivery remains healthy.
- Rollback target is known and documented.
