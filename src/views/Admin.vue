<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-23 23:10:30
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-09-23 23:13:23
 * @FilePath: \Isteyft-Boke\src\views\Admin.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
  import CommonAside from '@/components/CommonAside.vue';
  import CommonHeader from '@/components/CommonHeader.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <CommonAside />
      <el-container>
        <el-header class="el-header">
          <CommonHeader />
        </el-header>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout,.lay-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
</style>