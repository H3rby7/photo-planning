import { Shot } from "./classes.js";

/**
 * Group shots that have the same people in the same costumes in the same location to reduce complexity.
 * 
 * @param {!Shot[]} shots 
 */
export function groupShots(shots) {
  console.log(`# of shots before grouping: ${shots.length}`);
  const grouped = shots
    // group by locations and same amount of people
    .reduce((arr, nextShot) => {
      const l = arr.indexOf(s => shotsHaveSameLocationsSameCharactersInCostumes(s, nextShot));
      if (l < 0) {
        arr.push(nextShot);
      } else {
        const oldShot = arr[l];
        const nName = oldShot.shotName + " AND " + nextShot.shotName;
        const props = oldShot.props.concat(nextShot.props);
        const n = new Shot(nName, oldShot.characters, props, oldShot.location);
        arr.splice(l, 1, n);
      }
    }, []);
  console.log(`# of shots after grouping: ${grouped.length}`);
  return grouped;
}

/**
 * Check if shot a and shot b have the same location and also runs @see shotsHaveSameCharactersInCostumes
 * 
 * @param {!Shot} a 
 * @param {!Shot} b
 * 
 * @returns {boolean} true if they are the same; false if there is a difference
 */
export function shotsHaveSameLocationsSameCharactersInCostumes() {
  if (a.location !== b.location) {
    return false;
  }
  return shotsHaveSameCharactersInCostumes(a.characters, b.characters);
}

/**
 * Check if shot a and shot b have the same characters in the same costumes
 * 
 * @param {!Shot} a 
 * @param {!Shot} b
 * 
 * @returns {boolean} true if they are the same; false if there is a difference
 */
export function shotsHaveSameCharactersInCostumes(a, b) {
  const _b = [...b];
  for (let i = 0; i < a.length; i++) {
    const cincA = a[i];
    const positionInB = _b.indexOf(cincB => cincA.equals(cincB));
    if (positionInB < 0) {
      // a character in costume is in A, but not in B
      return false;
    }
    _b.splice(positionInB, 1);
  }
  if (_b.length) {
    // a character in B is not in A
    return false;
  }
  return true;
}