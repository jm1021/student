---
layout: opencs
title: Calculator
permalink: /calculator
---

<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Calculator</title>
<style>
  :root{
    --card-w: 360px;
    --card-h: 520px;
    --accent: 210 90% 60%; /* H S L for hsl() via CSS variable usage */
    --glass-bg: rgba(255,255,255,0.06);
    --glass-border: rgba(255,255,255,0.12);
    --number-color: #bfe9ff; /* light blue for numeric text */
  }

  /* Full-page aesthetic background */
  html,body{
    height:100%;
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    color: #f8fafc;
  }

  body{
    display:flex;
    align-items:center;
    justify-content:center;
    background: radial-gradient(1200px 600px at 10% 20%, rgba(79,70,229,0.15), transparent 8%),
                radial-gradient(1000px 500px at 90% 80%, rgba(16,185,129,0.08), transparent 6%),
                linear-gradient(135deg, #071227 0%, #0b1220 40%, #081320 100%);
    overflow:hidden;
  }

  /* animated subtle shapes layer */
  .bg-shapes{
    position:fixed;
    inset:0;
    pointer-events:none;
    z-index:0;
    mix-blend-mode:screen;
  }
  .blob{
    position:absolute;
    filter: blur(50px) saturate(120%);
    opacity:0.9;
    transform: translate3d(0,0,0);
    animation: float 12s ease-in-out infinite;
  }
  .blob.b1{ left:-8%; top:10%; width:520px; height:520px; background: linear-gradient(135deg, rgba(99,102,241,0.14), rgba(79,70,229,0.22)); animation-duration:14s; }
  .blob.b2{ right:-6%; bottom:-6%; width:620px; height:420px; background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(14,165,233,0.12)); animation-duration:18s; animation-delay:2s; }
  .blob.b3{ left:20%; bottom:-10%; width:400px; height:400px; background: linear-gradient(135deg, rgba(236,72,153,0.06), rgba(99,102,241,0.06)); animation-duration:16s; animation-delay:1s; }
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg) scale(1) }
    50% { transform: translateY(-28px) rotate(6deg) scale(1.05) }
    100% { transform: translateY(0) rotate(0deg) scale(1) }
  }

  /* Calculator card */
  .calculator-wrap{
    width: min(92vw, var(--card-w));
    z-index:1;
    position:relative;
  }

  .card{
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.015));
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 10px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(8px) saturate(1.1);
    -webkit-backdrop-filter: blur(8px) saturate(1.1);
    width:100%;
    max-width: var(--card-w);
  }

  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    margin-bottom: 12px;
  }

  .brand{
    display:flex;
    gap:10px;
    align-items:center;
  }

  .logo{
    width:46px;
    height:46px;
    border-radius: 12px;
    background: conic-gradient(from 120deg at 50% 50%, hsl(var(--accent)/0.9), rgba(99,102,241,0.6));
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    box-shadow: 0 6px 18px rgba(79,70,229,0.12), inset 0 -6px 18px rgba(255,255,255,0.03);
    color: white;
    font-size:18px;
  }

  .title{
    font-size: 15px;
    line-height:1;
    color: #ecfeff;
  }
  .subtitle{ font-size:12px; color: rgba(236,253,245,0.7) }

  /* Display */
  .display {
    margin-top: 8px;
    border-radius: 12px;
    padding: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.03);
    min-height: 86px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
    color: #e6f6ff;
  }

  .expr{
    font-size: 14px;
    color: rgba(230,246,255,0.7);
    min-height:20px;
    text-align:right;
    word-break:break-all;
  }
  .value{
    font-weight:700;
    font-size:32px;
    text-align:right;
    letter-spacing:0.4px;
    color: var(--number-color);
  }

  /* Buttons grid */
  .pad{
    margin-top: 16px;
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .btn{
    height:60px;
    border-radius:12px;
    border: 1px solid rgba(255,255,255,0.03);
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:20px;
    cursor:pointer;
    user-select:none;
    transition: transform .08s ease, box-shadow .08s ease;
    box-shadow: 0 6px 18px rgba(2,6,23,0.45);
  }
  /* digits (buttons that are not operator or control) use the number color */
  .btn:not(.operator):not(.control){
    color: var(--number-color);
    font-weight:700;
  }
  .btn:active{ transform: translateY(2px) }
  .btn.operator{
    background: linear-gradient(180deg, hsla(var(--accent)/0.14), hsla(var(--accent)/0.08));
    color: white;
    font-weight:700;
  }
  .btn.control{
    background: linear-gradient(180deg, rgba(100,100,110,0.08), rgba(100,100,110,0.02));
    color: rgba(255,255,255,0.9);
    font-weight:600;
  }
  .btn.zero{
    grid-column: span 2;
  }

  /* subtle focus */
  .btn:focus{ outline: 2px solid rgba(255,255,255,0.06) }

  /* tiny help */
  .hint { font-size:12px; color: rgba(255,255,255,0.6); margin-top:10px; text-align:center }
  @media (max-width:420px){
    .logo{ width:40px; height:40px }
    .value{ font-size:26px }
    .btn{ height:54px; font-size:18px }
  }
</style>
</head>
<body>
  <div class="bg-shapes" aria-hidden="true">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>
  </div>

  <div class="calculator-wrap">
    <div class="card" role="application" aria-label="Calculator">
      <div class="header">
        <div class="brand">
          <div class="logo">GC</div>
          <div>
            <div class="title">Calculator</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:12px;color:rgba(255,255,255,0.7);">Precision</div>
          <div style="font-weight:700">12 digits</div>
        </div>
      </div>

      <div class="display" aria-live="polite">
        <div class="expr" id="expr">&nbsp;</div>
        <div class="value" id="value">0</div>
      </div>

      <div class="pad" role="grid" aria-label="Calculator keypad">
        <button class="btn control" data-action="clear">C</button>
        <button class="btn control" data-action="back">⌫</button>
        <button class="btn control" data-action="percent">%</button>
        <button class="btn operator" data-action="/">÷</button>

        <button class="btn" data-action="7">7</button>
        <button class="btn" data-action="8">8</button>
        <button class="btn" data-action="9">9</button>
        <button class="btn operator" data-action="*">×</button>

        <button class="btn" data-action="4">4</button>
        <button class="btn" data-action="5">5</button>
        <button class="btn" data-action="6">6</button>
        <button class="btn operator" data-action="-">−</button>

        <button class="btn" data-action="1">1</button>
        <button class="btn" data-action="2">2</button>
        <button class="btn" data-action="3">3</button>
        <button class="btn operator" data-action="+">+</button>

        <button class="btn zero" data-action="0">0</button>
        <button class="btn" data-action=".">.</button>
        <button class="btn operator" data-action="=">=</button>
      </div>

      <div class="hint">You can use your keyboard — numbers, + − * /, Enter for equals, Esc to clear.</div>
    </div>
  </div>

<script>
/*
  Glass Calculator JS
  - Builds and shows an expression string and evaluates safely.
  - Keyboard support.
  - Handles percent (%) by converting N% -> (N/100).
  - Limits precision and display length.
*/

const exprEl = document.getElementById('expr');
const valueEl = document.getElementById('value');
const buttons = document.querySelectorAll('.btn');

let expression = '';   // expression shown in small line
let lastResult = null; // numeric last computed result
let justEvaluated = false;

// helper: update UI
function render(){
  exprEl.textContent = expression || '\u00A0'; // non-breaking space if empty
  valueEl.textContent = formatDisplay(computePreview());
}

// compute preview: try to evaluate expression partially to show current value without committing
function computePreview(){
  if(!expression) return '0';
  // If expression ends with operator (except % and ')'), show the last number
  const endsOp = /[+\-*/]$/;
  if(endsOp.test(expression)) {
    return safeEval(expression.slice(0, -1)) ?? expression;
  }
  // attempt evaluate
  const val = safeEval(expression);
  return (val===null) ? expression : val;
}

// sanitize and evaluate safely
function safeEval(expr){
  if(!expr || typeof expr !== 'string') return null;
  // allow digits, parentheses, dot, operators, percent, whitespace
  // replace Unicode math symbols to JS operators
  expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');

  // convert percentages: replace occurrences like 50% or (25+5)% with ( ... / 100 )
  // Safe approach: replace any "<something>%" with "(<something>/100)"
  // Use a loop to handle nested percentages correctly
  let prev;
  do {
    prev = expr;
    expr = expr.replace(/(\d+(\.\d+)?|\([^()]*\))%/g, '($1/100)');
  } while(expr !== prev);

  // final validation: allow only digits, operators, parentheses, dot, slash, whitespace
  if(!/^[0-9+\-*/().\s%]+$/.test(expr)) return null;

  try {
    // use Function to evaluate in a safer scope than eval
    // Protect against very large numbers and Infinity
    const val = Function('"use strict"; return (' + expr + ')')();
    if(typeof val === 'number' && isFinite(val)) {
      // limit precision to 12 significant digits to avoid floating noise
      return roundToSignificant(val, 12).toString();
    } else {
      return null;
    }
  } catch(e){
    return null;
  }
}

function roundToSignificant(n, sig){
  if(n === 0) return 0;
  const mult = Math.pow(10, sig - Math.ceil(Math.log10(Math.abs(n))));
  return Math.round(n * mult) / mult;
}

function formatDisplay(v){
  if(v === null) return 'Error';
  // If it's a numeric-looking string, format it with commas for readability, but keep decimals untouched
  if(typeof v === 'string' && /^[+-]?\d+(\.\d+)?$/.test(v)){
    const [intp, decp] = v.split('.');
    const withCommas = intp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decp ? `${withCommas}.${decp}` : withCommas;
  }
  return v.toString();
}

// button handling
function handleInput(token){
  if(token === 'clear'){
    expression = '';
    lastResult = null;
    justEvaluated = false;
    render();
    return;
  }
  if(token === 'back'){
    if(justEvaluated){
      // if just evaluated, back clears last result state
      expression = '';
      justEvaluated = false;
      render();
      return;
    }
    expression = expression.slice(0,-1);
    render();
    return;
  }
  if(token === '='){
    const result = safeEval(expression);
    if(result === null){
      valueEl.textContent = 'Error';
      justEvaluated = true;
      return;
    }
    // commit
    lastResult = result;
    expression = String(result);
    justEvaluated = true;
    render();
    return;
  }

  // numeric or operator or dot or percent
  const isOperator = ['+','-','*','/'].includes(token);
  const isDigit = /^[0-9]$/.test(token);

  if(justEvaluated){
    // If user starts typing a digit after evaluation, start new expression
    if(isDigit || token === '.'){
      expression = token === '.' ? '0.' : token;
      justEvaluated = false;
      render();
      return;
    }
    // If user continues with an operator, allow chaining: e.g. result + 5
    if(isOperator){
      expression = String(lastResult) + token;
      justEvaluated = false;
      render();
      return;
    }
    // percent after result
    if(token === '%'){
      expression = String(lastResult) + '%';
      justEvaluated = false;
      render();
      return;
    }
  }

  // Prevent two operators in a row (except allow unary minus)
  if(isOperator){
    if(expression === '' && token === '-') {
      expression = '-';
      render(); return;
    }
    if(/[+\-*/]$/.test(expression)){
      // replace last operator with new one
      expression = expression.slice(0,-1) + token;
    } else {
      expression += token;
    }
    render();
    return;
  }

  // normal append
  expression += token;
  render();
}

// wire buttons
buttons.forEach(b=>{
  b.addEventListener('click', ()=> {
    const action = b.dataset.action;
    handleInput(action);
  });
});

// keyboard support
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if(key >= '0' && key <= '9'){ handleInput(key); e.preventDefault(); return; }
  if(key === '.' ) { handleInput('.'); e.preventDefault(); return; }
  if(key === 'Enter' || key === '='){ handleInput('='); e.preventDefault(); return; }
  if(key === 'Backspace'){ handleInput('back'); e.preventDefault(); return; }
  if(key === 'Escape'){ handleInput('clear'); e.preventDefault(); return; }

  if(key === '+' || key === '-' || key === '*' || key === '/'){ handleInput(key); e.preventDefault(); return; }
  if(key === '%'){ handleInput('%'); e.preventDefault(); return; }

  // support numeric keypad keys
  const numpadMap = {
    'NumpadAdd': '+', 'NumpadSubtract': '-', 'NumpadMultiply': '*', 'NumpadDivide': '/',
    'NumpadDecimal': '.', 'NumpadEnter': '='
  };
  if(e.code in numpadMap){
    handleInput(numpadMap[e.code]); e.preventDefault(); return;
  }
});

// small accessibility: trap focus on buttons
document.querySelectorAll('.btn').forEach((b,i)=>{
  b.setAttribute('tabindex','0');
});

// initial render
render();
</script>
</body>
</html>
