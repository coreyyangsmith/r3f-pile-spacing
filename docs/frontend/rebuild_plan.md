# Frontend Rebuild Plan

## Purpose

The frontend rebuild should turn the current React/Vite prototype into a production application for creating, saving, reviewing, exporting, and sharing helical pile designs. The new frontend should preserve the strongest part of the current app, the interactive 3D editor, while replacing the fragile local-only architecture with a typed, testable, API-backed application.

Target frontend stack:

- TypeScript.
- React.
- Tailwind CSS.
- shadcn/ui for accessible component primitives.
- react-three-fiber and Three.js for 3D rendering.
- TanStack Query for server state.
- Zustand or reducer-based state for editor state.
- React Hook Form and Zod for forms and validation.
- OpenAPI-generated client from the FastAPI backend.

The frontend should be rebuilt around the product direction described in the docs: project workspace, saved designs, versioned design JSON, conflict/report exports, team accounts, billing, share links, and later AI-assisted design generation.

## Rebuild Goals

Primary goals:

- Replace Material UI with Tailwind and shadcn/ui.
- Replace scattered context state with a single editor state model.
- Use stable ids instead of object references.
- Load and save canonical design JSON through the backend.
- Support authenticated and unauthenticated entry points.
- Add project/dashboard flows.
- Add account, billing, and organization UI.
- Make exports, share links, and AI design previews first-class user flows.
- Keep Three.js rendering isolated from durable design data.
- Create a frontend structure that can support real product growth.

Non-goals for the first rebuild:

- Full engineering capacity calculation.
- Real-time collaborative editing.
- Enterprise SSO UI.
- Full CAD import/export.
- Autonomous AI final design approval.

## Recommended App Shape

Use a single web app for the first rebuild.

Suggested structure:

```text
src/
  app/
    router/
    providers/
    layouts/
  components/
    ui/
    common/
    feedback/
  features/
    auth/
    billing/
    dashboard/
    projects/
    designs/
    editor/
    reports/
    sharing/
    ai-chat/
    account/
  lib/
    api/
    auth/
    design-schema/
    geometry/
    validation/
    units/
    utils/
  stores/
    editor-store/
    ui-store/
  three/
    scene/
    renderers/
    geometry/
    materials/
    controls/
    overlays/
  styles/
  assets/
  tests/
```

If the repository becomes a monorepo later, the frontend can move into `apps/web/`, with shared schema code in `packages/design-schema/`.

## Routing Plan

Public routes:

- `/` - marketing/product landing page.
- `/pricing` - pricing tiers and subscription CTA.
- `/features` - product feature overview.
- `/viewer/:shareToken` - public or password-protected read-only design viewer.
- `/login` - sign in.
- `/signup` - create account.
- `/forgot-password` - password reset flow if custom auth is used.

Authenticated routes:

- `/dashboard` - recent projects, recent designs, quick actions.
- `/projects` - project list.
- `/projects/new` - create project.
- `/projects/:projectId` - project detail, design list, metadata, activity.
- `/projects/:projectId/designs/:designId` - primary design editor.
- `/projects/:projectId/designs/:designId/versions` - version history.
- `/projects/:projectId/designs/:designId/reports` - report/export center.
- `/templates` - personal/team design templates.
- `/account/profile` - profile settings.
- `/account/security` - auth/security settings.
- `/account/organizations` - organizations and memberships.
- `/account/billing` - billing, plan, invoices, customer portal.
- `/settings` - app preferences.

Admin/support routes can come later.

## Layouts

Public layout:

- Simple top navigation.
- Product CTA.
- Responsive marketing content.
- No heavy editor bundle loaded unless needed.

Authenticated app layout:

- Left navigation or compact top navigation.
- Organization switcher.
- Project/design breadcrumbs.
- User/account menu.
- Billing/trial status indicator when relevant.
- Global command/search later.

Editor layout:

- Full-screen workspace.
- 3D viewport as the main canvas.
- Left panel for object tree, project/design navigation, and mode switching.
- Right panel for inspector controls.
- Bottom or floating panel for conflict matrix, timeline, and logs.
- Optional docked AI chat panel.
- Top toolbar for save, undo/redo, report, share, and view controls.

## UI System With Tailwind And shadcn/ui

