const express = require('express')
const router = express.Router()
const testController = require('../controller/test')

router.get('/', testController.test.show)

module.exports = router
