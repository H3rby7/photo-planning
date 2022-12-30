import { InputData, Shot } from "./classes.js";
import { updateIdlesByActor, Prices, rateShotChange } from "./rate.js";

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

  /**
   * 
   * @param {!Shot} shotA 
   * @param {!Shot} shotB 
   */
  getCostChange(shotA, shotB) {
    return this.costs[shotA.id * shotB.id];
  }
}

export class ActorIdleMap {

  /**
   * @type {ActorIdle[]} actorIdles
   * @public
   */
  actorIdles = [];

  /**
   * 
   * @param {!InputData} inputData 
   */
  initialize(inputData) {
    inputData.people.map(p => p.name).forEach(name => {
      this.actorIdles.push(new ActorIdle(name, 0, inputData.shots.length, inputData.shots.length));
    })
    updateIdlesByActor(inputData.shots, this.actorIdles);
  }
  
}

export class ActorIdle {

  /**
   * 
   * @param {!string} actorName 
   * @param {number} firstShot 
   * @param {number} lastShot 
   * @param {number} idles 
   */
  constructor(actorName, firstShot, lastShot, idles) {
    this.actorName = actorName;
    this.firstShot = firstShot;
    this.lastShot = lastShot;
    this.idles = idles;
  }
}

export class Memory {
  
  /**
   * 
   * @param {!ShotChangeMap} shotChangeMap 
   * @param {!ActorIdleMap} actorIdleMap 
   */
  constructor(shotChangeMap, actorIdleMap) {
    this.shotChangeMap = shotChangeMap;
    this.actorIdleMap = actorIdleMap;
  }
}