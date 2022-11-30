const Base = require('./base')

class User extends Base {
  constructor(prop = 'user_table') {
    super(prop)
  }
}

module.exports = new User()
