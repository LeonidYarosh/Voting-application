export const sortItemsOut = (arr, field) => {
  return arr.sort(function(a, b) {
    return b[field] - a[field]
  })
}

export const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision)

  return Math.round(number * factor) / factor
}
