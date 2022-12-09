const Base = require('./base')

class Friends extends Base {
  constructor(prop = 'friends_table') {
    super(prop)
  }
}

module.exports = new Friends()
