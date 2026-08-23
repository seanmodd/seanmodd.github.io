window.PCKUP_PHASES.push(
  {
    id: "phase-9",
    code: "P9",
    number: 9,
    title: "Product patterns and data-display system",
    subtitle: "Consolidate recurring structures without building a prop-driven mega-library.",
    tags: ["patterns", "tables", "composition"],
    dependsOn: "P8",
    objective: "Create canonical patterns for cards, headers, filters, data display, navigation, and product summaries, then migrate bounded consumers using composition.",
    outputs: [
      "src/design-system/patterns/**",
      "approved data-display and composition contracts",
      "updated component manifest and adoption metrics",
      "bounded pattern migration waves",
      "responsive and visual regression evidence"
    ],
    gate: "Approved patterns have clear semantic boundaries, migrated consumers preserve behavior/responsive output, and feature-specific compositions remain local when reuse is not proven.",
    prompt: `Execute Phase P9: PRODUCT PATTERNS AND DATA-DISPLAY SYSTEM.

PREREQUISITE
Read state.json and P0-P8 artifacts. Primitives and behavioral foundations must be stable and available for composition. Stop if the targeted pattern taxonomy is unresolved.

PURPOSE
Consolidate recurring structures currently expressed as global CSS, route-local JSX, copied tables/cards, and partial Figma prototypes. Build canonical patterns only where evidence proves repeated semantic use. Do not convert every page section into a shared component or create mega-components with historical flags.

APPROVED SCOPE
Implement only approved families, typically:
- Card and Panel foundations with explicit roles
- PageHeader and SectionHeader
- approved ActionRow composition
- FilterBar and query/filter control composition
- MetricCard
- RecordCard and responsive record-list pattern
- DataTable foundation and responsive strategy
- Pagination
- NavigationItem/application-navigation pattern
- Stepper/ProgressSteps if still pending
- ReviewBlock
- RouteSummary
- QuoteSummary
- other queued evidence-backed patterns

BOUNDARY RULES
1. Patterns compose primitives around repeated product structure; they do not absorb business logic.
2. Page compositions stay feature/route-local when reuse is weak.
3. Visual similarity alone does not merge semantically different cards.
4. DataTable separates generic behavior from feature columns, queries, permissions, sorting, and actions.
5. Desktop-table/mobile-card behavior has one documented parity contract unless evidence requires separate structures.
6. Navigation patterns do not own authorization or product registry data.
7. Domain summaries expose domain-neutral composition only when P3 approved it; otherwise retain feature wrappers.

FOR EACH PATTERN
Inspect current implementations, consumers, selectors, screenshots, states, and tests. Document purpose/non-goals, anatomy/slots, responsive/overflow behavior, loading/empty/error/selected/current/hover/action states, accessibility, owned styles, tests, examples, manifest metadata, Figma disposition, Code Connect plan, adapters, and deletion condition. Freeze the legacy family against new consumers.

MIGRATION WAVES
Choose bounded contexts proving real reuse, for example one dashboard list/mobile record view, one courier list/detail, one utility table/filter, one estimate review/quote, and an approved marketing composition. Keep each unit reviewable and reversible.

DATA-TABLE SAFETY
Preserve column semantics, headers, sorting/filtering/pagination, row links/actions, tab order, captions/names, numeric alignment/truncation, sticky/scroll behavior, mobile parity, data states, authorization, and feature actions. Do not trade working tables for a generic component unable to express behavior.

VALIDATION
Run P2 comparisons for every migrated context, interaction tests for filters/sorting/pagination/row actions/selection/responsive transitions, zero-use scans before deletion, governance/adoption updates, and dependency checks proving patterns do not import feature/route modules.

STATE UPDATE
Record canonical pattern IDs, migrated consumers, retained local compositions/reasons, legacy usage, evidence, metrics, and P9 completion.

EXIT RESPONSE
Report each pattern's purpose, API/composition, migrated contexts, responsive/accessibility proof, remaining consumers, and rejected over-generalizations. Do not begin shell consolidation or Figma mutation.`
  },
  {
    id: "phase-10",
    code: "P10",
    number: 10,
    title: "Shell and navigation consolidation",
    subtitle: "Unify application chrome while preserving every security and product boundary.",
    tags: ["shells", "navigation", "high risk"],
    dependsOn: "P9",
    objective: "Create shared shell foundations for auth, flows, customer/courier portals, marketing, and operations without merging distinct authorization, registry, or business behavior.",
    outputs: [
      "src/design-system/shells/**",
      "shared shell foundations and surface adapters",
      "navigation registry contracts",
      "incremental shell migration evidence",
      "retired duplicate structural code after zero usage"
    ],
    gate: "Each approved shell shares the structural layer, surface-specific security/behavior remains explicit, representative routes are migrated safely, and duplicate code is retired only after zero usage.",
    prompt: `Execute Phase P10: SHELL AND NAVIGATION CONSOLIDATION.

PREREQUISITE
Read state.json and P0-P9 artifacts. Primitives, behavior, patterns, and CSS ownership must be stable. Treat this as HIGH-RISK because shells intersect auth, navigation, hydration, responsive behavior, analytics, and serialized state.

PURPOSE
Replace accidental structural duplication with approved shell foundations while preserving distinct policy and business behavior. A common shell foundation does not merge customer, courier, utility, auth, and marketing security models.

TARGET SHELL FAMILIES
Follow approved taxonomy, typically:
- AuthShell
- FlowShell for estimate/order and courier application where supported
- PortalShell beneath customer dashboard and courier workspace
- OperationsShell for internal utility
- MarketingShell/public foundations where reuse is proven
- small shared shell subcomponents such as header, sidebar, mobile navigation, content, skip link, account area, and navigation item
Do not create UniversalShell with every mode.

DISCOVERY BEFORE MUTATION
Compare server/client boundaries, auth/role/capability gates, redirects/recovery, serialized props/privacy, navigation registries/current matching, desktop rail/sidebar, mobile drawer/tray, theme/first-paint scripts, sticky/fixed geometry/safe areas, account/sign-out/notifications, loading/error/locked states, emulation/preview, analytics/consent, and existing tests.

PORTAL RECONCILIATION
DashboardShell and CourierWorkspaceShell share structure but different role/approval behavior. Extract only sidebar/drawer, scrim/Escape, topbar, content landmark, navigation rendering, mobile handoff, and theme/account slots. Keep customer auth routing, courier approval, emulation, destination registries, and labels in explicit adapters.

OPERATIONS SAFETY
Preserve server utility session/capability boundaries, anonymous gate and disclosure protection, page-level checks, notification privacy, rail continuity/pinning, mobile tray, first-paint preferences, freshness/account controls, and overlay layering. Do not combine shell migration with feature redesigns.

NAVIGATION CONTRACT
Create/reconcile a typed registry supporting stable destination IDs, href/current matching, labels/icons/groups, mobile/desktop metadata, surface-supplied capability filtering, emulation rebasing, and Figma mapping status. Prevent sidebar/drawer/rail/tray lists from drifting.

MIGRATION ORDER
Use small units: low-level shell components; Auth/Flow proving wave; Portal customer adapter; courier adapter; Operations seams; Marketing if approved. Keep P10 active across multiple unit PRs if needed.

VALIDATION
Run server/client/hydration tests; auth/role/approval/capability/redirect/logout/locked tests; keyboard/focus/Escape/drawer/rail/skip-link tests; desktop/mobile/theme screenshots; first-paint/layout-shift checks; privacy review of serialized props; zero-use proof before deletion; governance/adoption updates.

STATE UPDATE
Record shell IDs, migrated adapters/routes, retained policy boundaries, security evidence, duplicate code removed, remaining queues, and P10 completion.

EXIT RESPONSE
Explain exactly what became shared, what remains surface-specific, security preservation, routes migrated, evidence, remaining duplicates, and deletion proof. Do not mutate Figma or publish Code Connect.`
  },
  {
    id: "phase-11",
    code: "P11",
    number: 11,
    title: "Figma canon and Code Connect reconciliation",
    subtitle: "Make Figma represent the canonical code system, not historical implementation noise.",
    tags: ["Figma Enterprise", "Code Connect", "design contract"],
    dependsOn: "P10",
    objective: "Reconcile the existing Figma library with canonical production components, bind variables, document variants, and publish parserless Code Connect mappings to real exports.",
    outputs: [
      "reconciled Pckup Figma design-system library",
      "canonical Figma component registry",
      "parserless .figma.ts Code Connect templates",
      "Figma-to-code coverage report",
      "published library and Dev Mode verification evidence"
    ],
    gate: "Every approved production library component maps to a canonical code export, variables/properties are correct, prototype assets are classified, Code Connect is published/verified, and no Figma change bypasses Git review for production code.",
    prompt: `Execute Phase P11: FIGMA CANON AND CODE CONNECT RECONCILIATION.

PREREQUISITE
Read state.json and P0-P10 artifacts. Canonical primitives, behavioral components, patterns, and shells must have stable APIs and production evidence. Stop if a target family remains under API redesign. Connect official Figma MCP and use the canonical Pckup design-system file recorded in repository contracts.

PURPOSE
Turn the existing Figma library into the design-side representation of the approved canonical code system. Reuse and repair what exists. Do not recreate blindly, export every rogue implementation, or use Figma to overwrite production behavior.

DISCOVERY GATE BEFORE FIGMA WRITES
1. Publish a Phase 11 checklist with stable IDs.
2. Inspect Figma read-only: pages, collections/modes, styles, published components, descriptions, prototype sets, bindings, library state, and Code Connect.
3. Inspect canonical contracts, source, tests, examples, and migration status.
4. Discover libraries and search existing design-system assets before creating anything.
5. Produce code ↔ Figma gap analysis and exact mutation plan.
6. Ask for approval only at genuine scope/decision forks required by the Figma workflow. Do not mutate before discovery passes.

FIGMA TAXONOMY
Organize into governed layers: Foundations, Core, Product, Operations, Documentation/Migration/Archive. A single file may initially contain these pages if splitting libraries would disrupt consumers; document future boundaries rather than forcing a risky split.

FOR EACH CANONICAL COMPONENT
1. Inspect existing Figma component/set.
2. Decide reuse, update, merge, split, create, deprecate, archive, or local-only from approved registry.
3. Match stable TypeScript API and supported states without mirroring internal props.
4. Bind visual properties to existing variables/styles.
5. Set correct scopes and WEB syntax; preserve semantic aliases.
6. Use TEXT, BOOLEAN, VARIANT, INSTANCE_SWAP, and SLOT only when semantically correct.
7. Use instance swap for icons, not variant explosion.
8. Keep variant matrices bounded and split distinct roles.
9. Add descriptions, usage, accessibility, do/don't, and canonical source metadata.
10. Validate metadata and screenshots before the next component.
11. Record node IDs/component keys in the canonical registry.

PROTOTYPE ASSETS
Classify every non-canonical/prototype asset as promote after reconciliation, composition/reference, feature-local design asset, superseded/archive, or unresolved. Do not delete or broadly publish without evidence. Visually separate canonical library assets from prototypes.

CODE CONNECT
Use current parserless templates:
- create .figma.ts, not new .figma.tsx mappings;
- map only published canonical Figma components to real canonical exports;
- use exact node URLs/IDs and exhaustive property metadata;
- map only real TypeScript props and every enum value;
- handle nested connected components, instance swaps, and slots correctly;
- version templates in approved locations;
- configure Figma types;
- parse/validate before publish;
- publish through owner-managed Enterprise credentials without committing secrets.

Do not map CSS-only patterns, page compositions, Figma-only prototypes, retired components, or multiple legacy implementations when one canonical export exists.

OPERATING MODEL
Figma owns approved visual anatomy/properties/tokens. TypeScript owns API/behavior/accessibility/business integration. Code Connect identifies the relationship. Figma publish may trigger a reviewed agent workflow but never writes directly to main. Code API changes require Figma/Code Connect reconciliation when the design contract changes.

GITHUB ARTIFACTS
Update Figma component registry, Code Connect templates/config, coverage report, unresolved drift, component manifest, usage docs, migration state, and metrics.

VALIDATION
Validate every Figma component structurally/visually; audit bindings/naming/accessibility/hardcoded visuals; parse templates with zero errors; publish and verify Dev Mode snippets and nested components; run repo checks; capture library/Dev Mode screenshots.

STATE UPDATE
Record Figma revision/publish evidence, node map, Code Connect coverage, unresolved assets, and P11 completion.

EXIT RESPONSE
Report assets reused/created/merged/archived, binding audit, published mappings, coverage numerator/denominator, Dev Mode proof, unresolved decisions, and governing workflow. Do not begin broad surface migration.`
  },
  {
    id: "phase-12",
    code: "P12",
    number: 12,
    title: "Surface waves, legacy retirement, and steady state",
    subtitle: "Move every remaining surface, delete the old path, and make the new workflow mandatory.",
    tags: ["repeatable waves", "legacy deletion", "blocking CI"],
    dependsOn: "P11",
    objective: "Run one approved migration unit at a time until all surfaces use canonical components, then remove legacy paths, escalate governance, and close the program.",
    outputs: [
      "completed migration queue and per-wave evidence",
      "zero-use legacy deletion proofs",
      "blocking design-system governance",
      "final adoption and coverage report",
      "steady-state component workflow documentation",
      "program closeout and rollback archive"
    ],
    gate: "All approved surfaces are migrated, legacy consumers are zero, retired code/CSS is removed, governance is blocking with reviewed exceptions, Figma/Code Connect coverage is complete for canonical published components, and the future workflow is operational.",
    prompt: `Execute Phase P12: NEXT SURFACE MIGRATION WAVE, LEGACY RETIREMENT, AND STEADY STATE.

IMPORTANT EXECUTION MODEL
P12 IS REPEATABLE. ONE INVOCATION EQUALS ONE APPROVED MIGRATION UNIT OR ONE FINAL CLOSEOUT UNIT. Do not migrate every remaining surface in one pull request. Read state.json, select the next READY queue item, execute only that unit, merge/verify/update state, then stop. Use a fresh session for the next unit.

PREREQUISITE
P0-P11 must be complete. Canonical components, Figma, Code Connect, evidence baselines, governance, CSS ownership, and migration queue must be current. If P11 is incomplete, do not begin broad migration.

SELECT EXACTLY ONE UNIT
Choose the highest-priority READY item with dependencies complete. State baseline main commit, unit ID/surface/family, exact routes/components/selectors, canonical replacements, expected files, out-of-scope surfaces, rollback, and evidence IDs. If none is READY, report the blocker.

MACRO WAVES
Subdivide into safe PR-sized units:
A. Authentication, estimate/order, and courier application.
B. Customer dashboard and courier workspace content after shells are proven.
C. Shared utility/operations foundations.
D. Complex utility products: Changelog, CMS, SEO, Visitor Tracker, Reports, Messaging, Activity Logs, MCP/configuration, and other tools, one feature at a time.
E. Marketing, public navigation, consent, AI/chat, and other public surfaces.
F. Final legacy cleanup, compatibility reduction, and governance escalation.
Follow actual queue dependencies.

FOR A MIGRATION UNIT
1. Re-run the target census slice against current main.
2. Load route/state evidence.
3. Confirm P3 classification/replacement and P4 dependency rules.
4. Freeze legacy family against new consumers.
5. Replace bounded consumers with canonical components/wrappers.
6. Preserve copy, analytics, business logic, APIs, data states, permissions, validation, route behavior, accessibility, and approved visuals.
7. Update tests before deleting behavior.
8. Update Figma composition only if product contract changes; do not casually alter canonical APIs.
9. Update Code Connect only if mapping/public properties change.
10. Re-run usage scans.
11. Delete only paths with exactly zero proven consumers after dynamic/runtime analysis.
12. Update ledger, manifest, retirement list, dashboard, evidence, decisions, state, handoff, and reports.
13. Complete independent reviews, merge, deploy, verify, publish evidence/transcript, then mark only that unit complete.

VALIDATION
Use required desktop/mobile, themes, data states, focus/keyboard, overlay/navigation, auth/role paths, responsive transitions, and performance/layout-shift evidence. Any unexplained regression blocks deletion/completion.

LEGACY DELETION PROOF
For every removed path provide static imports zero, selector consumers zero, dynamic/string usage analysis, runtime evidence, tests, replacement ID, and rollback. If incomplete, retain adapter and report partial migration.

GOVERNANCE ESCALATION
Only after a replacement is available and baseline debt migrated/excepted, promote warning rules to blocking in a dedicated unit: no raw shared controls outside primitive internals; no new global component selectors; no unregistered shared exports; no forbidden dependencies; no new legacy consumers; no unmapped published canonical Figma components; no expired exceptions; no oversized-file growth beyond approved ceilings.

FINAL CLOSEOUT UNIT
When required queue is empty:
1. Run complete census vs P0/P1 baseline.
2. Produce final metrics with numerator/denominator/method: canonical adoption, raw controls, legacy CSS, owned selectors, unclassified patterns, legacy consumers, Figma coverage, Code Connect coverage, evidence coverage, exceptions.
3. Verify every shared component has owner/manifest.
4. Verify required blocking gates are green.
5. Verify approved Figma components are published/bound/documented/mapped.
6. Verify every major surface passes behavior/accessibility/visual/security gates.
7. Archive migration-only adapters/tools according to policy without deleting useful governance.
8. Update permanent workflow docs.
9. Add the new component/change workflow: discovery, reuse decision, typed API, code, Figma, Code Connect, tests, examples, review, release evidence, metrics.
10. Mark program complete only after merge and production verification.

STATE TRANSITIONS
Normal unit: mark only that unit complete, update metrics/next READY, keep P12 active, and stop. Final unit: mark queue/P12/program complete with final evidence.

EXIT RESPONSE
Report selected unit, consumers migrated, legacy retained/removed, evidence, reviews, deployment, metrics, blockers, and next READY unit. Never claim total completion before final closeout.`
  }
);
