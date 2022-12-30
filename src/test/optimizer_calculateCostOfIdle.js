import { Character, CharacterInCostume, InputData, Person } from "../app/classes.js";
import { ActorIdleMap, Memory } from "../app/memory.js";
import { calculateCostOfIdle, isActorIdleAffectedByChange, updateIdles } from "../app/optimizer.js";
import { Prices, RatingConditions } from "../app/rate.js";
import { TestHelpers, Tests } from "./test_helpers.js";

const ALEX = new CharacterInCostume(new Character("Character of Alex", new Person("Alex")), "anything");
const BERNARD = new CharacterInCostume(new Character("Character of Bernard", new Person("Bernard")), "anything");
const PATRICIA = new CharacterInCostume(new Character("Character of Patricia", new Person("Patricia")), "anything");
const KIM = new CharacterInCostume(new Character("Character of Kim", new Person("Kim")), "anything");

// shotlist:  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
// Alex:      0  X  X  X  0  X  X  X  X  X
// Bernard:   X  0  0  0  0  X  0  0  X  X
// Patricia:  0  X  X  0  X  0  0  0  0  X
// Kim:       X  0  0  X  X  0  X  X  0  X
const shotList = [
  TestHelpers.createShot(null, [BERNARD, KIM]),
  TestHelpers.createShot(null, [ALEX, PATRICIA]),
  TestHelpers.createShot(null, [ALEX, PATRICIA]),
  TestHelpers.createShot(null, [ALEX, KIM]),
  TestHelpers.createShot(null, [PATRICIA, KIM]),
  TestHelpers.createShot(null, [ALEX, BERNARD]),
  TestHelpers.createShot(null, [ALEX, KIM]),
  TestHelpers.createShot(null, [ALEX, KIM]),
  TestHelpers.createShot(null, [ALEX, BERNARD]),
  TestHelpers.createShot(null, [ALEX, BERNARD, PATRICIA, KIM]),
];
const inputDataStub = new InputData(
  [ALEX.character.person, BERNARD.character.person, PATRICIA.character.person, KIM.character.person],
  [ALEX, BERNARD, PATRICIA, KIM],
  shotList
);
/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_calculateCostOfIdle(TESTS) {

  TESTS.add("updateIdles+calculateCostOfIdle", (testName) => {
    // SETUP
    const actorIdleMap = new ActorIdleMap();
    actorIdleMap.initialize(inputDataStub);
    const memory = new Memory({}, actorIdleMap);
    const changedIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // EXECUTION
    updateIdles(shotList, memory, changedIndices);
    const result = calculateCostOfIdle(memory, 2);
    // INTERPRETATION
    let msg = null;
    if (result !== 32) {
      msg = "Expected Result to be 32!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
