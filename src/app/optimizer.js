import { permute } from "../lib/helper_functions.js";
import { InputData, Shot } from "./classes.js";
import { ActorIdleMap, Memory, ShotChangeMap } from "./memory.js";
import { updateIdlesByActor, Prices, RatingConditions } from "./rate.js";

const locationChangePrice = 4;
const costumeChangePrice = 7;
const actorIdlePrice = 2;

export const prices = new Prices(locationChangePrice, costumeChangePrice, actorIdlePrice);

class Best {
  /**
   * 
   * @param {!Shot[]} shotlist 
   * @param {?number} switchCosts 
   * @param {?number} idleCosts 
   */
  constructor(shotlist, switchCosts, idleCosts) {
    this.shots = shotlist.slice();
    this._setCosts(switchCosts, idleCosts);
  }

  /**
   * 
   * @param {?number} switchCosts 
   * @param {?number} idleCosts 
   */
  _setCosts(switchCosts, idleCosts) {
    let useInfinity = false;
    if (switchCosts || switchCosts === 0) {
      this.switchCosts = switchCosts;
    } else {
      useInfinity = true;
    }
    if (idleCosts || idleCosts === 0) {
      this.idleCosts = idleCosts;
    } else {
      useInfinity = true;
    }
    this.totalCosts = useInfinity ? Infinity : (switchCosts + idleCosts);
  }

  print() {
    console.log(`Idle Costs: ${this.idleCosts}, Switch Costs: ${this.switchCosts}, TOTAL Costs: ${this.totalCosts}.
      \n${JSON.stringify(this.shots.map(s => s.shotName))}`);
  }
}

/**
 * @param {InputData} inputData
 */
export function optimizeShotList(inputData) {
  if (!inputData) {
    alert("Please load a file first!");
    return;
  }
  const startTime = Date.now();
  console.log(`Started at ${new Date(startTime).toLocaleTimeString()}`);

  const shotChangeMap = new ShotChangeMap();
  shotChangeMap.addShotList(inputData.shots, prices);
  console.log(`Calculated ShotChange costs`);
  console.log(shotChangeMap.costs);

  const actorIdleMap = new ActorIdleMap();
  actorIdleMap.initialize(inputData);
  console.log(`Calculated ActorIdle idles`);
  console.log(actorIdleMap);

  const memory = new Memory(shotChangeMap, actorIdleMap);
  const ratingConditions = new RatingConditions(prices, Infinity);

  let best = new Best([]);

  console.log(`Starting to permute`);
  permute(inputData.shots, ratePermutation, () => {
    best.print();
  });

  console.log("********** RESULT **********");
  const finishTime = Date.now(); 
  const timeTaken = finishTime - startTime;
  console.log(`Took ${timeTaken} millis and ended at at ${new Date(finishTime).toLocaleTimeString()}`);
  best.print();
  console.log(best.shots);

  /**
   * 
   * @param {!Shot[]} shots 
   * @param {!number[]} changedIndices 
   */
  function ratePermutation(shots, ...changedIndices) {
    const rating = rateShotList(shots, memory, ratingConditions, changedIndices);
    if (rating < best.totalCosts) {
      const switchCosts = calculateCostOfShotChanges(shots, shotChangeMap, Infinity);
      best = new Best(shots, switchCosts, rating - switchCosts);
      ratingConditions.maximumCosts = best.totalCosts;
      best.print();
    }
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
 * @param {!Memory} memory
 * @param {!RatingConditions} conditions
 * @param {!number[]} changedIndices
 * 
 * @returns {!number} Total price, where low is more efficient
 */
export function rateShotList(shots, memory, conditions, changedIndices) {
  let totalCosts = 0;
  // Cost for Shot Changes
  totalCosts += calculateCostOfShotChanges(shots, memory.shotChangeMap, conditions.maximumCosts);
  if (totalCosts >= conditions.maximumCosts) {
    return totalCosts;
  }
  totalCosts += calculateCostOfIdle(shots, memory, conditions, changedIndices);
  return totalCosts;
}

/**
 * @param {!Shot[]} shots
 * @param {!Memory} memory
 * @param {!RatingConditions} conditions
 * @param {!number[]} changedIndices
 * 
 * @returns {!number} Total price, where low is more efficient
 */
export function calculateCostOfIdle(shots, memory, conditions, changedIndices) {
  changedIndices.sort((a, b) => a - b);
  const lowestChange = changedIndices[0];
  const highestChange = changedIndices[changedIndices.length - 1];
  // Cost for Idle time of actors
  const affectedActors = changedIndices.map(i => shots[i])
    .flatMap(ch => Object.keys(ch.costumeByPeople));
  const idles = memory.actorIdleMap.actorIdles
    .filter(a => affectedActors.includes(a.actorName));
  const affectedIdles = idles.filter(i => isActorIdleAffectedByChange(i, lowestChange, highestChange));
  // TODO: optimize by reducing the shotList length (only go over relevant part)
  updateIdlesByActor(shots, affectedIdles);
  const idlePrice = conditions.prices.actorIsPresent;
  const idleCosts = idlePrice * memory.actorIdleMap.actorIdles
    .map(a => a.idles)
    .reduce((partialSum, a) => partialSum + a, 0);
  return idleCosts;
}

/**
 * 
 * @param {!ActorIdle} idle 
 * @param {!number} lowestChange 
 * @param {!number} highestChange 
 * @returns {boolean}
 */
export function isActorIdleAffectedByChange(idle, lowestChange, highestChange) {
  if (idle.firstShot < lowestChange && idle.lastShot > highestChange) {
    // Changes happen between first and last shot - no change in idle
    return false;
  }
  if (lowestChange < idle.firstShot && idle.lastShot < highestChange) {
    // Changes happen around all of the idle - no change in idle
    return false;
  }
  if (lowestChange <= idle.firstShot && highestChange >= idle.firstShot) {
    // First shot is between low and high
    return true;
  }
  if (lowestChange <= idle.lastShot && highestChange >= idle.lastShot) {
    // Last shot is between low and high
    return true;
  }
  return false;
}