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
}

module.exports = Base
