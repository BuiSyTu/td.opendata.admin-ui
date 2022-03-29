export const toObject = (arr, key, value) => arr.reduce((previous, item) => ({
  ...previous,
  ...(item !== null && item !== undefined && { [item[key]]: item[value] }),
}), {})
