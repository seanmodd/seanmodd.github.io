# Pckup Design System Migration Command Center

Public, static workflow guide for the controlled Pckup Design System v2 migration.

The guide is explicitly designed for an established production application. It uses a strangler migration, preserves the existing token/Figma/testing/deployment machinery, and requires evidence gates before legacy code is retired.

Completion progress is stored only in the visitor's browser. The public site contains no repository credentials, private Figma links, operational secrets, customer data, or internal identity data.

## Site files

- `index.html` - semantic page structure
- `styles.css` - responsive Pckup-themed presentation
- `data-common.js` - shared operating contract and program metadata
- `data-phases-1.js` through `data-phases-4.js` - phase definitions and copy-ready prompts
- `app.js` - rendering, filters, copy controls, local progress, and prompt export
