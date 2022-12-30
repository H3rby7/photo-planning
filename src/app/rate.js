import { Shot } from "./classes.js";
import { ActorIdle } from "./memory.js";
import { Rules } from "./rules.js";

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
export function rateCostOfActorIdle(shotList, prices, maximum) {
  // Create a Map of Actors (key) and their scenes (value; shots as number[])
  const shotsByActorMap = {};
  let totalCosts = 0;
  for (let i = 0; i < shotList.length; i++) {
    for (const a in shotList[i].costumeByPeople) {
      const lastShot = shotsByActorMap[a];
      if (lastShot || lastShot === 0) {
        // price per "idle" shot
        // we subtract '1', because two consecutive shots have no idle time :)
        totalCosts += prices.actorIsPresent * ((i - lastShot) - 1);
        if (totalCosts >= maximum) {
          return totalCosts;
        }
      }
      shotsByActorMap[a] = i;
    }
  }
  return totalCosts;
}

/**
 * 
 * @param {!Shot[]} shotList
 * @param {!ActorIdle[]} actorIdles of all actors that need updating
 * 
 */
export function updateIdlesByActor(shotList, actorIdles) {
  const actors = actorIdles.map(a => a.actorName);
  actorIdles.forEach(a => {
    a.idles = 0;
    delete a.firstShot;
    delete a.lastShot;
  });
  const shotsByActorMap = {};
  for (let i = 0; i < shotList.length; i++) {
    const peopleInShot = Object.keys(shotList[i].costumeByPeople).filter(p => actors.includes(p));
    for (const a in peopleInShot) {
      const actorName = peopleInShot[a];
      const lastShot = shotsByActorMap[actorName];
      const actorIdle = actorIdles.find(a => a.actorName === actorName);
      if (lastShot || lastShot === 0) {
        // there was a 'lastShot'
        // price per "idle" shot
        // we subtract '1', because two consecutive shots have no idle time :)
        actorIdle.idles += ((i - lastShot) - 1);
      } else {
        // it is the first shot of this actor
        actorIdle.firstShot = i;
      }
      actorIdle.lastShot = i;
      shotsByActorMap[actorName] = i;
    }
  }
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

export class RatingConditions {
  /**
   * 
   * @param {!Prices} prices 
   * @param {?number} maximumCosts 
   */
  constructor(prices, maximumCosts) {
    this.prices = prices;
    this.maximumCosts = maximumCosts ? maximumCosts : Infinity;
  }
}
