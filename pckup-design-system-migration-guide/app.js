(() => {
  "use strict";

  const meta = window.PCKUP_GUIDE_META || {};
  const phases = Array.isArray(window.PCKUP_PHASES)
    ? [...window.PCKUP_PHASES].sort((a, b) => Number(a.number) - Number(b.number))
    : [];

  const STORAGE_KEY = "pckup-design-system-migration-guide-v1";
  const THEME_KEY = "pckup-design-system-migration-theme-v1";
  const expectedPhaseCount = 13;

  const elements = {
    facts: document.getElementById("facts"),
    workflow: document.getElementById("workflow"),
    principles: document.getElementById("principles"),
    phaseNav: document.getElementById("phase-nav"),
    phaseList: document.getElementById("phase-list"),
    reusableList: document.getElementById("reusable-list"),
    phaseSearch: document.getElementById("phase-search"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    progressDetail: document.getElementById("progress-detail"),
    copyMaster: document.getElementById("copy-master"),
    copyAll: document.getElementById("copy-all"),
    exportProgress: document.getElementById("export-progress"),
    resetProgress: document.getElementById("reset-progress"),
    themeToggle: document.getElementById("theme-toggle"),
    toast: document.getElementById("toast"),
  };

  const state = loadState();
  let toastTimer = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function padPhase(number) {
    return String(Number(number)).padStart(2, "0");
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const completed = Array.isArray(parsed.completed)
        ? parsed.completed.filter((id) => typeof id === "string")
        : [];
      return { completed: new Set(completed) };
    } catch {
      return { completed: new Set() };
    }
  }

  function saveState() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed: [...state.completed], updatedAt: new Date().toISOString() }),
    );
  }

  function getCompletePrompt(phase) {
    const base = String(meta.basePrompt || "").trim();
    const phasePrompt = String(phase.prompt || "").trim();
    return `${base}\n\n============================================================\nPHASE-SPECIFIC EXECUTION PROMPT\n============================================================\n\n${phasePrompt}`;
  }

  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2300);
  }

  async function copyText(text, successMessage) {
    const value = String(text || "");
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Clipboard copy failed");
    }
    showToast(successMessage);
  }

  function renderFacts() {
    if (!elements.facts) return;
    elements.facts.innerHTML = (meta.facts || [])
      .map((fact) => `<div class="fact"><strong>${escapeHtml(fact.value)}</strong><span>${escapeHtml(fact.label)}</span></div>`)
      .join("");
  }

  function renderWorkflow() {
    if (!elements.workflow) return;
    elements.workflow.innerHTML = (meta.workflow || [])
      .map((item, index) => `<article class="workflow-card"><span>${padPhase(index + 1)}</span><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.detail)}</p></article>`)
      .join("");
  }

  function renderPrinciples() {
    if (!elements.principles) return;
    elements.principles.innerHTML = (meta.principles || [])
      .map((principle, index) => `<div class="principle"><span>${padPhase(index + 1)}</span><strong>${escapeHtml(principle)}</strong></div>`)
      .join("");
  }

  function renderPhaseNav() {
    if (!elements.phaseNav) return;
    elements.phaseNav.innerHTML = phases
      .map((phase) => `<a href="#${escapeHtml(phase.id)}" data-phase-link="${escapeHtml(phase.id)}"><span class="phase-nav-number">${padPhase(phase.number)}</span><span>${escapeHtml(phase.title)}</span><span class="phase-nav-status" aria-hidden="true"></span></a>`)
      .join("");
  }

  function renderPhases() {
    if (!elements.phaseList) return;
    elements.phaseList.innerHTML = phases
      .map((phase, index) => {
        const completePrompt = getCompletePrompt(phase);
        const tags = (phase.tags || []).map((tag) => `<span class="phase-tag">${escapeHtml(tag)}</span>`).join("");
        const outputs = (phase.outputs || []).map((output) => `<li><code>${escapeHtml(output)}</code></li>`).join("");
        const isComplete = state.completed.has(phase.id);
        const open = index === 0;
        return `<article class="phase-card${isComplete ? " is-complete" : ""}${open ? " is-open" : ""}" id="${escapeHtml(phase.id)}" data-phase-index="${index}">
          <button class="phase-summary" type="button" aria-expanded="${open}" aria-controls="${escapeHtml(phase.id)}-body">
            <span class="phase-number">${padPhase(phase.number)}</span>
            <span class="phase-summary-copy"><span class="phase-meta"><span class="phase-code">${escapeHtml(phase.code)}</span><span class="phase-dep">Depends on: ${escapeHtml(phase.dependsOn)}</span></span><h3>${escapeHtml(phase.title)}</h3><p>${escapeHtml(phase.subtitle)}</p></span>
            <span class="phase-chevron" aria-hidden="true">⌄</span>
          </button>
          <div class="phase-body" id="${escapeHtml(phase.id)}-body">
            <div class="phase-grid">
              <section class="phase-panel"><h4>Objective</h4><p>${escapeHtml(phase.objective)}</p></section>
              <section class="phase-panel"><h4>Required outputs</h4><ul>${outputs}</ul></section>
            </div>
            <section class="phase-gate"><strong>Exit gate</strong><p>${escapeHtml(phase.gate)}</p></section>
            <section class="prompt-shell"><div class="prompt-toolbar"><span>Complete copy-and-paste prompt</span><button class="prompt-copy" type="button" data-copy-phase="${escapeHtml(phase.id)}">Copy prompt</button></div><pre class="prompt-code">${escapeHtml(completePrompt)}</pre></section>
            <footer class="phase-footer"><div class="phase-tags">${tags}</div><button class="phase-complete" type="button" data-complete-phase="${escapeHtml(phase.id)}" data-complete="${isComplete}">${isComplete ? "✓ Phase complete" : "Mark phase complete"}</button></footer>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderReusablePrompts() {
    if (!elements.reusableList) return;
    elements.reusableList.innerHTML = (meta.reusablePrompts || [])
      .map((item) => `<article class="reusable-card"><div class="reusable-head"><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><button class="prompt-copy" type="button" data-copy-reusable="${escapeHtml(item.id)}">Copy</button></div><pre>${escapeHtml(item.prompt)}</pre></article>`)
      .join("");
  }

  function updateProgress() {
    const completed = phases.filter((phase) => state.completed.has(phase.id)).length;
    const total = phases.length || expectedPhaseCount;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    if (elements.progressLabel) elements.progressLabel.textContent = `${percentage}%`;
    if (elements.progressBar) elements.progressBar.style.width = `${percentage}%`;
    if (elements.progressDetail) elements.progressDetail.textContent = `${completed} of ${total} phases marked complete`;
    document.querySelectorAll("[data-phase-link]").forEach((link) => {
      const id = link.getAttribute("data-phase-link");
      link.classList.toggle("is-complete", state.completed.has(id));
    });
    document.querySelectorAll(".phase-card").forEach((card) => card.classList.toggle("is-complete", state.completed.has(card.id)));
    document.querySelectorAll("[data-complete-phase]").forEach((button) => {
      const id = button.getAttribute("data-complete-phase");
      const isComplete = state.completed.has(id);
      button.setAttribute("data-complete", String(isComplete));
      button.textContent = isComplete ? "✓ Phase complete" : "Mark phase complete";
    });
  }

  function firstIncompletePrerequisite(index) {
    for (let i = 0; i < index; i += 1) {
      if (!state.completed.has(phases[i].id)) return phases[i];
    }
    return null;
  }

  function toggleComplete(phaseId) {
    const index = phases.findIndex((phase) => phase.id === phaseId);
    if (index < 0) return;
    if (state.completed.has(phaseId)) {
      state.completed.delete(phaseId);
      for (let i = index + 1; i < phases.length; i += 1) state.completed.delete(phases[i].id);
      saveState();
      updateProgress();
      showToast("Phase reopened. Later phase marks were cleared to preserve sequence.");
      return;
    }
    const prerequisite = firstIncompletePrerequisite(index);
    if (prerequisite) {
      openPhase(prerequisite.id, true);
      showToast(`Complete ${prerequisite.code} before marking this phase complete.`);
      return;
    }
    state.completed.add(phaseId);
    saveState();
    updateProgress();
    const next = phases[index + 1];
    showToast(next ? `${phases[index].code} complete. ${next.code} is now unlocked.` : "All phases marked complete locally.");
  }

  function openPhase(phaseId, scroll = false) {
    const card = document.getElementById(phaseId);
    if (!card) return;
    card.classList.add("is-open");
    card.querySelector(".phase-summary")?.setAttribute("aria-expanded", "true");
    if (scroll) card.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function togglePhase(card) {
    const willOpen = !card.classList.contains("is-open");
    card.classList.toggle("is-open", willOpen);
    card.querySelector(".phase-summary")?.setAttribute("aria-expanded", String(willOpen));
  }

  function phaseSearchText(phase) {
    return [phase.code, phase.title, phase.subtitle, phase.objective, phase.gate, phase.dependsOn, ...(phase.tags || []), ...(phase.outputs || []), phase.prompt].join(" ").toLowerCase();
  }

  function filterPhases(query) {
    const normalized = String(query || "").trim().toLowerCase();
    phases.forEach((phase) => {
      const card = document.getElementById(phase.id);
      if (!card) return;
      const match = normalized.length === 0 || phaseSearchText(phase).includes(normalized);
      card.hidden = !match;
      if (normalized && match) openPhase(phase.id, false);
    });
  }

  function allPromptsText() {
    const sections = phases.map((phase) => `# ${phase.code}: ${phase.title}\n\n${getCompletePrompt(phase)}`);
    const reusable = (meta.reusablePrompts || []).map((item) => `# Reusable: ${item.title}\n\n${item.prompt}`);
    return `PCKUP DESIGN SYSTEM MIGRATION GUIDE\nRepository: senpex/pckup-web-app\nGenerated: ${new Date().toISOString()}\n\n${sections.join("\n\n============================================================\n\n")}\n\n============================================================\nREUSABLE CONTROL PROMPTS\n============================================================\n\n${reusable.join("\n\n------------------------------------------------------------\n\n")}`;
  }

  function progressText() {
    const lines = phases.map((phase) => `- [${state.completed.has(phase.id) ? "x" : " "}] ${phase.code}: ${phase.title}`);
    return `Pckup Design System Migration Progress\nUpdated: ${new Date().toISOString()}\n\n${lines.join("\n")}`;
  }

  function setTheme(theme) {
    const value = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(THEME_KEY, value);
    if (elements.themeToggle) {
      elements.themeToggle.textContent = value === "light" ? "☾" : "◐";
      elements.themeToggle.setAttribute("aria-label", value === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  function initializeTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return setTheme(stored);
    setTheme(window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }

  function wireEvents() {
    elements.phaseList?.addEventListener("click", async (event) => {
      const summary = event.target.closest(".phase-summary");
      if (summary) return togglePhase(summary.closest(".phase-card"));
      const copyButton = event.target.closest("[data-copy-phase]");
      if (copyButton) {
        const phase = phases.find((item) => item.id === copyButton.getAttribute("data-copy-phase"));
        if (phase) await copyText(getCompletePrompt(phase), `${phase.code} prompt copied.`);
        return;
      }
      const completeButton = event.target.closest("[data-complete-phase]");
      if (completeButton) toggleComplete(completeButton.getAttribute("data-complete-phase"));
    });

    elements.reusableList?.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-copy-reusable]");
      if (!button) return;
      const item = (meta.reusablePrompts || []).find((entry) => entry.id === button.getAttribute("data-copy-reusable"));
      if (item) await copyText(item.prompt, `${item.title} prompt copied.`);
    });

    elements.phaseSearch?.addEventListener("input", (event) => filterPhases(event.currentTarget.value));
    elements.copyMaster?.addEventListener("click", () => void copyText(meta.basePrompt || "", "Master migration context copied."));
    elements.copyAll?.addEventListener("click", () => void copyText(allPromptsText(), "All phase and reusable prompts copied."));
    elements.exportProgress?.addEventListener("click", () => void copyText(progressText(), "Progress checklist copied."));
    elements.resetProgress?.addEventListener("click", () => {
      if (!window.confirm("Reset every locally marked phase? This does not change the repository.")) return;
      state.completed.clear();
      saveState();
      updateProgress();
      showToast("Local progress reset.");
    });
    elements.themeToggle?.addEventListener("click", () => setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"));
  }

  function initializeActiveNav() {
    const cards = phases.map((phase) => document.getElementById(phase.id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || cards.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      document.querySelectorAll("[data-phase-link]").forEach((link) => link.classList.toggle("is-active", link.getAttribute("data-phase-link") === visible.target.id));
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });
    cards.forEach((card) => observer.observe(card));
  }

  function validateData() {
    const ids = new Set();
    const numbers = new Set();
    const errors = [];
    phases.forEach((phase) => {
      if (!phase.id || ids.has(phase.id)) errors.push(`Duplicate or missing phase id: ${phase.id}`);
      if (!Number.isInteger(Number(phase.number)) || numbers.has(Number(phase.number))) errors.push(`Duplicate or invalid phase number: ${phase.number}`);
      ids.add(phase.id);
      numbers.add(Number(phase.number));
      if (!phase.prompt || !phase.gate || !phase.objective) errors.push(`Incomplete phase data: ${phase.id}`);
    });
    if (phases.length !== expectedPhaseCount) errors.push(`Expected ${expectedPhaseCount} phases but loaded ${phases.length}.`);
    if (errors.length > 0) {
      console.error("Pckup migration guide validation failed", errors);
      showToast("Guide data did not load completely. Check the console.");
    }
  }

  initializeTheme();
  renderFacts();
  renderWorkflow();
  renderPrinciples();
  renderPhaseNav();
  renderPhases();
  renderReusablePrompts();
  updateProgress();
  wireEvents();
  initializeActiveNav();
  const hashId = window.location.hash.slice(1);
  if (phases.some((phase) => phase.id === hashId)) openPhase(hashId, false);
  validateData();
})();
