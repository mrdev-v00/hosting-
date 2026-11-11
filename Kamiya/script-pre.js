(function () {
  const screens = {
    start: document.getElementById('screen-start'),
    letter: document.getElementById('screen-letter'),
    cake: document.getElementById('screen-cake'),
    final: document.getElementById('screen-final'),
  };

  function goTo(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* ---------- stars ---------- */
  const canvas = document.getElementById('stars');
  const cx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    const n = Math.min(140, Math.floor((W * H) / 12000));
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        sp: Math.random() * 0.02 + 0.004,
        ph: Math.random() * Math.PI * 2,
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  (function loop() {
    requestAnimationFrame(loop);
    cx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.ph += s.sp;
      const a = s.a * (0.55 + 0.45 * Math.sin(s.ph));
      cx.globalAlpha = a;
      cx.fillStyle = '#fefae0';
      cx.beginPath();
      cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cx.fill();
    }
    cx.globalAlpha = 1;
  })();

  /* ---------- floating hearts ---------- */
  const heartsLayer = document.getElementById('hearts');
  let heartTimer = null;

  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'heart-pop';
    el.textContent = '♥';
    el.style.left = (Math.random() * 90 + 5) + 'vw';
    el.style.top  = (Math.random() * 30 + 55) + 'vh';
    el.style.fontSize = (12 + Math.random() * 16) + 'px';
    el.style.color = Math.random() > 0.5 ? '#dda15e' : '#e89eb0';
    heartsLayer.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  function startHearts() {
    if (heartTimer) return;
    heartTimer = setInterval(spawnHeart, 420);
  }

  function stopHearts() {
    clearInterval(heartTimer);
    heartTimer = null;
  }

  /* ---------- opening the gift ---------- */
  const giftBtn = document.getElementById('gift');
  giftBtn.addEventListener('click', () => {
    if (giftBtn.classList.contains('opening')) return;
    giftBtn.classList.add('opening');
    startHearts();
    setTimeout(() => {
      stopHearts();
      goTo('letter');
      startTypewriter();
    }, 1100);
  });

  /* ---------- typewriter letter ---------- */
  const letterText = `Some people arrive quietly, and then one day you realise you can't remember what the days looked like before them.

That's how it was with you.

This is only a pre-birthday gift — the real one comes on the twentieth. But I wanted you to have something to open early. Something small. Something that says: I remembered. I'm counting down too.

And whatever this year brings — the wins, the wobbles, the completely unexpected — bring it to me first.`;

  const letterEl = document.getElementById('letter-text');
  let typeTimer = null;

  function startTypewriter() {
    clearInterval(typeTimer);
    letterEl.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    letterEl.appendChild(cursor);

    let i = 0;
    typeTimer = setInterval(() => {
      if (i >= letterText.length) {
        clearInterval(typeTimer);
        setTimeout(() => { cursor.remove(); }, 700);
        return;
      }
      const ch = letterText[i++];
      cursor.insertAdjacentText('beforebegin', ch);
    }, 22);
  }

  /* ---------- navigation between screens ---------- */
  document.getElementById('to-cake').addEventListener('click', () => {
    clearInterval(typeTimer);
    goTo('cake');
    buildCandles();
  });

  document.getElementById('to-final').addEventListener('click', () => {
    goTo('final');
    startHearts();
    setTimeout(stopHearts, 7000);
  });

  document.getElementById('replay').addEventListener('click', () => {
    giftBtn.classList.remove('opening');
    letterEl.innerHTML = '';
    document.getElementById('to-final').disabled = true;
    goTo('start');
  });

  /* ---------- cake candles ---------- */
  const candlesWrap = document.getElementById('candles');
  const hint = document.getElementById('cake-hint');
  const toFinal = document.getElementById('to-final');
  let candlesLeft = 0;

  function buildCandles() {
    candlesWrap.innerHTML = '';
    candlesLeft = 20;

    for (let i = 0; i < 20; i++) {
      const c = document.createElement('div');
      c.className = 'candle';
      const f = document.createElement('div');
      f.className = 'flame';
      c.appendChild(f);
      c.addEventListener('click', () => blowOut(c));
      candlesWrap.appendChild(c);
    }

    hint.textContent = 'tap each flame to blow it out';
    toFinal.disabled = true;
  }

  function blowOut(candle) {
    if (candle.classList.contains('out')) return;
    candle.classList.add('out');
    for (let i = 0; i < 4; i++) {
      const s = document.createElement('span');
      s.className = 'heart-pop';
      s.textContent = '·';
      s.style.left = (candle.getBoundingClientRect().left + 4) + 'px';
      s.style.top  = (candle.getBoundingClientRect().top - 8) + 'px';
      s.style.fontSize = '22px';
      s.style.color = 'rgba(254,250,224,0.6)';
      heartsLayer.appendChild(s);
      setTimeout(() => s.remove(), 5000);
    }

    candlesLeft--;
    if (candlesLeft <= 0) {
      hint.textContent = 'wish made.';
      toFinal.disabled = false;
      startHearts();
      setTimeout(stopHearts, 5000);
    } else {
      hint.textContent = `${candlesLeft} left`;
    }
  }
})();