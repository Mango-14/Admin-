// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入echarts函数模块
const echartsHandler = require('../router_handler/echarts')

router.get('/echartsData',  echartsHandler.getEchartsData)

//将路由对象共享出去
module.exports = router