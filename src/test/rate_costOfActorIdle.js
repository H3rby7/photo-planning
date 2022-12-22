import { Prices, rateCostOfActorIdle } from "../app/rate.js";
import { TestHelpers, Tests } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_rateActorIdle(TESTS) {

  TESTS.add("rateActorIdle_noShots_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const shotList = [];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_oneShotNoActors_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const l1 = TestHelpers.createShot(null, []);
    const shotList = [l1];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_oneShotOneActor_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const l1 = TestHelpers.createShot(null, [queen_party]);
    const shotList = [l1];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_twoShotsOneActor_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const l1 = TestHelpers.createShot(null, [queen_party]);
    const l2 = TestHelpers.createShot(null, [queen_party]);
    const shotList = [l1, l2];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_threeShotsWithBreakOneActor_expect_1", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const queen_soldier = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const l1 = TestHelpers.createShot(null, [queen_party]);
    const l2 = TestHelpers.createShot(null, []);
    const l3 = TestHelpers.createShot(null, [queen_soldier]);
    const shotList = [l1, l2, l3];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 1) {
      msg = "Rating should be 1!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_fourShotsWithBreakOneActor_expect_2", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const queen_soldier = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const l1 = TestHelpers.createShot(null, [queen_party]);
    const l2 = TestHelpers.createShot(null, []);
    const l3 = TestHelpers.createShot(null, []);
    const l4 = TestHelpers.createShot(null, [queen_soldier]);
    const shotList = [l1, l2, l3, l4];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 2) {
      msg = "Rating should be 2!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_complexScenario01_expect_3", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const king_party = TestHelpers.createCharacterInCostume("king", "party outfit");
    const l1 = TestHelpers.createShot(null, [queen_party, king_party]);
    const l2 = TestHelpers.createShot(null, []);
    const l3 = TestHelpers.createShot(null, [king_party]);
    const l4 = TestHelpers.createShot(null, [queen_party]);
    const shotList = [l1, l2, l3, l4];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 3) {
      msg = "Rating should be 3!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_complexScenario02_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const partyShot = TestHelpers.createShot(null, [queen_party]);
    const emptyShot = TestHelpers.createShot(null, []);
    const shotList = [emptyShot, partyShot, partyShot, emptyShot, emptyShot];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateActorIdle_complexScenario03_expect_5", (testName) => {
    // SETUP
    const prices = new Prices(0, 0, 1);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const partyShot = TestHelpers.createShot(null, [queen_party]);
    const emptyShot = TestHelpers.createShot(null, []);
    const shotList = [emptyShot, partyShot, emptyShot, emptyShot, partyShot, emptyShot, emptyShot, emptyShot, partyShot];
    // EXECUTION
    const result = rateCostOfActorIdle(shotList, prices, Infinity);
    // INTERPRETATION
    let msg = null;
    if (result !== 5) {
      msg = "Rating should be 5!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
