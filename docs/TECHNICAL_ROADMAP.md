# Technical Roadmap

## Roadmap Goal

Move the app from a local frontend prototype into a durable, paid web product without losing the fast 3D editing experience that makes it compelling.

The recommended technical direction is:

1. Stabilize the local design model.
2. Add persistence and authentication.
3. Add project management.
4. Add export/report generation.
5. Add billing and entitlements.
6. Add collaboration, sharing, and team administration.
7. Harden deployment, observability, security, and scalability.

## Phase 0: Stabilize The Prototype

Before adding SaaS infrastructure, stabilize the core editor.

### Canonical Design Schema

Create one canonical design schema that can be serialized, validated, saved, versioned, exported, and reloaded.

Suggested top-level shape:

- `design`
  - `id`
  - `projectId`
  - `name`
  - `units`
  - `settings`
  - `pileGroup`
  - `piles`
  - `helixGroups`
  - `metadata`
  - `createdAt`
  - `updatedAt`
  - `version`

Important decisions:

- Normalize piles and helices by id instead of duplicating helix groups inside pile objects.
- Store calculated values separately from user-entered values.
- Use explicit units for length, diameter, angles, and spacing.
- Treat display settings separately from engineering/design data.
- Support schema migrations from the beginning.

### State Management

Replace scattered context mutation with a reducer or store.

Options:

- React `useReducer` with context for a small app.
- Zustand for a lightweight editor store.
- Redux Toolkit if the app will need heavier debugging, persistence middleware, and complex derived state.

Recommended initial approach:

- Use a single editor store for design state.
- Store ids in selection state, not object references.
- Derive selected objects from ids.
- Use immutable updates.
- Add selectors for pile, helix group, selected pile, selected helix, and conflict inputs.

### Validation And Units

Add a validation layer before persistence.

Examples:

- Pile count must be a positive integer.
- Length must be positive.
- Diameter must be positive.
- Batter angle must be bounded.
- Helix spacing must be positive.
- Helices must remain within valid pile length limits.
- Units must be explicit and convertible.

Use a schema library such as Zod once dependencies are approved.

### Testing Baseline

Add tests before moving calculations to the backend.

Minimum tests:

- Pile group circular positioning.
- Helix vertical positioning.
- Conflict matrix calculation.
- Unit conversion.
- Design serialization/deserialization.
- State reducer actions.

Recommended tools:

- Vitest for unit tests.
- React Testing Library for editor controls.
- Playwright for key editor flows and export flows.
- Visual regression or screenshot checks for critical 3D scenes later.

## Phase 1: Backend And Persistence

### Backend Choice

The backend rebuild should use Python with FastAPI.

Recommended production choice:

- FastAPI backend.
- Pydantic v2 for request/response and design schema validation.
- SQLAlchemy 2.x or SQLModel for database access.
- Alembic for migrations.
- AWS RDS PostgreSQL database.
- OpenAPI-generated TypeScript client for the frontend.
- Terraform-managed AWS infrastructure.

### Database

Use PostgreSQL as the primary system of record.

Core tables:

- `users`
- `organizations`
- `organization_memberships`
- `projects`
- `designs`
- `design_versions`
- `design_snapshots`
- `reports`
- `share_links`
- `invitations`
- `subscriptions`
- `entitlements`
- `audit_events`

Design storage options:

- Store canonical design JSON in `design_snapshots` with `jsonb`.
- Store searchable/project metadata in normalized columns.
- Add normalized pile/helix tables only if reporting/searching across individual pile geometry becomes important.

Recommended early approach:

- `designs` for current design metadata.
- `design_versions` for version records.
- `design_snapshots` with full JSONB payload.
- Background migrations for snapshot schema upgrades.

### Object Storage

Use object storage for generated files:

- PDF reports.
- CSV exports.
- Image renders.
- Uploaded/imported files.

Production default:

- AWS S3 private buckets.
- Short-lived signed URLs for uploads/downloads.
- S3 versioning and lifecycle rules in production.

Store file metadata in the database and actual files in S3.

## Phase 2: Authentication And Authorization

### Authentication

Needed capabilities:

