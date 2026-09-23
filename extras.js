/* EXTRAS (extras.js) - Features 2-11 */
(function() {
  'use strict';

  /* 2. MULTILINGUAL NAMASTE */
  var namastes = ['नमस्ते', 'வணக்கம்', 'నమస్కారం', 'নমস্কার', 'नमस्कार', 'નમસ્તે', 'ನಮಸ್ಕಾರ', 'നമസ്കാരം', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ନମସ୍କାର'];
  var nIdx = 0, isNPaused = false;
  function initNamaste() {
    var wrap = document.getElementById('namaste-wrap'), text = document.getElementById('namaste-text');
    if (!wrap || !text) return;
    setInterval(function() {
      if (isNPaused || document.hidden || document.documentElement.classList.contains('motion-paused')) return;
      text.classList.add('switching');
      setTimeout(function() {
        nIdx = (nIdx + 1) % namastes.length;
        text.textContent = namastes[nIdx];
        text.classList.remove('switching');
      }, 250);
    }, 3000);
    wrap.onmouseenter = function() { isNPaused = true; };
    wrap.onmouseleave = function() { isNPaused = false; };
    wrap.onclick = function() {
      if (window.setAppLanguage) window.setAppLanguage(nIdx === 0 ? 'hi' : 'en');
      if (window.showToast) window.showToast(namastes[nIdx], 'info');
    };
  }

  /* 3. TULSI PROGRESS (Register Patient) */
  window.updateTulsiProgress = function(step, max) {
    max = max || 4;
    var c = document.getElementById('tulsi-progress-container');
    if (!c) return;
    c.setAttribute('aria-valuenow', step);
    var l = document.getElementById('tulsi-step-label');
    if (l) l.textContent = 'Step ' + step + ' of ' + max + ' (चरण ' + step + '/' + max + ')';
    var sp = document.getElementById('tulsi-sprout'), lf = document.getElementById('tulsi-leaves'), fl = document.getElementById('tulsi-flowers'), tk = document.getElementById('tulsi-tick');
    if (sp) sp.style.transform = step >= 2 ? 'scale(1)' : 'scale(0)';
    if (lf) lf.style.transform = step >= 3 ? 'scale(1)' : 'scale(0)';
    if (fl) fl.style.transform = step >= 4 ? 'scale(1)' : 'scale(0)';
    if (tk) tk.style.opacity = step >= 4 ? '1' : '0';
  };

  /* 4. SWASTH GAON VILLAGE METER */
  function initSwasthGaon() {
    var g = document.getElementById('swasth-gaon-grid');
    if (!g) return;
    g.innerHTML = '';
    for (var i = 0; i < 20; i++) {
      var isGrn = i < 13;
      var h = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      h.setAttribute('viewBox', '0 0 24 24');
      h.setAttribute('class', 'village-house ' + (isGrn ? 'active-green' : 'inactive-grey'));
      h.setAttribute('style', 'transition-delay:' + (i * 50) + 'ms');
      h.innerHTML = '<polygon points="12,3 2,12 5,12 5,20 19,20 19,12 22,12"/><rect class="house-window" x="9" y="11" width="6" height="5" fill="#FEF08A"/>';
      g.appendChild(h);
    }
  }

  /* 5. MEDICINE STOCK BOTTLES */
  var meds = [
    { n: 'Paracetamol', s: 85, u: '500mg' },
    { n: 'ORS Packets', s: 68, u: 'Oral Salt' },
    { n: 'Iron-Folic', s: 42, u: 'IFA Red' },
    { n: 'Amoxicillin', s: 22, u: 'Antibiotic' },
    { n: 'Anti-Malarial', s: 55, u: 'Chloroquine' }
  ];
  function initMeds() {
    var b = document.getElementById('med-bottles-list');
    if (!b) return;
    b.innerHTML = meds.map(function(m) {
      var col = m.s > 60 ? '#138808' : (m.s >= 30 ? '#F59E0B' : '#DC2626');
      var st = m.s > 60 ? 'Full' : (m.s >= 30 ? 'Mid' : 'Low');
      return '<div class="med-bottle-card" onclick="window.showToast&&window.showToast(\'' + m.n + ': ' + m.u + '\',\'info\')" role="button" tabindex="0">' +
        '<svg class="bottle-svg" viewBox="0 0 40 60"><rect x="14" y="2" width="12" height="6" rx="2" fill="#64748B"/><rect x="6" y="12" width="28" height="46" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/><rect x="8" y="' + (56 - (m.s * 0.42)) + '" width="24" height="' + (m.s * 0.42) + '" rx="3" fill="' + col + '"/></svg>' +
        '<div class="font-bold text-xs text-slate-800">' + m.n + '</div><div class="text-[11px] font-bold" style="color:' + col + '">' + st + ' (' + m.s + '%)</div>' +
      '</div>';
    }).join('');
  }

  /* 6. OLD WAY vs TOKEN WAY RACE */
  function initRace() {
    var el = document.getElementById('race-container-box');
    if (!el) return;
    var bo = document.getElementById('bar-old'), bn = document.getElementById('bar-new'), dn = false;
    new IntersectionObserver(function(es) {
      if (es[0].isIntersecting && !dn) {
        dn = true;
        if (document.documentElement.getAttribute('data-motion') === 'off') {
          if (bo) bo.style.width = '100%';
          if (bn) bn.style.width = '100%';
        } else {
          if (bn) { bn.style.transition = 'width 600ms cubic-bezier(.16,1,.3,1)'; bn.style.width = '100%'; }
          if (bo) { bo.style.transition = 'width 3000ms linear'; bo.style.width = '100%'; }
        }
        var a = document.getElementById('race-announcement');
        if (a) a.textContent = 'You save about 3 hrs 40 min with Digital Token.';
      }
    }, { threshold: 0.25 }).observe(el);
  }

  /* 7. BOLIYE VOICE INPUT */
  function initVoice() {
    var b = document.getElementById('voice-boliye-btn'), inp = document.getElementById('quick-token-input') || document.getElementById('token-search-input');
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { if (b) b.style.display = 'none'; return; }
    var rec = new SR();
    rec.lang = 'hi-IN';
    if (b) {
      b.onclick = function() {
        try {
          rec.start();
          b.classList.add('recording');
          if (window.showToast) window.showToast('Sun raha hoon... (बोलें)', 'info');
        } catch(e) {
          rec.stop();
          b.classList.remove('recording');
        }
      };
    }
    rec.onresult = function(e) {
      var txt = e.results[0][0].transcript.replace(/[^0-9]/g, '') || e.results[0][0].transcript;
      if (inp) inp.value = txt;
      if (window.showToast) window.showToast('Recognized: #' + txt, 'info');
    };
    rec.onend = function() { if (b) b.classList.remove('recording'); };
    rec.onerror = function() { if (b) b.classList.remove('recording'); };
  }

  /* 8. EMOJI FEEDBACK */
  function initEmoji() {
    document.querySelectorAll('.emoji-btn').forEach(function(b) {
      b.onclick = function() {
        document.querySelectorAll('.emoji-btn').forEach(function(x) { x.classList.remove('chosen'); });
        b.classList.add('chosen');
        if (window.showToast) window.showToast('Dhanyavaad! Feedback: ' + (b.getAttribute('data-rating') || 'Good'), 'success');
      };
    });
  }

  /* 9. WEATHER ALERT */
  function initWeather() {
    var s = document.getElementById('weather-speak-btn');
    if (s) {
      s.onclick = function() {
        var t = s.getAttribute('data-speak') || 'Machhar se bachein: dengue malaria alert.';
        if ('speechSynthesis' in window) {
          var u = new SpeechSynthesisUtterance(t);
          u.lang = 'hi-IN';
          window.speechSynthesis.speak(u);
        }
      };
    }
  }

  /* 10. OFFLINE BANNER */
  function initOffline() {
    function chk() {
      var b = document.getElementById('offline-sms-banner');
      if (!b) {
        b = document.createElement('div');
        b.id = 'offline-sms-banner';
        b.setAttribute('role', 'status');
        b.innerHTML = '<div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm font-bold"><span>⚠️ Offline: SMS <code>QUEUE &lt;Token&gt;</code> to <strong>56161</strong></span><a href="sms:56161?body=QUEUE%20" class="px-2.5 py-1 bg-white text-red-700 rounded text-xs">SMS 56161</a></div>';
        document.body.appendChild(b);
      }
      b.classList.toggle('banner-visible', !navigator.onLine);
    }
    window.addEventListener('offline', chk);
    window.addEventListener('online', chk);
    if (!navigator.onLine) chk();
  }

  /* 11. HEADLINE UNDERLINE */
  function initUnderline() {
    document.querySelectorAll('.draw-underline-target').forEach(function(el) {
      if (!el.querySelector('.hand-drawn-underline-svg')) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'hand-drawn-underline-svg');
        svg.setAttribute('viewBox', '0 0 240 12');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.innerHTML = '<path class="hand-drawn-path" d="M 2 7 Q 60 2, 120 8 T 238 6"/>';
        el.style.position = 'relative';
        el.appendChild(svg);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initNamaste(); initSwasthGaon(); initMeds(); initRace(); initVoice(); initEmoji(); initWeather(); initOffline(); initUnderline();
  });
})();