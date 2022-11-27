const express = require('express')
const router = express.Router()

//
const sendMessage = require('../utils/sendEmail')

router.post('/login', (req, res) => {
  console.log(req.body)
  sendMessage()
  res.send({
    data: 'success!!'
  })
})

module.exports = router
