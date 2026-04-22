# Product Strategy And Monetization Plan

## Product Positioning

The strongest positioning is:

> A web-based helical pile design workspace for quickly visualizing pile groups, checking helix spacing conflicts, and producing client-ready design outputs.

The product should not initially claim to replace stamped engineering software. The safer and more profitable early position is a design communication, layout validation, project management, and report generation tool for teams that already understand their engineering obligations.

Primary early customers:

- Helical pile installers and foundation contractors.
- Small geotechnical engineering teams.
- Structural engineers who need quick layout visualization.
- Estimators who prepare proposals and client-facing reports.
- Project managers coordinating pile designs across sites, clients, and revisions.

The current 3D editor is the hook. The paid product should package that hook into saved work, repeatable project workflows, and outputs people can send to clients or teams.

## Customer Jobs

Important jobs the product can serve:

- Create a pile group layout quickly.
- Adjust pile and helix geometry without needing CAD expertise.
- See a design in 3D before field work or client presentation.
- Detect obvious helix spacing conflicts.
- Compare design alternatives.
- Save project history and revisions.
- Produce a clean PDF/CSV/image package for bids, review, or internal records.
- Share a read-only design link with clients or collaborators.
- Standardize recurring project types with templates.

## Best Ideas To Block Out First

These are the best commercial ideas to plan around first.

### 1. Project Workspace And Saved Designs

This is the most important paid-product foundation. Users need accounts, projects, saved designs, revisions, and a dashboard before the app can become part of real work.

Why it is valuable:

- Turns the editor from a demo into a durable workspace.
- Supports subscriptions naturally.
- Enables every later paid feature: export, collaboration, templates, audit logs, and team seats.

Initial scope:

- Account sign-up/sign-in.
- Project list.
- Create project.
- Save design.
- Duplicate design.
- Rename/archive project.
- Basic project metadata: client, site, notes, status, created date, updated date.
- Design versions or snapshots.

### 2. Conflict Checking And Report Export

The current conflict matrix is a natural monetization point. Users will pay for trustworthy outputs, especially if exports save time or improve communication.

Initial scope:

- Deterministic conflict calculation.
- Clear pass/warn/fail thresholds.
- Configurable tolerance based on helix diameter, absolute distance, or project standard.
- Export CSV.
- Export PDF summary with screenshots, pile table, helix table, and conflict matrix.
- Include project metadata and revision id.

### 3. Shareable Review Links

Read-only sharing creates viral distribution and makes the product useful in client/team workflows.

Initial scope:

- Public or password-protected read-only link.
- Viewer mode with orbit controls.
- Design summary sidebar.
- Download-disabled option.
- Expiring link option for paid tiers.

### 4. Templates And Design Libraries

Templates create retention because users can standardize recurring work.

Initial scope:

- Save a design as a template.
- Organization-level templates.
- Common pile/helix presets.
- Material and unit presets.
- Project type presets.

### 5. Proposal And Presentation Package

Contractors and estimators may pay for outputs that help them sell work.

Initial scope:

- Branded PDF report.
- Exported hero render.
- Project summary.
- Assumptions and notes.
- Optional scope/pricing fields if the product expands toward estimating.

### 6. Team Workspaces

Teams justify higher pricing once projects and exports work well.

Initial scope:

- Organizations.
- Seat-based billing.
- Owner/admin/member/viewer roles.
- Shared projects.
- Shared templates.
- Comments and assignment later.

### 7. Advanced Engineering Integrations

This should come later because it increases liability and domain complexity.

Possible later scope:

- Soil layer modeling.
- Load cases.
- Torque/capacity fields.
- CAD import/export.
- Integration with structural/geotechnical analysis tools.
- Engineering review workflows.

## Feature Roadmap

### Foundation Phase

Goal: turn the local prototype into a stable product base.

- Stabilize current 3D editor state model.
- Define a canonical design schema.
- Add unit handling and validation.
- Add save/load locally first.
- Add automated tests around pile/helix calculations.
- Add exportable design JSON.
- Clean up placeholder buttons and route dead ends.

### First Paid Product

Goal: make the app useful enough for individual professionals.

- Authentication.
- Project dashboard.
- Saved designs.
- Design duplication.
- Conflict report export.
- PDF/CSV export.
- Screenshot/image export.
- Basic pricing page.
- Stripe subscription checkout.
- Free and Pro entitlement checks.

