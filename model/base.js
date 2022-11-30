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
}

module.exports = Base
