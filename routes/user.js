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
module.exports = router
