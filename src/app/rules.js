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
    const commonActors = a.people.filter(x => b.people.includes(x));
    return a.characters
      .filter(c => commonActors.includes(c.character.person.name))
      .filter(ac => {
        return b.characters.filter(bc => bc.character.person.name === ac.character.person.name && bc.costume !== ac.costume).length > 0;
      }).length > 0;
  }
}
