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
  let totalCosts = 0;
  // Cost for Shot Changes
  for(let i = 0; i < shots.length - 1; i++) {
    totalCosts += rateShotChange(shots[i], shots[i + 1], prices);
  }
  // Cost for Idle time of actors
  // TODO
  return totalCosts;
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
  let highestCosts = 0;
  if (highestCosts < prices.locationChange && Rules.locationChange(a, b)) {
    highestCosts = prices.locationChange;
  }
  if (highestCosts < prices.actorGetsChanged && Rules.actorNeedsChange(a, b)) {
    highestCosts = prices.actorGetsChanged;
  }
  // Add highest cost of this shot change
  return highestCosts;
}

/**
 * 
 * @param {!Shot[]} shotList 
 * @param {!Prices} prices 
 */
export function rateCostOfActorIdle(shotList, prices) {
  // Create a Map of Actors (key) and their scenes (value; shots as number[])
  const map = new Map();
  for (let i = 0; i < shotList.length; i++) {
    const actorsInShot = shotList[i].characters.map(c => c.character.person.name);
    actorsInShot.forEach(a => {
      if (!map.has(a)) {
        map.set(a, [i]);
      } else {
        map.get(a).push(i);
      }
    });
  }
  // Use MIN and MAX of array to calculate price
  let totalCosts = 0;
  for (let [_, shots] of map) {
    if (shots.length > 1) {
      shots.sort();
      for (let i = 0; i < shots.length - 1; i++) {
        // price per "idle" shot
        // we subtract '1', because two consecutive shots have no idle time :)
        const idleShots = (shots[i+1] - shots[i]) - 1;
        totalCosts += prices.actorIsPresent * idleShots;
      }
    }
  }
  return totalCosts;
}

export class Prices {
  /**
   * 
   * @param {!number} locationChange 
   * @param {!number} actorGetsChanged 
   * @param {!number} actorIsPresent
   */
  constructor(locationChange, actorGetsChanged, actorIsPresent) {
    this.locationChange = locationChange;
    this.actorGetsChanged = actorGetsChanged;
    this.actorIsPresent = actorIsPresent;
  }
}