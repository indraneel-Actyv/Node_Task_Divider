const { fork } = require('child_process')
const { divide, join } = require('./strategies/sum')

const mainFunction = () => {
  let finalResult = 0
  const noOfChildProcess = 2
  const dividedParts = divide({ maxNumber: 10601 }, noOfChildProcess)
  const resultedParts = []

  dividedParts.forEach((each) => {
    const compute = fork('./strategies/sum/child_process.js')
    compute.send(each)
    compute.on('message', (sum) => {
      resultedParts.push(sum)
    })
  })

  if(resultedParts.length === noOfChildProcess) {
    finalResult = join(resultedParts)
  }

  return finalResult

}

console.log(mainFunction())
