---
layout: base
title: Snake 2.0
permalink: /snake/
---
<head></head>
<body>
<audio id="backgroundMusic" preload="auto" loop>
    <!--
    <source src="{{ site.baseurl }}/navigation/bgm.mp3" type="audio/mpeg">
    Your browser does not support the audio tag.
    -->
</audio>
<audio id="eatFoodSFX" preload="auto">
    <!--
    <source src="{{ site.baseurl }}/navigation/eatFoodSFX.mp3" type="audio/mpeg">
    Your browser does not support the audio tag.
    -->
</audio>
</body>
<style>
    a{
        color: rgb(132, 23, 23);
    }
    body {
        background-color:rgb(30, 30, 30);
    }
    .wrap {
        margin-left: auto;
        margin-right: auto;
    }
    button {
        border-style: solid;
        border-width: 4px;
        border-color: rgb(0, 0, 0);
        background-color: rgb(50, 50, 50);
        color: rgb(255, 255, 255);
        padding: 10px 21px;
        font-size: 15px;
        text-align: center;
        transform: scale(1.0);
        border-radius: 2px;
    }
    button:hover {
        cursor: pointer;
        background-color: rgb(70,70,70);
        transform: scale(1.1);
        border-radius: 6px;
    }
    #color-selector button, #snake-color-selector button {
    margin: 5px;  /* This creates space around all sides of each button */
    /* Keep your existing button styles */
    border-style: solid;
    border-width: 4px;
    border-color: rgb(0, 0, 0);
    background-color: rgb(50, 50, 50);
    color: rgb(255, 255, 255);
    padding: 10px 21px;
    font-size: 15px;
    text-align: center;
    }
    .active-color {
        box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
        background-color: rgb(80, 80, 80) !important;
        border-color: rgb(255, 255, 255) !important;
    }
    canvas {
        display: none;
        border-style: solid;
        border-width: 10px;
    }
    canvas:focus {
        outline: none;
    }
    /* All screens style */
    #gameover p, #setting p, #menu p {
        font-size: 20px;
    }
    #gameover a, #setting a, #menu a {
        font-size: 30px;
        display: block;
    }
    #gameover a:hover, #setting a:hover, #menu a:hover {
        cursor: pointer;
        color: rgb(255, 0, 0);
        box-shadow: 0 0 5px 5px rgba(255, 0, 0, 0.8);
    }
    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before {
        content: "_";
        margin-right: 5px;
        color: rgb(255, 0, 0);
    }
    #menu {
        display: block;
    }
    #gameover {
        display: none;
    }
    #setting {
        display: none;
    }
    #setting input {
        display: none;
    }
    #setting label {
        cursor: pointer;
    }
    #setting input:checked + label {
        background-color: #000000;
        color: rgb(255, 0, 0);
    }
    @keyframes rainbowText {
    0% { color: #FF0000; }
    16.67% { color: #FF7F00; }
    33.33% { color: #FFFF00; }
    50% { color: #00FF00; }
    66.67% { color: #0000FF; }
    83.33% { color: #4B0082; }
    100% { color: #9400D3; }
    }
    .rainbow-text {
        animation: rainbowText 4s linear infinite;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    @keyframes rainbowGlow {
    0% { 
        box-shadow: 0 0 10px 3px rgba(255, 0, 0, 0.8);
        border-color: #FF0000;
    }
    16.67% { 
        box-shadow: 0 0 10px 3px rgba(255, 127, 0, 0.8);
        border-color: #FF7F00;
    }
    33.33% { 
        box-shadow: 0 0 10px 3px rgba(255, 255, 0, 0.8);
        border-color: #FFFF00;
    }
    50% { 
        box-shadow: 0 0 10px 3px rgba(0, 255, 0, 0.8);
        border-color: #00FF00;
    }
    66.67% { 
        box-shadow: 0 0 10px 3px rgba(0, 0, 255, 0.8);
        border-color: #0000FF;
    }
    83.33% { 
        box-shadow: 0 0 10px 3px rgba(75, 0, 130, 0.8);
        border-color: #4B0082;
    }
    100% { 
        box-shadow: 0 0 10px 3px rgba(148, 0, 211, 0.8);
        border-color: #9400D3;
    }
    }
    #secretMessage {
    position: fixed;  /* This takes it out of the normal document flow */
    top: 50%;        /* Position it 50% from the top */
    left: 50%;       /* Position it 50% from the left */
    transform: translate(-50%, -50%);  /* Center it precisely */
    text-align: center;  /* Center the text inside */
    z-index: 1000;   /* Ensure it appears above other elements */
    width: 100%;     /* Make it span the full width for text centering */
    }
    #specialHiddenButton {
        animation: rainbowGlow 4s linear infinite;
        background-color: rgb(100, 100, 100);
        font-weight: bold;
        transform: scale(1.5);
        transition: transform 0.2s;
        margin: 20px auto;  /* Add vertical spacing and center horizontally */
        display: block;     /* Make the button a block element */
    }
    /* Adjust hover effect to maintain centering */
    #specialHiddenButton:hover {
        transform: scale(1.75);
        background-color: rgb(125, 125, 125);
    }
    .music-credit {
    margin-top: 20px;
    opacity: 0.8;  /* Makes it slightly subtle */
    }
    .music-link {
        color: rgb(214, 20, 15);  /* Matches your existing accent color */
        text-decoration: none;  /* Removes default underline */
        transition: all 0.3s ease;  /* Smooth hover effect */
    }
    .music-link:hover {
        color: rgb(255, 0, 0);  /* Brighter red on hover */
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);  /* Adds a subtle glow on hover */
    }
</style>

<h2 style="text-align: center; font-size:250%"><span>Snake 2.0</span></h2>
<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p style="text-align: center; font-size: 150%;" class="fs-4">World Snake Hunger Reduced By: <span style="color:red" id="score_value">0 pounds</span><br>(Score)</p>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Snake 2.0<br></p>
            <a id="new_game" class="link-alert">New Attempt</a>
            <a id="setting_menu" class="link-alert">Settings</a>
        </div>
        <!-- Game Over -->
<div id="gameover" class="py-4 text-light">
    <p>Game Over - Restart by <span style="color: rgb(214, 20, 15)">clicking below</span> or pressing <span style="color: rgb(214, 20, 15)">r</span></p>
    <a id="new_game1" class="link-alert">We Go Again!</a>
    <a id="setting_menu1" class="link-alert">Difficulty Select/Settings</a><br>
    <!--
    <p class="music-credit" style="margin-top: 20px; font-size: 16px;">
        Song: <a href="https://open.spotify.com/track/7l4Tixfyj0npY9ElYTd1e8?si=1f372c21c8f14c2f" target="_blank" class="music-link">Feeling - TURQUOISEDEATH, Dreamstation</a>
    </p>
    -->
</div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="720" height="720" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings <br><span style="color: rgb(214, 20, 15)">Click Start to Return</span>
            <a id="new_game2" class="link-alert">Start</a>
            <br>
            <h1><span style="color: rgb(214,20,15)" font-size="80.0pt">Difficulty Select</span></h1><br>
            <p> 
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Comically Slow</label><br>
                <input id="speed2" type="radio" name="speed" value="100"/>
                <label for="speed2">Boring</label><br>
                <input id="speed3" type="radio" name="speed" value="85"/>
                <label for="speed3">Easy</label><br>
                <input id="speed4" type="radio" name="speed" value="65"/>
                <label for="speed4">Medium</label><br>
                <input id="speed5" type="radio" name="speed" value="50"/>
                <label for="speed5">Challenging</label><br>
                <input id="speed6" type="radio" name="speed" value="20"/>
                <label for="speed6">Do Not</label><br>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label><br>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label><br>
            </p>
            <h1><span style="color: rgb(214,20,15)" font-size="50.0pt">Select Background Color:</span></h1><br>
            <p>
            <div id="color-selector">
            <button data-color="rgb(100, 100, 100)"><span style="color:rgb(150, 150, 150)">Gray</span></button>
            <button data-color="rgb(255, 0, 0)"><span style="color:rgb(255, 0, 0)">Red</span></button>
            <button data-color="rgb(74, 104, 218)"><span style="color:rgb(74, 104, 218)">Blue</span></button>
            <button data-color="rgb(0, 200, 30)"><span style="color:rgb(0, 200, 30)">Green</span></button>
            <button data-color="rgb(232, 170, 0)"><span style="color:rgb(232, 170, 0)">Gold</span></button>
            <button data-color="rgb(170, 20, 230)"><span style="color:rgb(170, 20, 230)">Purple</span></button>
            <button data-color="rgb(0, 0, 0)"><span style="color:rgb(0, 0, 0)">Black</span></button>
            <button data-color="rgb(255, 255, 255)"><span style="color:rgb(255, 255, 255)">White</span></button>
            </div>
            </p>
            <h1><span style="color: rgb(214,20,15)" font-size="50.0pt">Select Snake Color:</span></h1><br>
            <p>
            <div id="snake-color-selector">
            <button class="snake-button" data-color-snake="rgb(200, 200, 200)"><span style="color:rgb(200, 200, 200)">White</span></button>
            <button class="snake-button" data-color-snake="rgb(0, 0, 0)"><span style="color:rgb(0, 0, 0)">Black</span></button>
            <button class="snake-button" data-color-snake="rgb(155, 155, 155)"><span style="color:rgb(155, 155, 155)">Gray</span></button>
            <button class="snake-button" data-color-snake="rgb(0, 0, 255)"><span style="color:rgb(0, 0, 255)">Blue</span></button>
            <button class="snake-button" data-color-snake="rgb(232, 170, 0)"><span style="color:rgb(232, 170, 0)">Gold</span></button>
            <button class="snake-button" data-color-snake="rgb(255, 0, 0)"><span style="color:rgb(255, 0, 0)">Red</span></button>
            <button class="snake-button" data-color-snake="rgb(170, 20, 230)"><span style="color:rgb(170, 20, 230)">Purple</span></button>
            </div>
            </p>
            <p>Sneaky cheat code?
            <div id="secretMessage">
                <span style="color:rgba(0, 0, 0, 0.1)" font-size="1%">.</span>
            </div>
            <button id="specialHiddenButton" style="display: none; "><span style="color:rgb(255, 0, 0)">R</span><span style="color:rgb(255, 136, 0)">a</span><span style="color:rgb(218, 196, 29)">i</span><span style="color:rgb(0, 186, 40)">n</span><span style="color:rgb(0, 89, 255)">b</span><span style="color:rgb(140, 0, 255)">o</span><span style="color:rgb(121, 0, 186)">w</span> Mode</button></p>

<script>
    let codeInputted = false;
    const konamiCode = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    let inputSequence = [];
    window.addEventListener("keydown", (event) => {
        inputSequence.push(event.key);
        if (inputSequence.length > konamiCode.length) {
            inputSequence.shift();
        }
        if (JSON.stringify(inputSequence) === JSON.stringify(konamiCode)) {
            document.getElementById("secretMessage").style.display = "block";
            codeInputted = true;
            document.getElementById("specialHiddenButton").style.display = "block";
        }
    });

    let rainbowEffectEnabled = false;
    document.getElementById("specialHiddenButton").addEventListener("click", function() {
    rainbowEffectEnabled = true;
    
    // Let's target all the text elements we want to make rainbow
    // Main title
    document.querySelector('h2 span').classList.add('rainbow-text');
    
    // Score text
    document.querySelector('.fs-4').classList.add('rainbow-text');
    
    // Menu items (all text in the menu div)
    const menuTexts = document.querySelectorAll('#menu p, #menu a');
    menuTexts.forEach(text => text.classList.add('rainbow-text'));
    
    // Settings text (all text in the settings div)
    const settingsTexts = document.querySelectorAll('#setting p, #setting label, #setting a, #setting h1 span');
    settingsTexts.forEach(text => text.classList.add('rainbow-text'));
    
    // Game over text (all text in the game over div)
    const gameOverTexts = document.querySelectorAll('#gameover p, #gameover a, #gameover span');
    gameOverTexts.forEach(text => text.classList.add('rainbow-text'));

    // Handle the wall effects as before
    if(wall === 1) {
        let currentColor = getCurrentRainbowColor(frameCounter, 0);
        let r = parseInt(currentColor.slice(1, 3), 16);
        let g = parseInt(currentColor.slice(3, 5), 16);
        let b = parseInt(currentColor.slice(5, 7), 16);
        let rgbaColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        
        screen_snake.style.borderColor = currentColor;
        screen_snake.style.boxShadow = `0 0 20px 10px ${rgbaColor}`;
    }
    
    alert("Rainbow mode is now enabled! Disable by reloading the page.");
});
</script>

<script>
    let selectedColorBG = "rgb(100, 100, 100)";  // Keep this line
document.getElementById("color-selector").addEventListener("click", function(event) {
    // Find the closest button, whether we clicked the button itself or a span inside it
    const targetButton = event.target.closest('button');
    
    if (targetButton) {  // Check if we actually found a button
        // Remove active class from all buttons first
        const buttons = this.getElementsByTagName("button");
        for (let btn of buttons) {
            btn.classList.remove("active-color");
        }
        
        // Add active class to the clicked button
        targetButton.classList.add("active-color");
        
        // Update the background color
        selectedColorBG = targetButton.getAttribute("data-color");
        
        // For debugging - helps us track if color updates are happening
        console.log("Selected BG color:", selectedColorBG);
    }
});
let selectedColorSnake = "rgb(200, 200, 200)";
</script>
<script>
    (function(){
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");
        const SCREEN_SNAKE = 0;
        const screen_snake = document.getElementById("snake");
        const ele_score = document.getElementById("score_value");
        const speed_setting = document.getElementsByName("speed");
        const wall_setting = document.getElementsByName("wall");
        const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
        const screen_menu = document.getElementById("menu");
        const screen_game_over = document.getElementById("gameover");
        const screen_setting = document.getElementById("setting");
        const button_new_game = document.getElementById("new_game");
        const button_new_game1 = document.getElementById("new_game1");
        const button_new_game2 = document.getElementById("new_game2");
        const button_setting_menu = document.getElementById("setting_menu");
        const button_setting_menu1 = document.getElementById("setting_menu1");
        const BLOCK = 20;
        let SCREEN = SCREEN_MENU;
        let snake;
        let snake_dir;
        let snake_next_dir;
        let snake_speed;
        let food = [{x: 0, y: 0}, {x: 0, y: 0}];  // Replace the single food object with an array
        let score;
        let wall;
const snakeButtons = document.getElementsByClassName("snake-button");
for (let button of snakeButtons) {
    button.addEventListener("click", function(event) {
        // First, remove active class from all snake buttons
        for (let btn of snakeButtons) {
            btn.classList.remove("active-color");
        }
        
        // Get the actual button element, even if we clicked the span inside it
        const targetButton = event.target.closest('button');
        if (targetButton) {
            targetButton.classList.add("active-color");
            selectedColorSnake = targetButton.getAttribute("data-color-snake");
            
            if (wall === 1) {
                updateWallAppearance();
            }
        }
    });
}

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
                    break;
                case SCREEN_SETTING:
                    screen_snake.style.display = "none";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "block";
                    screen_game_over.style.display = "none";
                    break;
            }
        }

        let getCurrentRainbowColor = function(frameCount, offset = 0) {
            let colorIndex = (frameCount + offset) % rainbowColors.length;
            return rainbowColors[colorIndex];
        };

        let backgroundMusic = document.getElementById("backgroundMusic");
        let eatFoodSound = document.getElementById("eatFoodSFX");  // Add this line

        let playEatSound = function() {
            eatFoodSound.currentTime = 0;  // Reset the sound in case it's already playing
            eatFoodSound.play().catch(function(error) {
                console.error("Eat sound effect failed to play:", error);
            });
        };

        let playBackgroundMusic = function() {
            console.log("Attempting to play audio from:", backgroundMusic.querySelector('source').src);
            backgroundMusic.play().catch(function(error) {
                console.error("Audio playback failed:", error);
                console.log("Current page URL:", window.location.href);
                console.log("Audio element status:", backgroundMusic.readyState);
            });
        };

        let stopBackgroundMusic = function() {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        };

        button_new_game.onclick = function() {
            playBackgroundMusic();
            newGame();
        };
        button_new_game1.onclick = function() {
            playBackgroundMusic();
            newGame();
        };
        button_new_game2.onclick = function() {
            playBackgroundMusic();
            newGame();
        };

        button_setting_menu.onclick = function(){
            stopBackgroundMusic();
            showScreen(SCREEN_SETTING);
        };
        button_setting_menu1.onclick = function(){
            stopBackgroundMusic();
            showScreen(SCREEN_SETTING);
        };

        document.addEventListener("keydown", function(event) {
    // Existing key prevention code
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.key)) {
        event.preventDefault();
    }
    // Add restart functionality
    if (event.key.toLowerCase() === 'r' && SCREEN === SCREEN_GAME_OVER) {
        playBackgroundMusic();
        newGame();
    }
});

        window.onload = function(){
            button_new_game.onclick = function(){newGame();};
            button_new_game1.onclick = function(){newGame();};
            button_new_game2.onclick = function(){newGame();};
            button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
            button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};
            
            setSnakeSpeed(150);
            for(let i = 0; i < speed_setting.length; i++){
                speed_setting[i].addEventListener("click", function(){
                    for(let i = 0; i < speed_setting.length; i++){
                        if(speed_setting[i].checked){
                            setSnakeSpeed(speed_setting[i].value);
                        }
                    }
                });
            }

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

            window.addEventListener("keydown", function(evt) {
                if(evt.code === "Space" && SCREEN !== SCREEN_SNAKE)
                    newGame();
            }, true);

            backgroundMusic.volume = 0.5;
            
            backgroundMusic.addEventListener('error', function(e) {
                console.error('Error loading audio:', e);
            });

            backgroundMusic.addEventListener('canplaythrough', function() {
                console.log('Audio loaded successfully');
            });

            // Set initial active color buttons
            const defaultBgButton = document.querySelector('#color-selector button[data-color="rgb(100, 100, 100)"]');
            if (defaultBgButton) {
                defaultBgButton.classList.add("active-color");
            }

            const defaultSnakeButton = document.querySelector('.snake-button[data-color-snake="rgb(200, 200, 200)"]');
            if (defaultSnakeButton) {
                defaultSnakeButton.classList.add("active-color");
            }
        };

        let mainLoop = function(){
            let _x = snake[0].x;
            let _y = snake[0].y;
            snake_dir = snake_next_dir;

            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }
            snake.pop();
            snake.unshift({x: _x, y: _y});

            if(wall === 1){
                if (snake[0].x < 0 || snake[0].x === canvas.width / BLOCK || 
                    snake[0].y < 0 || snake[0].y === canvas.height / BLOCK){
                    stopBackgroundMusic();
                    showScreen(SCREEN_GAME_OVER);
                    return;
                }
            } else {
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

            for(let i = 1; i < snake.length; i++){
                if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                    stopBackgroundMusic();
                    showScreen(SCREEN_GAME_OVER);
                    return;
                }
            }

            // Replace the existing food check in mainLoop with this
            for(let i = 0; i < food.length; i++) {
                if(checkBlock(snake[0].x, snake[0].y, food[i].x, food[i].y)){
                    snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                    altScore(++score);
                    playEatSound();
                    addFood(i);  // Only respawn the eaten food
                }
            }

            ctx.beginPath();
            ctx.fillStyle = selectedColorBG;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if(rainbowEffectEnabled && wall === 1) {
                let currentColor = getCurrentRainbowColor(frameCounter, 0);
                let r = parseInt(currentColor.slice(1, 3), 16);
                let g = parseInt(currentColor.slice(3, 5), 16);
                let b = parseInt(currentColor.slice(5, 7), 16);
                let rgbaColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
                
                screen_snake.style.borderColor = currentColor;
                screen_snake.style.boxShadow = `0 0 20px 10px ${rgbaColor}`;
            }

            // Update the food rendering part
            // Replace the single food activeDot call with this
            // Paint snake
            for(let i = 0; i < snake.length; i++) {
                activeDot(snake[i].x, snake[i].y, i);
            }

            // Render both food items
            for(let i = 0; i < food.length; i++) {
                activeDot(food[i].x, food[i].y);
            }

            frameCounter++;
            setTimeout(mainLoop, snake_speed);
        };

        let newGame = function(){
            showScreen(SCREEN_SNAKE);
            screen_snake.focus();
            score = 0;
            altScore(score);
            snake = [];
            snake.push({x: 0, y: 15});
            snake_next_dir = 1;
            addFood(0);
            addFood(1);
            playBackgroundMusic();
            canvas.onkeydown = function(evt) {
                changeDir(evt.keyCode);
            }
            mainLoop();
        };

        let changeDir = function(key){
            switch(key) {
                case 37:
                    if (snake_dir !== 1)
                        snake_next_dir = 3;
                    break;
                case 38:
                    if (snake_dir !== 2)
                        snake_next_dir = 0;
                    break;
                case 39:
                    if (snake_dir !== 3)
                        snake_next_dir = 1;
                    break;
                case 40:
                    if (snake_dir !== 0)
                        snake_next_dir = 2;
                    break;
            }
        };

        let rainbowColors = [
            "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"
        ];

        let frameCounter = 0;

        let activeDot = function(x, y, segmentIndex) {
    // When segmentIndex is undefined, we're drawing food
    if (segmentIndex === undefined) {
        if (rainbowEffectEnabled) {
            // In rainbow mode, food matches the current rainbow color
            let currentColor = getCurrentRainbowColor(frameCounter, 0);
            ctx.fillStyle = currentColor;
            ctx.shadowBlur = 20;
            ctx.shadowColor = currentColor;
        } else {
            // In normal mode, food matches the snake's color exactly
            ctx.fillStyle = selectedColorSnake;
            ctx.shadowBlur = 15;
            ctx.shadowColor = selectedColorSnake;
        }
    } else if (rainbowEffectEnabled) {
        // Rainbow mode snake segments
        let currentColor = getCurrentRainbowColor(frameCounter, segmentIndex);
        ctx.fillStyle = currentColor;
        ctx.shadowBlur = 15;
        ctx.shadowColor = currentColor;
    } else {
        // Normal snake color
        ctx.fillStyle = selectedColorSnake;
        ctx.shadowBlur = 15;
        ctx.shadowColor = selectedColorSnake;
    }
    ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
};

       let addFood = function(foodIndex){
        food[foodIndex].x = Math.floor(Math.random() * ((canvas.width / BLOCK) - 1));
        food[foodIndex].y = Math.floor(Math.random() * ((canvas.height / BLOCK) - 1));
        
        // Check collision with snake
        for(let i = 0; i < snake.length; i++){
            if(checkBlock(food[foodIndex].x, food[foodIndex].y, snake[i].x, snake[i].y)){
                addFood(foodIndex);
                return;
            }
        }
        
        // Check collision with other food
        const otherFoodIndex = foodIndex === 0 ? 1 : 0;
        if(checkBlock(food[foodIndex].x, food[foodIndex].y, food[otherFoodIndex].x, food[otherFoodIndex].y)){
            addFood(foodIndex);
            return;
        }
    };

        let checkBlock = function(x, y, _x, _y){
            return (x === _x && y === _y);
        };

        let altScore = function(score_val){
            ele_score.innerHTML = String(score_val);
        };

        let setSnakeSpeed = function(speed_value){
            snake_speed = speed_value;
        };
