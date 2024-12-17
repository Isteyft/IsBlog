<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-21 17:40:19
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 00:16:07
 * @FilePath: \Isteyft-Boke\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
#app {
  background-image: var(--background-img);
  background-size: cover;
  background-attachment: scroll;
  transition-duration: 1000ms;
  background-color: var(--el-content-bg-color);
  width: 100%;
  overflow: auto;
  height: 100%;
}
.serach .el-input__wrapper {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.serach .el-input-group__append {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}
</style>

