const User = require('../model/user')

const userController = {
  orWhereUser: (user, mail) => User.orWhere(user, mail)
}

module.exports = userController
