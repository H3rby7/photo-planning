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
export function permute(inputArr, action, updateHook) {
  let lastUpdateSince = 0;

  var length = inputArr.length,
      c = new Array(length).fill(0),
      i = 1, k, p;
  action(inputArr.slice());

  while (i < length) {
    lastUpdateSince++;
    if (lastUpdateSince === 10000000) {
      updateHook();
      lastUpdateSince = 0;
    }
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