module.exports.divide = (payload = {}, maxSections = 1) => {
  const { maxNumber = 0 } = payload || {}
  const multiplier = +Number(maxNumber / maxSections).toFixed(0)
  const resArray = []
  let i

  for (i = 0; i < maxNumber && i + multiplier < maxNumber; i += multiplier) {
    resArray.push({
      startPoint: i + 1,
      endPoint: i + multiplier
    })
  }
  if (i - 1 < maxNumber) {
    resArray.push({
      startPoint: i + 1,
      endPoint: i === maxNumber ? 0 : maxNumber
    })
  }
  return resArray
}

module.exports.join = (array = []) => {
  let sum = 0
  array.forEach((each) => {
    sum += each.result
  })
  return sum
}
