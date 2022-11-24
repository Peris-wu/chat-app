const test = require('../model/test')

const Controllers = {
  test: {
    async show(req, res, next) {
      try {
        const result = await test.all()
        console.log(result)
      } catch (e) {
        // throw Error(e.sqlMessage)
        next(e.sqlMessage)
      }
    }
  }
}
module.exports = Controllers
