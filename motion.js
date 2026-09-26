/* MOTION CORE (motion.js) - Step 0 Controls */
(function() {
  'use strict';
  var tier = 'full', paused = false, calm = false;
  function getTier() {
    var savedCalm = localStorage.getItem('swasthya_calm_mode');
    if (savedCalm === 'on' || savedCalm === 'true') return 'off';
    var savedTier = localStorage.getItem('swasthya_motion_tier');
    if (savedTier) return savedTier;
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
    var label = document.getElementById('motion-tier-label');
    var pauseIcon = document.getElementById('motion-pause-icon');
    if (label) label.textContent = tier.charAt(0).toUpperCase() + tier.slice(1);
    if (pauseIcon) pauseIcon.textContent = paused ? '▶️' : '⏸️';
  }
  window.toggleCalmMode = function() {
    var nc = !calm;
    localStorage.setItem('swasthya_calm_mode', nc ? 'true' : 'false');
    if (nc) {
      applyTier('off');
    } else {
      localStorage.setItem('swasthya_motion_tier', 'full');
      applyTier('full');
    }
    var calmText = document.getElementById('calm-text');
    if (calmText) calmText.textContent = nc ? "Calm: On" : "Calm: Off";
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
    if (e.key === 'swasthya_calm_mode' || e.key === 'swasthya_motion_paused' || e.key === 'swasthya_motion_tier') applyTier();
    if (e.key === 'swasthya_lang' && window.setAppLanguage) window.setAppLanguage(e.newValue, false);
  });
  var frames = 0, lastT = performance.now(), lowCnt = 0;
  var pageStartTime = performance.now();
  function fpsLoop(now) {
    frames++;
    var d = now - lastT;
    if (d >= 1000) {
      var r = (frames * 1000) / d;
      frames = 0; lastT = now;
      // 8-second startup grace period so initial font loading & SVG setup don't downgrade tier
      if (now - pageStartTime > 8000 && tier === 'full' && r < 20 && !document.hidden) {
        if (++lowCnt >= 8) { 
          tier = 'lite'; 
          document.documentElement.setAttribute('data-motion', 'lite'); 
        }
      } else {
        lowCnt = Math.max(0, lowCnt - 1);
      }
    }
    if (!paused && tier !== 'off') requestAnimationFrame(fpsLoop);
  }
  document.addEventListener('visibilitychange', function() {
    document.documentElement.classList.toggle('tab-hidden-paused', document.hidden);
    if (!document.hidden) {
      document.documentElement.setAttribute('data-motion', tier);
      if (!paused && tier !== 'off') { 
        lastT = performance.now(); 
        frames = 0; 
        requestAnimationFrame(fpsLoop); 
      }
    }
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