window.PCKUP_PHASES.push(
  {
    id: "phase-5",
    code: "P5",
    number: 5,
    title: "Governance baseline and warning-only guardrails",
    subtitle: "Stop new design debt from growing while the replacement path is being built.",
    tags: ["governance", "CI", "warning only"],
    dependsOn: "P4",
    objective: "Create measurable governance that reports new design debt without prematurely blocking legitimate work before canonical replacements exist.",
    outputs: [
      "scripts/design-system-migration/governance.*",
      "docs/design-system-migration/governance/policy.md",
      "docs/design-system-migration/governance/baseline.json",
      "docs/design-system-migration/governance/exceptions.json",
      "docs/design-system-migration/governance/adoption-dashboard.json",
      "focused governance tests and CI wiring"
    ],
    gate: "Every governed debt class has a reproducible baseline, ownership, exception process, and warning-only CI reporting that detects regression without blocking the existing product migration.",
    prompt: `Execute Phase P5: GOVERNANCE BASELINE AND WARNING-ONLY GUARDRAILS.

PREREQUISITE
Read state.json and all approved P0-P4 artifacts. Stop if the target architecture, component contract, CSS strategy, or migration plan is not approved and current against main.

PURPOSE
Prevent the design architecture from getting worse while canonical replacements are being built. Add deterministic governance in WARNING-ONLY mode. Do not make new checks blocking unless the approved P4 plan explicitly authorizes a rule whose compliant replacement already exists.

THIS IS NOT A MASS AUTO-FIX PHASE
Do not rewrite components, replace raw controls, move CSS, or change visuals. Measure current debt and report unexplained growth.

GOVERNED DEBT CLASSES
Build checks for at least:
1. Raw button, input, select, textarea, dialog, details/summary, interactive-role, and anchor-as-button usage outside approved low-level implementation files.
2. New globally scoped component selectors outside approved base, legacy, generated, or surface-owned stylesheets.
3. New inline visual styles, distinguishing genuinely data-driven values from avoidable presentation.
4. New hardcoded colors, radii, shadows, spacing, typography, and z-index values beyond existing token/literal governance. Reuse existing audits.
5. New reusable-looking components outside approved design-system or feature-local boundaries.
6. New forbidden cross-layer imports.
7. New unregistered public/shared exports.
8. Growth of oversized UI/CSS files beyond recorded ceilings.
9. New Figma or Code Connect references absent from the canonical manifest.
10. New legacy selector consumers after a family enters migration.

IMPLEMENTATION REQUIREMENTS
- Extend P1 census/parser infrastructure rather than building unrelated scanners.
- Baseline debt by stable finding ID, file, AST/line location, rule, owner class, and disposition.
- Warn only for a new finding, unexplained movement, severity change, or baseline mismatch; do not spam unchanged debt.
- Produce deterministic machine JSON and concise CI annotations.
- Support reviewed exceptions with reason, owner, scope, expiration/review condition, and replacement path. Prevent the exception registry from becoming a hidden second baseline.

POLICY
Document each rule, purpose, current mode, approved low-level zones, exception process, warning-to-blocking criteria, retirement process, legacy-family freeze behavior, and false-positive ownership.

BASELINE AND DASHBOARD
Create baseline.json, exceptions.json with schema validation, and adoption-dashboard.json containing canonical usage, raw-control count, legacy CSS bytes, owned-selector percentage, mapped-component percentage, unclassified-pattern count, and active wave. Every metric needs numerator, denominator, method, and honest nulls.

CI INTEGRATION
Add a fast warning-only step using repository conventions. It must avoid secrets, distinguish tool failure from findings, avoid duplicating token checks, produce an artifact/annotations, and have one documented local command.

FREEZE MECHANISM
Allow migration-plan units to mark a legacy family frozen. Existing consumers remain temporarily allowed; new imports/classes are violations. The declaration belongs in machine migration state, not duplicated scanner code.

VALIDATION
Plant/remove representative violations for every rule. Prove unchanged main creates no new-debt warnings beyond baseline status. Prove no visual/behavioral product change. Run required checks and publish the governance report.

STATE UPDATE
Record governance revision, baseline commit, rules/modes, exceptions, adoption metrics, and P5 completion.

EXIT RESPONSE
Report each rule, baseline count, false-positive handling, CI behavior, adoption metrics, and exact conditions before blocking enforcement. Do not begin CSS decomposition or component migration.`
  },
  {
    id: "phase-6",
    code: "P6",
    number: 6,
    title: "Mechanical CSS ownership decomposition",
    subtitle: "Split giant global stylesheets without changing a pixel or selector contract.",
    tags: ["CSS", "visual neutral", "ownership"],
    dependsOn: "P5",
    objective: "Convert utility.css, platform.css, and related global bundles into explicitly owned legacy modules while preserving exact cascade order, selector behavior, and rendered output.",
    outputs: [
      "docs/design-system-migration/css/split-plan.json",
      "docs/design-system-migration/css/selector-ownership.json",
      "docs/design-system-migration/css/cascade-contract.md",
      "legacy CSS modules and compatibility import facades",
      "visual-equivalence evidence"
    ],
    gate: "Target giant stylesheets are mechanically decomposed into owned modules, emitted cascade is equivalent, regression evidence is green, and no selector or consumer was semantically redesigned.",
    prompt: `Execute Phase P6: MECHANICAL CSS OWNERSHIP DECOMPOSITION.

PREREQUISITE
Read state.json and P0-P5 artifacts. The selector census, visual baseline, CSS strategy, and governance baseline must be current. Stop if import order or ownership data is incomplete for a target stylesheet.

PURPOSE
Make CSS ownership understandable before migrating components. Mechanically decompose utility.css and platform.css according to the approved P4 plan. This is a ZERO-INTENTIONAL-VISUAL-CHANGE phase.

NON-NEGOTIABLES
- Do not rename selectors.
- Do not rewrite declarations for cleanliness.
- Do not change specificity.
- Do not reorder rules, media queries, keyframes, layers, or imports unless exact equivalence is proven.
- Do not replace compatibility aliases with new tokens here.
- Do not extract React components here.
- Do not delete apparently unused CSS unless an exact isolated block is proven unreachable through static, dynamic, runtime, and test evidence; default is retain.
- Keep load-bearing comments with their rules.

SPLIT PLAN BEFORE MUTATION
Create split-plan.json. For every contiguous source block record stable ID, original file/range, heading/comment identity, selectors/keyframes/media context, known consumers/surface, destination module, import sequence, confidence/unknown ownership, adjacency constraints, and checksum.

LEGACY STRUCTURE
Use the approved CSS strategy. Separate foundation, shell, navigation, controls, overlays, shared data display, and feature-specific sections based on evidence while preserving source order. The result is a LEGACY OWNERSHIP DECOMPOSITION, not final component styling. Keep a compatibility entry point so route layouts do not need a risky all-at-once import rewrite.

CASCADE CONTRACT
Document exact import order, base/token dependencies, specificity assumptions, media-query ordering, duplicated order-sensitive selectors, keyframes, :has/portal/fixed-layer/theme dependencies, and the process for later removing blocks.

IMPLEMENTATION
1. Build/extend a CSS parser-based extraction/check utility.
2. Extract contiguous blocks while preserving source text.
3. Replace giant files with a thin documented import facade or approved import wiring.
4. Generate selector-ownership.json.
5. Check that no block is duplicated, dropped, or reordered relative to declared sequence.
6. Update P5 governance paths without resetting debt history.

VISUAL AND BEHAVIORAL PROOF
Use P2 evidence for utility shell desktop/mobile navigation, overlays/dialogs, Changelog, CMS/SEO, Visitor, auth/estimate forms, dashboard/courier shell, marketing navigation/cards, themes, and captured interaction/data states. Any unexplained difference blocks completion.

ROLLBACK
Keep the pull request trivially reversible. Record old-to-new mapping and prove concatenation in declared order reconstructs original rule content modulo documented wrappers.

VALIDATION
Parse all CSS, prove every original rule exists exactly once, prove order equivalence, preserve token authority, run visual/interaction gates, and confirm product source changed only for required import/facade wiring.

STATE UPDATE
Record CSS revision, old/new sizes, owned-selector percentage, unresolved blocks, visual evidence revision, and P6 completion.

EXIT RESPONSE
Report split map, cascade constraints, unresolved ownership, sizes, validation, screenshot comparison, and proof this was structural only. Do not begin component extraction.`
  },
  {
    id: "phase-7",
    code: "P7",
    number: 7,
    title: "Canonical core primitives",
    subtitle: "Build the missing component layer and migrate bounded, high-value consumers.",
    tags: ["primitives", "React", "compatibility adapters"],
    dependsOn: "P6",
    objective: "Create production-grade primitives with explicit APIs, owned styles, tests, manifests, and safe adapters, then prove them in bounded flows.",
    outputs: [
      "src/design-system/foundations/**",
      "src/design-system/primitives/**",
      "canonical manifest entries",
      "compatibility adapters and deprecation metadata",
      "first bounded consumer migrations",
      "primitive adoption evidence"
    ],
    gate: "Approved core primitives exist as canonical production components, preserve behavior/appearance for migrated consumers, have no hidden legacy dependency, and are adopted by a bounded surface wave.",
    prompt: `Execute Phase P7: CANONICAL CORE PRIMITIVES.

PREREQUISITE
Read state.json and P0-P6 artifacts. Stop if taxonomy, architecture, CSS ownership, or governance is stale. Follow approved component contracts; do not casually reopen P3 decisions.

PURPOSE
Create the canonical component layer missing between tokens and pages. Implement approved primitives in src/design-system, preserve compatibility for existing consumers, and migrate a bounded proving wave. Do not attempt repository-wide adoption.

SCOPE
Implement the approved subset, in dependency order:
- Button
- IconButton
- LinkButton or approved polymorphic behavior
- TextField and field foundation
- Textarea
- Select
- Checkbox
- Radio and/or OptionTile
- Badge/Status primitive
- Spinner/Progress indicator
- Divider and other approved foundations
Do not add a family P3 did not approve merely because other design systems have it.

FOR EACH COMPONENT
1. Read all current implementations, selector blocks, consumers, screenshots, tests, and Figma counterparts.
2. Define one typed public API representing approved semantics, not every historical prop.
3. Document non-goals and feature behavior that stays outside.
4. Implement accessibility, keyboard/native semantics, disabled/loading behavior, focus, refs, and attribute forwarding.
5. Own styles in the P4 mechanism and consume existing generated tokens only.
6. Preserve legitimate variants. Visual reconciliation requires an approved decision and evidence.
7. Add unit, interaction, accessibility, visual/reference examples.
8. Add manifest metadata including Figma and Code Connect status.
9. Add compatibility adapters/class hooks/re-exports only where required, with measurable deletion conditions.
10. Freeze the legacy family against new consumers.

MIGRATION BOUNDARY
Choose one approved bounded proving wave, preferably authentication, estimate/order, or courier application. Migrate only enough consumers to validate primitives across representative states.

For every migrated consumer preserve route behavior, copy, validation, analytics, data flow, accessibility, and current appearance unless explicitly approved. Remove only legacy usage that reaches zero; retain adapters for unmigrated consumers.

DO NOT
- migrate every raw control;
- make Button absorb every utility pill role;
- move business logic into primitives;
- let new style ownership silently change cascade;
- publish Code Connect before API stability;
- delete entire legacy stylesheets.

QUALITY GATES
Type/API tests, native semantics/keyboard tests, focus/disabled/loading/error/theme tests, P2 screenshots for migrated routes, no-new-legacy usage scans, dependency checks, and existing token/design-system checks.

ARTIFACTS AND STATE
Update component manifest, migration queue, retirement candidates, adoption dashboard, decision log, reference documentation, adapters, evidence, and state.json.

EXIT RESPONSE
For each primitive report API, states, accessibility, style owner, consumers migrated/remaining, adapter/deletion status, tests, and visual evidence. Do not begin behavioral components.`
  },
  {
    id: "phase-8",
    code: "P8",
    number: 8,
    title: "Behavioral components and interaction foundations",
    subtitle: "Unify overlays, disclosures, complex inputs, and feedback without flattening real product differences.",
    tags: ["dialogs", "interaction", "accessibility"],
    dependsOn: "P7",
    objective: "Create shared behavioral foundations beneath duplicated dialogs, drawers, popovers, disclosures, complex inputs, and state feedback, with bounded migrations.",
    outputs: [
      "src/design-system/components/** behavioral families",
      "shared overlay/focus foundations",
      "updated component manifest and adapters",
      "bounded overlay and complex-input migrations",
      "interaction regression evidence"
    ],
    gate: "Approved behavioral families share canonical foundations, migrated consumers preserve interaction/security behavior, and remaining surface wrappers are intentional rather than accidental duplicates.",
    prompt: `Execute Phase P8: BEHAVIORAL COMPONENTS AND INTERACTION FOUNDATIONS.

PREREQUISITE
Read state.json and P0-P7 artifacts. Core primitives must be stable, production-proven, and composable. Stop if primitive behavior or adapters remain unstable.

PURPOSE
Consolidate duplicated interaction behavior without creating a universal mega-component. Establish accessible foundations for overlays, disclosures, complex inputs, and feedback states, then migrate bounded consumers. Preserve legitimate surface-specific policy and composition.

APPROVED SCOPE
Implement only approved families, typically:
- Dialog foundation plus ConfirmDialog/UtilityDialog-style wrappers
- Drawer/Sheet
- Popover and Menu where semantics differ
- Tooltip
- Disclosure/Accordion
- Tabs
- Combobox
- FileUpload
- Notice/Banner/Toast per approved taxonomy
- EmptyState, ErrorState, LoadingRegion, Skeleton
- other explicitly queued P8 families

DIALOG AND OVERLAY RECONCILIATION
Inspect native dialog and portal/focus-trap implementations. Define modal/non-modal semantics, focus trap/return, initial focus, Escape/backdrop behavior, body locking/nesting, aria labels/descriptions, busy close behavior, portal/client boundary, stacking contract, mobile presentation, and confirmation composition. Do not remove a surface wrapper carrying legitimate auth, data, or policy behavior. Shared layers own mechanics; wrappers own feature content/policy.

COMPLEX INPUTS
For Combobox/FileUpload preserve form integration, validation, async states, keyboard navigation, announcements, option identity, upload lifecycle, and safe fixtures. Separate low-level behavior from address, phone, payment, and domain logic. Compose existing primitives.

FEEDBACK STATES
Define informational, success, warning, danger, muted, loading, empty, locked, and unavailable taxonomy. Avoid one component with unrelated modes; use composition when structures differ.

QUALITY CONTRACT
Each component needs typed API/slots, controlled behavior where justified, state model, accessibility contract, token dependencies, owned styles, tests, examples, manifest metadata, Figma/Code Connect disposition, and adapter/deletion condition.

MIGRATION BOUNDARY
Choose bounded queues such as auth dialogs, estimate confirmation/upload, courier application disclosures/uploads, one utility dialog flow, or one menu/popover family. Do not migrate all utility/marketing overlays in one PR.

SECURITY AND PRIVACY
Do not weaken auth gates, access walls, destructive confirmations, CSRF, payment, privacy disclosures, or sensitive data handling. Run independent security review covering event ordering, portal boundaries, serialized props, and stale async state.

VALIDATION
Keyboard matrices, labelling/announcement tests, focus return/nesting, Escape/backdrop/busy behavior, mobile/desktop screenshots, themes, governance scans, and zero-use proof before deletion.

STATE UPDATE
Record canonical behavioral IDs, migrated wrappers/consumers, retained wrappers/reasons, adapter usage, evidence, and P8 completion.

EXIT RESPONSE
Summarize shared foundations, old implementations subsumed, intentional wrappers retained, migrated consumers, security/accessibility proof, and remaining queue. Do not begin product patterns or shells.`
  }
);
