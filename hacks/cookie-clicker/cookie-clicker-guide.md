---
layout: base
title: Cookie Clicker Guide
permalink: /cookie-guide/
---

# Cookie Clicker Guide

This guide explains how the Cookie Clicker game on this site works, how to play it, and how to extend or debug it.

## Overview

The game is a simple incremental clicker: click the big cookie to earn cookies, then spend cookies to buy upgrades (Grandmas, Cursors, Factories, etc.) that increase your cookies-per-second (CPS).

Files of interest:
- `hacks/cookie-clicker/cookie-clicker-game.md` — the page markup and layout (this file).
- `hacks/cookie-clicker/cookie-clicker-game.js` — the game logic and event handlers.
- `hacks/cookie-clicker/assets/` — image assets used by the game (cookie image, icons, etc.).

## How to Play

- Click the large cookie image to earn a cookie per click.
- Each purchase button in the SHOP increases your CPS or provides special effects:
  - **Cursor**: small CPS boost per purchase.
  - **Grandma**: medium CPS boost.
  - **Factory**: large CPS boost.
  - **Bank**: gives a large boost and scales with time.
  - **Mango Temple**: a themed high-cost item with large benefits.
  - **Chaotic Ohio**: late-game ultra-costly upgrade (for fun).

The cookie count is shown in the `#cookie-count` span. Prices and effects are set in `cookie-clicker-game.js`.

## Controls

- Click the cookie (`#cookie`) to add to your total.
- Click a shop button to buy an upgrade (if you have enough cookies).

## Example: Buying a Cursor

1. Earn at least 15 cookies by clicking the cookie.
2. Click the `🖱️ Cursor (Cost: 15)` button.
3. The cookie-count will decrease by the cost and your per-second income will increase.

## Implementation Notes

- Game state is stored in memory (not persisted) and updated by click handlers and interval timers defined in the JavaScript file.
- The shop buttons are standard `<button>` elements with IDs like `cursorBtn`, `autoClickerBtn`, `factoryBtn`, etc. The JavaScript attaches event listeners to these IDs.

## Extending the Game

- To add a new shop item:
  1. Add a new `<button id="myNewItemBtn">` in `cookie-clicker-game.md` inside the `#shop-container`.
  2. In `cookie-clicker-game.js`, add a new entry for the item with its cost and CPS, and wire an event listener that checks cost and applies its effect.

- To persist progress between page reloads, use `localStorage`:
  - Save `cookieCount` and owned items periodically: `localStorage.setItem('cookieCount', cookieCount)`.
  - On load, read back saved state and initialize UI accordingly.

## Debugging Tips

- Open DevTools → Console to see any runtime errors from `cookie-clicker-game.js`.
- Check Network tab to verify `cookie-clicker-game.js` and image assets load without 404 errors.
- If a button does nothing, ensure its `id` matches the selector used in the JS file.

## Customization Ideas

- Add animation and particle effects when clicking the cookie.
- Add achievements for milestones (e.g., 1,000 cookies total).
- Add a mini leaderboard using a server or GitHub Gist to store top scores.

---

Back to the game: [Open Cookie Clicker](/cookie-clicker-game/)
