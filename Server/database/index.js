const mysql = require('mysql')

//创建数据库连接对象
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lhg1031817710',
  database: 'my_db_01',
})

module.exports = db