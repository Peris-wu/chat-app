const Message = require('../model/message')

const messageController = {
  insertMessage: (params) => Message.inserMessage(params)
}

module.exports = messageController
