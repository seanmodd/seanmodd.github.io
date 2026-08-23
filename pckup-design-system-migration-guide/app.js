(() => {
  "use strict";

  const guide = window.PCKUP_MIGRATION_GUIDE;
  if (!guide || !Array.isArray(guide.phases) || guide.phases.length === 0) {
    document.body.innerHTML = '<main style="max-width:760px;margin:80px auto;padding:24px;color:white;font-family:system-ui"><h1>Guide data failed to load</h1><p>Refresh the page or verify data.js.</p></main>';
    return;
  }

  const phases = guide.phases;
  const storageKey = "pckup-design-system-migration-guide:complete:v1";
  const openKey = "pckup-design-system-migration-guide:open:v1";
  const $ = (id) => document.getElementById(id);
  const elements = {
    facts: $("facts"), workflow: $("workflow"), principles: $("principles"),
    nav: $("phase-nav"), list: $("phase-list"), reusable: $("reusable-list"),
    steady: $("steady-loop"), search: $("phase-search"),
    progressLabel: $("progress-label"), progressBar: $("progress-bar"),
    progressDetail: $("progress-detail"), reset: $("reset-progress"),
    copyMaster: $("copy-master"), download: $("download-all"), toast: $("toast")
  };

  let toastTimer = 0;
  let completed = readCompleted();

  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = String(text);
    return el;
  }

  function readCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(value) ? value.filter((id) => phases.some((p) => p.id === id)) : []);
    } catch {
      return new Set();
    }
  }

  function persistCompleted() {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  }

  function fullPhasePrompt(phase) {
    return `${guide.master.trim()}\n\n${"=".repeat(90)}\nCURRENT EXECUTION · PHASE ${phase.number}: ${phase.title}\nDEPENDENCY: ${phase.depends}\n${"=".repeat(90)}\n\n${phase.prompt.trim()}\n`;
  }

  function fullReusablePrompt(item) {
    return `${guide.master.trim()}\n\n${"=".repeat(90)}\nREUSABLE MIGRATION CONTROL · ${item.title}\n${"=".repeat(90)}\n\n${item.prompt.trim()}\n`;
  }

  async function copyText(text, message) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = node("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.append(area);
        area.select();
        if (!document.execCommand("copy")) throw new Error("copy failed");
        area.remove();
      }
      toast(message);
    } catch {
      toast("Copy failed. Select the prompt text manually.");
    }
  }

  function toast(message) {
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("show");
    toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2300);
  }

  function renderFacts() {
    guide.facts.forEach((fact) => {
      const card = node("article", "fact");
      card.append(node("strong", "", fact.value), node("span", "", fact.label));
      elements.facts.append(card);
    });
  }

  function renderWorkflow() {
    guide.workflow.forEach((step, index) => {
      const card = node("article", "flow-step");
      card.append(node("span", "", String(index + 1).padStart(2, "0")), node("strong", "", step.label), node("p", "", step.detail));
      elements.workflow.append(card);
    });
  }

  function renderPrinciples() {
    guide.principles.forEach((item) => elements.principles.append(node("div", "principle", item)));
  }

  function renderNav() {
    phases.forEach((phase) => {
      const link = node("a");
      link.href = `#${phase.id}`;
      link.dataset.phaseLink = phase.id;
      link.append(node("span", "nav-number", phase.number), node("span", "nav-label", phase.title), node("span", "nav-status"));
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState(null, "", `#${phase.id}`);
        openPhase(phase.id, true);
      });
      elements.nav.append(link);
    });
  }

  function list(items) {
    const ul = node("ul");
    (items || []).forEach((item) => ul.append(node("li", "", item)));
    return ul;
  }

  function panel(title, body) {
    const section = node("section", "panel");
    section.append(node("h4", "", title));
    if (Array.isArray(body)) section.append(list(body));
    else section.append(node("p", "", body));
    return section;
  }

  function setOpen(card, open) {
    card.classList.toggle("open", open);
    const summary = card.querySelector(".phase-summary");
    summary.setAttribute("aria-expanded", String(open));
    if (open) localStorage.setItem(openKey, card.id);
  }

  function renderPhases() {
    phases.forEach((phase, index) => {
      const card = node("article", "phase-card");
      card.id = phase.id;
      card.dataset.search = JSON.stringify(phase).toLowerCase();

      const summary = node("button", "phase-summary");
      summary.type = "button";
      summary.setAttribute("aria-expanded", "false");
      summary.setAttribute("aria-controls", `${phase.id}-body`);
      summary.append(node("span", "phase-number", phase.number));

      const title = node("span", "phase-title");
      const meta = node("span", "phase-meta");
      meta.append(node("span", "", phase.stage), node("span", "", `${phase.depends} · ${phase.duration}`));
      title.append(meta, node("h3", "", phase.title), node("p", "", phase.summary));
      summary.append(title, node("span", "chevron", "⌄"));

      const body = node("div", "phase-body");
      body.id = `${phase.id}-body`;
      const grid = node("div", "phase-grid");
      grid.append(panel("Dependency", phase.depends), panel("Duration", phase.duration), panel("Required outputs", phase.outputs));
      body.append(grid);

      const gate = node("section", "gate");
      gate.append(node("strong", "", "Exit gate"), node("p", "", phase.gate));
      body.append(gate);

      const prompt = node("section", "prompt");
      const head = node("div", "prompt-head");
      head.append(node("span", "", `Complete Phase ${phase.number} prompt`));
      const actions = node("div", "prompt-actions");
      const expand = node("button", "prompt-button", "Expand");
      expand.type = "button";
      expand.setAttribute("aria-expanded", "false");
      const copy = node("button", "prompt-button", "Copy exact prompt");
      copy.type = "button";
      actions.append(expand, copy);
      head.append(actions);
      const pre = node("pre", "collapsed", fullPhasePrompt(phase));
      prompt.append(head, pre);
      body.append(prompt);

      const footer = node("div", "phase-footer");
      const complete = node("button", "complete-button", "Mark phase complete");
      complete.type = "button";
      complete.dataset.complete = phase.id;
      footer.append(complete);
      const next = phases[index + 1];
      if (next) {
        const nextLink = node("a", "next-link", `Next: Phase ${next.number} →`);
        nextLink.href = `#${next.id}`;
        nextLink.addEventListener("click", (event) => {
          event.preventDefault();
          history.pushState(null, "", `#${next.id}`);
          openPhase(next.id, true);
        });
        footer.append(nextLink);
      } else {
        footer.append(node("span", "next-link", "Program complete ✓"));
      }
      body.append(footer);

      summary.addEventListener("click", () => setOpen(card, !card.classList.contains("open")));
      expand.addEventListener("click", () => {
        const collapsed = pre.classList.toggle("collapsed");
        expand.textContent = collapsed ? "Expand" : "Collapse";
        expand.setAttribute("aria-expanded", String(!collapsed));
      });
      copy.addEventListener("click", () => void copyText(fullPhasePrompt(phase), `Phase ${phase.number} prompt copied.`));
      complete.addEventListener("click", () => {
        if (completed.has(phase.id)) completed.delete(phase.id); else completed.add(phase.id);
        persistCompleted();
        updateProgress();
        toast(completed.has(phase.id) ? "Phase marked complete." : "Phase marked incomplete.");
      });

      card.append(summary, body);
      elements.list.append(card);
    });
  }

  function renderReusable() {
    guide.reusable.forEach((item) => {
      const card = node("article", "reusable-card");
      card.append(node("h3", "", item.title), node("p", "", item.description));
      const details = node("details");
      details.append(node("summary", "", "View prompt"), node("pre", "", fullReusablePrompt(item)));
      const copy = node("button", "prompt-button", "Copy exact prompt");
      copy.type = "button";
      copy.addEventListener("click", () => void copyText(fullReusablePrompt(item), `${item.title} copied.`));
      card.append(details, copy);
      elements.reusable.append(card);
    });
  }

  function renderSteady() {
    guide.steady.forEach((step) => elements.steady.append(node("li", "", step)));
  }

  function updateProgress() {
    const count = phases.filter((p) => completed.has(p.id)).length;
    const percent = Math.round((count / phases.length) * 100);
    elements.progressLabel.textContent = `${percent}%`;
    elements.progressBar.style.width = `${percent}%`;
    elements.progressDetail.textContent = `${count} of ${phases.length} phases marked complete`;
    phases.forEach((phase) => {
      const done = completed.has(phase.id);
      document.getElementById(phase.id)?.classList.toggle("complete", done);
      document.querySelector(`[data-phase-link="${phase.id}"]`)?.classList.toggle("complete", done);
      const button = document.querySelector(`[data-complete="${phase.id}"]`);
      if (button) button.textContent = done ? "Completed ✓" : "Mark phase complete";
    });
  }

  function openPhase(id, scroll) {
    const target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll(".phase-card").forEach((card) => setOpen(card, card === target));
    if (scroll) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applySearch() {
    const q = elements.search.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".phase-card").forEach((card) => {
      const show = !q || card.dataset.search.includes(q);
      card.hidden = !show;
      if (show) visible += 1;
    });
    let empty = elements.list.querySelector(".no-results");
    if (!visible && !empty) {
      empty = node("div", "no-results", "No migration phases match that search.");
      elements.list.append(empty);
    } else if (visible && empty) empty.remove();
  }

  function downloadAll() {
    const lines = [guide.title, `Repository: ${guide.repository}`, "", "MASTER OPERATING CONTEXT", "=".repeat(90), guide.master.trim(), ""];
    phases.forEach((phase) => lines.push("", "#".repeat(90), `PHASE ${phase.number}: ${phase.title}`, "#".repeat(90), "", fullPhasePrompt(phase)));
    guide.reusable.forEach((item) => lines.push("", "#".repeat(90), `REUSABLE: ${item.title}`, "#".repeat(90), "", fullReusablePrompt(item)));
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = node("a");
    a.href = url;
    a.download = "pckup-design-system-migration-prompts.txt";
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast("Downloaded all prompts.");
  }

  function observeActive() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      document.querySelectorAll("[data-phase-link]").forEach((link) => link.classList.toggle("active", link.dataset.phaseLink === visible.target.id));
    }, { rootMargin: "-18% 0px -65% 0px", threshold: [0, .1, .25] });
    document.querySelectorAll(".phase-card").forEach((card) => observer.observe(card));
  }

  renderFacts();
  renderWorkflow();
  renderPrinciples();
  renderNav();
  renderPhases();
  renderReusable();
  renderSteady();
  updateProgress();
  observeActive();

  elements.search.addEventListener("input", applySearch);
  elements.copyMaster.addEventListener("click", () => void copyText(guide.master.trim(), "Master context copied."));
  elements.download.addEventListener("click", downloadAll);
  elements.reset.addEventListener("click", () => {
    if (!window.confirm("Reset locally saved migration progress?")) return;
    completed = new Set();
    persistCompleted();
    updateProgress();
    toast("Local progress reset.");
  });
  window.addEventListener("popstate", () => {
    const id = location.hash.slice(1);
    if (phases.some((p) => p.id === id)) openPhase(id, true);
  });

  const hash = location.hash.slice(1);
  const saved = localStorage.getItem(openKey);
  const initial = phases.some((p) => p.id === hash) ? hash : phases.some((p) => p.id === saved) ? saved : phases[0].id;
  openPhase(initial, Boolean(hash));
})();
