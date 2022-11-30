const userController = require('../controller/user')

// 查询user/mail是否存在

const isAccountExist = async (user, mail) => {
  try {
    const result = await userController.orWhereUser(user, mail)
    let isExist = false
    result.length >= 1 ? (isExist = true) : (isExist = false)
    return isExist
  } catch (err) {
    console.log(err)
  }
}
exports.isAccountExist = isAccountExist
