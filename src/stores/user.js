/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-07-16 16:56:53
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-09-24 11:06:41
 * @FilePath: \vue-rabbit\src\stores\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const setUserInfo = (user) => {
    userInfo.value = user
  }
  const getUserInfo = () => {
    return userInfo.value
  }
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getUserInfo,
    setUserInfo,
    clearUserInfo
  }
},{
persist: true,
})