# Backend Rebuild Plan

## Purpose

The backend rebuild should provide the commercial product foundation that the current project does not have: authentication, accounts, organizations, billing, project persistence, design storage, exports, share links, asset storage, and later AI chat/retrieval services.

Target backend stack:

- FastAPI.
- Python 3.12 or newer.
- Pydantic v2 for request/response and domain schemas.
- SQLAlchemy 2.x or SQLModel for database access.
- Alembic for migrations.
- AWS RDS PostgreSQL as primary database.
- JSONB for versioned design snapshots.
- AWS S3 for generated reports, exports, uploads, thumbnails, meshes, textures, and source documents.
- AWS ElastiCache Redis for active SSE buffers, short-lived run state, rate limits, and coordination.
- AWS SQS with dead-letter queues for durable background jobs.
- Stripe for billing.
- OpenAPI as the contract for frontend client generation.
- Terraform for AWS infrastructure.

The backend should be designed as a modular monolith first. It can later split into services if AI retrieval, report generation, or real-time collaboration becomes large enough to justify separation.

## Rebuild Goals

Primary goals:

- Add authenticated user accounts.
- Support personal and team organizations.
- Persist projects, designs, design versions, and design snapshots.
- Store canonical design JSON and validate it.
- Generate and store reports/exports.
- Support Stripe subscriptions, webhooks, and entitlements.
- Support share links and read-only viewer access.
- Support file/object storage for reports, thumbnails, meshes, textures, and source documents.
- Provide a clean API contract for the TypeScript frontend.
- Add observability, tests, migrations, and deployment structure.

Non-goals for the first backend:

- Full enterprise SSO.
- Real-time collaborative editing.
- Complex engineering/capacity calculations.
- Complete knowledge graph ingestion pipeline.
- Multi-region deployment.

## Recommended Backend Structure

Suggested source layout:

```text
backend/
  app/
    main.py
    core/
      config.py
      security.py
      logging.py
      errors.py
      dependencies.py
    db/
      session.py
      base.py
      migrations/
    modules/
      auth/
      accounts/
      organizations/
      projects/
      designs/
      reports/
      billing/
      sharing/
      files/
      assets/
      calculations/
      ai_chat/
      knowledge/
      audit/
    workers/
      jobs.py
      report_jobs.py
      ai_jobs.py
    tests/
  alembic.ini
  pyproject.toml
```

Each module should own:

- SQLAlchemy models.
- Pydantic schemas.
- Service functions.
- Router.
- Tests.

Avoid placing business logic directly in routers.

## Core Architecture

Request flow:

1. FastAPI route receives request.
2. Auth/session dependency loads current user.
3. Organization/project permission dependency verifies access.
4. Pydantic validates request payload.
5. Service layer performs business operation.
6. Database transaction commits.
7. Response schema returns typed data.
8. Audit/activity events are recorded where needed.

Important backend boundaries:

- API schemas are not database models.
- Design snapshots are validated before storing.
- Reports reference immutable design versions.
- Billing webhooks update subscriptions and entitlements.
- File metadata lives in PostgreSQL; binary files live in object storage.
- AI-generated design changes are proposals until accepted by a user.

## Configuration

Environment variables:

