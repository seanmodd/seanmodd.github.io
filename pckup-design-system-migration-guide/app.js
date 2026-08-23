(() => {
  "use strict";

  const guide = window.PCKUP_GUIDE;
  const phases = Array.isArray(window.PCKUP_PHASES) ? window.PCKUP_PHASES : [];

  if (!guide || phases.length === 0) {
    document.body.innerHTML =
      '<main style="max-width:760px;margin:80px auto;padding:24px;font-family:system-ui;color:#fff;background:#111;border-radius:18px"><h1>Guide data failed to load</h1><p>Refresh the page. If the problem persists, verify that every phase data file is available.</p></main>';
    return;
  }

  const expectedPhaseCount = 13;
  const storageKey = "pckup-design-system-migration-progress-v1";
  const openPhaseKey = "pckup-design-system-migration-open-phase-v1";
  const nav = document.getElementById("phase-nav");
  const phaseList = document.getElementById("phase-list");
  const rulesGrid = document.getElementById("rules-grid");
  const completionGrid = document.getElementById("completion-grid");
  const steadyLoop = document.getElementById("steady-loop");
  const progressLabel = document.getElementById("progress-label");
  const progressBar = document.getElementById("progress-bar");
  const progressDetail = document.getElementById("progress-detail");
  const searchInput = document.getElementById("phase-search");
  const toast = document.getElementById("toast");
  const navLinks = new Map();
  const phaseCards = new Map();
  let toastTimer = 0;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function list(items) {
    const ul = element("ul");
    items.forEach((item) => ul.append(element("li", "", item)));
    return ul;
  }

  function readCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(value)) return new Set();
      return new Set(value.filter((id) => phases.some((phase) => phase.id === id)));
    } catch {
      return new Set();
    }
  }

  let completed = readCompleted();

  function persistCompleted() {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = element("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.append(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      showToast(successMessage);
    } catch {
      showToast("Copy failed. Select the prompt text manually.");
    }
  }

  function completePrompt(prompt) {
    return `${guide.universalPreamble}\n\nPHASE-SPECIFIC INSTRUCTIONS\n${prompt.body}`;
  }

  function renderRules() {
    guide.rules.forEach((rule, index) => {
      const card = element("article", "rule-card");
      card.append(element("span", "rule-card__number", String(index + 1).padStart(2, "0")));
      card.append(element("h3", "", rule.title));
      card.append(element("p", "", rule.body));
      rulesGrid.append(card);
    });
  }

  function renderCompletion() {
    guide.completion.forEach((item) => {
      const card = element("article", "completion-card");
      card.append(element("span", "completion-card__metric", item.metric));
      card.append(element("h3", "", item.title));
      card.append(element("p", "", item.body));
      completionGrid.append(card);
    });
  }

  function renderSteadyState() {
    guide.steadyState.forEach((step) => steadyLoop.append(element("li", "", step)));
  }

  function renderNavigation() {
    phases.forEach((phase) => {
      const link = element("a");
      link.href = `#${phase.id}`;
      link.dataset.phaseId = phase.id;
      link.append(element("span", "phase-nav__number", phase.number));
      link.append(element("span", "phase-nav__label", phase.title));
      link.append(element("span", "phase-nav__status", "✓"));
      link.addEventListener("click", () => {
        const card = phaseCards.get(phase.id);
        if (card) setPhaseOpen(card, true);
      });
      navLinks.set(phase.id, link);
      nav.append(link);
    });
  }

  function leadCard(label, body) {
    const card = element("div", "phase-lead-card");
    card.append(element("span", "", label));
    card.append(element("p", "", body));
    return card;
  }

  function phaseColumn(title, items, modifier) {
    const column = element("section", `phase-column${modifier ? ` ${modifier}` : ""}`);
    column.append(element("h4", "", title));
    column.append(list(items));
    return column;
  }

  function promptCard(phase, prompt, promptIndex) {
    const card = element("section", "prompt-card");
    const header = element("div", "prompt-header");
    header.append(element("span", "", prompt.label));

    const copyButton = element("button", "prompt-copy", "Copy exact prompt");
    copyButton.type = "button";
    copyButton.setAttribute("aria-label", `Copy ${phase.title}: ${prompt.label}`);
    copyButton.addEventListener("click", () => {
      copyText(completePrompt(prompt), `${phase.number} ${prompt.label} copied`);
    });
    header.append(copyButton);

    const code = element("pre", "prompt-code");
    const codeText = element("code", "", completePrompt(prompt));
    code.append(codeText);
    code.id = `${phase.id}-prompt-${promptIndex}`;
    card.append(header, code);
    return card;
  }

  function setPhaseOpen(card, open) {
    const summary = card.querySelector(".phase-summary");
    const body = card.querySelector(".phase-body");
    card.classList.toggle("is-open", open);
    summary.setAttribute("aria-expanded", String(open));
    body.hidden = !open;
    if (open) localStorage.setItem(openPhaseKey, card.id);
  }

  function renderPhases() {
    const savedOpen = localStorage.getItem(openPhaseKey);
    const hashOpen = window.location.hash.replace("#", "");
    const initialOpen = phases.some((phase) => phase.id === hashOpen)
      ? hashOpen
      : phases.some((phase) => phase.id === savedOpen)
        ? savedOpen
        : phases[0].id;

    phases.forEach((phase) => {
      const card = element("article", "phase-card");
      card.id = phase.id;
      card.dataset.search = JSON.stringify(phase).toLowerCase();

      const summary = element("button", "phase-summary");
      summary.type = "button";
      const bodyId = `${phase.id}-body`;
      summary.setAttribute("aria-controls", bodyId);
      summary.setAttribute("aria-expanded", "false");

      summary.append(element("span", "phase-number", phase.number));

      const summaryCopy = element("span", "phase-summary__copy");
      const meta = element("span", "phase-summary__meta");
      meta.append(element("span", "phase-category", phase.category));
      meta.append(element("span", "phase-mode", phase.mode));
      summaryCopy.append(meta);
      summaryCopy.append(element("h3", "", phase.title));
      summaryCopy.append(element("p", "", phase.summary));
      summary.append(summaryCopy);

      const right = element("span", "phase-summary__right");
      right.append(element("span", "phase-duration", phase.duration));
      right.append(element("span", "phase-chevron", "⌄"));
      summary.append(right);

      const body = element("div", "phase-body");
      body.id = bodyId;
      body.hidden = true;

      const lead = element("div", "phase-body__lead");
      lead.append(leadCard("Goal", phase.goal));
      lead.append(leadCard("Why this phase exists", phase.why));
      body.append(lead);

      const columns = element("div", "phase-columns");
      columns.append(phaseColumn("Prerequisites", phase.prerequisites));
      columns.append(phaseColumn("Tasks", phase.tasks));
      columns.append(phaseColumn("Deliverables", phase.deliverables));
      columns.append(phaseColumn("Exit gate", phase.exitGate, "phase-column--gate"));
      columns.append(phaseColumn("Stop conditions", phase.stopConditions, "phase-column--stop"));
      body.append(columns);

      const prompts = element("div", "prompt-stack");
      phase.prompts.forEach((prompt, index) => {
        prompts.append(promptCard(phase, prompt, index));
      });
      body.append(prompts);

      const footer = element("div", "phase-footer");
      footer.append(element("span", "phase-handoff", `Handoff: ${phase.handoff}`));

      const completionLabel = element("label", "phase-complete");
      const checkbox = element("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed.has(phase.id);
      checkbox.setAttribute("aria-label", `Mark ${phase.title} complete`);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) completed.add(phase.id);
        else completed.delete(phase.id);
        persistCompleted();
        updateProgress();
      });
      completionLabel.append(checkbox, element("span", "", "Mark phase complete"));
      footer.append(completionLabel);
      body.append(footer);

      summary.addEventListener("click", () => {
        setPhaseOpen(card, !card.classList.contains("is-open"));
      });

      card.append(summary, body);
      phaseCards.set(phase.id, card);
      phaseList.append(card);
      setPhaseOpen(card, phase.id === initialOpen);
    });

    const empty = element("div", "empty-search", "No phases match that search.");
    empty.id = "empty-search";
    empty.hidden = true;
    phaseList.append(empty);
  }

  function updateProgress() {
    const count = completed.size;
    const percent = Math.round((count / phases.length) * 100);
    progressLabel.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    progressDetail.textContent = `${count} of ${phases.length} phases marked complete`;

    phases.forEach((phase) => {
      const done = completed.has(phase.id);
      const card = phaseCards.get(phase.id);
      const link = navLinks.get(phase.id);
      if (card) {
        card.classList.toggle("is-complete", done);
        const checkbox = card.querySelector('.phase-complete input[type="checkbox"]');
        if (checkbox && checkbox.checked !== done) checkbox.checked = done;
      }
      if (link) link.classList.toggle("is-complete", done);
    });
  }

  function setupSearch() {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;
      phases.forEach((phase) => {
        const card = phaseCards.get(phase.id);
        const matches = !query || card.dataset.search.includes(query);
        card.classList.toggle("is-filtered", !matches);
        if (matches) visible += 1;
      });
      document.getElementById("empty-search").hidden = visible !== 0;
    });
  }

  function setupProgressReset() {
    document.getElementById("reset-progress").addEventListener("click", () => {
      completed = new Set();
      persistCompleted();
      updateProgress();
      showToast("Local progress reset");
    });
  }

  function markdownDownload() {
    const lines = [
      `# ${guide.title}`,
      "",
      `Target repository: ${guide.repository}`,
      `Figma file key: ${guide.figmaFileKey}`,
      "",
      "## Universal operating preamble",
      "",
      "````text",
      guide.universalPreamble,
      "````",
      ""
    ];

    phases.forEach((phase) => {
      lines.push(`# Phase ${phase.number}: ${phase.title}`, "");
      lines.push(`**Category:** ${phase.category}`);
      lines.push(`**Mode:** ${phase.mode}`);
      lines.push(`**Expected unit:** ${phase.duration}`, "");
      lines.push(phase.summary, "");
      lines.push(`**Goal:** ${phase.goal}`, "");
      lines.push(`**Handoff:** ${phase.handoff}`, "");

      phase.prompts.forEach((prompt) => {
        lines.push(`## ${prompt.label}`, "", "````text", completePrompt(prompt), "````", "");
      });
    });

    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const download = element("a");
    download.href = url;
    download.download = "pckup-design-system-migration-prompts.md";
    document.body.append(download);
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("All prompts downloaded");
  }

  function setupHeaderActions() {
    document.getElementById("copy-preamble").addEventListener("click", () => {
      copyText(guide.universalPreamble, "Universal preamble copied");
    });
    document.getElementById("download-prompts").addEventListener("click", markdownDownload);
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length === 0) return;
        navLinks.forEach((link) => link.classList.remove("is-active"));
        const active = navLinks.get(visible[0].target.id);
        if (active) active.classList.add("is-active");
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: [0, 0.01, 0.2] }
    );

    phases.forEach((phase) => observer.observe(phaseCards.get(phase.id)));
  }

  function validateData() {
    const ids = new Set(phases.map((phase) => phase.id));
    const numbers = new Set(phases.map((phase) => phase.number));
    const invalid = phases.filter(
      (phase) =>
        !phase.id ||
        !phase.number ||
        !phase.title ||
        !Array.isArray(phase.prompts) ||
        phase.prompts.length === 0
    );

    if (
      phases.length !== expectedPhaseCount ||
      ids.size !== phases.length ||
      numbers.size !== phases.length ||
      invalid.length > 0
    ) {
      console.error("Migration guide phase data failed validation", {
        expectedPhaseCount,
        actualPhaseCount: phases.length,
        duplicateIds: ids.size !== phases.length,
        duplicateNumbers: numbers.size !== phases.length,
        invalid
      });
      showToast("Guide data warning: phase validation failed");
    }
  }

  renderRules();
  renderCompletion();
  renderSteadyState();
  renderNavigation();
  renderPhases();
  updateProgress();
  setupSearch();
  setupProgressReset();
  setupHeaderActions();
  setupActiveNavigation();
  validateData();
})();
