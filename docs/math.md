# Math And Streaming Agent Feature

## Purpose

The math feature should let the AI design agent perform deterministic calculations, stream reasoning and calculation progress into chat, and display equations, substitutions, results, warnings, and optional visualizations in a way that is useful for engineering review.

The goal is not to let the language model invent math. The goal is to make the agent orchestrate retrieval, assumptions, deterministic calculation tools, and frontend visualization.

The feature spans both frontend and backend:

- Backend performs validated calculations, stores calculation runs, and streams agent events.
- Frontend renders streamed chat, equations, calculation cards, charts, tables, and design-preview actions.
- Redis/queue infrastructure coordinates long-running agent and report tasks.
- The database stores durable messages, tool calls, calculation inputs/outputs, and accepted design proposals.

## Core User Experience

Example workflow:

1. User asks a design or calculation question in chat.
2. Chat message is posted to the backend.
3. Backend creates an agent run and starts streaming SSE events.
4. The agent emits tokens, retrieval status, missing-input checks, tool-call status, equations, substitutions, calculation results, and warnings.
5. Frontend renders the stream progressively.
6. Calculation cards show formula, variables, units, substitutions, result, and source references.
7. If the result produces a design or patch, frontend shows a preview card and can load it into the 3D scene.
8. User can accept, reject, edit, or regenerate the response.

## Streaming Architecture

Use Server-Sent Events for agent response streams. SSE fits the first chat use case because the stream is mostly server-to-client: tokens, tool progress, calculation events, and final outputs.

Why SSE first:

- Browser support is native through `EventSource`.
- It uses regular HTTP and is simpler than WebSockets.
- FastAPI supports SSE-style streaming.
- The app can still use normal POST requests for user messages and tool actions.

Use WebSockets later only if the app needs low-latency bidirectional collaboration, multiplayer editing, or complex live controls.

## SSE Event Model

Use typed event names instead of one generic stream.

Suggested event names:

- `run.started`
- `message.delta`
- `message.completed`
- `retrieval.started`
- `retrieval.source`
- `retrieval.completed`
- `tool.started`
- `tool.delta`
- `tool.completed`
- `tool.failed`
- `math.formula`
- `math.substitution`
- `math.result`
- `math.warning`
- `design.proposal`
- `design.preview_ready`
- `error`
- `done`

Each event should include:

- `runId`
- `threadId`
- `messageId`
- `sequence`
- `timestamp`
- `payload`

Example event payload:

```json
{
  "runId": "run_123",
  "threadId": "thread_123",
  "messageId": "msg_456",
  "sequence": 18,
  "payload": {
    "latex": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}",
    "label": "3D center-to-center distance",
    "sourceIds": ["source_helix_spacing_001"]
  }
}
```

## Stream Resume And Reliability

SSE should support reconnects.

Needed:

- Monotonic per-run event sequence.
- Event ids in the SSE frame.
- Client stores last received event id.
- Server supports `Last-Event-ID` when feasible.
- Completed runs can be refetched from persisted messages/tool calls.
- Frontend can fall back to polling run status if streaming fails.

Streaming events should be treated as transient delivery. Durable state belongs in:

- `chat_messages`
- `agent_runs`
- `agent_tool_calls`
- `calculation_runs`
- `calculation_results`
- `ai_design_proposals`

## Redis And Queue Design

Use AWS ElastiCache Redis for low-latency stream coordination and job status.

Possible Redis uses:

- Pub/Sub for active SSE fanout.
- Streams for durable-ish ordered event logs.
- Cache for run state, rate limits, and idempotency keys.
- Short-lived status/coordination for SQS-backed workers.

Recommended early setup:

- Use Redis Streams for agent-run event buffers.
- Use AWS SQS for durable background jobs.
- Keep canonical durable records in PostgreSQL.

AWS production defaults:

- AWS SQS for durable background jobs.
- AWS ElastiCache for Redis stream coordination.

Queue rule:

- Queues run background work.
- SSE delivers live run events.
- PostgreSQL stores the durable result.
- Redis is short-lived delivery infrastructure, not the durable replay source.

Production queue defaults:

- `agent-runs` with `agent-runs-dlq`.
- `report-generation` with `report-generation-dlq`.
- `calculation-runs` with `calculation-runs-dlq`.
- `email` with `email-dlq`.
- `knowledge-ingestion` with `knowledge-ingestion-dlq`.

