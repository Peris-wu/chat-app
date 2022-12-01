const express = require('express')
const router = express.Router()
const testController = require('../controller/test')

router.get('/', testController.test.show)

module.exports = router

// const bcryptjs = require('bcryptjs')

// const password = '258369'

// const hashPwd = bcryptjs.hashSync(password, 10)

// console.log(hashPwd)

// const comparePwd = bcryptjs.compareSync(password, hashPwd)
// console.log(comparePwd)
