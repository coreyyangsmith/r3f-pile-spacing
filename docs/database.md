# Database Design

## Purpose

The database should support the product as a paid design workspace: users, organizations, projects, saved pile designs, versions, reports, share links, billing, AI chat, retrieval sources, and 3D asset management.

The most important database principle is to store durable product and design intent, not frontend implementation details. Three.js meshes, React state, and editor-only view objects should be generated from saved design data.

## Recommended Storage Stack

Recommended initial stack:

- AWS RDS PostgreSQL as the primary database.
- JSONB for canonical design snapshots and calculation outputs.
- `pgvector` for embeddings if AI retrieval is implemented in the same database.
- AWS S3 for generated reports, images, source PDFs, imported meshes, textures, exports, thumbnails, and generated AI artifacts.
- AWS ElastiCache Redis for active SSE buffers, rate limits, short-lived agent run state, and temporary coordination.
- AWS SQS with dead-letter queues for durable background jobs.

Why RDS PostgreSQL:

- Strong relational model for users, teams, projects, billing, and permissions.
- JSONB works well for versioned design snapshots.
- Indexing and transactions are reliable.
- `pgvector` can support early retrieval without adding a separate vector database.

Durability rule:

- PostgreSQL is the durable source of truth.
- Redis is not durable replay storage.
- SQS is the durable production queue.
- S3 stores binary artifacts and private files.

## Multi-Tenant Model

The product should support personal workspaces and team organizations.

Core ownership model:

- A `user` can belong to many `organizations`.
- An `organization` owns projects, designs, templates, reports, assets, and subscriptions.
- A personal workspace can be represented as an organization with one member.
- Every project-scoped row includes `organization_id`.

This makes it easier to move from Solo Pro to Team without rewriting ownership.

## Core Tables

### users

Stores application-level user profile data. Authentication identity may live in an external auth provider.

Fields:

- `id`
- `auth_provider`
- `auth_subject`
- `email`
- `name`
- `avatar_url`
- `default_organization_id`
- `created_at`
- `updated_at`
- `last_seen_at`
- `disabled_at`

Indexes:

- Unique `auth_provider`, `auth_subject`.
- Unique lowercase email if email login is supported.

### organizations

Represents a personal or team workspace.

Fields:

- `id`
- `name`
- `slug`
- `type`: personal, team, business, enterprise.
- `owner_user_id`
- `created_at`
- `updated_at`
- `archived_at`

### organization_memberships

Connects users to organizations with roles.

Fields:

- `id`
- `organization_id`
- `user_id`
- `role`: owner, admin, editor, viewer.
- `status`: active, invited, suspended.
- `created_at`
- `updated_at`

Constraints:

- Unique `organization_id`, `user_id`.

### invitations

Supports team invites.

Fields:

- `id`
- `organization_id`
- `email`
- `role`
- `token_hash`
- `invited_by_user_id`
- `expires_at`
- `accepted_at`
- `revoked_at`
- `created_at`

### projects

Top-level customer work container.

Fields:

- `id`
- `organization_id`
- `name`
- `client_name`
- `project_number`
- `site_name`
- `site_address`
- `description`
- `status`: draft, in_review, approved, sent_to_client, archived.
- `default_units`
- `created_by_user_id`
- `updated_by_user_id`
- `created_at`
- `updated_at`
- `archived_at`

Indexes:

- `organization_id`, `updated_at`.
- `organization_id`, `status`.
- Search index on name/client/site later.

### designs

Represents a design inside a project.

Fields:

- `id`
- `organization_id`
- `project_id`
- `name`
- `current_version_id`
- `thumbnail_file_id`
- `status`: draft, in_review, approved, archived.
- `created_by_user_id`
- `updated_by_user_id`
- `created_at`
- `updated_at`
- `archived_at`

Indexes:

- `project_id`, `updated_at`.
- `organization_id`, `updated_at`.

### design_versions

Immutable named or autosaved design versions.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `version_number`
- `name`
- `kind`: autosave, manual, import, ai_generated, report_locked.
- `snapshot_id`
- `parent_version_id`
- `created_by_user_id`
- `created_at`
- `notes`

Constraints:

- Unique `design_id`, `version_number`.

### design_snapshots

Stores canonical design JSON.

Fields:

- `id`
- `organization_id`
- `design_id`
- `schema_version`
- `snapshot_json` JSONB
- `content_hash`
- `validation_status`: valid, warning, invalid.
- `validation_json` JSONB
- `created_at`

Indexes:

- `design_id`, `created_at`.
- `schema_version`.
- JSONB indexes only for fields that need querying.

