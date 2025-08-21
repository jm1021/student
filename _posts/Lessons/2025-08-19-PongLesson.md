---
layout: post
title: Pong Lesson
description: Learn How to Code Games with Pong
categories: ['DevOps', 'Python']
permalink: /jupyter/notebook/python
menu: nav/tools_setup.html
toc: True
comments: True
---
# 🏓 Pong Game Debugging Lesson

Welcome to the **Pair/Trio Debugging Challenge** using the Pong Game.  
Work in teams to debug, document, and improve Pong while practicing collaboration and Agile workflows.

---
## Key Concepts From This Lesson
Canvas API:	How to draw shapes, text, and manage 2D graphics in JavaScript.

Game Loop:	The core update-draw cycle in real-time games.

Collision Detection:	Checking if the ball hits a paddle or wall.

Keyboard Input:	Handling user input for interactive games.

Game State Management:	Tracking scores, resetting the ball, ending the game.

## Goal For This Lesson
In this lesson you will learn how to how to code the pong game by using CSS styling, applying game logic, and identifying game objects. After the lesson, you will be tasked with creaating a game rule that counts the score until 11, and then resets.

---

## 📑 Navigation
- [Pair/Trio Programming Overview](#pairtrio-programming-overview)  
- [🏓 Pong Debugging Session](#-pong-debugging-session)  
- [Problem - Debug Pong Game](#problem---debug-pong-game)  
- [Activation - Learn How to Play Pong](#activation---learn-how-to-play-pong)  
- [Demonstration - Workflow with Mermaid Diagram](#demonstration---workflow-with-mermaid-diagram)  
- [Application - Debugging Practice Session](#application---debugging-practice-session)  
- [Snake (Pong) Debugging Evaluation Table](#pong-debugging-evaluation-table)  
- [Reflection Questions](#reflection-questions)  

---

## Pair/Trio Programming Overview
This activity evaluates collaboration, debugging, and planning skills in a **Computer Science Project-based learning course**.  
You will practice **driver/navigator/observer roles**, GitHub Issues, burndown tracking, and pair code reviews.  

---

## 🏓 Pong Debugging Session
Your team will **transform pair/trio programming from theory to practice** by fixing and improving the Pong Game.  
Through this, you’ll follow a **full debugging workflow** while collaborating effectively.

---

## Problem - Debug Pong Game
You’ve inherited a Pong Game with opportunities for improvements.  
Your mission: identify, document, and fix these issues in pairs or trios using Agile methodologies.  

### Pong Game Improvement Ideas:
- Ball sometimes moves too fast or slow (tuning game speed).  
- Paddles can get stuck or move off-screen if not handled properly.  
- Add a pause/restart button.  
- Score display can be improved (font/color/position).  
- Add background colors or effects.  
- Implement “winning condition” (e.g., first to 10).  

---

## Activation - Learn How to Play Pong
1. Open the [Pong Game](/ponggame).  
2. Play and observe behaviors.  
3. Take notes on bugs, confusing features, or areas for improvement.  

---

## ▶ Play the Pong Game (Inline)

<div id="pong-wrapper" style="display:flex;justify-content:center;align-items:center;min-height:60vh;background:#000;border-radius:12px;padding:16px;">
  <canvas id="pongCanvas" width="800" height="500" style="display:block;background:#000;max-width:100%;height:auto;border:1px solid #222;border-radius:8px;"></canvas>
</div>

<script>
class Paddle {
  constructor(x, y, width, height, upKey, downKey) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dy = 0;
    this.speed = 7;
    this.upKey = upKey;
    this.downKey = downKey;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(canvasHeight) {
    this.y += this.dy;
    this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));
  }

  handleKeyDown(key) {
    if (key === this.upKey) this.dy = -this.speed;
    if (key === this.downKey) this.dy = this.speed;
  }

  handleKeyUp(key) {
    if (key === this.upKey || key === this.downKey) this.dy = 0;
  }
}

class Ball {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
    this.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  move(canvas, leftPaddle, rightPaddle, onScore) {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce top/bottom
    if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
      this.dy *= -1;
    }

    // Bounce left paddle
    if (this.x - this.size < leftPaddle.x + leftPaddle.width &&
        this.y > leftPaddle.y &&
        this.y < leftPaddle.y + leftPaddle.height) {
      this.dx *= -1;
    }

    // Bounce right paddle
    if (this.x + this.size > rightPaddle.x &&
        this.y > rightPaddle.y &&
        this.y < rightPaddle.y + rightPaddle.height) {
      this.dx *= -1;
    }

    // Score
    if (this.x - this.size < 0) {
      onScore("right");
      this.reset(canvas.width / 2, canvas.height / 2);
    }
    if (this.x + this.size > canvas.width) {
      onScore("left");
      this.reset(canvas.width / 2, canvas.height / 2);
    }
  }
}

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.paddleWidth = 10;
    this.paddleHeight = 100;
    this.ballSize = 15;

    this.leftPaddle = new Paddle(20, this.canvas.height / 2 - 50, this.paddleWidth, this.paddleHeight, "w", "s");
    this.rightPaddle = new Paddle(this.canvas.width - 30, this.canvas.height / 2 - 50, this.paddleWidth, this.paddleHeight, "ArrowUp", "ArrowDown");
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, this.ballSize);

    this.leftScore = 0;
    this.rightScore = 0;

    this.loop = this.loop.bind(this);
    this.setupControls();
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      this.leftPaddle.handleKeyDown(e.key);
      this.rightPaddle.handleKeyDown(e.key);
    });
    document.addEventListener("keyup", (e) => {
      this.leftPaddle.handleKeyUp(e.key);
      this.rightPaddle.handleKeyUp(e.key);
    });
  }

  update() {
    this.leftPaddle.move(this.canvas.height);
    this.rightPaddle.move(this.canvas.height);
    this.ball.move(this.canvas, this.leftPaddle, this.rightPaddle, (side) => {
      if (side === "left") this.leftScore++;
      if (side === "right") this.rightScore++;
    });
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.leftPaddle.draw(this.ctx);
    this.rightPaddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial, sans-serif";
    this.ctx.fillText(this.leftScore, this.canvas.width / 4, 40);
    this.ctx.fillText(this.rightScore, (3 * this.canvas.width) / 4, 40);
  }

  loop() {
    this.update();
    this.draw();
  }

  start() {
    setInterval(this.loop, 1000 / 60);
  }
}

