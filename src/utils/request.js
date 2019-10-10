import axios from "axios"
import { Loading, Message } from 'element-ui'

const loading = {
  loadingInstance: null,
  open () {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: '.main',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, .5)'
      })
    }
  },
  close () {
    // 不为空时, 则关闭加载窗口
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时, 5000毫秒
})

request.interceptors.request.use(config => {
  // 请求拦截
  loading.open()
  return config
}, error => {
  loading.close()
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  loading.close()
  const resp = response.data
  if (resp.code !== 2000) {
    Message({
      message: resp.message || '哦吼, 加载失败了!',
      type: 'warning',
      duration: 5000
    })
  }
  return response
}, error => {
  loading.close()
  Message({
    message: error.message,
    type: 'error',
    duration: 5000
  })
  return Promise.reject(error)
})

export default request
