---
layout: post
title: 🏓 Complete Pong Game Code Implementation
description: Complete HTML, CSS, and JavaScript code for building a fully functional Pong game with advanced features
categories: ['Game Development', 'JavaScript', 'Canvas API', 'Code Implementation']
permalink: /jupyter/notebook/python
menu: nav/tools_setup.html
toc: True
comments: True
---

# 🏓 Complete Pong Game Code Implementation

This file contains the complete code for building a fully functional Pong game with HTML, CSS, and JavaScript.

## 📁 File Structure

```
pong-game/
├── index.html          # Main HTML file
├── style.css           # Game styling
└── script.js           # Game logic
```

---

## 🌐 HTML Structure (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏓 Ultimate Pong Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <!-- Game Header -->
        <div class="game-header">
            <h1>🏓 Ultimate Pong Game</h1>
            <div class="score-display">
                <div class="player-score">
                    <span class="player-label">Player 1</span>
                    <span class="score" id="player1Score">0</span>
                </div>
                <div class="vs">VS</div>
                <div class="player-score">
                    <span class="player-label">Player 2</span>
                    <span class="score" id="player2Score">0</span>
                </div>
            </div>
        </div>

        <!-- Game Canvas -->
        <div class="game-canvas-container">
            <canvas id="gameCanvas" width="800" height="400"></canvas>
            <div class="game-overlay" id="gameOverlay">
                <div class="game-message" id="gameMessage">
                    <h2>Press SPACE to Start</h2>
                    <p>Use W/S for Player 1, Arrow Keys for Player 2</p>
                </div>
            </div>
        </div>

        <!-- Game Controls -->
        <div class="game-controls">
            <div class="control-group">
                <h3>🎮 Controls</h3>
                <div class="controls-grid">
                    <div class="control-item">
                        <span class="key">W / S</span>
                        <span class="action">Player 1</span>
                    </div>
                    <div class="control-item">
                        <span class="key">↑ / ↓</span>
                        <span class="action">Player 2</span>
                    </div>
                    <div class="control-item">
                        <span class="key">SPACE</span>
                        <span class="action">Start/Pause</span>
                    </div>
                    <div class="control-item">
                        <span class="key">R</span>
                        <span class="action">Reset</span>
                    </div>
                </div>
            </div>
            
            <div class="game-settings">
                <h3>⚙️ Settings</h3>
                <div class="setting-item">
                    <label for="gameSpeed">Game Speed:</label>
                    <input type="range" id="gameSpeed" min="1" max="10" value="5">
                    <span id="speedValue">5</span>
                </div>
                <div class="setting-item">
                    <label for="ballSize">Ball Size:</label>
                    <input type="range" id="ballSize" min="5" max="20" value="10">
                    <span id="sizeValue">10</span>
                </div>
            </div>
        </div>

        <!-- Game Stats -->
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Ball Speed:</span>
                <span class="stat-value" id="currentSpeed">5</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Rally Count:</span>
                <span class="stat-value" id="rallyCount">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Game Time:</span>
                <span class="stat-value" id="gameTime">00:00</span>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

## 🎨 CSS Styling (style.css)

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Rajdhani', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    overflow-x: hidden;
}

/* Game Container */
.game-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 900px;
    width: 100%;
}

/* Game Header */
.game-header {
    text-align: center;
    margin-bottom: 2rem;
}

.game-header h1 {
    font-family: 'Orbitron', monospace;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.score-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem 2rem;
    border-radius: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.player-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.player-label {
    font-size: 1rem;
    font-weight: 600;
    opacity: 0.8;
}

.score {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #f1c40f;
    text-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
}

.vs {
    font-family: 'Orbitron', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: #e74c3c;
    text-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
}

/* Game Canvas */
.game-canvas-container {
    position: relative;
    background: #000;
    border-radius: 15px;
    padding: 20px;
    margin: 2rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 3px solid rgba(255, 255, 255, 0.2);
}

#gameCanvas {
    display: block;
    border-radius: 10px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.game-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: opacity 0.3s ease;
}

