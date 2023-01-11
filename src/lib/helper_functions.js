export class PermutationState {
  
  /**
   * @see permute function arguments
   * 
   * @param {!any[]} inputArr as used in @see permute
   * @param {!number[]} c as used in @see permute
   * @param {!number} i as used in @see permute
   * @param {!number} k as used in @see permute
   */
  constructor (inputArr, c, i, k) {
    this.inputArr = inputArr;
    this.c = c;
    this.i = i;
    this.k = k;
  }
}


/**
 * ForEach callback for @see permute
 *
 * @callback permuteForEachCallback
 * @param {any[]} permutation The mutable array reordered in the current permutation
 * @param {any} elementA The element that changed position with elementB in this iteration
 * @param {any} elementB The element that changed position with elementA in this iteration
 */

/**
 * Update hook for @see permute
 *
 * @callback permuteUpdateHook
 * @param {PermutationState} currentState of the ongoing permutation
 */

/**
 * Apply a function to all possible permutations
 * 
 * @param {any[]} inputArr
 * @param {permuteForEachCallback} cb the function to execute for each permutation cycle
 * @param {permuteUpdateHook} updateHook hook to "inform" invoking function every 10 MIO iterations
 * @param {?PermutationState} savedState state from a previous run
 */
export function permute(inputArr, cb, updateHook, savedState) {
  let lastUpdateSince = 0;
  let c, i, k, p;
  const length = inputArr.length;
  if (savedState) {
    if (length !== savedState.c.length) {
      throw "Loaded state is of different array size!";
    }
    c = savedState.c;
    i = savedState.i;
    k = savedState.k;
  } else {
    c = new Array(length).fill(0);
    i = 1;
  }
  cb(inputArr);

  while (i < length) {
    lastUpdateSince++;
    if (lastUpdateSince === 10000000) {
      updateHook(new PermutationState([...inputArr], [...c], i, k));
      lastUpdateSince = 0;
    }
    if (c[i] < i) {
      // calculate k
      k = i % 2 && c[i];
      // switch [i] and [k]
      p = inputArr[i];
      inputArr[i] = inputArr[k];
      inputArr[k] = p;
      // calculate next pos
      ++c[i];
      i = 1;
      cb(inputArr, inputArr[i], inputArr[k]);
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

/**
 * Check the Object to have a property and throws if encountering an error.
 * 
 * @param {string} parent Identifier for the throwing class or method
 * @param {!Object} json The object to be checked
 * @param {!string} key The key to check for 
 * @param {?boolean} mustBeArray Also check if the value of the key is an array?
 * 
 * @throws {string} An error if a check fails
 */
export function checkJsonMissesProperty(parent, json, key, mustBeArray) {
  if (!json[key]) {
    err(`'${JSON.stringify(json)}' must define '${key}'`);
  }
  if (mustBeArray && !Array.isArray(json[key])) {
    err(`'${key}' must be an array, but is '${json[key]}'`);
  }

  function err(msg) {
    throw `Unmarshalling-Error in class ${parent.toUpperCase()}: ${msg}`;
  }
}