# Security And Compliance

## Purpose

This document defines the deployment security and compliance expectations for the rebuilt application.

## Managed Auth Integration

Identity is handled by a managed auth provider. The provider is responsible for:

- Login.
- Signup.
- Email verification.
- Password reset.
- MFA when enabled.
- Optional enterprise SSO later.

FastAPI remains responsible for:

- Syncing provider identity to internal `users`.
- Creating personal organizations.
- Managing organization memberships.
- Enforcing application roles.
- Enforcing entitlements.
- Auditing user and organization activity.

Backend validation:

- Validate managed auth JWTs or sessions on every protected request.
- Verify issuer, audience, expiration, and signature.
- Sync user profile lazily on first authenticated request and through provider webhooks if available.

## Sessions, Cookies, CORS, And CSRF

Session strategy:

- Prefer managed auth session cookies or provider-supported secure web sessions.
- Backend API accepts only validated managed auth credentials.
- Do not store long-lived auth tokens in browser local storage.

CORS:

- Allow only known Vercel preview/staging/production origins.
- Production API allows only production frontend origin plus approved share/viewer origins.
- Credentials are allowed only when required by auth strategy.

CSRF:

- If cookie-authenticated API mutations are used, require CSRF protection.
- If bearer tokens are used from managed auth SDKs, enforce strict CORS and token validation.

Security headers:

- Content Security Policy.
- Strict-Transport-Security.
- X-Content-Type-Options.
- Referrer-Policy.
- Permissions-Policy.
- Frame-ancestors restrictions except where embedding is intentionally supported.

## Secrets Management

AWS Secrets Manager is the source of truth for backend secrets.

Secrets include:

- Database credentials.
- Redis credentials if used.
- Managed auth secrets.
- Stripe secret key.
- Stripe webhook secret.
- Email provider key.
- Sentry DSN where private.
- Model provider keys when AI is enabled.

Rules:

- No secrets in source control.
- No secrets in frontend except public publishable keys.
- Separate secrets by environment.
- Rotate secrets after suspected exposure.
- Restrict read access by ECS task role and operator need.

## IAM And Least Privilege

IAM roles:

- API task role.
- Worker task role.
- Terraform deploy role.
- CI deploy role.
- Read-only operator role.

Rules:

- API can access only required S3 prefixes, SQS queues, Secrets Manager secrets, and CloudWatch logs.
- Workers can access queues and S3 prefixes required for their job classes.
- Report worker can write report/export prefixes.
- Agent worker can access AI artifact prefixes and allowed secrets.
- No broad `s3:*` or `*:*` policies in production.

## Tenant Isolation

Every organization-owned database row must include `organization_id`.

Enforcement:

- Service layer checks organization membership and role before every organization-scoped action.
- Query helpers include organization constraints by default.
- Cross-organization access tests are mandatory.
- Share links expose only the specific design/version/report permitted by token settings.

Row-level security can be considered later, but service-layer authorization remains required.

## S3 Security

S3 defaults:

- Block Public Access enabled.
- Private objects only.
- Server-side encryption enabled.
- Production bucket versioning enabled.
- Lifecycle policies for temporary files.

Access:

- Backend signs short-lived upload/download URLs.
- Signed URLs require authorization checks before creation.
- Share links can request signed URLs only for permitted objects.
- Uploaded file types and sizes are validated.
- Malware scanning is required before Enterprise/private file upload support.

## Stripe Security

Stripe rules:

- Store no raw payment card data.
- Verify webhook signatures.
- Store Stripe event ids for idempotency.
- Reconcile subscriptions regularly.
- Enforce entitlements in the backend.
- Use Stripe Checkout and Customer Portal rather than custom card handling.

Billing data stored internally:

- Stripe customer id.
- Stripe subscription id.
- Plan key.
- Subscription status.
- Current period.
- Entitlement records.
- Usage counters.

## AI And Knowledge Security

AI features must protect customer data and licensed content.

Rules:

- Do not expose long copyrighted textbook passages.
- Track source licensing before ingestion.
- Store citations and source ids.
- Do not send unnecessary project/customer data to model providers.
- Redact secrets and sensitive fields from prompts.
- Log model/provider usage without storing sensitive raw payloads unnecessarily.
- Deterministic calculations must be tool-generated, not LLM-only.

## Legal Documents Required Before Paid Launch

Required:

- Terms of Service.
- Privacy Policy.
- Cookie/analytics disclosure if analytics are used.
- Engineering-use disclaimer.
- Report disclaimer.
- AI calculation disclaimer.
- Data deletion/export policy.
- Source/content licensing policy for knowledge retrieval.

Report disclaimer should state that generated layouts, calculations, and reports are preliminary unless reviewed and approved by a qualified professional.

AI calculation disclaimer should state that AI assistance can explain and prepare calculations, but deterministic tools and professional review are required for engineering reliance.

## Data Retention And Deletion

Required policies:

- Project and design retention by plan.
- Autosave retention.
- Report/export retention.
- Chat/agent run retention.
- Source document retention.
- Account deletion workflow.
- Organization deletion workflow.
- Customer data export workflow.

Deletion rules:

- Soft delete first for recoverability where appropriate.
- Hard delete according to policy and legal requirements.
- Delete or expire signed URLs by revoking access, not by relying only on URL expiration.

## Security Testing

Required tests:

- Cross-tenant access blocked.
- Viewer cannot edit.
- Revoked/expired share links fail.
- Signed URL cannot be generated without authorization.
- Stripe webhook rejects invalid signatures.
- Entitlements are enforced server-side.
- Managed auth token with wrong issuer/audience is rejected.
- File upload size/type limits are enforced.
- AI proposal cannot mutate saved design without acceptance.

## Compliance Readiness

MVP readiness:

- Secure auth and tenant isolation.
- Encrypted transport.
- Managed database encryption at rest.
- Backups and restore drills.
- Audit events for sensitive actions.
- Legal docs published.

Business/Enterprise readiness later:

- SSO/SAML.
- MFA enforcement.
- Advanced audit exports.
- Data retention controls.
- Security questionnaire package.
- Access reviews.
- Formal incident response policy.
- SOC 2 readiness program.
