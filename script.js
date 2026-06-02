/* ============================================================
   META ADS SPECIALIST PORTFOLIO — script.js
   Shared utilities & interactions for all pages
   ============================================================ */

/* ── Page Loader ───────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
});

/* ── Custom Cursor ─────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .glass-card, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ── Scroll Progress Bar ───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
})();

/* ── Nav Scroll Effect ─────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── Active Nav Link ───────────────────────────────────────── */
(function setActiveLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Hamburger Menu ────────────────────────────────────────── */
(function initHamburger() {
  const btn   = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  const cta   = document.querySelector('.nav-cta');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links && links.classList.toggle('open');
    cta   && cta.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links && links.classList.remove('open');
      cta   && cta.classList.remove('open');
    });
  });
})();

/* ── Reveal on Scroll ──────────────────────────────────────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();

/* ── Skill Bars Animation ──────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width || '0%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ── Counter Animation ─────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let current  = 0;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
})();

/* ── Tilt 3D Effect on Cards ───────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -16;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
})();

/* ── Glitch Effect on Logo ─────────────────────────────────── */
(function initGlitch() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  setInterval(() => {
    logo.style.textShadow = `2px 0 #f0b429, -2px 0 #0af`;
    setTimeout(() => {
      logo.style.textShadow = `0 0 20px var(--blue-vivid)`;
    }, 80);
  }, 4000);
})();

/* ── Particle Canvas (Home page) ───────────────────────────── */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const DOTS = Array.from({ length: 70 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.4,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    DOTS.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,170,255,${d.alpha})`;
      ctx.fill();
    });

    // Connect nearby dots
    for (let i = 0; i < DOTS.length; i++) {
      for (let j = i + 1; j < DOTS.length; j++) {
        const dx = DOTS[i].x - DOTS[j].x;
        const dy = DOTS[i].y - DOTS[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(DOTS[i].x, DOTS[i].y);
          ctx.lineTo(DOTS[j].x, DOTS[j].y);
          ctx.strokeStyle = `rgba(0,170,255,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Typing Animation ──────────────────────────────────────── */
function initTyping(selector, words, speed = 90, pause = 2000) {
  const el = document.querySelector(selector);
  if (!el) return;
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);

    if (!deleting && ci === word.length) {
      setTimeout(() => { deleting = true; tick(); }, pause);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    ci += deleting ? -1 : 1;
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

/* ── Toast Notification ────────────────────────────────────── */
function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed', bottom: '28px', right: '28px',
      display: 'flex', flexDirection: 'column', gap: '10px',
      zIndex: 9999
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const color  = type === 'success' ? '#0af' : type === 'error' ? '#ff5577' : '#f0b429';
  Object.assign(toast.style, {
    background: 'rgba(7,13,31,0.95)',
    border: `1px solid ${color}`,
    borderLeft: `4px solid ${color}`,
    color: '#e8f0ff',
    padding: '14px 20px',
    borderRadius: '10px',
    fontFamily: "'Syne', sans-serif",
    fontSize: '0.88rem',
    boxShadow: `0 4px 24px rgba(0,170,255,0.15)`,
    backdropFilter: 'blur(16px)',
    transform: 'translateX(120%)',
    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
    maxWidth: '320px',
    lineHeight: '1.5'
  });
  toast.textContent = msg;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ── Smooth Page Exit ──────────────────────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.remove('hidden');
        setTimeout(() => window.location.href = href, 400);
      } else {
        window.location.href = href;
      }
    });
  }
});

/* ── Export shared helpers ─────────────────────────────────── */
window.Portfolio = { initParticles, initTyping, showToast };