import { PermutationState, permute } from "../lib/helper_functions.js";
import { InputData, Shot, Best } from "./classes.js";
import { ShotChangeMap } from "./memory.js";
import { Prices, rateCostOfActorIdle } from "./rate.js";
import { OptimizationState } from "./saveLoad.js";

const locationChangePrice = 4;
const costumeChangePrice = 7;
const actorIdlePrice = 2;

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
  const startTime = Date.now();
  console.log(`Started at ${new Date(startTime).toLocaleTimeString()}`);

  const shotChangeMap = new ShotChangeMap();
  shotChangeMap.addShotList(inputData.shots, prices);

  // try if we have a saved state we can work with.
  const loadedState = OptimizationState.attemptLoadProgress(filePath);
  let best = loadedState ? loadedState.best : new Best([]);

  console.log(`Starting to permute`);
  permute(inputData.shots, ratePermutation, handleUpdate, loadedState ? loadedState.permutationState : null);

  console.log("********** RESULT **********");
  const finishTime = Date.now(); 
  const timeTaken = finishTime - startTime;
  console.log(`Took ${timeTaken} millis and ended at at ${new Date(finishTime).toLocaleTimeString()}`);
  best.print();
  console.log(best.shots);
  OptimizationState.clearProgress(filePath);

  /**
   * 
   * @param {!Shot[]} shots 
   */
  function ratePermutation(shots) {
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
