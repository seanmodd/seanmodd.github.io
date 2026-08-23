window.PCKUP_PHASES = window.PCKUP_PHASES.concat([
  {
    id: "phase-0",
    number: "00",
    title: "Program charter, state ledger, and debt freeze",
    category: "Governance",
    mode: "No visual changes",
    duration: "1 PR",
    summary: "Create the migration control plane before changing components: scope, invariants, state, ownership, metrics, and warning-only debt guards.",
    goal: "Establish one durable migration program that every later agent can resume without reinterpreting the mission or repeating discovery.",
    why: "The current repository already has design-system work, token automation, Figma assets, and prior decisions. A new migration without a shared state ledger would become another disconnected initiative.",
    prerequisites: [
      "Current main is healthy and the existing design-token checks pass.",
      "AGENTS.md, AI_CONTEXT.md, prior design-system reconstruction docs, and current Figma architecture have been reviewed.",
      "No component or visual redesign work is included in this phase."
    ],
    tasks: [
      "Create the design-system v2 program charter and explicit non-goals.",
      "Create a machine-readable migration state ledger with stable IDs and resumable phase/wave status.",
      "Define core, surface, feature-local, composition, exception, and retired classifications.",
      "Record the current token, Figma, Code Connect, CSS, and component authorities without replacing them.",
      "Capture warning-only baseline metrics for raw controls, inline visual styles, global selectors, oversized UI files, and unregistered shared components.",
      "Add a human-readable dashboard/report generated from the machine baseline.",
      "Document decision forks that require owner approval and the evidence required for each decision."
    ],
    deliverables: [
      "docs/design-system-v2/00-program-charter.md",
      "docs/design-system-v2/01-invariants.md",
      "docs/design-system-v2/02-ownership-model.md",
      "docs/design-system-v2/state.json",
      "docs/design-system-v2/schemas/*.schema.json",
      "data/design-system-v2/debt-baseline.json",
      "scripts/design-system-v2/audit-debt.mjs",
      "A warning-only npm script and report, not a blocking gate"
    ],
    exitGate: [
      "The state file validates against its schema and can identify the current phase, completed phases, pending decisions, and migration waves.",
      "The baseline scan runs deterministically twice with byte-stable output.",
      "No production bundle, route output, styling, or Figma object changed.",
      "The charter explicitly forbids a big-bang rewrite and a second token taxonomy."
    ],
    stopConditions: [
      "Stop if the proposed charter conflicts with an active repository policy or already-approved architecture decision.",
      "Stop if baseline collection requires reading secret values or bypassing protected auth boundaries.",
      "Do not turn warnings into CI failures in this phase."
    ],
    handoff: "Phase 1 consumes the approved schema, state ledger, and warning-only baseline.",
    prompts: [
      {
        label: "Execute Phase 0",
        body: `Execute Phase 0 of the Pckup design-system v2 migration: PROGRAM CHARTER, STATE LEDGER, AND WARNING-ONLY DEBT FREEZE.

PHASE SCOPE
This phase creates the migration control plane only. Do not move, rename, restyle, consolidate, or replace production UI components. Do not mutate Figma. Do not change generated design tokens. Do not make warning scans block CI.

DISCOVERY
- Read every existing design-system artifact, especially docs/design-system-reconstruction/**, docs/DESIGN_SYSTEM_SYNC.md, docs/DESIGN_TOKEN_SYNC_CONTRACT.md, docs/INTERACTION_STANDARDS.md, figma.config.json, the token scripts, and the current Figma file contract.
- Inspect the existing task, review, merge, report, and transcript workflow. Reuse it.
- Confirm the actual current Figma file key, token source paths, generated token path, component directories, stylesheet inventory, Code Connect files, and prior known gaps.

IMPLEMENTATION
1. Create docs/design-system-v2/00-program-charter.md. State the mission, business reason, current diagnosis, target operating model, non-goals, program risks, migration boundaries, and success metrics.
2. Create docs/design-system-v2/01-invariants.md. Include brownfield preservation, no hidden visual drift, one canonical owner per shared component, bounded waves, adapters before deletion, Figma follows approved canon, and evidence requirements.
3. Create docs/design-system-v2/02-ownership-model.md. Define the authority for token values, TypeScript APIs, behavior, visual anatomy, Figma components, Code Connect, deployed state, page composition, and legacy compatibility.
4. Define stable classifications: core, surface, feature-local, page composition, approved exception, and retired duplicate. Include decision rules and examples from this repository.
5. Create JSON schemas under docs/design-system-v2/schemas/ for the migration state, census entries, canonical component manifest, equivalence graph, migration waves, and exceptions.
6. Create docs/design-system-v2/state.json with a stable run/program ID, phase state, completed artifacts, pending decisions, Figma file key, baseline commit, wave registry, and validation status. Do not store secrets or volatile local paths.
7. Create scripts/design-system-v2/audit-debt.mjs and a package.json script that reports, in warning-only mode:
   - native button, input, select, textarea, dialog, details, and other control creation outside approved low-level locations;
   - style={{...}} and other inline visual declarations;
   - global component-like CSS selectors and stylesheet ownership;
   - large design-relevant TSX and CSS files;
   - shared-looking components outside the approved canonical directories;
   - existing parser-based and parserless Code Connect files;
   - current design-system import usage.
8. Write data/design-system-v2/debt-baseline.json from the scan. The output must be sorted and deterministic. Include totals by surface and path, not only a repository-wide count.
9. Generate a concise docs/design-system-v2/03-baseline-report.md from the machine artifact. Clearly separate facts from recommendations.
10. Add tests for schema validation and deterministic baseline generation.

QUALITY RULES
- Reuse installed dependencies where practical. Do not introduce a large framework for scanning.
- Do not parse TypeScript with fragile regex when the installed TypeScript compiler API can supply reliable syntax structure.
- A CSS scan may begin conservatively, but every reported selector must include source path and line information.
- Preserve the existing package script behavior and generated-artifact policy.

EXIT EVIDENCE
Show the exact baseline commit, every created artifact, scan totals, deterministic rerun proof, tests run, and confirmation that production behavior and Figma were untouched. Update the migration state to mark Phase 0 complete only after merge and deployment health are verified.`
      }
    ]
  },

  {
    id: "phase-1",
    number: "01",
    title: "Repository-wide design architecture census",
    category: "Discovery",
    mode: "Read-heavy analysis",
    duration: "1 PR",
    summary: "Inventory every design-relevant component, native control, selector, style source, state, consumer, route, and Figma relationship across the entire application.",
    goal: "Produce a complete machine-readable join between code, CSS, routes, surfaces, and the existing Figma system, rather than auditing only src/app/components/ui.",
    why: "Canonical components cannot be designed safely until the repository's real visual vocabulary and duplication are known.",
    prerequisites: [
      "Phase 0 is merged and its schemas/state ledger are authoritative.",
      "The warning baseline can run deterministically.",
      "The agent has read access to the entire repository and Figma MCP read tools when available."
    ],
    tasks: [
      "Walk the complete frontend tree, including route-local and utility-admin components.",
      "Extract component exports, props, JSX structure, native controls, class names, styles, imports, consumers, states, and route ownership.",
      "Join CSS selectors to actual JSX consumers and identify orphan, shared, and ambiguous ownership.",
      "Record all design-system imports and bypasses.",
      "Inventory the existing Figma component graph, variables, styles, published status, instance counts, and Code Connect state read-only.",
      "Generate surface, family-candidate, and risk summaries without yet deciding canonical abstractions."
    ],
    deliverables: [
      "data/design-system-v2/census/components.json",
      "data/design-system-v2/census/selectors.json",
      "data/design-system-v2/census/native-controls.json",
      "data/design-system-v2/census/routes-and-surfaces.json",
      "data/design-system-v2/census/figma-assets.json",
      "data/design-system-v2/census/code-connect.json",
      "data/design-system-v2/census/join.json",
      "docs/design-system-v2/10-census-report.md"
    ],
    exitGate: [
      "Every design-relevant TSX/JSX and CSS file is accounted for or explicitly excluded with a reason.",
      "Every selector has zero, one, or multiple consumers recorded and ambiguous ownership is surfaced.",
      "Every exported reusable-looking component has usage counts and route/surface consumers.",
      "The report clearly distinguishes observed facts from later taxonomy decisions.",
      "No production or Figma mutation occurred."
    ],
    stopConditions: [
      "Stop if the scan silently omits route groups, dynamic routes, or generated files without an exclusion record.",
      "Stop if component identity is inferred only from filenames rather than exports and usage.",
      "Do not label a pattern canonical, duplicate, or dead in this phase."
    ],
    handoff: "Phase 2 consumes the census to capture the visual truth of representative routes and states.",
    prompts: [
      {
        label: "Execute Phase 1",
        body: `Execute Phase 1 of the Pckup design-system v2 migration: REPOSITORY-WIDE DESIGN ARCHITECTURE CENSUS.

PHASE SCOPE
This is comprehensive discovery. Do not consolidate components, move CSS, change imports, restyle screens, or mutate Figma. Extend the Phase 0 scanner and schemas rather than creating a disconnected audit.

COVERAGE REQUIREMENT
Audit the complete design-relevant frontend, not only src/app/components/ui. Include at minimum:
- src/app/(marketing)/**
- src/app/(auth)/**
- src/app/estimate/** and order/payment flows
- src/app/dashboard/**
- src/app/courier/** and src/app/couriers/**
- src/app/(utility)/**, including admin subfeatures and route-local components
- src/app/components/** and every nested component directory
- src/app/globals.css and every stylesheet under src/app/styles/**
- existing src/design-system/** if Phase 0 or prior work created it
- figma/**, figma.config.json, design-token contracts, and Figma MCP read results

MACHINE CENSUS
Produce sorted, schema-validated artifacts under data/design-system-v2/census/ with stable IDs. Each component record must include, where applicable:
- source path, export name, default/named export, client/server boundary, approximate LOC and complexity indicators;
- props and variant-like unions, native elements created, child components, class names, inline styles, event and state indicators;
- importers, rendered usage count, routes, route groups, product surface, and whether usage is direct or through a wrapper;
- stylesheet selectors it owns or consumes, token namespaces used, hardcoded visual values, media queries, and interaction states;
- tests, stories/reference pages, screenshots, accessibility semantics, and existing Figma/Code Connect references;
- confidence and unresolved ambiguity.

Each selector record must include:
- stylesheet, selector text, line range, media/container context, declarations summary, pseudo states, and token/hardcoded values;
- exact JSX/class consumers where statically provable;
- zero-consumer, one-owner, multi-owner, dynamic, or ambiguous status;
- candidate visual role only as a non-binding hint.

Each native-control record must include the creating component, route consumers, whether it is inside a low-level primitive, its styling mechanism, and the closest existing shared component if one is known.

FIGMA READ-ONLY INVENTORY
Using the existing Figma file X7WZQGMUPIuzeaNoA7zTrF and available Figma tools, record:
- pages, collections, modes, variables, styles, components and component sets;
- properties, variants, child dependencies, published status, asset keys, instance counts, descriptions, and existing code references;
- Code Connect mappings and unmapped published components;
- assets that appear to be prototypes, canonical library components, helpers, or documentation, without changing them.
If Figma access is unavailable, record the blocker honestly and use the reviewed repository contracts as partial evidence. Do not invent live state.

JOIN AND REPORT
Create data/design-system-v2/census/join.json that connects code exports, selector families, routes/surfaces, Figma assets, and Code Connect records. Generate docs/design-system-v2/10-census-report.md with:
- totals by surface and file class;
- the largest design-relevant files;
- highest-use shared components;
- raw-control concentration;
- global selector concentration and multi-owner selectors;
- Figma coverage and Code Connect coverage;
- ambiguous or unresolvable cases requiring visual evidence.

VALIDATION
- Add tests that prove all in-scope files are either represented or excluded with a reason.
- Rerun the census twice and prove deterministic output.
- Compare totals against the Phase 0 baseline and explain every delta.
- Update docs/design-system-v2/state.json only after artifacts validate.

EXIT RESPONSE
Report exact coverage counts, exclusions, ambiguity counts, Figma read status, generated files, tests, and confirmation that no design decision or mutation was made.`
      }
    ]
  },

  {
    id: "phase-2",
    number: "02",
    title: "Visual baseline and product surface map",
    category: "Evidence",
    mode: "Screenshots + states",
    duration: "1-2 PRs",
    summary: "Capture the actual rendered interface across representative routes, themes, breakpoints, auth states, and UI states so later structural work has a trustworthy visual contract.",
    goal: "Turn the current production rendering into a reviewable baseline connected to census records and migration families.",
    why: "Static code analysis cannot prove that similarly named components look the same, that differently named components are duplicates, or that CSS movement preserved the cascade.",
    prerequisites: [
      "Phase 1 census is merged and every route/surface has a stable identifier.",
      "Existing safe fixtures, Utility UI Lab routes, and test accounts/fixtures are understood without exposing secrets.",
      "Screenshot storage and report-size conventions have been reviewed."
    ],
    tasks: [
      "Build a route and state coverage matrix from the census.",
      "Capture deterministic desktop and mobile screenshots for every major surface.",
      "Capture light/dark and important loading, empty, error, disabled, focus, open, and responsive states where supported.",
      "Use existing lab/fixture routes or create safe visual harnesses that reuse production components.",
      "Record viewport, theme, fixture, route, component IDs, and commit SHA with every capture.",
      "Generate a browsable baseline report and machine manifest."
    ],
    deliverables: [
      "data/design-system-v2/visual/route-matrix.json",
      "data/design-system-v2/visual/captures.json",
      "reports/design-system-v2-visual-baseline/**",
      "docs/design-system-v2/20-visual-baseline.md",
      "Reusable deterministic visual-capture runner"
    ],
    exitGate: [
      "Marketing, auth, estimate, dashboard, courier, and utility surfaces each have representative desktop/mobile coverage.",
      "Critical component states are captured or explicitly marked unavailable with a reason.",
      "Captures are reproducible from a documented command and linked to census IDs.",
      "No intended visual change occurred."
    ],
    stopConditions: [
      "Stop if screenshot fixtures require production customer data, secret values, or bypassing access controls.",
      "Stop if dynamic timestamps, animations, random data, or network races make comparison non-deterministic without normalization.",
      "Do not approve component equivalence from screenshots alone."
    ],
    handoff: "Phase 3 joins static census evidence with rendered evidence to decide canonical families.",
    prompts: [
      {
        label: "Execute Phase 2",
        body: `Execute Phase 2 of the Pckup design-system v2 migration: VISUAL BASELINE AND PRODUCT SURFACE MAP.

PHASE SCOPE
Create deterministic evidence of the current rendered product. Do not redesign, consolidate, move selectors, or mutate Figma. Small harness-only changes are allowed only when they render existing production components without changing their implementation.

BUILD THE COVERAGE MATRIX
1. Read data/design-system-v2/census/routes-and-surfaces.json and join.json.
2. Create data/design-system-v2/visual/route-matrix.json with stable scenario IDs for:
   - public marketing/home and representative content pages;
   - customer and courier authentication flows;
   - estimate/order flow steps and payment/confirmation states;
   - customer dashboard shell and representative data/detail/form pages;
   - courier application and courier workspace pages;
   - internal utility shell plus changelog, visitors, CMS, SEO, reports, contacts, messaging, activity, and MCP surfaces.
3. For each scenario, record route, fixture source, auth state, capabilities, viewport, theme, state, expected landmarks, census component IDs, and whether it is safe for automation.

DETERMINISTIC CAPTURE
- Reuse the existing E2E, mock gateway, Utility UI Lab, public lab, and fixture architecture. Do not invent a second test application.
- Create or extend a visual capture runner that records exact commit SHA, viewport, device scale, theme, route, fixture, and scenario ID.
- Normalize or freeze clocks, generated dates, random identifiers, animation, transitions, loading races, and external media only through existing test seams or explicit test-only adapters.
- Never use production personal data. Never print credentials.
- Capture representative desktop and mobile widths. Capture light and dark modes where the surface supports both.
- Capture focus-visible, disabled, loading, empty, error, selected/current, expanded/open, and modal/drawer states for high-value shared families where deterministic harnessing exists.

REPORT
Publish a browsable run report under reports/design-system-v2-visual-baseline/ with:
- navigation by surface and scenario;
- side-by-side desktop/mobile and light/dark where available;
- metadata and direct links to census records;
- a missing-coverage table with reasons;
- a warning that this is current-state evidence, not automatic design approval.
Create data/design-system-v2/visual/captures.json as the machine source of truth.

VALIDATION
- Run the capture twice against the same commit and compare output after approved dynamic-region normalization.
- Add smoke assertions for key landmarks so a blank or redirected page cannot be accepted as a screenshot.
- Confirm that authenticated scenarios enforce the same server/client boundaries as production.
- Update the migration state and report exact scenario coverage by surface.

EXIT RESPONSE
State the total scenarios, captured states, missing states, deterministic comparison result, fixture sources, commands, artifacts, and proof that no intended visual change or Figma mutation occurred.`
      }
    ]
  },

  {
    id: "phase-3",
    number: "03",
    title: "Component equivalence graph and canonical catalog",
    category: "Design decisions",
    mode: "No production refactor",
    duration: "1 PR + owner review",
    summary: "Cluster the existing implementations into candidate families, decide what should be core versus scoped, and record what will be merged, wrapped, kept local, or retired.",
    goal: "Create the approved component taxonomy that prevents the migration from copying every rogue implementation into Figma or a new folder.",
    why: "The biggest design-system mistake would be formalizing the current duplication instead of resolving it.",
    prerequisites: [
      "The full code/CSS/Figma census and visual baseline are merged.",
      "Every proposed family can cite concrete code, selector, consumer, and screenshot evidence.",
      "The owner is available for genuine taste or product-scope decisions."
    ],
    tasks: [
      "Build a graph connecting near-duplicate components and CSS patterns by role, anatomy, state, behavior, and consumers.",
      "Classify every reusable-looking pattern.",
      "Define canonical families, proposed API/state models, dependency tier, and migration priority.",
      "Record merge, extend, wrap, localize, defer, and retire decisions with evidence.",
      "Identify decisions that cannot be made from engineering evidence alone.",
      "Create the canonical component catalog and ordered wave plan, without implementing components."
    ],
    deliverables: [
      "data/design-system-v2/equivalence/graph.json",
      "data/design-system-v2/equivalence/decisions.json",
      "data/design-system-v2/catalog/components.json",
      "data/design-system-v2/catalog/exceptions.json",
      "data/design-system-v2/migration/waves.json",
      "docs/design-system-v2/30-equivalence-and-taxonomy.md",
      "Owner decision register"
    ],
    exitGate: [
      "Every reusable-looking census item is classified or explicitly unresolved.",
      "Every canonical family lists existing implementations, target tier, proposed owner, states, and migration priority.",
      "No family is approved only because names look similar.",
      "Owner-dependent decisions are resolved or block only the affected family, not hidden.",
      "No production or Figma mutation occurred."
    ],
    stopConditions: [
      "Stop a family decision if behavior or accessibility differs materially and the proposed abstraction would erase it.",
      "Stop if the taxonomy introduces generic components with no real consumers.",
      "Do not create a Figma component for an unresolved or retire-bound pattern."
    ],
    handoff: "Phase 4 turns the approved catalog into enforceable target architecture and migration infrastructure.",
    prompts: [
      {
        label: "Execute Phase 3",
        body: `Execute Phase 3 of the Pckup design-system v2 migration: COMPONENT EQUIVALENCE GRAPH AND CANONICAL CATALOG.

PHASE SCOPE
This phase makes architecture and product-design classification decisions from the merged census and visual baseline. Do not implement or move production components. Do not split CSS. Do not mutate Figma. The result must be detailed enough that later agents do not re-decide the taxonomy.

BUILD THE EQUIVALENCE GRAPH
Use data/design-system-v2/census/** and data/design-system-v2/visual/** as source evidence. Create a graph where nodes are code exports, route-local patterns, CSS selector families, Figma assets, and page compositions. Create evidence-weighted edges for:
- same role or user intent;
- similar anatomy and layout;
- overlapping props or states;
- shared CSS selectors or tokens;
- duplicated behavior/accessibility;
- wrapper/dependency relationships;
- visually similar but behaviorally different cases;
- Figma/code relationships.
Every edge must cite source IDs. Include confidence and contrary evidence.

CLASSIFY EVERYTHING REUSABLE-LOOKING
Assign one status to each candidate:
- CORE: reusable across multiple product surfaces;
- SURFACE: shared inside Marketing, Product, or Operations but not globally;
- FEATURE_LOCAL: intentionally owned by one feature;
- PAGE_COMPOSITION: a composition of components, not a reusable component API;
- APPROVED_EXCEPTION: a low-level or one-off pattern that is allowed with a documented reason;
- RETIRED_DUPLICATE: migrate to another family and delete.
Unresolved items must remain UNRESOLVED with the exact missing decision.

CANONICAL CATALOG
Create data/design-system-v2/catalog/components.json. For each proposed canonical family include:
- stable component ID and target name;
- tier: foundation, primitive, compound, pattern, shell, or feature-local;
- target code owner/path and dependency rules;
- existing implementations, selectors, routes, Figma nodes, and Code Connect state;
- proposed TypeScript API and variant/state model at a contract level;
- behavior and accessibility requirements;
- token dependencies and whether new component tokens are justified;
- Figma treatment: canonical component, scoped component, composition, or no Figma asset;
- migration strategy: re-export, adapter, codemod, consumer-by-consumer, or retirement;
- priority, risk, wave ID, and acceptance evidence.
Do not create speculative primitives without at least two real consumers unless the component is a necessary low-level accessibility foundation.

REQUIRED FAMILY REVIEWS
At minimum, explicitly analyze:
- Button, link-button, icon-button, pill/action, menu and toggle controls;
- field chrome, text input, textarea, select, checkbox, radio/option tile, combobox, phone, address, password, upload;
- badge/status, notice/banner, spinner/skeleton, empty/error/loading states;
- ConfirmDialog, UtilityDialog, modal, drawer, popover, disclosure, tabs, tooltip and toast patterns;
- generic card/panel, metric card, record card, page header, filter bar, data table and responsive row cards;
- navigation items, mobile tray, public rail, dashboard/courier sidebars, utility rail;
- Stepper, review block, route summary and quote summary;
- DashboardShell versus CourierWorkspaceShell;
- UtilityShell and route-local utility patterns;
- auth, marketing, flow, portal and operations shells.

DECISION REGISTER
Create a human-readable decision register. Separate engineering facts from owner-taste decisions such as typography, radius, visual density, button treatment, and whether two visually different surface systems should converge. Present each owner fork with screenshots, consumers, blast radius, and a recommended default. Do not silently choose.

WAVES
Create data/design-system-v2/migration/waves.json ordered by dependency:
1. architecture and legacy CSS ownership;
2. foundations reconciliation;
3. primitives;
4. behavioral compounds;
5. data/product patterns;
6. shells and large compositions;
7. Figma/Code Connect normalization;
8. enforcement and deletion.
Each wave must be small enough for an independent PR, list prerequisites, consumers, expected files, tests, screenshots, rollback, and exit gate.

VALIDATION
- Prove every in-scope census component is represented in the decisions artifact.
- Prove every canonical catalog entry has at least one source implementation and a migration wave.
- Prove every retired duplicate points to a canonical replacement.
- Update state.json with unresolved decisions and approved decisions.

EXIT RESPONSE
Summarize family counts by classification, highest-value consolidations, unresolved owner forks, wave count, generated artifacts, validations, and confirmation that production and Figma were untouched.`
      }
    ]
  },

  {
    id: "phase-4",
    number: "04",
    title: "Target architecture and migration infrastructure",
    category: "Architecture",
    mode: "Scaffolding only",
    duration: "1 PR",
    summary: "Create the scalable code boundaries, manifests, import rules, style ownership model, compatibility strategy, and non-blocking guardrails that later component waves will use.",
    goal: "Make the approved taxonomy executable without moving the whole application or introducing a second design system.",
    why: "A folder named design-system is not architecture. The repository needs dependency rules, ownership, manifests, adapters, style boundaries, and a paved contribution path.",
    prerequisites: [
      "Phase 3 canonical catalog and wave plan are approved.",
      "Unresolved family decisions are recorded and do not affect the initial scaffolding.",
      "The existing token pipeline and app build are healthy."
    ],
    tasks: [
      "Define and document the target source tree and dependency direction.",
      "Create the canonical component manifest and generated indexes without moving current components yet.",
      "Establish colocated CSS Modules or the approved owned-style mechanism for new canonical components.",
      "Define legacy adapters, re-export policy, import aliases, and deprecation metadata.",
      "Add warning-only architecture audits for forbidden dependencies and new unregistered shared components.",
      "Create a local component lab/reference route that renders canonical components as they arrive, reusing existing infrastructure where possible.",
      "Document the future component contribution workflow."
    ],
    deliverables: [
      "docs/design-system-v2/40-target-architecture.md",
      "docs/design-system-v2/41-contribution-workflow.md",
      "src/design-system/** scaffolding",
      "src/design-system/manifest.ts or generated equivalent",
      "scripts/design-system-v2/validate-architecture.mjs",
      "Compatibility/deprecation utilities",
      "A non-production or protected canonical component lab"
    ],
    exitGate: [
      "The empty/minimal architecture compiles without changing production rendering.",
      "Dependency and registration audits detect planted violations in tests but remain warning-only for legacy debt.",
      "The manifest is generated or validated deterministically from reviewed metadata.",
      "No existing component is moved solely to make the directory look complete.",
      "The component lab is access-safe and does not duplicate the existing design-system reference unnecessarily."
    ],
    stopConditions: [
      "Stop if the architecture requires a new CSS framework or token system without an approved decision.",
      "Stop if import rules would force a big-bang migration.",
      "Do not add placeholder components that have no approved catalog entry."
    ],
    handoff: "Phase 5 uses the ownership model to split legacy CSS mechanically before component extraction.",
    prompts: [
      {
        label: "Execute Phase 4",
        body: `Execute Phase 4 of the Pckup design-system v2 migration: TARGET ARCHITECTURE AND MIGRATION INFRASTRUCTURE.

PHASE SCOPE
Implement the approved architecture scaffolding from Phase 3 without moving or redesigning the existing application. Production output must remain unchanged. Do not create fake placeholder components. Do not migrate call sites yet except where a zero-behavior re-export is required to prove the architecture.

TARGET ARCHITECTURE
Read the approved canonical catalog and architecture decisions. Create a structure aligned with the repository, using this conceptual dependency direction unless the approved decision record says otherwise:
- foundations: token accessors/types, typography helpers, icons, motion and accessibility constants;
- primitives: Button, IconButton, fields, selection controls, Badge, Spinner and similar low-level UI;
- components: Dialog, Drawer, Popover, Disclosure, Combobox, FileUpload, Toast and other behavioral compounds;
- patterns: PageHeader, FilterBar, MetricCard, RecordCard, DataTable, NavigationItem, RouteSummary and similar product patterns;
- shells: MarketingShell, AuthShell, FlowShell, PortalShell and OperationsShell;
- feature-local UI remains with its feature and consumes the system downward.
Prefer a top-level src/design-system location so reusable UI is not confused with Next.js route ownership. Document any deviation.

IMPLEMENTATION
1. Create docs/design-system-v2/40-target-architecture.md with the source tree, dependency graph, ownership, public API, styling strategy, testing strategy, Figma relationship, Code Connect location, deprecation policy, and migration sequence.
2. Create docs/design-system-v2/41-contribution-workflow.md describing the permanent proposal to API to code to Figma to Code Connect to release loop.
3. Add minimal src/design-system scaffolding with README files or typed metadata, not dummy visual components.
4. Implement a schema-backed canonical component manifest. It must track component ID, code export, tier, owner, status, supported surfaces, Figma node/key, Code Connect path, tests, examples, accessibility contract, deprecation aliases, and migration coverage.
5. Create deterministic manifest validation and generated barrel indexes only where they improve correctness. Avoid a single unrestricted barrel that causes client/server boundary leakage or bundle growth.
6. Define the styling rule for new canonical components. Prefer colocated, owned styles such as CSS Modules while retaining existing generated CSS variables. Document cascade/layer strategy, theming, focus, motion, and escape hatches.
7. Create compatibility helpers for deprecated exports and class bridges. A compatibility path must emit development warnings or metadata without changing production behavior.
8. Add scripts/design-system-v2/validate-architecture.mjs that can detect:
   - upward or sideways forbidden dependencies;
   - new shared components outside approved locations;
   - manifest entries pointing to missing exports/tests/Figma metadata;
   - new global component selectors outside approved legacy files;
   - direct legacy imports from newly migrated code.
Legacy findings remain warning-only. New violations after the baseline should fail in tests or comparison mode.
9. Reuse or extend the existing authenticated design-system reference and Utility UI Lab rather than creating a disconnected Storybook by default. Add a canonical v2 component lab only if it shares production components, tokens, and routing safely.
10. Add architecture tests, a sample non-visual manifest fixture, and documentation for adding the first real primitive in Phase 7.

NON-GOALS
- No Tailwind or another styling framework migration.
- No rewrite of Next.js route structure.
- No visual redesign.
- No mass import rewrite.
- No Figma mutation.
- No blocking legacy debt gate yet.

VALIDATION
Prove build, typecheck, lint, test, design-system check, manifest validation, planted dependency violation detection, and byte/visual neutrality of production routes. Update state.json and the wave registry.

EXIT RESPONSE
Show the final dependency graph, created scaffolding, manifest schema/example, audits, tests, and proof that production rendering is unchanged.`
      }
    ]
  }
]);
