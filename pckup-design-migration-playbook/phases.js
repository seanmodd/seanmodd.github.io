window.PCKUP_CONTROLLER_PROMPT = `You are the design-system migration lead for {{REPO}}. You are operating through {{AGENT}}.

This is a mature production codebase. Treat it as a migration, not a greenfield rewrite and not an invitation to redesign everything. The existing application, token pipeline, tests, CI/CD, route behavior, security boundaries, Figma assets, and production delivery controls are valuable constraints that must be preserved unless the current phase contains an explicit, recorded decision to change one of them.

OPERATING CONTRACT
1. Execute only the single phase prompt pasted after this controller prompt. Do not silently begin later phases.
2. Start from the latest {{BASE_BRANCH}}. Read the repository's current agent instructions, contribution rules, architecture documents, package scripts, and CI policy before planning. Repository facts in this public guide are hypotheses until verified against the current checkout.
3. Create or reuse an isolated branch/worktree for run {{RUN_ID}}. Never make a broad migration directly on {{BASE_BRANCH}}.
4. Read {{DOCS_ROOT}}/state.json if it exists. Validate that its repository commit, completed phases, decisions, and artifact paths match the checkout. If the ledger is missing or inconsistent, stop and report the mismatch instead of guessing.
5. Preserve behavior, accessibility, security boundaries, responsive behavior, and visual output by default. A change that intentionally alters any of those must be identified as a decision, have before/after evidence, and receive the required approval.
6. Use a strangler migration. Introduce canonical code beside legacy code, migrate bounded consumers, prove parity, then retire old paths. No big-bang folder move, mass rewrite, mass class rename, or speculative abstraction.
7. Never copy every existing implementation into Figma. Only approved canonical components and patterns belong in the published library.
8. Never delete code or CSS because a name appears unused. Require static reference analysis, runtime-route evidence, visual/behavior regression coverage, and an explicit rollback point.
9. Keep generated files generated. Do not hand-edit token output, generated reports, derived changelog data, or other machine-owned artifacts.
10. Do not expose or commit credentials, tokens, private Figma access values, session cookies, service-account files, production data, or environment secrets. Use existing secret-management mechanisms.
11. Prefer deterministic scripts and machine-readable artifacts over prose-only claims. Every important inventory or mapping must be reproducible from the repository.
12. Keep pull requests bounded and reviewable. If the phase reveals work too large for one safe change, split it into ordered slices and execute only the first approved slice.

MANDATORY PHASE LOOP
A. Verify prerequisites and current repository state.
B. Print a concise execution plan and name every file or surface you expect to touch.
C. Perform the phase work.
D. Run the repository-prescribed checks plus the phase-specific checks.
E. Update {{DOCS_ROOT}}/state.json and the phase artifacts atomically.
F. Produce a completion report containing: changed files, generated artifacts, commands run, results, decisions, unresolved risks, rollback instructions, metrics delta, and the exact recommended next phase.
G. Stop. Do not continue automatically.

STOP CONDITIONS
Stop without mutating production code when: the working tree is unexpectedly dirty; required instructions conflict; the state ledger does not match the checkout; baseline tests fail for unrelated reasons; a security boundary is unclear; visual parity cannot be evaluated; a destructive operation lacks zero-use proof; or a genuine product/design decision is required.

Now execute only the phase prompt that follows.`;

