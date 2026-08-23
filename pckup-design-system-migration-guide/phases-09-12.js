window.PCKUP_PHASES = window.PCKUP_PHASES.concat([
  {
    id: "phase-9",
    number: "09",
    title: "Reusable product, data, and navigation patterns",
    category: "Pattern migration",
    mode: "Pattern-by-pattern",
    duration: "3-6 PRs",
    summary: "Turn repeated cards, tables, page headers, filters, navigation items, flow summaries, and state compositions into governed patterns built from canonical components.",
    goal: "Move reuse above the primitive level without creating a universal component for every visual resemblance or pulling product logic into the design system.",
    why: "Most route duplication lives in the middle: the same page-header, card, filter, record, table, navigation, and summary ideas are repeatedly authored with different markup and selectors.",
    prerequisites: [
      "Required Phase 7 primitives and Phase 8 compounds are stable.",
      "Each selected pattern has an approved equivalence decision and multiple real consumers.",
      "The selected pattern's business logic and data ownership are separable from presentation."
    ],
    tasks: [
      "Wave 9A: Card/Panel foundations and approved MetricCard, RecordCard, ContentCard, ReviewBlock, and state compositions.",
      "Wave 9B: DataTable, responsive record representations, list controls, pagination, filters, and toolbar patterns.",
      "Wave 9C: PageHeader, SectionHeader, NoticeSection, navigation items, breadcrumbs, tabs, and action groups.",
      "Wave 9D: Stepper, FlowStepShell internals, RouteSummary, QuoteSummary, and approved order/courier patterns.",
      "Keep data fetching, authorization, route registries, copy, and business status mapping in feature layers.",
      "Migrate bounded consumers and update Figma/Code Connect only after each pattern API stabilizes."
    ],
    deliverables: [
      "Canonical pattern implementations and owned styles",
      "Feature adapters for business-specific data and copy",
      "Responsive pattern contracts",
      "Pattern lab fixtures and visual matrices",
      "Figma Product/Operations components or documented compositions",
      "Parserless Code Connect templates for eligible canonical patterns",
      "Adoption and legacy-consumer reports"
    ],
    exitGate: [
      "Every completed pattern has at least two justified consumers or a documented structural role in a shell.",
      "Responsive transformations preserve semantics and do not duplicate product data logic.",
      "Feature code owns business rules; the pattern owns presentation and interaction only.",
      "Figma represents the approved pattern or composition rather than every route-specific arrangement.",
      "Legacy selectors and wrappers are removed only at zero usage."
    ],
    stopConditions: [
      "Stop if a proposed pattern requires arbitrary render callbacks, style props, or dozens of optional regions to cover unrelated use cases.",
      "Stop if table or navigation abstraction would own authorization, fetching, or route policy.",
      "Do not force Marketing, Product, and Operations patterns to converge when evidence supports scoped systems."
    ],
    handoff: "Phase 10 converges the application shells and migrates complete surfaces onto the canonical component stack.",
    prompts: [
      {
        label: "9A: Cards, panels, headers, and states",
        body: `Execute Phase 9A of the Pckup design-system v2 migration: CANONICAL CARD, PANEL, HEADER, AND STATE PATTERNS.

BOUNDARY
Migrate only the approved structural/content pattern families. Do not build a universal Card that replaces every bordered rectangle. Do not redesign the product. Do not move data fetching, authorization, business status mapping, or content ownership into the design-system layer.

DISCOVERY
Use the equivalence graph and visual baseline to compare:
- generic .card/.card--panel usage;
- Content Card, Workspace Card, Metric Card, Record Card, Review Block and route-local cards;
- dashboard stat cards, utility panels, SEO provider/recommendation cards, CMS cards and marketing sections;
- Page Hero, PageHeader, Section Header, dashboard headers and utility page heads;
- Notice Section, Error Summary, Empty/Error/Loading/Locked/Unavailable compositions.
For each candidate, distinguish structure, semantics, interaction, content model, responsive behavior and surface-specific visual treatment.

CONTRACT DESIGN
Follow the approved Phase 3 decisions. Expected architecture may include:
- a small Card/Panel structural foundation with semantic element choice and constrained surface/interaction behavior;
- named MetricCard, RecordCard and ReviewBlock patterns where consumers share a durable content contract;
- PageHeader and SectionHeader patterns with explicit slots, not arbitrary markup injection;
- StatePanel compositions built from canonical feedback primitives;
- surface wrappers for Marketing, Product or Operations only where the visual contract is intentionally distinct.
Reject a component that exists only to accept className, padding, border and children.

IMPLEMENTATION
1. Characterize current semantics, links, focus behavior, hover/selected states, heading hierarchy and responsive behavior.
2. Implement approved patterns in the correct Core, Product or Operations layer using canonical primitives/compounds and owned styles.
3. Keep copy and data conversion in feature adapters.
4. Create compatibility wrappers for existing exports and class patterns.
5. Migrate one bounded surface or coherent consumer group per pull request.
6. Add component-lab fixtures for representative content lengths, actions, status, selected/interactive states and mobile constraints.
7. Add tests for semantic element choice, heading order, whole-card links, keyboard focus, action nesting, truncation and responsive layout.
8. Update manifest, ownership, usage, visual fixtures and state.

FIGMA AND CODE CONNECT
- Reconcile the existing Content Card, Metric Card, Record Card, Review Block, Page Hero, Section Header, Notice Section, State Panel and related assets according to Core/Product/Operations classification.
- Use slots or nested instances only when the canonical code contract supports them.
- Bind approved variables/styles and document content constraints.
- Map eligible canonical exports with parserless Code Connect templates. Page compositions without reusable code exports remain examples, not fake mappings.

VALIDATION
Run route-level before/after screenshots, component state matrices, heading/accessibility checks, mobile/desktop and light/dark coverage, architecture/debt comparisons, Figma metadata/screenshots, Code Connect verification and full repository checks.

EXIT RESPONSE
Report patterns created, patterns rejected as over-generalization, migrated/remaining consumers, adapters, selector changes, Figma/Code Connect status, visual/accessibility results, metrics delta and the next 9A wave.`
      },
      {
        label: "9B: Tables, records, filters, and list controls",
        body: `Execute Phase 9B of the Pckup design-system v2 migration: DATA TABLE, RESPONSIVE RECORD, FILTER, AND LIST-CONTROL PATTERNS.

BOUNDARY
Migrate presentation and interaction patterns only. Do not move queries, server actions, authorization, business sorting rules, analytics, or feature-specific column definitions into the design system. Execute one coherent table/list surface wave per pull request.

DISCOVERY
Inventory and compare:
- .data-table, .table-wrap, utility tables, CMS tables, SEO tables, access/member tables, reports tables and activity tables;
- mobile .row-card representations and independently authored record cards;
- filter bars, search inputs, select filters, date/range controls, chips, pagination, bulk selection and table toolbars;
- empty/loading/error states and responsive breakpoints;
- TanStack Table usage versus hand-authored tables.
Record semantics, column ownership, keyboard behavior, sorting/filtering, selection, pagination, density, sticky regions, overflow, mobile transformation and accessibility.

CANONICAL ARCHITECTURE
Implement the approved separation, typically:
- low-level accessible DataTable presentation primitives for table, head, row, cell, caption and state;
- feature-owned table models/column definitions;
- optional TableToolbar/FilterBar patterns built from canonical controls;
- feature-owned responsive record mapper rendered through a canonical RecordList/RecordCard pattern when a real table cannot remain usable on mobile;
- explicit density and surface variants only when approved.
Do not create a JSON column DSL merely to centralize markup unless the existing TanStack architecture and real consumers justify it.

IMPLEMENTATION
1. Add characterization tests for semantics, captions, headers, sorting state, selected rows, links/actions, numeric alignment, empty/loading/error and responsive behavior.
2. Implement canonical patterns with owned styles and token contracts.
3. Preserve feature models and data transformations.
4. Provide adapters for existing class-based tables and mobile record views.
5. Migrate one complete feature table and its mobile representation as the pilot.
6. Add deterministic lab fixtures for wide/narrow columns, long content, actions, empty/loading/error, selection and mobile.
7. Update manifest, visual matrix, usage metrics and remaining consumers.

FIGMA AND CODE CONNECT
Reconcile Data Table, Record Card, Metric Card where relevant, filter/toolbars and responsive examples in the correct library scope. Figma may document responsive composition without pretending one desktop table instance automatically becomes a different semantic mobile component. Map only real canonical code exports.

VALIDATION
Run table accessibility checks, keyboard/focus tests, screen-reader labels/caption tests, responsive screenshots, overflow/sticky behavior, light/dark coverage, performance/bundle review and feature-specific E2E tests. Verify no query or business behavior changed.

EXIT RESPONSE
Report canonical table/list architecture, pilot feature, responsive strategy, migrated/remaining tables, adapters, semantics/accessibility results, visual evidence, Figma/Code Connect status and next wave.`
      },
      {
        label: "9C: Navigation and flow patterns",
        body: `Execute Phase 9C of the Pckup design-system v2 migration: NAVIGATION ITEM, BREADCRUMB, STEPPER, FLOW SUMMARY, AND ACTION-TOOLBAR PATTERNS.

BOUNDARY
Build presentation and interaction patterns consumed by shells and flows. Route registries, permissions, active-route rules, product copy and business workflow state remain outside the design system. Do not migrate whole shells yet.

DISCOVERY
Compare:
- public navigation items, mobile tray items, PublicNavRail rows, dashboard/courier sidebar rows and utility rail/tray entries;
- breadcrumbs and back links;
- tabs and secondary page navigation;
- Stepper, FlowStepShell internals, ApplyStepShell and estimate flow headers;
- Review Block, Route Summary, Quote Summary and confirmation summaries;
- page/action toolbars, split buttons and grouped controls.
Record current semantics, route matching, current/expanded/disabled/busy states, keyboard behavior, icon rules, responsive transformations and surface-specific visual differences.

CONTRACTS
Follow approved classifications. A likely architecture is:
- NavigationItem as a visual/semantic primitive receiving already-resolved href, label, icon and current/disabled state;
- NavigationGroup/Disclosure only when repeated behavior is shared;
- route registries and permission filtering owned by each shell/feature;
- Breadcrumb and BackLink patterns;
- Stepper driven by feature-owned step definitions and current/completed state;
- RouteSummary, QuoteSummary and ReviewBlock as Product patterns with feature-owned data adapters;
- Operations-specific navigation wrappers when density/behavior is intentionally different.
Do not create one Navigation component with a Surface prop that contains every shell.

IMPLEMENTATION
1. Build canonical patterns from approved primitives/compounds.
2. Preserve link semantics, current-page state, disabled behavior, focus order, keyboard disclosure, responsive labels/icons and touch targets.
3. Add compatibility wrappers for existing classes/exports.
4. Pilot patterns inside one flow or one shell fragment without replacing the whole shell.
5. Add lab state matrices and tests for routing-independent presentation contracts.
6. Update manifest, adapters, usage, screenshots and state.

FIGMA AND CODE CONNECT
Reconcile Application Navigation Item, Utility Pill, Stepper, Review Block, Route Summary, Quote Summary and related assets. Keep Public/Product/Operations distinctions explicit. Use instance swaps for icons rather than icon variants. Publish Code Connect only for real exported patterns.

VALIDATION
Run keyboard, focus, current-page, touch-target, responsive, long-label, RTL-readiness where applicable, theme and route-level visual tests. Confirm route matching and authorization logic remain unchanged in features/shells.

EXIT RESPONSE
Report pattern APIs, route/business logic intentionally left outside, pilot consumers, remaining consumers, Figma/Code Connect state, accessibility/visual evidence and whether Phase 10 shell work is now unblocked.`
      }
    ]
  },

  {
    id: "phase-10",
    number: "10",
    title: "Shell convergence and surface migration",
    category: "Application migration",
    mode: "Surface-by-surface",
    duration: "6+ PRs",
    summary: "Rebuild the application chrome around shared shell foundations and migrate complete product surfaces onto the canonical component stack without replacing routing, guards, data, or business logic.",
    goal: "Make the new design paradigm the actual application architecture, not a parallel component library used only by demos.",
    why: "Pckup currently has separate Marketing, Auth, Estimate, Dashboard, Courier, and Utility systems with duplicated shell chrome and route-local UI. Adoption must happen at full-surface boundaries.",
    prerequisites: [
      "Required primitives, compounds, and patterns for the selected surface are stable.",
      "The selected shell's auth, capability, routing, responsive, and first-paint behaviors are characterized.",
      "A complete before-state visual and behavioral scenario set exists for the selected surface."
    ],
    tasks: [
      "Wave 10A: Create shell foundations and converge DashboardShell with CourierWorkspaceShell where behavior is genuinely shared.",
      "Wave 10B: Decompose UtilityShell into OperationsShell structure, navigation, page header, account, notification, overlay, and feature modules while preserving security boundaries.",
      "Wave 10C: Migrate AuthShell and Estimate/Courier application FlowShell families.",
      "Wave 10D: Migrate MarketingShell and public navigation/footer compositions.",
      "Wave 10E+: Migrate complete route surfaces in dependency order and retire route-local reusable patterns.",
      "Keep feature data and business behavior in feature modules; routes become composition and server-boundary code."
    ],
    deliverables: [
      "Canonical shell foundations and scoped shell implementations",
      "Feature modules with explicit UI ownership",
      "Migrated route families using canonical components",
      "Compatibility and rollback adapters during each surface wave",
      "Per-surface visual/behavioral reports",
      "Adoption metrics and legacy-removal queues"
    ],
    exitGate: [
      "The selected surface renders through the canonical component stack and approved shell architecture.",
      "Authentication, authorization, privacy, payments, route behavior, data behavior, first paint, and responsive navigation remain proven.",
      "Route files primarily compose features/components rather than define reusable visual systems.",
      "Legacy shell code and selectors are deleted only at zero use.",
      "The migrated surface passes its complete visual and behavioral baseline."
    ],
    stopConditions: [
      "Stop if a shell refactor crosses authentication, authorization, privacy, payment, or deployment boundaries without high-risk review and characterization.",
      "Stop if shared shell extraction would force Product and Operations into one visual or behavioral model unsupported by evidence.",
      "Do not combine more than one major surface family in a pull request."
    ],
    handoff: "Phase 11 reconciles and publishes the complete canonical Figma/Code Connect system and adds continuous cross-system drift detection.",
    prompts: [
      {
        label: "10A: Portal shell convergence",
        body: `Execute Phase 10A of the Pckup design-system v2 migration: PORTAL SHELL CONVERGENCE FOR CUSTOMER DASHBOARD AND COURIER WORKSPACE.

BOUNDARY
Converge only the proven shared shell infrastructure of DashboardShell and CourierWorkspaceShell. Preserve distinct navigation registries, role/approval guards, titles, destinations, feature content and business behavior. Do not migrate the Utility/Operations shell in this wave.

CHARACTERIZE FIRST
Pin with tests and screenshots:
- customer authentication redirect and courier-role redirect;
- courier authentication, role and approval gate;
- emulation/mounted behavior and escape-link disabling;
- sidebar open/close, scrim, Escape and route-change behavior;
- desktop/mobile breakpoints and mobile dock;
- current-route computation;
- theme toggle, identity display and sign out;
- loading and error states;
- main landmark and focus behavior;
- public mobile navigation integration.

ARCHITECTURE
Implement an approved PortalShell foundation that owns only shared presentation and interaction:
- sidebar/drawer structure;
- top bar structure;
- mobile menu control and scrim;
- content landmark and responsive spacing;
- slots/configuration for brand, title, navigation, actions, identity and mobile dock.
Keep auth guards, approval checks, route registries, emulation policies, sign-out orchestration and destination computation in customer/courier feature adapters.

IMPLEMENTATION
1. Extract shared shell components using canonical navigation/action primitives and owned styles.
2. Create DashboardPortalShell and CourierPortalShell adapters or feature wrappers with explicit guards and registries.
3. Migrate one shell at a time behind parity tests; do not switch both before the foundation is proven.
4. Preserve DOM landmarks, IDs used by tests, route behavior and first-paint behavior unless an approved decision changes them.
5. Remove duplicated shell code and global selectors only after both consumers are migrated and zero usage is proven.
6. Update shell manifest, feature ownership, visual matrix, metrics and rollback plan.

FIGMA AND CODE CONNECT
Reconcile Dashboard Shell, Product Shell / Dashboard, Product Shell / Utility Workspace only where relevant to the approved Portal shell contracts. Do not map an entire route layout if there is no reusable exported shell. Map canonical shell exports or documented child components with parserless templates.

VALIDATION
Run customer/courier auth and role E2E, emulation tests, navigation continuity, mobile drawer/dock, keyboard/focus, responsive/light/dark screenshots, bundle boundaries, full checks and independent correctness/security reviews.

EXIT RESPONSE
Report shared versus feature-specific responsibilities, migration order, code removed/retained, auth/approval evidence, visual parity, Figma/Code Connect status, metrics and rollback.`
      },
      {
        label: "10B: Operations shell decomposition",
        body: `Execute Phase 10B of the Pckup design-system v2 migration: UTILITYSHELL TO OPERATIONS SHELL DECOMPOSITION.

HIGH-RISK BOUNDARY
The existing UtilityShell and utility route layout are load-bearing security, navigation, notification, preference, freshness and first-paint systems. This is a structural decomposition, not a visual redesign. Execute one approved Operations shell sub-wave per pull request. Use the repository's high-risk review path whenever protected authentication, authorization, privacy, credentials, notifications or deployment behavior is touched.

READ AND CHARACTERIZE
Map and pin:
- server-enforced utility authentication/capability boundary and anonymous gate shell;
- serialized Flight payload restrictions;
- utility navigation registries, disclosures, pinning and prepaint;
- desktop rail and mobile tray handoff;
- page configuration, breadcrumbs, last-updated/freshness behavior;
- account/profile controls, login/logout dialogs and theme;
- bell, notification history, preferences and alerts;
- view switch, lab behavior and route rebasing;
- keyboard helper, focus, portal and disclosure behavior;
- CMS/SEO nested navigation and feature integrations.

TARGET DECOMPOSITION
Follow the approved architecture, expected to separate:
- OperationsShell composition;
- OperationsNavigation and registry adapters;
- OperationsTopBar/PageHeader/Breadcrumbs;
- OperationsAccount controls;
- OperationsNotifications feature boundary;
- OperationsPreferences/disclosure boundary;
- OperationsViewSwitch/Lab adapters;
- route-owned page content;
- server layout auth/capability data preparation.
Do not move all imported business logic into a new giant operations-shell.ts file.

WAVE EXECUTION
1. Select the first incomplete sub-wave from the manifest.
2. Add characterization tests for that responsibility.
3. Extract the smallest stable module using canonical components.
4. Keep compatibility props and event contracts at the existing UtilityShell boundary until the sub-wave is proven.
5. Migrate internal call sites, then remove only the extracted duplicate code.
6. Run the complete utility visual/auth/navigation scenarios after every sub-wave.
7. Update LOC/complexity, import graph, ownership, metrics and state.

CSS
Move only selectors owned by the extracted shell responsibility into approved owned styles. Preserve order via the Phase 5 facade until consumers fully migrate. Do not restyle the utility suite.

FIGMA AND CODE CONNECT
Reconcile Utility Shell, Application Navigation Item, Utility Pill and Operations patterns only after each extracted component API is stable. Preserve Operations-specific density and behavior. Map exported canonical components, not the original monolithic shell or raw CSS patterns.

EXIT GATE FOR EACH SUB-WAVE
- same auth/capability/privacy behavior;
- same navigation and first paint;
- same notification/preference behavior in scope;
- visual parity across utility scenarios;
- lower responsibility/complexity in UtilityShell;
- independently reversible change.

PHASE 10B COMPLETION
UtilityShell is either retired or reduced to a thin compatibility/composition entry. Every extracted responsibility has a clear owner and test boundary. Report each sub-wave separately.`
      },
      {
        label: "10C: Auth, flow, marketing, and route-surface waves",
        body: `Execute the NEXT APPROVED Phase 10 surface wave: AUTH SHELL, FLOW SHELL, MARKETING SHELL, OR A COMPLETE ROUTE-FAMILY MIGRATION.

ONE SURFACE PER PULL REQUEST
Read state.json and migration/waves.json. Select only the first incomplete surface whose component and shell prerequisites are complete. State the surface, routes, fixtures, canonical dependencies, legacy code, expected visual neutrality, risks and rollback.

SUPPORTED WAVE TYPES

AUTH SHELL
Consolidate customer/courier auth layout chrome, brand, theme, responsive navigation and form composition while preserving URL privacy stripping, redirects, noindex policy and role-specific behavior.

FLOW SHELL
Consolidate Estimate and Courier Application step-shell structure, header, stepper, content, actions, summary and mobile behavior while keeping each feature's state machine, validation, persistence, API calls and route ownership separate.

MARKETING SHELL
Migrate Navbar, Footer, public mobile navigation, page hero, sections and shared marketing patterns while preserving CMS-published content, home-page special composition, performance, preloader behavior, SEO metadata and responsive navigation.

ROUTE FAMILY
Migrate a coherent family such as customer order pages, profile/account pages, courier jobs/deliveries, CMS, SEO, changelog, visitors, messaging, reports, AI, or public payment/claim/share. Use canonical components and feature-owned adapters. Do not make opportunistic changes across unrelated routes.

PROCESS
1. Characterize the selected surface's business, route, auth, accessibility, visual and performance behavior.
2. Establish a same-commit before baseline.
3. Migrate layout/composition to canonical components using compatibility adapters.
4. Move reusable feature code into the approved feature boundary only when ownership is clear.
5. Preserve server/client boundaries and avoid turning server routes into large client bundles.
6. Remove route-local shared patterns and selectors only after zero usage.
7. Update manifest, adoption metrics, route-style map, visual scenarios and remaining exceptions.

VALIDATION
Run exact surface E2E, auth/security checks where relevant, responsive/light/dark visual comparison, keyboard/focus, reduced motion, data and form behavior, performance/bundle review, SEO checks for public surfaces, design-system/debt comparison and full repository checks.

EXIT RESPONSE
Report the migrated routes, canonical component adoption, feature boundaries, legacy files/selectors removed or retained, business/security evidence, visual parity, metrics, Figma/Code Connect effects and the next unblocked surface wave.`
      }
    ]
  },

  {
    id: "phase-11",
    number: "11",
    title: "Figma library, Code Connect, and continuous drift contract",
    category: "Design-code integration",
    mode: "Canonical reconciliation",
    duration: "3 bounded PRs + library publish",
    summary: "Rebuild the existing Figma library around the approved canonical code catalog, finalize parserless Code Connect, and establish observable drift detection between design, code, tokens, and deployed surfaces.",
    goal: "Make Figma and GitHub two governed representations of the same component contracts instead of partially connected inventories.",
    why: "A mature component architecture is not complete until designers, developers, and AI agents all resolve a Figma component to the same production export and receive accurate variants, tokens, documentation, and usage guidance.",
    prerequisites: [
      "Canonical code APIs for in-scope components and shells are stable.",
      "The migration manifest records the intended Figma disposition of every family.",
      "Figma Enterprise access and Code Connect permissions are confirmed.",
      "The existing token/Figma sync path is healthy."
    ],
    tasks: [
      "Wave 11A: Audit and reorganize the existing Figma file into Foundations, Core, Product, and Operations canon without deleting unresolved assets.",
      "Wave 11B: Create/update canonical component sets, variants, properties, descriptions, variable bindings, examples, and accessibility guidance one component at a time.",
      "Wave 11C: Migrate legacy parser mappings to parserless Code Connect templates, publish exhaustive mappings, and verify Dev Mode.",
      "Wave 11D: Add component-manifest and Figma/Code Connect drift reports plus Enterprise webhook/API automation where it improves the reviewed lane.",
      "Mark prototype-only, composition-only, deprecated, and retired Figma assets clearly rather than presenting them as production canon."
    ],
    deliverables: [
      "Reconciled published Pckup Foundations/Core/Product/Operations library structure",
      "Canonical component pages and documentation",
      "Complete parserless .figma.ts Code Connect set for eligible canon",
      "Manifest-to-Figma and Code Connect drift audits",
      "Library publish evidence and Dev Mode verification",
      "Reviewed webhook/API automation or a documented decision to retain the existing manual step"
    ],
    exitGate: [
      "Every eligible canonical component has one published Figma asset and one verified Code Connect relationship.",
      "Every published canonical asset points to an active production export or is explicitly design-only with no false code mapping.",
      "Variables, styles, properties, variants, and descriptions match the approved contracts.",
      "Prototype, deprecated, and retired assets cannot be mistaken for current canon.",
      "Drift is reported continuously and library publication cannot bypass GitHub validation or production review."
    ],
    stopConditions: [
      "Stop if a Figma change would invent a code contract not approved in the manifest.",
      "Stop if a Code Connect mapping points to CSS-only patterns, page composition, missing exports, or legacy code scheduled for deletion.",
      "Do not let a Figma webhook write directly to production main or bypass the reviewed token/component lanes."
    ],
    handoff: "Phase 12 removes the remaining legacy architecture, turns validated guardrails blocking, and publishes the permanent operating workflow.",
    prompts: [
      {
        label: "11A: Reconcile and build the Figma canon",
        body: `Execute Phase 11A of the Pckup design-system v2 migration: RECONCILE THE EXISTING FIGMA LIBRARY WITH THE APPROVED CANONICAL COMPONENT MANIFEST.

REQUIRED FIGMA WORKFLOW
Use the available Figma MCP and design-system skills. Perform discovery first. Before any Figma mutation:
- inspect the target file, pages, variables, styles, components, descriptions and publication state;
- call library discovery before design-system search as required by the Figma workflow;
- read the canonical migration manifest and code contracts;
- produce a gap analysis and an exact component-by-component scope;
- request an owner decision only for genuine design forks, not for routine reconciliation.
Never batch the entire design system into one mutation. Work sequentially and validate every component.

BOUNDARY
The target is the existing Pckup Design System file X7WZQGMUPIuzeaNoA7zTrF unless the approved architecture explicitly created dependent library files. Preserve the existing variable/token contract. Do not copy every historical code pattern into Figma. Do not delete unresolved or prototype assets merely to make the file look clean.

TARGET LIBRARY MODEL
Organize the published canon logically as:
- Foundations: variables, color roles, typography, effects, spacing/radius/motion/icon guidance;
- Core: reusable primitives and compounds shared across surfaces;
- Product: estimate, dashboard, courier and customer product patterns/shells;
- Operations: utility, CMS, SEO, changelog, reporting and internal-operation patterns/shells.
If these remain pages in one file initially, make dependency and publication status explicit. Product and Operations consume Core; they do not redraw it.

FOR EACH MANIFEST FAMILY
Assign one Figma disposition:
- CANONICAL_PUBLISHED_COMPONENT
- SCOPED_PUBLISHED_COMPONENT
- COMPOSITION_EXAMPLE
- PROTOTYPE_ONLY
- DEPRECATED
- RETIRED_PENDING_REMOVAL
- NO_FIGMA_ASSET
Record the node/key, page, publication state, code export, Code Connect status and decision ID.

COMPONENT BUILD/UPDATE CONTRACT
For each approved component, one at a time:
1. Confirm variables and styles exist before component construction.
2. Use deterministic names and one documented page/section.
3. Build anatomy with auto layout and bind visual properties to approved variables/styles.
4. Model only supported variant axes and every supported value.
5. Use text, boolean, instance-swap and slot properties according to the actual contract.
6. Use instance swaps for icons, not an icon variant explosion.
7. Add descriptions with purpose, use, non-use, accessibility, responsive behavior and canonical code path.
8. Add examples and state matrices.
9. Validate metadata and screenshot immediately.
10. Record node IDs/keys in the manifest and state ledger.

MIGRATION OF EXISTING ASSETS
For each current asset choose keep, update, merge, split, demote, deprecate or retire. Preserve existing instances through swap/migration guidance where possible. Do not silently break consuming product design files.

QUALITY
Audit:
- variable bindings and unresolved hardcoded values;
- scopes and WEB code syntax;
- light/dark behavior;
- typography and effect styles;
- contrast, focus visibility and touch targets;
- naming and duplicate assets;
- dependency graph and nested components;
- prototype assets incorrectly published as canon.

EXIT RESPONSE
Provide the Figma gap analysis, components updated/created, assets reclassified, variable/style summary, screenshots, metadata validation, manifest updates, publication plan, unresolved decisions and the exact next component or Phase 11B action.`
      },
      {
        label: "11B: Finalize and publish Code Connect",
        body: `Execute Phase 11B of the Pckup design-system v2 migration: PARSERLESS CODE CONNECT FINALIZATION AND DEV MODE VERIFICATION.

BOUNDARY
Map only approved, published canonical Figma components to real active code exports. Do not map composition examples, prototype-only assets, CSS-only patterns, route pages or legacy components pending retirement.

DISCOVERY
1. Read figma.config.json, every existing .figma.tsx/.figma.ts file, the canonical manifest and the current Figma component graph.
2. List all published components and their dependency order.
3. Get current Code Connect mappings and unmapped suggestions.
4. For each mapping candidate, read the real TypeScript component API and tests. Do not infer props from a component name.
5. Produce a mapping plan grouped by dependency order: primitives before compounds, patterns before shells.

FORMAT
Use the currently supported parserless template format:
- file extension .figma.ts;
- figma.code tagged templates;
- exhaustive getEnum mappings;
- getString, getBoolean, getInstanceSwap or getSlot only for matching Figma property types;
- real imports and canonical source paths;
- stable unique IDs and nestability metadata;
- no invented props.
Retain legacy parser files only during a validated migration window. Remove them when parserless templates publish and Dev Mode verification succeeds.

MAPPING RULES
- Every Figma variant value maps exhaustively or is explicitly non-code visual state.
- Browser-only hover/focus preview states should not become fake React props.
- Figma content properties map to real code content/props.
- Business status labels remain feature data; semantic tone mappings may use approved adapters.
- Nested connected components execute their templates rather than emitting placeholder markup.
- Shell mappings must represent real reusable exports, not screenshots of routes.

VALIDATION
For each component:
1. Fetch Code Connect context and property definitions.
2. Confirm the exact code export and source with prop correspondence.
3. Create/update the parserless template.
4. Typecheck/template-validate.
5. Publish or send the mapping.
6. Read back the mapping.
7. Verify in Figma Dev Mode that every supported variant produces accurate imports and snippets.
8. Verify Figma MCP design context reuses the canonical code component.

CI AND MANIFEST
- Add a manifest validation that eligible canonical components have an existing template file and valid node/source metadata.
- Add a safe parse/lint check in CI. Publishing remains an explicit credentialed action.
- Record publish revision, label, template path and read-back status.

EXIT RESPONSE
Report total eligible components, mapped, intentionally unmapped and blocked counts; legacy templates removed; parser/type checks; publish results; read-back verification; Dev Mode screenshots or evidence; nested mapping coverage; manifest updates and remaining blockers.`
      },
      {
        label: "11C: Enterprise sync and drift detection",
        body: `Execute Phase 11C of the Pckup design-system v2 migration: ENTERPRISE FIGMA/GITHUB SYNC AND CONTINUOUS DRIFT DETECTION.

PURPOSE
Make design-code alignment observable and safely automatable without allowing Figma publication to rewrite production code or deploy directly.

READ CURRENT LANES
Inspect the existing Tokens Studio/GitHub sync, token validation, generated CSS, Figma Enterprise Variables API access, LIBRARY_PUBLISH webhook capability, Code Connect publication and repository automation. Reuse the working reviewed lanes. Do not replace a reliable mechanism merely because an API exists.

DESIGN THE EVENT FLOW
Preferred controlled flow:
Figma library publish
→ authenticated webhook receiver
→ fetch published variable/component/style change metadata
→ compare against canonical manifest and reviewed token/component contracts
→ generate a drift report and bounded proposed change
→ GitHub branch/pull request through existing validation and review
→ deployment through normal main/Vercel lane
→ post-deploy verification and manifest revision update.
No runtime dependency on Figma. No direct push to main. No automatic component-code generation without review and tests.

IMPLEMENTATION SCOPE
1. Add or extend a design-system drift command that reports:
   - token source versus generated CSS versus Figma variable differences;
   - manifest components missing in code or Figma;
   - published Figma canon missing Code Connect;
   - Code Connect source/name/node mismatch;
   - component API/property mismatch where safely detectable;
   - deprecated/retired assets still used or published;
   - canonical code consumers using legacy imports/selectors;
   - stale visual fixtures or unverified route migrations.
2. Produce machine JSON and a human report with stable IDs, severity, owner and remediation.
3. Add a scheduled workflow and deduplicated issue/report behavior using existing repository conventions.
4. If Enterprise API/webhook access is confirmed, implement the smallest secure webhook-to-report path. Store credentials only in owner-managed environments. Validate signatures/secrets without logging them.
5. If replacing the manual Tokens Studio push is approved, preserve the exact reviewed PR/check/deploy lane and provide rollback to the existing process.
6. Add freshness checks and last-success metadata.

SECURITY
Treat webhook ingress, tokens, organization data and GitHub writes as protected infrastructure. Use least privilege, replay protection, idempotency, bounded payloads, no secret logging and independent security review.

EXIT RESPONSE
Report the retained/replaced sync path, webhook/API status, drift categories, scheduled workflow, security controls, test events, generated reports, rollback, and proof that Figma publication cannot bypass GitHub review or production checks.`
      }
    ]
  },

  {
    id: "phase-12",
    number: "12",
    title: "Legacy retirement, blocking governance, and steady state",
    category: "Completion",
    mode: "Evidence-driven closeout",
    duration: "Multiple deletion PRs + final policy PR",
    summary: "Remove zero-use legacy architecture, turn proven comparison checks into blocking rules, publish the permanent contribution workflow, and close the migration with measurable evidence.",
    goal: "Ensure the scalable design paradigm is the only paved path moving forward and that the old global component system cannot silently regrow.",
    why: "A parallel design system is not a migration. The program is complete only when production uses the canonical system, legacy debt is removed or explicitly bounded, and CI prevents relapse.",
    prerequisites: [
      "All required surfaces have completed Phase 10 migration waves.",
      "Canonical Figma and Code Connect coverage is verified in Phase 11.",
      "Usage, selector, adapter, and exception metrics are current.",
      "Every deletion candidate has zero-use evidence and rollback history."
    ],
    tasks: [
      "Delete legacy exports, adapters, selectors, facades, files, and Figma assets only in bounded zero-consumer waves.",
      "Collapse token compatibility aliases only when all consumers and external contracts permit it.",
      "Convert warning-only architecture/debt comparisons into blocking no-new-debt and final-state rules.",
      "Add component proposal, change, deprecation, migration, Figma, Code Connect, testing, and release templates.",
      "Publish ownership, support, exception expiration, drift response, and contribution workflows.",
      "Produce final before/after metrics and visual architecture report.",
      "Archive the migration program while keeping the permanent manifest, audits, and operating workflow active."
    ],
    deliverables: [
      "Zero-use legacy deletion PRs",
      "Blocking design-system governance checks",
      "Permanent component contribution and change workflow",
      "Exception and deprecation policy with expiry enforcement",
      "Final design-system manifest and drift dashboard",
      "Final before/after report, screenshots, metrics, and architecture diagrams",
      "Migration state marked complete and archived responsibly"
    ],
    exitGate: [
      "All reusable production UI is canonical, scoped, feature-local, composition-only, or an approved time-bounded exception.",
      "No unknown shared component or unowned global component selector remains.",
      "New rogue shared controls, imports, styles, and mappings are blocked mechanically.",
      "All eligible canonical components have verified Figma and Code Connect coverage.",
      "All required surfaces pass visual, behavioral, accessibility, security, and deployment checks.",
      "The permanent workflow is documented, tested, and used by at least one real post-migration change."
    ],
    stopConditions: [
      "Stop deletion when usage evidence is ambiguous, dynamically generated, external, or untested.",
      "Do not force approved feature-local or composition-only code into the global library merely to reach a vanity coverage number.",
      "Do not close the program with permanent migration adapters lacking owners and review dates."
    ],
    handoff: "The migration program closes. The permanent component contribution, release, drift, and governance workflow becomes normal product development.",
    prompts: [
      {
        label: "12A: Retire the next zero-use legacy wave",
        body: `Execute the NEXT APPROVED Phase 12A wave: ZERO-USE LEGACY RETIREMENT.

ONE DELETION WAVE ONLY
Select the first deletion wave in the manifest whose consumers are proven zero and whose replacement is deployed. Do not combine unrelated legacy systems in one pull request.

PROOF BEFORE DELETION
For every candidate file, export, selector, alias, adapter, Figma asset or Code Connect mapping, provide:
- stable legacy ID;
- canonical replacement;
- static import/reference count;
- selector/class consumer count;
- dynamic-generation analysis;
- route and runtime coverage;
- last known consumer migration commit;
- visual/behavioral scenarios that protect the replacement;
- external/public contract analysis;
- rollback path.
A grep result alone is not enough for dynamic CSS, data attributes, public exports or Figma instances.

DELETE SAFELY
1. Remove legacy code and its tests only when replacement tests cover the contract.
2. Remove legacy CSS selectors and facade imports while preserving remaining source order.
3. Remove adapters/re-exports and update deprecation metadata.
4. Remove token compatibility aliases only when code, docs, external consumers and Figma syntax no longer require them.
5. Deprecate or delete Figma assets through a documented instance migration/publication plan. Do not break consuming design files silently.
6. Remove stale Code Connect mappings before deleting their source and confirm canonical mappings remain.
7. Regenerate census, ownership, manifest and metrics.

VALIDATION
Run the complete affected surface matrix, full architecture/debt scans, selector/order validation, typecheck, lint, tests, design-system checks, E2E, Figma/Code Connect drift and production verification. Confirm built CSS/JS and route behavior no longer include the legacy path.

EXIT RESPONSE
Report every deleted artifact, zero-use proof, replacement, metrics delta, bundle/CSS reduction, visual/behavioral result, Figma impact, rollback and remaining legacy queue. Mark only this deletion wave complete.`
      },
      {
        label: "12B: Turn governance blocking",
        body: `Execute Phase 12B of the Pckup design-system v2 migration: ACTIVATE BLOCKING DESIGN-SYSTEM GOVERNANCE.

PURPOSE
Convert the proven warning/comparison checks into maintainable blocking rules so the repository cannot regress to route-local shared components, unowned global CSS and disconnected Figma assets.

READINESS CHECK
Before enabling each rule, prove:
- a compliant replacement path exists;
- existing debt is zero or represented by a reviewed exception with owner and expiry;
- false-positive fixtures are covered;
- the rule has an actionable error message and remediation link;
- runtime cost is appropriate for local and CI use.
Do not activate a global rule simply to make the dashboard green.

BLOCKING RULES
Implement approved rules for:
- new raw button/input/select/textarea/dialog creation outside allowed low-level or feature-exception paths;
- new shared-looking React components outside canonical or approved feature-local directories;
- forbidden dependency direction and private implementation imports;
- new global component selectors outside foundation/shell/approved legacy scopes;
- new hardcoded token definitions and color-literal increases under the existing token audit;
- unapproved inline visual style growth;
- canonical manifest entries with missing exports, tests, fixtures, docs, Figma metadata or Code Connect templates;
- deprecated imports/selectors after their migration deadline;
- Figma published canon or Code Connect drift;
- oversized canonical components that exceed approved responsibility thresholds without an exception.

EXCEPTIONS
Create a schema-backed exception mechanism requiring:
- stable ID;
- exact rule/path/scope;
- reason;
- owner;
- creation decision;
- expiry or review trigger;
- replacement plan;
- metric impact.
Expired exceptions fail CI. Wildcard permanent exemptions are forbidden.

DEVELOPER EXPERIENCE
- Provide fast local commands and focused CI commands.
- Print exact file/line, violated rule, canonical alternative and documentation link.
- Add tests with planted violations for every rule.
- Integrate with the existing task classifier/check plan rather than creating a parallel CI philosophy.
- Update PR templates and agent instructions only through their canonical generated sources.

VALIDATION
Prove clean main passes, every planted violation fails, approved exceptions work until expiry, stale exceptions fail, and checks are stable under concurrent PR changes.

EXIT RESPONSE
List activated rules, baselines retired, exceptions, local/CI commands, test results, performance, documentation and any rule deliberately left warning-only with reason.`
      },
      {
        label: "12C: Publish the permanent workflow and close the program",
        body: `Execute Phase 12C of the Pckup design-system v2 migration: PERMANENT OPERATING WORKFLOW AND PROGRAM CLOSEOUT.

PURPOSE
Close the migration without deleting its durable governance. Publish the normal workflow that every designer, developer and AI agent follows after the migration.

FINAL AUDIT
Regenerate and independently verify:
- full component census and classifications;
- canonical manifest and ownership;
- adoption by surface;
- raw controls and inline styles;
- global CSS bytes, selectors and ownership;
- legacy exports/selectors/adapters;
- Figma component dispositions;
- Code Connect coverage/read-back;
- visual fixture coverage;
- active exceptions/deprecations;
- drift workflow health;
- production route and deployment health.
Compare against the Phase 0 baseline with honest definitions and explain every remaining exception.

PERMANENT CONTRIBUTION WORKFLOW
Publish and enforce the exact loop for:
1. search/reuse existing components;
2. open a component gap/change proposal when reuse is insufficient;
3. approve use cases, API, behavior, accessibility, states, tokens, ownership and migration impact;
4. implement code, owned styles, tests and lab fixtures;
5. create/update Figma with variable bindings and documentation;
6. create/update parserless Code Connect;
7. migrate bounded consumers;
8. validate visual/behavioral/accessibility/security/performance;
9. publish Figma and GitHub through their reviewed lanes;
10. update manifest, metrics and drift state.

CREATE TEMPLATES
Add or update canonical templates for:
- new component proposal;
- component API/visual change;
- component deprecation;
- migration wave;
- Figma publication;
- Code Connect mapping;
- design-system exception;
- visual regression review;
- design-system release notes.
Integrate them into existing repository workflow and agent policy sources without duplicating instructions.

OWNERSHIP AND SUPPORT
Document owners for Foundations, Core, Product, Operations, tokens, Figma publication, Code Connect, drift automation and exception review. Define response expectations for drift, failed publication, accessibility regression and deprecated consumer growth.

PROVE THE WORKFLOW
Run one real, small post-migration component change through the complete permanent loop. It must update code/Figma/Code Connect/tests/docs/manifest as applicable and pass the new blocking checks. This is the acceptance test for the operating model.

FINAL REPORT
Publish a public-safe, browsable final report with:
- baseline diagnosis;
- architecture before/after;
- phase and wave history;
- component and surface adoption;
- CSS and complexity reduction;
- Figma and Code Connect coverage;
- accessibility and visual coverage;
- remaining approved exceptions;
- rollback and support model;
- links to every run report and decision.
Do not expose secrets, internal personal data or protected screenshots.

ARCHIVE
Mark state.json complete, freeze the historical phase/wave ledger, and move only historical narrative to an archive if needed. Keep the canonical manifest, validators, metrics, drift automation and contribution workflow active.

EXIT RESPONSE
State whether every program exit gate passed, final metrics, remaining exceptions, proof of the post-migration workflow test, production verification, Figma/Code Connect verification, final report URL and the permanent owner/workflow handoff.`
      }
    ]
  }
]);