Important:

- Treat snapshots as immutable.
- Store full snapshots for durable version history.
- Optionally store patches separately for autosave/collaboration.

### design_patches

Optional table for autosave, undo, collaboration, and AI previews.

Fields:

- `id`
- `organization_id`
- `design_id`
- `base_version_id`
- `patch_json` JSONB
- `source`: user_edit, ai_preview, import, system.
- `created_by_user_id`
- `created_at`
- `applied_at`
- `rejected_at`

## Design JSON Content

The `snapshot_json` should contain canonical design state.

Recommended top-level sections:

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

Do not store:

- React component state.
- Three.js object instances.
- Live geometry buffers.
- Raw generated report files.
- Auth/session data.

## Analysis And Calculation Tables

### calculation_runs

Tracks deterministic calculations such as conflict checks.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `design_version_id`
- `engine_name`
- `engine_version`
- `calculation_type`: conflict_check, geometry_validation, unit_conversion, capacity_estimate.
- `inputs_hash`
- `status`: pending, running, succeeded, failed.
- `started_at`
- `completed_at`
- `created_by_user_id`
- `error_message`

### calculation_results

Stores structured calculation outputs.

Fields:

- `id`
- `calculation_run_id`
- `organization_id`
- `result_json` JSONB
- `summary_json` JSONB
- `created_at`

Use cases:

- Conflict matrix.
- Geometry validation warnings.
- Report-ready summaries.
- Future engineering calculations.

### calculation_steps

Stores reportable steps for calculations shown in chat or exports.

Fields:

- `id`
- `calculation_run_id`
- `organization_id`
- `sequence`
- `step_type`: formula, substitution, simplification, result, warning.
- `latex`
- `text`
- `variables_json`
- `result_json`
- `source_reference_ids`
- `created_at`

### formula_definitions

Stores reusable, versioned formula metadata for deterministic tools.

Fields:

- `id`
- `formula_key`
- `name`
- `description`
- `latex`
- `variables_schema_json`
- `units_json`
- `implementation_version`
- `source_reference_ids`
- `created_at`
- `deprecated_at`

## Reports And Exports

### files

Generic metadata for files stored in object storage.

Fields:

- `id`
- `organization_id`
- `bucket`
- `object_key`
- `file_name`
- `content_type`
- `byte_size`
- `checksum`
- `created_by_user_id`
- `created_at`
- `deleted_at`

### reports

Generated PDF or presentation package.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `design_version_id`
- `report_type`: pdf_summary, csv_export, image_export, proposal_package.
- `status`: pending, generating, ready, failed.
- `file_id`
- `settings_json`
- `created_by_user_id`
- `created_at`
- `completed_at`
- `error_message`

### export_events

Useful for plan limits, analytics, and auditing.

Fields:

- `id`
- `organization_id`
- `user_id`
- `project_id`
- `design_id`
- `report_id`
- `export_type`
- `created_at`

## Sharing And Collaboration

### share_links

Read-only or controlled external access.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `design_version_id`
- `token_hash`
- `access_level`: view, view_and_download.
- `password_hash`
- `expires_at`
- `revoked_at`
- `created_by_user_id`
- `created_at`
- `last_viewed_at`
- `view_count`

### comments

For design review workflows.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `design_version_id`
- `object_id`
- `author_user_id`
- `body`
- `status`: open, resolved.
- `created_at`
- `updated_at`
- `resolved_at`

### activity_events

Audit and timeline data.

Fields:

- `id`
- `organization_id`
- `actor_user_id`
- `project_id`
- `design_id`
- `event_type`
- `entity_type`
- `entity_id`
- `metadata_json`
- `created_at`

Use cases:

- Project created.
- Design saved.
- Report exported.
- Share link created.
- User invited.
- AI proposal accepted.

## Billing And Entitlements

### subscriptions

Stores Stripe or billing-provider subscription state.

Fields:

- `id`
- `organization_id`
- `provider`
- `provider_customer_id`
- `provider_subscription_id`
- `plan_key`
- `status`
- `current_period_start`
- `current_period_end`
- `cancel_at_period_end`
- `created_at`
- `updated_at`

### entitlements

Stores resolved feature access.

Fields:

- `id`
- `organization_id`
- `feature_key`
- `limit_value`
- `is_enabled`
- `source`: plan, override, trial.
- `expires_at`
- `created_at`
- `updated_at`

Feature keys:

- `projects.max`
- `designs.max`
- `exports.pdf`
- `exports.csv`
- `share_links`
- `team_members.max`
- `custom_branding`
- `ai_chat`
- `ai_design_generation`
- `advanced_analysis`