window.PCKUP_MIGRATION_PHASES = [
  {
    id: "phase-0",
    number: "00",
    title: "Program charter, baseline, and migration control plane",
    stage: "Control",
    mode: "One-time",
    gate: "Owner approval",
    summary: "Establish the migration ledger, current-state baseline, branch/worktree rules, evidence standards, and rollback model before touching product architecture.",
    why: [
      "The repository is too mature for an agent to infer scope from file names or historical documents.",
      "Every later phase needs one durable state ledger and one definition of done.",
      "Baseline failures must be separated from migration regressions before changes begin."
    ],
    inputs: [
      "Latest {{BASE_BRANCH}} checkout of {{REPO}}",
      "Current repository agent/contribution instructions",
      "Current package scripts, CI workflows, design-system docs, Figma integration docs, and route architecture",
      "Optional local-only Figma library URL: {{FIGMA_URL}}"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/charter.md",
      "{{DOCS_ROOT}}/state.json",
      "{{DOCS_ROOT}}/baseline/commands.json",
      "{{DOCS_ROOT}}/baseline/repository-snapshot.json",
      "{{DOCS_ROOT}}/decisions/ADR-000-migration-operating-model.md"
    ],
    exitGates: [
      "The exact base commit and working-tree state are recorded.",
      "Baseline checks have reproducible command/output records; existing failures are classified, not silently fixed.",
      "Scope, non-goals, approval points, rollback rules, and evidence requirements are explicit.",
      "The owner approves the charter before architecture mutation begins."
    ],
    risks: [
      "Do not let this phase become a broad documentation cleanup.",
      "Do not fix unrelated baseline failures inside the charter PR.",
      "Do not claim Figma or Code Connect status without live verification."
    ],
    prompt: `Execute Phase 00 only: establish the migration control plane for {{REPO}}.

OBJECTIVE
Create the durable program charter and baseline needed to migrate this mature frontend to a scalable design-system paradigm without a big-bang rewrite. Do not refactor product UI in this phase.

DISCOVERY
1. Fetch the latest {{BASE_BRANCH}} and record the exact commit SHA.
2. Read all current repository-level instructions that govern agents, pull requests, generated artifacts, tests, protected paths, auto-merge, and report requirements. Include nested instructions for any directory you will touch.
3. Inspect package.json, TypeScript configuration, Next.js configuration, test runners, design-token scripts, Figma/Code Connect configuration, relevant CI workflows, route groups, and existing design-system reconstruction documents.
4. Treat old reports as historical evidence only. Verify every claimed current fact against the checkout.
5. Confirm whether {{DOCS_ROOT}} already exists. If a prior migration ledger exists, reconcile it; never overwrite an active program silently.

BASELINE
1. Create an isolated branch/worktree named for {{RUN_ID}} using the repository's prescribed workflow.
2. Run the repository-prescribed lightweight preflight first, then the current typecheck, lint, design-system/token checks, focused frontend unit tests, and build or equivalent checks that can safely run in this environment.
3. Do not repair unrelated failures. Record command, exit code, duration, relevant output, likely owner, and whether the failure blocks migration work.
4. Record high-level current architecture: route/surface families, global stylesheet entry points, design-system directories, token sources and generated outputs, existing Figma/Code Connect files, and major test/preview surfaces.
5. Record current size indicators for known migration hotspots, but calculate them live rather than copying numbers from this guide.

CREATE THE CONTROL PLANE
Create {{DOCS_ROOT}} with:
- charter.md: problem statement, target outcome, non-goals, strangler strategy, safety constraints, approval model, PR sizing policy, and completion definition.
- state.json: schemaVersion, runId, repository, baseBranch, baseCommit, currentPhase, phaseStatus, completedPhases, decisions, blockers, metrics, surfaces, componentFamilies, artifacts, activeAdapters, pendingDeletions, and rollbackRefs.
- baseline/commands.json: reproducible check results.
- baseline/repository-snapshot.json: machine-readable architecture facts and file-size indicators.
- decisions/ADR-000-migration-operating-model.md: authority model and why the program is not a rewrite.

STATE LEDGER REQUIREMENTS
The ledger must be deterministic, validated by a small script or schema, and updated by every later phase. Do not store secrets. Include timestamps and commit SHAs, but do not use mutable prose as the only source of truth.

VALIDATION
- Prove the artifacts parse and all referenced paths exist.
- Prove no product runtime code or visual CSS changed.
- Run the repository's documentation/format checks that apply.
- Compare the branch to the base commit and list every changed path.

COMPLETION RESPONSE
Return a Phase 00 report with baseline results, discovered conflicts, files created, exact approval decisions required, rollback instructions, and the proposed Phase 01 branch/scope. Stop for owner approval. Do not begin the census.`
  },
  {
    id: "phase-1",
    number: "01",
    title: "Automated design architecture census",
    stage: "Discovery",
    mode: "One-time, rerunnable",
    gate: "Deterministic inventory",
    summary: "Build a machine-readable census joining routes, React components, native controls, class usage, CSS selectors, token usage, component states, tests, and existing Figma mappings.",
    why: [
      "A file listing is not a component inventory.",
      "The migration must connect JSX consumers to the selectors and tokens that actually paint them.",
      "A reproducible census prevents agents from selectively inspecting only the tidy parts of the codebase."
    ],
    inputs: [
      "Approved Phase 00 charter and matching state ledger",
      "Current source tree and package/tooling configuration",
      "Existing design-token, Figma, Code Connect, and historical inventory artifacts"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/inventory/components.json",
      "{{DOCS_ROOT}}/inventory/routes.json",
      "{{DOCS_ROOT}}/inventory/stylesheets.json",
      "{{DOCS_ROOT}}/inventory/selectors.json",
      "{{DOCS_ROOT}}/inventory/controls.json",
      "{{DOCS_ROOT}}/inventory/component-style-graph.json",
      "{{DOCS_ROOT}}/inventory/summary.md",
      "A deterministic census command and tests"
    ],
    exitGates: [
      "Every design-relevant source file is classified or explicitly excluded with a reason.",
      "React components and route consumers are joined to CSS selectors and token usage where statically knowable.",
      "Raw controls, inline visual styles, global selectors, component exports, and oversized UI files have baselines.",
      "Two runs on the same commit produce byte-identical normalized artifacts."
    ],
    risks: [
      "Do not rely on regex alone for TSX/JSX ownership relationships.",
      "Do not confuse route components with reusable design-system components.",
      "Do not mutate runtime code merely to make the census easier."
    ],
    prompt: `Execute Phase 01 only: build the complete design architecture census for {{REPO}}.

PRECONDITIONS
- Phase 00 is approved and {{DOCS_ROOT}}/state.json matches the current checkout.
- Work on a bounded branch/worktree from the recorded base.
- This phase is analysis and tooling. Do not refactor runtime UI.

OBJECTIVE
Create a deterministic, machine-readable inventory of the frontend's real design architecture. The inventory must cover the entire design-relevant codebase, not only the existing ui directory.

CENSUS SCOPE
Inventory at minimum:
1. Next.js routes, layouts, loading/error/not-found boundaries, route groups, and major surface families.
2. React/TSX component declarations, exports, imports, props/types, client/server status, file size, line count, and consumer count.
3. Native interactive elements: button, input, textarea, select, dialog, details, summary, anchor-as-control, contenteditable, and ARIA widget roles.
4. Inline style objects and style-like props that encode visual decisions.
5. className values, conditional class builders, CSS Module references if any, and dynamically constructed selectors with a confidence score.
6. Every CSS file, selector, declaration count, custom-property definitions and usages, media/container queries, pseudo-classes/states, keyframes, and import order.
7. The relationship graph between component files, rendered class names, selector definitions, token usage, and routes.
8. Existing design-system components, adapters, global patterns, shells, navigation systems, dialog systems, field systems, card/table/state patterns, and feature-local UI.
9. Existing Figma deep-link contracts, Code Connect files/configuration, component manifests, Storybook or internal reference routes, visual-test surfaces, and design-token artifacts.
10. Existing tests that protect visual, responsive, interaction, accessibility, route, or component behavior.

IMPLEMENTATION RULES
- Use TypeScript/JavaScript AST parsing for source relationships. Use a real CSS parser for selectors/declarations. Regex may supplement but must not be the sole authority for critical mappings.
- Build the census as a repository script with normalized sorting and stable IDs.
- Preserve uncertainty. Dynamic class names or runtime-only composition must carry confidence and evidence rather than invented certainty.
- Classify files as foundation, primitive candidate, behavior candidate, pattern candidate, shell, feature-local, page composition, infrastructure, generated, test, or excluded.
- Record source commit and tool version in every artifact.

REQUIRED OUTPUTS
Create normalized JSON artifacts under {{DOCS_ROOT}}/inventory plus summary.md. The component-style graph must permit questions such as:
- Which routes consume a selector?
- Which components render raw buttons?
- Which stylesheets define card-like patterns?
- Which components use the canonical Button versus raw controls?
- Which CSS selectors have no statically known consumer?
- Which components have Figma or Code Connect coverage?
- Which files combine layout, behavior, and product concerns at unsafe scale?

BASELINE METRICS
Record at least: total design-relevant components; raw interactive controls outside approved low-level implementations; inline visual style sites; global CSS bytes and selector count; selectors with multiple unrelated consumers; unowned selectors; component families with duplicate implementations; CSS/TSX files above agreed warning thresholds; Figma-mapped production components; and Code Connect coverage.

VALIDATION
- Add tests with representative tricky JSX and CSS fixtures.
- Run twice and prove normalized output is identical.
- Reconcile counts against independent repository searches and explain material differences.
- Prove runtime source files are unchanged.

COMPLETION RESPONSE
Report the census command, artifact paths, key quantitative findings, uncertainty areas, and proposed Phase 02 capture scope. Update state.json and stop.`
  },
  {
    id: "phase-2",
    number: "02",
    title: "Runtime visual and interaction baseline",
    stage: "Discovery",
    mode: "One-time, refreshable",
    gate: "Evidence coverage",
    summary: "Capture the live visual truth and interaction states across representative routes, widths, themes, auth contexts, and product surfaces before structural migration begins.",
    why: [
      "Static code cannot prove what the cascade, runtime state, or responsive layout actually renders.",
      "Zero-visual-change phases need an objective before/after baseline.",
      "Authenticated and internal surfaces require safe fixtures rather than production-data shortcuts."
    ],
    inputs: [
      "Phase 01 route and component census",
      "Existing local fixture, preview, demo, and utility-lab capabilities",
      "Approved test identities or synthetic fixtures only"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/runtime/route-matrix.json",
      "{{DOCS_ROOT}}/runtime/capture-manifest.json",
      "{{DOCS_ROOT}}/runtime/state-coverage.json",
      "Versioned screenshots or approved visual snapshots",
      "A reproducible capture command and environment notes"
    ],
    exitGates: [
      "Every major surface family has representative desktop/mobile and light/dark evidence where supported.",
      "Critical interaction states and keyboard/focus behavior are represented.",
      "Captured data is synthetic, redacted, or already approved for test use.",
      "Each image is traceable to route, commit, viewport, theme, fixture, and capture command."
    ],
    risks: [
      "Never weaken authentication or expose production data to make screenshots easier.",
      "Do not treat screenshot similarity as a substitute for behavioral tests.",
      "Avoid capturing every route blindly; use risk- and component-coverage selection."
    ],
    prompt: `Execute Phase 02 only: establish the runtime visual and interaction baseline for {{REPO}}.

OBJECTIVE
Create reproducible visual and behavioral evidence for the current application before component and stylesheet migration. Do not redesign or refactor UI in this phase.

PLAN FROM THE CENSUS
1. Read Phase 01 routes, component-style graph, tests, and metrics.
2. Group routes into surface families: marketing/public, authentication, estimate/order flow, customer dashboard, courier application/workspace, internal operations/utility, and any additional verified family.
3. Select a minimal route/state matrix that maximizes component and selector coverage. Explain why each route is included and which families remain uncovered.

SAFE RUNTIME ACCESS
- Prefer existing fixtures, demo modes, preview routes, test harnesses, and utility-lab routes.
- Use synthetic accounts and data approved by repository policy.
- Never bypass security checks, serialize private production data, or commit session material.
- If a protected state cannot be reached safely, record the blocker and create a proposal for a fixture seam; do not weaken the boundary.

CAPTURE DIMENSIONS
For each selected route, capture as applicable:
- Desktop and mobile widths plus any known breakpoint-risk width.
- Light and dark themes.
- Default, hover, focus-visible, active, disabled, loading, empty, error, success, open/expanded, and validation states.
- Keyboard tab order, focus restoration, Escape behavior, scroll lock, responsive navigation, and reduced-motion behavior for critical widgets.
- Authenticated, unauthenticated, role-specific, and read-only/emulated contexts using approved fixtures.

ARTIFACT MODEL
Create a capture manifest where every artifact records: stable ID, route, surface, source commit, fixture/scenario, viewport, pixel ratio, theme, state, browser, timestamp, command, component families visible, and redaction status. Store images in the repository-approved evidence location; avoid duplicating large assets if the project has an existing report/media pattern.

AUTOMATION
Extend the existing Playwright/e2e stack rather than introducing an unrelated visual framework without justification. Separate deterministic screenshot setup from assertions. Mask inherently volatile values only when documented; do not hide real layout instability.

VALIDATION
- Re-run a representative sample to quantify nondeterminism.
- Confirm no secrets or private records appear in artifacts.
- Run existing route, accessibility, and responsive tests relevant to captured surfaces.
- Compare branch to base and prove no intentional runtime visual change.

COMPLETION RESPONSE
Return coverage by surface/component/state, artifact paths, inaccessible states, flaky regions, and the exact evidence Phase 03 should use. Update state.json and stop.`
  },
  {
    id: "phase-3",
    number: "03",
    title: "Component equivalence graph and rogue-pattern clustering",
    stage: "Analysis",
    mode: "One-time, refreshable",
    gate: "Decision-ready clusters",
    summary: "Combine static ownership and runtime evidence to identify true component families, duplicates, legitimate contextual variants, feature-local patterns, and page compositions.",
    why: [
      "Copying every existing pattern into a library would formalize the current fragmentation.",
      "Similar class names do not prove equivalent behavior, and different names do not prove different components.",
      "The migration queue must be based on consumer value, risk, and consolidation potential."
    ],
    inputs: [
      "Phase 01 component-style graph",
      "Phase 02 runtime capture matrix",
      "Current Figma library inventory and Code Connect status if safely accessible"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/equivalence/families.json",
      "{{DOCS_ROOT}}/equivalence/graph.json",
      "{{DOCS_ROOT}}/equivalence/consumer-matrix.csv",
      "{{DOCS_ROOT}}/equivalence/decision-register.md",
      "{{DOCS_ROOT}}/equivalence/migration-ranking.json"
    ],
    exitGates: [
      "Every high-frequency rogue pattern belongs to a reviewed cluster or an explicit unknown bucket.",
      "Each cluster has keep/merge/adapt/local/composition/retire disposition and evidence.",
      "No Figma component is proposed merely because a CSS class exists.",
      "Priority ranking includes value, reach, complexity, regression risk, and dependency order."
    ],
    risks: [
      "Do not generalize visually similar components with incompatible semantics.",
      "Do not preserve accidental differences as permanent variants.",
      "Do not decide product taste questions without surfacing them to the owner."
    ],
    prompt: `Execute Phase 03 only: build the component equivalence graph for {{REPO}}.

OBJECTIVE
Turn the static census and runtime captures into a decision-ready model of what the design system should actually contain. Do not implement or delete components yet.

ANALYSIS METHOD
1. Load Phase 01 inventory and Phase 02 capture manifest.
2. Cluster implementations by semantic role, anatomy, behavior, accessibility contract, state model, responsive behavior, visual treatment, token usage, and consumer context.
3. Begin with high-leverage families: buttons/actions, icon controls, fields, selects/comboboxes, checkboxes/radios/options, badges/status, notices, dialogs/drawers/popovers, disclosure/tabs, cards/panels, page headers, filters, tables/record cards, loading/empty/error states, navigation items, steppers, route/quote summaries, and application shells.
4. Explicitly inspect known parallel systems such as route-local raw controls, global class patterns, canonical ui components, utility-specific components, dashboard/courier shells, and marketing navigation.
5. Use runtime images and behavior tests to distinguish true equivalence from superficial similarity.

DISPOSITIONS
Assign one disposition to every candidate implementation:
- CANONICAL: already suitable as the shared contract.
- MERGE: should converge into a new or existing canonical family.
- ADAPT: remains temporarily but delegates to the canonical implementation.
- SURFACE: shared only inside one approved product/surface library.
- FEATURE_LOCAL: intentionally local, with no enterprise-library status.
- COMPOSITION: a page/feature composition, not a reusable component.
- RETIRE: duplicate or obsolete after consumers migrate.
- UNKNOWN: insufficient evidence; name the missing evidence.

FAMILY MODEL
For each proposed family record: stable ID; proposed name; semantics; anatomy; behaviors; states; responsive rules; accessibility contract; current implementations; routes/consumer counts; selectors; tokens; tests; current Figma assets; current Code Connect mappings; proposed scope; dependency families; migration difficulty; regression risk; and unresolved design/API decisions.

PRIORITIZATION
Score each family for reuse reach, duplicated code/CSS removed, user risk, accessibility impact, dependency centrality, visual inconsistency, and implementation complexity. Produce an ordered queue that starts with foundations/primitives and avoids shell work before underlying controls exist.

OWNER DECISIONS
Create a decision register for genuine forks, such as whether two visual treatments are intentional brands/contexts or accidental drift. Provide evidence and a recommended default; do not silently choose taste-sensitive outcomes.

VALIDATION
- Trace every high-priority cluster back to real files, selectors, routes, and screenshots.
- Sample low-confidence clusters manually.
- Reconcile proposed families against the current Figma inventory without assuming Figma is canonical.
- Prove runtime code remains unchanged.

COMPLETION RESPONSE
Present the top consolidation opportunities, disputed clusters, proposed dependency order, and decisions required before Phase 04. Update state.json and stop.`
  },
  {
    id: "phase-4",
    number: "04",
    title: "Target taxonomy, code architecture, and authority decisions",
    stage: "Architecture",
    mode: "One-time",
    gate: "Architecture approval",
    summary: "Approve the scalable component taxonomy, code/package boundaries, styling ownership model, Figma layers, source-of-truth rules, and ordered migration waves.",
    why: [
      "Refactoring without a target architecture just moves chaos into new folders.",
      "The system needs explicit boundaries between shared components, surface libraries, feature UI, and page composition.",
      "Design and engineering authority must be settled before bidirectional tooling is expanded."
    ],
    inputs: [
      "Approved charter",
      "Complete census and runtime baseline",
      "Phase 03 equivalence graph and decision register"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/architecture/target-architecture.md",
      "{{DOCS_ROOT}}/architecture/taxonomy.json",
      "{{DOCS_ROOT}}/architecture/source-of-truth.md",
      "{{DOCS_ROOT}}/architecture/migration-roadmap.json",
      "{{DOCS_ROOT}}/architecture/component-manifest.schema.json",
      "Approved ADRs for styling, package boundaries, Figma libraries, and adapters"
    ],
    exitGates: [
      "Every proposed family has a scope: core, surface, local, composition, or retired.",
      "Target directories, import boundaries, style ownership, naming, API rules, and adapter rules are approved.",
      "Figma library layering and Code Connect eligibility are explicit.",
      "Migration waves are dependency-ordered, bounded, and rollbackable."
    ],
    risks: [
      "Do not turn the target architecture into a single mega-package with no boundaries.",
      "Do not force global abstraction where only one legitimate consumer exists.",
      "Do not combine architecture approval with mass file movement."
    ],
    prompt: `Execute Phase 04 only: define and approve the target design-system architecture for {{REPO}}.

OBJECTIVE
Convert the evidence and equivalence graph into a scalable design paradigm and migration roadmap. This phase makes architecture decisions; it does not perform the broad migration.

DEFINE THE TAXONOMY
Establish clear criteria and examples for:
1. Foundations: tokens, typography, icons, motion, breakpoints, accessibility constants.
2. Primitives: low-level typed controls and visual building blocks.
3. Behavioral components: dialog, drawer, popover, tooltip, disclosure, tabs, combobox, file upload, toast.
4. Product-agnostic patterns: page header, filter bar, metric card, data table, record card, state panel, navigation item.
5. Shells: composition infrastructure for auth, flows, portals, operations, and marketing.
6. Surface libraries: components shared inside one bounded product family but not universally.
7. Feature-local UI: intentionally local implementation.
8. Page composition: route-level arrangement that must not masquerade as a library component.
9. Legacy/retired: compatibility only, with a named removal condition.

TARGET CODE ARCHITECTURE
Evaluate the default src/design-system + src/features + route-composition model shown in this guide against current Next.js constraints, server/client boundaries, import aliases, CSS loading behavior, test infrastructure, and repository policy. Approve it or record a better alternative. Define:
- Public package entry points and forbidden deep imports.
- One folder per canonical family with component, types, owned styles, tests, examples, accessibility notes, migration notes, and optional Code Connect template.
- CSS Modules or another explicit ownership mechanism for canonical components; true globals limited to reset, foundations, and documented application-wide contracts.
- Temporary adapters and legacy facades with owner, consumer count, and expiration condition.
- Component naming, prop naming, variant/state rules, slot/composition rules, and when not to abstract.
- Server/client boundaries and how interactive primitives avoid forcing entire route trees client-side.

AUTHORITY MODEL
Approve an explicit matrix for token values, component APIs/behavior, visual anatomy/states, product composition, Figma variables/components, Code Connect, generated outputs, and deployed truth. Define conflict resolution and which direction each sync may write.

FIGMA ARCHITECTURE
Define library layers such as Foundations, Core, Product, and Operations. State whether these are separate files or governed pages initially. Product/Operations assets must depend on Core rather than recreate primitives. Only approved canonical families are eligible for publication and Code Connect.

MANIFEST
Define a machine-readable component manifest schema containing stable family ID, scope, code source/export, status, owner, consumers, tokens, states, accessibility contract, Figma file/node/key, Code Connect ID, tests, examples, adapters, legacy replacements, and release version.

ROADMAP
Create dependency-ordered waves with small PR boundaries. Include recommended pilot, surface order, required gates, rollback, metrics, and which phases repeat per family/surface. Operations/utility should not be migrated first merely because its files are largest; choose order by learning value and risk containment.

VALIDATION
Walk at least five representative families and two shells through the proposed architecture. Show where current files would land without actually moving them. Identify circular dependencies or client-boundary problems.

COMPLETION RESPONSE
Present proposed architecture, deviations from the default, decisions requiring owner approval, and the exact Phase 05 scope. Update state.json and stop for approval.`
  },
  {
    id: "phase-5",
    number: "05",
    title: "Warning-only guardrails and adoption metrics",
    stage: "Enablement",
    mode: "One-time, then continuous",
    gate: "No new debt",
    summary: "Install baseline-aware audits so new raw controls, unowned global selectors, visual inline styles, and unregistered shared components stop increasing while migration proceeds.",
    why: [
      "A long migration fails if new debt grows faster than old debt is removed.",
      "Immediately failing on all legacy violations would freeze development.",
      "Decrease-only baselines create forward pressure without requiring a big-bang cleanup."
    ],
    inputs: [
      "Approved Phase 04 taxonomy and architecture",
      "Phase 01 baseline metrics and ownership graph",
      "Current CI and repository policy"
    ],
    artifacts: [
      "Baseline-aware design architecture audit scripts",
      "{{DOCS_ROOT}}/metrics/baseline.json",
      "{{DOCS_ROOT}}/metrics/latest.json",
      "{{DOCS_ROOT}}/metrics/exceptions.json",
      "Warning-only CI job and local command",
      "Contributor-facing audit output"
    ],
    exitGates: [
      "Current debt is baselined by category and path.",
      "New violations produce actionable warnings and CI annotations.",
      "Approved low-level implementations and exceptions are explicit, narrow, and expiring.",
      "Two unchanged runs are deterministic and normal feature development remains possible."
    ],
    risks: [
      "Do not add a noisy audit nobody can act on.",
      "Do not broadly exempt whole directories to make results green.",
      "Do not make legacy debt blocking until Phase 16 thresholds are met."
    ],
    prompt: `Execute Phase 05 only: install warning-only design architecture guardrails for {{REPO}}.

OBJECTIVE
Prevent new design-system debt while existing debt is migrated. Use baseline-aware, decrease-only rules. Do not require all legacy violations to be fixed now.

AUDIT CATEGORIES
Implement deterministic detection for at least:
1. New raw button/input/textarea/select/dialog/details-summary or ARIA-widget implementations outside approved primitive/behavior internals.
2. New inline visual style declarations, while permitting documented non-visual dynamic measurements where necessary.
3. New global component selectors or additions to legacy monolithic stylesheets outside approved migration work.
4. New hardcoded visual values that bypass the token/component-token policy, integrating rather than duplicating the existing color/token audit.
5. New reusable-looking component exports outside approved design-system, surface, or feature-local boundaries.
6. New imports from forbidden internal design-system paths.
7. New oversized UI files beyond warning thresholds or growth of already oversized files without an approved decomposition note.
8. New unregistered canonical components or published Figma/Code Connect mappings absent from the manifest.

BASELINE MODEL
- Generate a normalized baseline from the Phase 01 census.
- Fail only when a pull request increases a protected category or violates a zero-tolerance new-path rule.
- During this phase, CI should annotate/warn rather than block unless the repository already has a safe blocking convention for zero-tolerance secrets or generated-file violations.
- Store exceptions as exact paths/rules with owner, reason, creation date, review date, and removal condition. No wildcard directory amnesty.

DEVELOPER EXPERIENCE
Provide one local command that prints a compact summary plus machine-readable JSON. For each finding include rule ID, file/line, category, current baseline, remediation path, and link to the architecture guidance. Make unchanged legacy debt quiet by default but available in a full report.

METRICS
Publish/update metrics for canonical component adoption, raw controls, inline visual styles, global CSS bytes/selectors, legacy facade consumers, mapped Figma components, Code Connect coverage, and unowned selectors. Keep the report generated and reproducible.

CI INTEGRATION
Add the smallest compatible workflow/change to the existing CI architecture. Respect current change classification, caching, protected paths, and auto-merge rules. Do not invent a parallel CI system.

VALIDATION
Plant temporary fixture violations for each rule and prove detection, then remove fixtures. Prove current main does not become unmergeable. Run relevant policy, lint, type, and test commands.

COMPLETION RESPONSE
Report rules, baseline counts, exception policy, CI behavior, and the first metric targets. Update state.json and stop.`
  },
  {
    id: "phase-6",
    number: "06",
    title: "Mechanical stylesheet ownership split",
    stage: "Decomposition",
    mode: "Repeat per monolith",
    gate: "Zero visual change",
    repeatable: true,
    summary: "Split giant global stylesheets into ownership-oriented legacy modules while preserving selector order, specificity, imports, and rendered output exactly.",
    why: [
      "Component extraction is unsafe while selector ownership is hidden inside giant files.",
      "The first split must be mechanical; combining it with redesign obscures regressions.",
      "A shrinking legacy facade provides a controlled bridge to colocated canonical styles."
    ],
    inputs: [
      "Approved style ownership architecture",
      "Selector-consumer graph and runtime baseline",
      "One selected stylesheet monolith and its import/cascade context"
    ],
    artifacts: [
      "Ownership-split legacy modules",
      "A facade preserving original load order",
      "{{DOCS_ROOT}}/css/<stylesheet>-ownership.json",
      "Ordered-rule equivalence report",
      "Before/after visual evidence"
    ],
    exitGates: [
      "No selector, declaration, keyframe, media query, or layer is intentionally changed.",
      "The effective rule order and global import position are preserved.",
      "Representative visual and interaction baselines pass.",
      "Every extracted module has a named surface/family owner and later retirement route."
    ],
    risks: [
      "CSS imports and Next.js bundling can alter order even when source text is identical.",
      "Do not rename selectors or normalize values in the mechanical split.",
      "Migrate one monolith or one safely bounded section per PR."
    ],
    prompt: `Execute Phase 06 only for one approved stylesheet monolith in {{REPO}}.

SELECTED TARGET
Use the highest-priority stylesheet from the approved roadmap. If no target is recorded in state.json, inspect the ownership graph and propose one; do not arbitrarily split every stylesheet at once.

OBJECTIVE
Mechanically decompose the target into ownership-oriented legacy modules without changing visual output, selector specificity, declaration values, keyframe behavior, media-query behavior, or global cascade order.

DISCOVERY
1. Record the target file's import location, byte/line/rule counts, selector consumers, keyframes, custom properties, media queries, and cross-section dependencies.
2. Identify contiguous ownership regions using comments, selector prefixes, consumer routes, and the Phase 01 graph.
3. Create an ordered split plan. Typical modules may include foundation, shell, navigation, controls, dialogs, and individual feature surfaces, but names must reflect verified ownership.

MECHANICAL RULES
- Move source blocks verbatim wherever possible.
- Do not rename selectors, reorder declarations, simplify values, change shorthand, alter comments that carry history, or convert to CSS Modules yet.
- Preserve original relative order through a facade/import mechanism verified to behave identically in the current Next.js build.
- Preserve keyframe visibility and custom-property scope.
- If a rule spans multiple owners, place it in an explicitly named shared-legacy module and record the consumers; do not duplicate it.
- Do not opportunistically redesign, retokenize, or extract React components in this phase.

EQUIVALENCE PROOF
Create a script/report comparing normalized ordered AST nodes before and after. Account for import expansion. The report must enumerate any non-identical node; the expected intentional difference is file boundaries only.

RUNTIME VALIDATION
Use Phase 02 captures and existing e2e tests for every surface that consumes the target. Compare critical widths, themes, focus states, overlays, and navigation behavior. Run build and CSS/token audits. Investigate any difference rather than updating the baseline.

OWNERSHIP ARTIFACT
Write {{DOCS_ROOT}}/css/<target>-ownership.json with module, selectors, routes, component candidates, shared dependencies, current consumer count, and eventual canonical replacement family.

ROLLBACK
Keep the original file recoverable from a single parent commit and document a one-command rollback. Do not delete historical evidence.

COMPLETION RESPONSE
Report exact moved ranges/modules, AST equivalence, visual/test results, unresolved shared blocks, and the next bounded stylesheet target. Update metrics/state and stop.`
  },
  {
    id: "phase-7",
    number: "07",
    title: "Foundation and token reconciliation",
    stage: "Foundations",
    mode: "One-time, then governed",
    gate: "Single token taxonomy",
    summary: "Reconcile live usage, reviewed token JSON, generated CSS, Figma Variables, fonts, themes, and component-local geometry without inventing a second token system.",
    why: [
      "Canonical components need stable foundations before extraction.",
      "The existing token pipeline should be extended, not replaced.",
      "Component-specific geometry should become tokens only when a real reuse or theming requirement exists."
    ],
    inputs: [
      "Existing reviewed token sources and generator",
      "Live token/custom-property usage census",
      "Runtime computed-style evidence",
      "Approved Figma Variable access if available"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/foundations/reconciliation.md",
      "{{DOCS_ROOT}}/foundations/token-usage.json",
      "Approved token changes through the existing pipeline",
      "Updated Figma variable/code-syntax audit",
      "Computed-style regression evidence"
    ],
    exitGates: [
      "One authoritative token taxonomy remains.",
      "Font, theme, alias, scope, and code-syntax chains resolve correctly at runtime.",
      "New component tokens are justified by consumers and documented.",
      "Generated output is reproducible and all existing design-system checks pass."
    ],
    risks: [
      "A token correction can intentionally change the whole product; require explicit review.",
      "Do not hand-edit generated CSS.",
      "Do not tokenize every pixel merely to increase token count."
    ],
    prompt: `Execute Phase 07 only: reconcile Pckup foundations and design tokens in {{REPO}}.

OBJECTIVE
Make the existing token system a reliable foundation for canonical components. Preserve the current reviewed token JSON, compiler, generated CSS, compatibility aliases, and Figma sync model unless evidence proves a targeted change is required.

AUDIT
1. Trace each foundation category from source JSON through generation, compatibility aliases, CSS usage, computed runtime value, and Figma Variable/code syntax where accessible.
2. Cover color, typography/font loading, spacing, radii, borders, shadows/effects, opacity, motion, z-index/elevation, breakpoints/container behavior, and surface/context themes.
3. Revisit previously recorded drift only as a hypothesis; verify against current main and current Figma state.
4. Identify unused tokens, duplicate semantics, unresolved aliases, invalid computed values, theme gaps, hardcoded values with multiple consumers, and component-local constants that should remain local.

DECISION RULES
- Keep one taxonomy. Do not create a parallel token namespace for the migration.
- Prefer semantic tokens consumed by components; primitives should not leak into every product call site.
- Introduce component tokens only when at least two variants/consumers, theming, or cross-platform parity justify them.
- A value that changes rendered output requires before/after evidence and an explicit decision record.
- Compatibility aliases are migration infrastructure with tracked consumers, not permanent new authority.

IMPLEMENTATION
Make only approved, bounded corrections through existing token sources and generators. Update validation to cover alias resolution, font-variable placement, mode completeness, Figma scopes, and WEB code syntax where applicable. Keep generated output deterministic.

FIGMA
If {{FIGMA_URL}} is available and authorized, compare collections, modes, variable aliases, scopes, and code syntax. Do not create components yet. Do not write to Figma until discovery and the approved plan are complete.

RUNTIME PROOF
Capture computed styles for representative primitives and surfaces in both themes. Run token validation/build/check/audit plus affected visual and route tests. Any sitewide visual delta must be called out explicitly.

COMPLETION RESPONSE
Report reconciled chains, intentional visual changes, deferred values, component-token candidates, Figma drift, and the stable foundation contract Phase 08 may consume. Update state.json and stop.`
  },
  {
    id: "phase-8",
    number: "08",
    title: "Canonical primitive family migration",
    stage: "Component platform",
    mode: "Repeat per family",
    gate: "API + parity",
    repeatable: true,
    summary: "Create one production-grade primitive family at a time, preserve current behavior by default, add adapters, migrate bounded consumers, and measure adoption.",
    why: [
      "Primitives eliminate the largest source of new rogue controls.",
      "Stable typed APIs are required before patterns and shells can converge.",
      "One-family slices keep visual and behavioral regressions reviewable."
    ],
    inputs: [
      "Approved family record from Phase 03/04",
      "Stable foundations from Phase 07",
      "Current component implementations, consumers, selectors, tests, and screenshots"
    ],
    artifacts: [
      "Canonical {{FAMILY}} implementation in the approved design-system path",
      "Owned styles, types, tests, examples, accessibility notes, and migration notes",
      "Temporary adapters where needed",
      "Updated component manifest and adoption metrics",
      "Bounded migrated consumers"
    ],
    exitGates: [
      "The family API covers approved semantics/states without encoding accidental page details.",
      "Behavior, accessibility, responsive behavior, and visuals match the approved baseline or documented decision.",
      "A bounded consumer slice uses the canonical family in production code.",
      "Legacy consumers and removal conditions remain accurately tracked."
    ],
    risks: [
      "Do not migrate every consumer in the first family PR.",
      "Do not add variants solely to preserve accidental one-off styling.",
      "Avoid forcing server components to become client components unnecessarily."
    ],
    prompt: `Execute Phase 08 only for primitive family {{FAMILY}} in {{REPO}}.

PRECONDITIONS
- {{FAMILY}} exists in the approved family queue and taxonomy.
- Foundations are stable and state.json names the current consumer slice.
- If the family or slice is not recorded, stop and propose the smallest valid slice.

OBJECTIVE
Create the canonical production implementation of {{FAMILY}}, then migrate a bounded, representative consumer set using a strangler adapter where required. Do not migrate unrelated families.

DISCOVERY
1. Load the equivalence record for {{FAMILY}}: all implementations, props, selectors, states, routes, tests, screenshots, tokens, Figma assets, and unresolved decisions.
2. Read every selected consumer and the complete current low-level implementation—not only the cleanest version.
3. Separate semantic requirements from accidental visual differences and page-specific composition.

CONTRACT DESIGN
Define a typed API with:
- Correct native semantics and ref/event behavior.
- Approved sizes, tones/variants, states, loading/disabled/error behavior, slots, icon treatment, and responsive rules.
- Accessible name, focus, keyboard, announcement, and touch-target requirements.
- Server/client boundary kept as low as possible.
- Escape hatches that are narrow and typed; no unrestricted style prop or arbitrary variant string.

IMPLEMENTATION SHAPE
Use the Phase 04 approved directory and ownership model. Colocate implementation, types, owned stylesheet, tests, examples/reference fixture, README/accessibility contract, and migration notes. Export through the approved public entry point and register it in the component manifest.

PARITY FIRST
Default to the approved current visual treatment. If two old treatments conflict, implement only the owner-approved canonical decision and document which consumer needs an adapter. Do not redesign during extraction.

MIGRATION SLICE
Choose a small but representative set of consumers across at least one real route and one relevant state. Replace raw/local implementation with the canonical family. Use an adapter when changing every call site would make the PR unsafe. Track remaining consumers by exact path.

TESTS
Add component-level behavior/accessibility tests, type/API tests where valuable, visual examples for all approved states, and affected route/e2e tests. Compare Phase 02 baselines. Run typecheck, lint, design-system checks, focused tests, build, and audit metrics.

FIGMA HANDOFF
Do not publish or redesign the Figma component in this phase unless the roadmap explicitly combines the family with Phase 12. Record final code API and state model so the Figma phase can map it exactly.

COMPLETION RESPONSE
Report API, migrated consumers, remaining consumers, adapters, visual/behavior evidence, metrics delta, and recommended next primitive family. Update manifest/state and stop.`
  },
  {
    id: "phase-9",
    number: "09",
    title: "Canonical behavioral component family migration",
    stage: "Component platform",
    mode: "Repeat per family",
    gate: "Interaction + accessibility",
    repeatable: true,
    summary: "Converge overlays and stateful widgets such as dialogs, drawers, popovers, disclosures, tabs, comboboxes, uploads, and toasts into tested shared behavior.",
    why: [
      "Duplicated focus traps, portals, scroll locks, and keyboard handling are high-risk architecture debt.",
      "Behavioral consistency cannot be solved by tokens alone.",
      "Shared internals should support legitimate visual variants without creating parallel widget systems."
    ],
    inputs: [
      "Approved behavioral family record",
      "Completed primitive dependencies",
      "Existing interaction tests and runtime state captures"
    ],
    artifacts: [
      "Canonical {{FAMILY}} behavior and visual wrapper",
      "Interaction/accessibility test matrix",
      "Adapters for legacy APIs",
      "Updated manifest, consumer map, and metrics",
      "Bounded production adoption"
    ],
    exitGates: [
      "Keyboard, focus, portal, layering, dismissal, scroll, and announcement behavior is specified and tested.",
      "Nested/stacked behavior is either supported or explicitly prohibited with tests.",
      "Selected legacy consumers delegate to the canonical implementation.",
      "No parallel focus-management system is introduced."
    ],
    risks: [
      "Overlay migrations can break security-sensitive and destructive confirmations.",
      "Do not hide behavioral differences behind a visual-only wrapper.",
      "Test native and custom implementations before deciding which foundation survives."
    ],
    prompt: `Execute Phase 09 only for behavioral family {{FAMILY}} in {{REPO}}.

OBJECTIVE
Converge one stateful/interactive family into a canonical implementation with production-grade accessibility and migrate one bounded consumer slice. Candidate families include Dialog, Drawer, Popover, Tooltip, Disclosure, Tabs, Combobox, FileUpload, Toast/Notice, or another approved Phase 04 family.

DISCOVERY
1. Load the approved equivalence cluster and all current implementations.
2. Inventory portal strategy, native element usage, focus trap/restoration, Escape and outside-click behavior, scroll locking, layering/z-index, animation/reduced motion, nested instances, busy/destructive states, and server/client boundaries.
3. Reproduce critical states from Phase 02 and identify behavior protected by existing tests or security flows.

BEHAVIOR CONTRACT
Write the interaction contract before coding. Include state machine, controlled/uncontrolled API, keyboard map, focus entry/loop/return, dismissal policy, accessible names/descriptions, live announcements, inert/background behavior, stacking policy, touch behavior, reduced motion, and error/busy semantics.

ARCHITECTURE
Prefer one tested behavioral core with typed composition slots and owned visual styles. Use approved primitives for actions/fields. Do not create a universal mega-widget; split subfamilies when semantics differ. Preserve server rendering and hydration behavior.

ADAPTER STRATEGY
Map each selected legacy API to the canonical contract. If an old implementation has behavior the new contract does not safely cover, stop and record a decision rather than silently dropping it.

MIGRATION
Move a bounded high-value consumer slice. Keep old exports as thin adapters where needed, with deprecation metadata and exact remaining consumers. Do not delete the old behavior until Phase 15 zero-use proof.

VALIDATION
Test keyboard-only operation, focus restoration, screen-reader attributes, outside click, Escape, stacked/nested behavior, scroll lock cleanup, route transitions, error/busy states, and reduced motion. Run affected e2e scenarios and visual comparisons in both themes and relevant widths.

COMPLETION RESPONSE
Report the behavior contract, implementation decision, migrated consumers, adapter map, test evidence, remaining risks, and next family. Update manifest/state and stop.`
  },
  {
    id: "phase-10",
    number: "10",
    title: "Canonical data and product pattern family migration",
    stage: "Component platform",
    mode: "Repeat per family",
    gate: "Composition discipline",
    repeatable: true,
    summary: "Build reusable patterns such as page headers, cards, filter bars, tables, records, metrics, state panels, navigation items, steppers, and delivery summaries without creating mega-components.",
    why: [
      "Most visible inconsistency lives above primitives but below full pages.",
      "Patterns need composition APIs, not hundreds of boolean props.",
      "Responsive table/card and state behavior must be shared deliberately."
    ],
    inputs: [
      "Approved pattern family record",
      "Completed primitive and behavioral dependencies",
      "Consumer composition and responsive evidence"
    ],
    artifacts: [
      "Canonical {{FAMILY}} pattern",
      "Composition and responsive contract",
      "Examples with real-shaped synthetic data",
      "Bounded consumer migration and adapters",
      "Updated manifest and metrics"
    ],
    exitGates: [
      "The pattern represents a repeated product need, not one page frozen into props.",
      "Slots/subcomponents expose composition while preserving accessibility and layout rules.",
      "Responsive and empty/loading/error behavior is tested.",
      "At least one real consumer adopts the pattern without semantic loss."
    ],
    risks: [
      "Do not create a universal Card or Table that knows every product domain.",
      "Do not move business logic into the design system.",
      "Keep data transformation in feature code and presentation contracts in the pattern."
    ],
    prompt: `Execute Phase 10 only for pattern family {{FAMILY}} in {{REPO}}.

OBJECTIVE
Create one canonical product-agnostic or approved surface pattern and migrate a bounded consumer slice. Examples include PageHeader, Card/Panel, FilterBar, MetricCard, DataTable, RecordCard, StatePanel, NavigationItem, Stepper, RouteSummary, or QuoteSummary.

VALIDATE REUSE
Before implementation, prove the family has repeated anatomy/behavior across real consumers. If it is only one page composition, classify it FEATURE_LOCAL or COMPOSITION and stop rather than forcing it into the library.

SEPARATE CONCERNS
- Design system owns layout anatomy, visual states, responsive contract, accessibility, and composition API.
- Feature code owns fetching, domain models, permissions, mutations, formatting policy, and business rules.
- Adapters may translate domain data into presentation props temporarily.

API DESIGN
Prefer slots, subcomponents, renderable regions, and small typed variants over large boolean matrices. Define supported density, tone, selection, action, empty/loading/error, and responsive behavior only where evidence justifies them. Avoid arbitrary CSS class/style escape hatches.

RESPONSIVE CONTRACT
Explicitly document how the pattern behaves at constrained widths. For table-to-record-card transformations, define which semantics and actions persist, focus order, labels, and whether both views share one data model.

IMPLEMENTATION
Use approved primitives and behavioral components. Colocate owned styles, tests, examples, accessibility notes, and migration documentation. Register the family and exact Figma eligibility status in the manifest.

MIGRATION SLICE
Select one or a few representative consumers with synthetic fixture data and existing test coverage. Preserve business behavior. Keep a thin adapter when domain props differ. Record remaining consumers and accidental variants that were intentionally not preserved.

VALIDATION
Run component, accessibility, responsive, route, visual, type, lint, build, and design-system checks. Compare metrics and Phase 02 captures. Test empty/loading/error and long-content cases.

COMPLETION RESPONSE
Report why the family is reusable, API/anatomy, responsive behavior, migrated and remaining consumers, adapters, metrics delta, and recommended next pattern. Update manifest/state and stop.`
  },
  {
    id: "phase-11",
    number: "11",
    title: "Shell and navigation convergence",
    stage: "Architecture migration",
    mode: "Repeat per shell family",
    gate: "Boundary preservation",
    repeatable: true,
    summary: "Converge copied application chrome and navigation into composable shell infrastructure while keeping authentication, authorization, routing, and product behavior outside the visual shell.",
    why: [
      "Large parallel shells multiply navigation, responsive, and accessibility defects.",
      "A single mega-shell would be just as dangerous as copied shells.",
      "Shared shell primitives should compose product-specific policy rather than own it."
    ],
    inputs: [
      "Approved shell architecture and dependency families",
      "Completed primitive, behavior, navigation-item, and state components",
      "Current route/auth/security contracts and shell screenshots"
    ],
    artifacts: [
      "Canonical shell family or shared shell infrastructure",
      "Product-specific shell adapters/configurations",
      "Navigation registry contract",
      "Boundary and responsive tests",
      "Updated manifest, consumer map, and metrics"
    ],
    exitGates: [
      "Authentication/authorization and data policy remain outside generic presentation internals.",
      "Desktop/mobile navigation, focus, landmarks, and route-current state remain correct.",
      "One bounded shell consumer runs on shared infrastructure.",
      "The design system does not become a dependency on product-domain services."
    ],
    risks: [
      "Shell changes have broad blast radius and can leak protected information.",
      "Do not merge every product into one prop-heavy shell.",
      "Preserve server/client and prepaint/hydration behavior explicitly."
    ],
    prompt: `Execute Phase 11 only for the approved shell family associated with {{SURFACE}} in {{REPO}}.

OBJECTIVE
Converge one bounded shell/navigation family onto reusable infrastructure without collapsing distinct products into a mega-component and without changing security or route behavior.

DISCOVERY
1. Load the shell equivalence record, route tree, auth/authorization contracts, navigation registries, responsive captures, prepaint/hydration behavior, and existing tests.
2. Separate presentation responsibilities from product policy: shell layout, landmarks, slots, rail/topbar/drawer/tray behavior, focus and responsive mechanics versus auth guards, role decisions, data fetching, permissions, and route definitions.
3. Identify copied code and legitimate differences among the selected shells.

TARGET SHAPE
Design small composable pieces such as ShellFrame, ShellRail, ShellTopbar, ShellContent, MobileNavigation, AccountSlot, and a typed navigation model—or the Phase 04 approved equivalent. Product shells should compose these pieces and retain their own policy. Avoid a single component with dozens of booleans.

SECURITY AND RENDERING
- Preserve every server-side and client-side gate.
- Do not serialize protected data into unauthenticated shells.
- Preserve noindex/metadata, route containment, emulation/read-only behavior, and logout boundaries.
- Keep server/client boundaries minimal and document hydration/prepaint behavior.

MIGRATION
Select one shell pair or one product shell slice. Introduce adapters/configuration and migrate incrementally. For near-duplicate dashboard/courier chrome, share infrastructure while retaining distinct role and approval logic. Do not migrate the entire operations shell in one PR.

VALIDATION
Test route-current state, keyboard navigation, focus order, drawer/rail transitions, breakpoint handoff, scroll containment, safe areas, theme, reduced motion, auth redirects, protected-data boundaries, emulation, and sign-out behavior. Compare Phase 02 screenshots and run security-focused tests.

COMPLETION RESPONSE
Report shared versus product-specific responsibilities, migrated routes, preserved boundaries, adapters, test evidence, remaining shell consumers, and next slice. Update manifest/state and stop.`
  },
  {
    id: "phase-12",
    number: "12",
    title: "Figma canonicalization and Code Connect",
    stage: "Design integration",
    mode: "Repeat per stable family",
    gate: "Published parity",
    repeatable: true,
    summary: "Reconcile stable canonical code families with the enterprise Figma library, publish only approved assets, bind variables, and add parserless Code Connect templates.",
    why: [
      "Figma should describe the new canonical platform, not archive every legacy implementation.",
      "Code Connect becomes reliable only after code APIs and Figma properties stabilize.",
      "Component-by-component validation prevents a polished-looking but disconnected library."
    ],
    inputs: [
      "Stable canonical family {{FAMILY}} and manifest record",
      "Authorized Figma library URL {{FIGMA_URL}}",
      "Existing Figma Variables, components, library publishing, and Code Connect state"
    ],
    artifacts: [
      "Canonical Figma component with complete properties/variants and variable bindings",
      "Parserless .figma.ts Code Connect template",
      "Published mapping and Dev Mode verification",
      "Updated manifest IDs and coverage report",
      "Figma/code parity evidence"
    ],
    exitGates: [
      "The Figma component represents the approved code contract, not a rogue legacy implementation.",
      "All visual properties are bound to approved variables except documented fixed geometry.",
      "All supported states and variant values map exhaustively to real code props.",
      "Code Connect is published and verified from an instance in Dev Mode."
    ],
    risks: [
      "Never batch-create the whole library in one write operation.",
      "Do not map a Figma set to a CSS pattern with no stable code export.",
      "Do not let Figma properties invent code props or vice versa."
    ],
    prompt: `Execute Phase 12 only for stable canonical family {{FAMILY}} in {{REPO}} and Figma library {{FIGMA_URL}}.

PRECONDITIONS
- {{FAMILY}} is marked code-stable and Figma-eligible in the approved manifest.
- Its canonical source/export, props, states, tokens, examples, tests, and remaining legacy adapters are known.
- Authorized Figma access and enterprise Code Connect capability are available. If not, stop with a precise enablement checklist.

DISCOVERY FIRST — NO WRITES
1. Read current Figma/library and Code Connect guidance available to the agent.
2. Inspect the target file's pages, variable collections/modes, text/effect styles, existing component set, descriptions, published status, libraries, and current Code Connect map.
3. Inspect the canonical code component and current .figma.ts/.figma.tsx files/config.
4. Compare code props/states to Figma properties/variants and produce a gap plan. Do not assume historical node IDs remain valid.
5. If a genuine design/API conflict exists, stop for a decision before mutation.

FIGMA COMPONENT RULES
- Variables before component changes; reuse existing approved variables.
- Semantic variables alias primitives and carry correct scopes and WEB code syntax.
- Use auto layout and bind fills, strokes, spacing, radii, and supported effects to variables. Document intentionally fixed geometry.
- Model text, boolean, variant, instance-swap, and slot properties according to the real code API.
- Include exhaustive approved states without creating impossible cross-product variants.
- Use instance swaps for icons and nested canonical components.
- Add description, usage, accessibility, and source-path metadata.
- Mutate and validate one component family at a time; return/record actual IDs.

CODE CONNECT
Use the current parserless template format: ComponentName.figma.ts with figma.code, not a new .figma.tsx parser mapping. Preserve old parser files until the new template is published and verified, then retire them through the migration ledger.
- Resolve the published main component node.
- Fetch exact Figma property definitions.
- Map only to props that exist in the canonical TypeScript interface.
- Exhaustively map every variant option.
- Use correct methods for text, boolean, enum, instance swap, and slot properties.
- Use repository import aliases that work in emitted snippets.
- Typecheck/validate templates and publish through the approved Figma mechanism.

VALIDATION
Inspect component metadata and screenshots in all themes/states. Place an instance in a verification frame. In Dev Mode, prove the real import and snippet appear. Record file key, node ID, asset key, Code Connect ID/label, source path, and publication timestamp in the manifest.

COMPLETION RESPONSE
Report discovery, Figma mutations, bindings, variants, Code Connect template/publish result, screenshots, unresolved drift, and next eligible family. Update coverage/state and stop.`
  },
  {
    id: "phase-13",
    number: "13",
    title: "Pilot product-surface migration",
    stage: "Adoption",
    mode: "One-time pilot",
    gate: "End-to-end proof",
    summary: "Migrate one carefully selected product surface end to end, prove the architecture under real conditions, and feed friction back into the platform before broad rollout.",
    why: [
      "A component platform is unproven until a complete real surface adopts it.",
      "The pilot should maximize learning without choosing the highest-blast-radius surface.",
      "Migration friction must improve the platform rather than spawn one-off bypasses."
    ],
    inputs: [
      "Approved pilot surface {{SURFACE}}",
      "Canonical component dependencies and Figma/Code Connect coverage",
      "Current surface census, captures, tests, and business/security contracts"
    ],
    artifacts: [
      "{{DOCS_ROOT}}/surfaces/{{SURFACE}}/plan.md",
      "Migrated bounded route set",
      "Compatibility and remaining-consumer ledger",
      "Before/after visual and behavior report",
      "Pilot retrospective and architecture corrections"
    ],
    exitGates: [
      "The pilot routes use canonical components for the agreed scope.",
      "No business, accessibility, security, responsive, or visual regression is unresolved.",
      "Platform gaps are fixed generically or recorded; no hidden surface-only fork is introduced.",
      "The migration factory for Phase 14 is updated from measured experience."
    ],
    risks: [
      "Do not choose the operations monolith merely because it has the most debt.",
      "Do not redesign product flows while testing architecture adoption.",
      "Keep PRs sliceable even within the pilot."
    ],
    prompt: `Execute Phase 13 only: migrate the approved pilot surface {{SURFACE}} in {{REPO}}.

PILOT SELECTION CHECK
Confirm state.json records {{SURFACE}} as the owner-approved pilot. A good pilot has meaningful forms/actions/states, strong tests or safe fixtures, moderate route scope, and lower blast radius than the operations shell. If the recorded surface does not meet the criteria, stop with evidence and a replacement recommendation.

OBJECTIVE
Prove the new design-system paradigm end to end on a real product surface while preserving product behavior and visual intent. Use bounded PR slices; this prompt governs the full pilot plan, but execute only the first safe slice unless state.json explicitly authorizes more.

SURFACE PLAN
1. Map routes, layouts, components, selectors, tokens, tests, fixtures, API/business boundaries, analytics, and security behavior.
2. Mark each implementation: replace with canonical, adapt, remain feature-local, remain composition, or defer with reason.
3. Order changes by dependency and rollback safety.
4. Define before/after evidence and acceptance criteria for every slice.

IMPLEMENTATION RULES
- Replace controls/patterns through public design-system APIs.
- Keep business logic and data transformations in feature code.
- Use adapters for incompatible legacy props; do not distort canonical APIs for one surface.
- Move component-owned styles out of legacy global modules only when the consumer is migrated and parity is proven.
- Keep legacy selectors until zero-use proof; mark their consumer count after every slice.
- Do not mix product redesign, copy rewrite, or unrelated cleanup into migration PRs.

PLATFORM FEEDBACK
When the pilot exposes a missing canonical capability, determine whether it is broadly reusable. If yes, pause the surface and fix the component through Phases 08–12. If no, keep it feature-local. Never add a one-off global variant just to keep the pilot moving.

VALIDATION
Run component, route, accessibility, auth/security, analytics, responsive, visual, type, lint, build, and design-system checks appropriate to the surface. Compare all relevant Phase 02 scenarios. Test rollback by reverting the slice or toggling the approved adapter path in a non-production environment.

RETROSPECTIVE
Measure canonical coverage, raw-control reduction, legacy CSS reduction, PR size, regressions found, agent/reviewer time, and platform gaps. Update the repeatable Phase 14 runbook.

COMPLETION RESPONSE
Report slice completed, route/component changes, evidence, metrics, remaining pilot work, platform changes required, and whether the pilot exit gate is met. Update state.json and stop.`
  },
  {
    id: "phase-14",
    number: "14",
    title: "Repeatable product-surface migration waves",
    stage: "Adoption",
    mode: "Repeat per surface/slice",
    gate: "Surface parity",
    repeatable: true,
    summary: "Apply the proven migration factory to customer, courier, marketing, operations, and remaining surfaces in risk-ranked, reviewable slices.",
    why: [
      "Broad adoption is a sequence of controlled product migrations, not one repository-wide refactor.",
      "Each surface has different security, rendering, data, and interaction constraints.",
      "Metrics and adapters allow old and new architecture to coexist safely until completion."
    ],
    inputs: [
      "Approved current surface {{SURFACE}} and slice",
      "Pilot retrospective and migration factory",
      "Canonical component/shell availability and current metrics"
    ],
    artifacts: [
      "Per-surface plan and slice ledger",
      "Migrated routes/components",
      "Before/after evidence and test results",
      "Updated consumer and legacy-selector counts",
      "Surface completion report"
    ],
    exitGates: [
      "The authorized slice is fully migrated or safely rolled back.",
      "No unapproved canonical API fork or global styling exception is added.",
      "Remaining consumers and blockers are exact and machine-readable.",
      "A surface is called complete only when its defined coverage and legacy-removal gates are met."
    ],
    risks: [
      "Do not combine multiple high-risk surfaces in one pull request.",
      "Operations/utility requires finer slices than marketing or auth.",
      "Do not chase 100% abstraction; feature-local UI may remain intentionally local."
    ],
    prompt: `Execute Phase 14 only for approved surface {{SURFACE}} and the single slice recorded in {{DOCS_ROOT}}/state.json.

OBJECTIVE
Apply the proven migration factory to one bounded slice of {{SURFACE}}. Preserve product behavior, security, accessibility, responsive behavior, analytics, and approved visuals.

PRE-FLIGHT
1. Confirm pilot retrospective recommendations are reflected in the current runbook.
2. Confirm every required canonical family is production-ready; if not, stop and route the missing family through the appropriate Phase 08–12 prompt.
3. Confirm the slice has clear route/file boundaries, fixtures, baseline captures, tests, rollback, and no unresolved owner decision.

MIGRATION FACTORY
A. Re-scan the slice against current main; do not trust stale consumer counts.
B. Classify each UI path: canonical replacement, adapter, feature-local, composition, or defer.
C. Migrate imports and markup through public design-system APIs.
D. Move only now-owned styles from legacy global modules into canonical/feature ownership.
E. Preserve data and business logic in the feature.
F. Update exact selector/consumer counts and adapter/deprecation metadata.
G. Compare runtime evidence and run all affected checks.
H. Keep the PR bounded; split by route cluster or family when review becomes difficult.

SURFACE-SPECIFIC SAFETY
- Marketing: protect SEO, CMS-owned content, performance/LCP, animation, and responsive navigation.
- Authentication/estimate: protect redirects, form semantics, validation, URL state, payment, and sensitive-data boundaries.
- Customer/courier: protect role guards, emulation/read-only containment, navigation, and mobile workflows.
- Operations/utility: use the finest-grained slices; protect server-side capability gates, no-public-data guarantees, dense tables, dialogs, notification systems, and prepaint behavior.

NO BYPASSES
A missing design-system capability is not permission for a new global selector or raw shared control. Fix the reusable platform or keep the implementation explicitly feature-local.

VALIDATION
Use the surface's route/e2e/security tests plus component and visual baselines. Run audit metrics and prove no protected debt category increased. Produce an easy rollback commit boundary.

COMPLETION RESPONSE
Report slice scope, migrated/remaining consumers, CSS removed or reassigned, adapters, evidence, metrics delta, blockers, rollback, and next slice. Update state.json and stop.`
  },
  {
    id: "phase-15",
    number: "15",
    title: "Legacy retirement and compatibility deletion",
    stage: "Retirement",
    mode: "Repeat per retired family/surface",
    gate: "Zero-use proof",
    repeatable: true,
    summary: "Remove superseded components, selectors, facades, adapters, and compatibility aliases only after static, runtime, and test evidence proves they are no longer required.",
    why: [
      "A migration that never deletes legacy architecture leaves permanent dual systems.",
      "Deletion is safe only when ownership and consumer evidence agree.",
      "Smaller global CSS and fewer adapters are measurable program outcomes."
    ],
    inputs: [
      "Pending-deletion records from the state ledger",
      "Current census and consumer graph",
      "Completed surface migrations and runtime evidence"
    ],
    artifacts: [
      "Zero-use proof for the selected retirement set",
      "Deleted legacy code/styles/adapters",
      "Updated facades, manifests, baselines, and documentation",
      "Before/after bundle/CSS metrics",
      "Rollback reference"
    ],
    exitGates: [
      "Static imports, dynamic references, selectors, routes, fixtures, and runtime scenarios show zero required use.",
      "All tests and visual baselines pass without the legacy path.",
      "The compatibility baseline shrinks rather than being reset upward.",
      "Rollback is a clean revert and no generated output was hand-edited."
    ],
    risks: [
      "Dynamic class construction and rarely used protected routes can hide consumers.",
      "Do not delete historical evidence or migrations needed for rollback/audit.",
      "Do not combine unrelated retirement sets into one opaque deletion PR."
    ],
    prompt: `Execute Phase 15 only for the retirement set recorded in {{DOCS_ROOT}}/state.json for {{REPO}}.

OBJECTIVE
Remove one bounded set of superseded legacy components, selectors, adapters, facades, aliases, or files after proving zero required use. This is evidence-driven deletion, not cleanup by intuition.

ZERO-USE PROOF
For every candidate:
1. Query the current AST/import graph, className graph, CSS selector graph, route matrix, tests, fixtures, scripts, documentation references, generated references, and dynamic construction sites.
2. Search current source independently to validate the census.
3. Exercise runtime scenarios that previously consumed the path, including protected, role-specific, responsive, theme, error, and rarely used states.
4. Confirm the component manifest and migration ledger name a canonical replacement or an approved removal with no replacement.
5. Record confidence and any dynamic uncertainty. Any unresolved possible consumer blocks deletion.

DELETION RULES
- Delete only the approved bounded set.
- Remove facade imports in preserved order.
- Remove adapters only after their consumer count is zero.
- Shrink baseline/exception files; never regenerate them in a way that hides increased debt elsewhere.
- Update docs and Code Connect/Figma metadata only when the deleted path was explicitly represented.
- Do not remove generated or historical evidence outside repository retention policy.

VALIDATION
Run the full focused suite for affected surfaces, design-system audits, build, typecheck, lint, route tests, and visual comparisons. Check production bundle/CSS outputs for missing assets and measure byte/rule reduction. Confirm no unresolved imports or selectors remain.

ROLLBACK
Tag or record the parent commit and provide a clean revert plan. If removal changes behavior, restore first and investigate; do not update visual baselines to accept an unexplained regression.

COMPLETION RESPONSE
Provide candidate-by-candidate zero-use evidence, deletions, replacement paths, metrics reduction, tests, residual legacy debt, and next retirement set. Update state.json and stop.`
  },
  {
    id: "phase-16",
    number: "16",
    title: "Enforcement, governance, and steady-state design workflow",
    stage: "Institutionalize",
    mode: "One-time closeout, then continuous",
    gate: "New default path",
    summary: "Turn successful migration rules into blocking CI, ownership, release, Figma, Code Connect, contribution, and product-design workflows so the architecture remains scalable.",
    why: [
      "The codebase will regress unless the easy path is the canonical path.",
      "A design system is an operating model, not a completed folder.",
      "Design, engineering, and automation need one documented change lifecycle."
    ],
    inputs: [
      "Migration metrics and completed surface/family ledgers",
      "Warning-only rules from Phase 05",
      "Stable Figma/Code Connect and delivery workflows",
      "Known exceptions and remaining intentional feature-local UI"
    ],
    artifacts: [
      "Blocking design architecture CI at approved thresholds",
      "Contribution and component proposal workflow",
      "Ownership/CODEOWNERS and release/versioning policy",
      "Figma publish and Code Connect runbook",
      "Steady-state feature prompt/template",
      "Final migration report and remaining-debt register"
    ],
    exitGates: [
      "New debt categories are blocked with actionable remediation.",
      "The canonical contribution workflow is documented, tested, and linked from repository instructions.",
      "Every remaining exception has an owner and reason; there are no silent legacy systems.",
      "The migration ledger closes with measurable before/after results and ongoing health checks."
    ],
    risks: [
      "Do not enable blocking thresholds the repository cannot currently satisfy.",
      "Do not make Figma publication deploy production automatically without reviewed Git boundaries.",
      "Governance must be lightweight enough that teams do not bypass it."
    ],
    prompt: `Execute Phase 16 only: institutionalize the new Pckup design-system workflow in {{REPO}}.

OBJECTIVE
Make the migrated architecture the default, scalable way every future UI change is designed, implemented, connected, reviewed, released, and measured. Close the migration program without pretending intentional feature-local UI is debt.

ASSESS READINESS
1. Read current metrics, warning rules, exceptions, component manifest, Figma/Code Connect coverage, surface completion reports, adapters, and pending deletions.
2. For each warning rule, determine a blocking threshold current main satisfies. If a category still exceeds its approved closeout target, keep it warning-only and create a named follow-up rather than breaking all development.
3. Confirm remaining exceptions are exact, owned, dated, reviewed, and justified.

BLOCKING GUARDRAILS
Enable approved CI rules for new raw controls outside primitives, new visual inline styles, unowned global component selectors, forbidden deep imports, undocumented reusable components, component/manifest drift, generated-token drift, and Code Connect/manifest drift where deterministically testable. Integrate with existing CI classification and auto-merge policy.

STEADY-STATE CHANGE WORKFLOW
Document and template this lifecycle:
1. Classify the request as foundation, primitive, behavior, pattern, shell, surface, feature-local, or composition.
2. Search the code manifest, Figma library, and approved exceptions before creating.
3. Define anatomy, API, states, accessibility, responsive behavior, token impact, and migration/adoption plan.
4. Implement code, owned styles, tests, examples, Figma component, and Code Connect as one governed contract where applicable.
5. Publish Figma metadata and code mappings separately from production deployment; GitHub main remains deployed truth.
6. Migrate consumers in bounded slices and retire superseded paths with zero-use proof.
7. Update metrics and release notes.

GOVERNANCE
Define lightweight ownership and review: design-system maintainers, product owners, accessibility/security reviewers for relevant changes, CODEOWNERS boundaries, component proposal criteria, deprecation policy, semantic version/release notes if used, and emergency rollback. Avoid a committee for ordinary reuse.

FIGMA + GITHUB OPERATING MODEL
Document variables/tokens flow, library publishing, component review, Code Connect generation/publication, drift checks, webhook/automation boundaries, and conflict resolution. Figma publishing must not directly rewrite production component behavior. Git changes require the normal reviewed delivery lane.

DOCUMENTATION AND TRAINING
Update repository entrypoint instructions, PR template, component contribution guide, examples/reference surface, and copy-ready steady-state agent prompt. Include a short onboarding path and common anti-patterns.

CLOSEOUT
Produce a final report with before/after metrics: canonical coverage, raw controls, inline styles, global CSS bytes/selectors, largest UI files, adapters, legacy files, Figma coverage, Code Connect coverage, regression results, and remaining intentional debt. Mark the migration state closed only when the approved exit criteria pass.

VALIDATION
Plant and remove representative CI violations, run all policy/design-system checks, verify contribution links, test Figma/Code Connect validation without publishing destructive changes, and confirm normal feature PRs remain practical.

COMPLETION RESPONSE
Return enabled rules, workflow links, owners, remaining exceptions, final metrics, rollback, and ongoing health cadence. Close state.json and stop.`
  }
];
