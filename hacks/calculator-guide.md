---
layout: base
title: Calculator Guide
permalink: /calculator-guide/
---

# Calculator Guide

This page documents the Calculator hack and explains how to use, extend, and debug it.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal support
- Square root (√)
- Exponentiation (x^y)
- Scientific shortcuts: `sin`, `cos`, `tan` (interpreted as degrees)
- Keyboard support: numbers, `.` , `+ - * /`, `Enter` (equals), `Escape` (clear), `Backspace`

## Layout and UI

The calculator sits centered above a moving rainbow background. The visible controls are implemented with simple DIVs styled with CSS and wired to JavaScript listeners.

- Display: `div.calculator-output` shows the current value.
- Buttons: `.calculator-number`, `.calculator-operation`, `.calculator-clear`, `.calculator-equals`, `.scientific-operation`.

## How to Use

- Click number buttons or press number keys to enter numbers.
- Use `+ - * /` to choose an operation.
- Press `=` button or `Enter` to evaluate.
- Use `A/C` or `Escape` to clear.
- Press `√` to compute square root of the current display.
- For `x^y` (power): press the `x^y` button (labeled `x^y`) to enter power mode, type the exponent, then press `=`.

### Examples

- Compute `(5 + 3) * 2`:
  1. Press `5`, `+`, `3`, `=`, then `*`, `2`, `=`.

- Compute `sqrt(81)`:
  1. Enter `81`, press `√` → result `9`.

- Compute `2^8`:
  1. Enter `2`, press `x^y`, enter `8`, press `=` → result `256`.

## Extending the Calculator

- Add new scientific functions by adding a new `.scientific-operation` element to the DOM and handling it in the `scientificOps` click handler.
- To support radians instead of degrees for trig functions, change the conversion in the code (remove `* Math.PI / 180`).
- To add keyboard shortcuts for new functions, modify the `keydown` listener in the script.

## Styling

- The rainbow background is controlled by the `#animation` CSS. You can change the `background-size`, `animation` duration, or gradient colors.
- The calculator container can be resized by changing the `grid-template-columns` values in `.calculator-container`.

## Debugging Tips

- Open DevTools → Console to look for errors.
- If a button doesn't respond, inspect the element to confirm it has the expected class (e.g., `.calculator-number`).
- If keyboard input isn't working, make sure no input field on the page has focus (the page listens globally for `keydown`).

## Implementation Notes

- The calculator stores `firstNumber`, `operator`, and `powMode` in simple global variables in the page script.
- Calculations are performed in the `calculate()` function which switches on the current `operator`.

## Want More?

If you'd like, I can:

- Add a memory row (M+, M-, MR) and keyboard shortcuts for memory operations.
- Add a history log under the calculator showing recent calculations.
- Make the calculator accessible (ARIA labels, focus states) for keyboard-only users.

---

Back to the calculator: [Open the Calculator](/calculator)
