import { Shot } from "./classes.js";
import { Prices, rateShotChange } from "./rate.js";

export class ShotChangeMap {

  costs = {};

  /**
   * 
   * @param {!Shot} shotA 
   * @param {!Shot} shotB 
   * @param {!Prices} prices 
   */
  addShotChange(shotA, shotB, prices) {
    const key = shotA.id * shotB.id;
    const price = rateShotChange(shotA, shotB, prices);
    this.costs[key] = price;
  }

  /**
   * 
   * @param {!Shot[]} shots 
   * @param {!Prices} prices 
   */
  addShotList(shots, prices) {
    for (let a = 0; a < shots.length; a++) {
      for (let b = a + 1; b < shots.length; b++) {
        this.addShotChange(shots[a], shots[b], prices);
      }
    }
  }
}