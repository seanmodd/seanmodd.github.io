(() => {
  "use strict";

  const STORAGE = {
    settings: "pckup-ds-playbook-settings-v1",
    progress: "pckup-ds-playbook-progress-v1"
  };

  const DEFAULTS = {
    repo: "senpex/pckup-web-app",
    base: "main",
    docs: "docs/design-system-migration",
    agent: "Claude Code or Codex",
    figma: "[PASTE FIGMA LIBRARY URL LOCALLY IF AVAILABLE]",
    family: "Button",
    surface: "authentication",
    run: "pckup-ds-migration-001"
  };

  const phases = Array.isArray(window.PCKUP_MIGRATION_PHASES)
    ? window.PCKUP_MIGRATION_PHASES
    : [];
  const controller = String(window.PCKUP_CONTROLLER_PROMPT || "");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const elements = {
    nav: $("#phase-nav"),
    list: $("#phase-list"),
    search: $("#phase-search"),
    progressPercent: $("#progress-percent"),
    progressBar: $("#progress-bar"),
    progressCopy: $("#progress-copy"),
    resetProgress: $("#reset-progress"),
    settingsButton: $("#settings-button"),
    settingsDialog: $("#settings-dialog"),
    saveSettings: $("#save-settings"),
    restoreSettings: $("#restore-settings"),
    copyNext: $("#copy-next-button"),
    copyController: $("#copy-controller-button"),
    copyControllerInline: $("#copy-controller-inline"),
    controllerPreview: $("#controller-preview"),
    exportButton: $("#export-button"),
    toast: $("#toast"),
    sidebar: $("#sidebar"),
    menuButton: $("#menu-button"),
    mobileScrim: $("#mobile-scrim")
  };

  function parseStored(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? { ...fallback, ...JSON.parse(raw) } : { ...fallback };
    } catch {
      return { ...fallback };
    }
  }

  let settings = parseStored(STORAGE.settings, DEFAULTS);
  let completed = (() => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE.progress) || "[]");
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  })();

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function valueFor(key) {
    const values = {
      REPO: settings.repo,
      BASE_BRANCH: settings.base,
      DOCS_ROOT: settings.docs,
      AGENT: settings.agent,
      FIGMA_URL: settings.figma || DEFAULTS.figma,
      FAMILY: settings.family,
      SURFACE: settings.surface,
      RUN_ID: settings.run
    };
    return values[key] ?? `{{${key}}}`;
  }

  function interpolate(text) {
    return String(text).replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => valueFor(key));
  }

  function saveSettings() {
    localStorage.setItem(STORAGE.settings, JSON.stringify(settings));
  }

  function saveProgress() {
    localStorage.setItem(STORAGE.progress, JSON.stringify([...completed]));
  }

  let toastTimer;
  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2400);
  }

  async function copyText(text, successMessage = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (!ok) throw new Error("Copy failed");
    }
    showToast(successMessage);
  }

  function controllerText() {
    return interpolate(controller);
  }

  function phaseText(phase) {
    return interpolate(phase.prompt);
  }

  function combinedPrompt(phase) {
    return `${controllerText()}\n\n---\n\n${phaseText(phase)}`;
  }

  function renderNav(filteredPhases = phases) {
    if (!elements.nav) return;
    elements.nav.innerHTML = filteredPhases.map((phase) => {
      const isComplete = completed.has(phase.id);
      return `
        <a class="phase-nav__item${isComplete ? " is-complete" : ""}" href="#${escapeHtml(phase.id)}" data-nav-id="${escapeHtml(phase.id)}">
          <span class="phase-nav__number">${escapeHtml(phase.number)}</span>
          <span class="phase-nav__label">${escapeHtml(phase.title)}</span>
          <span class="phase-nav__check" aria-hidden="true">${isComplete ? "✓" : ""}</span>
        </a>`;
    }).join("");
  }

  function listHtml(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(interpolate(item))}</li>`).join("")}</ul>`;
  }

  function renderPhases(filteredPhases = phases) {
    if (!elements.list) return;
    if (!filteredPhases.length) {
      elements.list.innerHTML = `<div class="empty-search">No phases match this search. Try a component family, artifact, or stage.</div>`;
      return;
    }

    elements.list.innerHTML = filteredPhases.map((phase) => {
      const isComplete = completed.has(phase.id);
      const repeatBadge = phase.repeatable ? `<span class="badge badge--repeat">Repeatable</span>` : "";
      return `
        <article class="phase-card${isComplete ? " is-complete" : ""}" id="${escapeHtml(phase.id)}" data-phase-id="${escapeHtml(phase.id)}">
          <div class="phase-card__head">
            <div class="phase-card__number">${escapeHtml(phase.number)}</div>
            <div>
              <div class="phase-card__title-row">
                <h3>${escapeHtml(phase.title)}</h3>
                ${repeatBadge}
              </div>
              <p class="phase-card__summary">${escapeHtml(phase.summary)}</p>
              <div class="phase-card__meta">
                <span class="badge">${escapeHtml(phase.stage)}</span>
                <span class="badge">${escapeHtml(phase.mode)}</span>
                <span class="badge badge--gate">Gate: ${escapeHtml(phase.gate)}</span>
              </div>
            </div>
            <div class="phase-card__actions">
              <label class="complete-toggle">
                <input type="checkbox" data-complete-id="${escapeHtml(phase.id)}" ${isComplete ? "checked" : ""} />
                <span>${isComplete ? "Complete" : "Mark complete"}</span>
              </label>
              <button class="button button--secondary" type="button" data-toggle-id="${escapeHtml(phase.id)}" aria-expanded="false">Open phase</button>
              <button class="button button--primary" type="button" data-copy-combined="${escapeHtml(phase.id)}">Copy + controller</button>
            </div>
          </div>
          <div class="phase-card__body">
            <div class="phase-card__grid">
              <section class="info-panel"><h4>Why this phase exists</h4>${listHtml(phase.why)}</section>
              <section class="info-panel"><h4>Required inputs</h4>${listHtml(phase.inputs)}</section>
              <section class="info-panel"><h4>Required artifacts</h4>${listHtml(phase.artifacts)}</section>
              <section class="info-panel"><h4>Exit gates</h4>${listHtml(phase.exitGates)}</section>
              <section class="info-panel info-panel--wide"><h4>Primary risks</h4>${listHtml(phase.risks)}</section>
            </div>
            <section class="phase-card__prompt">
              <div class="phase-card__prompt-toolbar">
                <strong>Exact phase prompt · settings applied locally</strong>
                <div>
                  <button class="button button--secondary" type="button" data-copy-phase="${escapeHtml(phase.id)}">Copy phase only</button>
                  <button class="button button--primary" type="button" data-copy-combined="${escapeHtml(phase.id)}">Copy controller + phase</button>
                </div>
              </div>
              <pre class="prompt-code"><code data-prompt-code="${escapeHtml(phase.id)}">${escapeHtml(phaseText(phase))}</code></pre>
            </section>
          </div>
        </article>`;
    }).join("");

    bindPhaseEvents();
    openHashPhase();
  }

  function bindPhaseEvents() {
    $$('[data-toggle-id]').forEach((button) => {
      button.addEventListener("click", () => {
        const card = document.getElementById(button.dataset.toggleId);
        if (!card) return;
        const open = card.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
        button.textContent = open ? "Close phase" : "Open phase";
      });
    });

    $$('[data-copy-phase]').forEach((button) => {
      button.addEventListener("click", () => {
        const phase = phases.find((item) => item.id === button.dataset.copyPhase);
        if (phase) void copyText(phaseText(phase), `Phase ${phase.number} prompt copied`);
      });
    });

    $$('[data-copy-combined]').forEach((button) => {
      button.addEventListener("click", () => {
        const phase = phases.find((item) => item.id === button.dataset.copyCombined);
        if (phase) void copyText(combinedPrompt(phase), `Controller + Phase ${phase.number} copied`);
      });
    });

    $$('[data-complete-id]').forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.dataset.completeId;
        if (input.checked) completed.add(id);
        else completed.delete(id);
        saveProgress();
        updateProgress();
        const query = elements.search?.value || "";
        applySearch(query, false);
      });
    });
  }

  function updateProgress() {
    const count = phases.filter((phase) => completed.has(phase.id)).length;
    const percent = phases.length ? Math.round((count / phases.length) * 100) : 0;
    if (elements.progressPercent) elements.progressPercent.textContent = `${percent}%`;
    if (elements.progressBar) elements.progressBar.style.width = `${percent}%`;
    if (elements.progressCopy) elements.progressCopy.textContent = `${count} of ${phases.length} phases complete`;
  }

  function applySearch(query, announce = true) {
    const normalized = String(query).trim().toLowerCase();
    const filtered = normalized
      ? phases.filter((phase) => JSON.stringify(phase).toLowerCase().includes(normalized))
      : phases;
    renderNav(filtered);
    renderPhases(filtered);
    if (announce && normalized) showToast(`${filtered.length} phase${filtered.length === 1 ? "" : "s"} found`);
  }

  function openHashPhase() {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith("phase-")) return;
    const card = document.getElementById(hash);
    if (!card) return;
    card.classList.add("is-open");
    const toggle = card.querySelector('[data-toggle-id]');
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Close phase";
    }
  }

  function updatePromptText() {
    if (elements.controllerPreview) elements.controllerPreview.textContent = controllerText();
    $$('[data-prompt-code]').forEach((code) => {
      const phase = phases.find((item) => item.id === code.dataset.promptCode);
      if (phase) code.textContent = phaseText(phase);
    });
  }

  function formSettings() {
    return {
      repo: $("#setting-repo")?.value.trim() || DEFAULTS.repo,
      base: $("#setting-base")?.value.trim() || DEFAULTS.base,
      docs: $("#setting-docs")?.value.trim() || DEFAULTS.docs,
      agent: $("#setting-agent")?.value.trim() || DEFAULTS.agent,
      figma: $("#setting-figma")?.value.trim() || DEFAULTS.figma,
      family: $("#setting-family")?.value.trim() || DEFAULTS.family,
      surface: $("#setting-surface")?.value.trim() || DEFAULTS.surface,
      run: $("#setting-run")?.value.trim() || DEFAULTS.run
    };
  }

  function populateSettings() {
    const map = {
      "#setting-repo": settings.repo,
      "#setting-base": settings.base,
      "#setting-docs": settings.docs,
      "#setting-agent": settings.agent,
      "#setting-figma": settings.figma === DEFAULTS.figma ? "" : settings.figma,
      "#setting-family": settings.family,
      "#setting-surface": settings.surface,
      "#setting-run": settings.run
    };
    Object.entries(map).forEach(([selector, value]) => {
      const input = $(selector);
      if (input) input.value = value;
    });
  }

  function openSettings() {
    populateSettings();
    if (elements.settingsDialog?.showModal) elements.settingsDialog.showModal();
    else elements.settingsDialog?.setAttribute("open", "");
  }

  function nextIncompletePhase() {
    return phases.find((phase) => !completed.has(phase.id)) || phases.at(-1);
  }

  function exportMarkdown() {
    const lines = [
      "# Pckup Design System Migration Playbook — Prompt Packet",
      "",
      `Generated locally: ${new Date().toISOString()}`,
      `Repository: ${settings.repo}`,
      `Base branch: ${settings.base}`,
      `Run ID: ${settings.run}`,
      "",
      "## Migration controller prompt",
      "",
      "```text",
      controllerText(),
      "```",
      ""
    ];

    phases.forEach((phase) => {
      lines.push(
        `## Phase ${phase.number} — ${phase.title}`,
        "",
        phase.summary,
        "",
        `Status in this browser: ${completed.has(phase.id) ? "complete" : "not complete"}`,
        "",
        "### Exact phase prompt",
        "",
        "```text",
        phaseText(phase),
        "```",
        ""
      );
    });

    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pckup-design-system-migration-prompts-${settings.run}.md`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Prompt packet exported");
  }

  function closeMobileMenu() {
    elements.sidebar?.classList.remove("is-open");
    elements.menuButton?.setAttribute("aria-expanded", "false");
    if (elements.mobileScrim) elements.mobileScrim.hidden = true;
  }

  function setupScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      $$('[data-nav-id]').forEach((item) => item.classList.toggle("is-active", item.dataset.navId === visible.target.id));
    }, { rootMargin: "-20% 0px -70%", threshold: [0.01, 0.25, 0.5] });
    phases.forEach((phase) => {
      const card = document.getElementById(phase.id);
      if (card) observer.observe(card);
    });
  }

  elements.search?.addEventListener("input", (event) => applySearch(event.target.value, false));
  elements.resetProgress?.addEventListener("click", () => {
    if (!window.confirm("Reset completion state for all phases in this browser?")) return;
    completed = new Set();
    saveProgress();
    updateProgress();
    applySearch(elements.search?.value || "", false);
    showToast("Local progress reset");
  });
  elements.settingsButton?.addEventListener("click", openSettings);
  elements.saveSettings?.addEventListener("click", () => {
    settings = formSettings();
    saveSettings();
    updatePromptText();
    showToast("Prompt settings saved locally");
  });
  elements.restoreSettings?.addEventListener("click", () => {
    settings = { ...DEFAULTS };
    populateSettings();
    saveSettings();
    updatePromptText();
    showToast("Default settings restored");
  });
  elements.copyController?.addEventListener("click", () => void copyText(controllerText(), "Controller prompt copied"));
  elements.copyControllerInline?.addEventListener("click", () => void copyText(controllerText(), "Controller prompt copied"));
  elements.copyNext?.addEventListener("click", () => {
    const phase = nextIncompletePhase();
    if (phase) void copyText(combinedPrompt(phase), `Controller + Phase ${phase.number} copied`);
  });
  elements.exportButton?.addEventListener("click", exportMarkdown);
  elements.menuButton?.addEventListener("click", () => {
    const open = !elements.sidebar?.classList.contains("is-open");
    elements.sidebar?.classList.toggle("is-open", open);
    elements.menuButton?.setAttribute("aria-expanded", String(open));
    if (elements.mobileScrim) elements.mobileScrim.hidden = !open;
  });
  elements.mobileScrim?.addEventListener("click", closeMobileMenu);
  elements.nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMobileMenu();
  });
  window.addEventListener("hashchange", openHashPhase);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.sidebar?.classList.contains("is-open")) closeMobileMenu();
  });

  renderNav();
  renderPhases();
  updateProgress();
  updatePromptText();
  setupScrollSpy();
})();
