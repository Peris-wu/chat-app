const friendsController = require('../controller/friends')

// encrypt decrypt  加密/解密
const bcrypt = require('../utils/bcrypt')

// require jsonwebtoken
const jwt = require('../utils/jsonwebtoken')

// 判断是否为好友
const isFriends = async (params, next) => {
  try {
    const result = await friendsController.isFriends(params)
    return result
  } catch (err) {
    next(`isFriends error -> ${err}`)
  }
}
exports.isFriends = isFriends

// 更新好友申请时间

const updateApplyTime = async (params, updateParams) => {
  try {
    const updateResult = await friendsController.updateApplyTime(
      params,
      updateParams
    )
    return updateResult
  } catch (err) {
    next(`updateApplyTime err -> ${err}`)
  }
}
exports.updateApplyTime = updateApplyTime

// 申请好友关系
const buildFriend = async (params) => {
  try {
    const applyResult = await friendsController.buildFriend(params)
    return applyResult
  } catch (err) {
    next(`buildFriend err -> ${err}`)
  }
}
exports.buildFriend = buildFriend

// 通过好友申请
const passApply = async (whereParams, updateParams) => {
  try {
    const applyResult = await friendsController.passApply(
      whereParams,
      updateParams
    )
    return applyResult
  } catch (err) {
    next(`passApply err -> ${err}`)
  }
}
exports.passApply = passApply

// 通过好友申请
const deleteApply = async (params) => {
  try {
    const deleteResult = await friendsController.deleteApply(params)
    console.log('!!!')
    return deleteResult
  } catch (err) {
    next(`deleteApply err -> ${err}`)
  }
}
exports.deleteApply = deleteApply
