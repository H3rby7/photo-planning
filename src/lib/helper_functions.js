/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

/**
 * Apply a function to all possible permutations
 * 
 * @param {any[]} inputArr
 * @param {action} action the function
 * 
 */
export function permute(inputArr, action) {
  var length = inputArr.length,
      c = new Array(length).fill(0),
      i = 1, k, p;
  action(inputArr.slice());

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = inputArr[i];
      inputArr[i] = inputArr[k];
      inputArr[k] = p;
      ++c[i];
      i = 1;
      action(inputArr.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
}