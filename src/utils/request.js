/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-22 01:19:36
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 20:08:06
 * @FilePath: \Isteyft-Boke\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
const NETWORK_ERROR = '网络错误......'
// 创建axios实例
const http = axios.create({
  baseURL: 'https://isteyft.top:8888',
  timeout: 5000
})

// axios请求拦截器
http.interceptors.request.use(function (config) {
  // console.log(config);
  if (config.method === 'get' && config.data) {
    config.params = config.data;
    delete config.data;
  }
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error);
  return Promise.reject(error);
});

// axios响应式拦截器
http.interceptors.response.use(function (response) {
  const {code,data,msg} = response.data
  if(code === 200) {
    return {data,msg}
  }
  else if(code === 401) {
    ElMessage({
      message: msg,
      type: 'error',
      showClose: true,
      offset: 50,
      duration: 1000,
    });
    // location.href('https://isteyft.top/#/login')
    return Promise.reject(msg);
  }
  else if(code > 401 || code < 500) {
    ElMessage({
      message: msg,
      type: 'error',
      showClose: true,
      offset: 50,
      duration: 1000,
    });
    return Promise.reject(msg);
  }
  return response
}, function (error) {
  console.log(error);
  
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  ElMessage.error(error.response.data.message || NETWORK_ERROR)
  if (error.status === 401) {
    return {code:401,msg:"error"}
  }
  return Promise.reject(error);
});


export default http