const pong = new Game("pongCanvas");
pong.start();
</script>


---

## 🎯 Pong Game Challenge Tasks

Below are the challenges you will implement in your Pong game.  
Each challenge includes a description, a sample code snippet, and a skeleton starter code block for practice.  

---

### 1. Restart System  
Add a key (e.g., `r`) to reset the game state.  

**✅ Sample Code:**
<pre><code>
// Inside Game class
resetGame() {
  this.leftScore = 0;
  this.rightScore = 0;
  this.isGameOver = false;
  this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
}

// In setupControls()
document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    this.resetGame();
  }
});
</code></pre>

**📝 Skeleton Code:**
<pre><code>
// TODO: Create resetGame() function
// TODO: Set scores back to 0
// TODO: Reset ball position
// TODO: Add key listener for "r" to restart
</code></pre>

---

### 2. First to 10 Wins  
End the game when one player reaches **10 points**.  

**✅ Sample Code:**
<pre><code>
// Inside scoring logic
if (this.leftScore >= 10 || this.rightScore >= 10) {
  this.isGameOver = true;
}

// In draw()
if (this.isGameOver) {
  this.ctx.fillText("Game Over!", this.canvas.width / 2 - 80, this.canvas.height / 2);
  this.ctx.fillText("Press R to Restart", this.canvas.width / 2 - 120, this.canvas.height / 2 + 40);
}
</code></pre>

**📝 Skeleton Code:**
<pre><code>
// TODO: Add win condition (score >= 10)
// TODO: Stop game when someone wins
// TODO: Display "Game Over" message
// TODO: Tell player how to restart
</code></pre>

---

### 3. AI Paddle (Optional)  
Make the right paddle follow the ball automatically.  

**✅ Sample Code:**
<pre><code>
// In Paddle class
moveAI(ball, canvasHeight) {
  if (ball.y < this.y + this.height / 2) {
    this.y -= this.speed * 0.7; // slower reaction
  } else if (ball.y > this.y + this.height / 2) {
    this.y += this.speed * 0.7;
  }
  this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));
}

// In Game update()
this.rightPaddle.moveAI(this.ball, this.canvas.height);
</code></pre>

**📝 Skeleton Code:**
<pre><code>
// TODO: Create moveAI() function in Paddle
// TODO: If ball is above paddle, move up
// TODO: If ball is below paddle, move down
// TODO: Prevent paddle from leaving screen
</code></pre>

---

---

## 🎮 Full Pong Game (Spoiler Reveal & Play)

<details>
  <summary>⚠️ Click to Reveal & Play Pong (Only if you’re stuck!)</summary>

<div id="pong-container">
  <canvas id="pongCanvas" width="600" height="400" style="background:black; display:block; margin:auto;"></canvas>
</div>

<script>
// --- PONG GAME CODE ---

