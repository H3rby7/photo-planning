import { Character, CharacterInCostume, Person } from "../app/classes.js";
import { ActorIdle } from "../app/memory.js";
import { updateIdlesByActor } from "../app/rate.js";
import { TestHelpers, Tests } from "./test_helpers.js";

const Actor_A = new CharacterInCostume(new Character("Character of A", new Person("A")), "anything");
const Actor_B = new CharacterInCostume(new Character("Character of B", new Person("B")), "anything");
const Actor_C = new CharacterInCostume(new Character("Character of C", new Person("C")), "anything");
const EMPTY_SHOT = TestHelpers.createShot("", []);

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_updateIdlesByActor(TESTS) {

  TESTS.add("updateActorIdle_noShots_expect_Nothing", (testName) => {
    // SETUP
    const idles = [new ActorIdle("A", 0, 0, 0)];
    const shotList = [];
    // EXECUTION
    updateIdlesByActor(shotList, idles);
    // INTERPRETATION
    let msg = null;
    const results = [
      expectEqual(idles[0], new ActorIdle("A", 0, 0, 0)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateActorIdle_actorsNotNeeded_expect_000", (testName) => {
    // SETUP
    const idles = [new ActorIdle("A", 0, 0, 0)];
    const shotList = [EMPTY_SHOT, EMPTY_SHOT];
    // EXECUTION
    updateIdlesByActor(shotList, idles);
    // INTERPRETATION
    let msg = null;
    const results = [
      expectEqual(idles[0], new ActorIdle("A", 0, 0, 0)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateActorIdle_actorAin0and3_expect_032", (testName) => {
    // SETUP
    const idles = [new ActorIdle("A", 0, 0, 0)];
    const l1 = TestHelpers.createShot("", [Actor_A]);
    const shotList = [l1, EMPTY_SHOT, EMPTY_SHOT, l1];
    // EXECUTION
    updateIdlesByActor(shotList, idles);
    // INTERPRETATION
    let msg = null;
    const results = [
      expectEqual(idles[0], new ActorIdle("A", 0, 3, 2)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateActorIdle_actorAin023_expect_031", (testName) => {
    // SETUP
    const idles = [new ActorIdle("A", 0, 0, 0)];
    const l1 = TestHelpers.createShot("", [Actor_A]);
    const shotList = [l1, EMPTY_SHOT, l1, l1];
    // EXECUTION
    updateIdlesByActor(shotList, idles);
    // INTERPRETATION
    let msg = null;
    const results = [
      expectEqual(idles[0], new ActorIdle("A", 0, 3, 1)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("updateActorIdle_actorAin0123_expect_030", (testName) => {
    // SETUP
    const idles = [new ActorIdle("A", 0, 0, 0)];
    const l1 = TestHelpers.createShot("", [Actor_A]);
    const shotList = [l1, l1, l1, l1];
    // EXECUTION
    updateIdlesByActor(shotList, idles);
    // INTERPRETATION
    let msg = null;
    const results = [
      expectEqual(idles[0], new ActorIdle("A", 0, 3, 0)),
    ];
    if (results.find(r => !r.equal)) {
      msg = JSON.stringify(results.filter(r => !r.equal).map(r => r.msg));
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}

function setupIdles() {
  return [
    new ActorIdle("A", 0, 10, 0),
    new ActorIdle("B", 0, 10, 0),
    new ActorIdle("C", 0, 10, 0),
  ]
}

/**
 * 
 * @param {ActorIdle} a 
 * @param {ActorIdle} b 
 */
function expectEqual(a, b) {
  if (a.actorName !== b.actorName) {
    return {equal: false, msg: `Names not equal -> '${a.actorName}' !== '${b.actorName}'`};
  }
  if (a.firstShot !== b.firstShot) {
    return {equal: false, msg: `First shot not equal for '${a.actorName}' -> '${a.firstShot}' !== '${b.firstShot}'`};
  }
  if (a.lastShot !== b.lastShot) {
    return {equal: false, msg: `Last shot not equal for '${a.actorName}' -> '${a.lastShot}' !== '${b.lastShot}'`};
  }
  if (a.idles !== b.idles) {
    return {equal: false, msg: `Idles not equal for '${a.actorName}' -> '${a.idles}' !== '${b.idles}'`};
  }
  return {equal: true, msg: null};
}
