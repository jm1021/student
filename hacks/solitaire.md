---
layout: base
title: Solitaire
permalink: /solitaire/
---


<!--
Solitaire (Klondike) — single file.
Save as solitaire.md (open in VS Code preview) or solitaire.html (open in browser).
-->

<style>
  :root{
    --card-w: 80px;
    --card-h: 120px;
    --gap: 12px;
    --bg: #0b6623;
  }
  body{
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    margin: 0;
    padding: 20px;
    background: linear-gradient(180deg,#0b6623,#034d12);
    color: #eee;
  }
  h1{margin:0 0 12px 0}
  .board{
    display: grid;
    grid-template-columns: repeat(7, var(--card-w));
    gap: var(--gap);
    align-items: start;
  }
  .row-top{
    display:flex;
    justify-content:space-between;
    gap: var(--gap);
    margin-bottom: 18px;
  }
  .slot{
    width: var(--card-w);
    height: var(--card-h);
    position: relative;
    border-radius: 6px;
    user-select: none;
  }
  .pile{
    min-height: var(--card-h);
    padding-top: 6px;
  }
  .card{
    width: var(--card-w);
    height: var(--card-h);
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.4);
    position: absolute;
    left: 0;
    top:0;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:6px;
    box-sizing:border-box;
    transition: top .12s linear, left .12s linear;
    cursor: pointer;
  }
  .card.face-down{
    background: linear-gradient(180deg,#333,#111);
    color: transparent;
    border: 1px solid rgba(255,255,255,0.05);
    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 6px, transparent 6px 12px);
  }
  .card.face-up{
    background: linear-gradient(180deg,#fff,#f7f7f7);
    color: #000;
  }
  .card .top, .card .bottom{font-weight:700}
  .red{color: #c33}
  .black{color:#111}
  .foundation, .stock, .waste{
    width: var(--card-w);
    height: var(--card-h);
    border-radius:6px;
    position: relative;
  }
  .foundations{
    display:flex; gap:var(--gap);
  }
  .controls{display:flex; gap:12px; align-items:center; margin-bottom: 12px;}
  button{padding:6px 10px; border-radius:6px; border:none; cursor:pointer;}
  .message{margin-left:8px; opacity:0.9;}
  /* stacking in tableau */
  .tableau .card{position:absolute; left:0}
</style>

<h1>Solitaire (Klondike) — demo</h1>
<div class="controls">
  <button id="newBtn">New game</button>
  <button id="autoBtn">Auto-move to foundations</button>
  <div class="message" id="msg">Click stock to deal one card. Click a card to select/move.</div>
</div>

<div class="row-top">
  <div style="display:flex; gap:12px;">
    <div class="stock slot" id="stock"></div>
    <div class="waste slot" id="waste"></div>
  </div>

  <div style="display:flex; gap:12px;">
    <div class="foundations" id="foundations">
      <!-- 4 foundation slots will be injected -->
    </div>
  </div>
</div>

<div class="board" id="tableau">
  <!-- 7 tableau piles will be injected -->
</div>

<script>
/* Simple Klondike Solitaire
   Features implemented:
   - Full deck, shuffle
   - Deal into 7 tableau piles (1..7), one face-up at top of each pile
   - Stock -> deal one to waste
   - Click to pick a face-up card or stack; valid move checks:
     * Move to tableau: descending rank, alternating color
     * Move to foundation: same suit, ascending
   - Flip face-down when uncovered
   - Auto-move button tries to move waste/tableau tops to foundations greedily
   Limitations / simplifications:
   - No undo
   - No drag & drop (click-to-select)
*/

const SUITS = ['♠','♥','♦','♣'];
const RANKS = [null,'A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function makeDeck(){
  const cards = [];
  for(let s=0;s<4;s++){
    for(let r=1;r<=13;r++){
      const color = (SUITS[s]==='♠' || SUITS[s]==='♣') ? 'black' : 'red';
      cards.push({id: `${s}-${r}`, suit: SUITS[s], rank: r, label: RANKS[r], faceUp: false, color});
    }
  }
  return cards;
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const state = {
  stock: [],
  waste: [],
  foundations: [[],[],[],[]], // by suit index mapping: we will map suit order to array index
  tableau: [[],[],[],[],[],[],[]],
  selected: null // {pile: 'tableau'|'waste'|'foundation', idx: number, cardIndex: number}
};

const root = {
  stockEl: document.getElementById('stock'),
  wasteEl: document.getElementById('waste'),
  foundationsEl: document.getElementById('foundations'),
  tableauEl: document.getElementById('tableau'),
  msgEl: document.getElementById('msg')
};

function suitToIndex(suit){
  return SUITS.indexOf(suit);
}

function newGame(){
  const deck = makeDeck();
  shuffle(deck);
  // reset state
  state.stock = deck;
  state.waste = [];
  state.foundations = [[],[],[],[]];
  state.tableau = [[],[],[],[],[],[],[]];
  state.selected = null;

  // deal to tableau
  for(let i=0;i<7;i++){
    for(let j=0;j<=i;j++){
      const c = state.stock.pop();
      c.faceUp = (j===i); // last card face up
      state.tableau[i].push(c);
    }
  }
  render();
}

function clearChildren(el){ while(el.firstChild) el.removeChild(el.firstChild); }

function render(){
  // render stock (show back if not empty)
  clearChildren(root.stockEl);
  if(state.stock.length){
    const back = createCardEl({faceDown:true});
    back.addEventListener('click', onStockClick);
    root.stockEl.appendChild(back);
  } else {
    const slot = document.createElement('div');
    slot.style.width='100%'; slot.style.height='100%'; slot.style.border='2px dashed rgba(255,255,255,0.06)';
    root.stockEl.appendChild(slot);
    root.stockEl.onclick = onStockClick;
  }

  // render waste (top card)
  clearChildren(root.wasteEl);
  if(state.waste.length){
    const top = state.waste[state.waste.length-1];
    const el = createCardEl(top);
    el.addEventListener('click', ()=>onCardClick('waste', 0, state.waste.length-1));
    root.wasteEl.appendChild(el);
  } else {
    root.wasteEl.appendChild(emptySlot());
  }

  // foundations
  clearChildren(root.foundationsEl);
  for(let si=0;si<4;si++){
    const fslot = document.createElement('div');
    fslot.className = 'foundation slot';
    fslot.style.minHeight='var(--card-h)';
    fslot.dataset.index = si;
    fslot.addEventListener('click', ()=>onFoundationClick(si));
    if(state.foundations[si].length){
      const card = state.foundations[si][state.foundations[si].length-1];
      const el = createCardEl(card);
      fslot.appendChild(el);
    } else {
      fslot.appendChild(emptySlot());
    }
    root.foundationsEl.appendChild(fslot);
  }

  // tableau
  clearChildren(root.tableauEl);
  for(let i=0;i<7;i++){
    const pile = document.createElement('div');
    pile.className = 'pile tableau slot';
    pile.dataset.index = i;
    pile.style.height = `calc(var(--card-h) + var(--gap) * 12)`; // allow stacking
    pile.addEventListener('click', (e)=> {
      // click on empty space -> try move selected here
      if(e.target === pile) onTableauClick(i);
    });

    // place cards stacked
    const cards = state.tableau[i];
    for(let ci=0; ci<cards.length; ci++){
      const c = cards[ci];
      const el = createCardEl(c);
      el.style.top = `${ci*24}px`;
      // attach click: selecting this card (which moves its tail)
      el.addEventListener('click', (ev)=> {
        ev.stopPropagation();
        onCardClick('tableau', i, ci);
      });
      pile.appendChild(el);
    }

    // if empty show placeholder
    if(cards.length===0) pile.appendChild(emptySlot());
    root.tableauEl.appendChild(pile);
  }

  showMessage();
}

function createCardEl(cardOrOptions){
  const el = document.createElement('div');
  el.className = 'card';
  if(cardOrOptions && cardOrOptions.faceDown) {
    el.classList.add('face-down'); el.style.position='relative';
    el.innerHTML = '';
    return el;
  }
  const c = cardOrOptions;
  el.classList.add(c.faceUp? 'face-up' : 'face-down');
  if(c.faceUp){
    el.classList.add('face-up');
    el.innerHTML = `<div class="top ${c.color}">${c.label}${c.suit}</div><div class="bottom ${c.color}">${c.suit}${c.label}</div>`;
  }
  return el;
}

function emptySlot(){
  const s = document.createElement('div');
  s.style.width='100%'; s.style.height='100%';
  s.style.border='2px dashed rgba(255,255,255,0.06)';
  s.style.borderRadius='6px';
  return s;
}

function onStockClick(){
  if(state.stock.length){
    // deal one to waste
    const card = state.stock.pop();
    card.faceUp = true;
    state.waste.push(card);
  } else {
    // recycle waste into stock
    while(state.waste.length){
      const c = state.waste.pop();
      c.faceUp = false;
      state.stock.push(c);
    }
  }
  state.selected = null;
  render();
}

function onFoundationClick(idx){
  // clicking foundation will attempt to move selected card here
  if(!state.selected) return;
  const sel = state.selected;
  if(canMoveSelectedToFoundation(sel, idx)){
    moveSelectedToFoundation(sel, idx);
    state.selected = null;
    render();
  }
}

function onTableauClick(idx){
  if(!state.selected) return;
  const sel = state.selected;
  if(canMoveSelectedToTableau(sel, idx)){
    moveSelectedToTableau(sel, idx);
    state.selected = null;
    render();
  }
}

function onCardClick(pileName, pileIndex, cardIndex){
  // If there's currently a selection and clicking the same card -> unselect
  if(state.selected){
    // try intuitive move: if clicked on a different place, we might attempt to move
    // if click same selection, deselect
    if(state.selected.pile===pileName && state.selected.idx===pileIndex && state.selected.cardIndex===cardIndex){
      state.selected = null;
      render();
      return;
    }
  }

  // If clicking on waste or tableau top, either select or attempt to auto-move
  if(pileName==='waste'){
    // selecting top card in waste
    state.selected = {pile:'waste', idx:0, cardIndex: cardIndex};
    // auto-attempt move to foundation first
    if(tryAutoMoveSelectedToFoundation()) return;
  } else if(pileName==='tableau'){
    const cards = state.tableau[pileIndex];
    const card = cards[cardIndex];
    if(!card.faceUp){
      // click face-down => flip if it's topmost
      if(cardIndex === cards.length-1){
        card.faceUp = true;
        render();
      }
      return;
    }
    // select tail starting at cardIndex
    state.selected = {pile:'tableau', idx: pileIndex, cardIndex};
    // attempt auto moves
    if(tryAutoMoveSelectedToFoundation()) return;
  }
  render();
  highlightSelected();
}

function highlightSelected(){
  // visually highlight selected card(s) by adding border
  // We'll add an outline to the selected card and its tail
  clearHighlights();
  if(!state.selected) return;
  const {pile, idx, cardIndex} = state.selected;
  if(pile==='waste'){
    const cEl = root.wasteEl.querySelector('.card');
    if(cEl) cEl.style.boxShadow = '0 0 0 3px rgba(255,255,0,0.5)';
  } else if(pile==='tableau'){
    const pileEl = root.tableauEl.children[idx];
    const cards = pileEl.querySelectorAll('.card');
    for(let i=cardIndex;i<cards.length;i++){
      cards[i].style.boxShadow = '0 0 0 3px rgba(255,255,0,0.5)';
    }
  }
}

function clearHighlights(){
  document.querySelectorAll('.card').forEach(c=> c.style.boxShadow = '');
}

function canMoveSelectedToTableau(sel, destIdx){
  // moving tail from sel to dest tableau pile destIdx
  let movingCards;
  if(sel.pile==='waste') movingCards = [state.waste[state.waste.length-1]];
  else if(sel.pile==='tableau') movingCards = state.tableau[sel.idx].slice(sel.cardIndex);
  else return false;

  const topMoving = movingCards[0];
  const destPile = state.tableau[destIdx];
  if(destPile.length===0){
    // only King can go to empty spot
    return topMoving.rank===13;
  } else {
    const destTop = destPile[destPile.length-1];
    // must be faceUp
    if(!destTop.faceUp) return false;
    // descending rank by 1 and alternating color
    return (destTop.rank === topMoving.rank + 1) && (destTop.color !== topMoving.color);
  }
}

function canMoveSelectedToFoundation(sel, fidx){
  let card;
  if(sel.pile==='waste') card = state.waste[state.waste.length-1];
  else if(sel.pile==='tableau') card = state.tableau[sel.idx][sel.cardIndex];
  else return false;

  const foundation = state.foundations[fidx];
  if(foundation.length===0){
    return card.rank === 1; // only Ace
  } else {
    const top = foundation[foundation.length-1];
    return (top.suit === card.suit) && (card.rank === top.rank + 1);
  }
}

function moveSelectedToFoundation(sel, fidx){
  const card = (sel.pile==='waste') ? state.waste.pop() : state.tableau[sel.idx].splice(sel.cardIndex)[0];
  state.foundations[fidx].push(card);
  // if tableau had a face-down uncovered, flip it
  if(sel.pile==='tableau'){
    const pile = state.tableau[sel.idx];
    if(pile.length && !pile[pile.length-1].faceUp) pile[pile.length-1].faceUp = true;
  }
}

function moveSelectedToTableau(sel, destIdx){
  let moving;
  if(sel.pile==='waste') moving = [state.waste.pop()];
  else moving = state.tableau[sel.idx].splice(sel.cardIndex);
  const dest = state.tableau[destIdx];
  dest.push(...moving);
  // flip uncovered
  if(sel.pile==='tableau'){
    const pile = state.tableau[sel.idx];
    if(pile.length && !pile[pile.length-1].faceUp) pile[pile.length-1].faceUp = true;
  }
}

function tryAutoMoveSelectedToFoundation(){
  // attempt to move selected to any valid foundation automatically (waste prioritized)
  if(!state.selected) return false;
  for(let f=0;f<4;f++){
    if(canMoveSelectedToFoundation(state.selected, f)){
      moveSelectedToFoundation(state.selected, f);
      state.selected = null;
      render();
      return true;
    }
  }
  return false;
}

function onFoundationAutoClick(){ /* placeholder */ }

function showMessage(){
  const remaining = state.stock.length;
  root.msgEl.textContent = `Stock: ${remaining} | Waste: ${state.waste.length} | Foundations: ${state.foundations.map(f=>f.length).join(',')}`;
}

document.getElementById('newBtn').addEventListener('click', ()=> newGame());
document.getElementById('autoBtn').addEventListener('click', ()=>{
  // naive auto move: repeat trying to move waste + tableau tops to foundations until nothing changes
  let changed = true;
  while(changed){
    changed = false;
    // check waste to foundations
    if(state.waste.length){
      for(let f=0; f<4; f++){
        const sel = {pile:'waste', idx:0, cardIndex: state.waste.length-1};
        if(canMoveSelectedToFoundation(sel, f)){
          moveSelectedToFoundation(sel, f); changed = true; break;
        }
      }
      if(changed) continue;
    }
    // check tableau top cards
    for(let t=0;t<7;t++){
      const pile = state.tableau[t];
      if(!pile.length) continue;
      const sel = {pile:'tableau', idx:t, cardIndex: pile.length-1};
      for(let f=0; f<4; f++){
        if(canMoveSelectedToFoundation(sel, f)){
          moveSelectedToFoundation(sel, f); changed = true; break;
        }
      }
      if(changed) break;
    }
  }
  render();
});

newGame();
</script>