- Email/password or magic link sign-in.
- Password reset if passwords are supported.
- Email verification.
- OAuth later if useful.
- MFA for Business/Enterprise later.
- SSO/SAML for Enterprise later.

Session approach:

- Prefer secure, httpOnly cookie sessions for web app auth.
- Use CSRF protection for cookie-based mutating requests.
- Avoid storing long-lived auth tokens in local storage.

Provider options:

- Clerk, Auth0, WorkOS, or Supabase Auth for faster launch.
- Custom auth if long-term control is more important.

Recommended early approach:

- Use a managed auth provider if speed matters.
- Keep internal `users` and `organizations` tables synchronized with auth identities.

### Authorization

Start with role-based access control:

- Owner.
- Admin.
- Editor.
- Viewer.

Apply authorization at:

- Organization membership.
- Project access.
- Design access.
- Report download.
- Share link access.
- Billing/admin operations.

Use tenant isolation checks in every data access path.

## Phase 3: Project Management

Project management is the core profitable feature.

### Project Entity

Suggested project fields:

- Name.
- Client.
- Site/location.
- Status.
- Project number.
- Description/notes.
- Default units.
- Created by.
- Owner organization.
- Created/updated timestamps.
- Archived flag.

Suggested statuses:

- Draft.
- In review.
- Approved.
- Sent to client.
- Archived.

### Design Entity

Suggested design fields:

- Name.
- Project id.
- Current version id.
- Thumbnail.
- Last edited by.
- Last edited at.
- Created by.
- Created at.

### Versioning

Versioning should support:

- Manual save versions.
- Autosave snapshots.
- Duplicate design.
- Restore previous version.
- Compare versions later.

Start simple:

- Autosave current design.
- Save named version.
- Duplicate design.
- Keep immutable snapshot JSON for every named version.

### Dashboard UX

Needed screens:

- Project list.
- Project detail.
- Design list within project.
- Create project modal.
- Create/duplicate design.
- Recent designs.
- Archived projects.

## Phase 4: Exports And Reporting

Exports are a high-value paid feature.

### Export Types

Start with:

- Design JSON.
- CSV pile table.
- CSV helix table.
- CSV conflict matrix.
- PNG screenshot.
- PDF summary report.

Later:

- DXF/DWG.
- IFC.
- STEP.
- Branded proposal package.
- API export.

### PDF Report Contents

Recommended first report:

- Project metadata.
- Design name and version.
- Rendered 3D image.
- Pile group summary.
- Pile table.
- Helix table.
- Conflict matrix.
- Pass/warn/fail legend.
- Assumptions and units.
- Timestamp and author.

### Rendering Approach

Options:

- Client-side PDF generation for fast early implementation.
- Server-side report generation for consistency and paid features.

Recommended:

- Start with server-side report generation once persistence exists.
- Use a job queue for larger reports.
- Store generated reports in object storage.

## Phase 5: Billing And Entitlements

Use Stripe for subscriptions.

Needed components:

- Pricing page.
- Checkout session.
- Customer portal.
- Webhook handler.
- Subscription table.
- Entitlement resolver.
- Plan limits.
- Grace period handling.

Entitlements to gate:

- Number of projects.
- Number of saved designs.
- Export access.
- Report branding.
- Share links.
- Team seats.
- Templates.
- Advanced admin features.

Important billing events:

- Subscription created.
- Subscription updated.
- Subscription canceled.
- Invoice paid.
- Invoice failed.
- Trial started/ended.

## Phase 6: Collaboration And Sharing

### Share Links

Start with read-only links:

- Public random token link.
- Optional password.
- Optional expiration.
- Optional download permission.
- View count and last viewed timestamp.

### Team Collaboration

Later:

- Comments on designs.
- Mention teammates.
- Assign review status.
- Activity timeline.
- Design locking while editing.
- Optimistic concurrency protection.

Real-time collaboration is not needed early. Start with versioned saves and conflict detection when two users edit the same design.

## Phase 7: Deployment And Serving

### Frontend

The current frontend can be built as static assets.

Production default:

- Vercel.

Needed changes:

- Use production environment variables.
- Replace hard-coded API URLs with Vite env config.
- Add production build and preview CI checks.
- Ensure routes work with static hosting fallback.

