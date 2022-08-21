const express = require('express')
const app = express()

//解析json格式的请求体，把请求体赋值给req.body
app.use(express.json())
//解析application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

//封装响应失败的中间件
app.use((req, res, next) => {
  //status = 0 为成功 = 1为失败，默认为失败
  res.cc = (err, code = 1) => {
    res.send({
      code,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

/* const config = require('./config')
//解析token的中间件
const expressJWT = require('express-jwt')
//指定哪些接口不需要进行token的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })) */


//配置跨域
const cors = require('cors')
app.use(cors())

//导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//导入并注册用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 导入并使用echarts模块
const echartsRouter = require('./router/echarts')
app.use('/api', echartsRouter)

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

//错误中间件
const joi = require('joi')
app.use((err, req, res, next) => {
  //数据验证失败
  if (err instanceof joi.ValidationError)
    return res.cc(err)
  //捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError')
    return res.cc('身份认证失败！', 201)
  //未知错误
  res.cc(err)
})

//调用app.listen方法，指定端口号并启动web服务器
app.listen(8080, () => {
  console.log('api server running at http://127.0.0.1:8080');
})