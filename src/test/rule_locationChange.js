import { Rules } from "../app/rules.js";
import { TestHelpers, Tests } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_rule_locationChange(TESTS) {
  TESTS.add("locationChange_noLocations_expect_false", (testName) => {
    // SETUP
    const l1 = TestHelpers.createShot();
    const l2 = TestHelpers.createShot();
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (locationChanges) {
      msg = "There should be no change in location!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("locationChange_sameLocation_expect_false", (testName) => {
    // SETUP
    const l1 = TestHelpers.createShot("throne");
    const l2 = TestHelpers.createShot("throne");
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (locationChanges) {
      msg = "There should be no change in location!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("locationChange_differentLocation_expect_true", (testName) => {
    // SETUP
    const l1 = TestHelpers.createShot("throne");
    const l2 = TestHelpers.createShot("forest");
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (!locationChanges) {
      msg = "There should be a change in location!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });
}