### Backend

Recommended production architecture:

- FastAPI API service on AWS ECS Fargate behind an AWS Application Load Balancer.
- Separate AWS ECS Fargate worker services for reports, agent runs, calculations, email, and knowledge ingestion.
- AWS RDS PostgreSQL.
- AWS ElastiCache Redis for live SSE buffers and short-lived coordination.
- AWS SQS with DLQs for durable background jobs.
- AWS S3 for private object storage.
- AWS Secrets Manager for backend secrets.
- AWS CloudWatch for logs, metrics, and alarms.
- Stripe webhooks.
- Terraform-managed infrastructure.

### Docker

The current Dockerfile runs the Vite dev server. For production, add a multi-stage build:

- Build stage: install dependencies and run `npm run build`.
- Serve stage: serve `dist/` with Nginx or another static server.

Keep docker-compose for local development if useful.

## Scalability Considerations

### Frontend And 3D Performance

Potential bottlenecks:

- Large pile counts.
- High helix segment counts.
- Rebuilding geometry too often.
- Context changes rerendering the whole editor.
- Large textures.

Mitigations:

- Memoize geometry and materials.
- Use instancing where possible.
- Move expensive calculations into pure functions or web workers.
- Limit segment counts by plan or by performance mode.
- Add degraded rendering mode.
- Add performance budgets and scene stress tests.

### API And Database

Expected early scale is modest. Design for correctness first.

Needed:

- Index projects by organization and updated time.
- Index designs by project.
- Index reports by design/version.
- Keep design snapshots append-only for version history.
- Use pagination on project/design lists.
- Use background workers for report generation.

### Background Jobs

Use jobs for:

- PDF generation.
- Image rendering if server-side.
- Large imports.
- Email notifications.
- Design schema migrations.
- Subscription reconciliation.

Production tools:

- AWS SQS with dead-letter queues for durable production jobs.
- AWS ElastiCache Redis for active SSE stream coordination and short-lived run state.
- ECS Fargate worker services for queue consumers.

## Security And Compliance

Early security requirements:

- Secure auth sessions.
- Tenant isolation.
- Input validation.
- Rate limiting.
- Audit sensitive operations.
- Encrypt data in transit.
- Use managed database encryption at rest.
- Backups and restore drills.
- Secrets management.
- Dependency scanning.
- Least-privilege cloud permissions.

Business/Enterprise readiness:

- SSO/SAML.
- MFA enforcement.
- Audit logs.
- Data retention controls.
- Security documentation.
- Incident response plan.
- Access reviews.
- SOC 2 readiness if the product reaches larger customers.

## Observability And Operations

Needed:

- Client error tracking.
- API structured logs.
- Request tracing.
- Metrics for latency, error rate, and queue depth.
- Web vitals.
- Uptime checks.
- Billing webhook monitoring.
- Database backup monitoring.

Suggested tools:

- Sentry for client/server errors.
- OpenTelemetry for traces.
- Provider logs/metrics for infrastructure.
- Simple status page later.

## Migration Path From Current App

Recommended sequence:

1. Extract pile/helix/conflict calculations into pure functions.
2. Add unit tests for those functions.
3. Define canonical design JSON schema.
4. Replace object-reference selection with id-based selection.
5. Move editor state into one reducer/store.
6. Add local save/load using the canonical schema.
7. Add backend persistence.
8. Add project dashboard.
9. Add auth and user-owned projects.
10. Add export/report generation.
11. Add Stripe entitlements.
12. Add team organizations.

This sequence keeps risk low because each step reinforces the next.

## Technical Definition Of Done For A Paid MVP

A paid MVP should not launch until these are true:

- Users can sign up, sign in, and sign out.
- Users can create, save, reopen, rename, duplicate, and archive projects.
- Designs persist across devices.
- Conflict calculations are deterministic and tested.
- Users can export at least CSV and PDF.
- Plan entitlements prevent unpaid access to paid features.
- Billing webhooks are reliable and tested.
- The production app has error tracking.
- The production database is backed up.
- The app has a documented support and incident process.
- There is a clear disclaimer around engineering responsibility and intended use.
