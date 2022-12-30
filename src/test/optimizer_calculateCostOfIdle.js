import { Character, CharacterInCostume, InputData, Person } from "../app/classes.js";
import { ActorIdle, ActorIdleMap, Memory } from "../app/memory.js";
import { calculateCostOfIdle, updateIdles } from "../app/optimizer.js";
import { TestHelpers, Tests } from "./test_helpers.js";
import { actorIdleExpectEqual } from "./rate_updateIdlesByActor.js";

const ALEX = new CharacterInCostume(new Character("Character of Alex", new Person("Alex")), "anything");
const BERNARD = new CharacterInCostume(new Character("Character of Bernard", new Person("Bernard")), "anything");
const PATRICIA = new CharacterInCostume(new Character("Character of Patricia", new Person("Patricia")), "anything");
const KIM = new CharacterInCostume(new Character("Character of Kim", new Person("Kim")), "anything");
/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_calculateCostOfIdle(TESTS) {

  TESTS.add("updateIdles_listA", (testName) => {
    // SETUP
    const shotList = shotListA();
    const inputDataStub = new InputData(
      [ALEX.character.person, BERNARD.character.person, PATRICIA.character.person, KIM.character.person],
      [ALEX, BERNARD, PATRICIA, KIM],
      shotList
    );

    const actorIdleMap = new ActorIdleMap();
    actorIdleMap.initialize(inputDataStub);
    const memory = new Memory({}, actorIdleMap);
    const changedIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // EXECUTION
    updateIdles(shotList, memory, changedIndices);
    // INTERPRETATION
    let msg = null;
    const idles = actorIdleMap.actorIdles;
    const results = [
      actorIdleExpectEqual(idles[0], new ActorIdle("Alex", 1, 9, 1)),
      actorIdleExpectEqual(idles[1], new ActorIdle("Bernard", 0, 9, 6)),
      actorIdleExpectEqual(idles[2], new ActorIdle("Patricia", 1, 9, 5)),
      actorIdleExpectEqual(idles[3], new ActorIdle("Kim", 0, 9, 4)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateIdles+calculateCostOfIdle_listA", (testName) => {
    // SETUP
    const shotList = shotListA();
    const inputDataStub = new InputData(
      [ALEX.character.person, BERNARD.character.person, PATRICIA.character.person, KIM.character.person],
      [ALEX, BERNARD, PATRICIA, KIM],
      shotList
    );

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

  TESTS.add("updateIdles_listB", (testName) => {
    // SETUP
    const shotList = shotListB();
    const inputDataStub = new InputData(
      [ALEX.character.person, BERNARD.character.person, PATRICIA.character.person, KIM.character.person],
      [ALEX, BERNARD, PATRICIA, KIM],
      shotList
    );

    const actorIdleMap = new ActorIdleMap();
    actorIdleMap.initialize(inputDataStub);
    const memory = new Memory({}, actorIdleMap);
    const changedIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // EXECUTION
    updateIdles(shotList, memory, changedIndices);
    // INTERPRETATION
    let msg = null;
    const idles = actorIdleMap.actorIdles;
    const results = [
      actorIdleExpectEqual(idles[0], new ActorIdle("Alex", 0, 9, 2)),
      actorIdleExpectEqual(idles[1], new ActorIdle("Bernard", 0, 4, 1)),
      actorIdleExpectEqual(idles[2], new ActorIdle("Patricia", 4, 7, 0)),
      actorIdleExpectEqual(idles[3], new ActorIdle("Kim", 1, 9, 3)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateIdles+calculateCostOfIdle_listB", (testName) => {
    // SETUP
    const shotList = shotListB();
    const inputDataStub = new InputData(
      [ALEX.character.person, BERNARD.character.person, PATRICIA.character.person, KIM.character.person],
      [ALEX, BERNARD, PATRICIA, KIM],
      shotList
    );

    const actorIdleMap = new ActorIdleMap();
    actorIdleMap.initialize(inputDataStub);
    const memory = new Memory({}, actorIdleMap);
    const changedIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // EXECUTION
    updateIdles(shotList, memory, changedIndices);
    const result = calculateCostOfIdle(memory, 2);
    // INTERPRETATION
    let msg = null;
    if (result !== 12) {
      msg = "Expected Result to be 12!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}

function shotListA() {
  // shotlist:  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  // Alex:      0  X  X  X  0  X  X  X  X  X
  // Bernard:   X  0  0  0  0  X  0  0  X  X
  // Patricia:  0  X  X  0  X  0  0  0  0  X
  // Kim:       X  0  0  X  X  0  X  X  0  X
  return [
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
}

function shotListB() {
  // shotlist:  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  //Alex        X  X  X  0  X  0  X  X  X  X
  //Bernard     X  0  X  X  X  0  0  0  0  0
  //Patricia    0  0  0  0  X  X  X  X  0  0
  //Kim         0  X  0  X  X  X  0  0  X  X
  return [
    TestHelpers.createShot(null, [ALEX, BERNARD]),
    TestHelpers.createShot(null, [ALEX, KIM]),
    TestHelpers.createShot(null, [ALEX, BERNARD]),
    TestHelpers.createShot(null, [BERNARD, KIM]),
    TestHelpers.createShot(null, [ALEX, BERNARD, PATRICIA, KIM]),
    TestHelpers.createShot(null, [PATRICIA, KIM]),
    TestHelpers.createShot(null, [ALEX, PATRICIA]),
    TestHelpers.createShot(null, [ALEX, PATRICIA]),
    TestHelpers.createShot(null, [ALEX, KIM]),
    TestHelpers.createShot(null, [ALEX, KIM]),
  ];
}