.game-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.game-message {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.game-message h2 {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #f1c40f;
}

.game-message p {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Game Controls */
.game-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
}

.control-group, .game-settings {
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.control-group h3, .game-settings h3 {
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #f1c40f;
}

.controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.key {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    background: #e74c3c;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
}

.action {
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Settings */
.setting-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.setting-item label {
    min-width: 100px;
    font-weight: 600;
}

.setting-item input[type="range"] {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
}

.setting-item input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #f1c40f;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
}

.setting-item span {
    min-width: 30px;
    text-align: center;
    font-weight: 700;
    color: #f1c40f;
}

/* Game Stats */
.game-stats {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
}

.stat-value {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    color: #f1c40f;
    font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .game-container {
        margin: 1rem;
        padding: 1rem;
    }
    
    .game-header h1 {
        font-size: 2rem;
    }
    
    .score-display {
        gap: 1rem;
        padding: 0.5rem 1rem;
    }
    
    .score {
        font-size: 1.5rem;
    }
    
    #gameCanvas {
        width: 100%;
        height: auto;
    }
    
    .game-controls {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .controls-grid {
        grid-template-columns: 1fr;
    }
    
    .game-stats {
        flex-direction: column;
        gap: 1rem;
    }
}
```

---

## ⚡ JavaScript Game Logic (script.js)

```javascript
// Game Configuration
const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400,
    PADDLE_WIDTH: 15,
    PADDLE_HEIGHT: 80,
    PADDLE_SPEED: 5,
    BALL_SIZE: 10,
    BALL_SPEED: 5,
    WINNING_SCORE: 11
};

// Game State
let gameState = {
    isRunning: false,
    isPaused: false,
    gameStartTime: null,
    rallyCount: 0,
    lastHitTime: null
};

// Game Objects
let canvas, ctx;
let player1, player2, ball;
let keys = {};

// Initialize Game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = CONFIG.CANVAS_WIDTH;
    canvas.height = CONFIG.CANVAS_HEIGHT;
    
    // Initialize game objects
    initGameObjects();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup settings
    setupSettings();
    
    // Start game loop
    gameLoop();
}

// Initialize Game Objects
function initGameObjects() {
    // Player 1 (Left paddle)
    player1 = {
        x: 20,
        y: CONFIG.CANVAS_HEIGHT / 2 - CONFIG.PADDLE_HEIGHT / 2,
        width: CONFIG.PADDLE_WIDTH,
        height: CONFIG.PADDLE_HEIGHT,
        speed: CONFIG.PADDLE_SPEED,
        score: 0,
        color: '#3498db'
    };
    
    // Player 2 (Right paddle)
    player2 = {
        x: CONFIG.CANVAS_WIDTH - 20 - CONFIG.PADDLE_WIDTH,
        y: CONFIG.CANVAS_HEIGHT / 2 - CONFIG.PADDLE_HEIGHT / 2,
        width: CONFIG.PADDLE_WIDTH,
        height: CONFIG.PADDLE_HEIGHT,
        speed: CONFIG.PADDLE_SPEED,
        score: 0,
        color: '#e74c3c'
    };
    
    // Ball
    resetBall();
}

// Reset Ball
function resetBall() {
    ball = {
        x: CONFIG.CANVAS_WIDTH / 2,
        y: CONFIG.CANVAS_HEIGHT / 2,
        size: CONFIG.BALL_SIZE,
        speedX: (Math.random() > 0.5 ? 1 : -1) * CONFIG.BALL_SPEED,
        speedY: (Math.random() - 0.5) * CONFIG.BALL_SPEED,
        color: '#f1c40f',
        trail: []
    };
    gameState.rallyCount = 0;
    gameState.lastHitTime = Date.now();
}

// Setup Event Listeners
function setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        
        // Game control keys
        if (e.code === 'Space') {
            e.preventDefault();
            toggleGame();
        }
        if (e.code === 'KeyR') {
            resetGame();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
}

// Handle Touch Events
function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchY = touch.clientY - rect.top;
    
    if (touch.clientX < rect.width / 2) {
        // Left side - Player 1
        player1.y = touchY - player1.height / 2;
    } else {
        // Right side - Player 2
        player2.y = touchY - player2.height / 2;
    }
}

