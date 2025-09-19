---
title: "Siddharth Hota and Dhruv Agrawal - Snake Hacks Blog"
date: 2025-09-17
---

# Hello, our names our Siddharth and Dhruv, and we choose to do the snake.md hacks

Welcome to my blog where I document the various hacks and features I implemented in the classic Snake game using `snake.md`. Below, I've divided my work into easy hacks, hard hacks, and extra features. To play the game itself, acess this link: https://jupiterian.github.io/student/snake 

---

## Easy Hacks

### 1. Change the background color, snake color, and food color
I modified the game's CSS and JavaScript to allow dynamic changes to the background, snake, and food colors. This was achieved by exposing color pickers in the settings menu and updating the rendering logic to use the selected colors. Below is the code references

Background 
```bash
background-color: #72d38d; and ctx.fillStyle = "#72d38d";
```

```bash
Snake - ctx.fillStyle = "#FFFFFF";
```

```bash
Food -
if (f.special) {
      ctx.fillStyle = "#ffd700"; // Gold for special food
  } else {
      ctx.fillStyle = "#ff7272"; // Red for regular food
  }
```
### 2. Add or change settings to change the speed of the snake
I introduced a slider in the settings screen that lets users adjust the snake's speed. The game loop interval is updated in real-time based on the chosen speed, making the game more customizable. Below are the code references

```bash
setSnakeSpeed(Change to desired number) and setTimeout(mainLoop, snake_speed);
```

### 3. Increase the amount of length the snake gets from the food
I added a setting that lets players choose how much the snake grows when it eats food. This involved modifying the logic that handles food consumption and snake growth. Below are the code references

```bash
if (checkBlock(snake[0].x, snake[0].y, f.x, f.y)) {
    snake[snake.length] = {x: snake[0].x, y: snake[0].y}; // Single growth
```

### 4. Add new keybinds to the snake (e.g., give it WASD controls)
I updated the input handling code to support both arrow keys and WASD controls, making the game more accessible and comfortable for different players. I did this with the changeDir() function and via the code below

```bash
let changeDir = function(key){
    // accept both keyCode numbers and key strings (arrows and WASD)
    const k = (typeof key === 'number') ? key : String(key).toLowerCase();
    switch(k) {
        case 37: // left arrow
        case 'arrowleft':
        case 'a':  // ← WASD: A for left
            if (snake_dir !== 1) snake_next_dir = 3; // left
            break;
        case 38: // up arrow
        case 'arrowup':
        case 'w':  // ← WASD: W for up
            if (snake_dir !== 2) snake_next_dir = 0; // up
            break;
        case 39: // right arrow
        case 'arrowright':
        case 'd':  // ← WASD: D for right
            if (snake_dir !== 3) snake_next_dir = 1; // right
            break;
        case 40: // down arrow
        case 'arrowdown':
        case 's':  // ← WASD: S for down
            if (snake_dir !== 0) snake_next_dir = 2; // down
            break;
    }
}
```

### 5. Add a glowing effect to any part of the game
Using CSS box-shadow and animation, I added a glowing effect to the snake, food, obstacles, and score, making them stand out visually and enhancing the game's aesthetics. Here is the code

```bash
// Paint snake with a soft glow
ctx.save();
ctx.shadowColor = "rgba(255,255,255,0.6)";  // ← White glow
ctx.shadowBlur = 8;                          // ← Blur intensity
for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = "#FFFFFF"; // White for snake
    ctx.fillRect(snake[i].x * BLOCK, snake[i].y * BLOCK, BLOCK, BLOCK);
}
ctx.restore();

// Paint multiple foods
for (let fi = 0; fi < foods.length; fi++) {
    const f = foods[fi];
    ctx.save();
    if (f.special) {
        ctx.shadowColor = "rgba(255,215,0,0.9)";  // ← Gold glow for special food
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#ffd700";
    } else {
        ctx.shadowColor = "rgba(255,114,114,0.6)"; // ← Red glow for regular food
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#ff7272";
    }
    ctx.fillRect(f.x * BLOCK, f.y * BLOCK, BLOCK, BLOCK);
    ctx.restore();
}

// Paint obstacles
for (let oi = 0; oi < obstacles.length; oi++) {
    const ob = obstacles[oi];
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.4)";  // ← Dark shadow for obstacles
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#4b4b4b"; // dark grey
    ctx.fillRect(ob.x * BLOCK, ob.y * BLOCK, BLOCK, BLOCK);
    ctx.restore();
}

/* soft glow for score */
#score_value {
    text-shadow: 0 0 8px rgba(114, 211, 141, 0.8);  /* ← Score text glow */
}
```

