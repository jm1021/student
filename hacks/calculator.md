---
title: Calculator
layout: base
permalink: /calculator
---

<!-- 
Hack 0: Right justify result
Hack 1: Test conditions on small, big, and decimal numbers, report on findings. Fix issues.
Hack 2: Add the common math operation that is missing from calculator
Hack 3: Implement 1 number operation (ie SQRT) 
-->

<!-- 
HTML implementation of the calculator. 
-->



<!-- 
    Style and Action are aligned with HRML class definitions
    style.css contains majority of style definition (number, operation, clear, and equals)
    - The div calculator-container sets 4 elements to a row
    Background is credited to Vanta JS and is implemented at bottom of this page
-->
<style>
/* Existing calculator output styles */
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
}

/* Rainbow animated background */
#animation {
  position: relative;
  width: 100%;
  height: 100vh; /* Full screen height */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* Rainbow gradient colors */
  background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 1400% 1400%;
  
  /* Smooth animation of the background */
  animation: rainbowMove 20s ease infinite;
}

/* Keyframes to animate the gradient */
@keyframes rainbowMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Ensure the calculator is above the background */
.calculator-container {
  position: relative;
  z-index: 2; /* Keep the calculator above the animated background */
}
</style>


<!-- Add a container for the animation -->
<div id="animation">
  <div class="calculator-container">
      <!--result-->
      <div class="calculator-output" id="output">0</div>
      <!--row 1-->
      <div class="calculator-number">1</div>
      <div class="calculator-number">2</div>
      <div class="calculator-number">3</div>
      <div class="calculator-operation">+</div>
      <!--row 2-->
      <div class="calculator-number">4</div>
      <div class="calculator-number">5</div>
      <div class="calculator-number">6</div>
      <div class="calculator-operation">-</div>
      <!--row 3-->
      <div class="calculator-number">7</div>
      <div class="calculator-number">8</div>
      <div class="calculator-number">9</div>
      <div class="calculator-operation">*</div>
      <!--row 4-->
      <div class="calculator-operation" id="sqrt">√</div> <!-- Hack 3: Square root -->
      <div class="calculator-clear">A/C</div>
      <div class="calculator-number">0</div>
      <div class="calculator-number">.</div>
      <div class="calculator-operation">/</div> <!-- Hack 2: Division -->
      <div class="calculator-equals">=</div>
  </div>
</div>

<script>
var firstNumber = null;
var operator = null;
var nextReady = true;

const output = document.getElementById("output");
const numbers = document.querySelectorAll(".calculator-number");
const operations = document.querySelectorAll(".calculator-operation");
const clear = document.querySelectorAll(".calculator-clear");
const equals = document.querySelectorAll(".calculator-equals");
const sqrtButton = document.getElementById("sqrt");

// Number buttons
numbers.forEach(button => {
  button.addEventListener("click", function() {
    number(button.textContent);
  });
});

function number(value) {
    if (value != ".") {
        if (nextReady == true) {
            output.innerHTML = value;
            if (value != "0") {
                nextReady = false;
            }
        } else {
            output.innerHTML = output.innerHTML + value;
        }
    } else {
        if (output.innerHTML.indexOf(".") == -1) {
            output.innerHTML = output.innerHTML + value;
            nextReady = false;
        }
    }
}

// Operation buttons
operations.forEach(button => {
  button.addEventListener("click", function() {
    if (button.textContent !== "√") { // √ handled separately
      operation(button.textContent);
    }
  });
});

function operation(choice) {
    if (firstNumber == null) {
        firstNumber = parseFloat(output.innerHTML); // Hack 1 fix: allow decimals
        nextReady = true;
        operator = choice;
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
        case "/": result = first / second; break; // Hack 2 added division
        default: break;
    }
    return result;
}

// Equals button
equals.forEach(button => {
  button.addEventListener("click", function() {
    equal();
  });
});

function equal() {
    firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
    output.innerHTML = firstNumber.toString();
    nextReady = true;
}

// Clear button
clear.forEach(button => {
  button.addEventListener("click", function() {
    clearCalc();
  });
});

function clearCalc() {
    firstNumber = null;
    output.innerHTML = "0";
    nextReady = true;
}

// Hack 3: Square root implementation
sqrtButton.addEventListener("click", function() {
    let currentValue = parseFloat(output.innerHTML);
    if (currentValue >= 0) {
        output.innerHTML = Math.sqrt(currentValue).toString();
        nextReady = true;
    } else {
        output.innerHTML = "Error";
        nextReady = true;
    }
});
</script>
<!-- 
Vanta animations just for fun, load JS onto the page
-->
<script src="{{site.baseurl}}/assets/js/three.r119.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.halo.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.birds.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.net.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.rings.min.js"></script>

<script>
// setup vanta scripts as functions
var vantaInstances = {
  halo: VANTA.HALO,
  birds: VANTA.BIRDS,
  net: VANTA.NET,
  rings: VANTA.RINGS
};

// obtain a random vanta function
var vantaInstance = vantaInstances[Object.keys(vantaInstances)[Math.floor(Math.random() * Object.keys(vantaInstances).length)]];

// run the animation
vantaInstance({
  el: "#animation",
  mouseControls: true,
  touchControls: true,
  gyroControls: false
});
</script>

