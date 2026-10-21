/**
 * PAWVIA - Theme and RTL Toggle Module
 * Handles: Dark/Light theme switching and RTL/LTR direction switching.
 * Persists user preferences in localStorage.
 * Works across all 7 pages via shared script include.
 */

(function () {
  'use strict';

  if (window.__THEME_RTL_INITIALIZED__) return;
  window.__THEME_RTL_INITIALIZED__ = true;

  var STORAGE_THEME_KEY = 'dp_theme';
  var STORAGE_DIR_KEY   = 'dp_dir';

  // Apply saved preferences immediately (before DOMContentLoaded)
  // so there is no flash of wrong theme/direction
  (function applyEarly() {
    var savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    var savedDir   = localStorage.getItem(STORAGE_DIR_KEY);
    var html = document.documentElement;

    if (savedTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }
    if (savedDir === 'rtl') {
      html.setAttribute('dir', 'rtl');
    }
  })();

  // DOM-ready init
  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initRtlToggle();
  });

  function initThemeToggle() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    if (!btns.length) return;

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btns.forEach(function (btn) {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var html   = document.documentElement;
        var nowDark = html.getAttribute('data-theme') === 'dark';

        if (nowDark) {
          html.removeAttribute('data-theme');
          localStorage.setItem(STORAGE_THEME_KEY, 'light');
          btns.forEach(function (b) {
            b.setAttribute('aria-label', 'Switch to Dark Mode');
            b.setAttribute('aria-pressed', 'false');
          });
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem(STORAGE_THEME_KEY, 'dark');
          btns.forEach(function (b) {
            b.setAttribute('aria-label', 'Switch to Light Mode');
            b.setAttribute('aria-pressed', 'true');
          });
        }
      });
    });
  }

  function initRtlToggle() {
    var btns = document.querySelectorAll('[data-rtl-toggle]');
    if (!btns.length) return;

    var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    btns.forEach(function (btn) {
      btn.classList.toggle('rtl-active', isRtl);
      btn.setAttribute('aria-label', isRtl ? 'Switch to Left-to-Right Layout' : 'Switch to Right-to-Left Layout');
      btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
    });

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var html  = document.documentElement;
        var nowRtl = html.getAttribute('dir') === 'rtl';

        if (nowRtl) {
          html.removeAttribute('dir');
          localStorage.setItem(STORAGE_DIR_KEY, 'ltr');
          btns.forEach(function (b) {
            b.classList.remove('rtl-active');
            b.setAttribute('aria-label', 'Switch to Right-to-Left Layout');
            b.setAttribute('aria-pressed', 'false');
          });
        } else {
          html.setAttribute('dir', 'rtl');
          localStorage.setItem(STORAGE_DIR_KEY, 'rtl');
          btns.forEach(function (b) {
            b.classList.add('rtl-active');
            b.setAttribute('aria-label', 'Switch to Left-to-Right Layout');
            b.setAttribute('aria-pressed', 'true');
          });
        }
      });
    });
  }

})();
