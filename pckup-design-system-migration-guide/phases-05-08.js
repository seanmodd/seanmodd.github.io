window.PCKUP_PHASES = (window.PCKUP_PHASES || []).concat([
  {
    id: "phase-5",
    number: "05",
    group: "C · Platform construction",
    title: "Establish the target repository architecture",
    shortTitle: "Target architecture",
    kind: "One-time",
    duration: "2–4 sessions",
    summary:
      "Create the scalable design-system boundaries, manifests, import rules, examples, and migration contracts that new canonical components will follow—without moving the existing application all at once.",
    outcome:
      "A production-ready home for foundations, primitives, behaviors, patterns, and shells, plus compatibility seams that allow gradual adoption from the current route-heavy architecture.",
    why:
      "If new components are added to the same ambiguous folders and global styles that caused the current fragmentation, the migration will create a second legacy system instead of replacing the first.",
    prerequisites: [
      "Phase 04 architecture explicitly approved.",
      "Target catalog and migration waves committed.",
      "Repository import aliases, server/client boundaries, and build behavior understood.",
      "No assumption that a separate npm package is automatically better than an in-repo platform."
    ],
    deliverables: [
      "The approved target directory/package skeleton.",
      "A machine-readable component manifest and layer dependency contract.",
      "A canonical component file template and test/example template.",
      "Warning-only architecture checks and an exception ledger.",
      "A migration adapter/deprecation convention documented for later phases."
    ],
    exitCriteria: [
      "New design-system code has one obvious home and public import path.",
      "Layer dependencies are mechanically checkable and currently warning-only.",
      "Server/client boundaries and style loading are proven with a minimal inert fixture.",
      "No existing route has been migrated and no visual output changed.",
      "Later component phases can follow one repeatable file/PR contract."
    ],
    antiGoals: [
      "Do not move all existing components into the new folders.",
      "Do not create empty abstractions for every item in the catalog.",
      "Do not introduce a monorepo/package split without measurable benefit.",
      "Do not turn warning-only architecture checks into blockers yet."
    ],
    prompt: String.raw`You are executing Phase 05 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Read and obey the approved Phase 04 taxonomy, target catalog, migration waves, state ledger, and all repository policies. If the owner approval is not recorded, stop. Work in the isolated migration branch/worktree and preserve the exact baseline/rollback chain.

MISSION
Establish the scalable repository architecture and workflow contract for Pckup's new canonical design-system layer. This phase creates the paved road; it does not migrate the existing application wholesale. The mature codebase must continue to build and behave exactly as before while the new architecture is introduced beside it.

ARCHITECTURE PRINCIPLE
Implement the approved dependency flow, expected to resemble:
Foundations → Primitives → Behavioral components → Patterns → Shells → Feature composition → Routes.
Lower layers must not import higher layers. Route and feature code may consume the design system, but canonical components must not depend on route modules, feature stores, authentication implementations, server actions, or page-specific data.

REQUIRED WORK
A. Verify the best physical boundary
Evaluate the approved target against actual repository constraints. Prefer an in-repo platform such as src/design-system unless the approved decision and build evidence justify a package boundary. Document the final path and why it works with Next.js server/client boundaries, TypeScript aliases, tests, linting, CSS processing, and existing deployment tooling.

B. Create only the structural skeleton needed now
Create the approved directories with concise READMEs or index files only where required. A representative structure may include:
- foundations;
- primitives;
- behaviors or components;
- patterns;
- shells;
- internal utilities;
- examples or test fixtures;
- manifest and public entrypoints.
Do not generate empty components for the full catalog. Empty directory placeholders are acceptable only where repository policy permits and the next phase needs them.

C. Define public and internal imports
Create a single reviewed public import strategy. Decide whether consumers import from a root barrel, layer entrypoints, or direct component entrypoints. Avoid a giant barrel that forces client components or unrelated CSS into server bundles. Define internal-only utilities and ban route/feature imports inside the canonical layer.

D. Create the component contract template
Create a reusable template or documented checklist for every canonical component. It must cover:
- typed public props and semantic naming;
- native element and accessibility contract;
- server/client designation;
- component file;
- colocated style ownership, preferably CSS Modules or the approved isolated mechanism;
- tests for behavior and accessibility;
- isolated example/state matrix using the repository's existing reference/lab infrastructure rather than adding an unnecessary second documentation app;
- Figma node and Code Connect metadata fields;
- migration adapter and deprecation notes;
- ownership and maturity status;
- no secrets or product data.

E. Create the machine-readable manifest
Add the approved manifest in the target architecture. It must support at least:
- stable component id;
- name and layer;
- status: planned, experimental, canonical, deprecated, retired;
- source entrypoint;
- style ownership;
- client/server boundary;
- owner;
- Figma file/node references when available;
- Code Connect status;
- examples/tests;
- legacy replacements;
- allowed consumers or context restrictions.
Validate manifest schema and deterministic sorting.

F. Establish compatibility conventions
Document and implement the minimum helper conventions for gradual migration:
- adapter components may wrap canonical components to preserve legacy props/classes during a bounded transition;
- adapters live outside or in a clearly marked migration namespace, never as permanent canonical APIs;
- deprecations include replacement, consumer count, owner, and removal milestone;
- old and new implementations may coexist only while the migration ledger tracks every consumer;
- compatibility classes must not leak into the canonical component's public contract unless approved.

G. Add warning-only architecture checks
Create checks that report, but do not yet fail CI for existing debt:
- forbidden upward imports between approved layers;
- route/feature imports from the canonical design-system layer;
- unregistered canonical components;
- duplicate stable ids;
- missing ownership/test/example metadata;
- new global component selectors under canonical paths;
- new canonical components with unowned styles.
Existing legacy violations outside the new architecture are inventory, not failures. New violations inside the new architecture may be blocking if repository policy and Phase 04 approve it.

H. Prove the architecture is build-safe
Create the smallest inert fixture necessary to prove:
- imports resolve;
- server components do not accidentally import client-only bundles;
- colocated styles compile;
- tests can load components;
- existing root/global CSS order is untouched;
- no route output changes.
Do not expose an unfinished public route merely for this proof. Reuse an internal reference/lab surface or test fixture.

I. Documentation and state
Create {{DOCS_ROOT}}/05-target-repository-architecture.md with:
- final tree;
- dependency rules;
- public import rules;
- component contract;
- adapter/deprecation rules;
- warning checks;
- rejected alternatives.
Update state.json and the target catalog paths without erasing prior decisions.

VALIDATION
Run the repository's required typecheck, lint/test selection, design-system checks, build or focused compile proof, and architecture-check tests. Compare baseline route output or snapshots as required to prove no visual/runtime change.

REQUIRED FINAL RESPONSE
Return a Phase 05 Summary with the final architecture tree, checks added, validations, files changed, rejected alternatives, and explicit confirmation that no existing product surface was migrated or visually changed.

STOP CONDITION
Stop after the architecture scaffold and contracts are committed. Do not start splitting legacy CSS or implementing the Button pilot in this phase.`
  },
  {
    id: "phase-6",
    number: "06",
    group: "C · Platform construction",
    title: "Assign ownership to legacy CSS without changing pixels",
    shortTitle: "CSS ownership split",
    kind: "Staged program",
    duration: "Several small PRs",
    summary:
      "Turn giant global stylesheets into ordered, owned legacy modules first, preserving byte-level cascade intent and visual behavior before converting component families to isolated styles.",
    outcome:
      "Every major selector family has a named surface/component owner, global source order is explicit, and utility.css/platform.css become temporary facades rather than unknowable monoliths.",
    why:
      "Directly converting a 15,000-line stylesheet into CSS Modules while also redesigning components is unreviewable. A mechanical ownership split creates safe seams and makes later deletion measurable.",
    prerequisites: [
      "Phase 05 architecture and baseline visual matrix available.",
      "Selector ownership evidence from Phase 02.",
      "No pending token-generation changes mixed into the same PRs.",
      "A rollback commit and visual comparison harness for each extraction batch."
    ],
    deliverables: [
      "An ordered legacy stylesheet manifest.",
      "Surface/component-owned legacy CSS files with preserved source order.",
      "Updated imports/facades that load identical effective CSS.",
      "Selector ownership and cascade-dependency maps.",
      "Before/after screenshot and computed-style evidence for every batch."
    ],
    exitCriteria: [
      "utility.css and platform.css are reduced to documented ordered facades or significantly decomposed through approved batches.",
      "No selector, declaration, keyframe, media query, or source-order relationship is silently lost.",
      "Representative visual and interaction baselines match.",
      "Each extracted file has a clear future component/surface owner.",
      "No component API redesign occurred."
    ],
    antiGoals: [
      "Do not rename selectors during the mechanical split.",
      "Do not deduplicate declarations merely because they look similar.",
      "Do not convert to CSS Modules and split ownership in the same step.",
      "Do not execute the entire monolith split as one unreviewable PR."
    ],
    prompt: String.raw`You are executing Phase 06 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Load state.json, Phase 01 baselines, Phase 02 selector census/component-style join, the approved target catalog, and Phase 05 architecture. Confirm the worktree is clean and create one bounded extraction batch. Do not attempt the entire CSS estate in one PR.

MISSION
Mechanically decompose Pckup's oversized legacy global stylesheets into ordered, owned legacy modules without changing visual output, selector names, specificity, behavior, responsive rules, or token semantics. The initial targets include the large utility and platform styling hubs, but the exact batch must be selected from evidence and kept reviewable.

THIS IS A ZERO-VISUAL-CHANGE PHASE
- No selector renaming.
- No declaration deduplication.
- No property normalization.
- No token substitution beyond what already exists.
- No component refactor.
- No API change.
- No Figma change.
- No “cleanup while here.”
Moving a rule is permitted only when its order relative to all interacting rules is preserved or proven irrelevant.

REQUIRED WORK
A. Select and declare the batch
Choose one coherent extraction batch using the ownership graph—for example shell foundation/navigation, one utility product surface, buttons/fields, dashboard shell, or changelog-only selectors. Record:
- source stylesheet and exact ranges/AST nodes;
- owner surface or future component family;
- importers;
- selector count, declaration count, keyframes, media queries, and custom-property dependencies;
- known overrides before and after the range;
- representative baseline routes/states;
- rollback plan.
Create a batch manifest before mutation.

B. Use parser-backed movement
Use a CSS parser/AST or a carefully validated extraction tool. Preserve comments that contain design/behavior rationale. Preserve selector text, declaration order, nested media/supports/container context, keyframe names, and source order. Do not manually copy thousands of lines without a mechanical integrity check.

C. Introduce an ordered legacy facade
Create an explicit ordered import strategy under an approved legacy namespace, such as styles/legacy/utility or the Phase 05 target. The original entry stylesheet may temporarily become an import facade so route import points remain stable. Document the order and why it matters.

A representative ownership model may separate:
- foundation/reset/context aliases;
- shell and navigation;
- shared legacy controls;
- page header and layout patterns;
- changelog;
- visitor tracker;
- CMS;
- SEO;
- reports;
- contacts/messaging/activity/MCP;
- responsive and state overrides.
Use the census, not this example alone, to define actual boundaries.

D. Prove structural equivalence
Add or run integrity checks that compare pre/post:
- normalized selector/declaration multiset;
- keyframes;
- media/supports/container conditions;
- custom-property references;
- effective concatenated order for rules where order is material;
- total non-comment rule count;
- generated bundle inclusion.
A simple equal line count is not sufficient. Document any intentional comment-only or whitespace difference.

E. Prove visual and behavioral equivalence
Against the Phase 01 baseline, validate representative routes in all affected surfaces at required desktop/mobile widths and themes. Include interaction states affected by the batch: focus, hover, expanded/collapsed, open dialog/drawer, loading, empty, and error where applicable. Use screenshots plus targeted computed-style/geometry assertions. Zero visual change means no unexplained pixel difference.

F. Establish ownership metadata
Update the component-style join and create/update {{DOCS_ROOT}}/06-css-ownership.md with:
- each new legacy file;
- its current owner;
- future canonical family or surface;
- selectors intentionally shared across surfaces;
- cascade dependencies;
- estimated migration wave;
- deletion condition.
Legacy modules are temporary; do not advertise them as the new design system.

G. Repeat safely
If the first batch passes, commit it independently. Continue only through additional small batches allowed by the approved task scope and repo policy. Each batch must be independently revertible and have its own evidence. Do not hide a giant split behind many commits in one PR if reviewers cannot validate it.

H. Update state
Record completed batch ids, evidence paths, remaining source ranges, and any newly discovered cascade risks. Do not mark the full phase complete until the approved monolith decomposition target is met.

VALIDATION
Run all repository-required checks plus CSS integrity, design-system/token audit, build, targeted unit/e2e tests, and visual/computed-style comparisons. Report pre-existing failures honestly.

REQUIRED FINAL RESPONSE
For each batch, report files/ranges moved, selectors/declarations/keyframes preserved, import order, baseline routes compared, visual results, validation results, and rollback commit. State clearly that no component or design decision changed.

STOP CONDITION
Stop when the current approved batch is committed and reviewed. Do not rename selectors, build canonical components, or proceed to Phase 07 merely because the mechanical split succeeded.`
  },
  {
    id: "phase-7",
    number: "07",
    group: "C · Platform construction",
    title: "Reconcile foundations without replacing the token system",
    shortTitle: "Foundation reconciliation",
    kind: "One-time with reviewed fixes",
    duration: "2–5 sessions",
    summary:
      "Audit and reconcile tokens, typography, spacing, radii, shadows, breakpoints, motion, z-index, icons, and context aliases while preserving the existing generator and Figma synchronization pipeline.",
    outcome:
      "A verified foundation contract that canonical components can safely consume, with approved drift fixed through existing token workflows and component-local geometry classified correctly.",
    why:
      "The existing token infrastructure is an asset, but canonical components need certainty about naming, runtime resolution, context/theme behavior, and which dimensions belong globally versus locally.",
    prerequisites: [
      "Approved source-of-truth contract.",
      "Current token build/audit is understood and green or its failures documented.",
      "Figma Variables access available for comparison when needed.",
      "Visual baseline exists for any approved foundation change."
    ],
    deliverables: [
      "{{DOCS_ROOT}}/07-foundation-contract.md.",
      "A token/Figma/runtime reconciliation report.",
      "Approved fixes routed through the existing token sync lane.",
      "Component-local geometry and candidate component-token register.",
      "Foundation consumption rules for new canonical components."
    ],
    exitCriteria: [
      "Canonical components have documented foundation tokens for all required roles.",
      "Runtime font and theme/context resolution is verified, not inferred.",
      "No duplicate replacement token taxonomy was introduced.",
      "Every changed token has approved before/after evidence and rollback.",
      "Component-specific dimensions are not forced into global scales without reuse evidence."
    ],
    antiGoals: [
      "Do not rewrite Style Dictionary or Tokens Studio solely for architectural neatness.",
      "Do not globalize every pixel value.",
      "Do not edit generated CSS directly.",
      "Do not combine broad brand changes with component migration."
    ],
    prompt: String.raw`You are executing Phase 07 of the Pckup Design System Migration Program.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}

PRECONDITION
Load the approved authority model, current token documentation, token JSON, generator, compatibility aliases, CSS audit, Figma sync workflow, Phase 01 baseline, and state ledger. Confirm whether this task is read-only reconciliation or includes specific owner-approved foundation fixes. Never infer authorization for a visual change.

MISSION
Produce a verified foundation contract for the new canonical component platform while preserving the robust token and Figma synchronization infrastructure that already exists. Reconcile discrepancies among reviewed token sources, generated runtime CSS, compatibility aliases, actual computed values, and Figma Variables/styles. Fix only explicitly approved drift through the existing source-of-truth workflow.

FOUNDATION AREAS
Audit at least:
- primitive and semantic color roles across light/dark and surface contexts;
- typography families, weights, sizes, line heights, letter spacing, and actual next/font runtime resolution;
- spacing scales and layout/container/gutter roles;
- border radii and border widths;
- shadows/elevation;
- focus, status, and interaction roles;
- motion duration/easing/reduced-motion behavior;
- breakpoints and responsive mode boundaries;
- z-index/layering model;
- icon sizing/stroke conventions;
- component-local geometry currently embedded in CSS.

REQUIRED WORK
A. Verify the existing source chain
Trace and document the exact path from reviewed token source to generated CSS to compatibility aliases to consumer styles to computed browser values. Trace the Figma exchange/publish path separately. Confirm which direction is authoritative for each artifact. Do not create a second generator or duplicate JSON model.

B. Compare four truths
For every foundation role required by the target catalog, compare:
1. reviewed token JSON;
2. generated CSS/custom properties;
3. actual computed runtime value in representative surfaces/themes;
4. Figma Variable/style value and binding, when accessible.
Record exact matches, aliases, stale values, unresolved fonts, missing modes/scopes/code syntax, and context-specific overrides.

C. Verify typography at runtime
Pay special attention to where next/font variables are attached versus where token aliases are resolved. Measure the computed font family/weight/size/line-height for representative headings, body text, buttons, labels, tables, and utility text. Do not claim a font is active because its token name exists. Any proposed fix that changes rendered typography is a visual change and requires owner approval plus before/after screenshots.

D. Classify dimensions correctly
Create a register separating:
- global foundation tokens with broad semantic reuse;
- context tokens for Product, Marketing, Operations, or density modes;
- component tokens justified by multiple consumers or stable component anatomy;
- intentional fixed geometry local to one component;
- accidental literals or drift.
Do not inflate the global scale with every button padding, chart dimension, or one-off layout measurement.

E. Define the canonical consumption contract
Create {{DOCS_ROOT}}/07-foundation-contract.md specifying:
- approved token names/roles new components must use;
- when direct primitive use is forbidden;
- context/theme behavior;
- typography usage by semantic role;
- spacing/radius/elevation conventions;
- focus and accessibility requirements;
- motion and reduced-motion rules;
- breakpoint ownership;
- allowed component-local values;
- how to request a new token;
- how Figma Variable names and WEB code syntax map to runtime CSS.

F. Apply only approved fixes
For each explicitly approved drift:
- change the reviewed source, not generated CSS;
- route it through the existing validation/sync/PR mechanism;
- update Figma through the approved source-of-truth direction;
- capture before/after representative screenshots and computed values;
- document consumers and risk;
- provide rollback.
Keep unrelated fixes in separate commits/PRs when they affect brand or broad rendering.

G. Validate
Run token validation/build/check/audit, typecheck, relevant tests, build, and Figma audit tools. Verify generated artifacts are clean and deterministic. Confirm no unauthorized new --pckup, compatibility, or utility alias definitions appeared outside approved sources.

H. Update catalog and state
Mark which target components now have complete foundation coverage and which still need component-local tokens or owner decisions. Update state.json without erasing prior evidence.

REQUIRED FINAL RESPONSE
Return a Phase 07 Summary with the verified source chain, match/drift counts, runtime typography findings, approved changes made, unchanged decisions, validation results, and explicit visual impact.

STOP CONDITION
Stop after the foundation contract and any separately authorized fixes are committed. Do not begin migrating component implementations in the same change set.`
  },
  {
    id: "phase-8",
    number: "08",
    group: "D · Canonical component system",
    title: "Prove the migration model with one primitive family",
    shortTitle: "Primitive pilot",
    kind: "Repeatable pilot",
    duration: "3–6 sessions",
    summary:
      "Migrate one high-value primitive family—Button by default—end to end: API, isolated styles, tests, example matrix, compatibility adapter, bounded consumers, Figma reconciliation, and Code Connect.",
    outcome:
      "A production-proven vertical slice demonstrating the exact component and migration workflow every later family will follow.",
    why:
      "The program should validate its architecture on one real, widely used primitive before scaling. Button exposes variants, link mode, loading, focus, raw-control bypasses, typography drift, and cross-surface adoption without requiring the entire application to move.",
    prerequisites: [
      "Phases 05–07 complete and approved.",
      "Target family decision exists in the component catalog.",
      "Baseline consumers and visual states identified.",
      "Figma set is published or explicitly queued for reconciliation."
    ],
    deliverables: [
      "Canonical {{FAMILY}} implementation in the target architecture.",
      "Colocated owned styles, tests, and complete state/example matrix.",
      "Compatibility adapter and migration ledger for legacy consumers.",
      "A small representative consumer migration with parity evidence.",
      "Pilot Figma/Code Connect mapping or a documented blocker."
    ],
    exitCriteria: [
      "The canonical family has a stable typed API and no route/feature dependency.",
      "All supported states pass accessibility and visual validation.",
      "At least one bounded real consumer uses the canonical component.",
      "Legacy compatibility is explicit and removable.",
      "The pilot workflow is documented for reuse and no broad regression appears."
    ],
    antiGoals: [
      "Do not migrate every consumer in the pilot PR.",
      "Do not preserve accidental legacy API forever.",
      "Do not map Code Connect to a wrapper scheduled for deletion.",
      "Do not turn product-specific behavior into primitive variants."
    ],
    prompt: String.raw`You are executing Phase 08 of the Pckup Design System Migration Program: the canonical primitive pilot.

Repository: {{REPO}}
Figma library URL supplied locally: {{FIGMA_URL}}
Migration documentation root: {{DOCS_ROOT}}
Agent/runtime: {{AGENT}}
Pilot component family: {{FAMILY}}

DEFAULT
Unless the approved target catalog says otherwise, use Button as the pilot. If {{FAMILY}} is not approved for this wave, stop and report the mismatch rather than substituting silently.

PRECONDITION
Load state.json, the approved target catalog entry, equivalence evidence, baseline captures, foundation contract, repository architecture contract, and applicable policies. Identify every current implementation/consumer of the pilot family and select a small low-risk representative migration scope. Do not migrate the whole repository in one PR.

MISSION
Build one canonical, production-grade primitive family end to end and prove the strangler migration workflow. Preserve existing behavior and appearance unless a specific owner-approved normalization is recorded. The canonical component must become the long-term API; legacy wrappers are temporary migration tools.

REQUIRED WORK
A. Reconfirm the family contract
Before coding, produce a concise contract from evidence:
- semantic purpose and non-goals;
- native element(s);
- public props;
- variants, sizes, states, and content/slot model;
- accessibility and keyboard behavior;
- link versus button behavior if applicable;
- loading/disabled interaction;
- theme/context behavior;
- responsive behavior;
- foundation and component-local values;
- existing Figma property model;
- legacy APIs/classes to adapt or retire.
Reject variant axes that represent product-specific workflow rather than reusable presentation/behavior.

B. Implement in the approved target layer
Create the canonical component under the Phase 05 architecture. Requirements:
- strict, exported TypeScript props;
- semantic native markup;
- explicit server/client boundary;
- no imports from routes, features, auth providers, data stores, or page styles;
- colocated owned styling using the approved isolation method;
- foundation tokens from Phase 07;
- component-local geometry only where documented;
- stable data attributes/classes only when genuinely part of the contract;
- no dependency on the legacy global stylesheet for its canonical appearance.

C. Preserve necessary compatibility through an adapter
Create or update a clearly marked migration adapter only if existing consumers require legacy props, class names, or link behavior. The adapter must:
- call the canonical component;
- contain no new visual implementation;
- log or expose deprecation metadata in the migration manifest;
- list every consumer;
- have a removal condition and wave;
- not become the Code Connect target.
Do not change the canonical API merely to emulate every accidental legacy call site.

D. Build the state and test matrix
Use the existing internal design-system reference or UI lab to render every supported state and meaningful combination. Include relevant default/hover/focus-visible/pressed/disabled/loading/link/content states and both themes. Keep the matrix bounded; do not produce a combinatorial explosion where axes do not affect structure.

Add tests for:
- semantic element and attributes;
- keyboard/focus behavior;
- disabled/loading behavior;
- prop-to-state mapping;
- class/style isolation;
- theme token resolution;
- no route/feature imports;
- adapter parity;
- accessibility expectations;
- representative visual snapshots or screenshots.

E. Select a bounded real adoption slice
Migrate a small, representative set of consumers spanning at most a few controlled contexts. Prefer low-risk internal/reference/auth or another approved surface slice. For each consumer:
- record before implementation, props, classes, screenshot, and behavior;
- replace with canonical component or adapter;
- preserve analytics, links, form submission, focus, and permissions;
- remove only selectors proven exclusive to migrated consumers;
- update consumer counts in the ledger.
Do not bulk-replace raw buttons by search-and-replace.

F. Reconcile Figma for the pilot
If the corresponding published Figma component exists:
- inspect its exact properties, variants, bindings, description, and visual values;
- reconcile against the approved code contract;
- fix discrepancies in the authoritative direction with explicit decision records;
- bind visual properties to the correct variables;
- ensure every supported value is represented without inventing product states;
- publish only after visual and structural validation.
If no acceptable component exists, create the pilot component through the approved Figma workflow after posting a phase checklist and validating variables first.

G. Establish Code Connect for the pilot
Map the published canonical Figma node to the canonical code entrypoint, not the adapter. Use the current supported template format and exhaustively map Figma property values to actual code props. Validate the mapping in Dev Mode/MCP and record the node id, source, component name, label, and template status in the manifest. If access or plan blocks publishing, stage the exact template and record the blocker honestly.

H. Measure the pilot
Record before/after:
- canonical versus legacy consumer count;
- raw control count for the migrated slice;
- legacy CSS bytes/selectors removed;
- bundle or style-loading impact if measurable;
- visual diff results;
- test coverage;
- Figma and Code Connect status;
- implementation time and problems in the workflow.
Use these findings to refine the component contract template before scaling.

I. Validation and rollback
Run all repository-prescribed checks, targeted unit/e2e tests, design-system/token checks, build, and visual/computed-style comparison. Provide an independently revertible commit/PR and a rollback procedure that restores the migrated consumers without affecting unrelated migration artifacts.

J. Documentation and state
Create {{DOCS_ROOT}}/components/{{FAMILY}}.md and {{DOCS_ROOT}}/08-pilot-retrospective.md. Update component manifest, target catalog, consumer ledger, deprecation register, Code Connect map, and state.json.

REQUIRED FINAL RESPONSE
Return a Phase 08 Summary with the final API, files created/changed, consumers migrated, parity evidence, tests, CSS removed, Figma/Code Connect result, remaining legacy consumers, and pilot lessons that alter later phases.

STOP CONDITION
Stop after the bounded pilot is reviewed and committed. Do not migrate all remaining primitives or enforce repository-wide raw-control bans in this phase.`
  }
]);
