/* MOTION CORE (motion.js) - Step 0 Controls */
(function() {
  'use strict';
  var tier = 'full', paused = false, calm = false;
  function getTier() {
    if (localStorage.getItem('swasthya_calm_mode') === 'on' || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return 'off';
    var conn = navigator.connection;
    if ((conn && (conn.saveData || /2g|3g|slow-2g/i.test(conn.effectiveType || ''))) || (navigator.deviceMemory && navigator.deviceMemory < 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) return 'lite';
    return 'full';
  }
  function applyTier(t) {
    tier = t || getTier();
    document.documentElement.setAttribute('data-motion', tier);
    paused = localStorage.getItem('swasthya_motion_paused') === 'true';
    document.documentElement.classList.toggle('motion-paused', paused);
    calm = (tier === 'off');
    document.querySelectorAll('.calm-toggle, #calm-mode-btn').forEach(function(b) { b.setAttribute('aria-pressed', calm); });
    document.querySelectorAll('.pause-toggle, #motion-pause-btn').forEach(function(b) { b.setAttribute('aria-pressed', paused); });
  }
  window.toggleCalmMode = function() {
    var nc = !calm;
    localStorage.setItem('swasthya_calm_mode', nc ? 'on' : 'off');
    applyTier(nc ? 'off' : getTier());
    if (window.showToast) window.showToast(nc ? 'Calm Mode ON (शांत मोड)' : 'Motion Active (एनीमेशन सक्रिय)', 'info');
  };
  window.toggleMotionPause = function() {
    paused = !paused;
    localStorage.setItem('swasthya_motion_paused', paused);
    document.documentElement.classList.toggle('motion-paused', paused);
    applyTier();
    if (window.showToast) window.showToast(paused ? 'Animations Paused (रोका गया)' : 'Animations Resumed (सक्रिय)', 'info');
  };
  window.addEventListener('storage', function(e) {
    if (e.key === 'swasthya_calm_mode' || e.key === 'swasthya_motion_paused') applyTier();
    if (e.key === 'swasthya_lang' && window.setAppLanguage) window.setAppLanguage(e.newValue, false);
  });
  var frames = 0, lastT = performance.now(), lowCnt = 0;
  function fpsLoop(now) {
    frames++;
    var d = now - lastT;
    if (d >= 1000) {
      var r = (frames * 1000) / d;
      frames = 0; lastT = now;
      if (tier === 'full' && r < 40 && !document.hidden) {
        if (++lowCnt >= 2) { tier = 'lite'; document.documentElement.setAttribute('data-motion', 'lite'); }
      } else lowCnt = 0;
    }
    if (!paused && tier !== 'off') requestAnimationFrame(fpsLoop);
  }
  document.addEventListener('visibilitychange', function() {
    document.documentElement.classList.toggle('tab-hidden-paused', document.hidden);
    if (!document.hidden && !paused && tier !== 'off') { lastT = performance.now(); frames = 0; requestAnimationFrame(fpsLoop); }
  });
  window.showToast = function(msg, type) {
    var c = document.getElementById('global-toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'global-toast-container';
      c.setAttribute('aria-live', 'polite');
      document.body.appendChild(c);
    }
    var t = document.createElement('div');
    t.className = 'toast-msg' + (type ? ' toast-' + type : '');
    t.innerHTML = '<span>' + msg + '</span>';
    c.appendChild(t);
    setTimeout(function() {
      t.classList.add('toast-fadeout');
      setTimeout(function() { t.remove(); }, 200);
    }, 2400);
  };
  applyTier();
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('page-enter');
    document.querySelectorAll('a[target="_blank"]').forEach(function(a) { if (!a.rel) a.rel = 'noopener noreferrer'; });
    requestAnimationFrame(fpsLoop);
  });
})();