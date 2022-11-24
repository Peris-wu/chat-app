const config = require('../config')
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
  },
  pool: {
    min: 0,
    max: 10
  },
  log: {
    error(message) {
      console.log('[knex error]', message)
    }
  }
})
module.exports = knex
