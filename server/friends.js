const friendsController = require('../controller/friends')

// encrypt decrypt  加密/解密
const bcrypt = require('../utils/bcrypt')

// require jsonwebtoken
const jwt = require('../utils/jsonwebtoken')

// 判断是否为好友
const isFriends = async (userId, fId, next) => {
  try {
    const result = await friendsController.isFriends(userId, fId)
    return result
  } catch (err) {
    next(`isFriends error -> ${err}`)
  }
}
exports.isFriends = isFriends
