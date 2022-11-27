const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send({
    data: 'success!!'
  })
})

module.exports = router
