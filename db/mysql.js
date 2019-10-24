const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开启链接
connection.connect()

// 统一执行 sql 语句
function execSql(sql) {
  console.log('sql: ', sql)
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error)
        return
      }
      resolve(results)
    })
  })
  return promise
}

module.exports = {
  execSql,
  escape: mysql.escape
}
