---
layout: opencs
title: Snake Game
permalink: /snake
---

<style>

    body{
    }
    .wrap{
        margin-left: auto;
        margin-right: auto;
    }

    canvas{
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: #6c9bd0;
        background-color: #72d38d; /* Added background color */
    }
    canvas:focus{
        outline: none;
    }

    /* All screens style */
    #gameover p, #setting p, #menu p{
        font-size: 20px;
    }

    #gameover a, #setting a, #menu a{
        font-size: 30px;
        display: block;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover{
        cursor: pointer;
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
        content: ">";
        margin-right: 10px;
    }

    #menu{
        display: block;
    }

    #gameover{
        display: none;
    }

    #setting{
        display: none;
    }

    #setting input{
        display:none;
    }

    #setting label{
        cursor: pointer;
    }

    #setting input:checked + label{
        background-color: #FFF;
        color: #000;
    }

    /* Center and style the score */
    #score_container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        width: 100%; /* Ensure full width for centering */
    }
    #score_value {
        background: rgba(255,255,255,0.7);
        color: #2e6e4d;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 8px;
        padding: 4px 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        text-align: center;
        min-width: 60px;
        user-select: none;
    }
    /* soft glow for score */
    #score_value {
        text-shadow: 0 0 8px rgba(114, 211, 141, 0.8);
    }

    /* Speed display: centered above the score */
    #speed_display {
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 8px;
        background: rgba(255,255,255,0.8);
        color: #2e6e4d;
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: 600;
        user-select: none;
    }
</style>

<h2>Snake</h2>
<div class="container">
    <div id="speed_display">Speed: --</div>
    <div id="score_container">
        <span id="score_value">0</span>
    </div>
    <div id="lives_container" style="display:flex;justify-content:center;margin-bottom:8px;">
        <span id="lives_value" style="background:rgba(255,255,255,0.7);color:#2e6e4d;font-size:1.2rem;padding:4px 12px;border-radius:6px;">Lives: 3</span>
    </div>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="setting_menu1" class="link-alert">settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">new game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="150" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="100"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="50"/>
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>
            <p>Difficulty:
                <input id="diff_easy" type="radio" name="difficulty" value="easy" checked/>
                <label for="diff_easy">Easy</label>
                <input id="diff_hard" type="radio" name="difficulty" value="hard"/>
                <label for="diff_hard">Hard</label>
            </p>
        </div>
    </div>
</div>

