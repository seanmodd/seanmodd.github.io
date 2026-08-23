window.PCKUP_PHASES.push(
  {
    id: "phase-0",
    code: "P0",
    number: 0,
    title: "Program charter and production baseline",
    subtitle: "Create the migration control plane before touching product UI.",
    tags: ["discovery", "no visual change", "program setup"],
    dependsOn: "None",
    objective: "Lock the production baseline, define source-of-truth rules, create the shared state ledger, and make every later phase resumable and auditable.",
    outputs: [
      "docs/design-system-migration/README.md",
      "docs/design-system-migration/charter.md",
      "docs/design-system-migration/state.json",
      "docs/design-system-migration/decision-log.md",
      "docs/design-system-migration/baseline-checks.md",
      "docs/design-system-migration/metrics/baseline.json"
    ],
    gate: "The program has an immutable baseline commit, truthful authority model, approved phase sequence, green baseline checks, and a state ledger marking only P0 complete without changing product behavior, CSS, tokens, or Figma.",
    prompt: `Execute Phase P0: PROGRAM CHARTER AND PRODUCTION BASELINE.

PURPOSE
Create the migration program's control plane before any component, CSS, Figma, or product-surface refactor begins. This phase is documentation, measurement, and baseline verification only. Do not redesign, rename, move, split, or rewrite product code in this phase.

REQUIRED DISCOVERY
1. Resolve the exact current main commit and record it as the program baseline.
2. Read all existing design-system material, especially docs/DESIGN_SYSTEM_SYNC.md, docs/DESIGN_TOKEN_SYNC_CONTRACT.md if present, docs/design-system-reconstruction/**, docs/brand-assets/tokens/**, figma.config.json, figma/**, scripts/design-tokens/**, and relevant interaction/accessibility/UI Lab documentation.
3. Inspect the current Figma design-system file read-only. Record variable collections, modes, styles, published components, prototype assets, and Code Connect state. Do not write to Figma.
4. Identify the major production surface families: marketing, auth, estimate/order, customer dashboard, courier application, courier workspace, internal utility/operations, and any additional discovered surface.
5. Run the repository's clean baseline validation from the exact baseline commit using the generated task packet. Capture typecheck, lint, tests, build or required build shard, design-system checks, and relevant e2e/lab smoke results. Do not hide pre-existing failures; classify them.

CREATE THE PROGRAM ARTIFACTS
A. docs/design-system-migration/README.md
- Purpose and ordered P0-P12 phase map.
- Resume protocol for a fresh agent.
- Rule that one phase or named migration unit equals one task, worktree, branch, PR, review cycle, merge, deployment verification, run report, and transcript.

B. charter.md
- Problem statement: strong token foundations, fragmented component ownership, global CSS accretion, route-local UI, partial Figma coverage, and incomplete Code Connect adoption.
- Non-goals: no framework rewrite, no Tailwind migration, no second token taxonomy, no visual redesign during structural phases, no direct Figma-to-production deployment, and no conversion of every historical pattern into a Figma component.
- Source-of-truth table for tokens, component API/behavior, visual anatomy, Code Connect mapping, product composition, and deployed state.
- Brownfield migration principles, deletion policy, and owner-gated decisions.

C. state.json
Use a machine-readable schema containing at least programId, baselineCommit, currentMainCommit, currentPhase, completedPhases, phaseStatus P0-P12, artifacts keyed by stable ID, metrics, approvedDecisions, openDecisionForks, blockers, activeWave, migrationQueue, lastUpdatedAt, and lastUpdatedBy. Mark only P0 complete after its exit gate is proven.

D. decision-log.md
Use stable decision IDs and capture date, phase, question, evidence, decision, consequences, owner gate, and supersession status. Preserve existing approved reconstruction decisions instead of inventing replacements.

E. baseline-checks.md
Record exact commands, commit SHA, environment assumptions, outcomes, and evidence links. Separate pre-existing failures from task-introduced failures.

F. metrics/baseline.json
Record counts or honest nulls for frontend TS/TSX files, CSS files and total size, raw control occurrences, inline styles, exported shared components, route-local components, Figma published components, Code Connect mappings, registered canonical components, and unclassified reusable patterns. Every value needs provenance; never fabricate a count.

RESUME CONTRACT
Add a short resume prompt instructing a new agent to read AGENTS.md, AI_CONTEXT.md, the migration README, state.json, latest decision entries, handoff, and every prerequisite artifact for the current phase.

VALIDATION
- Prove no runtime source, stylesheet, Figma object, token value, route, or product behavior changed.
- Validate every JSON artifact and deterministic phase transition.
- Run all documentation and repository checks required by the task packet.

EXIT RESPONSE
Report baseline commit, checks, artifacts, preserved authority decisions, open owner decisions, proof the product was untouched, and the P0 state transition. Do not begin P1 in this task.`
  },
  {
    id: "phase-1",
    code: "P1",
    number: 1,
    title: "Whole-codebase design census",
    subtitle: "Inventory every design-relevant implementation, not just the existing UI folder.",
    tags: ["static analysis", "machine readable", "no visual change"],
    dependsOn: "P0",
    objective: "Build a reproducible census of components, controls, selectors, styles, surfaces, states, imports, consumers, and Figma relationships across the complete frontend.",
    outputs: [
      "scripts/design-system-migration/census.*",
      "docs/design-system-migration/census/component-census.json",
      "docs/design-system-migration/census/css-ownership.json",
      "docs/design-system-migration/census/raw-controls.json",
      "docs/design-system-migration/census/surface-map.md",
      "docs/design-system-migration/census/findings.md"
    ],
    gate: "A deterministic census scans the complete design-relevant frontend, every result has provenance, coverage gaps are explicit, and no runtime behavior or visual output changed.",
    prompt: `Execute Phase P1: WHOLE-CODEBASE DESIGN CENSUS.

PREREQUISITE
Read docs/design-system-migration/state.json. Refuse to continue if P0 is incomplete or the recorded baseline cannot be reconciled with current main. Read every P0 artifact.

PURPOSE
Create the first complete, reproducible inventory of the Pckup frontend design architecture. src/app/components/ui is only one partial island. Cover the complete route tree and every design-relevant file in marketing, auth, estimate/order, dashboard, courier, utility, and shared component folders.

THIS PHASE IS READ-ONLY WITH RESPECT TO PRODUCT BEHAVIOR
You may add census scripts, tests, and artifacts. Do not move, rename, restyle, replace, or migrate production components or CSS.

BUILD A DETERMINISTIC CENSUS TOOL
Create a scanner under scripts/design-system-migration/ that processes tracked files, documents exclusions, and emits stable sorted JSON. Use a real TypeScript/TSX parser where syntax matters rather than regex-only conclusions.

COMPONENT INVENTORY
For every component or relevant render function capture where discoverable:
- stable ID, source path, export name, route/feature ownership, client/server status, approximate size;
- importers, import count, rendered usage, native controls, class names, inline styles;
- explicit variants, states, booleans, slots, child composition, accessibility attributes, and interaction semantics;
- token/custom-property usage, tests, reference routes, screenshots, Figma node, and Code Connect mapping;
- provisional classification and ambiguity, without approving taxonomy yet.

CSS INVENTORY
Capture stylesheet path, import point/order, bytes/lines, selectors, selector families, custom-property definitions/uses, existing governed literals, keyframes, media/container queries, state selectors, likely consumers, zero/one/multiple-owner status, dynamic usage uncertainty, duplicated declaration signatures, and cascade hazards.

RAW CONTROLS AND ONE-OFF UI
Capture raw buttons, anchors-as-buttons, inputs, selects, textareas, dialogs, details/summary, tables, custom interactive roles, inline visual style objects, and one-off spinners, badges, pills, cards, dialogs, drawers, popovers, tabs, empty states, page headers, and navigation items. Distinguish approved low-level implementation zones from feature-level use only as provisional evidence.

SURFACE MAP
Join route family, layouts/shells, shared/local components, stylesheets, auth/public state, responsive modes, themes, fixture/test entry points, and migration risk.

FIGMA READ-ONLY JOIN
Inspect the existing Figma library and record pages, variables, styles, components, properties, variants, dependencies, published status, instance counts, descriptions, and Code Connect state. If live access is unavailable, record the blocker and use repository contracts as partial evidence. Never invent live state.

REQUIRED OUTPUTS
1. component-census.json
2. css-ownership.json
3. raw-controls.json
4. surface-map.md
5. findings.md with ranked risks and limitations
6. updated baseline metrics with provenance
7. updated state.json with artifact versions and P1 status

QUALITY BAR
- Run twice and prove byte-stable output from the same commit.
- Add parser and exclusion tests.
- Do not call components duplicates from names alone.
- Do not call CSS dead until static, dynamic, and runtime limitations are considered.
- Cross-check machine output manually against each major surface.

EXIT RESPONSE
Report measured totals, ten highest-risk architecture findings, limitations, artifacts, validation, and evidence supporting P1 completion. Do not begin taxonomy or refactoring.`
  },
  {
    id: "phase-2",
    code: "P2",
    number: 2,
    title: "Runtime visual and interaction baseline",
    subtitle: "Connect static inventory to the actual rendered product.",
    tags: ["screenshots", "states", "visual evidence"],
    dependsOn: "P1",
    objective: "Capture representative production-equivalent render evidence and map it to census IDs so later migrations can prove visual and behavioral equivalence.",
    outputs: [
      "docs/design-system-migration/evidence/route-matrix.json",
      "docs/design-system-migration/evidence/screenshot-manifest.json",
      "docs/design-system-migration/evidence/interaction-matrix.md",
      "docs/design-system-migration/evidence/baseline-report.md",
      "reusable visual/e2e baseline harnesses"
    ],
    gate: "Every major surface has representative desktop/mobile, theme, and critical-state evidence mapped to census IDs, with reproducible commands and no intentional visual change.",
    prompt: `Execute Phase P2: RUNTIME VISUAL AND INTERACTION BASELINE.

PREREQUISITE
Read state.json and P0-P1 artifacts. Stop if the census is stale against main or the baseline environment cannot be reproduced.

PURPOSE
Static analysis cannot tell us what users actually see. Build a production-equivalent evidence harness that maps rendered routes and UI states back to the census. This phase captures truth; it does not redesign the product.

ROUTE AND STATE MATRIX
Create a machine-readable route matrix covering representative states from every surface:
- marketing home and subpages;
- customer/courier sign-in, recovery, invite, and registration;
- estimate/order steps, payment boundaries, and confirmation using safe fixtures;
- customer dashboard overview, lists, details, profile, and company management;
- courier application and approved courier workspace;
- utility shell plus representative Changelog, CMS, SEO, Visitor, Reports, Messaging, Activity, and MCP views;
- loading, empty, error, disabled, busy, expanded, focused, selected, and mobile-navigation states where supported.

For each record include route/fixture, safe auth setup, viewport, theme, expected shell, visible census IDs, screenshot name, interaction assertions, privacy notes, and automation status.

EVIDENCE HARNESS
Extend existing Playwright/e2e, Utility UI Lab, fixtures, and test infrastructure. Never request or expose real credentials or customer data. Capture desktop/mobile, light/dark, keyboard focus, open/closed overlays, data states, responsive table-to-card or navigation transitions, and shell geometry.

SCREENSHOT MANIFEST
For every capture record stable evidence ID, route/state ID, source commit, screenshot path, viewport/theme, visible component IDs, capture command, checksum if practical, and review status.

INTERACTION MATRIX
Document and verify focus order/return, Escape/backdrop close behavior, keyboard activation, disabled/busy behavior, validation announcements, responsive navigation, loading/optimistic states, and auth/access redirects. Do not infer behavior from aesthetics.

BASELINE REPORT
State coverage, exclusions, current visual anomalies that are facts rather than migration bugs, mandatory later gates, and high-risk interactions requiring behavior tests beyond screenshots.

VALIDATION
- Re-run a representative subset to prove determinism within documented tolerances.
- Confirm captures contain no secrets or private user data.
- Prove the task caused no intentional product difference.
- Join evidence back to census records without duplicated hand-maintained truth.

STATE UPDATE
Record coverage metrics, exclusions, baseline evidence revision, and P2 completion.

EXIT RESPONSE
Summarize route/state coverage, screenshot counts, interaction contracts, exclusions, and the evidence that P2 is a trustworthy regression baseline. Do not classify canonical families yet.`
  },
  {
    id: "phase-3",
    code: "P3",
    number: 3,
    title: "Equivalence graph and component taxonomy",
    subtitle: "Decide what should exist before building anything new.",
    tags: ["taxonomy", "deduplication", "decision phase"],
    dependsOn: "P2",
    objective: "Cluster current implementations by verified semantics and behavior, classify them, and approve the canonical families code and Figma will share.",
    outputs: [
      "docs/design-system-migration/taxonomy/equivalence-graph.json",
      "docs/design-system-migration/taxonomy/component-taxonomy.json",
      "docs/design-system-migration/taxonomy/decision-register.md",
      "docs/design-system-migration/taxonomy/retirement-candidates.json",
      "docs/design-system-migration/taxonomy/owner-decisions.md"
    ],
    gate: "Every reusable pattern is classified or explicitly unresolved, duplicate clusters have evidence-backed dispositions, and no implementation work begins until blocking owner forks are resolved.",
    prompt: `Execute Phase P3: EQUIVALENCE GRAPH AND COMPONENT TAXONOMY.

PREREQUISITE
Read state.json and P0-P2 artifacts. The census and runtime evidence must be current against main. Refuse to proceed if major surfaces are missing.

PURPOSE
Decide what the design system should contain before creating components or exporting current chaos into Figma. This is an evidence-based architecture decision phase. Do not migrate code, split CSS, or write Figma components.

BUILD THE EQUIVALENCE GRAPH
Cluster implementations by semantics, anatomy, behavior, accessibility, state machine, sizing/responsive behavior, token role, consumers, and API compatibility. Similar names are weak evidence.

At minimum evaluate:
- button, icon/link buttons, segmented/pill controls;
- text fields, textarea, select, checkbox, radio, option tile, combobox, upload;
- badge/status/chip/tag;
- spinner, skeleton, loading, empty/error states, banners/toasts;
- dialog, confirmation, drawer, popover, tooltip, disclosure, tabs;
- card, panel, metric/record cards, review block;
- table, responsive record list, filter bar, pagination;
- page/section headers, hero, action row;
- navigation item, rail, tray, account menu;
- stepper, auth/flow/portal/operations shells;
- route map, route summary, quote summary;
- every additional high-frequency cluster from P1.

CLASSIFY EVERY PATTERN
Use exactly:
1. CORE: central cross-product component.
2. SURFACE: shared within a bounded family such as Operations or Marketing and allowed to depend on Core.
3. FEATURE_LOCAL: reusable only inside one feature.
4. PAGE_COMPOSITION: composition, not library component.
5. APPROVED_EXCEPTION: specialized low-level implementation with reason.
6. RETIRED: duplicate/obsolete implementation to migrate and delete.
7. UNRESOLVED: missing evidence or owner decision; blocks that cluster.

ARTIFACTS
A. equivalence-graph.json with implementation/family nodes, relation edges, evidence references, confidence, and decision state.
B. component-taxonomy.json with stable family ID, layer, owner/path, purpose, API/state outline, implementations/consumers, differences, Figma disposition, Code Connect disposition, priority, and risk.
C. decision-register.md covering button vs utility pill, field primitives vs specialized fields, common dialog foundations, card/panel boundaries, table/mobile-card relationship, dashboard/courier shell commonality, and operations vs core scope.
D. retirement-candidates.json with exact files/selectors/exports, replacement, consumers, and required deletion proof.
E. owner-decisions.md containing only genuine forks, options, evidence, impact, recommendation, and blocked work.

DECISION QUALITY
- Do not create universal components whose APIs are dumps of historical props.
- Prefer composition and small behavioral foundations.
- Keep page layouts local when reuse is not proven.
- Preserve legitimate surface distinctions.
- Record rejected abstractions so future agents do not revive them.

VALIDATION
Review against representative implementations from every surface. Every reusable-looking census item must have a classification or UNRESOLVED status. No production or Figma mutation is allowed.

STATE UPDATE
Record taxonomy revision, blockers, decisions, and P3 completion only when implementation-blocking decisions are resolved or explicitly scoped out.

EXIT RESPONSE
Present family counts by layer, duplicate clusters, retirement candidates, unresolved forks, and the exact decisions P4 must encode. Do not implement components.`
  },
  {
    id: "phase-4",
    code: "P4",
    number: 4,
    title: "Target architecture and migration RFC",
    subtitle: "Define the new scalable paradigm, boundaries, contracts, and migration mechanics.",
    tags: ["architecture", "component contract", "RFC"],
    dependsOn: "P3",
    objective: "Turn the approved taxonomy into a concrete repository architecture, dependency model, component contract, migration ledger, and reversible rollout plan.",
    outputs: [
      "docs/design-system-migration/architecture/target-architecture.md",
      "docs/design-system-migration/architecture/dependency-rules.md",
      "docs/design-system-migration/architecture/component-contract.schema.json",
      "docs/design-system-migration/architecture/css-strategy.md",
      "docs/design-system-migration/architecture/migration-plan.json",
      "docs/design-system-migration/architecture/adr-*.md"
    ],
    gate: "The target architecture is approved, mechanically enforceable, compatible with the current app, and defines how every taxonomy family moves without a big-bang rewrite.",
    prompt: `Execute Phase P4: TARGET ARCHITECTURE AND MIGRATION RFC.

PREREQUISITE
Read state.json and P0-P3 artifacts. Stop if taxonomy is unapproved or implementation-blocking owner decisions remain unresolved.

PURPOSE
Define the scalable design paradigm and exact migration mechanics for the existing application. This is an architecture/RFC phase. Add schemas, documentation, validation prototypes, and non-runtime scaffolding only; do not migrate product consumers or intentionally change pixels.

TARGET REPOSITORY MODEL
Design an evidence-backed destination using these dependency layers unless a justified adjustment is required:

src/design-system/
- foundations: tokens, typography, icons, motion, accessibility constants
- primitives: Button, IconButton, fields, Select, Checkbox, Badge, Spinner, Divider
- components: Dialog, Drawer, Popover, Combobox, FileUpload, DataTable, EmptyState, etc.
- patterns: PageHeader, FilterBar, MetricCard, RecordCard, RouteSummary, QuoteSummary, etc.
- shells: AuthShell, FlowShell, PortalShell, OperationsShell, and other approved foundations
- manifest.ts and public index.ts

src/features/
- feature-owned UI and behavior grouped by product domain; consumes the design system but does not define global primitives

src/app/
- Next.js routes, layouts, server composition, and route adapters; not the default home for reusable UI

Do not move the entire codebase in this phase.

REQUIRED DECISIONS
1. Dependency direction and forbidden imports.
2. Public exports vs internal implementation files.
3. Server/client boundaries.
4. Styling ownership for new canonical components using a repository-compatible, colocated mechanism; no Tailwind or new styling framework.
5. Consumption of existing generated tokens and compatibility aliases without a second taxonomy.
6. Directory mapping for Core, Surface, Feature Local, Composition, Exception, and Retired.
7. Naming, variants, slots/composition, state names, and accessibility contract.
8. Deprecation adapters, re-exports, class compatibility, and deletion criteria.
9. Figma and Code Connect metadata ownership.
10. Unit, interaction, accessibility, visual, route/e2e, and usage-scan testing layers.
11. Proposal/approval/promotion workflow for new shared components.

COMPONENT CONTRACT SCHEMA
Support stable ID/layer, code export/path/import, owner, purpose/non-goals, props/variants, states/interaction, accessibility, token dependencies, styling owner, supported surfaces, Figma IDs/publish status, Code Connect template/status, tests/examples, migration status, legacy aliases/consumers, adoption count, and deprecation/removal state.

CSS STRATEGY
Document generated token authority, global base vs component-owned styles, temporary legacy facade, mechanical split order for utility.css/platform.css, cascade preservation, selector ownership, CSS-only pattern extraction, zero-use proof, and hardcoded-value governance.

MIGRATION PLAN
Create ordered stable work units for governance baseline, CSS decomposition, primitives, behavioral components, patterns/data display, shells, Figma/Code Connect, surface waves, legacy deletion, and gate escalation. Each needs prerequisites, scope, consumers, risk, validation, rollback, and evidence.

ADR SET
Record why this is a strangler migration, why routes remain under app, why Figma does not own production behavior, why current CSS is not wholesale-generated into components, and why enforcement starts warning-only.

PROOF OF COMPATIBILITY
Use a non-runtime or type-only example showing the contract can represent existing Button, Field, UtilityDialog, DashboardShell, and a route-local pattern. Do not migrate them yet.

VALIDATION
Validate schemas and dependency rules, test validation utilities, review Next.js constraints, and prove no product or visual change.

STATE UPDATE
Record architecture revision, ADRs, migration plan, and P4 completion.

EXIT RESPONSE
Summarize target structure, dependencies, component contract, CSS strategy, rollout sequence, and rejected alternatives. Do not begin governance or migration.`
  }
);
