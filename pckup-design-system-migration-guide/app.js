(() => {
  "use strict";

  const guide = window.PCKUP_GUIDE;
  const phases = Array.isArray(window.PCKUP_PHASES) ? window.PCKUP_PHASES : [];
  const storageKey = "pckup-design-system-migration-guide:completed:v1";

  const elements = {
    rules: document.getElementById("rules-grid"),
    completion: document.getElementById("completion-grid"),
    steady: document.getElementById("steady-loop"),
    nav: document.getElementById("phase-nav"),
    list: document.getElementById("phase-list"),
    search: document.getElementById("phase-search"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    progressDetail: document.getElementById("progress-detail"),
    reset: document.getElementById("reset-progress"),
    copyPreamble: document.getElementById("copy-preamble"),
    download: document.getElementById("download-prompts"),
    toast: document.getElementById("toast")
  };

  if (!guide || phases.length === 0 || !elements.list) {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<p style="padding:24px;color:#ff8178">The migration guide data failed to load.</p>'
    );
    return;
  }

  function readCompleted() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : []);
    } catch {
      return new Set();
    }
  }

  let completed = readCompleted();
  let toastTimer = 0;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function list(items) {
    if (!Array.isArray(items) || items.length === 0) return "<p>None recorded.</p>";
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function fullPrompt(phase, prompt) {
    return `${guide.universalPreamble.trim()}\n\n${"=".repeat(88)}\nCURRENT EXECUTION\nPhase ${phase.number}: ${phase.title}\nPrompt: ${prompt.label}\n${"=".repeat(88)}\n\n${prompt.body.trim()}\n`;
  }

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
      return;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      showToast(copied ? successMessage : "Copy failed. Select the prompt manually.");
    }
  }

  function showToast(message) {
    if (!elements.toast) return;
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2300);
  }

  function renderStaticSections() {
    elements.rules.innerHTML = guide.rules
      .map(
        (rule, index) => `
          <article class="rule-card">
            <span class="rule-card__icon" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(rule.title)}</h3>
            <p>${escapeHtml(rule.body)}</p>
          </article>`
      )
      .join("");

    elements.completion.innerHTML = guide.completion
      .map(
        (item) => `
          <article class="completion-card">
            <span class="completion-card__metric">${escapeHtml(item.metric)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>`
      )
      .join("");

    elements.steady.innerHTML = guide.steadyState
      .map((item) => `<li><span>${escapeHtml(item)}</span></li>`)
      .join("");
  }

  function renderNavigation() {
    elements.nav.innerHTML = phases
      .map(
        (phase) => `
          <a href="#${escapeHtml(phase.id)}" data-phase-link="${escapeHtml(phase.id)}">
            <span class="phase-nav__number">${escapeHtml(phase.number)}</span>
            <span>${escapeHtml(phase.title)}</span>
            <span class="phase-nav__status" aria-hidden="true"></span>
          </a>`
      )
      .join("");
  }

  function promptHtml(phase, prompt, promptIndex) {
    const promptId = `${phase.id}-prompt-${promptIndex}`;
    return `
      <section class="prompt-block" data-prompt-block>
        <div class="prompt-toolbar">
          <span>${escapeHtml(prompt.label)}</span>
          <div class="prompt-toolbar__actions">
            <button class="copy-button" type="button" data-expand-prompt="${promptId}" aria-expanded="false">Expand</button>
            <button class="copy-button" type="button" data-copy-prompt="${phase.id}:${promptIndex}">Copy full prompt</button>
          </div>
        </div>
        <pre class="prompt-content is-collapsed" id="${promptId}"></pre>
      </section>`;
  }

  function renderPhases() {
    elements.list.innerHTML = phases
      .map((phase, phaseIndex) => {
        const next = phases[phaseIndex + 1];
        const prompts = Array.isArray(phase.prompts) ? phase.prompts : [];
        return `
          <article class="phase-card" id="${escapeHtml(phase.id)}" data-phase-card="${escapeHtml(phase.id)}">
            <button class="phase-summary" type="button" aria-expanded="false" aria-controls="${phase.id}-body">
              <span class="phase-number">${escapeHtml(phase.number)}</span>
              <span class="phase-heading">
                <span class="phase-heading__meta">
                  <span class="phase-stage">${escapeHtml(phase.category)}</span>
                  <span class="phase-dependency">${escapeHtml(phase.mode)} · ${escapeHtml(phase.duration)}</span>
                </span>
                <h3>${escapeHtml(phase.title)}</h3>
                <p>${escapeHtml(phase.summary)}</p>
              </span>
              <span class="phase-chevron" aria-hidden="true">⌄</span>
            </button>

            <div class="phase-body" id="${phase.id}-body">
              <div class="phase-grid">
                <section class="phase-panel">
                  <h4>Goal</h4>
                  <p>${escapeHtml(phase.goal)}</p>
                </section>
                <section class="phase-panel">
                  <h4>Why this phase exists</h4>
                  <p>${escapeHtml(phase.why)}</p>
                </section>
                <section class="phase-panel">
                  <h4>Prerequisites</h4>
                  ${list(phase.prerequisites)}
                </section>
                <section class="phase-panel">
                  <h4>Work in scope</h4>
                  ${list(phase.tasks)}
                </section>
                <section class="phase-panel">
                  <h4>Required deliverables</h4>
                  ${list(phase.deliverables)}
                </section>
                <section class="phase-panel">
                  <h4>Stop conditions</h4>
                  ${list(phase.stopConditions)}
                </section>
              </div>

              <section class="phase-gate">
                <strong>Exit gate</strong>
                ${list(phase.exitGate)}
              </section>

              ${prompts.map((prompt, index) => promptHtml(phase, prompt, index)).join("")}

              <div class="phase-complete-row">
                <button class="complete-button" type="button" data-complete-phase="${escapeHtml(phase.id)}">Mark phase complete</button>
                ${next ? `<a class="phase-next-link" href="#${escapeHtml(next.id)}" data-next-phase="${escapeHtml(next.id)}">Next: Phase ${escapeHtml(next.number)} →</a>` : `<span class="phase-next-link">Migration program complete ✓</span>`}
              </div>
            </div>
          </article>`;
      })
      .join("");

    phases.forEach((phase) => {
      phase.prompts.forEach((prompt, index) => {
        const pre = document.getElementById(`${phase.id}-prompt-${index}`);
        if (pre) pre.textContent = fullPrompt(phase, prompt);
      });
    });
  }

  function persistCompleted() {
    localStorage.setItem(storageKey, JSON.stringify([...completed].sort()));
  }

  function updateProgress() {
    const valid = phases.filter((phase) => completed.has(phase.id)).length;
    const percent = phases.length === 0 ? 0 : Math.round((valid / phases.length) * 100);
    elements.progressLabel.textContent = `${percent}%`;
    elements.progressBar.style.width = `${percent}%`;
    elements.progressDetail.textContent = `${valid} of ${phases.length} phases marked complete`;

    phases.forEach((phase) => {
      const isComplete = completed.has(phase.id);
      const card = document.querySelector(`[data-phase-card="${phase.id}"]`);
      const link = document.querySelector(`[data-phase-link="${phase.id}"]`);
      const button = document.querySelector(`[data-complete-phase="${phase.id}"]`);
      card?.classList.toggle("is-complete", isComplete);
      link?.classList.toggle("is-complete", isComplete);
      if (button) button.textContent = isComplete ? "Completed ✓" : "Mark phase complete";
    });
  }

  function setOpen(card, open) {
    if (!card) return;
    card.classList.toggle("is-open", open);
    const summary = card.querySelector(".phase-summary");
    summary?.setAttribute("aria-expanded", String(open));
  }

  function openPhase(id, options = {}) {
    const card = document.querySelector(`[data-phase-card="${id}"]`);
    if (!card) return;
    if (options.closeOthers !== false) {
      document.querySelectorAll("[data-phase-card]").forEach((other) => {
        if (other !== card) setOpen(other, false);
      });
    }
    setOpen(card, true);
    if (options.scroll !== false) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applySearch(query) {
    const normalized = query.trim().toLowerCase();
    let visible = 0;
    phases.forEach((phase) => {
      const card = document.querySelector(`[data-phase-card="${phase.id}"]`);
      const searchable = JSON.stringify(phase).toLowerCase();
      const show = normalized.length === 0 || searchable.includes(normalized);
      if (card) card.hidden = !show;
      if (show) visible += 1;
    });

    let empty = elements.list.querySelector(".no-results");
    if (visible === 0) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "no-results";
        empty.textContent = "No migration phases match that search.";
        elements.list.appendChild(empty);
      }
    } else {
      empty?.remove();
    }
  }

  function downloadAllPrompts() {
    const sections = [
      guide.title,
      `Repository: ${guide.repository}`,
      "",
      "UNIVERSAL OPERATING PREAMBLE",
      "=".repeat(88),
      guide.universalPreamble.trim(),
      ""
    ];

    phases.forEach((phase) => {
      phase.prompts.forEach((prompt) => {
        sections.push("", "#".repeat(88), `PHASE ${phase.number}: ${phase.title}`, `PROMPT: ${prompt.label}`, "#".repeat(88), "", fullPrompt(phase, prompt));
      });
    });

    const blob = new Blob([sections.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pckup-design-system-v2-migration-prompts.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast("Downloaded all migration prompts.");
  }

  function bindEvents() {
    elements.list.addEventListener("click", (event) => {
      const summary = event.target.closest(".phase-summary");
      if (summary) {
        const card = summary.closest("[data-phase-card]");
        setOpen(card, !card.classList.contains("is-open"));
        return;
      }

      const copy = event.target.closest("[data-copy-prompt]");
      if (copy) {
        const [phaseId, rawIndex] = copy.dataset.copyPrompt.split(":");
        const phase = phases.find((item) => item.id === phaseId);
        const prompt = phase?.prompts?.[Number(rawIndex)];
        if (phase && prompt) void copyText(fullPrompt(phase, prompt), `Copied Phase ${phase.number}: ${prompt.label}`);
        return;
      }

      const expand = event.target.closest("[data-expand-prompt]");
      if (expand) {
        const pre = document.getElementById(expand.dataset.expandPrompt);
        if (!pre) return;
        const collapsed = pre.classList.toggle("is-collapsed");
        expand.textContent = collapsed ? "Expand" : "Collapse";
        expand.setAttribute("aria-expanded", String(!collapsed));
        return;
      }

      const complete = event.target.closest("[data-complete-phase]");
      if (complete) {
        const id = complete.dataset.completePhase;
        if (completed.has(id)) completed.delete(id);
        else completed.add(id);
        persistCompleted();
        updateProgress();
        showToast(completed.has(id) ? "Phase marked complete." : "Phase marked incomplete.");
        return;
      }

      const next = event.target.closest("[data-next-phase]");
      if (next) {
        event.preventDefault();
        const id = next.dataset.nextPhase;
        history.pushState(null, "", `#${id}`);
        openPhase(id);
      }
    });

    elements.nav.addEventListener("click", (event) => {
      const link = event.target.closest("[data-phase-link]");
      if (!link) return;
      event.preventDefault();
      const id = link.dataset.phaseLink;
      history.pushState(null, "", `#${id}`);
      openPhase(id);
    });

    elements.search.addEventListener("input", () => applySearch(elements.search.value));

    elements.reset.addEventListener("click", () => {
      const confirmed = window.confirm("Reset the locally saved phase progress for this guide?");
      if (!confirmed) return;
      completed = new Set();
      persistCompleted();
      updateProgress();
      showToast("Local progress reset.");
    });

    elements.copyPreamble.addEventListener("click", () => {
      void copyText(guide.universalPreamble.trim(), "Copied the universal operating preamble.");
    });

    elements.download.addEventListener("click", downloadAllPrompts);

    window.addEventListener("popstate", () => {
      const id = location.hash.slice(1);
      if (phases.some((phase) => phase.id === id)) openPhase(id);
    });
  }

  function observeActivePhase() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        document.querySelectorAll("[data-phase-link]").forEach((link) => {
          link.classList.toggle("is-active", link.dataset.phaseLink === visible.target.id);
        });
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.1, 0.25] }
    );
    document.querySelectorAll("[data-phase-card]").forEach((card) => observer.observe(card));
  }

  renderStaticSections();
  renderNavigation();
  renderPhases();
  bindEvents();
  updateProgress();
  observeActivePhase();

  const initialId = phases.some((phase) => `#${phase.id}` === location.hash)
    ? location.hash.slice(1)
    : phases[0].id;
  openPhase(initialId, { scroll: location.hash.length > 1, closeOthers: true });
})();
