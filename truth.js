(function(exports) {
  // the old stuff
  let cols = c = [];
  let formula = f = [];
  f.push(Math.random() < .5 ? false : true);
  f.push(Math.random() < .5 ? false : true)
  f.push(f[0] ? false : true);

  // CONVENIENCE FUNCTIONS
  function listen(event, cb) {
    return document.addEventListener(event, cb); }
  function getID(el) {
    return document.getElementById(el); }
  function flip() {
    return Math.random() < .5 ? true : false; }

  // STATE VARIABLES
  let x = exports;
  x.seeds = {
    ff: { a: false, b: false },
    ft: { a: false, b: true },
    tf: { a: true, b: false },
    tt: { a: true, b: true }
  }
  x.formula = {
    b1: 'A',
    b2: 'B',
    b3: undefined,
    op1: undefined,
    op2: undefined,
    n1: undefined,
    n2: undefined,
    easy: [],
    medium: [],
    hard: [],
    not: [],
    refresh: () => {
      x.formula.b3  = Math.random() >.5 ? 'A'  : 'B';
      x.formula.op1 = Math.random() >.5 ? '&&' : '||';
      x.formula.op2 = Math.random() >.5 ? '&&' : '||';
      x.formula.n1  = Math.random() >.5 ? 'A'  : 'B';
      x.formula.n2  = Math.random() >.5 ? true : false;
      x.formula.easy = [
        x.formula.b1,
        x.formula.op1,
        x.formula.b2];
      x.formula.medium = [
        x.formula.b1,
        x.formula.op1,
        x.formula.b2,
        x.formula.n1];
      x.formula.hard = [
        x.formula.b1,
        x.formula.op1,
        x.formula.b2,
        x.formula.n1,
        x.formula.op2,
        x.formula.n2,
        x.formula.b3];
      x.formula.not = [
        x.formula.n1];
      return x.formula;
  } };
  x.cells = [
    [x.seeds.ff, 'e1', undefined, x.formula.easy],
    [x.seeds.ff, 'n1', undefined, x.formula.not],
    [x.seeds.ff, 'm1', undefined, x.formula.medium],
    [x.seeds.ff, 'h1', undefined, x.formula.hard],
    [x.seeds.ft, 'e2', undefined, x.formula.easy],
    [x.seeds.ft, 'n2', undefined, x.formula.not],
    [x.seeds.ft, 'm2', undefined, x.formula.medium],
    [x.seeds.ft, 'h2', undefined, x.formula.hard],
    [x.seeds.tf, 'e3', undefined, x.formula.easy],
    [x.seeds.tf, 'n3', undefined, x.formula.not],
    [x.seeds.tf, 'm3', undefined, x.formula.medium],
    [x.seeds.tf, 'h3', undefined, x.formula.hard],
    [x.seeds.tt, 'e4', undefined, x.formula.easy],
    [x.seeds.tt, 'n4', undefined, x.formula.not],
    [x.seeds.tt, 'm4', undefined, x.formula.medium],
    [x.seeds.tt, 'h4', undefined, x.formula.hard],
  ]
  x.streak = 0;
  x.errors = 0;
  x.isEasy = false;

  listen('DOMContentLoaded', function() {
    // FINISH INITIALIZING STATE
    x.formula.refresh();
    for (let i=0; i<x.cells.length; i++) {
      x.cells[i][2] = getID(x.cells[i][1]); }

    listen('touchend', x.onTouchEndOrMouseUp);
    listen('mouseup', x.onTouchEndOrMouseUp);
  });

  // LISTENERS
  x.onTouchEndOrMouseUp = function(event) {
    event.preventDefault();
    if (event.target.id === 'submit') x.submit();
    if (!(event.target.dataset.type === 'toggle')) return;
    x.toggleCell(event.target);
  }

  // UTILITY
  x.toggleCell = function(c) {
    if (typeof(c) === 'string') c = getID(c);
    c.innerText = c.innerText === 'true' ? 'false' : 'true';
  };
  x.submit = function() {
    console.log('submit got called');
    /* remove the wrongness */
    for (let i=0; i<x.cells.length; i++) {
      x.cells[i][2].classList.remove('wrong'); }
    /* check every cell individually */
    for (let i=0; i<x.cells.length; i++) {
      console.log(i);
      x.checkAndUpdate(x.cells[i]);
  } };
  x.checkAndUpdate = function(c) {
    //console.log(c);
    c[2].classList.add('wrong');
  }
})(this.truth = {});