### Team Product

Goal: justify team pricing.

- Organization workspaces.
- Team members and roles.
- Shared projects.
- Shared templates.
- Read-only share links.
- Comments on designs or versions.
- Activity history.
- Branded exports.

### Business/Enterprise Product

Goal: support larger clients and higher contract values.

- SSO.
- Audit logs.
- Data retention controls.
- Private deployment option.
- Advanced admin controls.
- SLA and support commitments.
- Custom templates and onboarding.
- API access.

## Pricing Tiers

Pricing should start simple and evolve after user interviews. The current best shape is a hybrid of seat-based SaaS and feature gates.

### Free

Purpose: acquisition and proof of value.

Possible price:

- $0/month

Possible limits:

- Browser-only or limited cloud saves.
- 1 active project.
- Limited pile count or design count.
- Basic visualization.
- Basic conflict preview.
- Watermarked exports or no exports.
- No private share links.

Best for:

- Students, evaluators, and first-time users.
- Contractors trying the editor before paying.

### Solo Pro

Purpose: monetize individual professionals.

Possible price:

- $19-$39/month per user.

Possible features:

- Unlimited local editing.
- Cloud-saved projects.
- Design versions.
- PDF/CSV/image exports.
- Project notes and metadata.
- Basic templates.
- Private share links.
- Priority support by email.

Best for:

- Independent engineers.
- Estimators.
- Small contractors.

### Team

Purpose: monetize small companies and recurring collaboration.

Possible price:

- $79-$149/month for 3 seats, then $15-$30/month per additional seat.

Possible features:

- Everything in Solo Pro.
- Organization workspace.
- Shared projects.
- Shared templates.
- Role-based access.
- Branded reports.
- Comments and activity history.
- Centralized billing.

Best for:

- Small engineering firms.
- Foundation contractors with multiple estimators/designers.

### Business

Purpose: higher-value customers with process and compliance needs.

Possible price:

- $299-$599/month, depending on included seats and support.

Possible features:

- Everything in Team.
- Advanced export/report package.
- Audit logs.
- Project status workflows.
- Advanced permissions.
- Custom report branding.
- API or bulk export.
- Support SLA.
- Data retention settings.

Best for:

- Regional contractors.
- Engineering companies with multiple teams.
- Organizations that need recordkeeping and admin controls.

### Enterprise

Purpose: custom contracts and risk-sensitive buyers.

Possible price:

- Custom annual contract.

Possible features:

- SSO/SAML.
- Custom security review.
- Private cloud or on-prem deployment.
- Data residency.
- Dedicated support.
- Custom templates and integrations.
- Contracted uptime targets.
- Procurement-friendly invoicing.

Best for:

- Large engineering firms.
- Infrastructure contractors.
- Organizations with strict IT requirements.

## Alternative Revenue Streams

Potential add-ons:

- Paid report credits for occasional users.
- Template marketplace.
- White-label reports.
- Custom onboarding packages.
- Engineering workflow consulting.
- API access for internal systems.
- Private deployment fee.
- Training and certification content.

Avoid too early:

- Complex marketplace dynamics.
- Heavy simulation features before validation.
- Liability-heavy engineering claims without domain review.
- Too many pricing gates before the value proposition is proven.

## Product Metrics

Track these early:

- Visitor to editor conversion.
- Editor activation: created or modified a design.
- Number of saved designs per user.
- Export attempts.
- Share link creation.
- Return visits to a project.
- Free-to-paid conversion.
- Time to first saved project.
- Time to first export.
- Churn reason.

The strongest monetization signal will likely be repeated exports and saved project revisits.

## Initial Go-To-Market Ideas

Low-cost channels:

- Direct outreach to helical pile installers and foundation contractors.
- Short demo videos showing "from pile layout to client PDF in 2 minutes".
- SEO pages around helical pile spacing, pile group visualization, and foundation design communication.
- Free browser editor with export locked behind account creation.
- Case-study style examples for common project types.

Early sales motion:

- Offer free trial of Solo Pro.
- Interview users after their first export.
- Convert teams by asking whether they need shared projects and branded reports.
- Sell Business only after Team workflows show repeated usage.

## Main Strategic Bet

The best near-term bet is not "more 3D controls." The best bet is:

> Make the current 3D pile spacing editor save real projects and produce professional reports.

That creates a clear reason to pay while keeping the core product focused.
