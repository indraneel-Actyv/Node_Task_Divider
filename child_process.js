const StrategyManager = require('./strategies')
const strategies = require('./strategies/strategies')
const pid = process.pid

// Creating a manager
const strategyManager = new StrategyManager()

// Receiving a message from Parent
process.on('message', ({ payload, index, strategy }) => {
  console.log(`Child ${index} created with pid: ${pid}`)

  // Assigning a strategy
  strategyManager.strategy = new strategies[strategy]()

  // Executing the task from Parent
  const result = strategyManager.execute(payload)

  // Sending back the final result to Parent
  process.send({ ...result, pid })

  // Exiting the Process
  process.exit(1)
})
