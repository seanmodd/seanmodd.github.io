# Pckup Design System Migration Guide

Public interactive guide for migrating the existing production `senpex/pckup-web-app` frontend into a scalable, governed design-system architecture without performing a clean-room rewrite.

Public URL after this branch is merged into the GitHub Pages branch:

`https://seanmodd.github.io/pckup-design-system-migration-guide/`

## What the guide contains

- 13 ordered phases from program governance and repository census through CSS ownership, canonical components, shell migration, Figma normalization, Code Connect, enforcement, and steady-state certification.
- A universal brownfield operating preamble that is automatically prepended to every phase prompt.
- Exact copy-ready prompts for the main phases and bounded sub-waves.
- Search, collapsible phase navigation, local progress tracking, one-click prompt copying, and a complete Markdown prompt download.
- Explicit prerequisites, deliverables, exit gates, stop conditions, and handoffs for every phase.
- Permanent post-migration contribution workflow and final completion criteria.

## Architecture

The site is intentionally static and dependency-free:

- `index.html` contains the semantic page shell.
- `styles.css` contains responsive presentation.
- `guide-meta.js` contains the universal operating contract, program rules, completion criteria, and steady-state workflow.
- `phases-00-04.js`, `phases-05-08.js`, and `phases-09-12.js` contain the ordered phase data and prompts.
- `app.js` renders the guide and implements search, copy, download, phase expansion, active navigation, and local progress.

No repository credentials, Figma tokens, customer data, or private environment values are present in the site. The guide names public-safe repository paths and the reviewed Figma file key needed by authorized implementation agents.

## Editing rules

- Keep prompts brownfield-safe and tied to the existing Pckup repository workflow.
- Do not collapse the migration into one mega-prompt or one pull request.
- Preserve the 13-phase dependency order.
- Add new sub-waves to the relevant phase rather than inventing a parallel plan.
- Keep the exact prompt text in the phase data files; the UI and Markdown download are generated from those sources.
- Test JavaScript syntax and confirm all phase IDs and numbers remain unique before merging.
