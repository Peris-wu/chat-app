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

router.post('/login', (req, res, next) => {
  const { user, mail } = req.body
  const feedbackMsg = {
    code: 201,
    msg: 'fail'
  }
  const result = userServer.isAccountExist(user, mail)
  if (result) {
    feedbackMsg.code = 200
    feedbackMsg.msg = 'success'
  }
  res.send(feedbackMsg)
})

module.exports = router
