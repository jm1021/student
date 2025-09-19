---
layout: base
title: Starship Rookie Hub
sprite: /images/platformer/sprites/flying-ufo.png
background: /images/platformer/backgrounds/alien_planet2.jpg
permalink: /scifi-tool
---

# 🛸 Starship Rookie Hub

Fly your UFO with arrow keys or WASD.  
Hover over a box to preview it.  
Press **Enter** or **click** to open the full page.

<div id="stage">
  <!-- UFO -->
  <img id="ufo" src="{{ page.sprite | relative_url }}" alt="UFO sprite" draggable="false" style="left:50%;top:50%;position:absolute;">

  <!-- central boxes -->
  <div id="hub">
    <div class="hub-box" data-title="How to Make Themes"
         data-desc="Learn to customize GitHub Pages themes step-by-step."
         data-link="{{ '/scifi-boxes/how-to-make-themes/' | relative_url }}">
      How to Make Themes
    </div>
    <div class="hub-box" data-title="Getting Started Journey"
         data-desc="Start your coding journey with VSCode, GitHub, and setup tips."
         data-link="{{ '/scifi-boxes/getting-started/' | relative_url }}">
      Getting Started
    </div>
    <div class="hub-box" data-title="Games you can do"
         data-desc="Cool games to get started on your coding journey"
         data-link="{{ '/scifi-boxes/games-you-can-do/' | relative_url }}">
      Games You Can Do
    </div>
    <div class="hub-box" data-title="Linux Introduction Challenge"
         data-desc="Linux challenge to level up your skills."
         data-link="{{ '/scifi-boxes/rookie-tips/' | relative_url }}">
      Linux Introduction Challenge
    </div>
  </div>
  
  <!-- Floating preview (placed inside stage so positioning is relative to it) -->
  <div id="preview" class="hidden">
    <h3 id="preview-title"></h3>
    <p id="preview-desc"></p>
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

  #stage {
    position: relative;
    height: 60vh;
    max-height: 600px;
    margin: 1rem auto;
    width: 90%;
    max-width: 1100px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0,0,0,0.35);
    /* stage-specific background image */
    background-image: url('{{ page.background | relative_url }}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 8px 20px rgba(0,0,0,0.6);
  }

  /* UFO */
  #ufo {
    position: absolute;
    width: 64px;
    height: 64px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 50;
  }

  /* Boxes */
  #hub {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(2, 200px);
    grid-gap: 20px;
    pointer-events: none;
  }

  .hub-box {
    pointer-events: auto;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;
    position: relative;
  }

  .hub-box:hover {
    transform: scale(1.05);
    background: rgba(255,255,255,0.15);
  }

  /* Floating preview */
  #preview {
    position: absolute;
    padding: 12px;
    background: rgba(0,0,0,0.85);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 10px;
    width: 220px;
    pointer-events: none;
    text-align: center;
    z-index: 60;
    transform: translate(-50%, -120%);
  }
  #preview.hidden { display: none; }
  #preview-title { font-size: 16px; margin-bottom: 4px; }
  #preview-desc { font-size: 13px; color: #ccc; }
  .hint { font-size: 12px; color: #999; display: block; margin-top: 6px; }

  @media (max-width: 640px) {
    #hub { grid-template-columns: repeat(2, 140px); grid-gap: 10px; }
    .hub-box { padding: 10px; font-size: 12px; }
    #ufo { width: 48px; height: 48px; }
  }
</style>

<script>
(() => {
  const ufo = document.getElementById('ufo');
  const hubBoxes = [...document.querySelectorAll('.hub-box')];
  const preview = document.getElementById('preview');
  const titleEl = document.getElementById('preview-title');
  const descEl = document.getElementById('preview-desc');

  const stage = document.getElementById('stage');
  let sr = stage.getBoundingClientRect();
  let center = { x: stage.clientWidth/2, y: stage.clientHeight/2 };
  let pos = { x: center.x, y: center.y };
  const speed = 250;
  const keys = { arrowup:0, arrowdown:0, arrowleft:0, arrowright:0, w:0, a:0, s:0, d:0 };
  let idle = true;
  let orbit = { angle: 0, radius: Math.min(sr.width, sr.height) * 0.25, speed: 0.01 };

  window.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k in keys) { keys[k] = 1; idle = false; }
    if (k === 'enter' && currentHover) {
      window.location.href = currentHover.dataset.link;
    }
  });
  window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = 0;
  });

  let currentHover = null;

  // Debug info to help validate assets and sizing
  console.log('scifi-tool init', {
    spriteSrc: ufo.src,
    stageSize: { width: stage.clientWidth, height: stage.clientHeight }
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

  function frame(t){
    const dt = 1/60;
    let vx = 0, vy = 0;
    if (keys.arrowleft || keys.a) vx -= 1;
    if (keys.arrowright || keys.d) vx += 1;
    if (keys.arrowup || keys.w) vy -= 1;
    if (keys.arrowdown || keys.s) vy += 1;

    if (vx || vy) {
      // keyboard control overrides idle orbit
      idle = false;
      if (vx && vy) { vx *= 0.707; vy *= 0.707; }
      pos.x += vx * speed * dt;
      pos.y += vy * speed * dt;
    } else {
      // idle orbit movement
      idle = true;
      orbit.angle += orbit.speed;
      pos.x = center.x + Math.cos(orbit.angle) * orbit.radius;
      pos.y = center.y + Math.sin(orbit.angle) * orbit.radius;
    }

  pos.x = clamp(pos.x, 0, stage.clientWidth);
  pos.y = clamp(pos.y, 0, stage.clientHeight);

  // position ufo by updating left/top so bounding rect matches stage coordinates
  ufo.style.left = `${pos.x}px`;
  ufo.style.top = `${pos.y}px`;
  ufo.style.transform = `translate(-50%, -50%)`;

    // detect hover
    currentHover = null;
    for (const box of hubBoxes) {
      const r = rectOf(box);
      const overlap = !(pos.x > r.right || pos.x < r.left || pos.y > r.bottom || pos.y < r.top);
      if (overlap) {
        currentHover = box;
        titleEl.textContent = box.dataset.title;
        descEl.textContent = box.dataset.desc;
        // Position preview relative to stage
        preview.style.left = `${(r.left + r.right)/2}px`;
        preview.style.top = `${r.top - 10}px`;
        preview.classList.remove('hidden');
        break;
      }
    }
    if (!currentHover) preview.classList.add('hidden');

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // click support
  hubBoxes.forEach(box => {
    box.addEventListener('click', () => {
      window.location.href = box.dataset.link;
    });
  });
  // handle resize: update stage rect and orbit center/radius
  window.addEventListener('resize', () => {
    sr = stage.getBoundingClientRect();
    center = { x: stage.clientWidth/2, y: stage.clientHeight/2 };
    orbit.radius = Math.min(stage.clientWidth, stage.clientHeight) * 0.25;
    // clamp pos to new stage
    pos.x = clamp(pos.x, 0, stage.clientWidth);
    pos.y = clamp(pos.y, 0, stage.clientHeight);
  });

})();
</script>
