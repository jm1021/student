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
  (function(){
    const canvas = document.getElementById("pongCanvas");
    if (!canvas) return; // fail-safe if this section is hidden
    const ctx = canvas.getContext("2d");

    // Game objects
    const paddleWidth = 10, paddleHeight = 100;
    const ballSize = 15;

    let leftPaddle = { x: 20, y: canvas.height/2 - paddleHeight/2, dy: 0 };
    let rightPaddle = { x: canvas.width - 30, y: canvas.height/2 - paddleHeight/2, dy: 0 };
    let ball = { 
      x: canvas.width/2, 
      y: canvas.height/2, 
      dx: 5 * (Math.random() > 0.5 ? 1 : -1), 
      dy: 5 * (Math.random() > 0.5 ? 1 : -1) 
    };

    let leftScore = 0, rightScore = 0;

    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    function drawBall(x, y, size, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI*2);
      ctx.fill();
    }

    function drawText(text, x, y) {
      ctx.fillStyle = "white";
      ctx.font = "30px Arial, sans-serif";
      ctx.fillText(text, x, y);
    }

    function update() {
      // Move paddles
      leftPaddle.y += leftPaddle.dy;
      rightPaddle.y += rightPaddle.dy;

      // Keep paddles inside canvas
      leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
      rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce top/bottom
      if (ball.y - ballSize < 0 || ball.y + ballSize > canvas.height) {
        ball.dy *= -1;
      }

      // Bounce on paddles
      if (ball.x - ballSize < leftPaddle.x + paddleWidth &&
          ball.y > leftPaddle.y &&
          ball.y < leftPaddle.y + paddleHeight) {
        ball.dx *= -1;
      }

      if (ball.x + ballSize > rightPaddle.x &&
          ball.y > rightPaddle.y &&
          ball.y < rightPaddle.y + paddleHeight) {
        ball.dx *= -1;
      }

      // Score
      if (ball.x - ballSize < 0) {
        rightScore++;
        resetBall();
      }
      if (ball.x + ballSize > canvas.width) {
        leftScore++;
        resetBall();
      }
    }

    function resetBall() {
      ball.x = canvas.width/2;
      ball.y = canvas.height/2;
      ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
    }

    function draw() {
      drawRect(0, 0, canvas.width, canvas.height, "black"); // background
      drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, "white");
      drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, "white");
      drawBall(ball.x, ball.y, ballSize, "white");
      drawText(leftScore, canvas.width/4, 40);
      drawText(rightScore, 3*canvas.width/4, 40);
    }

    function loop() {
      update();
      draw();
    }
    const intervalId = setInterval(loop, 1000/60);

    // Controls
    document.addEventListener("keydown", event => {
      if (event.key === "w") leftPaddle.dy = -7;
      if (event.key === "s") leftPaddle.dy = 7;
      // If you want right paddle on arrows, uncomment these:
      // if (event.key === "ArrowUp") rightPaddle.dy = -7;
      // if (event.key === "ArrowDown") rightPaddle.dy = 7;
    });
    document.addEventListener("keyup", event => {
      if (event.key === "w" || event.key === "s") leftPaddle.dy = 0;
      // if (event.key === "ArrowUp" || event.key === "ArrowDown") rightPaddle.dy = 0;
    });
  })();
</script>

---

## Demonstration - Workflow with Mermaid Diagram
Here’s the **debugging workflow** your team should follow:

```mermaid
flowchart TD
    A[🏓 Play Pong Game] --> B{Bug Found?}
    B -->|Yes| C[📝 Create GitHub Issue]
    B -->|No| D[✅ Game Working]
    C --> E[🏷️ Add to Kanban Board]
    E --> F[🎯 Set Breakpoints]
    F --> G[👥 Live Share Debug Session]
    G --> H[🔍 Step Through Code]
    H --> I[🛠️ Implement Fix]
    I --> J[🧪 Pair Test Solution]
    J --> K{Fix Works?}
    K -->|Yes| L[📤 Commit & Push]
    K -->|No| F
    L --> M[📋 Update Burndown]
    M --> N[🔄 Code Review]
    N --> O[✅ Close Issue]