const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.dy = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move(canvasHeight) {
    this.y += this.dy;
    if (this.y < 0) this.y = 0;
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
    }
  }
  moveAI(ball, canvasHeight) {
    if (ball.y < this.y + this.height / 2) {
      this.y -= this.speed * 0.7;
    } else if (ball.y > this.y + this.height / 2) {
      this.y += this.speed * 0.7;
    }
    this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));
  }
}

class Ball {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
  move(canvas, leftPaddle, rightPaddle) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY = -this.speedY;
    }

    if (
      this.x - this.radius < leftPaddle.x + leftPaddle.width &&
      this.y > leftPaddle.y &&
      this.y < leftPaddle.y + leftPaddle.height
    ) {
      this.speedX = -this.speedX;
    }

    if (
      this.x + this.radius > rightPaddle.x &&
      this.y > rightPaddle.y &&
      this.y < rightPaddle.y + rightPaddle.height
    ) {
      this.speedX = -this.speedX;
    }

    if (this.x - this.radius < 0) return "right";
    if (this.x + this.radius > canvas.width) return "left";

    return null;
  }
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = -this.speedX;
  }
}

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftPaddle = new Paddle(10, canvas.height / 2 - 40, 10, 80, 8);
    this.rightPaddle = new Paddle(canvas.width - 20, canvas.height / 2 - 40, 10, 80, 8);
    this.ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4);
    this.leftScore = 0;
    this.rightScore = 0;
    this.isGameOver = false;
    this.setupControls();
  }
  setupControls() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "w") this.leftPaddle.dy = -this.leftPaddle.speed;
      if (e.key === "s") this.leftPaddle.dy = this.leftPaddle.speed;
      if (e.key === "r") this.resetGame();
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "s") this.leftPaddle.dy = 0;
    });
  }
  resetGame() {
    this.leftScore = 0;
    this.rightScore = 0;
    this.isGameOver = false;
    this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
  }
  update() {
    if (this.isGameOver) return;
    this.leftPaddle.move(this.canvas.height);
    this.rightPaddle.moveAI(this.ball, this.canvas.height);
    let scorer = this.ball.move(this.canvas, this.leftPaddle, this.rightPaddle);
    if (scorer === "left") {
      this.leftScore++;
      this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
    } else if (scorer === "right") {
      this.rightScore++;
      this.ball.reset(this.canvas.width / 2, this.canvas.height / 2);
    }
    if (this.leftScore >= 10 || this.rightScore >= 10) {
      this.isGameOver = true;
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.leftPaddle.draw(this.ctx);
    this.rightPaddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(this.leftScore, this.canvas.width / 4, 30);
    this.ctx.fillText(this.rightScore, (this.canvas.width * 3) / 4, 30);

    if (this.isGameOver) {
      this.ctx.fillText("Game Over!", this.canvas.width / 2 - 80, this.canvas.height / 2);
      this.ctx.fillText("Press R to Restart", this.canvas.width / 2 - 120, this.canvas.height / 2 + 40);
    }
  }
}

const game = new Game(canvas, ctx);

function loop() {
  game.update();
  game.draw();
  requestAnimationFrame(loop);
}

loop();
</script>

</details>

---


## Demonstration - Workflow with Mermaid Diagram
Here’s the **debugging workflow** your team should follow:


| Step | Action                          | Outcome                  |
|------|---------------------------------|--------------------------|
| 1    | 🏓 Play Pong Game               | Begin testing the game   |
| 2    | ❓ Bug Found?                   | Branch decision point    |
| 3    | 📝 Create GitHub Issue         | Track the bug formally   |
| 4    | 🏷️ Add to Kanban Board         | Visible in project board |
| 5    | 🎯 Set Breakpoints              | Prepare for debugging    |
| 6    | 👥 Live Share Debug Session     | Collaborate with team    |
| 7    | 🔍 Step Through Code            | Inspect program flow     |
| 8    | 🛠️ Implement Fix               | Apply a code change      |
| 9    | 🧪 Pair Test Solution           | Validate the fix         |
| 10   | ✅ Fix Works?                   | If yes → continue; if no → return to step 5 |
| 11   | 📤 Commit & Push                | Save and sync changes    |
| 12   | 📋 Update Burndown              | Track project progress   |
| 13   | 🔄 Code Review                  | Peer review the changes  |
| 14   | ✅ Close Issue                  | Finalize the workflow    |


<div class="mermaid">
flowchart TD
    A[🏓 Start Pong Lesson] --> B[👨‍💻 Build Pong Game]
    B --> C{🐞 Bug Found?}
    C -->|Yes| D[📝 Document Issue]
    D --> E[🔧 Debug & Fix]
    E --> B
    C -->|No| F[✅ Working Game]
    F --> G[📊 Reflect & Blog]
    G --> H[🚀 Share with Class]
</div>