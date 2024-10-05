
// teste
// let a = [[2,3,1],
//   [4,7,3],
//   [1,1,20]];
//
// let b = [9, 
//   19, 
//   8]


// por um erro bobo nomeamos o repositórios de gauss porém o algoritmo
// a seguir implementa o método da decomposição LU.

/**
 * @param {Number} la
 * @param {Number} lb
 * @returns Number
 */
function mult(la, lb) {
  return lb / la;
}

/**
 * @typedef {Array<Array<Number>>} Matrix
 */

/**
 * @typedef {Array<Number>} Vector
 */


/**
  * @param {Array<Array<Number>>} a
  * @param {Array<Number>} b
  * @returns {Matrix | null}
  */
function lu(a, b) {

  // menor numero de linhas do que de coeficientes = impossivel de se resolver
  if (a[0].length < a.length) {
    return null;
  }

  let n = a[0].length;

  /**
   * @type {Array<Array<Number>>} l
   */
  let l = Array.from(Array(a.length), () => new Array(a[0].length).fill(0));

  for (let i = 0; i < n; i++) {
    l[i][i] = 1;
  }

  // itera por cada pivot definido por a[i][i]
  for (let i = 0; i < 3; i++) {

    let la = a[i][i]; // pivot

    // em seguida iterar coluna abaixo e encontra os multiplicadores de cada
    // linha para que zerem cada coeficiente.

    for (let j = i+1; j < 3; j++) {
      let m = mult(la, a[j][i]);

      // multiplica cada elemento da linha do pivot pelo multiplicador e subtrai
      // pela linha do coeficiente
      a[j][0] -= m * a[i][0];
      a[j][1] -= m * a[i][1];
      a[j][2] -= m * a[i][2];

      // salvar multiplicador na matriz u 
      l[j][i] = m;
    }
  }

  l = l;
  let u = a;

  console.log(l);

  // L * y = b
  //
  // já temos 'L' e 'b' e queremos isolar y de cada linha. podemos reescrever esse equação como:
  // Li * yi = bi
  // onde 'i' referencia linhas da matriz.
  // Li * yi pode ser reescrito como:
  // Li1 * y1 + Li2 * y2 + ... + Lii-1 * yii-1 + Lii * yi
  // (note que como estavamos trabalhando com linhas de Li, agora estamos trabalhando com elementos 
  // individuais dessas linhas.)
  // aqui podemos parar em 'Lii-1' pois não sabemos 'yi' e todas as outras incógnitas que vem depois tem fator 0.
  // vamos representar essa soma como: soma + Lii * yi:
  // soma + Lii * yi = bi:
  // isolando 'yi', temos:
  // yi = (bi - soma) / Lii
  // e é essencialmente isso que temos para calcular 'L * y = b' e 'U * x = y'

  let y = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += l[i][j] * y[j];
    }
    y[i] = (b[i] - sum) / l[i][i];
  }

  console.log(y);

  // U * x = y
  let x = new Array(n).fill(0);

  for (let i = n-1; i >= 0; i--) {
    let sum = 0;
    for (let j = n-1; j > i; j--) {
      sum += u[i][j] * x[j];
    }
    x[i] = (y[i] - sum) / u[i][i];
  }

  console.log(x);


  return x;
}

let a = [ [60,30,10], [50,30,20], [70,15,15]];

let b = [ 1180, 1280, 1290]

/**
 * @type {NodeListOf<HTMLInputElement>} boxes
 */
let boxes = document.querySelectorAll('input.box');
if (boxes == null) throw 'input';

/**
 * @type {NodeListOf<HTMLInputElement>} termos
 */
let termos = document.querySelectorAll('input.termo');
if (termos == null) throw 'input.termo';

if (a.length * a[0].length != boxes.length) {
  throw 'mismatch entre tamananho das matrizes e caixas';
}

function defaultBoxes() {
  let flatA = a.flat();
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].value = flatA[i].toString();
  }

  for (let i = 0; i < termos.length; i++) {
    termos[i].value = b[i].toString();
  }
}

defaultBoxes();

function calcular() {
  a = Array.from(Array(a.length), () => new Array(a[0].length).fill(0));
  b = new Array(termos.length).fill(0);

  for (let k = 0; k < boxes.length; k++) {
    let i = Math.floor(k / 3);
    let j = k % a[0].length;
    a[i][j] = parseInt(boxes[k].value);
  }

  for (let i = 0; i < termos.length; i++) {
    b[i] = parseInt(termos[i].value);
  }

  let ret = lu(a, b);
  if (ret == null) {
    throw 'impossivel';
  }
  let x = ret;

  let resultado = document.querySelector('#resultado');
  if (resultado == null) {
    throw 'resultado';
  }

  resultado.textContent = x.toString();
}

