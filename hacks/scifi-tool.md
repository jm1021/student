---
layout: base
title: Starship Rookie Hub
sprite: /images/platformer/sprites/flying-ufo.png
background: /images/platformer/backgrounds/planet.jpg
permalink: /scifi-game
---

# 🛸 Starship Rookie Hub

Fly your UFO with arrow keys or WASD.  
Hover over a box to preview it.  
Press **Enter** or **click** to open the full page.

<div id="stage">
  <!-- UFO -->
  <img id="ufo" src="{{ page.sprite | relative_url }}" alt="UFO sprite" draggable="false" style="left:50%;top:50%;position:absolute;">

  <!-- Stars (replaces boxed hub) -->
  <div id="stars">
    <div class="star" data-title="How to Make Themes" data-link="{{ '/scifi-boxes/how-to-make-themes/' | relative_url }}" style="left:12%;top:18%;">★</div>
    <div class="star" data-title="Getting Started" data-link="{{ '/scifi-boxes/getting-started/' | relative_url }}" style="left:28%;top:62%;">★</div>
    <div class="star" data-title="Games You Can Do" data-link="{{ '/scifi-boxes/games-you-can-do/' | relative_url }}" style="left:62%;top:22%;">★</div>
    <div class="star" data-title="Linux Intro" data-link="{{ '/scifi-boxes/linux-intro-challenge' | relative_url }}" style="left:46%;top:80%;">★</div>
  </div>

  <!-- Floating preview (shows title when hovering a star) -->
  <div id="preview" class="hidden" aria-hidden="true">
    <h3 id="preview-title"></h3>
    <span class="hint">Press Enter to open</span>
  </div>

</div>

