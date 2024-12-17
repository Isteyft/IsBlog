<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-08-24 21:34:34
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-02 00:59:37
 * @FilePath: \vue-m-system\src\components\CommonHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import {ref,computed,onMounted} from 'vue';
import {adminStore} from '@/stores/admin';
import { useThemeStore } from '@/stores/dark';
import {useRouter} from 'vue-router';
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.jpg`,import.meta.url).href;
}; 
const store = adminStore();
const handerCollapse = () => {
  store.state.isCollapse = !store.state.isCollapse;
};
const router = useRouter();
const handleLoginOut = () => {
  store.clearUserInfo();
  router.push('/login');
};
const ThemeIcon = ref('Sunny');
const themeStore = useThemeStore();
const handleDark = () => {
  if (ThemeIcon.value === "Sunny") {
    ThemeIcon.value = "Moon";
  } else {
    ThemeIcon.value = "Sunny";
  }
  themeStore.toggleTheme();
};
const GoHome = () => {
  router.push('/home');
};
const current = computed(()=>store.state.currentMenu);
const buttomIcon = ref('Menu');
onMounted(()=>{
  current;
});
</script>

<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small" @click="handerCollapse">
        <component class="icons" :is="buttomIcon"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-if="current" :to="{ path: current.path }">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="darkbuttom" @click="handleDark">
        <component class="icons" :is="ThemeIcon"></component>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="GoHome">回到首页</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.darkbuttom {
  transition-duration: 1000ms;
  .icons {
    width: 20px;
    height: 20px;
  }
}
.icons {
  width: 20px;
  height: 20px;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>