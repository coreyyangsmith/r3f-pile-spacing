# Backend Rebuild Docs

This folder specifies the backend rebuild for the helical pile design application.

## Files

- [rebuild_plan.md](./rebuild_plan.md) - full FastAPI backend plan for authentication, accounts, billing, data/storage, project/design persistence, exports, SSE streaming, Redis/queue infrastructure, AI support, operations, and rollout.

## Backend Goal

Build an AWS-hosted FastAPI backend that turns the current frontend-only prototype into a real SaaS product with managed-auth users, organizations, saved projects, durable design versions in RDS PostgreSQL, S3-backed files, SQS-backed jobs, Stripe-paid feature access, exports, share links, and later AI-assisted design workflows.
