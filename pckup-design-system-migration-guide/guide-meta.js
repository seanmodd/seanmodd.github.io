window.PCKUP_GUIDE = {
  title: "Pckup Design System Migration Guide",
  repository: "senpex/pckup-web-app",
  figmaFileKey: "X7WZQGMUPIuzeaNoA7zTrF",
  universalPreamble: `You are the implementation agent operating inside the existing production repository \`senpex/pckup-web-app\`.

THIS IS A BROWNFIELD DESIGN-SYSTEM MIGRATION, NOT A GREENFIELD REBUILD.
The repository is large, mature, tested, deployed, and full of load-bearing behavior. Preserve all existing routes, product logic, authentication, authorization, privacy boundaries, payments behavior, data behavior, accessibility, responsive behavior, deployment mechanics, and visual output unless this phase explicitly authorizes a reviewed change. Do not replace the application with a new framework. Do not create a second token system. Do not discard existing tests or architecture merely because a cleaner implementation is possible.

MANDATORY REPOSITORY STARTUP
1. Read \`AGENTS.md\` and \`AI_CONTEXT.md\` completely before changing anything.
2. Read the matching files under \`.ai/policy/\`, \`.ai/WORKFLOW.md\`, and any design-system decisions or specs relevant to this phase.
3. Inspect git status, current branch, current commit, remote state, open pull requests, and the current state of \`main\`.
4. Compare the actual repository state with the documented state. Do not redo work that already exists.
5. If this task does not already have a generated task packet, begin through the repository's required flow: \`npm run task:start <phase-slug>\`, then follow the generated \`.task/packet.md\`.
6. Use one task, one worktree, one branch, one pull request, one review cycle, and one merge for this phase or named migration wave. Never work directly on \`main\`.

EXISTING AUTHORITATIVE FACTS YOU MUST PRESERVE
- The reviewed design-token sources already live under \`docs/brand-assets/tokens/\` and generate \`src/app/styles/generated/tokens.css\` through the existing token scripts.
- The existing Figma design-system file is \`X7WZQGMUPIuzeaNoA7zTrF\`. It already contains variables, styles, and published component sets. Reconcile it; do not blindly replace it.
- The application currently uses global CSS heavily, especially \`src/app/styles/utility.css\`, \`src/app/styles/platform.css\`, \`src/app/globals.css\`, and multiple surface-specific stylesheets.
- \`src/app/components/ui/\` is a partial canonical island, not a complete inventory of the application UI.
- There are multiple product surfaces: marketing, authentication, estimate/order flow, customer dashboard, courier application/workspace, and the internal utility suite.
- Existing tests, route fixtures, Utility UI Lab surfaces, screenshots, and production behavior are evidence. Treat them as migration constraints.
- Code Connect is documentation and mapping. It does not automatically rewrite production code and must map only canonical exported code components.

PROGRAM INVARIANTS
1. Inventory before abstraction. No component family may be redesigned or consolidated until its current implementations and consumers are known.
2. Preserve pixels during structural work. CSS splitting, file movement, adapters, and import changes must be visual-neutral unless the phase explicitly opens a visual decision.
3. Prefer compatibility adapters and re-exports over big-bang replacement. Delete legacy code only after verified usage reaches zero.
4. Every shared component must have one canonical owner, one documented API, explicit states, accessibility behavior, tests, and a migration status.
5. New reusable UI belongs in the approved design-system architecture, not in another route-local helpers folder.
6. Figma must model the approved canonical component, not every historical code variation. Do not institutionalize duplicates.
7. Code Connect mappings must point to real exported components and exhaustive supported properties. Do not map CSS-only patterns, page compositions, or components scheduled for retirement.
8. A migration wave must be bounded. Do not migrate the entire repository in one pull request.
9. Every visual change requires before/after evidence at representative desktop/mobile and light/dark states where applicable.
10. Every phase updates the shared migration state and produces machine-readable artifacts in addition to human-readable documentation.
11. Never read, print, request, or commit secret values. Use existing fixtures and owner-managed environment configuration.
12. Be explicit about uncertainty and stop at genuine product-design decision forks instead of inventing a preference.

QUALITY AND CLOSEOUT
- Add or update focused tests before relying on a new abstraction.
- Run the checks required by the generated task packet, plus \`npm run typecheck\`, \`npm run lint\`, \`npm test\`, and \`npm run design-system:check\` when relevant.
- Run \`npm run task:classify\`, \`npm run task:check\`, and \`npm run task:check -- --stage confirmation\` at the required points.
- Obtain the repository-required independent correctness and security reviews.
- Update README, AI context, architecture docs, changelog, and migration state in the same pull request when the phase changes workflow, architecture, commands, or capabilities.
- Publish the required run report with screenshots/evidence where visually representable, then complete the required session transcript closeout.
- Do not claim completion until the pull request is merged, the production deployment is healthy, and the phase exit gate is proven.

At the beginning of your response, restate the exact phase or wave you are executing, the current baseline commit, the files you expect to touch, and the explicit things you will not change. Then perform the work autonomously within the repository's standing workflow.`,

  rules: [
    {
      title: "Brownfield first",
      body: "Preserve the product and migrate it in place. A cleaner new implementation is not automatically a safer implementation."
    },
    {
      title: "Evidence before decisions",
      body: "Component names, usage counts, selectors, screenshots, states, and consumers must be recorded before canonical families are approved."
    },
    {
      title: "One authority per concern",
      body: "Tokens, component APIs, visual anatomy, Code Connect, and deployed code each have a defined authority. Avoid circular ownership."
    },
    {
      title: "No hidden visual drift",
      body: "Mechanical phases must remain pixel-neutral. Deliberate redesigns require explicit acceptance criteria and visual evidence."
    },
    {
      title: "Bounded migration waves",
      body: "A wave owns one family or one surface. It must be independently testable, reviewable, reversible, and mergeable."
    },
    {
      title: "Adapters before deletion",
      body: "Keep compatibility shims until import and selector usage is proven to be zero. Then remove the old path in the same verified wave."
    },
    {
      title: "Figma follows canon",
      body: "Do not turn every rogue component into a Figma component. Figma represents approved canonical families and compositions."
    },
    {
      title: "CI prevents relapse",
      body: "Warning-only audits start early. They become blocking only after the migration establishes a compliant replacement path."
    }
  ],

  completion: [
    {
      metric: "100% registered",
      title: "Every shared component has an owner",
      body: "Reusable components are present in the canonical manifest with API, state, accessibility, Figma, Code Connect, test, and migration metadata."
    },
    {
      metric: "0 unknown",
      title: "No unclassified reusable patterns",
      body: "Every discovered pattern is classified as core, surface, feature-local, page composition, approved exception, or retired."
    },
    {
      metric: "0 rogue growth",
      title: "New debt is mechanically blocked",
      body: "CI rejects new unapproved raw controls, global component selectors, hardcoded visual values, and unregistered shared components."
    },
    {
      metric: "0 legacy consumers",
      title: "Legacy paths are removed only after zero usage",
      body: "Old selectors, adapters, files, and exports are deleted after repository-wide scans and runtime tests prove no remaining consumer."
    },
    {
      metric: "100% mapped",
      title: "Canonical published components have Code Connect",
      body: "Every production Figma component intended for development maps to a real canonical code export with exhaustive supported properties."
    },
    {
      metric: "All surfaces green",
      title: "Visual and behavioral baselines pass",
      body: "Representative desktop/mobile, light/dark, authenticated, loading, empty, error, and interaction states pass the approved regression suite."
    },
    {
      metric: "One shell family",
      title: "Parallel shell duplication is eliminated",
      body: "Dashboard, courier, auth, flow, marketing, and operations shells share approved foundations instead of copying structural logic."
    },
    {
      metric: "Documented loop",
      title: "The future workflow is the default path",
      body: "A new component cannot ship without the proposal, API, implementation, Figma, Code Connect, tests, documentation, and release evidence expected by policy."
    }
  ],

  steadyState: [
    "Start from a product need and search the canonical component catalog before proposing anything new.",
    "Write a component change proposal that states reuse, extension, or new-family justification and lists affected surfaces.",
    "Approve the TypeScript API, behavior, accessibility, states, and token contract before visual production work begins.",
    "Implement or update the canonical component with colocated styles, tests, examples, and migration compatibility where needed.",
    "Create or update the matching Figma component using the existing variables, exact supported variants, and documented usage guidance.",
    "Publish or update the parserless Code Connect template so Figma Dev Mode and AI agents reference the real code export.",
    "Migrate bounded consumers, capture visual evidence, run behavioral and accessibility checks, and review the diff independently.",
    "Merge through the normal repository lane, publish the Figma library when needed, and update adoption metrics and the component manifest."
  ]
};

window.PCKUP_PHASES = window.PCKUP_PHASES || [];
