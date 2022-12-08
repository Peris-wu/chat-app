const userController = require('../controller/user')

// encrypt decrypt  加密/解密
const bcrypt = require('../utils/bcrypt')

// require jsonwebtoken
const jwt = require('../utils/jsonwebtoken')

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
    pwd = bcrypt.encrypt(pwd)
    const dateTime = new Date()
    const imgUrl = '../../static/images/template/02.jpg'
    const params = {
      user,
      mail,
      pwd,
      dateTime,
      imgUrl
    }
    const result = await userController.insertUser(params)
    return result
  } catch (err) {
    console.log(err)
  }
}

exports.insertAccount = insertAccount

// login
const loginAccount = async (data, pwd) => {
  try {
    const isExist = await userController.findUser(data, data)
    const [userInfo] = isExist
    console.log(userInfo)
    // console.log(isExist)
    let result
    if (isExist.length) {
      // 找到帐号
      const compareResult = bcrypt.decrypt(pwd, userInfo.pwd)
      if (compareResult) {
        // 帐号密码正确
        // 生成 token
        const token = jwt.sign(
          {
            id: userInfo.id
          },
          60 * 60 * 24
        )
        result = {
          user: userInfo.user,
          imgUrl: userInfo.imgUrl,
          code: 200,
          token,
          msg: '登录成功,返回对应数据'
        }
      } else {
        // 密码错误 返回信息告诉客户端
        result = {
          code: 400,
          msg: '登录失败,帐号/密码不正确'
        }
      }
    } else {
      // 没找到帐号
      result = {
        code: 400,
        msg: '登录失败,帐号/密码不正确'
      }
    }
    return result
  } catch (err) {
    console.log(err)
  }
}

exports.loginAccount = loginAccount

// 模糊搜索好友

const searchFriendLike = async (str) => {
  try {
    const result = await userController.findLikeUser(str)
    return result
  } catch (err) {
    console.log(err)
  }
}
exports.searchFriendLike = searchFriendLike
