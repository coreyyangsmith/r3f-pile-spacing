# Current Application State

## Purpose

The application is a React, TypeScript, Vite, and react-three-fiber prototype for visualizing and editing helical pile group designs in 3D. It is oriented around geotechnical or foundation design workflows where a user needs to configure piles, configure helices, inspect spacing conflicts, and present a visual model of the design.

The current product is closer to an interactive design and visualization workbench than a full commercial SaaS. It has a marketing landing page, an editor route, a 3D pile scene, basic pile and helix controls, settings controls, and an initial conflict matrix. It does not yet have user accounts, saved projects, billing, collaboration, export implementation, or a production backend.

## Current User Experience

The app has two routes:

- `/` shows a marketing landing page with a hero, animated 3D pile preview, feature cards, navigation, and a "Try Now!" CTA that opens the editor.
- `/editor` shows the interactive editor with a left-side control panel and a right-side react-three-fiber canvas.

The editor is organized by four selection chips:

- `Conflict` lets a user choose two piles, set a tolerance multiplier based on helix diameter, and view a matrix of calculated helix-to-helix distances.
- `Pile` lets a user edit group pile settings and individual pile settings.
- `Helix` lets a user select a pile, edit group helix settings, and edit individual helix geometry settings.
- `Settings` lets a user change visual/debug settings such as locked piles, floor visibility, colors, axes helpers, and wireframes.

The most important current workflow is:

1. Open the editor.
2. Adjust the number, length, diameter, batter angle, and spacing radius of the pile group.
3. Select a pile.
4. Configure the number, diameter, first distance from bottom, and spacing of helices on that pile.
5. Optionally adjust individual helix geometry details.
6. Use the conflict tab to compare helix spacing between two selected piles.
7. Inspect the 3D scene as changes are made.

## Technology Stack

The app is currently frontend-heavy:

- Vite for local development and builds.
- React 18 for the UI.
- TypeScript with strict settings.
- React Router for page routing.
- Material UI for UI primitives, theme, typography, and controls.
- Emotion for styled/MUI integration.
- react-three-fiber and Three.js for WebGL rendering.
- drei for camera/orbit controls.
- react-color for color picking.
- Axios is present, with a basic client pointed at `http://127.0.0.1:8000/api/`, but the current inspected UI does not rely on a live backend.
- Docker and docker-compose are present for a containerized development workflow.

There are no test files discovered in the repository. A build check was attempted, but the workspace does not currently have installed dependencies, so `vite` was unavailable and the build could not run.

## Repository Structure

Top-level structure:

- `src/` contains the application source.
- `public/` contains public icons, matcaps, and material textures.
- `documentation/` contains older planning/design artifacts, draw.io files, and PDFs.
- `docs/` contains the current planning documents.
- `scripts/` contains a `jscolor.js` script.
- `Dockerfile` and `docker-compose.yaml` define a containerized dev server.
- `package.json`, `tsconfig.json`, `.eslintrc.cjs`, `.prettierrc.json`, and `vite.config.ts` define frontend tooling.

Important `src/` folders:

- `src/pages/Landing/` contains the marketing page, feature cards, pricing card component, and 3D landing scene.
- `src/pages/Editor/` contains the editor shell, editor panels, and reusable editor controls.
- `src/pages/PileSpacing/` contains the 3D canvas experience and pile/helix scene components.
- `src/context/` contains React context providers for piles, helices, settings, and selection.
- `src/hooks/` contains thin hooks over the contexts plus lookup helpers.
- `src/components/` contains button, navigation, table, domain model, and shared UI components.
- `src/types/` contains TypeScript interfaces for pile, helix, settings, selection, and common position fields.
- `src/utils/` contains lookup helpers, context parsing helpers, parameter constants, and custom material helpers.
- `src/themes/` contains the MUI theme and color constants.

## Runtime Architecture

`src/main.tsx` mounts the app into the root DOM node and wraps it in `BrowserRouter`.

`src/App.tsx` wires the app together:

- `SettingsProvider`
- `SelectionProvider`
- `PileProvider`
- `HelixProvider`
- Material UI `ThemeProvider`
- `CssBaseline`
- React Router routes for `/` and `/editor`

The provider order matters because helix initialization calls pile lookup hooks to attach helix groups to piles.

## Domain Model

The core domain objects are defined as TypeScript interfaces and class-like models:

- `Pile`
  - `id`
  - `length`
  - `diameter`
  - `batterAngle`
  - `helices`
  - `x`, `y`, `z`
  - `rotation`

- `Piles`
  - `piles`
  - `number`
  - `spacingRadius`
  - `addPile`
  - `removePile`

- `Helix`
  - `id`
  - `number`
  - `diameter`
  - `thickness`
  - `rise`
  - `rotations`
  - `segsPerStep`
  - `radius`
  - `x`, `y`, `z`
  - `rotation`

