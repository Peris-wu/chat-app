const express = require('express')
const router = express.Router()
const resolve = require('path')

const fs = require('fs')
// const testController = require('../controller/test')

router.post('/test', (req, res, next) => {
  const { testData } = req.body
  if (!testData) {
    throw new Error('测试错误')
  }
})

module.exports = router

// const bcryptjs = require('bcryptjs')

// const password = '258369'

// const hashPwd = bcryptjs.hashSync(password, 10)

// console.log(hashPwd)

// const comparePwd = bcryptjs.compareSync(password, hashPwd)
// console.log(comparePwd)