### 6. Overhaul the UI (interface) of the setting screens/game over screen
I redesigned the settings and game over screens with a modern look, using improved layouts, colors, and transitions for a better user experience.

```bash
/* Center and style the score */
#score_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
}
#score_value {
    background: rgba(255,255,255,0.7);  /* ← Semi-transparent background */
    color: #2e6e4d;
    font-size: 2rem;                    /* ← Large, bold text */
    font-weight: bold;
    border-radius: 8px;                 /* ← Rounded corners */
    padding: 4px 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);  /* ← Subtle shadow */
    text-align: center;
    min-width: 60px;
    user-select: none;
}

#gameover a:hover, #setting a:hover, #menu a:hover{
    cursor: pointer;
}
#gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
    content: ">";                        /* ← Arrow indicator on hover */
    margin-right: 10px;
}
---
```
## Hard Hacks - To run hard hacks, go to settings, and click hard mode, and then new game

### 1. Add obstacles that the snake has to avoid
I implemented randomly placed obstacles on the game board. The collision detection logic was updated so that hitting an obstacle results in losing a life or ending the game. Below is the code

```bash
// Snake hits obstacle
for (let oi = 0; oi < obstacles.length; oi++) {
    const ob = obstacles[oi];
    if (checkBlock(snake[0].x, snake[0].y, ob.x, ob.y)) {
        // hit obstacle: lose a life
        lives -= 1;
        updateLivesUI();
        if (lives <= 0) { showScreen(SCREEN_GAME_OVER); return; }
        respawnAfterHit();
        return;
    }
}
```
```bash
let addObstacle = function(){
    const maxX = canvas.width / BLOCK;
    const maxY = canvas.height / BLOCK;
    const tryPlace = function(){
        const ox = Math.floor(Math.random() * (maxX - 1));
        const oy = Math.floor(Math.random() * (maxY - 1));
        // check conflicts
        for(let i = 0; i < snake.length; i++) if(checkBlock(ox, oy, snake[i].x, snake[i].y)) return null;
        for(let i = 0; i < foods.length; i++) if(checkBlock(ox, oy, foods[i].x, foods[i].y)) return null;
        for(let i = 0; i < obstacles.length; i++) if(checkBlock(ox, oy, obstacles[i].x, obstacles[i].y)) return null;
        return {x: ox, y: oy};
    }
    let pos = tryPlace();
    let attempts = 0;
    while(!pos && attempts < 50){ pos = tryPlace(); attempts++; }
    if(!pos) return;
    obstacles.push(pos);
}
```

### 2. Give snake multiple lives
I introduced a lives system, displaying the remaining lives on the UI. When the snake collides with itself or an obstacle, it loses a life and respawns, unless all lives are lost. Below is the code

