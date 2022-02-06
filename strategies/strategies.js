module.exports.SummationStrategy = class SummationStrategy {
  divide(payload = {}, maxSections = 1) {
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

    if (i - 1 < maxNumber) resArray[resArray.length - 1].endPoint = maxNumber

    return resArray
  }

  join(array = []) {
    let sum = 0
    array.forEach((each) => {
      sum += each.result
    })
    return sum
  }

  execute(payload = {}) {
    const { startPoint, endPoint } = payload
    let sum = 0
    if (endPoint === 0) {
      sum += startPoint
    } else {
      for (let i = startPoint; i <= endPoint; i++) sum += i
    }
    return { ...payload, result: sum }
  }
}
