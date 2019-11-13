/**
 * Similar to Array.splice but returning acting on a copy of the provided array
 * It returns the new array instead of the deleted elements
 * Doesn't handle negative indexes (will just insert at the beginning)
 */
export function spliceCopy<T>(array: T[], index: number, ...elems: T[]): T[] {
  const nonUndefinedElems = elems.filter(e => e !== undefined);
  if (nonUndefinedElems.length > 0) {
    return array
      .slice(0, Math.max(0, index))
      .concat(...nonUndefinedElems, array.slice(index + 1));
  }
  return array.slice(0, Math.max(0, index)).concat(array.slice(index + 1));
}
