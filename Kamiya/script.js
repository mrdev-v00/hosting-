const SCENES = [
  { id: 's0', dur: 5200 },
  { id: 's1', dur: 20000 },
  { id: 's2', dur: 19000 },
  { id: 's3', dur: 15000 },
  { id: 's4', dur: 18000 },
  { id: 's5', dur: 18000 },
  { id: 's6', dur: 14000 },
  { id: 's7', dur: 18000 },
  { id: 's8', dur: 18000 },
  { id: 's9', dur: 14000 },
  { id: 's10', dur: 15000 },
  { id: 's11', dur: 15000 },
  { id: 's12', dur: 99999 },
];

let cur = 0;
let timers = [];

const I = { opacity: '1', transform: 'translateY(0)' };
const S = { opacity: '1', transform: 'scale(1)' };
const V = { opacity: '0.9', transform: 'translateY(0)' };

function fade(id, props, delay = 0, ms = 900) {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => {
    el.style.transition = `opacity ${ms}ms cubic-bezier(0.22,1,0.36,1), transform ${ms}ms cubic-bezier(0.22,1,0.36,1)`;
    Object.assign(el.style, props);
  }, delay);
}

function resetScene(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('active');
  el.querySelectorAll('[id]').forEach(c => {
    c.style.transition = 'none';
    c.style.opacity = '0';
    c.style.transform = '';
  });
  const hp = el.querySelector('#hp');
  if (hp) {
    hp.style.transition = 'none';
    hp.style.strokeDashoffset = '220';
    hp.style.fill = 'none';
  }
}

function animScene(id) {
  if (id === 's0') {
    fade('a0', I, 300, 900);
    fade('b0', S, 1000, 1200);
    fade('c0', I, 2200, 900);
    fade('d0', V, 3200, 900);
  }
  if (id === 's1') {
    fade('a1', I, 300, 900);
    fade('b1', V, 1000, 1200);
  }
  if (id === 's2') {
    fade('a2', I, 300, 900);
    fade('b2', V, 1000, 1200);
    fade('c2', V, 12000, 1000);
  }
  if (id === 's3') {
    fade('a3', I, 300, 900);
    fade('b3', V, 1000, 1200);
  }
  if (id === 's4') {
    fade('a4', I, 300, 900);
    fade('b4', V, 1000, 1200);
  }
  if (id === 's5') {
    fade('a5', I, 300, 900);
    fade('b5', V, 1000, 1200);
    fade('c5', V, 11000, 1000);
  }
  if (id === 's6') {
    fade('a6', I, 300, 900);
    fade('b6', V, 1000, 1200);
  }
  if (id === 's7') {
    fade('a7', I, 300, 900);
    fade('b7', V, 1000, 1200);
    fade('c7', V, 11000, 1000);
  }
  if (id === 's8') {
    fade('a8', I, 300, 900);
    fade('b8', V, 1000, 1200);
  }
  if (id === 's9') {
    fade('a9', I, 300, 900);
    fade('b9', V, 1000, 1200);
    fade('c9', V, 8000, 1000);
  }
  if (id === 's10') {
    fade('a10', I, 300, 900);
    fade('b10', V, 1000, 1200);
  }
  if (id === 's11') {
    fade('a11', I, 300, 900);
    fade('b11', V, 1000, 1200);
    fade('c11', V, 9000, 1000);
  }
  if (id === 's12') {
    const hw = document.getElementById('hw');
    const hp = document.getElementById('hp');
    if (hw && hp) {
      hp.style.transition = 'none';
      hp.style.strokeDashoffset = '220';
      hp.style.fill = 'none';
      setTimeout(() => {
        hw.style.transition = 'opacity .6s, transform .9s cubic-bezier(0.34,1.56,0.64,1)';
        hw.style.opacity = '1';
        hw.style.transform = 'scale(1)';
        hp.style.transition = 'stroke-dashoffset 2s ease';
        hp.style.strokeDashoffset = '0';
      }, 400);
      setTimeout(() => {
        hp.style.transition = 'fill .9s ease';
        hp.style.fill = '#bc6c25';
      }, 2600);
    }
    fade('a12', S, 1900, 1200);
    fade('b12', S, 2900, 1200);
    fade('c12', I, 4100, 1000);
    fade('d12', V, 5300, 1100);
  }
}

function scheduleNext(i) {
  timers.forEach(clearTimeout);
  timers = [];
  if (SCENES[i].dur === 99999) return;
  const t = setTimeout(() => {
    if (cur < SCENES.length - 1) showScene(cur + 1);
  }, SCENES[i].dur);
  timers.push(t);
}

function showScene(i) {
  if (cur >= 0 && cur !== i) resetScene(SCENES[cur].id);
  cur = i;
  const id = SCENES[i].id;
  const el = document.getElementById(id);
  el.classList.add('active');
  animScene(id);
  scheduleNext(i);
}

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowRight' && cur < SCENES.length - 1) {
    e.preventDefault();
    showScene(cur + 1);
  }
  if (e.code === 'ArrowLeft' && cur > 0) {
    e.preventDefault();
    showScene(cur - 1);
  }
});

if ('ontouchstart' in window) {
  let tx = null, ty = null;
  document.addEventListener('touchstart', e => {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    tx = null; ty = null;
    if (Math.abs(dx) > Math.abs(dy) + 20) {
      if (dx < -60 && cur < SCENES.length - 1) showScene(cur + 1);
      else if (dx > 60 && cur > 0) showScene(cur - 1);
    } else if (Math.abs(dx) < 20 && Math.abs(dy) < 20 && cur < SCENES.length - 1) {
      showScene(cur + 1);
    }
  }, { passive: true });
}

showScene(0);