// 请求模块
import axios from 'axios'
import qs from 'qs'
// import { getItem } from '../utils/storage'

const request = axios.create({
  baseURL: 'http://localhost:8080'
  // headers: {
  //   token: getItem('ZF_USER').token
  // }
})

request.qs = qs.stringify

// request.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

request.interceptors.request.use(config => {
  console.log(config)
  return config
})

export default request
