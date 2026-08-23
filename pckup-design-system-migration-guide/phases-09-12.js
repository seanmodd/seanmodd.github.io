window.PCKUP_PHASES = (window.PCKUP_PHASES || []).concat([
  {
    id: "phase-9",
    number: "09",
    group: "D · Canonical component system",
    title: "Roll out the remaining primitive families",
    shortTitle: "Primitive rollout",
    kind: "Repeat per family",
    duration: "One bounded PR per family",
    summary:
      "Apply the proven pilot workflow to fields, selections, status elements, icons, loaders, and other approved primitives—one family at a time, with adapters and measured adoption.",
    outcome:
      "A complete Core primitive layer that new product work can use without raw controls or global component selectors, while legacy consumers continue functioning during migration.",
    why:
      "Behavioral components, patterns, and shells cannot be made coherent while they still embed multiple unrelated button, field, badge, and loading implementations.",
    prerequisites: [
      "Phase 08 pilot accepted and retrospective incorporated.",
      "The chosen {{FAMILY}} is approved in the target catalog.",
      "Its implementations and consumers are mapped in the equivalence graph.",
      "Foundation roles required by the family are verified."
    ],
    deliverables: [
      "Canonical {{FAMILY}} implementation, owned styles, tests, and examples.",
      "Legacy adapter/deprecation record where required.",
      "Bounded consumer migrations with visual and behavior parity evidence.",
      "Updated component manifest and adoption metrics.",
      "Figma/Code Connect readiness metadata for Phase 13."
    ],
    exitCriteria: [
      "The family has one stable public API and explicit non-goals.",
      "Supported states are accessible and fully tested.",
      "No canonical style depends on legacy global CSS.",
      "The consumer ledger and remaining debt are accurate.",
      "The PR is independently reversible and does not broaden into another family."
    ],
    antiGoals: [
      "Do not migrate multiple unrelated families in one PR.",
      "Do not hide feature-specific workflow inside a primitive.",
      "Do not bulk-replace native controls without semantic review.",
      "Do not delete shared legacy selectors until every consumer is proven migrated."
    ],
    prompt: String.raw`You are executing Phase 09 of the Pckup Design System Migration Program for one primitive family.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}
Primitive family for this run: {{FAMILY}}

PRECONDITION
Read state.json, the Phase 08 pilot retrospective, approved target catalog, equivalence evidence for {{FAMILY}}, foundation contract, consumer/selector census, and repository policies. Confirm that {{FAMILY}} is assigned to the primitive layer and scheduled for this wave. If not, stop rather than changing its classification silently.

MISSION
Migrate exactly one approved primitive family into the canonical design-system architecture using the pilot's proven strangler workflow. Build a stable long-term API, isolate its visual ownership, migrate a bounded set of real consumers, and leave measurable compatibility/deprecation paths for the rest. Do not combine unrelated primitive families in this PR.

FAMILIES THIS PHASE MAY COVER ACROSS SEPARATE RUNS
Examples include IconButton, LinkButton, TextField, Textarea, Select, Checkbox, Radio/OptionTile, Badge/StatusBadge, Spinner/Progress, Divider, Avatar, Tooltip trigger primitives, and icon primitives. The approved catalog—not this example list—controls scope.

REQUIRED WORK
A. Revalidate the current family evidence
Produce an implementation table from the census with:
- every current implementation and raw-control pattern that belongs to {{FAMILY}};
- consumers by product surface;
- native semantics and accessibility behavior;
- props and states;
- class names/selectors and stylesheet ownership;
- visual/token differences;
- existing tests;
- existing Figma assets and mapping status;
- known exceptions that must remain feature-local.
Resolve uncertain membership before coding. Do not absorb merely similar controls without evidence.

B. Finalize the canonical contract
Define and document:
- purpose and non-goals;
- native element contract;
- typed props and defaults;
- controlled/uncontrolled behavior where relevant;
- label, description, error, required, disabled, readonly, loading, and validation semantics where relevant;
- variants/sizes/states with reasons;
- slot/composition model;
- theming/context behavior;
- component-local geometry;
- accessibility and keyboard behavior;
- testing and example requirements;
- migration/deprecation plan.
Avoid Boolean-prop explosions. Prefer semantic variants and composition. Do not expose CSS class implementation details as public API without a documented integration need.

C. Implement the canonical family
Use the approved design-system layer and file contract. The implementation must:
- be strictly typed;
- use native semantics;
- isolate owned styles;
- consume approved foundation roles;
- avoid route, feature, auth, data-store, and page-style dependencies;
- support forwarding refs/ids/ARIA/native props only where appropriate;
- preserve server compatibility where possible;
- keep client code minimal and explicit;
- include testable state attributes only when they represent real contract state.

D. Build comprehensive but bounded examples/tests
Render all supported states in the existing reference/lab harness. Test semantic markup, labeling, description/error associations, keyboard behavior, focus-visible treatment, disabled/readonly/loading behavior, controlled state, theme/context values, and responsive behavior. Include regression tests against known legacy semantics.

E. Create adapters only where necessary
For each legacy API that cannot immediately migrate:
- create a thin adapter around the canonical implementation or document why an adapter is unsafe;
- map legacy props explicitly;
- preserve analytics/form/link behavior;
- register every adapter consumer and removal milestone;
- prohibit new consumers of the adapter;
- keep the canonical component free of obsolete aliases.

F. Migrate a bounded consumer slice
Choose consumers according to the approved wave and risk model. For each:
- capture before state and relevant interactions;
- identify inherited/global CSS dependencies;
- replace with canonical component or adapter;
- preserve business behavior, submissions, validation, navigation, analytics, permissions, and focus;
- validate desktop/mobile and themes;
- remove only selector rules proven exclusive to migrated consumers;
- update metrics.
Do not mechanically replace all raw elements with the new component. Some native controls belong inside higher-level components or feature-specific interactions and need separate classification.

G. Prepare design integration
Update manifest metadata with exact approved props/states and current Figma disposition. If a published Figma component already matches and Phase 08 established a safe mapping workflow, reconcile/publish Code Connect only when the target is the canonical implementation and the change remains within this family. Otherwise queue exact work for Phase 13; do not create temporary mappings to adapters.

H. Measure and document
Create or update {{DOCS_ROOT}}/components/{{FAMILY}}.md with:
- contract;
- implementation map;
- consumers migrated/remaining;
- adapters and deprecations;
- owned legacy selectors removed/remaining;
- tests/evidence;
- Figma/Code Connect status;
- known exceptions.
Update the target catalog, manifest, adoption dashboard, deprecation register, and state.json.

I. Validation
Run all repository-required typecheck/lint/test/build/design-system checks plus family-specific unit, accessibility, visual, and relevant end-to-end tests. Compare against Phase 01 evidence for affected consumers. Report every intentional visual difference and its approval record.

REQUIRED FINAL RESPONSE
Return a family migration summary with the final API, migrated and remaining consumers, adapter count, raw controls removed, CSS selectors/bytes removed, tests, visual evidence, Figma readiness, validation results, and rollback.

STOP CONDITION
Stop after one family and its bounded adoption slice are committed and reviewed. Do not proceed to another primitive family in the same change set. Repeat this prompt with a new {{FAMILY}} only after the prior family passes its exit gate.`
  },
  {
    id: "phase-10",
    number: "10",
    group: "D · Canonical component system",
    title: "Consolidate behavioral components",
    shortTitle: "Behavior components",
    kind: "Repeat per family",
    duration: "One high-risk family per PR",
    summary:
      "Unify dialogs, drawers, popovers, menus, disclosures, tabs, comboboxes, toasts, and related interaction infrastructure on top of canonical primitives without disturbing product logic.",
    outcome:
      "Shared, accessible behavior foundations replace duplicated focus traps, portals, scroll locks, dismissal rules, keyboard handling, and overlay styling.",
    why:
      "The current repository contains behaviorally overlapping components such as separate dialog systems and navigation overlays. Visual consolidation without behavior consolidation would preserve the most dangerous duplication.",
    prerequisites: [
      "Required primitives are canonical and available.",
      "The selected {{FAMILY}} has complete behavior/equivalence evidence.",
      "Critical interaction baselines and accessibility expectations are captured.",
      "Product state/data logic can remain outside the shared behavior component."
    ],
    deliverables: [
      "Canonical {{FAMILY}} behavior and presentation contract.",
      "Shared utilities only where behavior is truly common.",
      "Adapters for current implementations and bounded consumer migrations.",
      "Keyboard, focus, portal, layering, dismissal, and reduced-motion tests.",
      "A deletion plan for superseded behavior implementations."
    ],
    exitCriteria: [
      "One behavior contract handles the approved family without a giant mode switch.",
      "Focus, keyboard, ARIA, scroll lock, stacking, and dismissal are verified.",
      "Feature/business state stays outside the generic component.",
      "At least one real legacy implementation is migrated with parity.",
      "No competing new focus/portal infrastructure remains untracked."
    ],
    antiGoals: [
      "Do not merge components that only look similar but have different semantics.",
      "Do not put authentication, permissions, network state, or domain data inside the shared overlay.",
      "Do not rewrite all overlays in one PR.",
      "Do not depend on global z-index guesses or duplicated scroll locks."
    ],
    prompt: String.raw`You are executing Phase 10 of the Pckup Design System Migration Program for one behavioral component family.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}
Behavior family for this run: {{FAMILY}}

PRECONDITION
Load the approved target catalog, equivalence graph, canonical primitive contracts, visual baseline, accessibility/interaction standards, CSS ownership map, and state ledger. Confirm {{FAMILY}} belongs to the behavioral layer and that all required primitives exist. Stop if prerequisites are missing rather than implementing another private primitive inside this family.

MISSION
Consolidate one behavioral family such as Dialog, Drawer, Popover/Menu, Disclosure, Tabs, Combobox, Toast/Notice, or Tooltip into a canonical accessible component system. Separate generic interaction mechanics from feature/business logic. Migrate only a bounded set of real consumers and preserve their current product behavior.

REQUIRED WORK
A. Inventory behavior, not just appearance
For every current implementation in the family, document:
- DOM role and native element choice;
- portal/root behavior;
- open/close state ownership;
- Escape, outside-click, close-button, and navigation dismissal;
- focus entry, trap/containment, restoration, and nested behavior;
- scroll locking and reference counting;
- inert/aria-hidden/background behavior;
- stacking/z-index and nested overlays;
- keyboard navigation model;
- animation and reduced-motion behavior;
- responsive mode changes;
- busy/disabled/confirmation behavior;
- feature data and permissions improperly coupled to the implementation;
- styles and tokens;
- existing tests and known bugs.
Use this to confirm equivalence. A native dialog and a custom portal dialog may share a canonical abstraction only if the resulting semantics and behavior are explicit and verified.

B. Define the canonical behavior contract
Document:
- semantic role and native/custom implementation rationale;
- controlled state and events;
- content slots such as trigger, title, description, body, footer, close control;
- focus contract;
- dismissal policy props with safe defaults;
- nested/stacked behavior;
- body scroll and background interaction;
- loading/busy behavior;
- responsive behavior;
- reduced-motion behavior;
- accessibility labels/descriptions;
- layering token usage;
- non-goals and feature-owned state.
Avoid a universal Overlay component whose props encode every product workflow. Extract shared internal utilities only when at least two approved families need the exact same behavior.

C. Implement safely
Build the canonical component in the approved layer using canonical primitives and owned styles. Requirements:
- no route, auth, permission, store, fetch, or domain imports;
- deterministic ids/ARIA relationships;
- robust nested behavior;
- cleanup on unmount/navigation;
- no body-scroll leaks;
- no focus loss;
- no global event listener leaks;
- explicit client boundary;
- layering from the approved foundation model;
- style isolation and theme support.

D. Build adversarial tests
Test at minimum:
- opening by pointer and keyboard;
- initial focus and optional autofocus;
- Tab/Shift+Tab boundaries;
- Escape and outside interaction policies;
- close-button and busy-state behavior;
- focus restoration when opener exists or disappears;
- nested instances and stack ordering;
- multiple scroll locks;
- unmount while open;
- route/navigation changes;
- screen-reader role/name/description;
- reduced motion;
- mobile viewport behavior;
- no hydration mismatch where server rendering is involved.
Use the repo's existing e2e harness for behaviors that unit tests cannot prove.

E. Build adapters and migrate a bounded slice
Select one or a few related current implementations. Keep their product-specific state outside the canonical component. Wrap or compose the new behavior, preserving:
- business actions and side effects;
- permission checks;
- loading/error state;
- analytics;
- copy and content;
- route transitions;
- current dimensions unless approved otherwise.
Record every consumer, adapter, selector, and removal condition. Do not migrate unrelated overlays merely because the new component exists.

F. Reconcile visual anatomy
Build the complete example/state matrix in the existing reference lab. If a Figma component already exists, compare its anatomy and properties to the approved code contract. Queue or perform a bounded reconciliation only through the approved workflow. Never map Code Connect to product wrappers or feature dialogs; map the canonical behavioral component when its Figma counterpart is canonical.

G. Remove only proven obsolete behavior
After migrated consumers pass, remove duplicated focus-trap, scroll-lock, portal, key-handler, or selector code only when the dependency graph and runtime tests prove zero remaining consumers. Record shared utilities that must remain and why.

H. Documentation and state
Create {{DOCS_ROOT}}/components/{{FAMILY}}.md with the behavior contract, implementation comparison, adversarial test matrix, migrated consumers, adapters, remaining implementations, Figma status, and deletion milestones. Update manifest, catalog, equivalence decisions, deprecation ledger, metrics, and state.json.

VALIDATION
Run typecheck, lint, tests, build, design-system checks, targeted accessibility tests, and affected end-to-end flows. Compare visual/interaction baselines in both themes and mobile/desktop. Explicitly report any intentional behavior normalization and approval.

REQUIRED FINAL RESPONSE
Return the final behavior contract, implementations consolidated, consumers migrated, duplicate infrastructure removed, adversarial test results, visual parity evidence, remaining debt, validation results, and rollback.

STOP CONDITION
Stop after one behavioral family and bounded consumers are reviewed. Do not combine Dialog, Drawer, Popover, and Disclosure migrations into one mega-PR. Repeat with a new {{FAMILY}} only after the current exit gate passes.`
  },
  {
    id: "phase-11",
    number: "11",
    group: "D · Canonical component system",
    title: "Create the reusable product-pattern layer",
    shortTitle: "Product patterns",
    kind: "Repeat per pattern family",
    duration: "One pattern or tightly coupled set per PR",
    summary:
      "Extract reusable cards, headers, filters, tables, responsive records, state panels, navigation items, and domain-neutral summaries from route-local markup without turning pages into rigid mega-components.",
    outcome:
      "Product surfaces compose consistent, data-agnostic patterns from canonical primitives and behaviors while retaining feature-owned data and workflow logic.",
    why:
      "Most visual duplication lives above primitives: repeated panel chrome, page headers, data presentation, filters, and responsive list/table switches. These patterns must be reusable without becoming business-domain frameworks.",
    prerequisites: [
      "Required primitives and behaviors are canonical.",
      "The selected {{FAMILY}} is approved as a pattern rather than a primitive or page composition.",
      "At least two evidence-backed consumers or a strategic shell dependency exists.",
      "Data and permissions can remain feature-owned."
    ],
    deliverables: [
      "Canonical {{FAMILY}} pattern with composition/slot contract.",
      "Owned styles, examples, tests, and responsive behavior.",
      "Bounded adoption across representative surfaces.",
      "Legacy selector/markup reduction with consumer evidence.",
      "Figma pattern readiness and documentation."
    ],
    exitCriteria: [
      "The pattern is domain-neutral enough for approved reuse but not over-generalized.",
      "Feature code supplies data and actions through typed composition.",
      "Responsive and empty/loading/error states are explicit.",
      "At least two real use cases validate the abstraction when required.",
      "No page-level layout was incorrectly promoted to the core library."
    ],
    antiGoals: [
      "Do not create a Card component with dozens of product-specific modes.",
      "Do not move fetching, permissions, or domain transformations into patterns.",
      "Do not force structurally different tables into one API.",
      "Do not componentize every one-off page section."
    ],
    prompt: String.raw`You are executing Phase 11 of the Pckup Design System Migration Program for one reusable pattern family.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}
Pattern family for this run: {{FAMILY}}

PRECONDITION
Read the approved target catalog/equivalence evidence for {{FAMILY}}, canonical primitive and behavior contracts, surface baseline, CSS ownership graph, consumer inventory, and state ledger. Confirm the family is approved as a reusable pattern and has sufficient evidence. If it is actually a page composition or feature-local component, stop and record that rather than forcing abstraction.

MISSION
Build one scalable product-pattern family that composes canonical primitives/behaviors and removes repeated route-local structure and styling. Preserve feature-owned data, permissions, side effects, and workflow logic. Prove the pattern against real consumers without designing a universal mega-component.

POTENTIAL PATTERN FAMILIES
Across separate runs, approved candidates may include PageHeader, SectionHeader, Card/Panel, MetricCard, RecordCard, StatePanel, FilterBar, DataTable, responsive TableRecordList, Pagination, NavigationItem, ReviewBlock, RouteSummary, QuoteSummary, NoticeSection, and similar evidence-backed families. Use only the approved catalog.

REQUIRED WORK
A. Confirm abstraction viability
Compare all proposed consumers and answer:
- What DOM anatomy is truly shared?
- Which differences are semantic variants versus different components?
- What content should be slots/children versus string props?
- Which actions remain caller-owned?
- Which states are intrinsic versus feature data states?
- Which responsive behavior is shared?
- Which visuals come from context tokens versus separate patterns?
- Are there at least two real consumers, or is this a strategic dependency with documented justification?
Reject the abstraction if reuse would require conditionals named after routes, products, statuses, or business workflows.

B. Define a composition-first API
Design a typed API that favors composition over prop explosion. Define:
- structural slots/compound subcomponents;
- semantic variants only where anatomy remains shared;
- optional regions and ordering rules;
- accessibility labels, headings, captions, descriptions, and landmark behavior;
- loading/empty/error integration using canonical state components;
- responsive transformation rules;
- data/action ownership boundaries;
- style/context tokens;
- extension points and explicit non-goals.
For tables, preserve real table semantics on appropriate viewports and define responsive record rendering deliberately rather than hiding columns arbitrarily.

C. Implement in the pattern layer
Use only approved lower-layer imports. The pattern must not fetch data, read authentication, enforce permissions, or import route/feature stores. Keep owned CSS colocated and remove dependence on legacy global selectors. Ensure default markup is useful and accessible without consumer-specific class overrides.

D. Build examples from evidence
Create example states based on real consumer structures but use synthetic, privacy-safe fixtures. Cover themes, desktop/mobile, dense/comfortable contexts where approved, optional regions, long content, localization stress, loading/empty/error, and interactive actions. Do not copy private production data into fixtures.

E. Test structure and behavior
Add tests for semantic structure, heading hierarchy, slots, action ownership, keyboard/focus behavior, responsive output, overflow/long content, state composition, theme/context tokens, and absence of feature imports. Use visual tests for layout patterns and e2e tests for responsive transitions where necessary.

F. Migrate representative consumers
Choose at least two representative consumers when the abstraction claim depends on cross-surface reuse, or a bounded strategic slice approved in the wave. For each:
- record current markup, classes, behavior, and screenshot;
- separate feature data/actions from presentation;
- compose the canonical pattern;
- preserve route behavior and analytics;
- validate responsive and state behavior;
- remove only exclusive legacy selectors;
- record remaining consumers and exceptions.
Do not force a consumer whose anatomy differs materially; split or keep local with a decision record.

G. Figma readiness
Define the exact pattern anatomy, properties, optional regions, and states for Figma. Prefer nested canonical components and instance swaps/slots rather than recreating primitives. Mark whether the existing Figma candidate is canonical, requires reconstruction, or should be archived. Queue Code Connect only when code and Figma contracts align.

H. Documentation and metrics
Create {{DOCS_ROOT}}/components/{{FAMILY}}.md with API, anatomy, consumer evidence, variants, responsive contract, examples, tests, migrated/remaining consumers, legacy CSS reduction, Figma disposition, and non-goals. Update manifest, catalog, adoption metrics, deprecations, and state.json.

VALIDATION
Run all repository-prescribed checks, focused tests, build, visual comparisons, accessibility checks, and affected end-to-end flows. Confirm no data, permission, or server behavior moved into the design-system layer.

REQUIRED FINAL RESPONSE
Return the pattern contract, consumers proving reuse, feature logic kept outside, files changed, selectors/bytes removed, responsive and accessibility evidence, Figma readiness, validations, remaining exceptions, and rollback.

STOP CONDITION
Stop after one pattern family or an explicitly approved tightly coupled set. Do not convert entire pages or dashboards into a pattern library in one PR.`
  },
  {
    id: "phase-12",
    number: "12",
    group: "D · Canonical component system",
    title: "Converge application shells without merging business logic",
    shortTitle: "Shell convergence",
    kind: "High-risk staged program",
    duration: "Multiple shell-specific PRs",
    summary:
      "Separate visual shell anatomy from authentication, permissions, navigation registries, data loading, alerts, and product logic, then converge genuinely shared shell structures through composition and adapters.",
    outcome:
      "Marketing, Auth, Flow, Portal, and Operations shells share canonical lower-level structure where appropriate, while product-specific guards and data remain isolated and testable.",
    why:
      "The current dashboard/courier shells duplicate structure, and the operations shell has accumulated many unrelated responsibilities. Shell convergence yields major consistency and maintainability gains but carries high routing, auth, and hydration risk.",
    prerequisites: [
      "Canonical primitives, behaviors, navigation items, page headers, and state patterns exist.",
      "Shell baseline covers auth, mobile, navigation, loading, permissions, and overlays.",
      "Server/client and security boundaries are documented.",
      "Each shell has a separate rollback and migration plan."
    ],
    deliverables: [
      "Approved shell anatomy and responsibility map.",
      "Canonical shell building blocks or shell family contracts.",
      "Adapters for existing Dashboard, Courier, Auth, Flow, Marketing, and Operations compositions.",
      "Bounded shell migrations with security/behavior/visual evidence.",
      "Decomposition plan for oversized shell components and CSS."
    ],
    exitCriteria: [
      "Shared shell structure is reused only where semantics truly align.",
      "Auth, permissions, data, alerts, and feature state remain outside presentation primitives.",
      "Navigation, mobile drawers/trays, focus, hydration, and security gates are regression-tested.",
      "At least one shell family is migrated reversibly before scaling.",
      "No giant configurable shell replaces several giant duplicated shells."
    ],
    antiGoals: [
      "Do not merge all shells into one component with route-name switches.",
      "Do not weaken server-side authorization or information-disclosure boundaries.",
      "Do not combine a visual shell refactor with auth/data architecture changes.",
      "Do not rewrite the entire UtilityShell in one PR."
    ],
    prompt: String.raw`You are executing Phase 12 of the Pckup Design System Migration Program: application-shell convergence.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}
Shell or shell family for this run: {{FAMILY}}

PRECONDITION
Read the approved shell catalog/equivalence decisions, Phase 01 shell baselines, security/auth/privacy contracts, route layouts, navigation registries, CSS ownership map, canonical lower-layer components, and state ledger. Select one shell or one explicitly approved pair with a clear rollback. Never combine all shells in one implementation wave.

MISSION
Converge Pckup's application shells into a scalable composition model while preserving every authentication, authorization, information-disclosure, routing, hydration, navigation, and product behavior. Separate presentation anatomy from guards, data providers, alerts, and feature orchestration. Reuse only what is truly shared.

SHELL MODEL TO EVALUATE
The approved model may include:
- MarketingShell;
- AuthShell;
- FlowShell for estimate/courier application flows;
- PortalShell shared structurally by customer and courier workspaces where evidence supports it;
- OperationsShell for authenticated internal tooling;
- lower-level ShellFrame, Sidebar/Rail, Topbar, MobileNavigation, PageRegion, AccountArea, and SkipLink pieces.
Do not force these names or boundaries if the approved catalog differs.

REQUIRED WORK
A. Decompose responsibilities before moving code
For the selected shell(s), map every responsibility:
- server layout and metadata;
- server-side auth/permission gate;
- client auth redirection/gate;
- providers and serialized data;
- navigation registry and current-route logic;
- responsive desktop/mobile navigation;
- brand/theme/account controls;
- alerts/notifications/bell;
- modals, drawers, view switches, clocks, freshness indicators;
- feature-specific banners and overlays;
- page title/breadcrumb configuration;
- persistence/local preferences;
- loading/error/locked states;
- CSS ownership and breakpoint behavior;
- security/privacy boundaries.
Classify each as canonical presentation, shell-specific presentation, product adapter, feature orchestration, or server/security responsibility.

B. Define the safe shell contract
Create a composition contract that makes presentation reusable without importing product logic. Prefer explicit slots and typed navigation/config inputs. Define:
- landmarks and DOM order;
- desktop/mobile navigation slots;
- header/title/action regions;
- content/main region;
- account/utility regions;
- skip links and focus movement;
- drawer/rail state contract;
- viewport breakpoints and safe-area behavior;
- theme/context tokens;
- loading/locked shell behavior;
- server/client boundary;
- what must remain in route/layout adapters.
Do not pass huge product state objects merely to preserve the old giant component shape.

C. Choose the first convergence seam
For duplicated customer and courier portal shells, consider extracting shared presentation while leaving role/auth/approval guards in separate adapters. For the operations shell, first extract bounded visual/behavioral sections from the oversized component rather than rewriting it wholesale. For Auth/Flow/Marketing, preserve their distinct semantics and only reuse lower-level pieces where appropriate.

D. Implement incrementally
Create canonical shell building blocks using approved primitives, behaviors, and patterns. Then adapt one existing shell or bounded section. Preserve current public route/layout interfaces where possible so rollback is simple. Do not change server authorization, cookie/session handling, permission checks, data fetches, redirect destinations, or serialized privacy boundaries in the same PR.

E. Preserve navigation and responsive behavior
Validate:
- current destination registry and order;
- aria-current behavior;
- desktop rail/sidebar width and expansion;
- mobile drawer/tray continuity at every breakpoint;
- open/close/focus behavior;
- safe-area and bottom-content clearance;
- persisted preferences and first-paint/prepaint behavior;
- route changes while navigation is open;
- emulation/preview path rebasing;
- no layout shift/hydration flash.

F. Preserve security and data boundaries
Add tests proving unauthorized users receive the same gate/cloak behavior and do not receive protected navigation/data in DOM or serialized payloads. Verify client presentation extraction does not move server-only code into client bundles or expose environment values. Do not weaken existing defense-in-depth merely to simplify the shell API.

G. Split oversized code by responsibility
When the selected shell is oversized, extract only seams required by the approved shell contract, such as NavigationRail, MobileTray, Topbar, AccountMenu, NotificationPanel, PageHeader, or preference hooks. Keep behavior-specific modules cohesive. Do not perform a cosmetic file split that leaves circular state coupling unchanged.

H. Migrate and validate one bounded shell
Capture before/after visual and behavioral evidence across:
- authenticated and gate states;
- desktop/mobile/tablet;
- themes;
- navigation open/closed/current;
- loading/error;
- account actions;
- alerts/overlays;
- emulation/preview if applicable.
Run route, auth, security, hydration, accessibility, and e2e tests. Measure component size reduction, duplicated markup/selectors removed, and consumer adoption.

I. Figma disposition
Define or reconcile shell base components in Figma only after the code anatomy is approved. Use nested canonical components, responsive variants only where they express real modes, and slots for product content. Do not Code Connect entire route pages; map canonical shell components/building blocks where the code API is stable.

J. Documentation and state
Create {{DOCS_ROOT}}/shells/{{FAMILY}}.md and update the shell responsibility map, manifest, target catalog, migration ledger, deprecation register, Figma queue, and state.json. Include remaining oversized responsibilities and next safe seam.

REQUIRED FINAL RESPONSE
Return the selected shell scope, responsibility separation, canonical contract, files extracted, adapter boundaries, behavior/security/visual evidence, duplication removed, validations, remaining work, and rollback.

STOP CONDITION
Stop after one bounded shell migration is reviewed. Do not merge every product shell or rewrite the full Operations/Utility shell in one change set. Repeat this prompt for the next approved shell only after the current gate passes.`
  }
]);