- `APP_ENV`
- `APP_SECRET_KEY`
- `DATABASE_URL`
- `REDIS_URL`
- `FRONTEND_ORIGIN`
- `COOKIE_DOMAIN`
- `COOKIE_SECURE`
- `OBJECT_STORAGE_PROVIDER`
- `OBJECT_STORAGE_BUCKET`
- `OBJECT_STORAGE_ENDPOINT`
- `OBJECT_STORAGE_ACCESS_KEY`
- `OBJECT_STORAGE_SECRET_KEY`
- `AWS_REGION`
- `S3_APP_FILES_BUCKET`
- `SQS_AGENT_RUNS_URL`
- `SQS_AGENT_RUNS_DLQ_URL`
- `SQS_REPORT_GENERATION_URL`
- `SQS_REPORT_GENERATION_DLQ_URL`
- `SQS_CALCULATION_RUNS_URL`
- `SQS_CALCULATION_RUNS_DLQ_URL`
- `SQS_EMAIL_URL`
- `SQS_EMAIL_DLQ_URL`
- `SQS_KNOWLEDGE_INGESTION_URL`
- `SQS_KNOWLEDGE_INGESTION_DLQ_URL`
- Managed auth issuer, audience, JWKS URL, and client secret if needed.
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_*`
- `EMAIL_PROVIDER_API_KEY`
- `SENTRY_DSN`
- `OPENAI_API_KEY` or model provider key later

Use a typed settings object through Pydantic settings.

## Authentication

Two viable approaches:

### Managed Auth

Providers:

- Clerk.
- Auth0.
- WorkOS.
- Supabase Auth.

Advantages:

- Faster launch.
- Handles password resets, email verification, OAuth, MFA, and security hardening.

Tradeoffs:

- External dependency.
- Additional pricing.
- Need to sync provider users to internal users.

### Custom Auth

Features required:

- Email/password signup.
- Password hashing with Argon2 or bcrypt.
- Email verification.
- Login.
- Logout.
- Password reset.
- Session management.
- Account lockout/rate limiting.
- Optional MFA later.

Recommended for fastest product launch:

- Use managed auth if the priority is product validation.
- Use custom auth only if control, cost, or deployment requirements justify it.

## Session Model

Preferred web session:

- httpOnly secure cookie.
- SameSite Lax or Strict depending on frontend/backend deployment.
- CSRF protection for mutating requests if cookie auth is used.
- Short-lived session with refresh mechanism.

Do not store long-lived tokens in browser local storage.

Core auth endpoints if custom:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/verify-email`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

## Accounts And Organizations

The backend should model every workspace as an organization, including personal workspaces. This keeps Solo Pro and Team plans on the same ownership model.

Core concepts:

- `User`
- `Organization`
- `OrganizationMembership`
- `Invitation`
- `Role`

Roles:

- Owner.
- Admin.
- Editor.
- Viewer.

Organization endpoints:

- `GET /organizations`
- `POST /organizations`
- `GET /organizations/{organization_id}`
- `PATCH /organizations/{organization_id}`
- `GET /organizations/{organization_id}/members`
- `POST /organizations/{organization_id}/invitations`
- `PATCH /organizations/{organization_id}/members/{user_id}`
- `DELETE /organizations/{organization_id}/members/{user_id}`

Authorization rules:

- Owners/admins manage members.
- Owners/admins manage billing.
- Editors create/edit projects and designs.
- Viewers can read projects/designs if granted access.

Every organization-owned table should include `organization_id`.

## Projects And Designs

Projects are the main paid workspace object.

Project endpoints:

- `GET /projects`
- `POST /projects`
- `GET /projects/{project_id}`
- `PATCH /projects/{project_id}`
- `DELETE /projects/{project_id}`
- `POST /projects/{project_id}/archive`
- `POST /projects/{project_id}/restore`

Design endpoints:

- `GET /projects/{project_id}/designs`
- `POST /projects/{project_id}/designs`
- `GET /designs/{design_id}`
- `PATCH /designs/{design_id}`
- `DELETE /designs/{design_id}`
- `POST /designs/{design_id}/duplicate`
- `POST /designs/{design_id}/archive`

Version endpoints:

- `GET /designs/{design_id}/versions`
- `POST /designs/{design_id}/versions`
- `GET /designs/{design_id}/versions/{version_id}`
- `POST /designs/{design_id}/versions/{version_id}/restore`

Snapshot rules:

- Store full canonical design JSON in `design_snapshots`.
- Treat named versions as immutable.
- Allow autosave snapshots or patches separately.
- Validate `schemaVersion`.
- Store validation results alongside snapshots.

## Design Schema Validation

The backend should be the final authority for validating design JSON.

Validation responsibilities:

- Schema version is supported.
- Units are recognized.
- Required objects have stable ids.
- Piles have positive length and diameter.
- Helices have valid diameter, thickness, spacing, and placement.
- Referenced ids exist.
- Material and asset references are valid.
- Object counts are within plan limits.
- AI-generated designs include assumptions and warnings.

Use Pydantic models for canonical schema validation, with custom validators for domain constraints.

