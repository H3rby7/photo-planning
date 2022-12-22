import { Shot } from "./classes.js";
import { Rules } from "./rules.js";

/**
 * @param {!Shot[]} shots
 * @param {!Prices} prices
 * 
 * @returns {!number} Total price, where low is more efficient
 */
export function rateShotList(shots, prices) {
  if (shots.length < 2) {
    console.warn("Need at least two shots on the shotlist!");
    return 0;
  }
  let totalCost = 0;
  for(let i = 0; i < shots.length - 1; i++) {
    // Set Shot A and B
    const a = shots[i];
    const b = shots[i + 1];
    totalCost += rateShotChange(a, b, prices);
  }
  return totalCost;
}

/**
 * 
 * @param {!Shot} a 
 * @param {!Shot} b 
 * @param {!Prices} prices
 * 
 * @returns {!number} Price for this one change, where low is more efficient
 */
export function rateShotChange(a, b, prices) {
  // Calculate highest cost
  let highestCost = 0;
  if (highestCost < prices.locationChange && Rules.locationChange(a, b)) {
    highestCost = prices.locationChange;
  }
  if (highestCost < prices.actorGetsChanged && Rules.actorNeedsChange(a, b)) {
    highestCost = prices.actorGetsChanged;
  }
  // Add highest cost of this shot change
  return highestCost;
}

export class Prices {
  /**
   * 
   * @param {!number} locationChange 
   * @param {!number} actorGetsChanged 
   */
  constructor(locationChange, actorGetsChanged) {
    this.locationChange = locationChange;
    this.actorGetsChanged = actorGetsChanged;
  }
}