### usage_counters

Tracks metered limits.

Fields:

- `id`
- `organization_id`
- `feature_key`
- `period_start`
- `period_end`
- `count`
- `updated_at`

## AI Chat And Knowledge Retrieval Tables

### chat_threads

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `created_by_user_id`
- `title`
- `created_at`
- `updated_at`
- `archived_at`

### chat_messages

Fields:

- `id`
- `thread_id`
- `organization_id`
- `role`: user, assistant, system, tool.
- `content`
- `metadata_json`
- `created_at`

### agent_runs

Fields:

- `id`
- `thread_id`
- `organization_id`
- `project_id`
- `design_id`
- `status`
- `intent`
- `model`
- `input_json`
- `output_json`
- `created_at`
- `completed_at`
- `error_message`

### agent_tool_calls

Fields:

- `id`
- `agent_run_id`
- `organization_id`
- `tool_name`
- `input_json`
- `output_json`
- `status`
- `created_at`
- `completed_at`

### agent_stream_events

Optional durable event log for streamed agent output. Redis should handle active stream delivery, but compact persisted events can help debugging, replay, and enterprise audit needs.

Fields:

- `id`
- `agent_run_id`
- `organization_id`
- `sequence`
- `event_name`
- `payload_json`
- `created_at`

Durable replay rule:

- The frontend may reconnect to Redis-backed SSE streams while events are retained.
- If Redis replay is unavailable, the app reconstructs final messages, tool calls, calculations, warnings, and proposals from PostgreSQL.
- Redis stream events should be treated as short-lived delivery infrastructure, not the record of truth.

### ai_design_proposals

Stores generated designs or patches before user approval.

Fields:

- `id`
- `organization_id`
- `project_id`
- `design_id`
- `base_version_id`
- `agent_run_id`
- `proposal_json` JSONB
- `patch_json` JSONB
- `status`: pending, previewed, accepted, rejected, superseded.
- `created_by_user_id`
- `accepted_by_user_id`
- `created_at`
- `accepted_at`
- `rejected_at`

### knowledge_sources

Fields:

- `id`
- `title`
- `author`
- `edition`
- `publisher`
- `source_type`: textbook, manual, standard, internal_doc, help_doc.
- `license_status`
- `file_id`
- `metadata_json`
- `created_at`

### knowledge_chunks

Fields:

- `id`
- `source_id`
- `chunk_key`
- `section_title`
- `page_start`
- `page_end`
- `content`
- `content_hash`
- `metadata_json`
- `created_at`

### knowledge_embeddings

Fields:

- `id`
- `chunk_id`
- `embedding_model`
- `embedding`
- `created_at`

### knowledge_graph_nodes

Fields:

- `id`
- `node_type`
- `name`
- `description`
- `metadata_json`
- `source_id`
- `created_at`

### knowledge_graph_edges

Fields:

- `id`
- `from_node_id`
- `to_node_id`
- `edge_type`
- `confidence`
- `source_id`
- `metadata_json`
- `created_at`

### retrieval_events

Fields:

- `id`
- `agent_run_id`
- `organization_id`
- `query`
- `retrieved_chunk_ids`
- `retrieved_node_ids`
- `ranking_json`
- `created_at`

## 3D Asset Tables

### asset_libraries

Fields:

- `id`
- `organization_id`
- `name`
- `scope`: system, organization, project.
- `created_at`
- `updated_at`

### assets

Fields:

- `id`
- `organization_id`
- `asset_library_id`
- `asset_type`: mesh, texture, material, icon, logo.
- `name`
- `file_id`
- `preview_file_id`
- `metadata_json`
- `created_at`
- `updated_at`

### material_presets

Fields:

- `id`
- `organization_id`
- `name`
- `material_type`: standard, physical, basic, debug.
- `material_json`
- `texture_asset_ids`
- `created_at`
- `updated_at`

Use cases:

- Galvanized steel.
- Concrete.
- Soil.
- Warning/red conflict material.
- Transparent clearance material.

## Feature Considerations

### Saved Projects

Required tables:

- `projects`
- `designs`
- `design_versions`
- `design_snapshots`
- `activity_events`

Key consideration:

- Keep project metadata searchable and design data versioned.

### Reports And Exports

Required tables:

- `reports`
- `files`
- `calculation_runs`
- `calculation_results`
- `export_events`

Key consideration:

- Reports should reference immutable design versions, not mutable current designs.
- Report and export binaries are stored in private S3 prefixes and accessed through signed URLs.

### Share Links

Required tables:

- `share_links`
- `activity_events`

