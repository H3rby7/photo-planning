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
   * @returns {(string[]|false)} List of actors that need to change costume or false if no costume change
   */
  static actorNeedsChange(a, b) {
    const changers = a.characters.filter(ac => {
      return b.characters.find(bc => ac.character.characterName === bc.character.characterName && ac.costume !== bc.costume)
    });
    return changers.length ? changers.map(c => c.character.person) : false;
  }

}
