const db = require('../database/index')
//加密密码
const bcrypt = require('bcryptjs')
//用来生成token字符串
const jwt = require('jsonwebtoken')

//注册用户的处理函数
exports.register = (req, res) => {
  //接受表单数据
  const userInfo = req.body
  //判断数据是否合法
  if (!userInfo.username || !userInfo.password) {
    /* return res.send({
      status: 1,
      message: '用户名或密码不能为空',
    }) */
    return res.cc('用户名或密码不能为空')
  }
  //定义sql语句
  const sqlSelect = 'select * from ev_users where username=?'
  db.query(sqlSelect, [userInfo.username], (err, results) => {
    //执行sql语句失败
    if (err) {
      /* return res.send({ status: 1, message: err.message }) */
      return res.cc(err)
    }
    //用户名被占用
    if (results.length > 0) {
      /* return res.send({ status: 1, message: '用户名被占用，请更换用户名' }) */
      return res.cc('用户名被占用，请更换用户名')
    }
    //对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    //插入新用户
    const sqlInsert = 'insert into ev_users set ?'
    db.query(sqlInsert, userInfo, (err, results) => {
      //执行sql语句失败
      if (err) {
        /* return res.send({ status: 1, message: err.message }) */
        return res.cc(err)
      }
      //sql语句执行成功，但影响行数不为1
      if (results.affectedRows !== 1) {
        /* return res.send({ status: 1, message: '注册用户失败，请稍后再试！' }) */
        return res.cc('注册用户失败，请稍后再试！')
      }
      //注册成功
      /*  res.send({ status: 0, message: '注册成功！' }) */
      res.cc('注册成功！', 200)
    })
  })
}

//登陆的处理函数
exports.login = (req, res) => {
  const userInfo = req.body
  const sqlSelect = 'select * from ev_users where username=?'
  db.query(sqlSelect, userInfo.username, (err, results) => {
    //执行sql语句失败
    if (err) return res.cc(err)
    //执行sql语句成功，但是查询到数据条款不等于1
    if (results.length !== 1) return res.cc('该用户不存在', 202)
    //对比密码是否正确
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) return res.cc('密码错误', 203)
    //生成token字段
    //只保留用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: '', user_pic: '' }
    //导入配置文件
    const config = require('../config')
    //生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '1000h', //token有效期为10个小时
    })
    res.send({
      code: 200,
      message: '登陆成功！',
      token: 'Bearer' + tokenStr,
    })
  })
}