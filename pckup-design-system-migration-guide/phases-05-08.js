window.PCKUP_PHASES = window.PCKUP_PHASES.concat([
  {
    id: "phase-5",
    number: "05",
    title: "Mechanical CSS ownership split",
    category: "Structural migration",
    mode: "Pixel-neutral",
    duration: "3 bounded PRs",
    summary: "Split the giant global stylesheets into ordered, owned legacy modules without changing selectors, declarations, cascade order, or rendered output.",
    goal: "Make CSS ownership visible and migration-safe before extracting canonical components.",
    why: "A 400,000-byte stylesheet cannot reveal which feature owns a selector, whether it is safe to delete, or which component migration should absorb it.",
    prerequisites: [
      "Phase 4 architecture and owned-style strategy are merged.",
      "The visual baseline runner is deterministic and covers the target surfaces.",
      "Selector ownership and consumer data from Phase 1 are available."
    ],
    tasks: [
      "Split utility.css by shell, shared utility primitives, and feature surface while preserving exact source order.",
      "Split platform.css by primitives, flows, dashboard, courier, marketing patterns, and remaining legacy ownership.",
      "Classify and group the remaining large surface stylesheets without creating new abstractions.",
      "Use one compatibility import facade per former entry point so route imports do not change all at once.",
      "Add ownership headers, generated selector manifests, and tests that prove concatenated CSS equivalence.",
      "Run visual baselines after each bounded split."
    ],
    deliverables: [
      "src/app/styles/legacy/utility/** with an ordered utility facade",
      "src/app/styles/legacy/platform/** with an ordered platform facade",
      "Legacy ownership manifest mapping selectors to files and surfaces",
      "Byte/cascade equivalence tests",
      "Before/after visual comparison reports for each split wave",
      "Updated census paths without changing canonical classifications"
    ],
    exitGate: [
      "The original giant files are reduced to documented ordered import facades or safely retired after equivalent imports exist.",
      "Selector text, declaration text, at-rule nesting, and effective order are preserved unless an explicit pre-existing defect is separately approved.",
      "Representative visual baseline comparisons pass with no unexplained pixel differences.",
      "Each split file has one declared owner/surface and no new reusable abstraction was invented."
    ],
    stopConditions: [
      "Stop if a split requires selector renaming, specificity changes, declaration cleanup, or visual redesign.",
      "Stop if CSS import order changes across route groups without proven equivalence.",
      "Do not delete apparently unused selectors solely from static analysis in this phase."
    ],
    handoff: "Phase 6 reconciles foundations once CSS ownership is visible; Phases 7-10 migrate owned selectors into canonical components.",
    prompts: [
      {
        label: "5A: Split utility.css",
        body: `Execute Phase 5A of the Pckup design-system v2 migration: MECHANICALLY SPLIT src/app/styles/utility.css WITH ZERO INTENDED VISUAL CHANGE.

BOUNDARY
This pull request targets utility.css only, plus tests, manifests, reports, and the minimum import facade required to preserve behavior. Do not redesign utility pages, rename selectors, consolidate declarations, remove duplicate rules, change specificity, move logic into React, or migrate components. Do not touch platform.css in this wave.

PREPARATION
- Read the Phase 1 selector census, Phase 2 visual baseline, Phase 4 CSS ownership strategy, and existing utility-shell tests.
- Enumerate every @media, @supports, @container, @keyframes, custom property override, selector, and comment section in source order.
- Build a machine-readable section map before moving any bytes.

TARGET OWNERSHIP
Use evidence from actual consumers to split into a reviewed ordered structure such as:
- foundation and utility-local dimensional overrides;
- UtilityShell layout, rail, top bar, page head, mobile tray, account, bell, dialogs, shared utility controls;
- changelog;
- visitors;
- CMS;
- SEO;
- reports;
- contacts and access;
- messaging and email surfaces;
- activity logs;
- MCP/configuration surfaces;
- design-system reference/tutorial;
- cross-surface responsive and print overrides.
The exact filenames must follow actual ownership. Do not force a category that does not match consumers.

IMPLEMENTATION METHOD
1. Create an ordered legacy utility facade imported from the same route boundary as today.
2. Move contiguous source regions first. Preserve exact selector text, declaration text, comments needed to explain load-bearing behavior, at-rule nesting, and order.
3. When one section contains selectors from multiple owners, split only after proving the relative ordering remains identical in the final concatenation.
4. Generate a selector ownership manifest with original line range, new file, owner, known consumers, and migration family ID.
5. Add a content-equivalence test that normalizes only comments/import syntax and proves the ordered concatenation preserves the original CSS rule stream.
6. Add a cascade-order test for known repeated selectors and utility-local custom-property overrides.
7. Keep a temporary snapshot of the pre-split source in test evidence or the run report, not as a second runtime stylesheet.
8. Update census paths and migration state without changing component classifications.

VALIDATION
- Run the full utility-focused test set, typecheck, lint, design-system checks, and production build required by the task packet.
- Run deterministic visual captures for the utility shell at desktop/mobile and light/dark, plus representative changelog, visitors, CMS, SEO, reports, messaging, activity, access, and MCP routes.
- Compare before and after at the same commit inputs. Every pixel delta must be explained. The expected result is zero material delta.
- Verify stylesheet loading and order in built output, not only local source imports.

EXIT
The previous utility.css may remain as a tiny ordered import facade if that is the safest compatibility seam. Do not call the wave complete if it still contains unclassified rule bodies. Report new files, rule counts, selector counts, byte counts, equivalence proof, visual results, and rollback instructions.`
      },
      {
        label: "5B: Split platform.css",
        body: `Execute Phase 5B of the Pckup design-system v2 migration: MECHANICALLY SPLIT src/app/styles/platform.css WITH ZERO INTENDED VISUAL CHANGE.

BOUNDARY
This pull request targets platform.css only, plus tests, manifests, reports, and the compatibility facade. Phase 5A must already be merged. Do not rename classes, redesign controls, migrate React call sites, introduce canonical components, or clean up duplicate declarations. Do not modify utility-owned styles except for documented import integration if absolutely required.

PREPARATION
- Read the selector census and visual scenarios for auth, estimate/order flow, dashboard, courier application/workspace, payments, public subpages, and shared UI.
- Record source-order sections, repeated selectors, cross-surface dependencies, focus rules, media queries, keyframes, and legacy alias usage.

TARGET OWNERSHIP
Split by observed ownership, preserving order. Expected groups may include:
- global platform accessibility and focus behavior;
- legacy button and field families;
- specialized fields, upload, combobox, status, states, dialog and stepper styles;
- auth shell and auth flows;
- estimate/order/payment flow;
- dashboard and customer account patterns;
- courier application and workspace patterns;
- marketing subpage patterns that currently live in platform.css;
- shared responsive and compatibility overrides.
Do not move a selector into a canonical design-system module yet. These remain explicitly legacy-owned files.

IMPLEMENTATION
1. Replace the runtime body of platform.css with an ordered facade or equivalent import sequence.
2. Move the existing CSS without semantic edits. Preserve selector/declaration text, at-rule nesting, comments that capture regressions, and relative order.
3. Produce or update the selector ownership manifest and connect each selector to census IDs and future canonical family IDs.
4. Add ordered-concatenation equivalence tests and focused cascade tests for buttons, fields, dashboard shell, responsive tables/cards, auth, and courier flows.
5. Update the visual-capture matrix if the split reveals previously uncovered shared states.
6. Do not remove hardcoded values or convert them to tokens here; record them for the correct later wave.

VALIDATION
Run all required checks plus representative visual comparisons for:
- sign-in/sign-up and courier auth;
- estimate steps including address, shipment, pickup, payment and confirmation;
- dashboard shell, overview, orders, profile and company management;
- courier application and approved courier workspace;
- canonical Button/Field/Status/Stepper reference surfaces;
- desktop/mobile and light/dark where supported.
Expected result: zero material visual or behavioral delta.

EXIT RESPONSE
Report the exact source-to-file map, rule/selector counts, equivalence tests, visual results, built CSS order, unchanged public APIs, and rollback. Do not claim component-system adoption from a file split.`
      },
      {
        label: "5C: Classify remaining CSS",
        body: `Execute Phase 5C of the Pckup design-system v2 migration: CLASSIFY AND OWN THE REMAINING LARGE STYLESHEETS WITHOUT REDESIGN.

BOUNDARY
Phases 5A and 5B must be merged. This wave addresses remaining global/surface stylesheets such as globals.css, cms.css, ai-chat.css, seo.css, design-system-tutorial.css, activity-logs.css, admin-messaging.css, and other design-relevant CSS discovered in the census. Do not force all files into one folder and do not split small coherent feature styles merely to satisfy a numeric target.

WORK
1. Use selector consumers and route imports to assign every stylesheet and selector block an owner: foundation, legacy shared, surface, feature-local, page composition, generated, or approved exception.
2. Create a machine ownership map with runtime entry points, import order, selectors, consumers, token namespaces, hardcoded-value counts, future migration families, and deletion criteria.
3. For any remaining oversized multi-owner file, perform the same mechanical, ordered, pixel-neutral split used in 5A/5B. Keep each such split independently reviewable within this PR through coherent commits and focused tests.
4. Leave coherent feature-local files in place when moving them would add no ownership value. Document why.
5. Update the debt audit so any new global multi-owner stylesheet or unowned selector after the baseline is reported as a new violation.
6. Do not make the audit blocking for all historical debt yet.

VALIDATION
- Prove every runtime stylesheet is generated, canonical-owned, legacy-owned, feature-owned, or an approved exception.
- Prove no stylesheet is silently loaded from an unknown route boundary.
- Run full visual baseline coverage for every file that moved.
- Update state, census, ownership report, and migration waves.

EXIT RESPONSE
Provide stylesheet totals by class, remaining oversized files and reasons, ownership completeness, visual comparison results, and the exact selector families ready for component extraction.`
      }
    ]
  },

  {
    id: "phase-6",
    number: "06",
    title: "Foundations and token reconciliation",
    category: "Foundations",
    mode: "Code + Figma review",
    duration: "1-3 decision PRs",
    summary: "Reconcile existing code tokens, Figma variables, typography, themes, motion, focus, and component geometry without creating a duplicate foundation system.",
    goal: "Make the existing foundation layer trustworthy enough that every new canonical component can bind to it without copying raw values.",
    why: "The current token machinery is strong, but known typography, alias, component-geometry, and live Figma drift must be resolved deliberately before broad component migration.",
    prerequisites: [
      "CSS ownership is visible and the token audit remains green.",
      "Existing Figma variables/styles can be inspected with read access.",
      "Owner-dependent visual choices are presented with evidence before mutation."
    ],
    tasks: [
      "Reconcile reviewed token JSON, generated CSS, compatibility aliases, native Figma variables, text/effect styles, and live computed values.",
      "Resolve known typography and next/font inheritance issues through explicit design decisions.",
      "Define when component tokens are justified versus component-local geometry.",
      "Normalize focus, motion, density, breakpoints, icons, and semantic status roles where evidence supports convergence.",
      "Update Figma variable scopes, aliases, modes, code syntax, and documentation only through approved changes.",
      "Preserve the existing token sync pipeline and tests."
    ],
    deliverables: [
      "data/design-system-v2/foundations/reconciliation.json",
      "docs/design-system-v2/60-foundations-report.md",
      "Approved token/typography decision records",
      "Updated token sources and generated CSS only for approved changes",
      "Updated Figma variables/styles with validation evidence",
      "Foundation usage guidance for canonical components"
    ],
    exitGate: [
      "Every foundation conflict has one recorded authority and resolution or an explicit blocker.",
      "No duplicate token namespace or parallel theme implementation exists.",
      "All changed variables have valid scopes, aliases, modes, and web code syntax.",
      "Representative routes and component specimens prove the intended typography/theme changes.",
      "The existing Figma-to-Git review/deployment lane remains intact."
    ],
    stopConditions: [
      "Stop at any brand/taste decision not already approved, especially typography, density, button treatment, radii, or color refinement.",
      "Stop if a proposed token exists for only one component and adds indirection without reuse or semantic value.",
      "Do not use this phase to redesign components."
    ],
    handoff: "Phase 7 builds primitives only on the reconciled foundation contract.",
    prompts: [
      {
        label: "Execute Phase 6",
        body: `Execute Phase 6 of the Pckup design-system v2 migration: FOUNDATIONS AND TOKEN RECONCILIATION.

PHASE SCOPE
Reconcile the existing foundation system across reviewed token JSON, generated CSS, compatibility aliases, runtime computed values, and Figma variables/styles. Do not create a second token package. Do not redesign component anatomy. Separate owner-taste decisions from mechanical correctness.

DISCOVERY AND THREE-WAY DIFF
Build data/design-system-v2/foundations/reconciliation.json by comparing:
1. reviewed sources under docs/brand-assets/tokens/;
2. generated runtime variables and compatibility aliases;
3. live Figma variables, modes, aliases, scopes, code syntax, text styles and effect styles.
Also sample actual browser computed values on representative routes. Record exact provenance for every conflict.

REQUIRED REVIEWS
- Typography: next/font variable placement, root/body inheritance, display/body/utility families, semantic typography tokens, button labels, field labels, mono usage, and Figma text styles.
- Color: primitive and semantic aliases, themes, action hover/active/focus, status roles, utility context, dark-fixed surfaces, and hardcoded exception budgets.
- Geometry: spacing, radii, control heights, component-local padding, touch targets, layout widths and breakpoints. Create component tokens only when semantics/reuse justify them.
- Effects and motion: shadows, overlay/backdrop, transition duration/easing, reduced-motion behavior and Figma effect styles.
- Focus and accessibility: one semantic focus signal per surface context, contrast, outline geometry, and documented exceptions.
- Icons/assets: ownership, sizing grid, currentColor behavior, instance-swap candidates and duplicate assets.

DECISION HANDLING
For every mismatch classify it as:
- generated/import bug;
- stale Figma value;
- stale reviewed token source;
- intentional compatibility alias;
- component-local geometry;
- approved surface override;
- owner visual decision required.
Present owner decisions with before/after screenshots, affected selectors/components, route coverage, accessibility impact, blast radius, rollback and a recommendation. Do not implement unresolved decisions.

IMPLEMENT APPROVED CORRECTIONS
- Change reviewed token sources first, then use existing token build/sync scripts. Never edit generated tokens.css directly.
- Update compatibility aliases only within their existing controlled file and audit.
- Update Figma variables/styles through the existing Figma file. Set explicit scopes, semantic aliases, modes and web code syntax. Do not duplicate raw semantic values.
- Preserve dark/light mode architecture and surface-context behavior.
- Add regression tests for each corrected conflict and update the reference/lab specimens.

VALIDATION
Run token validation, build/check, CSS audit, Figma sync checks, typecheck, lint, tests, production build and visual captures for every affected family/surface. Validate all local Figma variables and styles touched. Publish the Figma library only after repository and visual evidence are approved, following the existing owner/review process.

EXIT RESPONSE
List conflicts by classification, decisions made, decisions still blocked, exact token/Figma changes, computed-value proof, visual evidence, tests, sync status and confirmation that no parallel foundation system was introduced.`
      }
    ]
  },

  {
    id: "phase-7",
    number: "07",
    title: "Core primitive migration waves",
    category: "Component migration",
    mode: "Repeatable bounded waves",
    duration: "3+ PRs",
    summary: "Create the canonical low-level components that eliminate the largest sources of rogue controls, while preserving compatibility and migrating consumers in controlled batches.",
    goal: "Establish the reliable building blocks that all compounds, patterns, and shells will consume.",
    why: "Higher-level consolidation cannot succeed while every feature can invent another button, field, badge, spinner, or state component.",
    prerequisites: [
      "Foundations are reconciled and the canonical architecture/manifest is active.",
      "Each family has an approved catalog contract and migration wave.",
      "The relevant legacy selectors have an owner and visual baseline."
    ],
    tasks: [
      "Wave 7A: Button, LinkButton, IconButton, ToggleButton, and action/pill convergence.",
      "Wave 7B: FormField, TextField, Textarea, Select, Checkbox, Radio/OptionTile, and field messaging.",
      "Wave 7C: Badge, Notice, Spinner, Skeleton, Divider, Tooltip, and canonical empty/error/loading states.",
      "For each family: stabilize TypeScript API, preserve adapters, colocate styles, test states/accessibility, migrate bounded consumers, update Figma, and publish Code Connect.",
      "Update adoption metrics and remove legacy rules only after zero usage."
    ],
    deliverables: [
      "Canonical primitive directories under src/design-system/primitives or approved paths",
      "Typed public APIs and compatibility re-exports",
      "Colocated owned styles using existing tokens",
      "Unit, accessibility, interaction, visual, and usage tests",
      "Figma primitive component sets with variable bindings",
      "Parserless .figma.ts Code Connect templates",
      "Per-wave consumer migration and adoption reports"
    ],
    exitGate: [
      "Every new primitive has real consumers, manifest registration, tests, Figma metadata, and Code Connect where design-facing.",
      "Migrated code no longer imports the retired implementation or legacy selector family.",
      "Adapters preserve behavior for unmigrated consumers.",
      "No new raw control or global selector debt was introduced.",
      "Visual and accessibility acceptance criteria pass for migrated surfaces."
    ],
    stopConditions: [
      "Stop if one API tries to hide materially different behavior behind vague props.",
      "Stop if migrating all consumers makes the wave too large; migrate one surface and retain the adapter.",
      "Do not delete legacy implementations while usage is nonzero."
    ],
    handoff: "Phase 8 builds behavioral compounds exclusively from the canonical primitives.",
    prompts: [
      {
        label: "7A: Buttons and actions",
        body: `Execute Phase 7A of the Pckup design-system v2 migration: CANONICAL BUTTON AND ACTION PRIMITIVES.

BOUNDARY
Migrate the approved button/action family only. Do not migrate fields, dialogs, navigation shells, tables, or unrelated controls. Use the Phase 3 family contract and Phase 4 architecture. If the catalog decision differs from this prompt, follow the approved decision record and explain the deviation.

DISCOVERY
From the census and equivalence graph, enumerate every button-like implementation: canonical Button, raw buttons, anchor buttons, icon-only controls, utility pills, disclosure triggers, sign-out/menu controls, CTA variants, action chips, loading buttons, and disabled/read-only actions. Separate actual semantic differences from visual duplication.

CANONICAL API
Implement only the approved primitives, expected to include:
- Button for action semantics and supported visual variants/sizes/states;
- LinkButton for navigation rendered with link semantics;
- IconButton for icon-only controls with required accessible labeling;
- ToggleButton only if real pressed-state consumers justify it;
- utility/action pill treatment as a variant or scoped wrapper only if the equivalence decision approved that relationship.
Avoid a universal polymorphic as prop that weakens type and semantic safety. Preserve Next.js link behavior where required.

IMPLEMENTATION
1. Create canonical code under the approved src/design-system primitive path with typed APIs, explicit loading/disabled/pressed behavior, ref support if required, and colocated owned styles bound to reconciled tokens.
2. Keep the old src/app/components/ui/Button export as a compatibility re-export/adapter until all consumers migrate. Preserve its existing public API unless the approved deprecation plan says otherwise.
3. Create focused tests for element semantics, href mode, type defaults, loading accessibility, disabled behavior, keyboard focus, icon-only accessible names, variant/size mapping, className/ref behavior, and server/client boundary.
4. Add component-lab specimens for every supported variant, size, state, icon position, long label and responsive constraint.
5. Migrate a bounded high-value consumer set defined by waves.json. Prefer one complete surface over scattered opportunistic edits. Use codemods only when the transformation is provably semantic-preserving.
6. Update usage metrics and list every remaining legacy/raw consumer.
7. Remove legacy selectors only when their usage is zero. Otherwise leave a documented bridge tied to the next wave.

FIGMA AND CODE CONNECT
After the TypeScript API is stable:
- reconcile the existing Button and Utility Pill Figma assets with the approved family;
- bind fills, strokes, spacing, radii and typography to existing variables/styles;
- model exhaustive supported variants/states without encoding arbitrary icons as variants;
- document semantic usage and forbidden combinations;
- create parserless .figma.ts templates mapping every supported property to the real canonical exports;
- publish mappings only for canonical components, never raw class patterns.

VALIDATION
Run focused and full checks, visual captures across migrated surfaces, touch-target and focus tests, light/dark coverage, Figma metadata/screenshots, Code Connect mapping verification, and bundle/import analysis. Verify compatibility consumers remain unchanged.

EXIT RESPONSE
Report canonical APIs, migrated and remaining consumer counts, legacy selectors retained/removed, Figma changes, Code Connect mappings, visual/accessibility results, tests, adoption percentage and next button-family wave if usage remains.`
      },
      {
        label: "7B: Fields and selection controls",
        body: `Execute Phase 7B of the Pckup design-system v2 migration: CANONICAL FIELD AND FORM PRIMITIVES.

BOUNDARY
Migrate the approved field/selection family only. Phase 7A must be merged. Do not consolidate combobox behavior, file upload, dialogs, data tables, or shells in this wave unless the approved family contract explicitly treats a piece as a primitive dependency.

DISCOVERY
Use the census/equivalence graph to enumerate FieldChrome, TextField, TextareaField, SelectField, CheckboxField, raw inputs/selects/textareas, radio/option tiles, password/phone/address wrappers, utility workspace fields, search controls, error/hint patterns, required markers, counters, prefixes/suffixes and disabled/read-only states.

CANONICAL CONTRACT
Implement the approved low-level set, expected to include:
- FormField/FieldRoot for label, hint, error, required, description and ID wiring;
- TextField and Textarea;
- Select using native semantics where appropriate;
- Checkbox and Radio;
- OptionTile/RadioCard only if it has real repeated consumers;
- FieldMessage, Label and supporting internals only when needed for composition.
Specialized PasswordField, PhoneField, AddressCombobox and FileUpload must consume these primitives later rather than being flattened into one enormous Field component.

IMPLEMENTATION
1. Build typed canonical components with controlled/uncontrolled compatibility, ref forwarding where needed, native attribute pass-through, deterministic ID/aria-describedby wiring, invalid/disabled/read-only semantics and explicit visual states.
2. Use reconciled tokens and colocated styles. Preserve existing touch targets and form behavior.
3. Keep compatibility re-exports/adapters for src/app/components/ui/fields.tsx and existing specialized fields.
4. Test labels, hints, errors, required state, disabled/read-only, keyboard/focus behavior, native form participation, select placeholder/options, checkbox/radio semantics, server rendering/hydration and long/localized content.
5. Render all states in the component lab.
6. Migrate the bounded consumer surface defined by waves.json, starting with a flow that exercises the family coherently. Do not scatter partial field conversions across unrelated surfaces.
7. Update usage metrics and leave explicit bridges for specialized fields scheduled for Phase 8.

FIGMA AND CODE CONNECT
Reconcile the existing Field, Password Field, Phone Field, Address Combobox, File Upload Field, Option Tile and Workspace Field assets without prematurely making all of them core primitives. The canonical core Field set must mirror the real code API and states. Bind variables/styles, document composition rules, and create parserless Code Connect templates for canonical code exports. Specialized compounds may remain queued for Phase 8.

VALIDATION
Run form behavior tests, accessibility checks, visual captures for migrated routes at desktop/mobile and light/dark, field state matrix, Figma validation, Code Connect verification and full repository checks. Confirm no data submission or validation behavior changed.

EXIT RESPONSE
Report canonical field APIs, specialized components deferred, migrated/remaining counts, compatibility status, selector removal, accessibility/visual results, Figma and Code Connect state, and adoption metrics.`
      },
      {
        label: "7C: Feedback, status, and loading",
        body: `Execute Phase 7C of the Pckup design-system v2 migration: CANONICAL FEEDBACK, STATUS, AND LOADING PRIMITIVES.

BOUNDARY
Consolidate only approved low-level feedback/status families. Phases 7A and 7B must be merged. Do not absorb feature-specific business cards or full page panels into generic components.

DISCOVERY
Inventory StatusBadge and application/order status renderers, inline badges/chips, demo/emulation/consent/notice banners, error summaries, empty/error/loading states, spinners, skeletons, progress indicators, dividers and tooltip-like affordances. Distinguish semantic tone from business status labels.

CANONICAL CONTRACT
Implement only approved families, likely:
- Badge with semantic tone and content, not one variant per business status;
- Notice/InlineAlert with role, tone, title, description and optional actions;
- Spinner and LoadingRegion;
- Skeleton primitives with reduced-motion behavior;
- EmptyState and ErrorState built from shared state anatomy;
- Divider;
- Tooltip only if a single accessible implementation is approved and real consumers exist.
Business-specific status mapping remains in feature adapters that produce semantic tones.

IMPLEMENTATION
1. Create typed canonical components, owned styles and manifest entries.
2. Preserve existing order/application status mapping through feature-level adapters. Do not move business enums into the design-system package.
3. Preserve live-region, role, aria-busy, retry, action and reduced-motion behavior.
4. Add state-matrix lab examples and tests for semantic roles, tone mapping, loading labels, animation reduction, empty/error actions, long content and responsive layout.
5. Migrate one bounded surface family at a time according to waves.json.
6. Update usage metrics and remove legacy selectors/exports only after zero usage.

FIGMA AND CODE CONNECT
Reconcile Status Badge, State Panel, Error Summary, Notice Section and related assets according to the approved core/surface classification. Model semantic tones and state anatomy, not every product status string. Bind variables, document use, and create parserless Code Connect mappings to canonical exports and feature adapters where appropriate.

VALIDATION
Run accessibility role/live-region checks, reduced-motion checks, visual state matrices, migrated route screenshots, light/dark coverage, Figma validation, Code Connect verification and full repository checks.

EXIT RESPONSE
Report semantic family APIs, business adapters retained, migrated/remaining consumers, selector/API retirement, visual/accessibility results, Figma/Code Connect coverage and updated primitive adoption percentage.`
      }
    ]
  },

  {
    id: "phase-8",
    number: "08",
    title: "Behavioral and compound component migration",
    category: "Component migration",
    mode: "Accessibility-critical waves",
    duration: "2-4 PRs",
    summary: "Consolidate overlays, disclosure, complex inputs, notifications, and other stateful components on top of the new primitives without erasing important behavior.",
    goal: "Replace duplicated focus management, keyboard handling, scroll locking, open/close state, and specialized field behavior with governed implementations.",
    why: "The repository currently contains parallel dialog and interaction systems whose visual similarity hides meaningful accessibility and behavior differences.",
    prerequisites: [
      "Required primitives from Phase 7 are merged and adopted by at least one real surface.",
      "Behavioral differences are documented in the equivalence graph.",
      "Interaction and accessibility tests exist or are added before consolidation."
    ],
    tasks: [
      "Wave 8A: Dialog, AlertDialog, Drawer, Popover, Tooltip, and focus/overlay foundations.",
      "Wave 8B: Disclosure/Accordion, Tabs, menus, and other keyboard stateful controls.",
      "Wave 8C: Combobox, AddressCombobox, PasswordField, PhoneField, FileUpload, search, and complex field compounds.",
      "Wave 8D when approved: Toast and notification presentation foundations.",
      "Migrate consumers in bounded feature/surface batches, preserving adapters until zero usage.",
      "Create matching Figma compounds and Code Connect templates only after APIs stabilize."
    ],
    deliverables: [
      "Canonical compound/behavioral component directories",
      "Shared overlay/focus management foundations",
      "Specialized field compounds built from canonical fields",
      "Interaction and accessibility regression tests",
      "Figma compound sets and parserless Code Connect templates",
      "Per-wave migration/adoption reports"
    ],
    exitGate: [
      "Duplicated low-level overlay/focus logic is consolidated where behavior permits.",
      "Every compound documents keyboard, focus, dismissal, portal, scroll, async, and responsive behavior.",
      "Migrated consumers retain or improve accessibility without changing business behavior.",
      "Legacy implementations remain only where usage or an approved behavioral distinction requires them."
    ],
    stopConditions: [
      "Stop if native and custom dialog behavior cannot be unified without regressions; define a shared foundation plus explicit variants instead.",
      "Stop if a generic compound API becomes a bag of unrelated booleans.",
      "Do not move feature business logic into the design-system layer."
    ],
    handoff: "Phase 9 assembles canonical primitives and compounds into reusable product patterns.",
    prompts: [
      {
        label: "8A: Dialogs and overlays",
        body: `Execute Phase 8A of the Pckup design-system v2 migration: DIALOG, ALERT DIALOG, DRAWER, POPOVER, AND OVERLAY FOUNDATIONS.

BOUNDARY
Consolidate the approved overlay family only. Do not redesign dialog content, migrate all utility features at once, or absorb feature business logic. Preserve native semantics when they are beneficial and preserve required custom behavior when native dialog alone is insufficient.

DISCOVERY
Compare ConfirmDialog, RepeatOrderDialog, UtilityDialog, auth/login/logout modals, consent preferences, access confirmations, CMS publish/rollback confirmations, drawers, popovers, menus and backdrop patterns. Record differences in:
- native dialog versus portal rendering;
- focus trapping, initial focus and focus restoration;
- stacked dialogs;
- Escape and backdrop dismissal;
- busy/undismissable state;
- scroll locking;
- title/description semantics;
- destructive confirmation;
- responsive drawer/modal changes;
- server/client boundaries and hydration.

ARCHITECTURE
Implement the approved shared foundation and explicit components, likely Overlay/FocusScope internals plus Dialog, AlertDialog and Drawer. Popover/Menu should share positioning/dismissal foundations only if the approved catalog supports it. Avoid one giant Modal component with dozens of booleans.

IMPLEMENTATION
1. Write the behavioral contract before code changes and pin current behavior with tests.
2. Create canonical components from Phase 7 primitives and owned styles.
3. Support required focus, dismissal, stacking, scroll, portal and busy semantics with focused reusable internals.
4. Provide compatibility adapters for ConfirmDialog and UtilityDialog. Migrate one bounded consumer family, such as confirmation dialogs, before moving complex Utility dialogs.
5. Keep feature content and mutations outside the design-system component.
6. Add lab scenarios for neutral/destructive, small/large content, busy, nested/stacked when supported, mobile drawer behavior, long text and no-footer content.
7. Update usage counts; remove old low-level code only after zero usage and behavior parity.

FIGMA AND CODE CONNECT
Reconcile Dialog and consent/dialog assets around the approved component anatomy and explicit behavior variants. Figma should document content slots and supported states, not simulate business logic. Create parserless Code Connect templates for canonical Dialog/AlertDialog/Drawer exports, using slots only when the Figma property is truly a slot.

VALIDATION
Run keyboard traversal, focus restoration, Escape/backdrop, scroll lock, stacked overlay, screen-reader semantics, reduced-motion, mobile/desktop visual tests, migrated surface screenshots, Figma validation, Code Connect verification and full repository checks.

EXIT RESPONSE
Report behavioral differences resolved, components/adapters created, migrated/remaining consumers, accessibility proof, visual evidence, legacy code removed/retained, Figma and Code Connect state, and rollback.`
      },
      {
        label: "8B: Disclosure, tabs, and complex controls",
        body: `Execute Phase 8B of the Pckup design-system v2 migration: DISCLOSURE, ACCORDION, TABS, MENU, AND RELATED KEYBOARD CONTROLS.

BOUNDARY
Migrate only the approved stateful control families from the catalog. Phase 8A must be merged. Do not convert every show/hide region into an Accordion and do not move navigation business rules into generic controls.

DISCOVERY
Use the census to identify details/summary, custom disclosure buttons, changelog detail cards, utility navigation disclosures, CMS panels, SEO tabs/nav, filter tabs, menus and other expanded/current/selected controls. Separate:
- disclosure versus selection;
- navigation versus in-place panels;
- single versus multiple expansion;
- persisted versus transient state;
- URL-driven versus local state;
- menu behavior versus ordinary action lists.

IMPLEMENTATION
1. Define explicit contracts for Disclosure, Accordion, Tabs and Menu only where approved and used.
2. Build from canonical Button/IconButton and shared focus foundations.
3. Preserve aria-expanded, aria-controls, roving/tab keyboard behavior, URL state, persisted preference behavior and server-rendered initial state where applicable.
4. Create compatibility wrappers for the highest-use legacy patterns.
5. Migrate bounded consumers by family and surface. Do not mix utility navigation restructuring with simple content disclosures in one wave.
6. Add lab state matrices and interaction tests.
7. Update selector/import usage and retire old implementations only at zero use.

FIGMA AND CODE CONNECT
Create or reconcile Figma component sets for design-facing Disclosure, Tabs and Menu patterns only. Document when each is appropriate. Map canonical code APIs exhaustively with parserless templates. Do not Code Connect page-specific navigation compositions as generic Tabs.

VALIDATION
Run keyboard, focus, ARIA, URL/history, persistence, hydration, mobile/desktop, visual, Figma and Code Connect tests plus required repository checks.

EXIT RESPONSE
Report approved families, behavioral contracts, migrated surfaces, remaining local patterns, accessibility/visual evidence, retired selectors/exports and adoption metrics.`
      },
      {
        label: "8C: Complex fields and upload",
        body: `Execute Phase 8C of the Pckup design-system v2 migration: COMPLEX FIELD COMPOUNDS INCLUDING COMBOBOX, ADDRESS, PASSWORD, PHONE, FILE UPLOAD, AND SEARCH.

BOUNDARY
Build specialized compounds from the canonical Phase 7 field primitives. Do not make one universal field with unrelated modes. Keep geocoding, country data, upload transport, validation and feature business logic behind adapters/services outside the visual component layer.

DISCOVERY
Compare AddressField, LocationCombobox, password fields/recovery, PhoneField, FileUploadField, utility workspace/search fields, filter search controls and raw autocomplete/upload implementations. Record async, validation, keyboard, focus, mobile, error, loading and empty behavior.

IMPLEMENTATION
1. Define separate typed contracts for approved compounds: Combobox foundation, AddressCombobox adapter, PasswordField, PhoneField, FileUpload and SearchField where justified.
2. Reuse FormField/TextField primitives, Notice/Spinner, Popover/Listbox foundations and canonical actions.
3. Keep data fetching, geocoding, upload APIs, phone normalization and business validation injectable or feature-owned.
4. Pin current keyboard/listbox behavior, active-descendant or roving focus model, async race cancellation, loading/empty/error states, file constraints, remove/retry behavior and form integration with tests.
5. Preserve compatibility exports for current ui fields and migrate one complete flow at a time, such as estimate address or courier application documents.
6. Add lab scenarios using deterministic fake services.
7. Update usage and remove legacy CSS/code only after zero consumers.

FIGMA AND CODE CONNECT
Reconcile Password Field, Phone Field, Address Combobox, File Upload Field and Workspace Field Figma assets with the approved core/surface classification. Bind to canonical field primitives, model real supported states, and publish parserless Code Connect templates to canonical compounds or feature adapters. Do not encode network data as variants.

VALIDATION
Run accessibility/listbox tests, keyboard/mobile input behavior, async and error tests, form submission compatibility, visual matrices, route screenshots, Figma validation, Code Connect verification and full checks.

EXIT RESPONSE
Report compound APIs, service boundaries, migrated flows, remaining consumers, behavioral/accessibility proof, visual evidence, Figma/Code Connect coverage and adoption metrics.`
      }
    ]
  }
]);
