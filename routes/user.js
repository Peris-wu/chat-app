const express = require('express')
const router = express.Router()

// email 发送
const sendMessage = require('../utils/sendEmail')

//
const userServer = require('../server/user')

// encrypt decrypt  加密/解密

const bcrypt = require('../utils/bcrypt')
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
  console.log(result)
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
  const encryptPwd = bcrypt.encrypt(pwd)
  const result = await userServer.insertAccount(user, mail, encryptPwd)
  if (result.length >= 1) {
    feedbackMsg.code = 200
    feedbackMsg.msg = 'success !!'
  }
  res.send(feedbackMsg)
})

module.exports = router
