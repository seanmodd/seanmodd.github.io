(() => {
  const data = {
    ...window.PCKUP_GUIDE_META,
    phases: window.PCKUP_GUIDE_PHASES || [],
    reusablePrompts: window.PCKUP_GUIDE_META?.reusablePrompts || [],
  };
  if (!data.basePrompt || data.phases.length === 0) {
    throw new Error('Pckup migration guide data failed to load');
  }
  const storageKey = 'pckup-design-system-migration-progress-v1';
  const themeKey = 'pckup-design-system-migration-theme-v1';
  const state = loadProgress();
  let toastTimer;

  const phaseNav = document.getElementById('phase-nav');
  const phaseList = document.getElementById('phase-list');
  const reusableList = document.getElementById('reusable-list');

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  }

  function saveProgress() {
    localStorage.setItem(storageKey, JSON.stringify(state));
    updateProgress();
  }

  function fullPrompt(phase) {
    return `${data.basePrompt.trim()}\n\n${phase.prompt.trim()}\n`;
  }

  function copyText(text, message = 'Copied to clipboard') {
    const done = () => showToast(message);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    done();
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  function renderFacts() {
    document.getElementById('facts').innerHTML = data.facts.map(item => `
      <div class="fact"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>
    `).join('');
  }

  function renderWorkflow() {
    document.getElementById('workflow').innerHTML = data.workflow.map((item, index) => `
      <article class="workflow-card"><span>0${index + 1}</span><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.detail)}</p></article>
    `).join('');
  }

  function renderPrinciples() {
    document.getElementById('principles').innerHTML = data.principles.map(item => `<div class="principle">${escapeHtml(item)}</div>`).join('');
  }

  function renderPhases() {
    phaseNav.innerHTML = data.phases.map(phase => `
      <a href="#${phase.id}" data-nav-phase="${phase.id}" class="${state[phase.id] ? 'is-complete' : ''}">
        <span class="nav-number">${phase.number}</span>
        <span class="nav-title">${escapeHtml(phase.title)}</span>
        <span class="nav-check" aria-hidden="true"></span>
      </a>
    `).join('');

    phaseList.innerHTML = data.phases.map((phase, index) => {
      const prompt = fullPrompt(phase);
      return `
        <article class="phase-card ${index === 0 ? 'is-open' : ''} ${state[phase.id] ? 'is-complete' : ''}" id="${phase.id}" data-phase-card="${phase.id}">
          <div class="phase-summary" role="button" tabindex="0" aria-expanded="${index === 0 ? 'true' : 'false'}" data-toggle-phase="${phase.id}">
            <div class="phase-number">${phase.number}</div>
            <div class="phase-heading"><span class="phase-stage">${escapeHtml(phase.stage)}</span><h3>${escapeHtml(phase.title)}</h3><p>${escapeHtml(phase.summary)}</p></div>
            <div class="phase-meta"><span class="meta-pill">Depends: ${escapeHtml(phase.dependsOn)}</span><span class="meta-pill">${escapeHtml(phase.duration)}</span></div>
          </div>
          <div class="phase-content">
            <div class="phase-grid">
              <div class="info-panel"><h4>Required outputs</h4><ul>${phase.outputs.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
              <div class="info-panel"><h4>Why this phase exists</h4><p style="margin:0;color:var(--text-soft);font-size:12px">${escapeHtml(phase.summary)}</p></div>
              <div class="info-panel gate-panel"><p>${escapeHtml(phase.gate)}</p></div>
            </div>
            <div class="prompt-shell">
              <div class="prompt-toolbar"><span>Complete self-contained prompt</span><button class="copy-button" type="button" data-copy-phase="${phase.id}">Copy prompt</button></div>
              <pre class="prompt-text">${escapeHtml(prompt)}</pre>
            </div>
            <div class="phase-actions">
              <button class="complete-button" type="button" data-complete-phase="${phase.id}">${state[phase.id] ? '✓ Phase complete' : 'Mark phase complete'}</button>
              <span class="open-next">Only continue when the exit gate is objectively true.</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderReusable() {
    reusableList.innerHTML = data.reusablePrompts.map(item => `
      <article class="reusable-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><details><summary>View prompt</summary><pre>${escapeHtml(item.prompt)}</pre></details><div class="reusable-actions"><button class="copy-button" type="button" data-copy-reusable="${item.id}">Copy prompt</button></div></article>
    `).join('');
  }

  function updateProgress() {
    const complete = data.phases.filter(phase => state[phase.id]).length;
    const percent = Math.round((complete / data.phases.length) * 100);
    document.getElementById('progress-label').textContent = `${percent}%`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-detail').textContent = `${complete} of ${data.phases.length} phases marked complete`;
    data.phases.forEach(phase => {
      const card = document.querySelector(`[data-phase-card="${phase.id}"]`);
      const nav = document.querySelector(`[data-nav-phase="${phase.id}"]`);
      const button = document.querySelector(`[data-complete-phase="${phase.id}"]`);
      card?.classList.toggle('is-complete', Boolean(state[phase.id]));
      nav?.classList.toggle('is-complete', Boolean(state[phase.id]));
      if (button) button.textContent = state[phase.id] ? '✓ Phase complete' : 'Mark phase complete';
    });
  }

  function togglePhase(id) {
    const card = document.querySelector(`[data-phase-card="${id}"]`);
    if (!card) return;
    const open = card.classList.toggle('is-open');
    card.querySelector('[data-toggle-phase]')?.setAttribute('aria-expanded', String(open));
  }

  function exportProgress() {
    const completed = data.phases.filter(phase => state[phase.id]).map(phase => `${phase.number} ${phase.title}`);
    const next = data.phases.find(phase => !state[phase.id]);
    const text = [
      'Pckup Design System Migration Progress',
      `Completed: ${completed.length}/${data.phases.length}`,
      '',
      completed.length ? completed.map(item => `- ${item}`).join('\n') : '- None marked complete',
      '',
      `Next phase: ${next ? `${next.number} ${next.title}` : 'Program complete'}`,
      `Exported: ${new Date().toISOString()}`,
    ].join('\n');
    copyText(text, 'Progress copied');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  function initTheme() {
    const saved = localStorage.getItem(themeKey);
    const theme = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(themeKey, next);
  }

  renderFacts();
  renderWorkflow();
  renderPrinciples();
  renderPhases();
  renderReusable();
  initTheme();
  updateProgress();

  document.addEventListener('click', event => {
    const toggle = event.target.closest('[data-toggle-phase]');
    if (toggle) togglePhase(toggle.dataset.togglePhase);

    const phaseCopy = event.target.closest('[data-copy-phase]');
    if (phaseCopy) {
      const phase = data.phases.find(item => item.id === phaseCopy.dataset.copyPhase);
      if (phase) copyText(fullPrompt(phase), `Phase ${phase.number} prompt copied`);
    }

    const reusableCopy = event.target.closest('[data-copy-reusable]');
    if (reusableCopy) {
      const item = data.reusablePrompts.find(prompt => prompt.id === reusableCopy.dataset.copyReusable);
      if (item) copyText(item.prompt.trim() + '\n', `${item.title} copied`);
    }

    const complete = event.target.closest('[data-complete-phase]');
    if (complete) {
      const id = complete.dataset.completePhase;
      state[id] = !state[id];
      saveProgress();
      showToast(state[id] ? 'Phase marked complete' : 'Phase reopened');
    }
  });

  document.addEventListener('keydown', event => {
    const toggle = event.target.closest?.('[data-toggle-phase]');
    if (toggle && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      togglePhase(toggle.dataset.togglePhase);
    }
  });

  document.getElementById('copy-master').addEventListener('click', () => copyText(data.basePrompt.trim() + '\n', 'Master context copied'));
  document.getElementById('copy-all').addEventListener('click', () => {
    const all = data.phases.map(phase => `===== PHASE ${phase.number}: ${phase.title.toUpperCase()} =====\n\n${fullPrompt(phase)}`).join('\n\n');
    copyText(all, 'All phase prompts copied');
  });
  document.getElementById('export-progress').addEventListener('click', exportProgress);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!confirm('Reset all locally saved phase progress?')) return;
    Object.keys(state).forEach(key => delete state[key]);
    saveProgress();
    showToast('Progress reset');
  });

  document.getElementById('phase-search').addEventListener('input', event => {
    const query = event.target.value.trim().toLowerCase();
    data.phases.forEach(phase => {
      const match = !query || `${phase.number} ${phase.stage} ${phase.title} ${phase.summary}`.toLowerCase().includes(query);
      document.querySelector(`[data-nav-phase="${phase.id}"]`).style.display = match ? '' : 'none';
    });
  });

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    document.querySelectorAll('[data-nav-phase]').forEach(item => item.classList.remove('is-active'));
    document.querySelector(`[data-nav-phase="${visible.target.id}"]`)?.classList.add('is-active');
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] });
  document.querySelectorAll('[data-phase-card]').forEach(card => observer.observe(card));
})();
