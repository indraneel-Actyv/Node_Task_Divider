const os = require('os')
const { fork } = require('child_process')
const StrategyManager = require('./strategies/index')
const strategies = require('./strategies/strategies')

const mainFunction = async (strategy, noOfChildProcess) => {
  console.time('label')

  let finalResult = 0
  const cpus = os.cpus().length

  // Assigning a strategy
  const strategyManager = new StrategyManager()
  strategyManager.strategy = new strategies[strategy]()

  // Consoling the number of CPUs and processes
  console.log('cpus', cpus)
  console.log('noOfChildProcess', noOfChildProcess)

  // Dividing the work in parts
  const dividedParts = strategyManager.divide({ maxNumber: 100000000 }, noOfChildProcess)

  // Allocating work among children
  const resultedParts = dividedParts.map(
    (each, index) =>
      new Promise((resolve, reject) => {
        // Creating a child
        const child = fork('./child_process.js')

        // Sending a message to child
        child.send({ payload: each, index, strategy })
        
        // Receiving a message from child
        child.on('message', (result) => {
          console.log(result)
          resolve(result)
        })
        
        // handling the error from child
        child.on('error', (code, signal) => reject(code))
      })
  )

  // Joining the Parts to make it whole
  if (resultedParts.length === dividedParts.length) {
    const promisedResult = await Promise.all(resultedParts)
    finalResult = strategyManager.join(promisedResult)
  }

  return finalResult
}

mainFunction('SummationStrategy', 4).then((result) => {
  console.log('Final Result:', result)
  console.timeEnd('label')
})
