module.exports = class StrategyManager {
  constructor() {
    this._strategy = null
  }
  set strategy(strategy) {
    this._strategy = strategy
  }

  get strategy() {
    return this._strategy
  }

  execute(...arg) {
    return this._strategy.execute(...arg)
  }

  divide(...arg) {
    return this._strategy.divide(...arg)
  }

  join(...arg) {
    return this._strategy.join(...arg)
  }
}
