const Base = require('./base')

class Message extends Base {
  constructor(prop = 'message_table') {
    super(prop)
  }
}

module.exports = new Message()
