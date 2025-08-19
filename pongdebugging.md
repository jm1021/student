---
layout: base
title: Pong Debugging Lesson
description: Pair/Trio programming debugging activity with Pong game
permalink: /pongdebugging
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
