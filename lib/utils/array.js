export function flattenAndCompact(arr) {
  return []
    .concat(...arr)
    .filter((item) => !!item);
}