// Helper function to update wall styles - add this before setWall
let updateWallStyle = function() {
    if(wall === 1) {
        if(rainbowEffectEnabled) {
            // Let mainLoop handle rainbow mode
            return;
        }
        
        // First, ensure we have the correct snake color
        console.log("Current snake color:", selectedColorSnake); // For debugging
        
        // Set the border to exactly match the snake color
        screen_snake.style.borderColor = selectedColorSnake;
        
        // Create the glow effect using the same color but with transparency
        // We need to parse the RGB values carefully to ensure exact color matching
        let rgbMatch = selectedColorSnake.match(/\d+/g);
        if (rgbMatch) {
            let r = parseInt(rgbMatch[0]);
            let g = parseInt(rgbMatch[1]);
            let b = parseInt(rgbMatch[2]);
            let rgbaColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
            screen_snake.style.boxShadow = `0 0 20px 10px ${rgbaColor}`;
            console.log("Created glow color:", rgbaColor); // For debugging
        }
    } else {
        screen_snake.style.borderColor = "#606060";
        screen_snake.style.boxShadow = "none";
    }
};

let updateWallAppearance = function() {
    if (wall === 1) {
        if (rainbowEffectEnabled) {
            // Rainbow mode is handled in mainLoop
            return;
        }
        // Directly use the snake's color for the border
        screen_snake.style.borderColor = selectedColorSnake;
        // Create a semi-transparent version for the glow
        let rgbaColor = selectedColorSnake.replace('rgb', 'rgba').replace(')', ', 0.8)');
        screen_snake.style.boxShadow = `0 0 20px 10px ${rgbaColor}`;
    } else {
        // Wall off appearance
        screen_snake.style.borderColor = "#606060";
        screen_snake.style.boxShadow = "none";
    }
};
let setWall = function(wall_value) {
    wall = wall_value;
    updateWallAppearance();
};
    })();
</script>