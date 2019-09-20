import axios from "axios"

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时, 5000毫秒
})

request.interceptors.request.use(config => {
    // 请求拦截
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  // response.data
  return response
}, error => {
  return Promise.reject(error)
})

export default request
