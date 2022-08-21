const moment = require('moment')

// 导入数据库操作模块
const db = require('../database/index')
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  // 手动判断是否上传了文章封面
  if (!req.files[0]) return res.cc('文章封面是必选参数！')

  // TODO：表单数据合法，继续后面的处理流程...

  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: 'http://127.0.0.1:8080/' + req.files[0].path,
    // 文章发布时间
    pub_date: moment().format("YYYY-MM-DD HH:MM:SS "),
  }
  const sql = `insert into ev_articles set ?`

  // 执行 SQL 语句
  db.query(sql, articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('发布文章失败！')

    // 发布文章成功
    res.cc('发布文章成功', 200)
  })

}

// 获取文章列表数据的处理函数
exports.getArticle = (req, res) => {
  const sql = 'select * from ev_articles where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      code: 200,
      message: '获取文章列表成功！',
      data: results,
    })
  })
}


