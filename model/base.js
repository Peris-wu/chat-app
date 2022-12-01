const knex = require('./knex')
class Base {
  constructor(prop) {
    this.tableName = prop
  }
  all = () => knex(this.tableName).select()

  // select * from 'tableName' where user=? or mail=?
  orWhere = (user, mail) => {
    // console.log(user, mail)
    return knex(this.tableName).where(function () {
      this.where('user', user).orWhere('mail', mail)
    })
  }
  insert = (params) => {
    console.log(params)
    return knex(this.tableName).insert(params)
  }
}

module.exports = Base
