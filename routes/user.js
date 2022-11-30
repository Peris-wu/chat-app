const express = require('express')
const router = express.Router()

//
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
  console.log(result)
  if (result) {
    feedbackMsg.code = 200
    feedbackMsg.msg = 'success'
  }
  res.send(feedbackMsg)
})

module.exports = router