// Setup Settings
function setupSettings() {
    const gameSpeedSlider = document.getElementById('gameSpeed');
    const ballSizeSlider = document.getElementById('ballSize');
    const speedValue = document.getElementById('speedValue');
    const sizeValue = document.getElementById('sizeValue');
    
    gameSpeedSlider.addEventListener('input', (e) => {
        CONFIG.BALL_SPEED = parseInt(e.target.value);
        speedValue.textContent = e.target.value;
        if (ball) {
            ball.speedX = Math.sign(ball.speedX) * CONFIG.BALL_SPEED;
            ball.speedY = Math.sign(ball.speedY) * CONFIG.BALL_SPEED;
        }
    });
    
    ballSizeSlider.addEventListener('input', (e) => {
        CONFIG.BALL_SIZE = parseInt(e.target.value);
        sizeValue.textContent = e.target.value;
        if (ball) {
            ball.size = CONFIG.BALL_SIZE;
        }
    });
}

// Toggle Game State
function toggleGame() {
    if (!gameState.isRunning) {
        startGame();
    } else {
        togglePause();
    }
}

// Start Game
function startGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.gameStartTime = Date.now();
    hideOverlay();
}

// Toggle Pause
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    if (gameState.isPaused) {
        showOverlay('Game Paused', 'Press SPACE to Resume');
    } else {
        hideOverlay();
    }
}

// Reset Game
function resetGame() {
    gameState.isRunning = false;
    gameState.isPaused = false;
    gameState.gameStartTime = null;
    gameState.rallyCount = 0;
    
    player1.score = 0;
    player2.score = 0;
    updateScore();
    
    resetBall();
    showOverlay('Press SPACE to Start', 'Use W/S for Player 1, Arrow Keys for Player 2');
}