Key consideration:

- Store token hashes only, not raw tokens.

### Team Workspaces

Required tables:

- `organizations`
- `organization_memberships`
- `invitations`
- `activity_events`

Key consideration:

- Enforce tenant isolation in every query by `organization_id`.

### Billing

Required tables:

- `subscriptions`
- `entitlements`
- `usage_counters`

Key consideration:

- Billing provider webhooks should update subscription state and recompute entitlements.

### AI Chat

Required tables:

- `chat_threads`
- `chat_messages`
- `agent_runs`
- `agent_tool_calls`
- `ai_design_proposals`
- `retrieval_events`

Key consideration:

- AI-generated design changes should be proposals until accepted by a user.
- Agent jobs run through SQS, active stream delivery uses Redis, and durable conversation state lives in PostgreSQL.

### Knowledge Retrieval

Required tables:

- `knowledge_sources`
- `knowledge_chunks`
- `knowledge_embeddings`
- `knowledge_graph_nodes`
- `knowledge_graph_edges`

Key consideration:

- Respect source licensing and track citations for every technical answer.

### 3D Assets

Required tables:

- `asset_libraries`
- `assets`
- `material_presets`
- `files`

Key consideration:

- Store binary files in S3 outside the database and reference them from design snapshots.

## Indexing Strategy

Early indexes:

- `projects(organization_id, updated_at)`
- `designs(project_id, updated_at)`
- `design_versions(design_id, version_number)`
- `design_snapshots(design_id, created_at)`
- `organization_memberships(user_id, organization_id)`
- `reports(design_id, created_at)`
- `share_links(token_hash)`
- `activity_events(organization_id, created_at)`
- `chat_threads(organization_id, updated_at)`
- `knowledge_chunks(source_id)`
- Vector index on embeddings if using `pgvector`.

Avoid premature indexing inside JSONB until a real query needs it.

## Queue And Stream Retention

Production queue defaults:

- `agent-runs` with `agent-runs-dlq`.
- `report-generation` with `report-generation-dlq`.
- `calculation-runs` with `calculation-runs-dlq`.
- `email` with `email-dlq`.
- `knowledge-ingestion` with `knowledge-ingestion-dlq`.

Retention assumptions:

- SQS message retention should be long enough to survive transient outages.
- DLQ messages are inspected before replay.
- Redis stream/event retention is short-lived and sized for active reconnect/replay only.
- PostgreSQL records are used for durable replay and audit.

## Data Retention

Suggested retention rules:

- Keep manual design versions indefinitely unless deleted by user/admin.
- Keep autosave versions for a limited window or compact them.
- Keep report files while the project exists.
- Keep activity logs according to plan tier.
- Keep AI traces for debugging and audit, but define retention clearly.
- Allow project archive separately from deletion.
- Provide deletion workflows for legal/privacy needs.

## Security Considerations

Database security requirements:

- Every customer-owned row should include `organization_id`.
- Enforce authorization in service layer and consider row-level security later.
- Store share tokens as hashes.
- Store invitation tokens as hashes.
- Do not store raw payment card data.
- Encrypt backups.
- S3 buckets are private by default with Block Public Access enabled.
- S3 downloads/uploads use short-lived signed URLs after authorization checks.
- Use least-privilege database credentials.
- Separate production, staging, and development databases.
- Keep audit logs for sensitive actions.

## Migration Strategy

The application should expect schema changes because the design model will evolve.

Needed:

- Database migrations through a migration tool.
- Design snapshot schema versions.
- Snapshot migration scripts.
- Backward-compatible frontend loaders where practical.
- Validation before and after migration.
- Test fixtures for old design versions.

## Recommended MVP Database Scope

For the first paid MVP, implement:

- Users.
- Organizations.
- Memberships.
- Projects.
- Designs.
- Design versions.
- Design snapshots.
- Files.
- Reports.
- Share links.
- Subscriptions.
- Entitlements.
- Activity events.

Defer:

- Comments.
- Advanced audit logs.
- Full AI retrieval tables.
- Imported mesh asset libraries.
- Complex collaboration patches.
- Enterprise SSO tables.

## Key Decisions

- Will auth be managed externally or built internally?
- Will design snapshots use JSONB only, or also normalized pile/helix tables?
- What is the first canonical design schema?
- How long should autosaves be retained?
- Which features are plan-gated at launch?
- Which files must be stored permanently?
- Should AI chat be project-scoped, design-scoped, or both?
- Should retrieval data live in the main database or a separate service?
- What tenant isolation strategy is required before launch?
- What backup and restore process is acceptable for paying customers?
