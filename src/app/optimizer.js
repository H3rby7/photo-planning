import { PermutationState, permute } from "../lib/helper_functions.js";
import { InputData, Shot, Best } from "./classes.js";
import { groupShots } from "./grouping.js";
import { ShotChangeMap } from "./memory.js";
import { Prices, rateCostOfActorIdle } from "./rate.js";
import { OptimizationState } from "./saveLoad.js";

const locationChangePrice = 5;
const costumeChangePrice = 3;
const actorIdlePrice = 1;

export const prices = new Prices(locationChangePrice, costumeChangePrice, actorIdlePrice);

/**
 * @param {!InputData} inputData containing the photoshooting infos
 * @param {!string} filePath of the json file that was loaded. Needed to create temporary save files.
 */
export function optimizeShotList(inputData, filePath) {
  if (!inputData) {
    alert("Please load a file!");
    return;
  }
  if (!filePath) {
    alert("Please pass a filePath to store updates!");
    return;
  }

  let best;

  // try if we have a saved state we can work with.
  const loadedState = OptimizationState.attemptLoadProgress(filePath);
  if (!loadedState) {
    prepareShotList(inputData);
    best = new Best([]);
  } else {
    best = loadedState.best;
  }
  const shots = loadedState ? loadedState.permutationState.inputArr : inputData.shots;
  console.log(`Working with ${JSON.stringify(shots)}`);

  const startTime = Date.now();
  console.log(`Started at ${new Date(startTime).toLocaleTimeString()}`);

  const shotChangeMap = new ShotChangeMap();
  shotChangeMap.addShotList(shots, prices);

  console.log(`Starting to permute`);
  permute(shots, ratePermutation, handleUpdate, loadedState ? loadedState.permutationState : null);

  console.log("********** RESULT **********");
  const finishTime = Date.now(); 
  const timeTaken = finishTime - startTime;
  console.log(`Took ${timeTaken} millis and ended at at ${new Date(finishTime).toLocaleTimeString()}`);
  best.print();
  console.log(best.shots);
  new OptimizationState(null, best).saveResult(filePath);
  OptimizationState.clearProgress(filePath);

  /**
   * 
   * @param {!Shot[]} shots 
   */
  function ratePermutation(shots) {
    if (inverseIsSmaller(shots)) {
      // We do not need to check 'mirrored' setups.
      // So we only calculate the 'smaller' side of the mirror.
      return;
    }
    const rating = rateShotList(shots, prices, shotChangeMap, best.totalCosts);
    if (rating < best.totalCosts) {
      const switchCosts = calculateCostOfShotChanges(shots, shotChangeMap, Infinity);
      best = new Best(shots.map(s => s.shotName), switchCosts, rating - switchCosts);
      best.print();
    }
  }

  /**
   * 
   * @param {PermutationState} permutationState 
   */
  function handleUpdate(permutationState) {
    best.print();
    new OptimizationState(permutationState, best).saveToFile(filePath);
  }

}

/**
 * 
 * @param {!Shot[]} shots
 * @param {!ShotChangeMap} shotChangeMap
 * @param {!number} maximum maximum costs, if we get higher inside a loop we can abort.
 * 
 * @returns {!number} Price for shot changes, low = more efficient.
 */
function calculateCostOfShotChanges(shots, shotChangeMap, maximum) {
  let totalCosts = 0;
  for(let i = 0; i < shots.length - 1; i++) {
    totalCosts += shotChangeMap.getCostChange(shots[i], shots[i + 1]);
    if (totalCosts >= maximum) {
      return totalCosts;
    }
  }
  return totalCosts;
}

/**
 * @param {!Shot[]} shots
 * @param {!Prices} prices
 * @param {!ShotChangeMap} shotChangeMap
 * @param {!number} maximum maximum costs, if we get higher inside a loop we can abort.
 * 
 * @returns {!number} Total price, where low is more efficient
 */
export function rateShotList(shots, prices, shotChangeMap, maximum) {
  let totalCosts = 0;
  // Cost for Shot Changes
  totalCosts += calculateCostOfShotChanges(shots, shotChangeMap, maximum);
  if (totalCosts >= maximum) {
    return totalCosts;
  }
  // Cost for Idle time of actors
  totalCosts += rateCostOfActorIdle(shots, prices, maximum - totalCosts);
  return totalCosts;
}

/**
 * Run some optimizations to improve the data for the algorithm
 * 
 * @param {!InputData} inputData containing the photoshooting infos
 */
function prepareShotList(inputData) {
  console.log(`# of shots before grouping: ${inputData.shots.length}`);
  inputData.shots = groupShots(inputData.shots);
  console.log(`# of shots after grouping: ${inputData.shots.length}`);
  inputData.shots.sort((a, b) => a.characters.length > b.characters.length);
}

/**
 * Check if the inverse of the shot order is 'lexiographically' smaller.
 * By checking the shot's ID.
 * E.G. (using numerical IDs) [3,2,4,1]'s inverse is [1,4,2,3] and lexically smaller.
 * 
 * @param {!Shot[]} shots
 */
function inverseIsSmaller(shots) {
  return shots[shots.length - 1].id < shots[0].id;
}