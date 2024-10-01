<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-23 23:01:35
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 16:51:59
 * @FilePath: \Isteyft-Boke\src\views\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import {ref} from 'vue'
import { useThemeStore } from '@/stores/dark';
const themeStore = useThemeStore();
const buttomIcon = ref('Sunny')
const handleDark = () => {
  if (buttomIcon.value === "Sunny") {
    buttomIcon.value = "Moon"
  } else {
    buttomIcon.value = "Sunny"
  }
  themeStore.toggleTheme();
}
const VisIcon = ref('View')
const handleView = () => {
  if (VisIcon.value === "View") {
    VisIcon.value = "Hide"
  } else {
    VisIcon.value = "View"
  }
}
</script>

<template>
  <div class="common-layout">
      <MyInfo class="header" v-show="VisIcon === 'View'" />
    <el-container class="containers">
      <MyDec  v-if="VisIcon === 'View'" />
      <el-container class="">
        <el-main class="right-main" :class="{ 'view-main': VisIcon === 'Hide' }">
          <router-view class="main" :class="{ 'view-main': VisIcon === 'Hide' }"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-button class="visbuttom" size="default" @click="handleView">
      <component class="icons" :is="VisIcon"></component>
    </el-button>
    <el-button class="darkbuttom" size="default" @click="handleDark">
      <component class="icons" :is="buttomIcon"></component>
    </el-button>
  </div>
</template>

<style scoped lang="less">
.common-layout {
  height: 100%;
  transition-duration: 1000ms;
  margin: auto;
  position: relative; 
}
.view-main {
  min-height: 700px;
  height: 100%;
}
.containers {
  margin: 0 10%;
  margin-top: 10px;
}
.visbuttom {
  transition-duration: 1000ms;
  position: absolute;
  bottom: 140px;
  right: 10px;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  .icons {
    width: 20px;
    height: 20px;
  }
}
.darkbuttom {
  transition-duration: 1000ms;
  position: absolute;
  bottom: 100px;
  right: 10px;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  .icons {
    width: 20px;
    height: 20px;
  }
}
@media (max-width:768px) {
  .header {
    z-index: 999;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .containers {
    margin: auto;
    width: 100%;
    height: 100%;
  }
  .right-main {
    padding: 0;
  }
  .main {
    width: 100%;
    height: 100%;
    padding: 0;
    min-width: auto;
  }
  .view-main {
    margin-bottom: 0;
  }
}
</style>