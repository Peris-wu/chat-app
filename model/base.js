const knex = require('./knex')
class Base {
  constructor(prop) {
    this.tableName = prop
  }
  all = () => knex(this.tableName).select()

  // select * from 'tableName' where user=? or mail=?
  orWhere = (user, mail) => {
    return knex(this.tableName).where(function () {
      this.where('user', user).orWhere('mail', mail)
    })
  }
  insert = (params) => knex(this.tableName).insert(params)
  // 条件查询
  selectWhere = (data01, data02) => {
    return knex(this.tableName)
      .where(function () {
        this.where('user', data01).orWhere('mail', data02)
      })
      .select()
  }

  // 模糊搜索
  selectLike(str) {
    return knex(this.tableName)
      .where(function () {
        this.where('user', 'like', `%${str}%`).orWhere(
          'mail',
          'like',
          `%${str}%`
        )
      })
      .select()
  }

  // 用户详情
  selectUserDetail = (id) => knex(this.tableName).where('id', id).select()

  // 修改用户详情
  modifyUserDetail = (id, params) =>
    knex(this.tableName).where('id', id).update(params)

  //判断是否为好友
  isFriend = (params) => knex(this.tableName).where(params).select()

  // 添加好友
  buildFriend = (params) => {
    return knex(this.tableName).insert(params)
  }
  // 更新好友申请的时间
  updateApplyTime = (params, updateParams) => {
    return knex(this.tableName).where(params).update(updateParams)
  }

  // 插入一条消息
  inserMessage = (params) => {
    return knex(this.tableName).insert(params)
  }
}

module.exports = Base