Use shadcn/ui for:

- Button.
- Input.
- Textarea.
- Select.
- Checkbox.
- Switch.
- Slider.
- Tabs.
- Dialog.
- Sheet.
- Popover.
- Tooltip.
- Dropdown menu.
- Command.
- Table.
- Badge.
- Alert.
- Toast/Sonner.
- Form.

Use Tailwind for:

- Layout.
- Spacing.
- Responsive behavior.
- Theme tokens.
- Component composition.
- Editor-specific panels and overlays.

Design tokens:

- Define colors as CSS variables.
- Support light and dark themes.
- Include semantic tokens for danger, warning, success, selected, hovered, muted, panel, grid, analysis, and preview.
- Keep analysis colors consistent across UI and 3D overlays.

The product is an engineering workspace, so the interface should be dense, calm, precise, and fast to scan. Avoid decorative UI that competes with the 3D model.

## Frontend Data Model

The frontend should use one canonical design schema that mirrors backend validation.

Core design sections:

- `schemaVersion`
- `units`
- `projectMetadata`
- `pileGroups`
- `piles`
- `helixGroups`
- `soilLayers`
- `loads`
- `materials`
- `assets`
- `annotations`
- `analysisSettings`
- `viewSettings`
- `assumptions`
- `sourceReferences`

Frontend principles:

- Store selected ids, not selected objects.
- Store design state separately from UI panel state.
- Store design state separately from derived Three.js geometry.
- Treat server snapshots as immutable versions.
- Treat autosave and AI output as patches or proposals until accepted.

## State Management

Use two categories of state.

### Server State

Use TanStack Query for:

- Current user.
- Organizations.
- Projects.
- Designs.
- Design versions.
- Reports.
- Share links.
- Billing status.
- AI chat threads.
- Asset libraries.

Benefits:

- Caching.
- Loading/error states.
- Refetching.
- Optimistic updates where appropriate.
- Mutation tracking.

### Editor State

Use Zustand with Immer, or a reducer if avoiding another dependency.

Editor state should include:

- Current design draft.
- Base version id.
- Dirty state.
- Selected object ids.
- Hovered object id.
- Current editor mode.
- Open panels.
- Camera state.
- Visible layers.
- Preview proposal.
- Validation results.
- Undo/redo stacks.

Recommended editor actions:

- `loadDesignSnapshot(snapshot)`
- `updatePile(id, patch)`
- `updateHelixGroup(id, patch)`
- `updateHelix(id, patch)`
- `updateSceneSettings(patch)`
- `setSelectedObject(id)`
- `setVisibleLayer(layer, visible)`
- `applyDesignPatch(patch)`
- `setPreviewProposal(proposal)`
- `acceptPreviewProposal()`
- `rejectPreviewProposal()`
- `markSaved(versionId)`

## API Integration

The backend will be FastAPI. Generate a typed frontend client from the backend OpenAPI schema.

Deployment defaults:

- Vercel hosts the frontend.
- The FastAPI API runs on AWS ECS Fargate behind an AWS Application Load Balancer.
- Each Vercel environment points at the matching API base URL.

Recommended approach:

- Backend exposes OpenAPI JSON.
- Frontend generates TypeScript API types and client functions.
- API client uses `fetch` or a small wrapper.
- Auth uses httpOnly cookies, so the client includes credentials.

Frontend API modules:

- `lib/api/client.ts`
- `lib/api/projects.ts`
- `lib/api/designs.ts`
- `lib/api/reports.ts`
- `lib/api/billing.ts`
- `lib/api/share-links.ts`
- `lib/api/ai-chat.ts`
- `lib/api/assets.ts`

API behavior:

- Centralize error parsing.
- Convert backend validation errors into form errors.
- Handle 401 by redirecting to login.
- Handle 403 by showing permission-specific UI.
- Handle subscription/entitlement errors with upgrade prompts.

## SSE Streaming Client

The agent chat will need token and tool-progress streaming. Use Server-Sent Events for the first implementation because the primary stream direction is backend-to-frontend.

Frontend responsibilities:

- Open a stream for an agent run.
- Parse typed SSE events.
- Append token deltas to the active assistant message.
- Render tool progress, retrieval progress, math results, warnings, and design proposals as structured message parts.
- Handle reconnects.
- Fall back to refetching the persisted run if the stream fails.
- Let the user stop generation when the backend supports cancellation.