<script>
    (function(){
    /* Attributes of Game */
    /////////////////////////////////////////////////////////////

    // Canvas & Context
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");
        // HTML Game IDs
        const SCREEN_SNAKE = 0;
        const screen_snake = document.getElementById("snake");
        const ele_speed = document.getElementById("speed_display");
        const ele_score = document.getElementById("score_value");
        const speed_setting = document.getElementsByName("speed");
    const difficulty_setting = document.getElementsByName("difficulty");
        const wall_setting = document.getElementsByName("wall");
        // HTML Screen IDs (div)
        const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
        const screen_menu = document.getElementById("menu");
        const screen_game_over = document.getElementById("gameover");
        const screen_setting = document.getElementById("setting");
        // HTML Event IDs (a tags)
        const button_new_game = document.getElementById("new_game");
        const button_new_game1 = document.getElementById("new_game1");
        const button_new_game2 = document.getElementById("new_game2");
        const button_setting_menu = document.getElementById("setting_menu");
        const button_setting_menu1 = document.getElementById("setting_menu1");
        // Game Control
        const BLOCK = 20;   // Changed from 10 -> 20
        let SCREEN = SCREEN_MENU;
        let snake;
        let snake_dir;
    let snake_next_dir;
    let snake_speed;
    let DEFAULT_SNAKE_SPEED;
    // change food into an array so multiple foods can be present
    let foods = [];
    // obstacles on the board
    let obstacles = [];
    // hearts that give extra life
    let hearts = [];
    // lives for the snake
    let lives = 3;
        let score;
        let wall;
        /* Display Control */
        /////////////////////////////////////////////////////////////
        // 0 for the game
        // 1 for the main menu
        // 2 for the settings screen
        // 3 for the game over screen
        let showScreen = function(screen_opt){
            SCREEN = screen_opt;
            switch(screen_opt){
                case SCREEN_SNAKE:
                    screen_snake.style.display = "block";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_game_over.style.display = "none";
                    break;
                case SCREEN_GAME_OVER:
                    screen_snake.style.display = "block";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_game_over.style.display = "block";
                    // Reset snake speed back to the default starting speed when game ends
                    try {
                        if (typeof DEFAULT_SNAKE_SPEED !== 'undefined') {
                            setSnakeSpeed(DEFAULT_SNAKE_SPEED);
                        }
                    } catch (e) {
                        // safe fallback: do nothing
                    }
                    break;
                case SCREEN_SETTING:
                    screen_snake.style.display = "none";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "block";
                    screen_game_over.style.display = "none";
                    break;
            }
        }
        /* Actions and Events  */
        /////////////////////////////////////////////////////////////
        window.onload = function(){
            // HTML Events to Functions
            button_new_game.onclick = function(){newGame();};
            button_new_game1.onclick = function(){newGame();};
            button_new_game2.onclick = function(){newGame();};
            button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
            button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};
            // speed
            setSnakeSpeed(150); //Changed speed to 75 from 150
            // record default starting speed so we can reset when the game ends
            try { DEFAULT_SNAKE_SPEED = Number(snake_speed); } catch (e) {}
            for(let i = 0; i < speed_setting.length; i++){
                speed_setting[i].addEventListener("click", function(){
                    for(let i = 0; i < speed_setting.length; i++){
                        if(speed_setting[i].checked){
                            setSnakeSpeed(speed_setting[i].value);
                        }
                    }
                });
            }
            // difficulty
            for(let i = 0; i < difficulty_setting.length; i++){
                difficulty_setting[i].addEventListener("click", function(){
                    // nothing immediate - newGame will read the current difficulty when starting
                });
            }
            // wall setting
            setWall(1);
            for(let i = 0; i < wall_setting.length; i++){
                wall_setting[i].addEventListener("click", function(){
                    for(let i = 0; i < wall_setting.length; i++){
                        if(wall_setting[i].checked){
                            setWall(wall_setting[i].value);
                        }
                    }
                });
            }
            // activate window events
            window.addEventListener("keydown", function(evt) {
                // spacebar detected to start
                if(evt.code === "Space" && SCREEN !== SCREEN_SNAKE) {
                    newGame();
                    return;
                }
                // allow WASD keys from anywhere to change direction during play
                if (SCREEN === SCREEN_SNAKE) {
                    // prefer 'key' where available
                    const k = evt.key || evt.keyCode;
                    changeDir(k);
                }
            }, true);
        }
        /* Snake is on the Go (Driver Function)  */
        /////////////////////////////////////////////////////////////
        let mainLoop = function(){
            let _x = snake[0].x;
            let _y = snake[0].y;
            snake_dir = snake_next_dir;   // read async event key
            // Direction 0 - Up, 1 - Right, 2 - Down, 3 - Left
            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }
            snake.pop(); // tail is removed
            snake.unshift({x: _x, y: _y}); // head is new in new position/orientation
            // Wall Checker
            if(Number(wall) === 1){
                // Wall on, hit wall -> lose a life (consistent with other collisions)
                if (snake[0].x < 0 || snake[0].x === canvas.width / BLOCK || snake[0].y < 0 || snake[0].y === canvas.height / BLOCK){
                    lives -= 1;
                    updateLivesUI();
                    if (lives <= 0) { showScreen(SCREEN_GAME_OVER); return; }
                    respawnAfterHit();
                    return;
                }
            } else {
                // Wall Off, Circle around
                for(let i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / BLOCK);
                    }
                    if(snake[i].x === canvas.width / BLOCK){
                        snake[i].x = snake[i].x - (canvas.width / BLOCK);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / BLOCK);
                    }
                    if(snake[i].y === canvas.height / BLOCK){
                        snake[i].y = snake[i].y - (canvas.height / BLOCK);
                    }
                }
            }
            // Snake vs Snake checker
            for(let i = 1; i < snake.length; i++){
                // Game over test
                if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                    // collision with self: lose a life or end game
                    lives -= 1;
                    updateLivesUI();
                    if (lives <= 0) { showScreen(SCREEN_GAME_OVER); return; }
                    respawnAfterHit();
                    return;
                }
            }
            // Snake eats any food present
            for (let fi = 0; fi < foods.length; fi++) {
                const f = foods[fi];
                if (checkBlock(snake[0].x, snake[0].y, f.x, f.y)) {
                    // grow
                    snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                    // Add sound effect (short beep) when food is eaten (uses Web Audio API)
                    try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        oscillator.frequency.value = 800; // High pitch beep
                        oscillator.type = 'sine';
                        oscillator.connect(audioContext.destination);
                        oscillator.start();
                        oscillator.stop(audioContext.currentTime + 0.1); // Short beep (~100ms)
                    } catch (e) { /* ignore if audio not supported */ }
                    // Award points
                    const points = (f.special ? 3 : 1);
                    const prevScore = score;
                    score += points;
                    altScore(score);
                    // If score crossed a multiple of 10, spawn a heart
                    try {
                        if (Math.floor(prevScore / 10) !== Math.floor(score / 10) && score > 0 && score % 10 === 0) {
                            addHeart();
                        }
                    } catch (e) { console.error('Heart spawn on score error:', e); }
                    // speed bonus every 5 points
                    try {
                        const MIN_SPEED = 20;
                        const SPEED_DECREMENT = 10;
                        if (score % 5 === 0) {
                            const newSpeed = Math.max(MIN_SPEED, Number(snake_speed) - SPEED_DECREMENT);
                            setSnakeSpeed(newSpeed);
                        }
                    } catch (e) { console.error('Speed bonus error:', e); }
                    // remove eaten food
                    foods.splice(fi, 1);
                    // spawn another food to keep count
                    addFood();
                    break;
                }
            }
            // Snake collects hearts
            for (let hi = 0; hi < hearts.length; hi++) {
                const h = hearts[hi];
                if (checkBlock(snake[0].x, snake[0].y, h.x, h.y)) {
                    // gain a life
                    lives += 1;
                    updateLivesUI();
                    // remove heart
                    hearts.splice(hi, 1);
                    try { console.log('Heart collected. Lives now', lives); } catch(e){}
                    // small bonus: add a food to keep game lively
                    addFood();
                    break;
                }
            }
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
            // Repaint canvas
            ctx.beginPath();
            ctx.fillStyle = "#72d38d"; // Changed background color
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Paint snake with a soft glow
            ctx.save();
            ctx.shadowColor = "rgba(255,255,255,0.6)";
            ctx.shadowBlur = 8;
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
                    ctx.shadowColor = "rgba(255,215,0,0.9)";
                    ctx.shadowBlur = 12;
                    ctx.fillStyle = "#ffd700";
                } else {
                    ctx.shadowColor = "rgba(255,114,114,0.6)";
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
                ctx.shadowColor = "rgba(0,0,0,0.4)";
                ctx.shadowBlur = 6;
                ctx.fillStyle = "#4b4b4b"; // dark grey
                ctx.fillRect(ob.x * BLOCK, ob.y * BLOCK, BLOCK, BLOCK);
                ctx.restore();
            }
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
            }
            // Debug
            //document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;
            // Recursive call after speed delay, déjà vu
            setTimeout(mainLoop, snake_speed);
        }
        /* New Game setup */
        /////////////////////////////////////////////////////////////
        let newGame = function(){
            // snake game screen
            showScreen(SCREEN_SNAKE);
            screen_snake.focus();
            // game score to zero
            score = 0;
            altScore(score);
            // determine difficulty and configure defaults
            let difficulty = 'easy';
            try {
                for (let i = 0; i < difficulty_setting.length; i++) {
                    if (difficulty_setting[i].checked) { difficulty = difficulty_setting[i].value; break; }
                }
            } catch (e) { /* default to easy */ }
            if (difficulty === 'hard'){
                lives = 3;
            } else {
                // easy mode: base game, single life
                lives = 1;
            }
            updateLivesUI();
            // apply currently selected speed setting when a new game starts
            try {
                for (let i = 0; i < speed_setting.length; i++) {
                    if (speed_setting[i].checked) {
                        setSnakeSpeed(Number(speed_setting[i].value));
                        break;
                    }
                }
            } catch (e) {
                // ignore and keep existing snake_speed if any
            }
            // initial snake
            snake = [];
            snake.push({x: 0, y: 15});
            // make the snake start a bit longer by addong two more pieces behind the head
            for (let i = 1; i <= 2; i++) {
                snake.push({ x: 0 - i, y: 15 });
            }
            snake_next_dir = 1;
            // clear foods, obstacles, and hearts and add based on difficulty
            foods = [];
            obstacles = [];
            hearts = [];
            // spawn base content regardless of difficulty
            if (difficulty === 'hard'){
                // multiple foods and obstacles on hard
                for (let i = 0; i < 3; i++) addFood();
                for (let i = 0; i < 4; i++) addObstacle();
                // spawn a couple of hearts on hard mode
                for (let i = 0; i < 2; i++) addHeart();
            } else {
                // easy: single food, no obstacles
                addFood();
                // spawn at least one heart in easy mode as well
                addHeart();
            }
            // activate canvas event
            canvas.onkeydown = function(evt) {
                // allow both keyCode (numeric) and key (string like 'w')
                changeDir(evt.key || evt.keyCode);
            }
            mainLoop();
        }
        /* Key Inputs and Actions */
        /////////////////////////////////////////////////////////////
        let changeDir = function(key){
            // accept both keyCode numbers and key strings (arrows and WASD)
            const k = (typeof key === 'number') ? key : String(key).toLowerCase();
            switch(k) {
                case 37: // left arrow
                case 'arrowleft':
                case 'a':
                    if (snake_dir !== 1) snake_next_dir = 3; // left
                    break;
                case 38: // up arrow
                case 'arrowup':
                case 'w':
                    if (snake_dir !== 2) snake_next_dir = 0; // up
                    break;
                case 39: // right arrow
                case 'arrowright':
                case 'd':
                    if (snake_dir !== 3) snake_next_dir = 1; // right
                    break;
                case 40: // down arrow
                case 'arrowdown':
                case 's':
                    if (snake_dir !== 0) snake_next_dir = 2; // down
                    break;
            }
        }
        /* Dot for Food or Snake part */
        /////////////////////////////////////////////////////////////
        let activeDot = function(x, y){
            // generic helper to draw a white snake block (kept for compatibility)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        }
        /* Random food placement */
        /////////////////////////////////////////////////////////////
        let addFood = function(){
            // generate a food at a random free cell (not on snake, not on obstacles, not on other foods)
            const maxX = canvas.width / BLOCK;
            const maxY = canvas.height / BLOCK;
            const tryPlace = function(){
                const fx = Math.floor(Math.random() * (maxX - 1));
                const fy = Math.floor(Math.random() * (maxY - 1));
                // check conflicts
                for(let i = 0; i < snake.length; i++) if(checkBlock(fx, fy, snake[i].x, snake[i].y)) return null;
                for(let i = 0; i < foods.length; i++) if(checkBlock(fx, fy, foods[i].x, foods[i].y)) return null;
                for(let i = 0; i < obstacles.length; i++) if(checkBlock(fx, fy, obstacles[i].x, obstacles[i].y)) return null;
                return {x: fx, y: fy};
            }
            let pos = tryPlace();
            let attempts = 0;
            while(!pos && attempts < 50){ pos = tryPlace(); attempts++; }
            if(!pos) return; // give up if crowded
            const special = (score > 0 && score % 7 === 0);
            foods.push({x: pos.x, y: pos.y, special: special});
        }

        let addHeart = function(){
            const maxX = canvas.width / BLOCK;
            const maxY = canvas.height / BLOCK;
            const tryPlace = function(){
                // allow full grid range (0 .. max-1)
                const hx = Math.floor(Math.random() * (maxX));
                const hy = Math.floor(Math.random() * (maxY));
                // check conflicts
                for(let i = 0; i < snake.length; i++) if(checkBlock(hx, hy, snake[i].x, snake[i].y)) return null;
                for(let i = 0; i < foods.length; i++) if(checkBlock(hx, hy, foods[i].x, foods[i].y)) return null;
                for(let i = 0; i < obstacles.length; i++) if(checkBlock(hx, hy, obstacles[i].x, obstacles[i].y)) return null;
                for(let i = 0; i < hearts.length; i++) if(checkBlock(hx, hy, hearts[i].x, hearts[i].y)) return null;
                return {x: hx, y: hy};
            }
            let pos = tryPlace();
            let attempts = 0;
            while(!pos && attempts < 50){ pos = tryPlace(); attempts++; }
            if(!pos) return; // give up if crowded
            hearts.push({x: pos.x, y: pos.y});
            try { console.log('Heart spawned at', pos.x, pos.y); } catch(e){}
            // show a brief on-screen message to help debugging (creates element if missing)
            try {
                let m = document.getElementById('heart_debug_msg');
                if (!m) {
                    m = document.createElement('div');
                    m.id = 'heart_debug_msg';
                    m.style.position = 'fixed';
                    m.style.left = '10px';
                    m.style.top = '10px';
                    m.style.padding = '6px 10px';
                    m.style.background = 'rgba(0,0,0,0.6)';
                    m.style.color = '#fff';
                    m.style.zIndex = 9999;
                    m.style.borderRadius = '6px';
                    document.body.appendChild(m);
                }
                m.innerText = 'Heart spawned at: ' + pos.x + ',' + pos.y;
                m.style.display = 'block';
                setTimeout(function(){ if(m) m.style.display = 'none'; }, 2000);
            } catch(e){}
        }

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
        /* Collision Detection */
        /////////////////////////////////////////////////////////////
        let checkBlock = function(x, y, _x, _y){
            return (x === _x && y === _y);
        }
        
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
        /* Update Score */
        /////////////////////////////////////////////////////////////
        let altScore = function(score_val){
            try { console.log('Score updated to', score_val); } catch(e){}
            ele_score.innerHTML = String(score_val);
        }
        /////////////////////////////////////////////////////////////
        // Change the snake speed...
        // 150 = slow
        // 100 = normal
        // 50 = fast
        let setSnakeSpeed = function(speed_value){
            snake_speed = Number(speed_value);
            try {
                if (ele_speed) ele_speed.innerText = "Speed: " + String(snake_speed);
            } catch (e) {}
        }
        /////////////////////////////////////////////////////////////
        let setWall = function(wall_value){
            wall = wall_value;
            // Always use #6c9bd0 for border color
            screen_snake.style.borderColor = "#6c9bd0";
        }
    })();
</script>

<!-- Link to a full guide on all the changes -->
For a full guide on all the changes, go here: https://jupiterian.github.io/student/2025/09/17/Siddharth-Hota-and-Dhruv-Agrawal-Snake-Hacks-Blog.html


