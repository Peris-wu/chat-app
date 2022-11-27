const test = require('../model/test')
const createTableController = require('./createTable')
const Controllers = {
  test: {
    async show(req, res, next) {
      try {
        const result = await createTableController.createTable('user')
        console.log(result)
      } catch (e) {
        // throw Error(e.sqlMessage)
        next(e.sqlMessage)
      }
    }
  }
}
module.exports = Controllers
