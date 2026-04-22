# Deployment Docs

This folder locks the deployment plan for the rebuilt application.

## Locked Stack

- Frontend hosting: Vercel.
- Backend infrastructure: AWS.
- Object storage: S3.
- Payments: Stripe.
- Authentication: managed auth provider, with FastAPI storing application users, organizations, roles, and entitlements.
- Infrastructure as Code: Terraform.
- Backend runtime: FastAPI API service plus separate worker service on ECS Fargate.
- Database/cache/queue: RDS PostgreSQL, ElastiCache Redis, SQS with dead-letter queues.

## Files

- [architecture.md](./architecture.md) - production topology, environments, service boundaries, S3 layout, runtime contracts, and environment variables.
- [ci_cd.md](./ci_cd.md) - Vercel and AWS CI/CD, promotion, smoke tests, migrations, and rollback.
- [operations.md](./operations.md) - observability, alerts, backups, restore drills, runbooks, and production readiness scenarios.
- [security_compliance.md](./security_compliance.md) - managed auth integration, secrets, IAM, tenant isolation, legal docs, and compliance gates.
