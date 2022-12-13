// 用户 Controller
const userController = require('../controller/user')

// 好友 Controller
const friendsServer = require('./friends')

// 消息 Controller
const messageServer = require('./message')

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

// 获取用户详情

const selectUserDetail = async (token, next) => {
  try {
    const { id } = jwt.verify(token)
    console.log(id)
    const result = await userController.selectUserDetail(id)
    return result
  } catch (err) {
    next(`error selectUserDetail->${err}`)
  }
}
exports.selectUserDetail = selectUserDetail

// 修改用户详情

const modifyUserDetail = async (params, next) => {
  try {
    const { id } = jwt.verify(params.token)
    if (params.token) delete params.token
    const result = await userController.modifyUserDetail(id, params)
    return result
  } catch (err) {
    next(`modifyUserDetail err -> ${err}`)
  }
}
exports.modifyUserDetail = modifyUserDetail

// 申请好友
const applyFriend = async (params, next) => {
  try {
    const { id } = jwt.verify(params.token)
    if (params.token) delete params.token
    // 判断好友表是否有申请的记录
    const handleParams = {
      userId: id,
      fId: params.fId
    }
    const isExist = await friendsServer.isFriends(handleParams, next)
    // console.log(isExist)
    if (isExist.length) {
      // 更新 好友申请的时间
      const now = new Date()
      // 申请者
      const applyResult = await friendsServer.updateApplyTime(
        {
          userId: id,
          fId: params.fId
        },
        {
          time: now
        }
      )

      // 被申请者
      const checkResult = await friendsServer.updateApplyTime(
        {
          userId: params.fId,
          fId: id
        },
        {
          time: now
        }
      )
    } else {
      // 添加两条记录
      // 申请者userId 被申请者fId  state 2
      // 申请者fId 被申请者userId state 1

      // 申请者
      const applyResult = await friendsServer.buildFriend({
        userId: id,
        fId: params.fId,
        msg: params.msg,
        state: 2,
        time: new Date(),
        lastTime: new Date()
      })

      // 被申请者
      const checkResult = await friendsServer.buildFriend({
        userId: params.fId,
        fId: id,
        msg: params.msg,
        state: 1,
        time: new Date(),
        lastTime: new Date()
      })
    }
    // 向被申请者插入一条message
    const messageResult = await messageServer.insertMessage(
      params.fId,
      id,
      params.msg,
      0,
      next
    )
  } catch (err) {
    next(`applyFriend error -> ${err}`)
  }
}
exports.applyFriend = applyFriend
