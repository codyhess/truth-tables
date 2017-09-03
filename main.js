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

  let not = Math.random < .5 ? 'A' : 'B';
  let op = Math.random < .5 ? '&&' : '||';

  cols[0] = getID('not');
  cols[1] = getID('combine');
  cols[2] = getID('hellmode');

  // get random headers
  ((el, str) => {
    el.innerText = str;
  })(cols[0].children[0], '!' + not);

  ((el) => {
    var a = not === 'A' ? '!A' : 'A';
    var b = not === 'B' ? '!B' : 'B';
    el.innerText = a + ' ' + op + ' ' + b;
  })(cols[1].children[0]);
});
