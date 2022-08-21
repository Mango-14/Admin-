// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) { //上传目录
    cb(null, './uploads/cover_img') //注意在public创建upload文件夹
  },
  filename: function (req, file, cb) { //上传图片的文件名
    //加上时间戳 防止上传同一张图片重名
    var timer = Date.now()
    cb(null, timer + "-cover_img-" + file.originalname) //上传的文件名originalname
  }
})
const upload = multer({ storage: storage }).any();//any表示接收任何格式的文件

// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 发布新文章的路由
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload, expressJoi(add_article_schema), article_handler.addArticle)

router.get('/getarticles', article_handler.getArticle)


module.exports = router

