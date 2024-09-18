
// teste
// let a = [[2,3,1],
//   [4,7,3],
//   [1,1,20]];
//
// let b = [9, 
//   19, 
//   8]

/**
 * @param {Number} la
 * @param {Number} lb
 * @returns Number
 */
function mult(la, lb) {
  return -lb / la;
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
  * @returns {[Matrix, Matrix, Vector] | null}
  */
function lu(a, b) {

  // menor numero de linhas do que de coeficientes = impossivel de se resolver
  if (a[0].length < a.length) {
    return null;
  }

  let n = a[0].length;

  /**
   * @type {Array<Array<Number>>} u
   */
  let u = Array.from(Array(a.length), () => new Array(a[0].length).fill(0));

  for (let i = 0; i < n; i++) {
    u[i][i] = 1;
  }

  // itera por cada pivot definido por a[i][i]
  for (let i = 0; i < 3; i++) {

    let la = a[i][i]; // pivot

    // em seguida iterar coluna abaixo e encontra os multiplicadores de cada
    // linha para que zerem cada coeficientes.

    for (let j = i+1; j < 3; j++) {
      let m = mult(la, a[j][i]);

      // multiplica cada elemento da linha do pivot pelo multiplicador e subtrai
      // pela linha do coeficiente
      a[j][0] += m * a[i][0];
      a[j][1] += m * a[i][1];
      a[j][2] += m * a[i][2];

      // fazer o mesmo para os termos. isso trata a & b como matriz aumentada.
      b[j] += m * b[i];

      // salvar multiplicador na matriz u 
      u[j][i] = m;
    }
  }

  // forma triangular obtida. hora de descobrir as incognitas.

  // array onde cada posição do elemento corresponde a uma incognita.
  let x = new Array(n).fill(0);

  // para encontrar a incognita isolada de cada linha precisamos somar o calculo 
  // de todos as incognitas que já sabemos ao termo independente e dividir 
  // este resultado pelo fator da incognita que estamos procurando.
  // em uma matriz triangular o elemento mais a esquerda sempre será o fator da 
  // incognita que desejamos. todos os outros elementos da linha de 'a' 
  // são variáveis que já sabemos o valor.

  // começamos por baixo e seguimos para cima para que a cada resultado salvo
  // possamos subistiuir na mesma posição acima como coeficiente encontrado.
  for (let i = n-1; i >= 0; i--) {

    // somar das variáveis descobertas.
    let sum = 0;
    for (let j = n-1; j > i; j--) {
      sum += a[i][j] * x[j];
    }
    // encontra a incognita
    x[i] = (b[i] /* termo */ - sum /* soma */) / a[i][i] /* fator */;
  }

  let l = a;

  return [l, u, x];
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

  console.log(a);

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
  let [l, u, x] = ret;

  let resultado = document.querySelector('#resultado');
  if (resultado == null) {
    throw 'resultado';
  }

  resultado.textContent = x.toString();
}

