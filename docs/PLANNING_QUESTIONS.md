# Planning Questions

This document lists the questions to answer before moving from planning into implementation. The goal is to prevent accidental overbuilding and to make sure the most profitable path is also technically realistic.

## Product Strategy

- Who is the first buyer: installer, engineer, estimator, project manager, or firm owner?
- Who is the daily user?
- What painful task does the current editor solve better than their current workflow?
- Is the product primarily a design tool, a communication tool, a project management tool, or a reporting tool?
- What claims can the product safely make without creating engineering liability?
- What must be explicitly described as visualization or preliminary review rather than certified engineering analysis?
- What is the narrowest paid workflow worth launching?
- What would make a user pay after using the free editor once?
- What is the first "aha" moment in the product?
- What is the first paid "must-have" moment?

## Customer Discovery

- How do target users currently design or review helical pile layouts?
- What software do they already use?
- Do they use spreadsheets, CAD, PDFs, photos, or manual calculations?
- How often do they need to compare pile designs?
- How often do spacing conflicts happen?
- How expensive is a spacing or communication mistake?
- Who approves the final design?
- Who prepares client-facing documentation?
- What output format do clients or reviewers expect?
- What objections would stop adoption?
- What terminology do users actually use for piles, helices, spacing, batter, and conflicts?

## Core Workflow

- What is the minimum project data required before a design can be useful?
- Should users start from a blank design, a template, or an import?
- Should the editor require a project before editing, or allow anonymous editing first?
- Should free users be able to save anything?
- Should autosave be immediate or manual?
- Should changes create versions automatically?
- Should "Save" mean save current state, create a version, or publish a revision?
- What does "Cancel" mean in an editor with live updates?
- How should users compare two design versions?
- What is the expected lifecycle of a project from draft to approved/exported?

## Project Management

- What fields belong on a project?
- Should projects support clients, sites, job numbers, addresses, and notes?
- Should projects contain multiple designs?
- Should designs contain multiple revisions?
- Should archived projects count against plan limits?
- What project statuses are needed?
- Do users need project folders, tags, or search?
- Should projects belong to users or organizations by default?
- How should ownership transfer work?
- What should happen to projects when a subscription lapses?

## Domain Model

- What are the canonical units for length, diameter, spacing, angle, and elevation?
- Should each project choose metric or imperial units?
- Should stored data always use a base unit with display conversion?
- Which values are user-entered and which values are calculated?
- Should pile and helix ids be stable across edits and versions?
- Can a pile have zero helices?
- Can helices vary by pile, or should groups inherit from templates?
- How should pile locking work in the data model?
- How should individual pile overrides be represented?
- What constraints make a design invalid?

## Conflict Checking

- What exact distance is being checked: center-to-center, edge-to-edge, projected plan distance, 3D distance, or something else?
- Is tolerance a multiple of helix diameter, an absolute distance, or both?
- Should the app show pass/warn/fail states?
- What should count as a warning?
- Should users be able to configure project-specific standards?
- Should conflict checking run client-side, server-side, or both?
- Should reports include the formula and assumptions?
- What cases require domain expert review before implementation?
- How should the app communicate that conflict checking is advisory unless certified?
- What tests are needed to trust the calculation?

## Exports And Reports

- Which export matters first: CSV, PDF, PNG, JSON, DXF, or CAD?
- Who receives exported files?
- What should a PDF report contain?
- Should reports be branded by the product, the user, or the company?
- Should free reports be watermarked?
- Should exports be generated client-side or server-side?
- Should exports be stored and versioned?
- Should reports include a screenshot from a fixed camera angle?
- Should reports include disclaimers?
- Should exports be gated by plan, project count, or usage credits?

## Pricing And Packaging

- What should remain free forever?
- What feature should trigger the first paid upgrade?
- Should the free plan allow cloud saves?
- Should pricing be per user, per organization, per project, or per report?
- What plan limit is easiest for users to understand?
- Should reports be unlimited in paid plans or sold as credits?
- Is annual billing important for this market?
- Should team pricing include a fixed number of seats?
- What features justify Business pricing?
- What features require Enterprise/custom pricing?

## Authentication

- Should users authenticate before opening the editor?
- Should anonymous users be able to create a design and then save after signing up?
- Should sign-in support email/password, magic links, OAuth, or all of these?
- Is SSO needed for the first paying customers?
- Is MFA needed early?
- How should password resets and email verification work?
- Should users have personal workspaces?
- Can one user belong to multiple organizations?
- How should invitations work?
- What happens when a user leaves an organization?

## Authorization And Teams

