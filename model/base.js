const knex = require('./knex')
class Base {
  constructor(prop) {
    this.tableName = prop
  }
  all = () => knex(this.tableName).select()
}

module.exports = Base