If frontend and backend schemas diverge:

- Backend wins.
- Frontend should regenerate types from OpenAPI or shared schema definitions.

## Data And Storage

Use AWS RDS PostgreSQL as the durable source of truth for:

- Users.
- Organizations.
- Memberships.
- Projects.
- Designs.
- Design versions.
- Design snapshots.
- Reports.
- Share links.
- Billing state.
- AI chat metadata.
- Asset/file metadata.
- Audit/activity events.

Use AWS S3 for object storage:

- PDF reports.
- CSV exports.
- Rendered images.
- Thumbnails.
- Uploaded/imported meshes.
- Textures.
- Source PDFs for retrieval.

Use AWS ElastiCache Redis for short-lived state:

- Active SSE event buffers.
- Agent run state.
- Rate limits.
- Idempotency locks.
- Temporary coordination state.

Redis is not the durable source of truth. If Redis events expire or are unavailable, clients recover from PostgreSQL-backed messages, runs, and calculation records.

Use AWS SQS for durable background queues:

- Report generation.
- Long-running calculations.
- AI retrieval or generation.
- Email sending.
- Webhook reconciliation.
- Agent job dispatch.

## Redis And Queue Infrastructure

The backend should include Redis and a queue abstraction from the start of the AI/chat phase.

Redis responsibilities:

- Short-lived agent run state.
- SSE event buffers.
- Rate limiting counters.
- Idempotency keys.
- Short-lived worker/job coordination for SQS-backed jobs.

Queue responsibilities:

- Run agent jobs outside the request lifecycle.
- Generate reports.
- Execute long-running calculation batches.
- Send emails.
- Reconcile billing webhooks if needed.
- Process knowledge ingestion later.

Recommended production default:

- ElastiCache Redis for run state and stream/event buffers.
- SQS for durable background jobs.
- PostgreSQL for durable messages, tool calls, calculation runs, and final results.

Queue design rules:

- Jobs must be idempotent.
- Job payloads should contain ids, not large blobs.
- Durable records should be created before enqueueing work.
- Workers should update job status and emit stream events.
- Failed jobs should persist error state and be retryable when safe.

Suggested queues:

- `agent-runs` with `agent-runs-dlq`.
- `report-generation` with `report-generation-dlq`.
- `calculation-runs` with `calculation-runs-dlq`.
- `email` with `email-dlq`.
- `knowledge-ingestion` with `knowledge-ingestion-dlq`.

## SSE Streaming

Use Server-Sent Events for agent output, calculation progress, and report progress where live updates matter.

SSE endpoint examples:

- `GET /agent-runs/{run_id}/events`
- `GET /reports/{report_id}/events`
- `GET /calculation-runs/{run_id}/events`

Recommended flow for chat:

1. User posts message to `POST /chat/threads/{thread_id}/messages`.
2. API stores the user message and creates an `agent_run`.
3. API enqueues an agent job.
4. API returns `runId`, `messageId`, and stream URL.
5. Frontend opens SSE connection.
6. Worker emits events to Redis and stores durable outputs in PostgreSQL.
7. SSE endpoint forwards ordered events to the client.
8. Final assistant message and tool results are persisted.

SSE event fields:

- `id`: monotonic sequence id for resume.
- `event`: typed event name.
- `data`: JSON payload.
- `retry`: optional reconnect hint.

Event names:

- `run.started`
- `message.delta`
- `message.completed`
- `retrieval.started`
- `retrieval.source`
- `tool.started`
- `tool.completed`
- `tool.failed`
- `math.formula`
- `math.substitution`
- `math.result`
- `math.warning`
- `design.proposal`
- `error`
- `done`

Reliability requirements:

- Check authorization before opening a stream.
- Stop streaming when the client disconnects.
- Support `Last-Event-ID` when Redis event retention allows replay.
- Persist final state so the frontend can recover from dropped streams.
- Keep stream events small.
- Avoid sending secrets, raw prompt internals, or private retrieved text that should not be exposed.

Implementation options:

- FastAPI SSE support with `EventSourceResponse`.
- `sse-starlette` if a dedicated Starlette/FastAPI SSE package is preferred.
- Native async generators reading from Redis Streams or Pub/Sub.

