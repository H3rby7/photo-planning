import {CharacterInCostume, Shot} from "./classes.js";

export class Rules {

  /**
   * Check if two shots have different sets
   * 
   * @param {!Shot} a Shot A
   * @param {!Shot} b Shot B
   * 
   * @returns {boolean} true if a change of set/location needs to be done.
   */
  static locationChange(a, b) {
    return a.location !== b.location;
  }

  /**
   * Check if two shots require at least one actor to change the costume
   * 
   * @param {!Shot} a Shot A
   * @param {!Shot} b Shot B
   * 
   * @returns {boolean} true if costume change or false if no costume change
   */
  static actorNeedsChange(a, b) {
    for (const p in a.costumeByPeople) {
      if (b.costumeByPeople[p] && b.costumeByPeople[p] !== a.costumeByPeople[p]) {
        return true;
      }
    }
    return false;
  }
}
