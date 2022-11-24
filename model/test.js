const Base = require('./base')

class Test extends Base {
  constructor(prop = 'chat_table1') {
    super(prop)
  }
}

module.exports = new Test()
