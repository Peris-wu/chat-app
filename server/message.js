const messageController = require('../controller/message')

// encrypt decrypt  加密/解密
const bcrypt = require('../utils/bcrypt')

// require jsonwebtoken
const jwt = require('../utils/jsonwebtoken')

// 插入一条消息
const insertMessage = async (userId, fId, msg, type, next) => {
  try {
    const params = {
      userId,
      fId,
      msg,
      type,
      sendTime: new Date(),
      state: 0
    }
    const result = await messageController.insertMessage(params)
    return result
  } catch (err) {
    next(`insertMessage error -> ${err}`)
  }
}
exports.insertMessage = insertMessage
