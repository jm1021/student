---
layout: base
title: Pong Lesson
permalink: /PongLesson/
---

## Key Concepts From This Lesson
Canvas API:	How to draw shapes, text, and manage 2D graphics in JavaScript.

Game Loop:	The core update-draw cycle in real-time games.

Collision Detection:	Checking if the ball hits a paddle or wall.

Keyboard Input:	Handling user input for interactive games.

Game State Management:	Tracking scores, resetting the ball, ending the game.

## Goal For This Lesson
In this lesson you will learn how to how to code the pong game by using CSS styling, applying game logic, and identifying game objects. After the lesson, you will be tasked with creaating a game rule that counts the score until 11, and then resets.

## Code Breakdown
🧠 Understanding the Code
✅ 1. HTML Layout

The file uses a Jekyll-compatible front matter (---) for embedding in a static site.

Inside the HTML, we set up a canvas (<canvas id="pongCanvas">) which will be used for drawing the game.

✅ 2. CSS Styling

The body is centered with flexbox, a black background, and full viewport height.

The canvas is also black (background: #000), matching the retro Pong look.

✅ 3. JavaScript – Game Logic
🎮 Game Objects:

Paddles: Two paddles (left and right), each controlled by keys (W/S and ↑/↓).

Ball: A moving ball with dx and dy velocities (x and y direction).

Score: Left and right players' scores.

🎨 Drawing:

drawRect: draws paddles and background.

drawBall: draws the ball using the arc() function.

drawText: shows the score.

🔁 Game Loop:

update(): Updates the position of the paddles and the ball, checks for collisions, and handles scoring.

draw(): Clears the canvas and redraws the paddles, ball, and scores.

setInterval(loop, 1000/60): Runs the game loop at ~60 frames per second.

🎮 Controls:

Listeners for keydown and keyup move paddles by changing dy (paddle speed).