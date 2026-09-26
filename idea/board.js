/* 1. SPLIT-FLAP PHC BOARD (board.js) */
(function() {
  'use strict';
  var soundOn = false, audioCtx = null;
  function playClack() {
    if (!soundOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.021);
    } catch(e) {}
  }
  var phcs = [
    { id: 'p1', name: 'PHC Sarangpur', doc: 'Dr. A. Verma', token: '048', wait: '12m', stat: 'Available', cls: 'status-avail', icon: 'check_circle' },
    { id: 'p2', name: 'CHC Bilaspur', doc: 'Dr. A. Rao', token: '025', wait: '18m', stat: 'Busy', cls: 'status-busy', icon: 'schedule' },
    { id: 'p3', name: 'PHC Rampur', doc: 'Dr. K. Sharma', token: '062', wait: '08m', stat: 'Available', cls: 'status-avail', icon: 'check_circle' },
    { id: 'p4', name: 'PHC Shivpuri', doc: 'Dr. M. Patel', token: '019', wait: '25m', stat: 'Closed', cls: 'status-closed', icon: 'do_not_disturb_on' },
    { id: 'p5', name: 'PHC Madhupur', doc: 'Dr. S. Das', token: '036', wait: '14m', stat: 'Available', cls: 'status-avail', icon: 'check_circle' }
  ];
  function makeFlaps(str, old) {
    var motion = document.documentElement.getAttribute('data-motion');
    if (motion === 'off') return '<span class="flap-static">' + str + '</span>';
    var out = '', s = String(str).split(''), o = String(old || str).split('');
    for (var i = 0; i < s.length; i++) {
      var isChg = o[i] !== s[i];
      out += '<span class="split-flap-char' + (isChg ? ' is-flipping' : '') + '" style="animation-delay:' + (i * 30) + 'ms"><span class="flap-inner">' + (s[i] === ' ' ? '&nbsp;' : s[i]) + '</span></span>';
    }
    return out;
  }
  function renderBoard() {
    var tb = document.getElementById('split-flap-tbody');
    if (!tb) return;
    tb.innerHTML = phcs.map(function(r) {
      return '<tr class="flap-row" id="row-' + r.id + '">' +
        '<td class="flap-cell font-bold">' + makeFlaps(r.name) + '</td>' +
        '<td class="flap-cell">' + makeFlaps(r.doc) + '</td>' +
        '<td class="flap-cell font-black text-primary"><span class="token-badge">' + makeFlaps('#' + r.token) + '</span></td>' +
        '<td class="flap-cell font-semibold">' + makeFlaps(r.wait) + '</td>' +
        '<td class="flap-cell"><span class="status-chip ' + r.cls + '"><span class="material-symbols-outlined text-[15px] mr-1">' + r.icon + '</span>' + r.stat + '</span></td>' +
      '</tr>';
    }).join('');
  }
  function updateBoard() {
    if (document.hidden || document.documentElement.classList.contains('motion-paused')) return;
    var row = phcs[Math.floor(Math.random() * phcs.length)];
    var old = row.token, num = parseInt(old, 10) + 1;
    row.token = (num < 100 ? (num < 10 ? '00' : '0') : '') + num;
    var el = document.getElementById('row-' + row.id);
    if (el) {
      var tb = el.querySelector('.token-badge');
      if (tb) tb.innerHTML = makeFlaps('#' + row.token, '#' + old);
      if (soundOn) playClack();
    }
  }
  function init() {
    renderBoard();
    setInterval(updateBoard, 6000);
    var btn = document.getElementById('board-clack-toggle');
    if (btn) {
      btn.onclick = function() {
        soundOn = !soundOn;
        btn.setAttribute('aria-pressed', soundOn);
        var ic = btn.querySelector('.material-symbols-outlined');
        if (ic) ic.textContent = soundOn ? 'volume_up' : 'volume_off';
        if (soundOn) playClack();
      };
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();