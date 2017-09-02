let notDiv = undefined;
let combineDiv = undefined;

let a = [0, 0, 1, 1];
let b = [0, 1, 0, 1];

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello main.js');

  notDiv = document.getElementById('not');
  combineDiv = document.getElementById('combine');

  // generate ! column
  (function generateNotColumn() {
    console.log('generating ! column');
    let d = document.createElement('div');
    d.classList.add('column');
    d.id = "not";
    let h = document.createElement('p');
    h.classList.add('th');
    let v1 = document.createElement('p');
    let v2 = document.createElement('p');
    let v3 = document.createElement('p');
    let v4 = document.createElement('p');

    let n = Math.random() >= .5 ? 'a' : 'b';
    console.log(n);
    h.innerText = n === 'a' ? '!A' : '!B';
    v1.innerText = n === 'a' ? 'true' : 'true';
    v2.innerText = n === 'a' ? 'true' : 'false';
    v3.innerText = n === 'a' ? 'false' : 'true';
    v4.innerText = n === 'a' ? 'false' : 'false';

    d.append(h);
    d.append(v1);
    d.append(v2);
    d.append(v3);
    d.append(v4);
    notDiv.replaceWith(d);

  })();
});