Suggested stream flow:

1. User submits a chat message with `POST /chat/threads/{threadId}/messages`.
2. Backend returns `runId`, `messageId`, and stream URL.
3. Frontend opens `EventSource` to the AWS-hosted FastAPI endpoint `/agent-runs/{runId}/events`.
4. Frontend applies ordered events to a local streaming buffer.
5. On `done`, frontend invalidates the thread query and reloads durable messages.

Typed events to support:

- `run.started`
- `message.delta`
- `message.completed`
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

Implementation notes:

- Native `EventSource` is simplest for GET streams.
- If the app needs POST streaming or custom headers that `EventSource` cannot send, use a small fetch-based SSE parser.
- Use credentials/cookies carefully with CORS.
- Configure CORS to allow the Vercel preview, staging, and production origins.
- Track last received event id for reconnect support.
- Treat the stream as transient UI state; persisted messages remain the source of truth.

## Authentication UX

Frontend responsibilities:

- Sign up.
- Sign in.
- Sign out.
- Email verification prompt if needed.
- Password reset if custom auth is used.
- Organization selection after login.
- Protected routes.
- Session loading state.
- Account security page.

Auth states:

- Anonymous.
- Authenticated with no organization.
- Authenticated with personal organization.
- Authenticated with team organization.
- Expired session.
- Invited user.

Use route guards:

- Public-only routes: login/signup.
- Auth-required routes: dashboard/editor/account.
- Org-required routes: projects/designs/billing.
- Permission-required UI: billing admin, project edit, report export.

## Account And Organization UI

Account features:

- Profile.
- Email.
- Password/security settings if relevant.
- Active organization.
- User preferences.

Organization features:

- Organization switcher.
- Members list.
- Invite user.
- Change member role.
- Remove member.
- Transfer ownership later.

Role-aware UI:

- Owners/admins can manage billing and members.
- Editors can create/edit projects and designs.
- Viewers can inspect and comment if enabled.

## Billing UI

Billing frontend should support:

- Pricing page.
- Current plan card.
- Usage limits.
- Upgrade/downgrade CTA.
- Stripe Checkout redirect.
- Stripe Customer Portal redirect.
- Stripe publishable key from Vercel environment variables.
- Invoices link if provided by backend/provider.
- Trial banner.
- Failed payment banner.
- Entitlement-specific upgrade dialogs.

Gated actions:

- Create project past limit.
- Save design past limit.
- Export PDF.
- Create share link.
- Use AI design generation.
- Add team members.

UI should explain why an action is blocked and provide the shortest route to upgrade.

Stripe behavior:

- Frontend requests Checkout and Customer Portal sessions from FastAPI.
- FastAPI creates Stripe sessions and returns redirect URLs.
- Frontend never handles raw payment data.
- Entitlement state comes from FastAPI, not directly from Stripe.

## Project Dashboard

Core screens:

- Recent projects.
- Recent designs.
- Create project.
- Search/filter projects.
- Project status badges.
- Archive project.
- Duplicate design.
- Open design editor.

Project detail should show:

- Project metadata.
- Designs.
- Reports.
- Share links.
- Activity.
- Team access later.

## Design Editor

Primary editor modes:

- Select.
- Pile.
- Helix.
- Conflict.
- Soil/site.
- Loads.
- Annotation.
- Settings.
- Report.
- AI assistant.

Core panels:

- Object tree.
- Object inspector.
- Group controls.
- Conflict/checks panel.
- Materials/assets panel.
- Report/export panel.
- AI chat panel.

Editor commands:

- Save.
- Save version.
- Duplicate design.
- Undo/redo.
- Reset camera.
- Toggle layers.
- Export.
- Share.
- Validate.
- Open report center.

## Three.js Integration

Use react-three-fiber with a clear boundary:

- React UI owns forms, panels, commands, and server data.
- Editor store owns canonical draft design JSON.
- Geometry functions derive render data.
- Three.js components render derived data.

3D modules:

