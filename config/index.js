const config = {
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '666666',
    database: 'chat'
  },
  log: {
    err(message) {
      console.log(`[knex err]`, message)
    }
  }
}
module.exports = config