```bash
let lives = 3;

let updateLivesUI = function(){
    const el = document.getElementById('lives_value');
    if (el) el.innerText = 'Lives: ' + String(lives);
}

let respawnAfterHit = function(){
    // simple respawn: place snake back at starting position and reduce length
    snake = [];
    snake.push({x: 0, y: 15});
    for (let i = 1; i <= 2; i++) { snake.push({ x: 0 - i, y: 15 }); }
    snake_next_dir = 1;
    // ensure there are at least 2 foods and some obstacles
    while (foods.length < 2) addFood();
    while (obstacles.length < 1) addObstacle();
    // ensure at least one heart exists occasionally
    if (hearts.length < 1 && Math.random() < 0.6) addHeart();
    // give player a brief pause before resuming
    setTimeout(mainLoop, 400);
}

// Wall collision (Lines 204-207)
if (snake[0].x < 0 || snake[0].x === canvas.width / BLOCK || snake[0].y < 0 || snake[0].y === canvas.height / BLOCK){
    lives -= 1;
    updateLivesUI();
    if (lives <= 0) { showScreen(SCREEN_GAME_OVER); return; }
    respawnAfterHit();
    return;
}

// Self collision (Lines 218-221)
if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
    lives -= 1;
    updateLivesUI();
    if (lives <= 0) { showScreen(SCREEN_GAME_OVER); return; }
    respawnAfterHit();
    return;
}
```
### 3. Make multiple foods available to the snake
I modified the food spawning logic to allow multiple food items to appear on the board at once. This feature would only be accesible in hard mode, to help balance the extra challenges.

```bash
let foods = [];

// Snake eats any food present
for (let fi = 0; fi < foods.length; fi++) {
    const f = foods[fi];
    if (checkBlock(snake[0].x, snake[0].y, f.x, f.y)) {
        // grow
        snake[snake.length] = {x: snake[0].x, y: snake[0].y};
        // Award points
        const points = (f.special ? 3 : 1);  // ← Special foods worth more
        const prevScore = score;
        score += points;
        altScore(score);
        // ... bonus logic ...
        // remove eaten food
        foods.splice(fi, 1);  // ← Remove specific food from array
        // spawn another food to keep count
        addFood();
        break;
    }
}

if (difficulty === 'hard'){
    // multiple foods and obstacles on hard
    for (let i = 0; i < 3; i++) addFood();  // ← Spawn 3 foods
    for (let i = 0; i < 4; i++) addObstacle();
}
---
```
## Extra Features

I also added a sound effect upon eating the food. Here is the code:

```bash
// Add sound effect on food eat
try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 800; // High pitch beep
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Short beep
} catch(e) {} // Ignore if audio not supported

Finally I added (though very scuffed drawing wise) hearts which if the user eats will increase their lives by 1.

// Paint hearts (larger + stroked for visibility)
            for (let hi = 0; hi < hearts.length; hi++) {
                const h = hearts[hi];
                // draw a simple heart using two circles and a triangle-like bottom
                const px = h.x * BLOCK;
                const py = h.y * BLOCK;
                ctx.save();
                ctx.shadowColor = "rgba(255,120,120,0.8)";
                ctx.shadowBlur = 12;
                ctx.fillStyle = "#e74c3c"; // heart red
                ctx.strokeStyle = "#2b2b2b";
                ctx.lineWidth = Math.max(1, BLOCK * 0.06);
                // left lobe
                ctx.beginPath();
                ctx.arc(px + BLOCK*0.32, py + BLOCK*0.28, BLOCK*0.28, 0, Math.PI*2);
                ctx.fill();
                ctx.stroke();
                // right lobe
                ctx.beginPath();
                ctx.arc(px + BLOCK*0.68, py + BLOCK*0.28, BLOCK*0.28, 0, Math.PI*2);
                ctx.fill();
                ctx.stroke();
                // bottom triangle
                ctx.beginPath();
                ctx.moveTo(px + BLOCK*0.18, py + BLOCK*0.48);
                ctx.lineTo(px + BLOCK*0.82, py + BLOCK*0.48);
                ctx.lineTo(px + BLOCK*0.5, py + BLOCK*0.92);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

for (let i = 0; i < 2; i++) addHeart();
            } else {
                // easy: single food, no obstacles
                addFood();
                // spawn at least one heart in easy mode as well
                addHeart();
            }
```