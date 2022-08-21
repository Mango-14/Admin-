import axios from 'axios'
//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'


const requests = axios.create({
  //配置对象
  //基础路径
  baseURL: 'http://127.0.0.1:8080',
  timeout: 5000
})
//请求拦截器:在发请求时，请求拦截器可以检测到，并做一些配置
requests.interceptors.request.use((config) => {
  //进度条开始动
  nProgress.start()
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})


requests.interceptors.response.use(res => {
  nProgress.done()
  const code: number = res.data.code
  if (code !== 200) {
    ElMessage.error(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data
}, err => {
  return Promise.reject(err)
})

export default requests