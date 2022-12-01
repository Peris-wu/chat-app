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
    //
  }
}
exports.isAccountExist = isAccountExist

// 注册user/mail
const insertAccount = async (user, mail, pwd) => {
  try {
    const params = {
      user,
      mail,
      pwd
    }
    const result = await userController.insertUser(params)
    return result
  } catch (err) {
    console.log(err)
  }
}
exports.insertAccount = insertAccount
