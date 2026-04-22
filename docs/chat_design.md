# AI Chat Design

## Purpose

The AI chat should become a design assistant for geotechnical pile projects. It should answer questions from a grounded reference system, help users reason through design choices, and generate structured design JSON that the application can ingest to visualize candidate pile layouts in the Three.js editor.

The core idea is:

1. Build a geotechnical knowledge base from licensed/reference-approved textbooks, manuals, standards, internal notes, and product documentation.
2. Convert that knowledge base into a retrieval system that combines a knowledge graph with document chunks and equations.
3. Let an agent answer questions by retrieving relevant references, walking through design reasoning, and producing a machine-readable design proposal.
4. Feed that proposal into the 3D editor as a previewable, editable design.

The chat should not be positioned as a replacement for professional engineering judgment. It should be a reference-grounded assistant that helps create preliminary layouts, explain assumptions, check consistency, and prepare design artifacts for review.

## Product Role

The chat can support several user jobs:

- Ask design questions in natural language.
- Translate project requirements into a draft pile layout.
- Explain how pile, helix, spacing, batter, and soil assumptions affect the design.
- Retrieve source-backed guidance from textbooks and reference manuals.
- Generate a candidate design that can be rendered in 3D.
- Revise the design based on user feedback.
- Produce an exportable reasoning summary with assumptions and citations.
- Help detect missing inputs before a design is trusted.

Example prompts:

- "Create a preliminary helical pile group for a small deck foundation with four piles and show spacing conflicts."
- "Given these loads and soil notes, what inputs are missing before I can choose pile geometry?"
- "Explain why increasing helix diameter changes spacing constraints."
- "Generate three alternative layouts and send the most conservative one to the viewer."
- "Check the current model for obvious geometry conflicts and summarize what should be reviewed by an engineer."

## Knowledge Retrieval System

### Source Corpus

Potential source types:

- Geotechnical engineering textbooks.
- Foundation design textbooks.
- Helical pile design manuals.
- Manufacturer technical manuals.
- Public standards and code excerpts where licensing permits.
- Internal company design guides.
- Product-specific help documentation.
- Previously approved project templates.

Important licensing note:

- The system should only ingest sources that the product has rights to use.
- It should store source metadata and citations.
- It should avoid exposing long copyrighted passages verbatim in user-facing answers.
- It should prefer concise citations, summaries, and page/section references.

### Knowledge Graph

The knowledge graph should model domain concepts and relationships so the agent can reason over connected engineering ideas instead of relying only on semantic search.

Candidate node types:

- `Concept`: pile capacity, skin friction, end bearing, helix spacing, batter angle, corrosion, frost depth.
- `Component`: pile shaft, helix plate, pile cap, bracket, soil layer, load, foundation element.
- `Formula`: bearing capacity equation, spacing check, geometry conversion.
- `Parameter`: pile length, pile diameter, helix diameter, helix thickness, soil unit weight, cohesion, friction angle.
- `Unit`: meter, millimeter, foot, inch, degree, kN, kip.
- `Constraint`: minimum spacing, maximum batter, embedment depth, code limitation.
- `Source`: textbook, chapter, section, page, manual, standard.
- `DesignPattern`: circular pile group, rectangular grid, line of piles, pile pair, retrofit bracket layout.
- `Assumption`: preliminary design, no lateral load, homogeneous soil, metric units.
- `Risk`: insufficient input, extrapolated guidance, conflicting source guidance.

Candidate edge types:

- `depends_on`
- `has_formula`
- `has_parameter`
- `measured_in`
- `constrained_by`
- `recommended_by`
- `contradicts`
- `derived_from`
- `applies_to`
- `requires_review`
- `visualized_as`

Example graph relationships:

- `Helix Spacing` `constrained_by` `Minimum Clear Distance`
- `Minimum Clear Distance` `recommended_by` `Source: Textbook A, Chapter X`
- `Pile Group` `has_component` `Pile`
- `Pile` `has_component` `Helix Plate`
- `Helix Plate Diameter` `measured_in` `Length Unit`
- `Conflict Check` `has_formula` `3D distance between helix centers`

### Document Index

The graph should be paired with a vector/hybrid document index.

Chunking strategy:

- Chunk by section, subsection, equation block, table, and figure caption.
- Preserve page number, section title, source title, author, edition, and license status.
- Store equations as structured representations where possible.
- Link every chunk to graph nodes.
- Tag chunks by topic, object type, units, and applicability.

Retrieval strategy:

- Use query understanding to identify concepts, parameters, and task type.
- Retrieve graph neighborhood around matched concepts.
- Retrieve semantically similar chunks.
- Retrieve exact matches for formulas, units, terms, and source identifiers.
- Rank results by source reliability, recency, relevance, and applicability.
- Return citations and uncertainty notes to the agent.

### Knowledge Store Options

Possible architecture:

- PostgreSQL for source metadata, citations, and permissions.
- `pgvector` for vector search if keeping the stack simple.
- Neo4j or a graph extension if graph traversal becomes central.
- OpenSearch/Elasticsearch for hybrid lexical search later.
- Object storage for original PDFs and processed artifacts.