- What roles are required at launch?
- Can viewers open 3D designs?
- Can viewers export?
- Can editors delete projects?
- Can admins manage billing?
- Should project access differ from organization access?
- Are share links enough before full team collaboration?
- Do teams need audit logs?
- Do teams need approval workflows?
- How should role changes affect existing share links?

## Data And Persistence

- What is the source of truth for a design?
- Should pile and helix data be normalized or stored as JSON snapshots?
- How often should autosave run?
- How should conflicting edits be handled?
- How long should version history be retained?
- Can users permanently delete projects?
- Should deleted projects have a recovery window?
- What backups are required?
- What data export rights should users have?
- How should schema migrations work for old design snapshots?

## Frontend Architecture

- Should the current Context API approach be kept, replaced with a reducer, or replaced with a store?
- Which calculations should be pure functions outside React components?
- How should selection be represented: object references or ids?
- How should form state handle draft values and validation errors?
- Should the editor support undo/redo?
- Should the 3D scene be decoupled from editor panels?
- How should expensive geometry updates be throttled or memoized?
- What browser and device support is required?
- Does the editor need responsive mobile support, or is desktop/tablet enough?
- What accessibility standard should the UI target?

## Backend Architecture

- FastAPI is selected for the backend; what OpenAPI/type-generation workflow should keep frontend types synchronized?
- Should the API be REST, GraphQL, or tRPC?
- Which database should be used?
- Which ORM should be used?
- Should design snapshots live in JSONB?
- Which jobs need a background worker?
- Which API endpoints are needed for the first paid release?
- How should file uploads and generated reports be stored?
- How should the API enforce organization isolation?
- How should rate limits be applied?

## Deployment And Environments

- Where should the frontend be hosted?
- Where should the backend be hosted?
- Should preview environments exist for every pull request?
- What environments are needed: local, staging, production?
- How should environment variables be managed?
- Should Docker be used only for local development or also production?
- What CI checks are required before deploy?
- What rollback process is required?
- Who has production access?
- What uptime target is appropriate for the first paid release?

## Scalability

- What is the maximum expected number of piles and helices in a design?
- What scene size should the frontend support smoothly?
- Should there be a low-detail rendering mode?
- Should geometry calculations move to web workers?
- What reports or exports might require background processing?
- How many users are expected in year one?
- What database tables need indexes from day one?
- What data should be cached?
- What CDN strategy is needed for static assets?
- How will large design files be handled?

## Security

- What customer data is sensitive?
- Are project names, site addresses, and client names confidential?
- Is data encryption at rest required by customers?
- How should secrets be managed?
- How should access tokens or sessions be stored?
- What audit events are required?
- What vulnerability scanning should run in CI?
- What dependency update process is acceptable?
- What is the incident response process?
- When will SOC 2 or a similar security posture become necessary?

## Legal And Liability

- What disclaimers are required for engineering calculations?
- Does the app need terms of service before accepting payment?
- Does the app need a privacy policy before collecting accounts?
- Are there professional engineering regulations that affect product claims?
- Should reports include "not for construction" or similar language by default?
- Who owns generated designs?
- Can anonymized usage data be used to improve the product?
- What data deletion rights apply to customers?
- Is cyber insurance needed before enterprise sales?
- Should enterprise contracts include limitation of liability language?

## Support And Operations

- How will users report issues?
- What support level is included in each plan?
- What response time is promised?
- Who handles billing support?
- How are failed payments handled?
- How are export/report failures retried?
- What admin tools are needed for support?
- Can support impersonate users, and if so, how is that audited?
- What product analytics are allowed?
- What alerts should wake someone up?

## Go-To-Market

- What niche should the first landing page target?
- What demo project should be used in videos and screenshots?
- Should the product offer a public sample editor without account creation?
- What search terms should the site target?
- Who should be contacted for discovery calls?
- What free resource can attract the target audience?
- What proof is needed before charging?
- What early adopter discount, if any, should exist?
- Should pricing be public from launch?
- What onboarding email or in-app checklist is needed?

## Decision Blocks Before Implementation

Answer these first:

- What is the first paid workflow: saved projects, exports, team workspaces, or all three?
- What is the canonical design schema?
- What is the first pricing model?
- What exact calculation should conflict checking perform?
- What export format is most valuable first?
- What auth provider or custom auth approach will be used?
- What backend stack will be used?
- What deployment target will be used?
- What legal disclaimer is required for reports and calculations?
- What minimum tests must pass before paid launch?

## Recommended Immediate Planning Output

Before writing production code, create:

- A one-page product brief.
- A canonical design JSON schema.
- A wireframe for the project dashboard.
- A wireframe for saved designs and versions.
- A report template outline.
- A pricing page outline.
- A first-pass database schema.
- A first-pass API route list.
- A launch checklist for security, billing, and deployment.
