const User = require('../model/user')

const userController = {
  orWhereUser: (user, mail) => User.orWhere(user, mail),
  insertUser: (params) => User.insert(params)
}

module.exports = userController
