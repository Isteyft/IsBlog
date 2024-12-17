<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-08-24 17:10:54
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-09-23 23:57:17
 * @FilePath: \vue-m-system\src\components\CommonAside.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import {ref,computed} from 'vue';
import { adminStore } from '@/stores/admin';
import { useRoute,useRouter } from 'vue-router';
let list = ref([
        {
          path: '/glbk',
          name: 'adminBoke',
          label: '博客管理',
          icon: 'Document',
          url: 'boke'
        },
        {
            path: '/glpl',
            name: 'adminPl',
            label: '评论管理',
            icon: 'ChatRound',
            url: 'pl'
        },
        {
            path: '/glimage',
            name: 'adminImage',
            label: '图片管理',
            icon: 'Picture',
            url: 'image'
        }
]);
const store = adminStore();
const isCollapse = computed(()=>store.state.isCollapse);
const width = computed(()=>store.state.isCollapse ? '64px' : '180px');
const route = useRoute();
const router = useRouter();
const activeMenu = computed(()=>route.path);
const handleMenu = (item) => {
  router.push(item.path);
  store.selectMenu(item);
};
</script>

<template>
  <el-aside :width="width">
  <el-menu background-color="#545c64" text-color="#fff"  :collapse="isCollapse" :collapse-transition="true" :default-active="activeMenu">
  <h3 v-show="!isCollapse">后台管理系统</h3>
  <h3 v-show="isCollapse">后台</h3>
  <el-menu-item v-for="item in list" :key="item.path" :index="item.path" @click="handleMenu(item)">
    <el-icon><setting /></el-icon>
    <component class="icons" :is="item.icon"></component>
    <span>{{item.label}}</span>
  </el-menu-item>
</el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.el-aside {
  transition-duration: 250ms;
}
.icons{
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>