// Show Overlay
function showOverlay(title, message) {
    const overlay = document.getElementById('gameOverlay');
    const gameMessage = document.getElementById('gameMessage');
    
    gameMessage.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
    `;
    
    overlay.classList.remove('hidden');
}

// Hide Overlay
function hideOverlay() {
    const overlay = document.getElementById('gameOverlay');
    overlay.classList.add('hidden');
}

// Update Score
function updateScore() {
    document.getElementById('player1Score').textContent = player1.score;
    document.getElementById('player2Score').textContent = player2.score;
}

// Update Game Stats
function updateStats() {
    document.getElementById('currentSpeed').textContent = CONFIG.BALL_SPEED;
    document.getElementById('rallyCount').textContent = gameState.rallyCount;
    
    if (gameState.gameStartTime) {
        const elapsed = Math.floor((Date.now() - gameState.gameStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('gameTime').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Handle Input
function handleInput() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    // Player 1 controls (W/S)
    if (keys['KeyW'] && player1.y > 0) {
        player1.y -= player1.speed;
    }
    if (keys['KeyS'] && player1.y < CONFIG.CANVAS_HEIGHT - player1.height) {
        player1.y += player1.speed;
    }
    
    // Player 2 controls (Arrow Keys)
    if (keys['ArrowUp'] && player2.y > 0) {
        player2.y -= player2.speed;
    }
    if (keys['ArrowDown'] && player2.y < CONFIG.CANVAS_HEIGHT - player2.height) {
        player2.y += player2.speed;
    }
}

// Update Game Logic
function update() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    handleInput();
    updateBall();
    checkCollisions();
    checkScore();
    updateStats();
}

// Update Ball
function updateBall() {
    // Add to trail
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 10) {
        ball.trail.shift();
    }
    
    // Update position
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Bounce off top and bottom walls
    if (ball.y <= 0 || ball.y >= CONFIG.CANVAS_HEIGHT - ball.size) {
        ball.speedY = -ball.speedY;
        ball.y = Math.max(0, Math.min(CONFIG.CANVAS_HEIGHT - ball.size, ball.y));
    }
}

// Check Collisions
function checkCollisions() {
    // Check collision with paddles
    if (checkPaddleCollision(player1) || checkPaddleCollision(player2)) {
        ball.speedX = -ball.speedX;
        gameState.rallyCount++;
        gameState.lastHitTime = Date.now();
        
        // Add some randomness to make it more interesting
        ball.speedY += (Math.random() - 0.5) * 2;
        ball.speedY = Math.max(-CONFIG.BALL_SPEED * 1.5, Math.min(CONFIG.BALL_SPEED * 1.5, ball.speedY));
    }
}

// Check Paddle Collision
function checkPaddleCollision(paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.size > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.size > paddle.y;
}

// Check Score
function checkScore() {
    if (ball.x < 0) {
        // Player 2 scores
        player2.score++;
        updateScore();
        resetBall();
        
        if (player2.score >= CONFIG.WINNING_SCORE) {
            endGame('Player 2 Wins!', 'Press R to Reset');
        }
    } else if (ball.x > CONFIG.CANVAS_WIDTH) {
        // Player 1 scores
        player1.score++;
        updateScore();
        resetBall();
        
        if (player1.score >= CONFIG.WINNING_SCORE) {
            endGame('Player 1 Wins!', 'Press R to Reset');
        }
    }
}

// End Game
function endGame(winner, message) {
    gameState.isRunning = false;
    showOverlay(winner, message);
}

// Render Game
function render() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Draw center line
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CONFIG.CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw ball trail
    if (ball.trail.length > 1) {
        ctx.strokeStyle = 'rgba(241, 196, 15, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ball.trail[0].x + ball.size / 2, ball.trail[0].y + ball.size / 2);
        for (let i = 1; i < ball.trail.length; i++) {
            ctx.lineTo(ball.trail[i].x + ball.size / 2, ball.trail[i].y + ball.size / 2);
        }
        ctx.stroke();
    }
    
    // Draw paddles
    drawPaddle(player1);
    drawPaddle(player2);
    
    // Draw ball
    drawBall();
    
    // Draw rally count
    if (gameState.rallyCount > 0) {
        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(`Rally: ${gameState.rallyCount}`, CONFIG.CANVAS_WIDTH / 2, 40);
    }
}

// Draw Paddle
function drawPaddle(paddle) {
    // Paddle shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(paddle.x + 2, paddle.y + 2, paddle.width, paddle.height);
    
    // Paddle body
    const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x + paddle.width, paddle.y + paddle.height);
    gradient.addColorStop(0, paddle.color);
    gradient.addColorStop(1, darkenColor(paddle.color, 0.3));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Paddle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw Ball
function drawBall() {
    // Ball glow effect
    const gradient = ctx.createRadialGradient(
        ball.x + ball.size / 2, ball.y + ball.size / 2, 0,
        ball.x + ball.size / 2, ball.y + ball.size / 2, ball.size
    );
    gradient.addColorStop(0, '#f1c40f');
    gradient.addColorStop(0.7, '#e67e22');
    gradient.addColorStop(1, '#d35400');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ball.x + ball.size / 2, ball.y + ball.size / 2, ball.size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Ball highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(ball.x + ball.size / 3, ball.y + ball.size / 3, ball.size / 4, 0, Math.PI * 2);
    ctx.fill();
}

// Utility Functions
function darkenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * amount * 100);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Game Loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Initialize game when page loads
window.addEventListener('load', initGame);
```

---

## 🚀 How to Use

1. **Save the files**: Create three separate files with the code above
2. **Open index.html**: Open the HTML file in your web browser
3. **Start playing**: Press SPACE to start the game
4. **Controls**:
   - **Player 1**: W/S keys
   - **Player 2**: Arrow keys
   - **SPACE**: Start/Pause
   - **R**: Reset game

## 🎮 Features

- **Smooth gameplay** with 60fps rendering
- **Responsive design** for mobile and desktop
- **Customizable settings** (ball size, game speed)
- **Visual effects** (ball trail, gradients, shadows)
- **Game statistics** (rally count, game time)
- **Touch controls** for mobile devices
- **Tournament mode** (first to 11 points wins)

## 🔧 Customization

You can easily customize the game by modifying the `CONFIG` object in the JavaScript file:

```javascript
const CONFIG = {
    CANVAS_WIDTH: 800,        // Game canvas width
    CANVAS_HEIGHT: 400,       // Game canvas height
    PADDLE_WIDTH: 15,         // Paddle width
    PADDLE_HEIGHT: 80,        // Paddle height
    PADDLE_SPEED: 5,          // Paddle movement speed
    BALL_SIZE: 10,            // Ball size
    BALL_SPEED: 5,            // Ball speed
    WINNING_SCORE: 11         // Score needed to win
};
```

Enjoy building and playing your Pong game! 🏓
