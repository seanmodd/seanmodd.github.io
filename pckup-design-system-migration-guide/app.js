(() => {
  "use strict";

  const early = Array.isArray(window.PCKUP_GUIDE_PHASES) ? window.PCKUP_GUIDE_PHASES : [];
  const later = Array.isArray(window.PCKUP_PHASES) ? window.PCKUP_PHASES : [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = "pckup-design-system-migration-guide:complete:v2";

  const PREAMBLE = `You are the principal design-systems architect and staff frontend migration engineer for Pckup.

Repository: senpex/pckup-web-app

This is a controlled strangler migration of a large, functioning production application, not a greenfield redesign and not a big-bang rewrite. The existing token pipeline, generated --pckup-* variables, themes, Figma library, tests, Utility UI Lab, GitHub workflow, security boundaries, and deployment automation are real assets that must be reused.

Read and obey AGENTS.md, AI_CONTEXT.md, .ai/WORKFLOW.md, .ai/policy/*, and the relevant design-system documents before editing. Inspect current git/remote/open-work state and do not redo completed work. Run the repository task workflow exactly: npm run task:start <slug>, task:classify, task:check, and confirmation-stage checks. One task, one worktree, one branch, one pull request, one merge. Use checkpoint commits.

Preserve production behavior and visual output unless the active phase explicitly authorizes a reviewed change. Existing UI is evidence, not automatically canon. Do not copy every rogue component into Figma. Do not create a second token taxonomy, theme system, or parallel component library. Code owns component API and behavior; Figma owns approved visual anatomy and supported states; token JSON/Figma Variables own design values; Code Connect binds canonical assets; GitHub main owns deployed truth. Never create a production runtime dependency on Figma.

Preserve authentication, authorization, privacy, payment, data, accessibility, performance, responsive, and first-paint behavior. Never expose or request secret values. Every migration unit must be reversible; do not delete legacy code or selectors until all consumers are proven migrated and validation passes. Prefer locally owned styles for new canonical components. Keep feature-local UI and page composition local when no genuine reuse contract exists.

At phase start, read the migration charter/state/ledger/handoff, verify prerequisites, state exact scope, and publish a stable-ID checklist. At phase end, update migration state, ledger, handoff, required repository documentation, tests, evidence, run report, and exit-gate verdict. Stop when the gate is blocked. Do not continue into the next phase.`;

  const REVIEW = `Act as an independent adversarial reviewer for this phase's Pckup design-system migration pull request. Read the repository policies, migration state, active phase, target architecture, family decision, migration-unit specification, complete diff, tests, screenshots, component registry, Figma metadata, and Code Connect artifacts. Do not trust the implementation summary.

Review separately for incorrect abstraction/layer placement, hidden behavior changes, accessibility regressions, security or privacy boundary changes, incomplete call-site migration, stale selectors, false zero-consumer claims, visual gaps across themes/breakpoints/states, invalid Figma/code mappings, inaccurate metrics, broken rollback, over-broad APIs, and new design debt disguised as cleanup.

Return findings by severity with exact evidence and reproduction steps. State coverage limits. Give a final PASS or BLOCK for this phase only.`;

  const guide = {
    title: "Pckup Design System Migration Command Center",
    subtitle: "A controlled, evidence-driven migration from a mature but fragmented UI architecture to a scalable design system and permanent design workflow.",
    version: "1.0",
    updated: "2026-08-22",
    principles: [
      ["No big-bang rewrite", "Build the canonical platform beside legacy, migrate in bounded waves, and retain rollback until evidence supports deletion."],
      ["Canonicalize before Figma", "Inventory, cluster, decide, and stabilize the code contract before publishing the design canon."],
      ["Evidence at every gate", "Imports are not adoption. Prove routes, states, selectors, accessibility, visuals, performance, and production behavior."],
      ["One authority per concern", "Code owns API and behavior; Figma owns approved anatomy; Code Connect maps them; GitHub main is deployed truth."]
    ],
    metrics: [
      "Canonical component adoption by route and product surface",
      "Raw interactive controls outside approved primitives",
      "Legacy global CSS bytes and selector count",
      "Selector ownership coverage",
      "Duplicate component-family count",
      "Figma coverage of canonical components",
      "Code Connect coverage of eligible canonical components",
      "Time-bounded exception count and expiry compliance"
    ]
  };

  function normalize(raw, index) {
    const number = raw.number || String(index).padStart(2, "0");
    const prompts = raw.prompts?.length ? raw.prompts : raw.prompt ? [{ label: `Execute Phase ${number}`, body: raw.prompt }] : [];
    return {
      id: raw.id || `phase-${index}`,
      number,
      title: raw.title || `Phase ${number}`,
      stage: raw.stage || raw.category || "MIGRATE",
      mode: raw.mode || raw.dependsOn || "Bounded phase",
      duration: raw.duration || "Focused migration PRs",
      summary: raw.summary || raw.goal || "",
      goal: raw.goal || raw.summary || "",
      why: raw.why || "This phase is required by the approved migration dependency graph.",
      prerequisites: raw.prerequisites || (raw.dependsOn && raw.dependsOn !== "None" ? [`${raw.dependsOn} is complete and verified.`] : ["No prior migration phase is required."]),
      tasks: raw.tasks || ["Execute the complete prompt without beginning a later phase."],
      outputs: raw.outputs || raw.deliverables || [],
      stops: raw.stopConditions || ["Stop when evidence is incomplete, the gate is blocked, or work crosses into a later phase."],
      gate: raw.exitGate || (raw.gate ? [raw.gate] : []),
      prompts,
      risk: /security|auth|payment|shell|delete|retire|production|figma/i.test(`${raw.title} ${raw.summary}`) ? "High" : "Normal"
    };
  }

  const phases = [...early, ...later].map(normalize).sort((a, b) => Number(a.number) - Number(b.number));
  const state = { complete: readComplete(), query: "", filter: "all" };

  function readComplete() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(Array.isArray(value) ? value : []);
    } catch { return new Set(); }
  }
  function saveComplete() { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.complete])); }
  function esc(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function list(items) { return `<ul>${(items || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`; }
  function promptFor(phase, prompt) { return `${PREAMBLE}\n\n${"=".repeat(84)}\nCURRENT EXECUTION\nPhase ${phase.number}: ${phase.title}\nPrompt: ${prompt.label}\n${"=".repeat(84)}\n\n${prompt.body.trim()}\n`; }
  function reviewFor(phase) { return `${PREAMBLE}\n\n${"=".repeat(84)}\nINDEPENDENT REVIEW\nPhase ${phase.number}: ${phase.title}\n${"=".repeat(84)}\n\n${REVIEW}\n`; }

  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("is-visible"), 2200);
  }
  async function copy(text, message) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;opacity:0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    toast(message);
  }

  function renderStatic() {
    $("#heroTitle").textContent = guide.title;
    $("#heroSubtitle").textContent = guide.subtitle;
    $("#updatedDate").textContent = `Version ${guide.version} · Updated ${guide.updated}`;
    $("#principleGrid").innerHTML = guide.principles.map(([title, text], index) => `<article class="principle-card"><span class="principle-card__number">PRINCIPLE ${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("");
    $("#sequence").innerHTML = phases.map((p) => `<a href="#${esc(p.id)}"><span>PHASE ${esc(p.number)}</span><strong>${esc(p.title)}</strong></a>`).join("");
    $("#metricList").innerHTML = guide.metrics.map((item) => `<li>${esc(item)}</li>`).join("");
  }

  function renderNav() {
    $("#phaseNav").innerHTML = phases.map((p) => `<a class="phase-nav__link ${state.complete.has(p.id) ? "is-complete" : ""}" href="#${esc(p.id)}" data-phase-link="${esc(p.id)}"><span class="phase-nav__number">${esc(p.number)}</span><span class="phase-nav__title">${esc(p.title)}</span><span class="phase-nav__check" aria-hidden="true"></span></a>`).join("");
  }

  function panel(label, text, index, hidden) {
    return `<section class="prompt-panel" data-prompt-panel="${index}" ${hidden ? "hidden" : ""}><div class="prompt-panel__toolbar"><span class="prompt-panel__label">${esc(label)}</span><button class="copy-button" type="button" data-copy-prompt="${index}">Copy full prompt</button></div><pre><code>${esc(text)}</code></pre></section>`;
  }

  function renderPhases() {
    $("#phaseList").innerHTML = phases.map((phase) => {
      const tabs = [...phase.prompts.map((p) => ({ label: p.label, text: promptFor(phase, p) })), { label: "Independent adversarial review", text: reviewFor(phase) }];
      return `<article class="phase-card ${state.complete.has(phase.id) ? "is-complete" : ""}" id="${esc(phase.id)}" data-phase="${esc(phase.id)}">
        <header class="phase-card__head"><div class="phase-card__number">${esc(phase.number)}</div><div><p class="phase-card__eyebrow">${esc(phase.stage)}</p><h3>${esc(phase.title)}</h3><p class="phase-card__summary">${esc(phase.summary)}</p></div><label class="complete-toggle"><input type="checkbox" data-complete="${esc(phase.id)}" ${state.complete.has(phase.id) ? "checked" : ""}/><span>Mark complete</span></label></header>
        <div class="phase-card__meta"><span class="chip">DURATION · ${esc(phase.duration)}</span><span class="chip ${phase.risk === "High" ? "chip--risk-high" : ""}">RISK · ${esc(phase.risk)}</span><span class="chip">MODE · ${esc(phase.mode)}</span></div>
        <div class="phase-card__body"><div class="phase-grid"><section class="info-panel"><h4>Goal</h4><p>${esc(phase.goal)}</p></section><section class="info-panel"><h4>Why this phase exists</h4><p>${esc(phase.why)}</p></section><section class="info-panel"><h4>Prerequisites</h4>${list(phase.prerequisites)}</section><section class="info-panel"><h4>Required outputs</h4>${list(phase.outputs)}</section><section class="info-panel"><h4>Work in scope</h4>${list(phase.tasks)}</section><section class="info-panel"><h4>Stop conditions</h4>${list(phase.stops)}</section></div>
        <div class="gate"><strong>Exit gate</strong>${list(phase.gate)}</div>
        <div class="prompt-tabs" role="tablist" aria-label="${esc(phase.title)} prompts">${tabs.map((tab, i) => `<button class="prompt-tab ${i === 0 ? "is-active" : ""}" type="button" role="tab" aria-selected="${i === 0}" data-prompt-tab="${i}">${esc(tab.label)}</button>`).join("")}</div>
        <div class="prompt-stack">${tabs.map((tab, i) => panel(tab.label, tab.text, i, i !== 0)).join("")}</div></div></article>`;
    }).join("");
    bindCards();
    filterCards();
  }

  function bindCards() {
    $$('[data-complete]').forEach((input) => input.addEventListener("change", (event) => {
      const id = event.currentTarget.dataset.complete;
      const checked = event.currentTarget.checked;
      checked ? state.complete.add(id) : state.complete.delete(id);
      saveComplete();
      renderNav(); renderPhases(); updateProgress();
      toast(`${id.replace("phase-", "Phase ")} marked ${checked ? "complete" : "incomplete"} locally`);
    }));
    $$('.phase-card').forEach((card) => {
      const phase = phases.find((p) => p.id === card.dataset.phase);
      const texts = [...phase.prompts.map((p) => promptFor(phase, p)), reviewFor(phase)];
      $$('[data-prompt-tab]', card).forEach((button) => button.addEventListener("click", () => {
        const index = Number(button.dataset.promptTab);
        $$('[data-prompt-tab]', card).forEach((item) => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-selected", String(active)); });
        $$('[data-prompt-panel]', card).forEach((item) => { item.hidden = Number(item.dataset.promptPanel) !== index; });
      }));
      $$('[data-copy-prompt]', card).forEach((button) => button.addEventListener("click", () => copy(texts[Number(button.dataset.copyPrompt)], `Copied Phase ${phase.number} prompt`)));
    });
  }

  function updateProgress() {
    const count = phases.filter((p) => state.complete.has(p.id)).length;
    const percent = Math.round((count / phases.length) * 100);
    $("#progressValue").textContent = `${percent}%`;
    $("#progressCount").textContent = `${count} / ${phases.length}`;
    $("#progressBar").style.width = `${percent}%`;
  }

  function filterCards() {
    const query = state.query.toLowerCase().trim();
    let visible = 0;
    phases.forEach((phase) => {
      const complete = state.complete.has(phase.id);
      const matchFilter = state.filter === "all" || (state.filter === "complete" && complete) || (state.filter === "todo" && !complete);
      const matchQuery = !query || JSON.stringify(phase).toLowerCase().includes(query);
      const card = document.querySelector(`[data-phase="${phase.id}"]`);
      card.hidden = !(matchFilter && matchQuery);
      if (matchFilter && matchQuery) visible += 1;
    });
    $("#emptyResults").hidden = visible !== 0;
  }

  function downloadAll() {
    const lines = [`# ${guide.title}`, "", guide.subtitle, "", "## Universal operating preamble", "", PREAMBLE, ""];
    phases.forEach((phase) => {
      lines.push("---", "", `# Phase ${phase.number}: ${phase.title}`, "");
      phase.prompts.forEach((prompt) => lines.push(`## ${prompt.label}`, "", promptFor(phase, prompt), ""));
      lines.push("## Independent adversarial review", "", reviewFor(phase), "");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "pckup-design-system-migration-prompts.md";
    document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    toast("All prompts downloaded");
  }

  function bindGlobal() {
    $("#phaseSearch").addEventListener("input", (event) => { state.query = event.currentTarget.value; filterCards(); });
    $$('[data-filter]').forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; $$('[data-filter]').forEach((item) => item.classList.toggle("is-active", item === button)); filterCards(); }));
    $("#resetProgress").addEventListener("click", () => { if (!confirm("Reset all locally stored phase completion marks?")) return; state.complete.clear(); saveComplete(); renderNav(); renderPhases(); updateProgress(); toast("Local progress reset"); });
    $("#downloadAll").addEventListener("click", downloadAll);
    $("#copyOperatingContract").addEventListener("click", () => copy(PREAMBLE, "Operating contract copied"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) $$('[data-phase-link]').forEach((link) => link.classList.toggle("is-current", link.dataset.phaseLink === visible.target.id));
    }, { rootMargin: "-15% 0px -70% 0px", threshold: [0, .25, .6] });
    $$('.phase-card').forEach((card) => observer.observe(card));
  }

  if (!phases.length) { document.body.insertAdjacentHTML("beforeend", '<p style="padding:24px;color:#ff716d">Migration phase data failed to load.</p>'); return; }
  renderStatic(); renderNav(); renderPhases(); updateProgress(); bindGlobal();
})();
