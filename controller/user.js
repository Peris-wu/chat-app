const User = require('../model/user')

const userController = {
  orWhereUser: (user, mail) => User.orWhere(user, mail),
  insertUser: (params) => User.insert(params),
  findUser: (data01, data02) => User.selectWhere(data01, data02),
  findLikeUser: (str) => User.selectLike(str),
  // 获取用户详情
  selectUserDetail: (id) => User.selectUserDetail(id)
}

module.exports = userController
