export function uniqueBy(arr, key) {
  const seen = new Map();
  return arr.filter((item) => (seen.get(key(item)) ? false : seen.set(key(item), true)));
}
