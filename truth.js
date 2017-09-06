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
    ['ff', 'e1', undefined],
    ['ff', 'n1', undefined],
    ['ff', 'm1', undefined],
    ['ff', 'h1', undefined],
    ['ft', 'e2', undefined],
    ['ft', 'n2', undefined],
    ['ft', 'm2', undefined],
    ['ft', 'h2', undefined],
    ['tf', 'e3', undefined],
    ['tf', 'n3', undefined],
    ['tf', 'm3', undefined],
    ['tf', 'h3', undefined],
    ['tt', 'e4', undefined],
    ['tt', 'n4', undefined],
    ['tt', 'm4', undefined],
    ['tt', 'h4', undefined],
  ];
  x.seedCells = [
    'a1', 'a2', 'a3', 'a4',
    'b1', 'b2', 'b3', 'b4',
  ];
  x.scoreCell = 'aS';
  x.streak = 0;
  x.errors = 0;
  x.level = 0;
  x.th = {};
  x.th.easy = null;
  x.th.medium = null;
  x.th.hard = null;
  x.th.not = null;
  x.th.bind = function() {
    x.th.easy = getID('easyH');
    x.th.medium = getID('mediumH');
    x.th.hard = getID('hardH');
    x.th.not = getID('notH');
  }
  x.th.write = function() {
    let e = 'A ' + x.formula.op1 + ' B';
    let m = (x.formula.n1 === 'A' ? '!' : '')
            + 'A ' + x.formula.op1 + ' '
            + (x.formula.n1 === 'B' ? '!' : '')
            + 'B';
    let h = (x.formula.n1 === 'A' ? '!' : '')
            + 'A ' + x.formula.op1 + ' '
            + (x.formula.n1 === 'B' ? '!' : '')
            + 'B ' + x.formula.op2
            + (x.formula.n2 ? ' !' : ' ')
            + x.formula.b3;
    let n = '!' + x.formula.n1;
    x.th.easy.innerText = e;
    x.th.medium.innerText = m;
    x.th.hard.innerText = h;
    x.th.not.innerText = n;
  }
  x.body = null;

  listen('DOMContentLoaded', function() {
    // FINISH INITIALIZING STATE
    x.formula.refresh();
    x.th.bind();
    x.th.write();
    x.scoreCell = getID(x.scoreCell);
    x.levelUp();
    for (let i=0; i<x.cells.length; i++) {
      x.cells[i][2] = getID(x.cells[i][1]); }

    listen('touchend', x.onTouchEndOrMouseUp);
    listen('mouseup', x.onTouchEndOrMouseUp);
  });

  // LISTENERS
  x.onTouchEndOrMouseUp = function(event) {
    event.preventDefault();
    if (event.target.dataset.type === 'submit') x.submit();
    if (!(event.target.dataset.type === 'toggle')) return;
    x.toggleCell(event.target);
  }

  // UTILITY
  x.toggleCell = function(c) {
    if (typeof(c) === 'string') c = getID(c);
    c.innerText = c.innerText === 'true' ? 'false' : 'true';
  };
  x.submit = function() {
    let winner = true;
    /* remove the wrongness */
    for (let i=0; i<x.cells.length; i++) {
      x.cells[i][2].classList.remove('wrong'); }
    /* check every cell individually */
    for (let i=0; i<x.cells.length; i++) {
      if (!x.checkAndUpdate(x.cells[i])) {
        winner = false;
        console.log(x.cells[i] + ' is not a good cell');
      }
    }
    if (winner) {
      x.victoryFlash();
      setTimeout(x.levelUp, 600);
      setTimeout(x.resetCells, 600);
    }
  };
  x.checkAndUpdate = function(c) {
    if (x.level >1 && c[1][0] === 'e') return true;
    if ((x.level<2 || x.level>3)
      && (c[1][0] === 'n' || c[1][0] === 'm')) {
      return true; }
    if (x.level <4 && c[1][0] === 'h') return true;
    let val = c[2].innerText === 'true' ? true : false;
    let a = c[0][0] === 't' ? true : false;
    let b = c[0][1] === 't' ? true : false;
    let f = '';
    function badCell(el) {
      el.innerText = '--';
      el.classList.add('wrong');
    }
    if (c[2].innerText === '--') {
      badCell(c[2]); return false;
    } else if (c[1][0] === 'e') {
      f = (a + x.formula.op1 + b);
      console.log(f);
      if (eval(f) !== val) { badCell(c[2]); return false; }
    } else if (c[1][0] === 'n') {
      f = '!' + (x.formula.n1 === 'A' ? a : b);
      if (eval(f) !== val) { badCell(c[2]); return false; }
    } else if (c[1][0] === 'm') {
      a = (x.formula.n1 === 'A' ? '!' : '') + a;
      b = (x.formula.n1 === 'B' ? '!' : '') + b;
      f = a + x.formula.op1 + b;
      if (eval(f) !== val) { badCell(c[2]); return false; }
    } else if (c[1][0] === 'h') {
      f += ((x.formula.n1 === 'A' ? '!' : '') + a);
      f += x.formula.op1;
      f += ((x.formula.n1 === 'B' ? '!' : '') + b);
      f += x.formula.op2;
      f += (x.formula.n2 ? '!' : '');
      f += (x.formula.b3 === 'A' ? a : b);
      console.log(f);
      if (eval(f) !== val) { badCell(c[2]); return false; }
    } else { console.log('checker busted for ' + c); }
    return true;
  }
  x.victoryFlash = function() {
    let count = 0;
    let body = document.body;
    let foo = document.getElementsByTagName('p');
    let t = window.setInterval(() => {
      if (count % 2 === 0) {
        body.style.backgroundColor = 'darkblue';
        body.style.color = 'lightblue';
        for (let i=0; i<foo.length; i++) {
          foo[i].style.borderColor = 'lightblue';
        }
      } else {
        body.style.backgroundColor = 'lightblue';
        body.style.color = 'darkblue';
        for (let i=0; i<foo.length; i++) {
          foo[i].style.borderColor = 'darkblue';
        }
      }
      if (count > 4) window.clearInterval(t);
      count += 1;
    }, 100);
  }
  x.levelUp = function() {
    let e = getID('easy');
    let n = getID('not');
    let m = getID('medium');
    let h = getID('hard');
    x.level += 1;

    if (x.level > 6) {
      let t = getID('table');
      let w = document.createElement('h1');
      w.style.marginTop = '1em';
      w.innerText = "YOU WIN!";
      x.victoryFlash();
      setTimeout(() => {
        t.replaceWith(w);
      }, 600);
    } else {
      x.scoreCell.innerText = 'Level ' + x.level;
    }
    if (x.level === 2) {
      e.style.display = 'none'
      n.style.display = 'inline-block';
      m.style.display = 'inline-block';
    }
    if (x.level === 4) {
      n.style.display = 'none';
      m.style.display = 'none';
      h.style.display = 'inline-block';
    }
    x.formula.refresh();
    x.th.write();
  }
  x.resetCells = function() {
    for (let i=0; i<x.cells.length; i++) {
      x.cells[i][2].innerText = '--'; }
  }
})(this.truth = {});
