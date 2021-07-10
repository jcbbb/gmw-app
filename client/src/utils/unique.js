export function uniqueBy(arr, key) {
  const seen = new Map();
  return arr.filter((item) => (seen.get(item[key]) ? false : seen.set(item[key], true)));
}