## Math Calculation Model

The agent should call deterministic calculation tools rather than solving important math only in natural language.

Calculation tool inputs:

- `calculationType`
- `schemaVersion`
- `units`
- `variables`
- `sourceReferences`
- `assumptions`
- `designVersionId`
- `objectIds`

Calculation tool outputs:

- Formula id.
- Formula display LaTeX.
- Variables and units.
- Substitution steps.
- Numeric result.
- Significant figures or precision.
- Warnings.
- Validation status.
- Source references.
- Machine-readable result JSON.

Example result:

```json
{
  "calculationType": "helix_center_distance",
  "formula": {
    "id": "distance_3d",
    "latex": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}"
  },
  "variables": {
    "x_1": { "value": 0, "unit": "m" },
    "y_1": { "value": -12, "unit": "m" },
    "z_1": { "value": 0, "unit": "m" },
    "x_2": { "value": 1.75, "unit": "m" },
    "y_2": { "value": -11.5, "unit": "m" },
    "z_2": { "value": 0, "unit": "m" }
  },
  "result": {
    "value": 1.82,
    "unit": "m",
    "status": "warning"
  }
}
```

## Calculation Types For MVP

Start with geometry and conflict calculations:

- Pile group circular layout positions.
- Helix vertical positions.
- 3D helix center-to-center distance.
- Minimum spacing/tolerance comparison.
- Conflict matrix.
- Unit conversion.
- Basic geometry validation.

Later:

- Load summaries.
- Soil layer summaries.
- Capacity estimates after domain expert review.
- Report-ready calculation packages.
- Comparative calculations between design versions.

## Frontend Math Rendering Library Review

### KaTeX

Best for:

- Fast rendering of LaTeX in chat messages and calculation cards.
- Inline and display equations.
- Predictable styling inside a Tailwind/shadcn UI.

Pros:

- Fast.
- Works well for static math.
- Supports direct browser rendering and server-side string rendering.
- Can output HTML plus MathML for accessibility.

Cons:

- Less flexible than MathJax for advanced accessibility/exploration.
- Some LaTeX packages/features are unsupported.

Recommended use:

- Default renderer for streamed chat equations and calculation cards.

### MathJax

Best for:

- More advanced accessibility and broad input/output support.
- TeX, MathML, and AsciiMath workflows.
- Cases where interactive exploration or assistive technology is more important than speed.

Pros:

- Highly configurable component model.
- Supports multiple inputs and outputs.
- Strong accessibility story.

Cons:

- Heavier than KaTeX.
- More runtime complexity.

Recommended use:

- Consider if KaTeX cannot meet accessibility or notation requirements.

### MathLive

Best for:

- Editable math input.
- User-entered equations.
- Future advanced calculation authoring.

Pros:

- Provides a `<math-field>` web component.
- Supports LaTeX-oriented authoring.
- Includes MathJSON and compute-engine concepts.

Cons:

- More than needed for read-only chat rendering.
- Needs web-component integration and styling care.

Recommended use:

- Defer until users need to edit equations directly in the UI.

### Desmos API

Best for:

- Interactive 2D graphing/calculator embeds.
- Exploratory functions or load/soil profile curves.

Pros:

- Mature interactive graphing UI.
- Strong user familiarity.

Cons:

- Requires API/key and external embed considerations.
- Not necessary for static engineering calculation cards.

Recommended use:

- Optional later feature for graphing equations or parametric studies.

### Recharts

Best for:

- Lightweight charts in React.
- Conflict matrix summaries, report metrics, usage charts, and simple parametric plots.

Pros:

- React component model.
- SVG-based.
- Fits dashboard/report UI well.

Cons:

- Not a math typesetting library.
- Less suited to advanced scientific plotting than Plotly.

Recommended use:

- Default charting option for product dashboards and simple engineering result charts.

### Plotly.js / react-plotly.js

Best for:

- Advanced scientific charts.
- 3D plots, contour plots, parametric studies, and interactive engineering visualizations.

Pros:

- Broad chart type coverage.
- Useful for technical/scientific visualization.

Cons:

- Larger bundle.
- Needs lazy loading.

Recommended use:

- Use for advanced calculation visualization only, lazy-loaded by feature.

