window.PCKUP_PHASES = (window.PCKUP_PHASES || []).concat([
  {
    id: "phase-0",
    number: "00",
    group: "A · Program control",
    title: "Bootstrap the migration control plane",
    shortTitle: "Bootstrap & safety",
    kind: "One-time",
    duration: "1–2 sessions",
    summary:
      "Create a durable, resumable migration program around the existing repository before touching production UI, Figma, tokens, or component code.",
    outcome:
      "A frozen program charter, run ledger, evidence directory, branch/worktree strategy, approval gates, and explicit rules for what this migration may and may not change.",
    why:
      "The Pckup frontend is already a mature production system. Without a control plane, agents will treat it like a greenfield component-library exercise, overwrite useful infrastructure, and combine discovery, redesign, refactoring, and deployment into one unsafe change.",
    prerequisites: [
      "Read access to the current default branch of {{REPO}}.",
      "Ability to create an isolated branch and worktree.",
      "No uncommitted local changes in the primary checkout.",
      "The agent can read repository policy files before doing any work."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/README.md — program charter and navigation index.",
      "{{DOCS_ROOT}}/state.json — machine-readable phase ledger and exact baseline commit.",
      "{{DOCS_ROOT}}/decisions/000-program-guardrails.md — immutable migration rules.",
      "{{DOCS_ROOT}}/risk-register.md — initial production, accessibility, visual, and delivery risks.",
      "A named migration branch/worktree that is not the user's primary checkout."
    ],
    exitCriteria: [
      "The baseline commit SHA is recorded and reproducible.",
      "Every repository-specific instruction file has been read and listed.",
      "The migration is explicitly defined as incremental and reversible.",
      "No runtime, styling, token, Figma, or production behavior changed.",
      "The owner can resume the program from state.json in a new agent session."
    ],
    antiGoals: [
      "Do not invent a new token taxonomy.",
      "Do not move files, split CSS, rename components, or publish Figma changes.",
      "Do not claim the existing design system is unused without measuring imports and runtime usage.",
      "Do not create a giant implementation PR from this phase."
    ],
    prompt: String.raw`You are executing Phase 00 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

MISSION
Create the durable control plane for an incremental migration of an extremely mature production frontend into a scalable design-system architecture. This is not a greenfield rewrite, a visual redesign, or an instruction to replace the current token/Figma infrastructure. The repository already contains production behavior, tests, CI/CD, design tokens, Figma synchronization, accessibility decisions, and years of route-specific implementation. Your job in this phase is to make the migration safe, resumable, evidence-driven, and explicitly bounded before any implementation begins.

NON-NEGOTIABLE OPERATING RULES
1. Work from the latest default branch in a fresh, isolated worktree and a dedicated migration branch. Do not use or dirty the user's primary checkout.
2. Before planning, read every repository-level instruction and policy file that applies, including AGENTS.md, CLAUDE.md, AI_CONTEXT.md, README.md, workflow/policy documents, package scripts, and nested instruction files in directories you inspect.
3. Treat the current application as a production system whose behavior must remain stable unless a later phase explicitly authorizes a reviewed visual or behavioral change.
4. Use a strangler migration: introduce canonical replacements beside legacy code, migrate bounded consumers, prove parity, then delete only after zero-use evidence.
5. Preserve and reuse the existing token compiler, token JSON, Figma Variables, synchronization workflows, tests, deployment gates, and repo-specific automation unless evidence proves a replacement is required.
6. Never place credentials, personal access tokens, Figma tokens, service-account JSON, production data, or private environment values into committed artifacts.
7. Do not make runtime, CSS, token, Figma, or product-code mutations in this phase.
8. Do not proceed to Phase 01 automatically. Stop at the Phase 00 gate and present the artifacts for approval.

REQUIRED WORK
A. Establish the baseline
- Fetch the latest default branch and record the exact commit SHA, date, repository identity, package manager, framework versions, and current branch protection/deployment posture that can be verified from the repository.
- Record whether the working tree is clean and the exact isolated branch/worktree you created.
- Run only non-mutating discovery commands needed to understand the repo's own workflow and validation commands.

B. Read the repository's rules
- Build a table of every instruction/policy file read, its scope, and the constraints it imposes on this program.
- Identify required task-start commands, report formats, PR trailers, generated-artifact rules, test-selection rules, and protected paths.
- Where rules conflict, do not silently choose. Record the conflict and the safest interpretation.

C. Create the program charter
Create {{DOCS_ROOT}}/README.md containing:
- the problem statement: strong foundations/tokens but fragmented component and styling architecture;
- the target outcome: a canonical component platform between tokens and product pages;
- explicit in-scope surfaces: marketing, authentication, estimate/order flow, customer dashboard, courier application/workspace, and internal operations/utility surfaces;
- explicit out-of-scope items for the discovery program: business-logic rewrites, database migrations, API redesign, brand redesign, and replacing functioning CI/CD;
- source-of-truth principles: code owns API/behavior, Figma owns approved visual anatomy/states, token JSON plus Figma Variables own token values, Code Connect owns the mapping, GitHub main owns deployed state;
- the 17-phase sequence and which phases are repeatable;
- approval gates, rollback rules, and the rule that no deletion occurs without import/selector/runtime evidence.

D. Create a machine-readable state ledger
Create {{DOCS_ROOT}}/state.json with at least:
- schemaVersion;
- runId;
- repository and baselineCommit;
- currentPhase = 0;
- status = awaiting_owner_approval;
- workingBranch and worktreePath without exposing sensitive local details beyond what is necessary;
- completedSteps;
- artifacts map;
- decisions map;
- unresolvedQuestions;
- pendingValidations;
- nextPhase = 1;
- timestamps in ISO 8601.
The ledger must be deterministic, valid JSON, and usable by a later agent session.

E. Create guardrails and a risk register
Create {{DOCS_ROOT}}/decisions/000-program-guardrails.md and {{DOCS_ROOT}}/risk-register.md. Include:
- no big-bang rewrite;
- no blind conversion of every existing CSS pattern into a Figma component;
- no Code Connect mapping to components scheduled for retirement;
- no global enforcement rule before a viable canonical replacement exists;
- no visual-parity claim without screenshot or computed-style evidence;
- no CSS deletion based only on a text search;
- no token replacement without reconciling existing generator and Figma sync behavior;
- no restructuring of auth, data, permissions, or server behavior merely to make a component extraction easier;
- high-risk surfaces and rollback requirements.

F. Validate the control plane
- Validate JSON and Markdown artifacts using the repository's own tooling where applicable.
- Run the smallest non-mutating validation set required by repo policy.
- Show git status and a precise diff summary.
- Confirm that no application source, stylesheet, token source, workflow, Figma mapping, or generated artifact changed.

REQUIRED FINAL RESPONSE
Return a Phase 00 Summary with:
1. exact baseline SHA;
2. instruction/policy files read;
3. files created;
4. validations run and results;
5. unresolved questions requiring owner input;
6. explicit confirmation that runtime behavior is untouched;
7. the exact command or continuation prompt a future agent should use to resume from state.json.

STOP CONDITION
Stop after committing the Phase 00 documentation to the isolated branch. Do not open a production-impacting PR and do not begin Phase 01 until the owner approves the charter and guardrails.`
  },
  {
    id: "phase-1",
    number: "01",
    group: "A · Program control",
    title: "Freeze the visual and behavioral baseline",
    shortTitle: "Baseline snapshot",
    kind: "One-time",
    duration: "2–4 sessions",
    summary:
      "Map every user-facing surface and capture the pre-migration behavior, routes, viewports, themes, critical states, and validation status that later phases must preserve.",
    outcome:
      "A route/surface matrix, reproducible screenshot matrix, baseline test results, and an explicit parity contract for each product family.",
    why:
      "A migration cannot prove it preserved the application unless the current state is recorded before refactoring begins. Source code alone does not capture responsive behavior, focus states, auth gates, overlays, or CSS cascade effects.",
    prerequisites: [
      "Phase 00 approved and state.json present.",
      "A clean isolated migration worktree.",
      "Safe local or preview fixtures for authenticated surfaces.",
      "No production customer data used in screenshots."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/01-surface-map.json and .md.",
      "{{DOCS_ROOT}}/01-baseline-validation.md.",
      "{{DOCS_ROOT}}/baselines/manifest.json with screenshot/state identifiers.",
      "A coverage table for desktop, tablet, mobile, dark, light, loading, empty, error, and interactive states.",
      "A list of surfaces that cannot yet be safely captured and why."
    ],
    exitCriteria: [
      "Every public and authenticated route family has an owner and surface classification.",
      "Critical representative routes have reproducible baseline evidence.",
      "The current build/typecheck/test/design-system checks are recorded.",
      "No production behavior or source files changed.",
      "Later phases can cite an exact baseline artifact rather than relying on memory."
    ],
    antiGoals: [
      "Do not fix visual bugs discovered during capture.",
      "Do not normalize routes or shells yet.",
      "Do not capture real customer, courier, employee, or credential data.",
      "Do not treat a single desktop screenshot as full parity evidence."
    ],
    prompt: String.raw`You are executing Phase 01 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Load and obey {{DOCS_ROOT}}/state.json and every repository instruction file identified in Phase 00. Confirm that Phase 00 is approved, the baseline commit has not silently changed without being recorded, and you are working in the isolated migration worktree. If any precondition fails, stop and report it.

MISSION
Create a reproducible visual and behavioral baseline of the existing Pckup frontend before any component or styling migration. The application is a mature product with multiple independently evolved surfaces. This phase must document what exists, not improve it. The result becomes the parity contract used to judge every later migration wave.

HARD CONSTRAINTS
- No application source, CSS, tokens, Figma assets, runtime configuration, or product behavior may be changed.
- Do not use production personal data or credentials in screenshots or fixtures.
- Do not claim coverage for a state you did not render or otherwise verify.
- Prefer the repository's existing local fixtures, utility lab, demo modes, test helpers, and preview routes over inventing new test-only application code.
- If a surface requires credentials that are not safely available, mark it blocked and define the exact fixture seam needed later; never request or commit secrets.

REQUIRED WORK
A. Build the route and surface map
Inspect the complete current route tree and classify every design-relevant route into a product surface. At minimum evaluate:
- public marketing/home/solutions/industries/blog/legal;
- authentication and account continuation flows;
- estimate/order creation and payment flows;
- customer dashboard and company-management flows;
- courier marketing, application, and authenticated workspace;
- internal utility/operations surfaces including changelog, visitors, CMS, SEO, reports, contacts, messaging, activity, and MCP tooling;
- public payment/share/recovery and exceptional routes such as 404/error states.

Create {{DOCS_ROOT}}/01-surface-map.json with fields for route, routeFamily, surface, shell, authRequirement, primaryLayout, importedGlobalStyles, criticality, representativeState, fixtureMethod, screenshotCoverage, and notes. Create a human-readable companion .md file.

B. Define the baseline state matrix
For each surface family, identify the smallest representative route set that covers its unique design architecture. Define required states where applicable:
- desktop, tablet, and mobile widths;
- light and dark themes;
- default, hover, focus-visible, pressed, disabled, loading, empty, error, success, open/expanded, and validation states;
- authenticated, unauthenticated, locked, insufficient-permission, and emulated/preview states;
- reduced-motion behavior for motion-heavy surfaces.
Do not manufacture states the product does not currently support. Record missing states as design debt rather than silently inventing them.

C. Capture reproducible evidence
Use the repo's existing build and preview workflow. Record exact commands, fixture inputs, viewport dimensions, theme, route, and commit SHA for every capture. Store only appropriately sized, privacy-safe evidence according to repository policy. If the repository already has a report-media convention, use it rather than creating a parallel asset system.

The evidence manifest must allow a future agent to answer:
- Which screenshot proves the current mobile dashboard shell?
- Which capture proves the Utility rail in collapsed and expanded states?
- Which route shows the canonical field error treatment?
- Which artifact proves the current button typography and dimensions?
- Which surface has no safe baseline yet?

D. Record the validation baseline
Run the repository's current, policy-approved baseline commands without changing source. Include at least the applicable install integrity check, typecheck, lint/test selection, design-system/token checks, build, and existing end-to-end or smoke tests that can run safely in the environment. Do not conceal pre-existing failures. Classify each failure as pre-existing, environmental, flaky, or blocking, with evidence.

E. Define the parity contract
Create {{DOCS_ROOT}}/01-baseline-validation.md describing:
- what later zero-visual-change phases must preserve exactly;
- where small rendering variation is acceptable and why;
- which known defects are deliberately frozen until a later owner-approved redesign;
- which interactions require behavioral rather than pixel-only validation;
- the minimum evidence package required for each migration PR.

F. Update state
Update {{DOCS_ROOT}}/state.json atomically:
- mark Phase 01 complete only if the exit criteria are met;
- add artifact paths and hashes where practical;
- record blocked captures;
- set currentPhase and nextPhase;
- preserve all Phase 00 history.

REQUIRED FINAL RESPONSE
Return a Phase 01 Summary with:
1. route and surface counts;
2. representative route matrix;
3. evidence captured and blocked states;
4. baseline validation results, including failures;
5. parity rules later phases must follow;
6. exact files changed;
7. confirmation that no application behavior changed.

STOP CONDITION
Stop after committing the Phase 01 evidence and documentation. Do not fix discovered UI defects, split CSS, or begin the component census until the owner accepts the baseline coverage.`
  },
  {
    id: "phase-2",
    number: "02",
    group: "B · Evidence & decisions",
    title: "Generate the full design-architecture census",
    shortTitle: "Architecture census",
    kind: "One-time",
    duration: "3–6 sessions",
    summary:
      "Join React exports and usages, native controls, CSS selectors, inline styles, token references, route ownership, file sizes, and Figma assets into one machine-readable inventory.",
    outcome:
      "The first complete map of what visually reusable code actually exists, where it is used, what styles it owns, and whether it has a real Figma or Code Connect counterpart.",
    why:
      "The current canonical UI folder represents only a small fraction of the product. A trustworthy migration must inspect all route-local and global patterns rather than equating one directory with the design system.",
    prerequisites: [
      "Phases 00–01 approved.",
      "Baseline route and surface map is complete.",
      "AST-capable tooling may be added only as development tooling after policy review.",
      "Generated, vendored, archived, and data-only paths have explicit exclusion rules."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/census/components.json.",
      "{{DOCS_ROOT}}/census/styles.json.",
      "{{DOCS_ROOT}}/census/native-controls.json.",
      "{{DOCS_ROOT}}/census/component-style-join.json.",
      "{{DOCS_ROOT}}/02-census-report.md and reproducible scanner scripts/tests."
    ],
    exitCriteria: [
      "Every design-relevant TSX/JSX file and stylesheet is accounted for or explicitly excluded.",
      "The census links components to consumers, selectors, stylesheets, surfaces, and Figma/Code Connect status.",
      "Raw controls and visual inline styles have exact locations and counts.",
      "The scanner is deterministic and runs in CI or a documented local command.",
      "No production UI was refactored."
    ],
    antiGoals: [
      "Do not use regex as the only parser for TypeScript/JSX or CSS.",
      "Do not auto-label every function as a reusable component.",
      "Do not automatically move or rename files based on the census.",
      "Do not convert measurements into enforcement failures yet."
    ],
    prompt: String.raw`You are executing Phase 02 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Read {{DOCS_ROOT}}/state.json, the approved Phase 00 charter, Phase 01 surface map, and all applicable repository policies. Verify the exact baseline and current branch. This phase is discovery tooling plus documentation only. Do not refactor production UI.

MISSION
Generate a complete, deterministic design-architecture census across the entire mature frontend. The existing src/app/components/ui directory is only one source among many. Inspect route-local components, shared components, application shells, global and route-scoped stylesheets, native controls, inline styles, CSS variables, Figma metadata, and Code Connect files. The goal is to reveal the real component system currently embedded in the codebase.

ACCURACY RULES
1. Use TypeScript/JSX AST parsing for exports, imports, JSX elements, props, className expressions, and style props. Do not rely on regex alone.
2. Use a real CSS parser for selectors, declarations, media/container queries, keyframes, custom-property references, and source order. Regex may supplement but not replace parsing.
3. Exclude generated tokens, vendored assets, archived reports, generated data, and test fixtures only through an explicit, reviewed exclusion manifest.
4. Preserve dynamic evidence honestly. When a class name cannot be statically resolved, record the expression and mark it dynamic rather than guessing.
5. Separate semantic components from page compositions, providers, data adapters, and nonvisual helpers.
6. Do not decide the final taxonomy in this phase. Capture evidence and tentative signals only.

REQUIRED WORK
A. Build a reproducible scanner
Create repository-appropriate scripts under the existing scripts/tooling conventions. The scanner must produce stable sorted output and have tests for representative syntax. It must scan all design-relevant source paths and emit a schema version.

B. Component inventory
For every React component or relevant exported JSX-producing function, record at least:
- stable identifier;
- file path and export name;
- default/named export;
- client/server boundary;
- approximate lines/bytes;
- route or feature ownership;
- importers and usage count;
- direct child components;
- native interactive elements rendered;
- props/type interface where statically available;
- className values and unresolved class expressions;
- inline style keys;
- imported stylesheets or CSS modules;
- existing tests/examples;
- existing Figma node/key/description references;
- existing Code Connect mapping;
- preliminary signals for primitive, behavior, pattern, shell, composition, feature-local, or nonvisual.

C. Styling inventory
For every non-generated stylesheet and style-bearing module, record:
- path, bytes, lines, and importers;
- selector count and selector families/prefixes;
- declaration count;
- custom-property definitions and references;
- hardcoded colors, dimensions, typography, radii, shadows, z-indexes, motion values, and media-query breakpoints;
- keyframes and animation consumers;
- probable owning component(s) from className joins;
- selectors with no statically found consumer;
- selectors consumed by multiple unrelated surface families;
- source-order/cascade dependencies that make extraction risky.
Do not call a selector dead merely because static search finds no consumer; mark confidence and required runtime confirmation.

D. Native-control and inline-style inventory
Record exact locations and counts for raw button, anchor-as-control, input, textarea, select, checkbox/radio, dialog, details/summary, table, and interactive div/span patterns. Distinguish valid primitive implementations from feature-level bypasses. Record style prop usage by visual property versus legitimate dynamic geometry/data visualization.

E. Component-to-style join
Create {{DOCS_ROOT}}/census/component-style-join.json joining:
- component → consumers;
- component → native elements;
- component → class names;
- class names → selectors;
- selectors → stylesheet/source order;
- selectors → tokens and literals;
- component → product surfaces;
- component → Figma/Code Connect status.
Include confidence and unresolved edges.

F. Figma and Code Connect inventory
When a Figma library URL is supplied locally through {{FIGMA_URL}}, use approved authenticated tooling to list published components, component properties, variables/styles, and existing Code Connect maps. Never commit credentials or private URLs if repository policy treats them as sensitive. Join by exact node IDs, asset keys, descriptions, and code paths when available. Name matching alone is low confidence.

G. Reports and metrics
Create {{DOCS_ROOT}}/02-census-report.md with:
- total design-relevant components/files/stylesheets/selectors;
- components inside versus outside the current canonical UI folder;
- raw control counts by surface;
- inline visual-style counts by surface;
- largest UI and CSS files;
- selector ownership coverage;
- Figma coverage and Code Connect coverage;
- high-risk cascade hubs;
- unresolved evidence gaps;
- recommended inputs for Phase 03 clustering, without making irreversible decisions.

H. Validation and state
- Add focused tests for scanner determinism and parsing edge cases.
- Run repository-prescribed validation for tooling/documentation changes.
- Verify generated census output is stable across two consecutive runs.
- Update state.json without losing prior history.

REQUIRED FINAL RESPONSE
Return a Phase 02 Summary with concrete counts, largest risk areas, files created, validation results, and an explicit statement of what the census can and cannot prove.

STOP CONDITION
Stop after the deterministic census and report are committed. Do not move components, split stylesheets, publish Figma assets, or introduce CI failures based on the results.`
  },
  {
    id: "phase-3",
    number: "03",
    group: "B · Evidence & decisions",
    title: "Build the component equivalence graph",
    shortTitle: "Equivalence graph",
    kind: "One-time",
    duration: "3–6 sessions",
    summary:
      "Cluster visually and behaviorally related implementations into candidate canonical families, while preserving legitimate surface-specific differences and recording confidence.",
    outcome:
      "An evidence-backed graph showing which buttons, fields, dialogs, cards, tables, navigation controls, states, and shells should merge, wrap, stay local, or retire.",
    why:
      "Blindly importing every current pattern into Figma would formalize duplication. The equivalence graph identifies the smaller coherent system the organization should actually maintain.",
    prerequisites: [
      "Complete Phase 02 census and join graph.",
      "Representative visual baseline from Phase 01.",
      "Access to existing Figma metadata when available.",
      "No assumption that identical class names imply identical semantics."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/equivalence/families.json.",
      "{{DOCS_ROOT}}/equivalence/edges.json.",
      "{{DOCS_ROOT}}/03-equivalence-report.md.",
      "Per-family evidence sheets for high-value families.",
      "A proposed keep/merge/wrap/local/retire decision for every reusable candidate."
    ],
    exitCriteria: [
      "Every high-frequency reusable pattern belongs to a candidate family or has a documented reason not to.",
      "Each merge recommendation cites code, CSS, behavior, state, and visual evidence.",
      "Legitimate product-specific variations are separated from accidental duplication.",
      "No production component implementation changed.",
      "Owner decision forks are clearly surfaced for Phase 04."
    ],
    antiGoals: [
      "Do not cluster solely by file or class name.",
      "Do not force all cards, tables, or shells into one over-generalized component.",
      "Do not make Figma prototype components canonical merely because they exist.",
      "Do not delete or migrate code in this phase."
    ],
    prompt: String.raw`You are executing Phase 03 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Load the approved state ledger, Phase 01 visual baseline, and all Phase 02 census artifacts. Confirm the census was generated from the current recorded commit and is deterministic. This phase is analysis and decision preparation only.

MISSION
Build an evidence-backed component equivalence graph for the full Pckup frontend. Determine which existing implementations represent the same underlying UI contract, which are legitimate variants, which should remain feature-local, and which are duplicate or obsolete. The goal is to design a smaller coherent canonical system before anyone expands Figma or rewrites code.

CORE PRINCIPLE
Similarity is multidimensional. Cluster using all available evidence:
- semantic purpose and user task;
- accessibility role and keyboard behavior;
- prop/API shape;
- DOM anatomy;
- supported states;
- token and computed-style usage;
- responsive behavior;
- visual evidence across themes;
- surface ownership and reuse frequency;
- existing Figma component/property model;
- migration risk.
Name or selector similarity alone is insufficient.

REQUIRED WORK
A. Define the graph schema
Create schemas for family nodes and evidence edges. Every implementation node must have a stable link back to Phase 02 identifiers. Every proposed family must include:
- familyId and proposed name;
- layer candidate: primitive, behavior, pattern, shell, feature-local, composition, or retire;
- implementations;
- consumer surfaces;
- shared anatomy;
- divergent anatomy;
- shared states and missing states;
- behavior/accessibility differences;
- visual/token differences;
- Figma assets and mapping status;
- proposed decision: keep-as-canonical, merge, wrap-with-adapter, remain-local, split-family, or retire;
- confidence;
- evidence paths;
- unresolved owner decisions;
- recommended migration order.

B. Analyze the highest-value families first
At minimum inspect and cluster:
1. Buttons, link-buttons, icon buttons, close buttons, pills, segmented controls, menu toggles, and raw action controls.
2. Text inputs, textareas, selects, checkboxes, radios/option tiles, password/phone/address/file fields, search/filter inputs, and validation chrome.
3. Dialogs, confirmation dialogs, drawers, sheets, popovers, menus, disclosure panels, tooltips, and overlays.
4. Badges, status chips, notices, banners, error summaries, empty/error/loading/skeleton states, and progress indicators.
5. Cards, panels, metric cards, record cards, review blocks, route/quote summaries, and content sections.
6. Data tables, responsive record lists, filters, pagination, sorting controls, and table toolbars.
7. Navigation items, tabs, rails, sidebars, mobile docks, account menus, breadcrumbs, page headers, and action bars.
8. Shells for marketing, auth, estimate/flow, customer dashboard, courier workspace/application, and internal operations.

C. Separate accidental duplication from intentional context
For every candidate merge, explain whether differences come from:
- true semantic/API needs;
- theme/context tokens;
- density or viewport modes;
- permission/auth behavior;
- feature-specific data composition;
- historical copy/paste;
- global CSS leakage;
- unavailable primitive at time of implementation.
Do not solve a semantic difference with a giant variant matrix. Prefer composition and slots where appropriate.

D. Use visual and computed evidence
For representative family members, compare baseline screenshots and computed styles. When two controls look similar but behave differently, behavior wins. When two controls behave identically but differ only through surface tokens, propose one component with context-aware tokens rather than duplicated components. Record uncertainty rather than fabricating equivalence.

E. Produce machine and human artifacts
Create:
- {{DOCS_ROOT}}/equivalence/families.json;
- {{DOCS_ROOT}}/equivalence/edges.json;
- evidence sheets under {{DOCS_ROOT}}/equivalence/families/ for high-value families;
- {{DOCS_ROOT}}/03-equivalence-report.md.
The report must include a ranked consolidation opportunity table with estimated consumers, risk, expected legacy CSS reduction, and recommended wave.

F. Identify decision forks
Surface explicit choices such as:
- whether utility-specific controls become variants of core controls or an Operations layer;
- whether dashboard and courier shells converge on one configurable PortalShell;
- whether public navigation and authenticated mobile navigation share only primitives or a full component;
- whether Figma prototype sets reflect approved production contracts or should be rebuilt after code consolidation;
- whether current visual inconsistencies are frozen for parity or intentionally normalized in a later reviewed phase.
Do not resolve brand/product-taste questions silently.

G. Validation and state
- Validate that every reusable candidate from the census is assigned to a family, marked feature-local/composition/nonvisual, or explicitly unresolved.
- Validate graph references against the census.
- Update state.json with proposed decisions and owner forks.
- Do not modify production code or Figma.

REQUIRED FINAL RESPONSE
Return a Phase 03 Summary with:
1. number of candidate families and implementation nodes;
2. top consolidation opportunities;
3. high-risk false-equivalence cases avoided;
4. owner decision forks;
5. artifacts and validations;
6. confirmation that no UI was changed.

STOP CONDITION
Stop after committing the equivalence graph and report. Do not begin taxonomy approval or implementation until the owner reviews the proposed families.`
  },
  {
    id: "phase-4",
    number: "04",
    group: "B · Evidence & decisions",
    title: "Approve the taxonomy and authority model",
    shortTitle: "Taxonomy & truth",
    kind: "Approval gate",
    duration: "1–3 sessions",
    summary:
      "Turn the evidence into the target design-system model: layers, naming, ownership, component acceptance rules, Figma library boundaries, and migration waves.",
    outcome:
      "A signed-off architecture decision record that prevents future agents from creating another parallel component system.",
    why:
      "The codebase cannot be reorganized coherently until the organization agrees what is foundational, reusable, surface-specific, feature-local, compositional, or retired—and who owns each truth.",
    prerequisites: [
      "Owner-reviewed Phase 03 equivalence graph.",
      "Known constraints from existing token, CI/CD, Figma, and deployment systems.",
      "Decision makers available for product/brand forks.",
      "No implementation work mixed into the decision PR."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/decisions/004-target-taxonomy.md.",
      "{{DOCS_ROOT}}/target-component-catalog.json.",
      "{{DOCS_ROOT}}/migration-waves.json.",
      "{{DOCS_ROOT}}/04-approval-record.md.",
      "An explicit source-of-truth and Figma library dependency model."
    ],
    exitCriteria: [
      "Every candidate family has an approved disposition.",
      "Layer definitions and dependency rules are unambiguous.",
      "The target catalog has named owners and acceptance criteria.",
      "Figma and code authorities are explicit and non-circular.",
      "The owner signs off before structural work starts."
    ],
    antiGoals: [
      "Do not design APIs or variants by committee without evidence.",
      "Do not create a universal mega-component for unrelated contexts.",
      "Do not copy the current folder structure into the target taxonomy.",
      "Do not start refactoring until approval is recorded."
    ],
    prompt: String.raw`You are executing Phase 04 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Load state.json, the program charter, baseline, complete census, and owner-reviewed equivalence graph. List every unresolved decision fork before doing anything else. This is an architecture and approval phase, not an implementation phase.

MISSION
Convert the measured current state into an approved target design paradigm and design workflow for Pckup. Define what the canonical system is, how its layers depend on one another, which existing implementations survive, how Figma and code divide authority, and the migration waves that will move a mature production application without a big-bang rewrite.

TARGET PARADIGM TO EVALUATE
Use evidence to confirm or adjust this dependency direction:
Foundations → Primitives → Behavioral components → Product patterns → Shells → Feature composition → Routes.
Dependencies may flow only to the left/lower layer. Product and Operations layers may consume Core but must not redefine Core primitives. Feature-local components remain close to the feature until proven reusable. Route files compose; they do not become the shared component library.

REQUIRED WORK
A. Approve precise layer definitions
Define acceptance criteria and examples for:
1. Foundations — tokens, typography, icons, motion, breakpoints, elevation, accessibility standards.
2. Primitives — low-level reusable controls with typed APIs and native semantics.
3. Behavioral components — dialog, drawer, popover, disclosure, tabs, combobox, toast, tooltip, menu.
4. Patterns — card, page header, filter bar, metric card, record card, data table, navigation item, route/quote summary.
5. Shells — marketing, authentication, flow, portal, operations/workspace.
6. Feature-local composition — reusable only within one bounded domain.
7. Page/route composition — route-specific assembly and data wiring.
8. Retired/legacy — compatibility-only code with a deletion milestone.

For each layer, define what it may import, where it lives, when it earns a Figma component, when it earns Code Connect, test requirements, and who may approve changes.

B. Resolve every equivalence decision
For every candidate family in Phase 03, assign one approved disposition:
- canonical now;
- canonical after merge;
- adapter/wrapper during migration;
- remain feature-local;
- composition only;
- split into named families;
- retire after named consumers migrate;
- unresolved with a blocking owner decision.
No reusable candidate may disappear from the decision record.

C. Define the source-of-truth contract
Create an explicit non-circular authority matrix. At minimum:
- token values: reviewed token JSON and Figma Variables through the existing sync lane;
- component API, semantics, behavior, and data contracts: TypeScript code;
- approved visual anatomy, variant/state inventory, and design guidance: published Figma component;
- design-to-code identity: Code Connect;
- product page composition: feature code and product design files;
- deployed truth: GitHub main and verified production.
Define conflict resolution. Figma does not directly overwrite behavior. Code does not silently invent visual variants. Token changes do not bypass the reviewed pipeline.

D. Define the Figma library model
Decide whether the current file is reorganized into pages first or split into dependent libraries later. Establish logical layers such as:
- Pckup Foundations;
- Pckup Core;
- Pckup Product;
- Pckup Operations.
Define publishing permissions, component maturity statuses, deprecation behavior, branch/review practice, naming, descriptions, variable bindings, state requirements, and Code Connect prerequisites. Existing prototype-only sets must be explicitly marked as canonical, candidate, or archive; existence in Figma is not automatic approval.

E. Define the target catalog
Create {{DOCS_ROOT}}/target-component-catalog.json. For each approved component/pattern/shell include:
- stable id and name;
- layer and package/path target;
- purpose and non-goals;
- proposed API outline;
- states/variants;
- current implementations and consumers;
- Figma disposition;
- Code Connect disposition;
- migration wave;
- owner;
- required tests/examples;
- deprecation targets;
- status.

F. Define migration waves
Create {{DOCS_ROOT}}/migration-waves.json. The waves must minimize risk and unlock adoption, generally:
- structural control plane and CSS ownership;
- foundations reconciliation;
- primitive pilot;
- remaining primitives;
- behavioral components;
- patterns;
- shells;
- Figma and Code Connect completion;
- surface migrations;
- legacy deletion;
- enforcement.
Name high-risk surfaces and define rollback boundaries. No wave may require the whole application to migrate before it can ship.

G. Record the decision
Create {{DOCS_ROOT}}/decisions/004-target-taxonomy.md and {{DOCS_ROOT}}/04-approval-record.md. Include alternatives rejected and why. Mark questions that require the owner. Do not falsely mark approval; the owner must explicitly approve the final architecture.

H. Validation and state
- Validate every Phase 03 family has a disposition in the target catalog.
- Validate dependency rules are acyclic.
- Validate every migration wave has entry criteria, exit criteria, rollback, and evidence requirements.
- Update state.json to awaiting_owner_approval.
- Make no production or Figma mutations.

REQUIRED FINAL RESPONSE
Return a decision packet with:
1. proposed taxonomy;
2. source-of-truth table;
3. target catalog summary;
4. migration waves;
5. explicit owner decisions required;
6. files changed and validations;
7. a clear approval question.

STOP CONDITION
Stop after committing the decision packet. Do not start Phase 05 until the owner explicitly approves the taxonomy, authority model, and migration-wave plan.`
  }
]);
