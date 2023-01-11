import * as fs from 'fs';
import {resolve} from 'path';
import { PermutationState } from '../lib/helper_functions.js';
import { Best, Shot } from './classes.js';

export class OptimizationState {
  /**
   * 
   * @param {PermutationState} permutationState 
   * @param {Best} best 
   */
  constructor(permutationState, best) {
    this.permutationState = permutationState;
    this.best = best;
  }

  /**
   * Save to a temporary state file for later recovery.
   * 
   * @param {!string} path to save the file to
   */
  saveToFile(path) {
    fs.writeFileSync(buildPathToSaveFile(path), this.toJson());
  }

  /**
   * Save the result (uses different fileName)
   * 
   * @param {!string} path to save the file to
   */
  saveResult(path) {
    fs.writeFileSync(resolve(`${path.replace(".json", "-RESULT.json")}`), this.toJson());
  }

  print() {
    const ps = this.permutationState;
    console.log(`Continuing with i=${ps.i}; k=${ps.k}; c=[${ps.c}]`);
    this.best.print()
  }

  /**
   * Check and load the save file to the input param.
   * 
   * @param {!string} path to the input.json file
   * @returns {?OptimizationState} the representing state.
   */
  static attemptLoadProgress(path) {
    const loadPath = buildPathToSaveFile(path);
    if (fs.existsSync(loadPath)) {
      console.log("Found existing progress data, loading from path: " + loadPath);
      const rawdata = fs.readFileSync(loadPath);
      const loeadedState = OptimizationState.fromJson(JSON.parse(rawdata));
      loeadedState.print();
      return loeadedState;
    }
    return null;
  }

  /**
   * Clear the corresponding savefile
   * 
   * @param {!string} path to the input.json file
   */
  static clearProgress(path) {
    fs.unlinkSync(buildPathToSaveFile(path));
  }

  /**
   * Return a simple JSON represantation to use for storing.
   * @returns {!string}
   */
  toJson() {
    const obj = {
      best: {
        switchCosts: this.best.switchCosts,
        idleCosts: this.best.idleCosts,
        shots: this.best.shots,
      },
      permutationState: {
        inputArr: this.permutationState.inputArr,
        c: this.permutationState.c,
        i: this.permutationState.i,
        k: this.permutationState.k,
      }
    };
    return JSON.stringify(obj, null, 2);
  }

  /**
   * 
   * @param {!Object} json 
   * @returns {!OptimizationState}
   */
  static fromJson(json) {
    const ps = json.permutationState;
    const best = json.best;
    if (!ps || !ps.hasOwnProperty("inputArr") || !ps.hasOwnProperty("c") || !ps.hasOwnProperty("i") || !ps.hasOwnProperty("k")) {
      throw "ERROR LOADING SAVESTATE - DATA FOR PERMUTATION IS INVALID! --> " + JSON.stringify(ps);
    }
    if (!best || !best.hasOwnProperty("shots") || !best.hasOwnProperty("switchCosts") || !best.hasOwnProperty("idleCosts")) {
      throw "ERROR LOADING SAVESTATE - DATA FOR BEST IS INVALID! --> " + JSON.stringify(best);
    }
    return new OptimizationState(
      new PermutationState(ps.inputArr, ps.c, ps.i, ps.k), 
      new Best(best.shots, best.switchCosts, best.idleCosts)
    );
  }
}

/**
 * 
 * @param {!string} path of the input JSON file
 */
function buildPathToSaveFile(path) {
  return resolve(`${path}-progress.tmp`);
}