- `three/scene/DesignCanvas.tsx`
- `three/renderers/PileRenderer.tsx`
- `three/renderers/HelixRenderer.tsx`
- `three/renderers/SoilLayerRenderer.tsx`
- `three/renderers/AnalysisOverlayRenderer.tsx`
- `three/geometry/pileGeometry.ts`
- `three/geometry/helixGeometry.ts`
- `three/materials/materialRegistry.ts`
- `three/controls/selectionControls.ts`

Scene layers:

- Design.
- Analysis.
- Annotation.
- Environment.
- Preview.
- Debug.

Selection:

- Use raycasting.
- Store design object ids in `object.userData`.
- Highlight selected and hovered objects.
- Sync object tree selection with scene selection.

Performance:

- Cache generated geometry by parameter hash.
- Memoize materials.
- Use instancing for repeated objects.
- Debounce expensive recalculations.
- Use low-detail geometry while dragging.
- Lazy-load imported meshes/textures.

## Geometry And Calculation Functions

Move calculation code outside React components.

Frontend pure functions:

- `derivePilePositions(design)`
- `deriveHelixPositions(design)`
- `generateHelixGeometry(params)`
- `calculateDistance3d(a, b)`
- `buildConflictMatrix(design, settings)`
- `validateDesignGeometry(design)`
- `convertUnits(value, from, to)`

These functions should be tested and share logic with the backend where practical. If duplicated between frontend and backend, version both and ensure test fixtures match.

## Forms And Validation

Use React Hook Form with Zod.

Forms:

- Create project.
- Edit project metadata.
- Create design.
- Pile group settings.
- Individual pile inspector.
- Helix group settings.
- Individual helix inspector.
- Soil layer editor.
- Load editor.
- Report settings.
- Share link settings.
- Account settings.
- Billing/checkout actions.

Validation should happen:

- Immediately for invalid local input.
- On save through backend schema validation.
- Before report/export.
- Before accepting AI-generated design JSON.

## AI Chat Frontend

AI chat should be dockable in the editor.

Core UI:

- Conversation thread.
- Source/citation drawer.
- Tool activity summary.
- Generated design preview card.
- Accept/reject proposal controls.
- Highlight referenced objects in 3D.
- Missing inputs checklist.
- Calculation cards with formulas, substitutions, units, results, and warnings.
- Regenerate/continue/copy message actions.

Important behaviors:

- AI-generated changes are preview-only until accepted.
- Show assumptions and warnings.
- Show source references for technical claims.
- Store accepted proposals as design versions.
- Allow the user to ask the AI to inspect the current model.

Suggested chat components:

- `ChatPanel`
- `ChatComposer`
- `ChatMessage`
- `StreamingMessage`
- `MessageActions`
- `SourceCitationList`
- `ToolCallTimeline`
- `CalculationCard`
- `MathBlock`
- `InlineMath`
- `VariableTable`
- `DesignProposalCard`

Message regeneration:

- Regenerating creates a new agent run linked to the same user message.
- Old assistant messages remain visible as alternatives unless hidden.
- Accepted design proposals cannot be silently replaced by regenerated output.
- A regenerated response should carry its own sources, calculations, and warnings.

Message content model:

- Prefer structured message parts over one markdown blob.
- Supported parts should include text, markdown, inline math, display math, calculation, table, chart, source citation, tool status, warning, error, and design proposal.
- During streaming, message parts can be partial and become finalized when `message.completed` arrives.

## Math Rendering And Calculation UI

The math feature is specified in [math.md](../math.md). Frontend implementation should make calculations understandable, auditable, and visually useful.

Recommended initial libraries:

- KaTeX for read-only inline and display equations.
- Recharts for simple charts and result summaries.
- Lazy-loaded Plotly for advanced scientific or 3D charts only when needed.

Consider later:

- MathJax if accessibility or notation coverage exceeds KaTeX.
- MathLive if users need to edit equations directly.
- Desmos API for interactive graphing/calculator embeds.

Math UI components:

- `InlineMath` for short equations inside chat text.
- `MathBlock` for display equations.
- `CalculationCard` for formula, variables, substitutions, result, status, and source references.
- `CalculationStepList` for multi-step calculations.
- `VariableTable` for values and units.
- `FunctionPlot` for optional equation/parameter plots.
- `ConflictMatrixCard` for calculated pile/helix spacing matrices.

Calculation UI requirements:

