import { getIntersection } from "../utils/getIntersection";

// #1 Map out offsets to array
function mapArrayTouchesOffsets(
  arrayTouches: { x: number; y: number; offset: number }[]
) {
  const arrayOffsets = [] as number[];
  for (let i = 0; i < arrayTouches.length; i += 1) {
    arrayOffsets.push(arrayTouches[i].offset);
  }

  return arrayOffsets;
}

// #3 Find touches with minimum offset
function findArrayMinTouchOffset(
  arrayTouches: { x: number; y: number; offset: number }[],
  offsetMinimum: number
) {
  const arrayMinTouchOffset = [] as {
    x: number;
    y: number;
    offset: number;
  }[];
  for (let i = 0; i < arrayTouches.length; i += 1) {
    if (arrayTouches[i].offset === offsetMinimum) {
      arrayMinTouchOffset.push(arrayTouches[i]);
    }
  }

  return arrayMinTouchOffset;
}

function getArrTouchesIntersected(
  borders: { x: number; y: number }[][],
  ray: { x: number; y: number }[],
  arrayTouches: { x: number; y: number; offset: number }[]
) {
  for (let i = 0; i < borders.length; i += 1) {
    const touch = getIntersection(
      ray[0],
      ray[1],
      borders[i][0],
      borders[i][1]
    ) as { x: number; y: number; offset: number };

    if (touch) {
      arrayTouches.push(touch);
    }
  }
}

function pushIntersectedTouch(
  borders: { x: number; y: number }[][],
  ray: { x: number; y: number }[]
) {
  const arrayTouches = [] as { x: number; y: number; offset: number }[];
  getArrTouchesIntersected(borders, ray, arrayTouches); // for loop
  return arrayTouches;
}

export function getReading(
  ray: { x: number; y: number }[],
  borders: { x: number; y: number }[][]
): { x: number; y: number; offset: number }[] | null {
  const arrayTouches = pushIntersectedTouch(borders, ray); // for loop
  if (arrayTouches.length === 0) {
    // no intersection ==> break function call
    return null;
  }
  const arrayOffsets = mapArrayTouchesOffsets(arrayTouches);
  const offsetMinimum = Math.min(...arrayOffsets) as number; // spread

  return findArrayMinTouchOffset(arrayTouches, offsetMinimum);
}
