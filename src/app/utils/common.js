export const toObject = (arr, key, value) => arr.reduce((previous, item) => ({
  ...previous,
  ...(item !== null && item !== undefined && { [item[key]]: item[value] }),
}), {})

export const tryParseStringToObject = (text, callback) => {
  try {
    const obj = JSON.parse(text)
    return callback(obj)
  } catch {
    return false
  }
}