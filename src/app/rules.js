import {Shot} from "./classes.js";

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
    return a.characters.filter(ac => {
      return b.characters.find(bc => ac.character.person.name === bc.character.person.name && ac.costume !== bc.costume)
    }).length > 0;
  }

}
