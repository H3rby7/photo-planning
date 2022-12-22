import { Prices, rateShotChange, rateShotList } from "../app/rate.js";
import { TestHelpers, Tests } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_rateShotList(TESTS) {

  TESTS.add("rateShotChange_sameLocationSameCostumes_expect_0", (testName) => {
    // SETUP
    const prices = new Prices(3, 7);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const king_party = TestHelpers.createCharacterInCostume("king", "party outfit");
    const l1 = TestHelpers.createShot("throne", [queen_party, king_party]);
    const l2 = TestHelpers.createShot("throne", [queen_party, king_party]);
    // EXECUTION
    const result = rateShotChange(l1, l2, prices);
    // INTERPRETATION
    let msg = null;
    if (result !== 0) {
      msg = "Rating should be 0!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateShotChange_sameLocationDifferentCostumes_expect_7", (testName) => {
    // SETUP
    const prices = new Prices(3, 7);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const king_party = TestHelpers.createCharacterInCostume("king", "party outfit");
    const king_pyjamas = TestHelpers.createCharacterInCostume("king", "pyjamas");
    const l1 = TestHelpers.createShot("throne", [queen_party, king_party]);
    const l2 = TestHelpers.createShot("throne", [queen_party, king_pyjamas]);
    // EXECUTION
    const result = rateShotChange(l1, l2, prices);
    // INTERPRETATION
    let msg = null;
    if (result !== 7) {
      msg = "Rating should be 7!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateShotChange_differentLocationsDifferentCostumes_expect_7", (testName) => {
    // SETUP
    const prices = new Prices(3, 7);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const king_party = TestHelpers.createCharacterInCostume("king", "party outfit");
    const king_pyjamas = TestHelpers.createCharacterInCostume("king", "pyjamas");
    const l1 = TestHelpers.createShot("throne", [queen_party, king_party]);
    const l2 = TestHelpers.createShot("ballroom", [queen_party, king_pyjamas]);
    // EXECUTION
    const result = rateShotChange(l1, l2, prices);
    // INTERPRETATION
    let msg = null;
    if (result !== 7) {
      msg = "Rating should be 7!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("rateShotChange_differentLocationsSameCostumes_expect_3", (testName) => {
    // SETUP
    const prices = new Prices(3, 7);
    const queen_party = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const king_party = TestHelpers.createCharacterInCostume("king", "party outfit");
    const l1 = TestHelpers.createShot("throne", [queen_party, king_party]);
    const l2 = TestHelpers.createShot("ballroom", [queen_party, king_party]);
    // EXECUTION
    const result = rateShotChange(l1, l2, prices);
    // INTERPRETATION
    let msg = null;
    if (result !== 3) {
      msg = "Rating should be 3!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
