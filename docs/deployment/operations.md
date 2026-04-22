# Operations, Observability, And Runbooks

## Purpose

This document defines production monitoring, alerting, backup/restore, and operational runbooks for the Vercel frontend and AWS backend.

## Observability Stack

Required tools:

- Sentry for frontend and backend errors.
- CloudWatch Logs for ECS API and worker logs.
- CloudWatch Metrics and Alarms for AWS infrastructure.
- OpenTelemetry traces from FastAPI where practical.
- Request id propagation across API logs and worker jobs.
- Vercel analytics or web vitals for frontend health.
- Stripe dashboard and webhook delivery monitoring.

## Logging Standards

Backend logs should be structured JSON and include:

- `timestamp`.
- `level`.
- `environment`.
- `service`.
- `request_id`.
- `user_id` when available.
- `organization_id` when available.
- `route`.
- `status_code`.
- `duration_ms`.
- `job_id` for workers.
- `queue_name` for SQS jobs.
- `agent_run_id` for AI streams.
- `report_id` for report jobs.

Do not log:

- Raw passwords.
- Auth tokens.
- Stripe secrets.
- Full payment data.
- Full source textbook content.
- Private uploaded file contents.

## Dashboards

Required dashboards:

- API health: request count, latency, 4xx, 5xx, CPU, memory, task count.
- Worker health: queue age, processed jobs, failed jobs, DLQ size, CPU, memory.
- Database: CPU, connections, storage, read/write latency, locks, replication/backups.
- Redis: memory, evictions, CPU, connections, stream length.
- S3: 4xx/5xx errors, object count, storage growth.
- Stripe: webhook failures, checkout failures, subscription changes.
- SSE: active streams, disconnects, reconnects, stream errors.
- Frontend: Sentry errors, web vitals, failed API calls.

## Alerts

Critical alerts:

- API 5xx rate exceeds threshold.
- API readiness fails.
- ECS service cannot maintain desired count.
- RDS CPU/storage/connections near limits.
- RDS backup failure.
- Redis memory/evictions near limits.
- SQS DLQ receives messages.
- SQS oldest message age exceeds threshold.
- Report worker failure rate exceeds threshold.
- Stripe webhook failures or repeated retries.
- S3 access denied errors spike.
- Sentry critical error spike.

Warning alerts:

- API p95 latency elevated.
- Queue depth rising.
- Worker CPU/memory elevated.
- SSE disconnect rate elevated.
- Frontend web vitals degraded.
- Storage growth exceeds forecast.

## Backup And Restore

RDS PostgreSQL:

- Enable automated backups and point-in-time recovery.
- Production backup retention: at least 14 days for MVP, longer for paid/business plans if required.
- Staging backup retention can be shorter.
- Run restore drills at least quarterly.
- Document restore time and data loss window after each drill.

S3:

- Enable production bucket versioning.
- Apply lifecycle rules for temporary files.
- Preserve report/export files while the project exists unless retention policy says otherwise.
- Keep source documents according to licensing and data retention policies.

Redis:

- Redis is not durable source of truth.
- No production recovery plan should depend on Redis-only state.
- Active streams may be lost during Redis outage; clients recover from PostgreSQL state.

SQS:

- Messages retry according to queue policy.
- Failed messages move to DLQ.
- DLQ replay requires inspection and explicit operator action.

## RPO And RTO Defaults

MVP defaults:

- RPO for PostgreSQL: 15 minutes or better through RDS PITR.
- RTO for PostgreSQL restore: 4 hours target for MVP.
- RTO for API rollback: 30 minutes.
- RTO for frontend rollback: 15 minutes.
- RTO for worker rollback: 30 minutes.

These targets should be reviewed before selling Business or Enterprise plans.

## Incident Response

Incident severity:

- SEV1: production unavailable, data loss risk, payment outage, security incident.
- SEV2: major feature unavailable, reports failing globally, high error rate.
- SEV3: degraded performance, isolated customer issue, non-critical worker backlog.

Incident process:

1. Acknowledge alert.
2. Assign incident owner.
3. Open incident notes.
4. Assess customer impact.
5. Mitigate or rollback.
6. Communicate if customer-facing impact exists.
7. Confirm recovery.
8. Write post-incident review for SEV1/SEV2.

## Runbooks

### Failed Deploy

1. Check Vercel or ECS deploy logs.
2. Confirm whether frontend, API, or worker changed.
3. If health checks fail, roll back to prior Vercel deployment or ECS task definition.
4. Confirm `/healthz` and `/readyz`.
5. Run smoke tests.
6. Monitor Sentry and CloudWatch.

### Bad Migration

1. Stop deployment before rolling API/worker if possible.
2. Identify migration and affected objects.
3. If already applied and compatible, forward-fix.
4. If destructive and production is impaired, escalate to SEV1.
5. Restore only after explicit approval and RPO/RTO assessment.

### Redis Outage

1. Confirm ElastiCache status.
2. API should continue serving non-streaming durable operations where possible.
3. SSE streams and rate-limit state may degrade.
4. Disable AI streaming features if needed through feature flag.
5. Recover clients from PostgreSQL state after Redis is healthy.

### SQS Backlog

1. Check oldest message age and DLQ count.
2. Identify affected queues.
3. Scale worker service if jobs are healthy but slow.
4. Inspect logs for repeated job failure.
5. Move bad messages to DLQ or pause producer if needed.
6. Replay DLQ only after root cause is fixed.

### Report Worker Failure

1. Check `report-generation` queue and DLQ.
2. Check worker logs and S3 permissions.
3. Retry failed report jobs if safe.
4. Mark reports failed with user-visible message if not retryable.
5. Confirm new report generation succeeds.

### Stripe Webhook Outage

1. Check Stripe webhook delivery dashboard.
2. Verify API webhook endpoint and Secrets Manager value.
3. Replay failed events from Stripe.
4. Run subscription reconciliation job.
5. Confirm entitlements match Stripe state.

### S3 Access Failure

1. Check S3 bucket policy and IAM role.
2. Verify signed URL generation.
3. Check KMS/encryption settings if applicable.
4. Confirm API/worker roles can read/write expected prefixes.
5. Retry affected report/export jobs after fix.

### Leaked Secret

1. Treat as SEV1.
2. Revoke/rotate the secret in provider.
3. Update Secrets Manager.
4. Redeploy affected services.
5. Audit logs for misuse.
6. Document incident and prevention steps.

### High Error Rate

1. Check Sentry issue grouping.
2. Check recent deploys.
3. Check CloudWatch logs and metrics.
4. Roll back if linked to deploy.
5. Create hotfix if not deploy-related.
6. Monitor recovery.

## Production Readiness Checklist

- Dashboards exist for API, workers, DB, Redis, queues, S3, Stripe, and frontend.
- Critical alerts route to an owner.
- RDS PITR is enabled.
- S3 versioning is enabled for production.
- Restore drill has been completed.
- Stripe webhook replay has been tested.
- SQS DLQ replay has been tested.
- ECS rollback has been tested.
- Vercel rollback has been tested.
- Runbooks are accessible to operators.
