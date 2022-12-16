const express = require('express')
const upload = require('../utils/upload')
const router = express.Router()

router.post('/upload', upload.array('image', 11), (req, res, next) => {
  // const params = req.files
  res.send({
    msg: 'success!! '
  })
})

module.exports = router
