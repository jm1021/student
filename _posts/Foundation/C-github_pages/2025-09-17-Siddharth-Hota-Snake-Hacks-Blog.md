---
title: "Siddharth Hota - Snake Hacks Blog"
date: 2025-09-17
---

# Hello, my name is Siddharth Hota, and I choose to do the snake.md hacks

Welcome to my blog where I document the various hacks and features I implemented in the classic Snake game using `snake.md`. Below, I've divided my work into easy hacks, hard hacks, and extra features.

---

## Easy Hacks

### 1. Change the background color, snake color, and food color
I modified the game's CSS and JavaScript to allow dynamic changes to the background, snake, and food colors. This was achieved by exposing color pickers in the settings menu and updating the rendering logic to use the selected colors.

### 2. Add or change settings to change the speed of the snake
I introduced a slider in the settings screen that lets users adjust the snake's speed. The game loop interval is updated in real-time based on the chosen speed, making the game more customizable.

### 3. Increase the amount of length the snake gets from the food
I added a setting that lets players choose how much the snake grows when it eats food. This involved modifying the logic that handles food consumption and snake growth.

### 4. Add new keybinds to the snake (e.g., give it WASD controls)
I updated the input handling code to support both arrow keys and WASD controls, making the game more accessible and comfortable for different players.

### 5. Add a glowing effect to any part of the game
Using CSS box-shadow and animation, I added a glowing effect to the snake and food, making them stand out visually and enhancing the game's aesthetics.

### 6. Overhaul the UI (interface) of the setting screens/game over screen
I redesigned the settings and game over screens with a modern look, using improved layouts, colors, and transitions for a better user experience.

---

## Hard Hacks

### 1. Add obstacles that the snake has to avoid
I implemented randomly placed obstacles on the game board. The collision detection logic was updated so that hitting an obstacle results in losing a life or ending the game.

### 2. Give snake multiple lives
I introduced a lives system, displaying the remaining lives on the UI. When the snake collides with itself or an obstacle, it loses a life and respawns, unless all lives are lost.

### 3. Make multiple foods available to the snake
I modified the food spawning logic to allow multiple food items to appear on the board at once. Each food item can have different effects, such as varying growth amounts or special bonuses.

---

## Extra Features

Hi.