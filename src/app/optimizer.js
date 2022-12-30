import { permute } from "../lib/helper_functions.js";
import { InputData } from "./classes.js";
import { ShotChangeMap } from "./memory.js";
import { Prices, rateCostOfActorIdle } from "./rate.js";

export const prices = new Prices(4, 7, 2);

class Best {
  /**
   * 
   * @param {!Shot[]} shotlist 
   * @param {?number} switchCosts 
   * @param {?number} idleCosts 
   */
  constructor(shotlist, switchCosts, idleCosts) {
    this.shots = shotlist.map(s => s.copy());
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

  function ratePermutation(shots) {
    const rating = rateShotList(shots, prices, shotChangeMap, best.totalCosts);
    if (rating < best.totalCosts) {
      const switchCosts = calculateCostOfShotChanges(shots, shotChangeMap, Infinity);
      best = new Best(shots, switchCosts, rating - switchCosts);
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