- Always show units.
- Always show assumptions and warnings.
- Link to source references when available.
- Distinguish model text from deterministic calculation output.
- Show whether the result is preliminary, warning, pass, or fail.
- Allow calculations to be expanded/collapsed inside long chat answers.
- Support copying LaTeX, values, and tables.

## Reports And Exports Frontend

Report center should support:

- Generate PDF summary.
- Generate CSV pile table.
- Generate CSV helix table.
- Generate conflict matrix CSV.
- Generate image/screenshot.
- View report generation status.
- Download ready files.
- Regenerate report from current version.

Reports should reference immutable design versions, so the UI should show which version is being exported.

## Sharing Frontend

Share links:

- Create read-only link.
- Set expiration.
- Set password if supported.
- Enable/disable downloads.
- Revoke link.
- Copy link.
- Show last viewed/view count if available.

Viewer route:

- Load by share token.
- Show read-only 3D scene.
- Show design summary.
- Hide editing controls.
- Honor download permission.
- Show expired/revoked/password states.

## Testing Plan

Unit tests:

- Geometry derivation.
- Conflict matrix.
- Unit conversion.
- Design schema transforms.
- Editor store reducers/actions.
- Entitlement gating logic.

Component tests:

- Project form.
- Design editor panels.
- Inspector controls.
- Billing banners.
- AI proposal card.
- Share link modal.

End-to-end tests:

- Sign up/login.
- Create project.
- Create design.
- Edit piles/helices.
- Save design.
- Generate report.
- Create share link.
- Open viewer link.
- Upgrade prompt appears for gated feature.

3D tests:

- Canvas renders nonblank.
- Known design renders expected object count.
- Selection works by object id.
- Conflict markers appear for failing case.

## Accessibility

Requirements:

- Keyboard navigable forms and dialogs.
- Accessible shadcn components.
- Clear focus states.
- Screen reader labels for controls.
- Alternative table view for key 3D data.
- Do not require color alone for pass/warn/fail.
- Provide text summaries for conflict results.

The 3D scene itself can be visually rich, but core workflows should have accessible form/table equivalents.

## Build And Deployment

Frontend build:

- TypeScript typecheck.
- ESLint.
- Prettier.
- Unit tests.
- Production build.
- Optional Playwright smoke tests.
- Sentry source map upload for staging and production.

Deployment:

- Vercel hosts the frontend.
- Vercel preview deployments are created for pull requests.
- Staging deployment uses the staging AWS API URL.
- Production deployment uses the production AWS API URL.
- Environment variables include API base URL, managed auth public config, Stripe publishable key, Sentry DSN, app environment, and feature flags.
- Production deploy requires smoke tests for login shell, dashboard, editor load, report request, share viewer, and SSE stream connection.
- Rollback uses Vercel deployment rollback to a known good deployment.

Environment variables:

- `VITE_API_BASE_URL`.
- Managed auth public config, such as issuer/domain/client id.
- `VITE_STRIPE_PUBLISHABLE_KEY`.
- `VITE_SENTRY_DSN`.
- `VITE_APP_ENV`.
- `VITE_FEATURE_FLAGS`.

## Migration From Current Frontend

Recommended sequence:

1. Create new design schema and fixtures.
2. Build pure geometry/calculation functions.
3. Build new Tailwind/shadcn layout shell.
4. Build authenticated app shell with mocked API data.
5. Build project dashboard.
6. Build editor store.
7. Rebuild 3D scene around canonical design JSON.
8. Rebuild pile/helix inspector panels.
9. Add save/load through FastAPI.
10. Add reports/export UI.
11. Add billing/account UI.
12. Add share viewer.
13. Add AI chat preview flow.

## Frontend MVP Definition Of Done

The frontend MVP is ready when:

- Users can sign in and reach a dashboard.
- Users can create/open projects and designs.
- The editor loads canonical design JSON from the backend.
- The editor can edit piles/helices and save.
- The 3D scene renders from saved data.
- Conflict checks run and display clearly.
- Reports can be requested and downloaded.
- Billing/entitlement states are reflected in the UI.
- Share links open a read-only viewer.
- Tests cover geometry, core editor actions, and main user flows.
- The UI uses Tailwind/shadcn consistently with no dependency on Material UI.