<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    color: #fff;
    min-height: 100vh;
  }

  /* full-page stage */
  #stage {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgba(0,0,0,0.6);
    background-image: url('{{ page.background | relative_url }}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    z-index: 0;
  }

  /* UFO */
  #ufo {
    position: absolute;
    width: 64px;
    height: auto; /* keep original aspect ratio to avoid squishing */
    max-width: 8vh;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 50;
  }

  /* Stars as selections */
  #stars { position: absolute; inset: 0; pointer-events: none; }
  .star {
    position: absolute;
    font-size: 28px;
    color: #fff;
    text-shadow: 0 0 8px rgba(80,160,255,0.9), 0 0 20px rgba(20,80,200,0.6);
    transform-origin: center;
    cursor: pointer;
    pointer-events: auto;
    transition: transform 160ms ease, filter 160ms ease;
  }
  .star:hover { transform: scale(1.6); filter: drop-shadow(0 6px 18px rgba(30,120,255,0.35)); }

  /* twinkle animation using CSS variables for per-star variation */
  .star {
    --tw-dur: 1.6s; /* default quicker twinkle */
    --tw-delay: 0s;
    animation: twinkle var(--tw-dur) infinite ease-in-out;
    animation-delay: var(--tw-delay);
  }

  @keyframes twinkle {
    0% { opacity: 0.6; transform: scale(1) translateZ(0); }
    30% { opacity: 1; transform: scale(1.2); }
    60% { opacity: 0.75; transform: scale(0.95); }
    100% { opacity: 0.6; transform: scale(1); }
  }

  /* Floating preview */
  #preview {
    position: absolute;
    padding: 8px 12px;
    background: rgba(0,0,0,0.7);
    color: #dff3ff;
    border-radius: 8px;
    pointer-events: none;
    text-align: center;
    z-index: 120;
    transform: translate(-50%, -140%);
    backdrop-filter: blur(4px);
  }
  #preview.hidden { display: none; }
  #preview-title { font-size: 16px; margin-bottom: 4px; }
  #preview-desc { font-size: 13px; color: #ccc; }
  .hint { font-size: 12px; color: #999; display: block; margin-top: 6px; }

  @media (max-width: 640px) {
    .star { font-size: 22px; }
    #ufo { width: 48px; height: 48px; }
  }
</style>

<script>
(() => {
  const ufo = document.getElementById('ufo');
  const hubBoxes = [...document.querySelectorAll('.star')];
  const preview = document.getElementById('preview');
  const titleEl = document.getElementById('preview-title');
  // stars only show title, not long desc

  const stage = document.getElementById('stage');
  let pos = { x: stage.clientWidth/2, y: stage.clientHeight/2 };
  const speed = 400;
  const keys = { arrowup:0, arrowdown:0, arrowleft:0, arrowright:0, w:0, a:0, s:0, d:0 };

  // randomize star positions and sizes on each load
  function randomizeStars(){
    const padding = 80; // keep away from edges
    const W = stage.clientWidth - padding*2;
    const H = stage.clientHeight - padding*2;
    hubBoxes.forEach((s, idx) => {
      const left = Math.round((Math.random() * W + padding) / stage.clientWidth * 100);
      const top = Math.round((Math.random() * H + padding) / stage.clientHeight * 100);
      s.style.left = left + '%';
      s.style.top = top + '%';
      // random size
      const size = 18 + Math.round(Math.random() * 20); // 18-38px
      s.style.fontSize = size + 'px';
      // twinkle variations
      const dur = (2 + Math.random() * 3).toFixed(2) + 's';
      const delay = (Math.random() * 2).toFixed(2) + 's';
      s.style.setProperty('--tw-dur', dur);
      s.style.setProperty('--tw-delay', delay);
    });
  }
  randomizeStars();

  let currentHover = null;
  let mouseHover = null;

  // mouse hover handling for stars
  hubBoxes.forEach(s => {
    s.addEventListener('mouseenter', () => { mouseHover = s; });
    s.addEventListener('mouseleave', () => { if (mouseHover === s) mouseHover = null; });
    s.addEventListener('click', () => { window.location.href = s.dataset.link; });
  });

  window.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 1;
    if (k === 'enter' && currentHover) {
      window.location.href = currentHover.dataset.link;
    }
  });
  window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 0;
  });

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function rectOf(elem){
    const r = elem.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    return {
      left: r.left - sr.left,
      top: r.top - sr.top,
      right: r.right - sr.left,
      bottom: r.bottom - sr.top
    };
  }

  function frame(time){
    const t = (time || performance.now()) * 0.001;
    const dt = 1/60;
    let vx = 0, vy = 0;
    if (keys.arrowleft || keys.a) vx -= 1;
    if (keys.arrowright || keys.d) vx += 1;
    if (keys.arrowup || keys.w) vy -= 1;
    if (keys.arrowdown || keys.s) vy += 1;

    if (vx && vy) { vx *= 0.707; vy *= 0.707; } // normalize diagonal speed
    pos.x += vx * speed * dt;
    pos.y += vy * speed * dt;

    pos.x = clamp(pos.x, 0, stage.clientWidth);
    pos.y = clamp(pos.y, 0, stage.clientHeight);

  // idle bob when not moving
  const isMoving = (vx !== 0 || vy !== 0);
  const bob = isMoving ? 0 : Math.sin(t * 3.2) * 6; // frequency, amplitude in px

  ufo.style.left = `${pos.x}px`;
  ufo.style.top = `${pos.y + bob}px`;
  ufo.style.transform = `translate(-50%, -50%)`;

    // detect hover using UFO position or mouse hover
    currentHover = null;
    // prefer mouse hover if present
    if (mouseHover) {
      currentHover = mouseHover;
    } else {
      for (const box of hubBoxes) {
        const r = rectOf(box);
        const overlap = !(pos.x > r.right || pos.x < r.left || pos.y > r.bottom || pos.y < r.top);
        if (overlap) { currentHover = box; break; }
      }
    }

    if (currentHover) {
      titleEl.textContent = currentHover.dataset.title;
      const r = rectOf(currentHover);
      preview.style.left = `${(r.left + r.right)/2}px`;
      preview.style.top = `${r.top - 10}px`;
      preview.classList.remove('hidden');
    } else {
      preview.classList.add('hidden');
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // click support
  hubBoxes.forEach(box => {
    box.addEventListener('click', () => {
      window.location.href = box.dataset.link;
    });
  });

  // handle resize
  window.addEventListener('resize', () => {
    pos.x = clamp(pos.x, 0, stage.clientWidth);
    pos.y = clamp(pos.y, 0, stage.clientHeight);
  });

})();
</script>

