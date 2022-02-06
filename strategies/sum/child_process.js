const execute = (payload = {}) => {
  const { startPoint, endPoint } = payload
  let sum = 0
  if (endPoint === 0) {
    sum += startPoint
  } else {
    for (let i = startPoint; i <= endPoint; i++) sum += i
  }
  return { ...payload, result: sum }
}

process.on('message', (payload) => {
  const result = execute(payload)
  process.send(result)
})
