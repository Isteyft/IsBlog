/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-23 23:41:18
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-09-24 10:23:54
 * @FilePath: \Isteyft-Boke\src\stores\admin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import {ref} from 'vue'
function initState() {
  return {
    isCollapse: false,
    currentMenu: {
      label: '管理界面',
    },
  }
}

export const adminStore = defineStore('admin', () => {
  const state = ref(initState())
  function selectMenu(val) {
    state.value.currentMenu = val;
  }
  return { state, selectMenu }
})