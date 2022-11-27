const knex = require('./knex')

module.exports = (table_name) => {
  console.log(1)
  // 奇怪 createTable不是执行了吗 为什么需要添加return 才会建表
  // 要有返回值才能执行建表操作？
  return knex.schema.createTable(table_name, (table) => {
    console.log(2)
    table.increments('id').primary()
    table.string('name')
    table.string('age')
    table.string('sex')
  })
}
