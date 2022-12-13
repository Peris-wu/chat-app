const express = require('express')
const router = express.Router()

// email 发送
const sendMessage = require('../utils/sendEmail')

//
const userServer = require('../server/user')

/* 
状态码:
200->成功
201->失败 
*/
// 查询用户是否存在
router.post('/isexist', async (req, res, next) => {
  const { user = null, mail = null } = req.body
  const feedbackMsg = {
    code: 201,
    msg: 'fail'
  }
  const result = await userServer.isAccountExist(user, mail)
  if (result) {
    feedbackMsg.code = 200
    feedbackMsg.msg = 'success'
  }
  res.send(feedbackMsg)
})

// 用户注册

router.post('/register', async (req, res, next) => {
  const { user, mail, pwd } = req.body
  const feedbackMsg = {
    code: 201,
    msg: 'fail'
  }
  const result = await userServer.insertAccount(user, mail, pwd)
  if (result.length >= 1) {
    feedbackMsg.code = 200
    feedbackMsg.msg = 'success !!'
  }
  res.send(feedbackMsg)
})

// 用户登录
router.post('/login', async (req, res, next) => {
  const { data, pwd } = req.body
  const feedbackMsg = {
    code: 201,
    msg: 'fail'
  }
  const result = await userServer.loginAccount(data, pwd)
  res.send(result)
})

// 模糊搜索好友
router.post('/searchFriends', async (req, res, next) => {
  const { friendName } = req.body
  const result = await userServer.searchFriendLike(friendName)
  res.send(result)
})

// 获取用户详情
router.get('/detail', async (req, res, next) => {
  const { token } = req.query
  const result = await userServer.selectUserDetail(token, next)
  res.send(result)
})

// 修改用户详情
router.post('/modifyUserDetail', async (req, res, next) => {
  const params = { ...req.body }
  const result = await userServer.modifyUserDetail(params, next)
  console.log(result)
  res.send({
    status: result
  })
})
// 申请好友
router.post('/applyFriend', async (req, res, next) => {
  const params = { ...req.body }
  const result = await userServer.applyFriend(params, next)
  // console.log(result)
  res.send({
    status: result
  })
})

// 通过好友申请
router.post('/passApply', async (req, res, next) => {
  const params = req.body
  const result = await userServer.passApply(params, next)
  res.send({
    status: result
  })
})

// 删除好友申请
router.post('/deleteApply', async (req, res, next) => {
  const params = req.body
  const result = await userServer.deleteApply(params, next)
  res.send({
    status: result
  })
})
module.exports = router
