# Pckup Design System Migration Guide

A public, static execution guide for migrating the mature `senpex/pckup-web-app` frontend into a scalable, Figma-connected design system without a big-bang rewrite.

## Public URL

`https://seanmodd.github.io/pckup-design-system-migration-guide/`

## Guide architecture

- `index.html`: semantic guide shell, migration model, authority matrix, settings dialog, and phase mount points
- `site-core.css`: layout, navigation, hero, foundations, and shared controls
- `site-components.css`: phase cards, prompt viewer, tables, dialogs, responsive rules, and final-state workflow
- `phase-data-1.js`, `phase-data-2.js`, `phase-data-3.js`: compressed 17-phase migration data and exact copy-ready prompts
- `site.js`: browser bootstrap, prompt rendering, variable substitution, clipboard actions, search, progress persistence, mobile navigation, and prompt-packet export

## Scope

The guide is tailored to a mature production codebase with existing token infrastructure, CI/CD, tests, Figma Variables, a partial component library, global CSS debt, and several parallel product surfaces. It enforces a strangler migration rather than a rewrite.

The phases cover:

1. Program charter and source-of-truth rules
2. Production baseline and debt freeze
3. Machine design census
4. Visual atlas and state matrix
5. Equivalence graph and canonical taxonomy
6. Target code architecture
7. Isolated component workbench
8. Governance and adoption metrics
9. Legacy CSS strangler
10. Foundations reconciliation
11. Primitive components
12. Behavioral components
13. Reusable product patterns
14. Application shells
15. Figma and Code Connect
16. Product-surface migration waves
17. Legacy retirement and permanent workflow enforcement

## Privacy

The public site stores no credentials, private Figma keys, API tokens, or repository secrets. Prompt settings and completion status are stored only in the visitor's local browser storage. The Figma URL field is intentionally blank and must be supplied locally by an authorized user.
