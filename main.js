let cols = [];

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

  let not = Math.random() < .5 ? 'A' : 'B';
  console.log(not);
  let op = Math.random() < .5 ? '&&' : '||';

  cols[0] = getID('not');
  cols[1] = getID('combine');
  cols[2] = getID('hellmode');
  console.log(not);

  // get random headers
  ((el, str) => {
    el.innerText = str;
  })(cols[0].children[0], '!' + not);
  console.log(not);

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
  if (!(event.target.dataset.type === 'toggle')) return;
  toggleCell(event.target);
}

function toggleCell(c) {
  if (c.innerText !== 'true') {
    c.innerText = 'true';
  } else {
    c.innerText = 'false';
  }
}