Recommended early approach:

- PostgreSQL with JSONB and `pgvector`.
- Explicit graph tables for nodes and edges.
- Defer Neo4j until graph queries are complex enough to justify another datastore.

## Agent Architecture

### Sequential Pipeline Option

A sequential pipeline is easier to test, audit, and certify.

Suggested stages:

1. `Intent Classification`
   - Determine whether the user asks for explanation, design generation, validation, editing, export, or project management.

2. `Input Extraction`
   - Extract project parameters, design requirements, units, loads, site assumptions, desired layout, and constraints.

3. `Missing Information Check`
   - Identify critical missing inputs.
   - Ask clarifying questions when the answer would materially affect the design.
   - Proceed with explicit assumptions only for low-risk preliminary visualization.

4. `Retrieval Planning`
   - Convert intent and extracted parameters into graph/document retrieval queries.

5. `Knowledge Retrieval`
   - Pull relevant graph nodes, source chunks, formulas, and prior design templates.

6. `Reasoning And Calculation`
   - Use retrieved references to reason through the answer.
   - Run deterministic tools for geometry, units, spacing, and conflict calculations.

7. `Design JSON Generation`
   - Produce a design proposal using the canonical schema.
   - Include assumptions, source ids, validation status, and warnings.

8. `Application Tool Interaction`
   - Preview the proposal in the 3D environment.
   - Request screenshots or scene summaries.
   - Apply user-approved design updates.

9. `Response Composition`
   - Answer the user with a concise explanation, assumptions, references, warnings, and next actions.

10. `Audit Logging`
   - Store prompt, retrieved sources, tool calls, generated JSON, validation results, and final response metadata.

Advantages:

- Easier to validate and monitor.
- Better for professional workflows.
- Clear places to enforce safety checks.
- Easier to produce traceable reports.

Tradeoffs:

- Less flexible for exploratory design.
- Can feel rigid if every prompt goes through the same path.

### Tool-Calling Agent Option

A more flexible agent can decide when to retrieve sources, calculate, inspect the scene, or modify the design.

Core tools:

- `retrieve_knowledge(query, filters)`
- `get_concept_graph(conceptIds, depth)`
- `extract_design_inputs(message)`
- `validate_design_inputs(inputs)`
- `convert_units(value, fromUnit, toUnit)`
- `calculate_pile_positions(pileGroup)`
- `calculate_helix_positions(design)`
- `run_conflict_check(design, rules)`
- `generate_design_json(inputs, assumptions)`
- `validate_design_json(design)`
- `get_current_scene_state()`
- `preview_design_patch(patch)`
- `apply_design_patch(patch)`
- `render_scene_snapshot(cameraPreset)`
- `compare_design_versions(baseDesignId, proposedDesign)`
- `create_report_summary(designId, sourceIds)`

Advantages:

- More natural interaction.
- Can iterate with the 3D environment.
- Supports advanced workflows like "try three alternatives and show me the second one."

Tradeoffs:

- Needs stronger guardrails.
- Harder to test end-to-end.
- Requires strict tool permissioning.

### Recommended Hybrid

Use a structured sequential pipeline for high-risk design generation, but allow tool calls inside controlled stages.

Example:

- The agent cannot directly mutate a saved design.
- It can generate a candidate patch.
- The app previews the patch.
- The user approves before applying.
- All geometry and conflict checks are deterministic tools, not free-form model reasoning.

This keeps the chat useful while protecting the integrity of saved project data.

## Interaction With The 3D Environment

The agent should interact with the 3D editor through a narrow command API.

Read-only scene tools:

- Get current design JSON.
- Get selected object.
- Get camera position.
- Get visible objects.
- Get validation warnings.
- Get conflict matrix.
- Render snapshot.

Preview tools:

- Preview a full design.
- Preview a design patch.
- Highlight referenced objects.
- Add temporary annotations.
- Show measurement overlays.
- Show conflict markers.
- Compare two layouts side by side.

Mutation tools:

- Apply design patch.
- Save design version.
- Rename design.
- Create design from template.
- Duplicate design.

The tool API should require explicit user confirmation for any persistent mutation.

## Streaming And Math Events

The chat agent should stream output through the SSE/event model specified in [math.md](./math.md). The stream should include normal text deltas, retrieval events, tool-call progress, deterministic calculation events, warnings, and design proposals.

Important event groups:

- `message.*` for natural language response deltas and completion.
- `retrieval.*` for source lookup and citation progress.
- `tool.*` for deterministic tool calls.
- `math.*` for formulas, substitutions, calculation results, units, and warnings.
- `design.*` for JSON proposals and 3D preview readiness.

The agent may describe calculations in prose, but displayed engineering results should come from deterministic calculation tools and be persisted as calculation runs/results.

## Design JSON Output

The agent should produce JSON that conforms to the canonical design schema. The JSON should be application-ingestible, versioned, and validated before rendering.

Suggested high-level shape:

```json
{
  "schemaVersion": "0.1.0",
  "design": {
    "name": "Preliminary four-pile deck layout",
    "units": {
      "length": "m",
      "angle": "deg"
    },
    "pileGroup": {
      "layoutType": "circular",
      "spacingRadius": 1.75,
      "locked": true
    },
    "piles": [
      {
        "id": "pile-1",
        "label": "Pile 1",
        "length": 15,
        "diameter": 0.1,
        "batterAngle": 5,
        "position": { "x": 1.75, "y": 0, "z": 0 },
        "rotation": { "x": 0, "y": 0, "z": 5 }
      }
    ],
    "helixGroups": [
      {
        "id": "hg-1",
        "pileId": "pile-1",
        "distanceFromBottom": 1,
        "spacing": 2.5,
        "helices": [
          {
            "id": "helix-1",
            "diameter": 1.25,
            "thickness": 0.02,
            "rise": 1,
            "rotations": 1,
            "segmentsPerStep": 128
          }
        ]
      }
    ],
    "visual": {
      "materials": {},
      "cameraPreset": "isometric"
    },
    "assumptions": [
      {
        "id": "assumption-1",
        "text": "Preliminary visualization only; final design requires qualified engineering review."
      }
    ],
    "sources": [
      {
        "sourceId": "source-123",
        "section": "Helical pile spacing",
        "page": "TBD"
      }
    ],
    "warnings": [
      {
        "code": "MISSING_LOADS",
        "severity": "warning",
        "message": "Loads were not provided; geometry is not a capacity design."
      }
    ]
  }
}
```

The actual schema should be stricter than this example and should be shared by the frontend, backend, database validation, and agent output validator.

## Agent Output Modes

The chat should support several response modes:

- `answer_only`: Reference-grounded explanation with citations.
- `ask_clarifying_questions`: Questions required before producing a design.
- `design_preview`: Candidate design JSON plus a preview command.
- `design_patch`: Patch against the current design.
- `validation_report`: Warnings, conflicts, missing data, and next steps.
- `export_summary`: Report-ready summary of assumptions, sources, and design data.

## Safety And Trust

The system needs strong trust boundaries because engineering design can be high-stakes.

Guardrails:

- Cite sources for technical claims.
- Separate retrieved knowledge from model inference.
- Mark assumptions clearly.
- Refuse to certify designs.
- Require user confirmation before applying design changes.
- Validate all generated JSON against schema.
- Run deterministic calculations outside the model.
- Track calculation versions.
- Keep an audit trail for generated designs and reports.
- Warn when required inputs are missing.
- Warn when source guidance is conflicting or low confidence.

User-facing wording should consistently frame generated designs as preliminary unless a qualified professional reviews them.

## Data Flow

Suggested flow for a design-generation question:

1. User asks for a design.
2. Chat service creates a conversation turn.
3. Intent classifier marks the turn as `design_generation`.
4. Input extractor pulls known project parameters.
5. Missing input checker decides whether to ask questions or proceed with assumptions.
6. Retrieval planner queries graph and vector index.
7. Agent receives compact context with citations.
8. Agent calls deterministic calculation tools.
9. Agent generates design JSON.
10. JSON validator checks schema and domain constraints.
11. 3D preview tool loads the design as temporary state.
12. User reviews the visual output.
13. User approves, edits, or rejects.
14. Approved design becomes a saved design or version.

## Storage Needs

Chat and retrieval require additional data beyond the core project database:

- Conversation threads.
- Chat messages.
- Tool calls.
- Retrieved source references.
- Generated design drafts.
- User approvals/rejections.
- Knowledge sources.
- Document chunks.
- Graph nodes and edges.
- Embeddings.
- Source licenses and access permissions.
- Agent run traces and evaluation results.

These should be related back to projects and designs when applicable.

## Evaluation Plan

Evaluate the chat in layers:

- Retrieval quality: did it find the right sections?
- Citation quality: did claims map to sources?
- Extraction quality: did it understand the user's inputs?
- JSON validity: did generated output pass schema validation?
- Geometry validity: did rendered objects appear where expected?
- Calculation correctness: did deterministic tools produce expected results?
- Safety behavior: did it ask for missing high-risk inputs?
- User usefulness: did the generated design reduce work?

Create a benchmark set of realistic design questions and expected tool behavior before allowing the agent to modify saved designs.

## MVP Scope

Best initial AI chat scope:

- Project-specific design Q&A.
- Retrieval-grounded explanations.
- Missing-input checklist.
- Generate preliminary design JSON for visualization.
- Preview design in 3D without saving.
- Apply only after user approval.
- Store source references and warnings.

Defer:

- Fully autonomous final design.
- Code/regulatory compliance claims.
- Real-time multi-agent collaboration.
- Automatic stamped report language.
- Complex soil/capacity calculation until domain experts validate the formulas.

## Key Questions

- Which textbook/manual sources are legally available for ingestion?
- Which source should be considered authoritative when references conflict?
- What exact engineering claims can the assistant safely make?
- What design questions require mandatory clarification?
- What design questions can proceed with assumptions?
- What JSON schema version should the agent target first?
- What tool calls should be read-only, preview-only, or persistent?
- What audit log is required for reports and customer trust?
- How should the app show citations in the UI?
- How will generated designs be evaluated before launch?