## Frontend Component Design

Suggested components:

- `ChatPanel`
- `ChatThreadList`
- `ChatComposer`
- `ChatMessage`
- `StreamingMessage`
- `MessageActions`
- `RegenerateButton`
- `SourceCitationList`
- `ToolCallTimeline`
- `MathBlock`
- `InlineMath`
- `CalculationCard`
- `CalculationStepList`
- `VariableTable`
- `ResultBadge`
- `WarningList`
- `FunctionPlot`
- `ConflictMatrixCard`
- `DesignProposalCard`
- `PreviewInSceneButton`

Message actions:

- Regenerate.
- Continue.
- Copy.
- Show sources.
- Show calculations.
- Create design preview.
- Accept proposal.
- Reject proposal.
- Report issue.

Regeneration behavior:

- Regenerating a message should create a new agent run linked to the same parent user message.
- Preserve old assistant messages unless the user explicitly hides or supersedes them.
- Mark regenerated messages as alternatives.
- If a design proposal was accepted, do not silently replace it.

## Chat Message Data Model

Frontend message parts should be structured, not only markdown strings.

Possible message part types:

- `text`
- `markdown`
- `inline_math`
- `math_block`
- `calculation`
- `table`
- `chart`
- `source_citation`
- `tool_status`
- `design_proposal`
- `warning`
- `error`

This lets the UI render math and calculation results safely without parsing every answer as a single blob.

## Frontend Streaming State

Streaming state should track:

- Connection status.
- Current run id.
- Current message id.
- Received sequence ids.
- Partial text buffer.
- Partial structured parts.
- Tool calls in progress.
- Calculation cards in progress.
- Error/retry state.

The UI should support:

- Stop generation.
- Retry stream.
- Resume after reconnect.
- Finalize message from persisted backend state if stream drops.

## Backend Math Service

Backend modules:

- `calculations`
- `agent_runs`
- `sse`
- `queues`
- `knowledge`

Calculation service responsibilities:

- Validate inputs.
- Normalize units.
- Select formula/tool implementation.
- Execute deterministic function.
- Store run and result.
- Emit `math.*` SSE events.
- Return machine-readable JSON for reports and frontend rendering.

## Database Additions

The existing database plan already includes `calculation_runs` and `calculation_results`. Add or ensure:

- `calculation_steps`
- `formula_definitions`
- `agent_stream_events` if Redis event retention is not enough.

`formula_definitions` can store:

- Formula id.
- Name.
- LaTeX.
- Description.
- Variables schema.
- Units.
- Source references.
- Implementation version.

## Safety And Review

Math safety requirements:

- Show assumptions.
- Show units.
- Show sources.
- Show warnings when input is missing.
- Mark preliminary or advisory calculations.
- Do not allow an LLM-only calculation to become report-grade.
- Version calculation engines.
- Store enough trace data to reproduce a result.

## Recommended MVP Choices

Frontend:

- SSE through native `EventSource` or a small fetch-based SSE helper if POST/auth constraints require it.
- KaTeX for read-only math rendering.
- Recharts for simple charts.
- Lazy-load Plotly only if an advanced calculation view needs it.
- Structured message parts instead of one markdown blob.

Backend:

- FastAPI SSE endpoint for agent runs.
- AWS ElastiCache Redis for stream coordination.
- AWS SQS with DLQs for durable background jobs.
- PostgreSQL for durable replay of final messages, tool calls, calculations, warnings, and proposals.
- Store durable results in PostgreSQL.
- Use deterministic calculation functions for all displayed results.

## Official References

- [MDN EventSource and SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [FastAPI Server-Sent Events](https://fastapi.tiangolo.com/tutorial/server-sent-events/)
- [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/)
- [Amazon SQS documentation](https://aws.amazon.com/documentation-overview/sqs/)
- [KaTeX browser/API docs](https://katex.org/docs/browser)
- [MathJax web components](https://docs.mathjax.org/en/v4.0/web/components/index.html)
- [MathLive Mathfield](https://mathlive.io/mathfield/)
- [Desmos API documentation](https://www.desmos.com/api/v1.3/docs/index.html)
- [Recharts documentation](https://recharts.github.io/)
- [react-plotly.js documentation](https://github.com/plotly/react-plotly.js)
