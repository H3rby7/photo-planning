import { Character, CharacterInCostume, Shot } from "../app/classes.js";

let shotId = 0;

export class TestHelpers {

  /**
   * Create a Shot for Tests
   * 
   * @param {?string} location 
   * @param {?CharacterInCostume[]} charactersInCostume 
   * @param  {...string} props 
   * @returns {!Shot} with the given properties and incremented shotname ID 'shot #X'.
   */
  static createShot(location, charactersInCostume, ...props) {
    return new Shot("shot #" + (shotId++), charactersInCostume, props, location);
  }

  /**
   * Create a Character in Costume for Tests
   * 
   * @param {!string} character Name of the character
   * @param {!string} costume name of the costume (identifier)
   * @returns {!CharacterInCostume}, where the actor will be 'actor of @param character'
   */
  static createCharacterInCostume(character, costume) {
    return new CharacterInCostume(new Character(character, "actor of " + character), costume);
  }

  /**
   * Print Test result to console. IMPORTANT: only pass @param msg if the test failed!
   * 
   * @param {!string} testName Name of the test (function)
   * @param {?msg} msg Only if test failed; The details.
   */
  static printTestResult(testName, msg) {
    if (msg) {
      console.error(`TEST ERROR   - ${testName}: '${msg}'`);
    } else {
      console.debug(`TEST SUCCESS - ${testName}`);
    }
  }

}