Use WebSockets later only for genuinely bidirectional collaborative editing.

## File Storage Service

Provide a file service that abstracts object storage.

Responsibilities:

- Create upload URLs if direct upload is supported.
- Store file metadata.
- Generate signed download URLs.
- Delete or soft-delete files.
- Track content type, size, checksum, and owner organization.

File endpoints:

- `POST /files/upload-url`
- `GET /files/{file_id}/download-url`
- `DELETE /files/{file_id}`

Security:

- Never expose raw bucket credentials.
- Check organization access before creating signed URLs.
- Expire signed URLs quickly.

## Reports And Exports

Report generation should be asynchronous.

Report endpoints:

- `POST /designs/{design_id}/reports`
- `GET /designs/{design_id}/reports`
- `GET /reports/{report_id}`
- `GET /reports/{report_id}/download-url`
- `DELETE /reports/{report_id}`

Supported initial exports:

- PDF summary.
- CSV pile table.
- CSV helix table.
- CSV conflict matrix.
- PNG scene snapshot or uploaded frontend render.

Report generation flow:

1. User requests report for a design version.
2. Backend checks entitlement.
3. Backend creates `report` row with status `pending`.
4. Worker generates report.
5. Worker writes file to object storage.
6. Worker updates report status to `ready`.
7. Frontend polls or receives status update.

Reports should always reference a design version, not mutable current draft state.

## Calculations

Start with deterministic geometry and conflict calculations.

Calculation endpoints:

- `POST /designs/{design_id}/validate`
- `POST /designs/{design_id}/conflict-check`
- `GET /calculation-runs/{run_id}`

Calculation principles:

- Calculation tools should be pure and testable.
- Store `engine_version`.
- Store input hash.
- Store structured results.
- Use the same fixture tests as frontend geometry functions.

Initial calculations:

- Pile position derivation.
- Helix position derivation.
- 3D center-to-center distance matrix.
- Pass/warn/fail based on tolerance settings.
- Geometry validity warnings.

Agent math calculations:

- Formula selection should be explicit and versioned.
- Inputs should be normalized into canonical units.
- Outputs should include LaTeX formula, variables, substitutions, numeric result, status, warnings, and source references.
- Calculation results should stream to chat with `math.*` events.
- Calculation records should be reusable in reports.

Additional data objects:

- `formula_definitions`
- `calculation_steps`
- `agent_stream_events` if Redis replay is not enough.

Math service modules:

- `calculations/formulas.py`
- `calculations/units.py`
- `calculations/geometry.py`
- `calculations/conflicts.py`
- `calculations/rendering.py` for report-friendly math JSON, not frontend rendering.

## Billing And Payments

Use Stripe for subscriptions. Stripe is the only payment provider for v1.

Billing model:

- Organization owns subscription.
- User can manage billing only if owner/admin.
- Subscription plan resolves to entitlements.
- Entitlements gate API actions.

Stripe integration:

- Checkout Sessions for upgrades.
- Customer Portal for billing management.
- Webhooks for subscription state.
- Price ids configured by environment.
- Persisted Stripe event ids for webhook idempotency.
- Subscription reconciliation job for replay/recovery.
- Manual entitlement override support for support/admin operations.

Billing endpoints:

- `GET /billing/status`
- `POST /billing/checkout-session`
- `POST /billing/customer-portal-session`
- `GET /billing/entitlements`
- `POST /webhooks/stripe`

Webhook events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Entitlements:

- Project count.
- Design count.
- PDF export access.
- CSV export access.
- Share link access.
- Team seat count.
- Custom branding.
- AI chat.
- AI design generation.

Always enforce entitlements on the backend, even if the frontend hides gated UI.

Failed payment behavior:

- Keep the organization active during Stripe's configured grace/dunning period.
- Surface failed-payment status through billing endpoints.
- Block paid-only actions when subscription state becomes unpaid or canceled.
- Preserve existing projects/designs; do not delete customer data because of payment failure.

## Share Links

Share links support public read-only design review.

Endpoints:

