let cols = c = [];
let formula = f = [];
f.push(Math.random() < .5 ? false : true);
f.push(Math.random() < .5 ? false : true)
f.push(f[0] ? false : true);

function listen(event, cb) {
  return document.addEventListener(event, cb);
}
function getID(el) {
  return document.getElementById(el);
}
function flip() {
  return Math.random() < .5 ? true : false;
}

listen('DOMContentLoaded', function() {
  console.log('hello truth.js');

  let not = f[0] ? 'A' : 'B';
  let op  = f[1] ? '&&' : '||';

  cols[0] = getID('not');
  cols[0].n1 = getID('n1');
  cols[0].n2 = getID('n2');
  cols[0].n3 = getID('n3');
  cols[0].n4 = getID('n4');

  cols[1] = getID('combine');
  cols[1].f1 = getID('f1');
  cols[1].f2 = getID('f2');
  cols[1].f3 = getID('f3');
  cols[1].f4 = getID('f4');
  //cols[2] = getID('hellmode');

  // get random headers
  ((el, str) => {
    el.innerText = str;
  })(cols[0].children[0], '!' + not);

  ((el) => {
    var a = not === 'A' ? '!A' : 'A';
    var b = not === 'B' ? '!B' : 'B';
    el.innerText = a + ' ' + op + ' ' + b;
  })(cols[1].children[0]);

  listen('touchend', onTouchEndOrMouseUp);
  listen('mouseup', onTouchEndOrMouseUp);
});

function onTouchEndOrMouseUp(event) {
  event.preventDefault();
  if (event.target.id === 'submit') onSubmit();
  if (!(event.target.dataset.type === 'toggle')) return;
  toggleCell(event.target);
}
function toggleCell(c) {
  if (c.innerText !== 'true') {
    c.innerText = 'true';
  } else {
    c.innerText = 'false';
} }
function onSubmit() {
  /* remove the wrongness */
  for (let i=0; i<cols[0].children.length; i++) {
    cols[0].children[i].classList.remove('wrong');
  }
  for (let i=0; i<cols[1].children.length; i++) {
    cols[1].children[i].classList.remove('wrong');
  }
  /* boolean up the values */
  let n1 = cols[0].n1.innerText;
  if (n1 !== '--') n1 = (n1 === 'true');
  let n2 = cols[0].n2.innerText;
  if (n2 !== '--') n2 = (n2 === 'true');
  let n3 = cols[0].n3.innerText;
  if (n3 !== '--') n3 = (n3 === 'true');
  let n4 = cols[0].n4.innerText;
  if (n4 !== '--') n4 = (n4 === 'true');
  let f1 = cols[1].f1.innerText;
  if (f1 !== '--') f1 = (f1 === 'true');
  let f2 = cols[1].f2.innerText;
  if (f2 !== '--') f2 = (f2 === 'true');
  let f3 = cols[1].f3.innerText;
  if (f3 !== '--') f3 = (f3 === 'true');
  let f4 = cols[1].f4.innerText;
  if (f4 !== '--') f4 = (f4 === 'true');
  /* check every cell individually */
  if (n1 === '--'
     || f[0] && n1 !== f[0]
     || f[2] && n1 !== f[2]) {
    cols[0].n1.classList.add('wrong');
    cols[0].n1.innerText = '--';
  }
  if (n2 === '--'
     || f[0] && n2 !== f[0]
     || f[2] && n2 === f[2]) {
    cols[0].n2.classList.add('wrong');
    cols[0].n2.innerText = '--';
  }
  if (n3 === '--'
     || f[0] && n3 === f[0]
     || f[2] && n3 !== f[2]) {
    cols[0].n3.classList.add('wrong');
    cols[0].n3.innerText = '--';
  }
  if (n4 === '--'
     || f[0] && n4 === f[0]
     || f[2] && n4 === f[2]) {
    cols[0].n4.classList.add('wrong');
    cols[0].n4.innerText = '--';
  }
  if (f1 === '--'
     || (f[0] && f1 !== f[0] || f[1])
     || (f[2] && f1 === f[2] || f[1])) {
    cols[1].f1.classList.add('wrong');
    cols[1].f1.innerText = '--';
  }
}
