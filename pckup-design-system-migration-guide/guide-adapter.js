(() => {
  "use strict";

  const meta = window.PCKUP_GUIDE_META;
  if (!meta) throw new Error("Pckup migration guide metadata did not load");

  window.PCKUP_PHASES = window.PCKUP_PHASES || [];

  window.PCKUP_GUIDE = {
    title: "Pckup Design System Migration Guide",
    repository: "senpex/pckup-web-app",
    figmaFileKey: "X7WZQGMUPIuzeaNoA7zTrF",
    universalPreamble: meta.basePrompt,
    facts: meta.facts,
    migrationWorkflow: meta.workflow,
    reusablePrompts: meta.reusablePrompts,
    rules: [
      {
        title: "Migrate, do not rewrite",
        body: "The existing application, routes, tests, business logic, security boundaries, and deployment machinery remain the foundation. Replace design debt incrementally rather than rebuilding the product around a new framework."
      },
      {
        title: "Parity before redesign",
        body: "Structural work must preserve current rendering and behavior. Intentional visual changes happen only after the canonical family is defined and reviewed with before-and-after evidence."
      },
      {
        title: "One bounded unit per PR",
        body: "Each phase or wave must be independently reviewable, reversible, testable, mergeable, and production-verifiable. Large phases repeat through several small migration units."
      },
      {
        title: "Git behavior, Figma anatomy",
        body: "TypeScript owns component API and behavior; Figma owns approved anatomy and supported visual states; tokens own values; Code Connect binds the approved code and design representations."
      },
      {
        title: "Prove zero consumers before deletion",
        body: "Compatibility exports, selectors, adapters, and published Figma identities stay in place until static, runtime, build, test, and design evidence proves that the legacy path is no longer consumed."
      },
      {
        title: "Enforce only after a paved replacement exists",
        body: "Debt audits begin as measured warnings. They become blocking comparison gates only after canonical components and documented exceptions give developers a compliant way forward."
      },
      {
        title: "Inventory before abstraction",
        body: "No family is consolidated from filenames or visual resemblance alone. Consumers, behavior, states, selectors, accessibility, screenshots, Figma assets, and business boundaries must be known first."
      },
      {
        title: "Do not formalize the chaos",
        body: "Figma and the new source tree represent approved canonical families, not every historical component. Duplicates, page compositions, and feature-local UI are classified before anything becomes library canon."
      }
    ],
    completion: [
      {
        metric: "100% registered",
        title: "Every shared component has an owner",
        body: "Reusable code is represented in the canonical manifest with API, state, accessibility, test, Figma, Code Connect, and migration metadata."
      },
      {
        metric: "0 unknown",
        title: "No reusable pattern remains unclassified",
        body: "Every discovered pattern is core, surface-scoped, feature-local, page composition, an approved exception, or a retired duplicate."
      },
      {
        metric: "0 rogue growth",
        title: "New design debt is mechanically blocked",
        body: "CI rejects new unapproved raw controls, unowned global selectors, hardcoded visual debt, forbidden dependencies, and unregistered shared components."
      },
      {
        metric: "0 legacy consumers",
        title: "Retired paths are actually gone",
        body: "Legacy adapters, selectors, exports, mappings, and Figma assets are deleted only after complete zero-consumer proof."
      },
      {
        metric: "100% mapped",
        title: "Canonical published components have a code contract",
        body: "Every development-facing Figma component maps to a real canonical code export or records an explicit, reviewed no-Code-Connect reason."
      },
      {
        metric: "All surfaces green",
        title: "Visual and behavioral baselines pass",
        body: "Representative desktop, mobile, theme, auth, loading, empty, error, focus, overlay, and responsive states pass the approved regression suite."
      },
      {
        metric: "Governed shells",
        title: "Parallel application chrome is intentional",
        body: "Marketing, Auth, Flow, Portal, and Operations shells share approved foundations while preserving genuinely different product and security behavior."
      },
      {
        metric: "One paved road",
        title: "The future workflow is the normal workflow",
        body: "A component change cannot ship without proposal, API, implementation, Figma, Code Connect, tests, evidence, manifest updates, and reviewed release steps as applicable."
      }
    ],
    steadyState: [
      "Search the canonical catalog and existing Figma libraries before proposing a new component.",
      "Open a bounded component gap or change proposal that identifies reuse, extension, or new-family justification and affected surfaces.",
      "Approve the TypeScript API, behavior, accessibility, states, token contract, ownership, and migration impact before implementation.",
      "Implement the canonical component with owned styles, tests, lab fixtures, compatibility strategy, and manifest metadata.",
      "Create or update the matching Figma component with existing variables, exact supported states, documentation, and dependency-correct publication.",
      "Create or update the parserless Code Connect template so Dev Mode and AI agents reference the real Pckup export.",
      "Migrate bounded consumers, capture visual evidence, run behavioral/accessibility/security checks, and complete independent review.",
      "Merge and deploy through the repository lane, publish Figma when needed, and update adoption, drift, exception, and deprecation state."
    ]
  };
})();
