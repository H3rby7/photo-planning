import { CharacterInCostume, Shot } from "./classes.js";

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
      const l = arr.findIndex(s => shotsHaveSameLocationsSameCharactersInCostumes(s, nextShot));
      if (l < 0) {
        arr.push(nextShot);
      } else {
        arr.splice(l, 1, mergeShots(arr[l], nextShot));
      }
      return arr;
    }, []);
  console.log(`# of shots after grouping: ${grouped.length}`);
  return grouped;
}

/**
 * Merge a and b for simplicity.
 * 
 * @param {!Shot} a 
 * @param {!Shot} b
 * 
 * @returns {!Shot} the merged shot
 */
export function mergeShots(a, b) {
  const nName = a.shotName + " AND " + b.shotName;
  const props = a.props.concat(b.props);
  return new Shot(nName, a.characters, props, a.location);
}

/**
 * Check if shot a and shot b have the same location and also runs @see shotsHaveSameCharactersInCostumes
 * 
 * @param {!Shot} a 
 * @param {!Shot} b
 * 
 * @returns {boolean} true if they are the same; false if there is a difference
 */
export function shotsHaveSameLocationsSameCharactersInCostumes(a, b) {
  if (a.location !== b.location) {
    return false;
  }
  return shotsHaveSameCharactersInCostumes(a.characters, b.characters);
}

/**
 * Check if a[] and b[] have the same characters in the same costumes
 * 
 * @param {!CharacterInCostume[]} a 
 * @param {!CharacterInCostume[]} b
 * 
 * @returns {boolean} true if they are the same; false if there is a difference
 */
export function shotsHaveSameCharactersInCostumes(a, b) {
  const _b = [...b];
  for (let i = 0; i < a.length; i++) {
    const cincA = a[i];
    const positionInB = _b.findIndex(cincB => cincA.equals(cincB));
    if (positionInB < 0) {
      // a character in costume is in A, but not in B
      // console.log(`${JSON.stringify(cincA)} of A is not list B (${JSON.stringify(_b)})`);
      return false;
    }
    _b.splice(positionInB, 1);
  }
  if (_b.length) {
    // a character in B is not in A
    // console.log(`Characters ${JSON.stringify(_b)} are not in list A ${JSON.stringify(a)}`);
    return false;
  }
  return true;
}