/**
 * ForEach callback for @see permute
 *
 * @callback permuteForEachCallback
 * @param {!any[]} permutation The mutable array reordered in the current permutation
 * @param {...number} changedIndices The indices of the elements, that changed positions, in this iteration
 */

/**
 * Update hook for @see permute
 *
 * @callback functionWithNoArgs
 */

/**
 * Apply a function to all possible permutations
 * 
 * @param {!any[]} inputArr
 * @param {!permuteForEachCallback} cb the function to execute for each permutation cycle
 * @param {!functionWithNoArgs} updateHook hook to "inform" invoking function every 10 MIO iterations
 * 
 */
export function permute(inputArr, cb, updateHook) {
  let lastUpdateSince = 0;

  var length = inputArr.length,
      c = new Array(length).fill(0),
      i = 1, k, p;
  cb(inputArr, ...Object.keys(inputArr).map(k => parseInt(k, 10)));

  while (i < length) {
    lastUpdateSince++;
    if (lastUpdateSince === 10000000) {
      updateHook();
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
      cb(inputArr, i, k);
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