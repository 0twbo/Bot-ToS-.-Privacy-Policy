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
  const customAccentPicker = document.getElementById('customAccentPicker');
  const customAccentControl = document.getElementById('customAccentControl');
  const customGradientStart = document.getElementById('customGradientStart');
  const customGradientEnd = document.getElementById('customGradientEnd');
  const customGradientControl = document.getElementById('customGradientControl');
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
  const readValue = (key, fallback) => {
    try {
      const value = localStorage.getItem(`pf-${key}`);
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  };
  const writePref = (key, value) => {
    try { localStorage.setItem(`pf-${key}`, String(value)); } catch { /* Storage can be disabled. */ }
  };

  const gradientPalettes = {
    'gradient-aurora': ['#18c9b8', '#7958e8'],
    'gradient-sunset': ['#f04f88', '#f39a35'],
    'gradient-ocean': ['#1769c2', '#19c6d2'],
    'gradient-fire': ['#d82e48', '#f28b26'],
    'gradient-candy': ['#e84fa8', '#7955d9'],
    'gradient-cosmic': ['#272b83', '#c14edb'],
    'holiday-new-year': ['#183b78', '#dcb64b'],
    'holiday-christmas': ['#176b48', '#c9364b'],
    'holiday-halloween': ['#5a2a91', '#ef8424'],
    'holiday-valentines': ['#e94c83', '#9144c8'],
    'holiday-easter': ['#a27add', '#55c9a5'],
    'holiday-summer': ['#ef713d', '#21b8c4']
  };
  const availableAccents = ['blue', 'purple', 'emerald', 'rose', 'amber', 'red', 'gold', 'bronze', 'steel', 'teal', 'lime', 'cyan', 'magenta', 'orange', ...Object.keys(gradientPalettes), 'gradient-custom'];
  const isHexColor = (value) => /^#[0-9a-f]{6}$/i.test(value);
  const savedAccent = readValue('accent-theme', 'blue');
  const savedCustomColor = readValue('custom-accent', '#328cff');
  const savedGradientStart = readValue('custom-gradient-start', '#328cff');
  const savedGradientEnd = readValue('custom-gradient-end', '#a855f7');
  const preferences = {
    light: readPref('light-theme', false),
    accent: availableAccents.includes(savedAccent) || savedAccent === 'custom' ? savedAccent : 'blue',
    customColor: isHexColor(savedCustomColor) ? savedCustomColor : '#328cff',
    gradientStart: isHexColor(savedGradientStart) ? savedGradientStart : '#328cff',
    gradientEnd: isHexColor(savedGradientEnd) ? savedGradientEnd : '#a855f7',
    sound: readPref('sound', true),
    effects: readPref('effects', true)
  };

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  };
  const rgbToHex = ({ r, g, b }) => `#${[r, g, b].map((part) => Math.round(part).toString(16).padStart(2, '0')).join('')}`;
  const mixColors = (firstHex, secondHex, secondWeight) => {
    const first = hexToRgb(firstHex);
    const second = hexToRgb(secondHex);
    const weight = Math.max(0, Math.min(1, secondWeight));
    return rgbToHex({
      r: first.r * (1 - weight) + second.r * weight,
      g: first.g * (1 - weight) + second.g * weight,
      b: first.b * (1 - weight) + second.b * weight
    });
  };
  const luminance = (hex) => {
    const channels = Object.values(hexToRgb(hex)).map((part) => {
      const value = part / 255;
      return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
    });
    return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
  };
  const contrastRatio = (firstHex, secondHex) => {
    const values = [luminance(firstHex), luminance(secondHex)].sort((a, b) => b - a);
    return (values[0] + .05) / (values[1] + .05);
  };
  const ensureContrast = (color, background, minimum) => {
    if (contrastRatio(color, background) >= minimum) return color;
    const target = luminance(background) > .5 ? '#000000' : '#ffffff';
    for (let step = 1; step <= 100; step += 1) {
      const candidate = mixColors(color, target, step / 100);
      if (contrastRatio(candidate, background) >= minimum) return candidate;
    }
    return target;
  };
  const rgbChannels = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    return `${r}, ${g}, ${b}`;
  };

  function clearCustomAccentVariables() {
    [
      '--accent-light', '--accent', '--accent-strong', '--accent-rgb', '--accent-strong-rgb',
      '--brand-a', '--brand-b', '--border', '--bg-alt', '--bg-tint',
      '--gradient-start', '--gradient-end', '--accent-gradient', '--gradient-text'
    ].forEach((name) => root.style.removeProperty(name));
  }

  function applyCustomAccentVariables() {
    const chosen = preferences.customColor;
    const lightMode = preferences.light;
    const background = lightMode ? '#e9f1ff' : '#080d18';
    const readableAccent = ensureContrast(chosen, background, 4.5);
    const buttonAccent = ensureContrast(chosen, '#ffffff', 4.5);
    const buttonLight = ensureContrast(mixColors(buttonAccent, '#ffffff', .09), '#ffffff', 4.5);
    const glowAccent = lightMode ? readableAccent : ensureContrast(mixColors(readableAccent, '#ffffff', .12), background, 4.5);
    const strongRgb = rgbChannels(buttonAccent);
    const accentRgb = rgbChannels(readableAccent);
    const backgroundAlt = lightMode ? mixColors('#d7e6ff', chosen, .055) : mixColors('#101c32', chosen, .10);
    const backgroundTint = lightMode ? mixColors('#eef5ff', chosen, .025) : mixColors('#0a1425', chosen, .075);

    root.style.setProperty('--accent-light', buttonLight);
    root.style.setProperty('--accent', glowAccent);
    root.style.setProperty('--accent-strong', buttonAccent);
    root.style.setProperty('--accent-rgb', accentRgb);
    root.style.setProperty('--accent-strong-rgb', strongRgb);
    root.style.setProperty('--brand-a', buttonLight);
    root.style.setProperty('--brand-b', buttonAccent);
    root.style.setProperty('--border', `rgba(${accentRgb}, .2)`);
    root.style.setProperty('--bg-alt', backgroundAlt);
    root.style.setProperty('--bg-tint', backgroundTint);
  }

  function applyGradientAccentVariables() {
    const palette = preferences.accent === 'gradient-custom'
      ? [preferences.gradientStart, preferences.gradientEnd]
      : gradientPalettes[preferences.accent];
    if (!palette) return;

    const [start, end] = palette;
    const lightMode = preferences.light;
    const background = lightMode ? '#e9f1ff' : '#080d18';
    const middle = mixColors(start, end, .5);
    const readableStart = ensureContrast(start, background, 4.5);
    const readableMiddle = ensureContrast(middle, background, 4.5);
    const readableEnd = ensureContrast(end, background, 4.5);
    const buttonStart = ensureContrast(start, '#ffffff', 4.5);
    const buttonEnd = ensureContrast(end, '#ffffff', 4.5);
    const accentRgb = rgbChannels(readableMiddle);
    const strongRgb = rgbChannels(buttonEnd);
    const backgroundAlt = lightMode ? mixColors('#d7e6ff', middle, .055) : mixColors('#101c32', middle, .10);
    const backgroundTint = lightMode ? mixColors('#eef5ff', middle, .025) : mixColors('#0a1425', middle, .075);

    root.style.setProperty('--accent-light', readableStart);
    root.style.setProperty('--accent', readableMiddle);
    root.style.setProperty('--accent-strong', readableEnd);
    root.style.setProperty('--accent-rgb', accentRgb);
    root.style.setProperty('--accent-strong-rgb', strongRgb);
    root.style.setProperty('--brand-a', buttonStart);
    root.style.setProperty('--brand-b', buttonEnd);
    root.style.setProperty('--border', `rgba(${accentRgb}, .22)`);
    root.style.setProperty('--bg-alt', backgroundAlt);
    root.style.setProperty('--bg-tint', backgroundTint);
    root.style.setProperty('--gradient-start', readableStart);
    root.style.setProperty('--gradient-end', readableEnd);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${buttonStart}, ${buttonEnd})`);
    root.style.setProperty('--gradient-text', `linear-gradient(90deg, ${readableStart}, ${readableMiddle}, ${readableEnd})`);
  }

  function updateSettingsLabels() {
    if (themeButton) themeButton.textContent = preferences.light ? 'Light on' : 'Dark on';
    if (soundButton) soundButton.textContent = preferences.sound ? 'On' : 'Off';
    if (effectsButton) effectsButton.textContent = preferences.effects ? 'On' : 'Off';
    document.querySelectorAll('[data-accent-choice]').forEach((button) => {
      const selected = button.dataset.accentChoice === preferences.accent;
      button.setAttribute('aria-pressed', String(selected));
    });
    if (customAccentPicker) customAccentPicker.value = preferences.customColor;
    customAccentControl?.classList.toggle('is-active', preferences.accent === 'custom');
    if (customGradientStart) customGradientStart.value = preferences.gradientStart;
    if (customGradientEnd) customGradientEnd.value = preferences.gradientEnd;
    customGradientControl?.classList.toggle('is-active', preferences.accent === 'gradient-custom');
  }

  function applyPreferences() {
    root.dataset.theme = preferences.light ? 'light' : 'dark';
    root.dataset.accent = preferences.accent;
    clearCustomAccentVariables();
    if (preferences.accent === 'custom') applyCustomAccentVariables();
    else if (preferences.accent === 'gradient-custom' || gradientPalettes[preferences.accent]) applyGradientAccentVariables();
    body.classList.toggle('effects-off', !preferences.effects);
    updateSettingsLabels();
    writePref('light-theme', preferences.light);
    writePref('accent-theme', preferences.accent);
    writePref('custom-accent', preferences.customColor);
    writePref('custom-gradient-start', preferences.gradientStart);
    writePref('custom-gradient-end', preferences.gradientEnd);
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
    // Bring back the original lively field: more particles, wider size variation,
    // and a different left/right weave for every particle.
    const count = window.innerWidth < 700 ? 56 : 110;
    const accent = getComputedStyle(root);
    const particleColors = [accent.getPropertyValue('--accent').trim(), accent.getPropertyValue('--gradient-start').trim() || accent.getPropertyValue('--accent-light').trim(), accent.getPropertyValue('--gradient-end').trim() || accent.getPropertyValue('--accent-strong').trim(), '#ffffff'];
    const randomWeave = () => `${Math.round(Math.random() * 120 - 60)}px`;

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      const size = Math.random() * 5.5 + 3;
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = String(Math.random() * .62 + .16);
      particle.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.animationDuration = `${5 + Math.random() * 12}s`;
      particle.style.animationDelay = `${-Math.random() * 17}s`;
      particle.style.setProperty('--weave-1', randomWeave());
      particle.style.setProperty('--weave-2', randomWeave());
      particle.style.setProperty('--weave-3', randomWeave());
      particle.style.setProperty('--weave-4', randomWeave());
      if (Math.random() < .3) particle.style.filter = 'blur(2px)';
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
  document.querySelectorAll('[data-accent-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedAccent = button.dataset.accentChoice;
      if (!availableAccents.includes(selectedAccent)) return;
      preferences.accent = selectedAccent;
      applyPreferences();
    });
  });
  customAccentPicker?.addEventListener('input', () => {
    const selectedColor = customAccentPicker.value.toLowerCase();
    if (!isHexColor(selectedColor)) return;
    preferences.customColor = selectedColor;
    preferences.accent = 'custom';
    applyPreferences();
  });
  function updateCustomGradient() {
    const start = customGradientStart?.value.toLowerCase();
    const end = customGradientEnd?.value.toLowerCase();
    if (!isHexColor(start) || !isHexColor(end)) return;
    preferences.gradientStart = start;
    preferences.gradientEnd = end;
    preferences.accent = 'gradient-custom';
    applyPreferences();
  }
  customGradientStart?.addEventListener('input', updateCustomGradient);
  customGradientEnd?.addEventListener('input', updateCustomGradient);
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
