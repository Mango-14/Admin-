const express = require('express')
const router = express.Router()
const multer = require('multer')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
//导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 导入更新用户信息需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')
//导入修改密码信息需要的验证规则对象
const { update_password_schema } = require('../schema/user')
//导入修改用户头像信息需要的验证规则对象
const { update_avatar_schema } = require('../schema/user')


//获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //上传目录
    cb(null, './uploads/user_pic') //注意在public创建upload文件夹
  },
  filename: function (req, file, cb) { //上传图片的文件名
    //加上时间戳 防止上传同一张图片重名
    var timer = Date.now()
    cb(null, timer + "-user_pic-" + file.originalname) //上传的文件名originalname
  }
})
const upload = multer({ storage: storage }).any();//any表示接收任何格式的文件
//上传头像
router.post("/uploadimg", upload, userinfo_handler.uploadAvadar)
//向外共享路由对象
module.exports = router