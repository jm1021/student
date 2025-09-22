---
title: Calculator
layout: base
permalink: /calculator
---

<!-- 
Hack 0: Right justify result
Hack 1: Test conditions on small, big, and decimal numbers, report on findings. Fix issues.
Hack 2: Add the common math operation that is missing from calculator (Division)
Hack 3: Implement 1 number operation (ie SQRT)
Additional Upgrades: Scientific functions (sin, cos, tan, x^y), Keyboard support
-->

<style>
/* ===========================
   Calculator Output
   =========================== */
.calculator-output {
  grid-column: span 4;
  grid-row: span 1;
  border-radius: 10px;
  padding: 0.25em;
  font-size: 20px;
  border: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Hack 0: Right justify result */
  background-color: #222;
  color: #0f0;
  transition: background-color 0.4s, color 0.4s;
}

/* Rainbow cool background - full viewport */
#animation {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 1400% 1400%;
  animation: rainbowMove 20s ease infinite;
  z-index: 0;
}
@keyframes rainbowMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Calculator Container*/
.calculator-container {
  position: relative;
  z-index: 2; /* keep above the animated background */
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-gap: 10px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

/* Guide link */
.calculator-guide-link {
  position: absolute;
  right: -140px;
  top: 10px;
  width: 120px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  z-index: 3;
}

@media (max-width: 700px) {
  .calculator-guide-link { display: none; }
}

/* buttons */
.calculator-number,
.calculator-operation,
.calculator-clear,
.calculator-equals,
.scientific-operation {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #393e46;
  color: #eeeeee;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}
.calculator-number:hover,
.calculator-operation:hover,
.calculator-clear:hover,
.calculator-equals:hover,
.scientific-operation:hover {
  transform: scale(1.05);
  background: #555;
}
</style>

<div id="animation">
  <div class="calculator-container">
  <a class="calculator-guide-link" href="{{ '/calculator-guide/' | relative_url }}">Calculator Guide</a>
    <!-- Calculator Display -->
    <div class="calculator-output" id="output">0</div>

    <!-- Scientific Row (Upgrade) -->
    <div class="scientific-operation" data-func="sin">sin</div>
    <div class="scientific-operation" data-func="cos">cos</div>
    <div class="scientific-operation" data-func="tan">tan</div>
    <div class="scientific-operation" data-func="pow">x^y</div>

    <!-- Row 1 -->
    <div class="calculator-number">1</div>
    <div class="calculator-number">2</div>
    <div class="calculator-number">3</div>
    <div class="calculator-operation">+</div>

    <!-- Row 2 -->
    <div class="calculator-number">4</div>
    <div class="calculator-number">5</div>
    <div class="calculator-number">6</div>
    <div class="calculator-operation">-</div>

    <!-- Row 3 -->
    <div class="calculator-number">7</div>
    <div class="calculator-number">8</div>
    <div class="calculator-number">9</div>
    <div class="calculator-operation">*</div>

    <!-- Row 4 -->
    <div class="calculator-operation" id="sqrt">√</div> <!-- Hack 3: Square root button -->
    <div class="calculator-clear">A/C</div>
    <div class="calculator-number">0</div>
    <div class="calculator-number">.</div>
    <div class="calculator-operation">/</div> <!-- Hack 2: Division button -->
    <div class="calculator-equals">=</div>
  </div>
</div>

<script>
/* ===========================
   Variables
   =========================== */
let firstNumber = null;
let operator = null;
let nextReady = true;
let powMode = false; // Upgrade: For x^y functionality

const output = document.getElementById("output");
const numbers = document.querySelectorAll(".calculator-number");
const operations = document.querySelectorAll(".calculator-operation");
const scientificOps = document.querySelectorAll(".scientific-operation");
const clear = document.querySelectorAll(".calculator-clear");
const equals = document.querySelectorAll(".calculator-equals");
const sqrtButton = document.getElementById("sqrt");

/* ===========================
   Number Input
   =========================== */
numbers.forEach(button => {
  button.addEventListener("click", () => number(button.textContent));
});

function number(value) {
  if (nextReady) {
    output.innerHTML = value;
    if (value !== "0") nextReady = false;
  } else {
    output.innerHTML += value;
  }
}

/* ===========================
   Basic Operation Buttons
   =========================== */
operations.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent !== "√") { // √ handled separately
      if (powMode) powMode = false; // Reset pow mode if another op is chosen
      operation(button.textContent);
    }
  });
});

function operation(choice) {
  if (firstNumber === null) {
    firstNumber = parseFloat(output.innerHTML); // Hack 1: Fix decimals and large numbers
    operator = choice;
    nextReady = true;
    return;
  }
  firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
  operator = choice;
  output.innerHTML = firstNumber.toString();
  nextReady = true;
}

function calculate(first, second) {
  let result = 0;
  switch (operator) {
    case "+": result = first + second; break;
    case "-": result = first - second; break;
    case "*": result = first * second; break;
    case "/": result = first / second; break; // Hack 2: Division support added
    case "^": result = Math.pow(first, second); break; // Upgrade: x^y
    default: break;
  }
  return result;
}

/* ===========================
   Equals Button
   =========================== */
equals.forEach(button => {
  button.addEventListener("click", equal);
});
function equal() {
  if (powMode) {
    firstNumber = Math.pow(firstNumber, parseFloat(output.innerHTML)); // Upgrade: Handle x^y
    powMode = false;
  } else {
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
  }
  output.innerHTML = firstNumber.toString();
  nextReady = true;
}

/* ===========================
   Clear Button
   =========================== */
clear.forEach(button => {
  button.addEventListener("click", clearCalc);
});
function clearCalc() {
  firstNumber = null;
  operator = null;
  powMode = false;
  output.innerHTML = "0";
  nextReady = true;
}

/* ===========================
   Hack 3: Square Root
   =========================== */
sqrtButton.addEventListener("click", () => {
  const currentValue = parseFloat(output.innerHTML);
  if (currentValue >= 0) {
    output.innerHTML = Math.sqrt(currentValue).toString();
  } else {
    output.innerHTML = "Error";
  }
  nextReady = true;
});

/* ===========================
   Upgrade: Scientific Functions
   =========================== */
scientificOps.forEach(button => {
  button.addEventListener("click", () => {
    const func = button.dataset.func;
    const val = parseFloat(output.innerHTML);

    if (func === "pow") {
      firstNumber = val;
      operator = "^";
      powMode = true;
      nextReady = true;
      return;
    }

    let result;
    switch (func) {
      case "sin": result = Math.sin(val * Math.PI / 180); break; // degrees to radians
      case "cos": result = Math.cos(val * Math.PI / 180); break;
      case "tan": result = Math.tan(val * Math.PI / 180); break;
    }
    output.innerHTML = result.toString();
    nextReady = true;
  });
});

/* ===========================
   Upgrade: Keyboard Support
   =========================== */
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") {
    number(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    operation(e.key);
  } else if (e.key === "Enter") {
    equal();
  } else if (e.key === "Escape") {
    clearCalc();
  } else if (e.key === "Backspace") {
    output.innerHTML = output.innerHTML.slice(0, -1) || "0";
  }
});
</script>
