(() => {
  const root = document.documentElement;
  const body = document.body;
  const backdrop = document.getElementById('settingsBackdrop');
  const settingsButton = document.getElementById('settingsButton');
  const closeButton = document.getElementById('closeSettings');
  const themeButton = document.getElementById('themeToggle');
  const soundButton = document.getElementById('soundToggle');
  const effectsButton = document.getElementById('effectsToggle');
  const aboutButton = document.getElementById('aboutToggle');
  const aboutNote = document.getElementById('aboutNote');
  const startupAudio = document.getElementById('startupSound');
  const hoverAudio = document.getElementById('hoverSound');

  const readPref = (key, fallback) => {
    try {
      const value = localStorage.getItem(`pf-${key}`);
      return value === null ? fallback : value === 'true';
    } catch {
      return fallback;
    }
  };
  const writePref = (key, value) => {
    try { localStorage.setItem(`pf-${key}`, String(value)); } catch { /* Storage can be disabled. */ }
  };

  const preferences = {
    light: readPref('light-theme', false),
    sound: readPref('sound', true),
    effects: readPref('effects', true)
  };

  function updateSettingsLabels() {
    if (themeButton) themeButton.textContent = preferences.light ? 'Light on' : 'Dark on';
    if (soundButton) soundButton.textContent = preferences.sound ? 'On' : 'Off';
    if (effectsButton) effectsButton.textContent = preferences.effects ? 'On' : 'Off';
  }

  function applyPreferences() {
    root.dataset.theme = preferences.light ? 'light' : 'dark';
    body.classList.toggle('effects-off', !preferences.effects);
    updateSettingsLabels();
    writePref('light-theme', preferences.light);
    writePref('sound', preferences.sound);
    writePref('effects', preferences.effects);
    renderParticles();
  }

  function renderParticles() {
    const layer = document.getElementById('particles');
    if (!layer) return;
    layer.replaceChildren();
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!preferences.effects || reducedMotion) return;
    const count = window.innerWidth < 700 ? 24 : 48;
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      const size = Math.random() * 3.5 + 1.5;
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = String(Math.random() * .55 + .15);
      particle.style.animationDuration = `${12 + Math.random() * 19}s`;
      particle.style.animationDelay = `${-Math.random() * 24}s`;
      particle.style.setProperty('--drift-x', `${Math.random() * 100 - 50}px`);
      layer.append(particle);
    }
  }

  function openSettings() {
    if (!backdrop) return;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    settingsButton?.setAttribute('aria-expanded', 'true');
    closeButton?.focus();
  }
  function closeSettings() {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    settingsButton?.setAttribute('aria-expanded', 'false');
    settingsButton?.focus();
  }

  settingsButton?.addEventListener('click', openSettings);
  closeButton?.addEventListener('click', closeSettings);
  backdrop?.addEventListener('click', (event) => {
    if (event.target === backdrop) closeSettings();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && backdrop?.classList.contains('open')) closeSettings();
  });

  themeButton?.addEventListener('click', () => {
    preferences.light = !preferences.light;
    applyPreferences();
  });
  soundButton?.addEventListener('click', () => {
    preferences.sound = !preferences.sound;
    applyPreferences();
  });
  effectsButton?.addEventListener('click', () => {
    preferences.effects = !preferences.effects;
    applyPreferences();
  });
  aboutButton?.addEventListener('click', () => {
    const expanded = aboutButton.getAttribute('aria-expanded') === 'true';
    aboutButton.setAttribute('aria-expanded', String(!expanded));
    aboutNote?.classList.toggle('show', !expanded);
  });

  let startupPlayed = false;
  function playStartupSound() {
    if (!preferences.sound || startupPlayed || !startupAudio) return;
    startupAudio.volume = .3;
    const playback = startupAudio.play();
    if (playback && typeof playback.then === 'function') {
      playback.then(() => { startupPlayed = true; }).catch(() => { /* Try again after another user gesture. */ });
    } else {
      startupPlayed = true;
    }
  }
  document.addEventListener('pointerdown', playStartupSound);
  document.addEventListener('keydown', playStartupSound);

  document.querySelectorAll('a.button, button').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      if (!preferences.sound || !hoverAudio) return;
      hoverAudio.currentTime = 0;
      hoverAudio.volume = .13;
      hoverAudio.play().catch(() => { /* Hover sounds are optional. */ });
    });
  });

  applyPreferences();
  window.addEventListener('resize', () => {
    clearTimeout(window.__pfParticleResize);
    window.__pfParticleResize = setTimeout(renderParticles, 180);
  }, { passive: true });
})();