- `POST /designs/{design_id}/share-links`
- `GET /designs/{design_id}/share-links`
- `DELETE /share-links/{share_link_id}`
- `GET /public/share-links/{token}`
- `POST /public/share-links/{token}/verify-password`

Rules:

- Store only token hash.
- Allow expiration.
- Allow revoke.
- Optional password.
- Optional download permission.
- Public access returns only allowed design/version/report data.

## Assets And Materials

Support asset libraries for later imported meshes and textures.

Endpoints:

- `GET /assets`
- `POST /assets`
- `GET /assets/{asset_id}`
- `PATCH /assets/{asset_id}`
- `DELETE /assets/{asset_id}`
- `GET /material-presets`
- `POST /material-presets`

Use object storage for:

- GLB/GLTF meshes.
- Texture maps.
- Logo files.
- Thumbnails.

Design snapshots should reference assets by id/version, not embed binary data.

## AI Chat And Knowledge Retrieval

AI is not required for the first core SaaS release, but the backend should leave space for it.

AI endpoints:

- `GET /chat/threads`
- `POST /chat/threads`
- `GET /chat/threads/{thread_id}`
- `POST /chat/threads/{thread_id}/messages`
- `POST /ai/design-proposals/{proposal_id}/accept`
- `POST /ai/design-proposals/{proposal_id}/reject`

Knowledge retrieval endpoints can remain internal initially.

AI backend responsibilities:

- Store chat threads/messages.
- Store agent runs and tool calls.
- Store retrieval events.
- Validate generated design JSON.
- Save AI output as proposal, not committed design.
- Require user acceptance before modifying a saved design.
- Stream token deltas, tool progress, calculation steps, and design proposals over SSE.
- Emit deterministic calculation outputs as structured `math.*` events.
- Support cancellation and regeneration.

Knowledge storage:

- `knowledge_sources`.
- `knowledge_chunks`.
- `knowledge_embeddings`.
- `knowledge_graph_nodes`.
- `knowledge_graph_edges`.

Source licensing and citation tracking are mandatory if textbook content is ingested.

Agent run lifecycle:

1. `queued`
2. `running`
3. `awaiting_tool`
4. `streaming`
5. `completed`
6. `failed`
7. `cancelled`

Regeneration:

- Regeneration creates a new `agent_run`.
- The new run references the same parent user message.
- Prior assistant messages remain available as alternatives.
- Accepted design proposals should remain immutable and linked to the run that created them.

Cancellation:

- User cancellation should set the run status to `cancel_requested`.
- Worker checks cancellation between model/tool chunks.
- Backend emits `done` with cancelled status if cancellation succeeds.

Streaming data retention:

- Store durable messages and tool calls in PostgreSQL.
- Keep Redis stream events long enough for reconnect and immediate replay.
- Optionally persist compact `agent_stream_events` for debugging paid/enterprise accounts.

## Audit And Activity

Record activity events for:

- User signup.
- Organization created.
- Member invited/removed.
- Project created/archived.
- Design created/saved/versioned.
- Report generated/downloaded.
- Share link created/revoked.
- Billing changes.
- AI proposal accepted/rejected.

Audit logs should be queryable by organization and project.

Business/Enterprise plans may require longer retention and exportable audit logs.

## Email And Notifications

Initial email needs:

- Email verification.
- Password reset.
- Organization invitation.
- Report ready notification later.
- Billing failure notification if not fully handled by Stripe.

Provider options:

- Resend.
- Postmark.
- SendGrid.
- SES.

Email sending should run through background jobs.

## Security

Security requirements:

- Strong password hashing if custom auth.
- Secure httpOnly cookies.
- CSRF protection for cookie auth.
- CORS restricted to frontend origins.
- Rate limits on auth and public share endpoints.
- Tenant isolation for every organization-owned query.
- No raw share/invite tokens stored.
- No payment card data stored.
- Validate all JSON inputs.
- Limit uploaded file types and sizes.
- Virus/malware scanning later for enterprise file uploads.
- Secrets managed outside source code.
- Backups encrypted.

Consider row-level security later, but do not rely on it alone. The service layer must enforce authorization.

## Observability

Needed:

- Structured JSON logs.
- Request id per request.
- Error tracking with Sentry or similar.
- Metrics for API latency, error rate, and background jobs.
- Stripe webhook monitoring.
- Report worker failure monitoring.
- Database migration logs.
- Audit/activity events.

Health endpoints:

- `GET /healthz`
- `GET /readyz`

## Testing Plan

Unit tests:

- Design schema validation.
- Permission checks.
- Entitlement checks.
- Geometry/conflict calculations.
- Billing entitlement resolver.
- Share token hashing.

Integration tests:

- Auth flow.
- Project CRUD.
- Design save/version flow.
- Report request flow.
- Stripe webhook handling.
- Share link public access.

Contract tests:

- OpenAPI schema generation.
- Frontend client compatibility.

Security tests:

- Cross-organization access is blocked.
- Viewer cannot edit.
- Expired/revoked share links fail.
- Gated features fail without entitlement.

## Deployment

Recommended deployment:

- FastAPI API service on AWS ECS Fargate behind an AWS Application Load Balancer.
- Separate AWS ECS Fargate worker services for reports, agent runs, calculations, email, and knowledge ingestion.
- AWS RDS PostgreSQL.
- AWS ElastiCache Redis.
- AWS SQS queues with DLQs.
- AWS S3 private app-files bucket.
- AWS ECR for container images.
- AWS Secrets Manager for backend secrets.
- AWS CloudWatch for logs, metrics, and alarms.
- Terraform owns AWS infrastructure.
- Vercel hosts the frontend.

Environments:

- Local.
- Staging.
- Production.

CI checks:

- Ruff/format.
- Type checking with mypy or pyright if adopted.
- Unit tests.
- Integration tests with test database.
- Alembic migration check.
- Docker build.
- ECR image push for deployable builds.
- Terraform fmt/validate/plan for infrastructure changes.

Deployment flow:

- Pull requests run checks and create Vercel preview deployments.
- Merges to main deploy to staging.
- Production deploy requires manual approval after staging smoke tests.
- Migrations run as one-off ECS tasks before API/worker rollout.
- Rollbacks use Vercel deployment rollback for frontend and ECS task definition rollback for API/workers.

## Local Development

Local services:

- FastAPI app.
- PostgreSQL.
- Redis.
- Object storage emulator such as MinIO or LocalStack if needed.
- LocalStack for SQS if needed.
- Stripe CLI for webhook testing.

Useful commands should eventually include:

- Start API.
- Run migrations.
- Seed database.
- Run tests.
- Run worker.
- Generate OpenAPI schema.

## Migration From Current Project

The current project has almost no backend. Migration is mostly greenfield.

Recommended sequence:

1. Define canonical design Pydantic models.
2. Create database schema for users, organizations, projects, designs, versions, and snapshots.
3. Add authentication.
4. Add organization memberships.
5. Add project/design CRUD.
6. Add snapshot validation and save/load.
7. Add file storage abstraction.
8. Add reports/export job skeleton.
9. Add Stripe billing and entitlements.
10. Add share links.
11. Add calculation endpoints.
12. Add AI chat/proposal tables and endpoints later.

## Backend MVP Definition Of Done

The backend MVP is ready when:

- Users can authenticate.
- Users have personal organizations.
- Organizations can own projects and designs.
- Designs can be saved as validated JSON snapshots.
- Design versions are immutable.
- Reports can be requested and downloaded.
- Stripe subscriptions update entitlements through webhooks.
- API actions enforce roles and entitlements.
- Share links can expose read-only design versions.
- Files are stored outside the database.
- Tests cover auth, projects, designs, billing, reports, and tenant isolation.
- OpenAPI is stable enough for frontend client generation.

## Key Backend Decisions

- Managed auth is the v1 default; choose the specific provider before implementation.
- SQLAlchemy or SQLModel?
- Pydantic-only design snapshots or additional normalized pile/helix tables?
- AWS SQS is the production queue; choose local worker implementation details before implementation.
- AWS S3 is the object storage provider.
- Which email provider? Default choices should fit the AWS/Vercel stack, such as SES, Postmark, or Resend.
- What reports are required for first paid launch?
- Which Stripe products/prices map to which entitlements?
- How long are autosaves retained?
- When should AI retrieval be introduced?