- `Helices`
  - `helices`
  - `distanceFromBottom`
  - `spacing`
  - `pileRef`
  - `addNewHelix`
  - `removeLastHelix`

- `Settings`
  - pile locking
  - floor visibility/color
  - background color
  - axes helper toggles
  - wireframe toggles

The current domain state is all in memory. Refreshing the browser loses changes.

## State Management

State is managed with React Context and local component state:

- `PileContext` owns a `Piles` object.
- `HelixContext` owns an array of `Helices` groups.
- `SettingsContext` owns visual and debug settings.
- `SelectionContext` owns selected section, selected pile, second selected pile, and selected helix.

Editor panels generally keep local form state with `useState`, then use `useEffect` to push changes back into context. Some updates replace context objects, while others mutate existing object or array references and then call `setState`.

Important current implications:

- Piles and helices are duplicated in related contexts, which creates synchronization risk.
- Selection stores object references, which can become stale when pile or helix arrays are regenerated.
- The conflict calculation expects pile objects to have helix groups attached.
- Some TypeScript types allow nulls, but several calculations assume non-null values after selection.
- Save and Cancel buttons are mostly placeholders and do not represent committed or reversible state.

## 3D Rendering Pipeline

The editor canvas renders `PileSpacingExperience`.

`PileSpacingExperience`:

- Reads `settings` and `piles` from context.
- Renders orbit controls, background color, lights, and optional floor.
- Generates piles by iterating the pile context.
- If `lockPiles` is enabled, it calculates circular pile placement using pile index, pile count, and `spacingRadius`.
- Passes each pile to the 3D `Pile` component.

The 3D `Pile` component:

- Renders a cylinder for the pile shaft.
- Renders a cone for the pile tip.
- Uses `MeshGalvanizedMetalMaterial`.
- Looks up matching helices for the pile id and renders each `Helix`.

The 3D `Helix` component:

- Generates a custom helical mesh by deforming a `THREE.BoxGeometry`.
- Uses helix diameter, rotations, rise, segment count, and radius.
- Calculates vertical placement from pile length, distance from bottom, spacing, and helix id.
- Uses the same galvanized material helper.

The landing page uses a separate `LandingScene` that renders an auto-rotating pile preview in a circular hero container.

## Existing Feature Coverage

Implemented or partially implemented:

- Marketing landing page.
- Editor route.
- 3D pile rendering.
- 3D helix rendering.
- Group pile count, length, diameter, batter angle, and spacing radius controls.
- Individual pile position, rotation, length, diameter, and batter angle controls.
- Group helix count, diameter, first distance from bottom, and spacing controls.
- Individual helix thickness, diameter, rise, rotations, and segment controls.
- Scene/debug settings.
- Conflict matrix UI and initial distance calculation.
- Basic navigation between editor sections.
- MUI theme and custom color palette.

Not implemented or placeholder:

- User authentication.
- Saved projects.
- Design versioning.
- Backend persistence.
- Team/organization workspaces.
- Billing and subscription management.
- Real export to CSV/PDF/image/CAD.
- Import from CAD, CSV, or project files.
- Engineering-grade validation reports.
- Real-time collaboration.
- Public share links.
- Production deployment configuration.
- Automated testing.

## Product Signals Already Present

The codebase already points toward a SaaS shape:

- Existing old high-level docs mention `User` and `Project` schema ideas.
- The landing page has a pricing component, although it is not currently rendered.
- The editor has "Save", "Cancel", and "Export Design to CSV" placeholders.
- The API client hints at a future REST backend.
- The product copy already targets geotechnical design and 3D pile visualization.

These are strong signals that the next profitable step should be project persistence and paid export/reporting, not just more local visualization controls.

## Technical Health Notes

Current risks from inspection:

- No verified build in this workspace because dependencies are not installed.
- No automated tests were discovered.
- State synchronization between `PileContext`, `HelixContext`, and `SelectionContext` is fragile.
- Some state updates mutate objects/arrays in place before setting context.
- The `Pile` model allows `helices` to be null, while conflict calculations assume `pile.helices` exists.
- Units are not consistently represented or validated in the domain model; labels include meters and centimeters without a central unit system.
- The Dockerfile runs the Vite dev server, so it is not a production static-serving image.
- The Axios API client is hard-coded to localhost and is not integrated with environment configuration.
- Several buttons and navigation items log to console or are commented out.
- Pricing content exists but is not part of the visible landing page.
- The app has no persistence, authorization, or multi-user boundary.

## Current Best Interpretation

The current app should be treated as a promising visual prototype for a helical pile spacing and project design SaaS. The valuable core is the 3D configuration and conflict-checking experience. The missing commercial layer is project persistence, trustworthy calculations, shareable reports, and a workflow that fits how engineers, estimators, contractors, and clients collaborate around foundation designs.
