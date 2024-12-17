<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-23 23:01:35
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-09 18:10:40
 * @FilePath: \Isteyft-Boke\src\views\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import {ref,reactive,onMounted,onBeforeUnmount} from 'vue';
import { useThemeStore } from '@/stores/dark';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";
const router = useRouter();
const themeStore = useThemeStore();
const buttomIcon = ref('Sunny');
const Operation = ref('Operation');
const formInline = reactive({
  keyWord: ''
});
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.jpg`,import.meta.url).href;
}; 
const handleDark = () => {
  if (buttomIcon.value === "Sunny") {
    buttomIcon.value = "Moon";
  } else {
    buttomIcon.value = "Sunny";
  }
  themeStore.toggleTheme();
};
const onSerach = () => {
  if(formInline.keyWord === '') return;
  router.push({ path: `/search/${formInline.keyWord}`});
  formInline.keyWord = '';
};
const isMenuOpen = ref(false);
const handleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
// 关闭菜单的方法
const closeMenu = () => {
  isMenuOpen.value = false;
};
// 监听 Esc 键来关闭菜单
const escKeyHandler = (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};
// 添加事件监听器
onMounted(() => {
  window.addEventListener('keydown', escKeyHandler);
});
// 移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('keydown', escKeyHandler);
});
</script>

<template>
  <div class="boke">
    <div class="common-layout">
      <el-header class="header">
        <span class="title">Isteyft</span>
        <div class="nav">
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/skill">技术</router-link></li>
            <li><router-link to="/day">日常</router-link></li>
            <li><router-link to="/note">笔记</router-link></li>
            <li><router-link to="/me">关于</router-link></li>
            <li class="dark">
              <div class="darkbuttom" @click="handleDark">
                <component class="icons" :is="buttomIcon"></component>
              </div>
            </li>
            <li class="serach">
              <el-input
              v-model="formInline.keyWord"
              placeholder="请输入搜索内容"
            >
              <template #append>
                <el-button class="rounded-button" :icon="Search" @click="onSerach()" />
              </template>
            </el-input>
            </li>
          </ul>
        </div>
      </el-header>
      <div class="openmenu">
        <component class="icons" :is="Operation"  @click="handleMenu()"></component>
      </div>
      <div class="menu-close" :class="{ active: isMenuOpen }"  @click="closeMenu()"></div>
        <div class="menu" :class="{ active: isMenuOpen }">
          <div class="me mycard">
            <div class="userIcon">
              <img :src="getImageUrl('user')" class="user" />
            </div>
            <div class="userInfo">
              <h1>鬼灯明里</h1>
              <p>技术宅，大懒人一个</p>
            </div>
          </div> 
          <div class="serach">
            <el-input v-model="formInline.keyWord" placeholder="请输入搜索内容">
              <template #append>
                <el-button class="rounded-button" :icon="Search" @click="onSerach()" />
              </template>
            </el-input>
          </div>
          <ul>
            <li>
              <router-link to="/">
                <el-icon><HomeFilled /></el-icon>
                <p>首页</p>
              </router-link>
            </li>
            <li>
              <router-link to="/skill">
                <el-icon><Document /></el-icon>
                <p>技术</p>
              </router-link>
            </li>
            <li>
              <router-link to="/day">
                <el-icon><Calendar /></el-icon>
                <p>日常</p>
              </router-link>
            </li>
            <li>
              <router-link to="/note">
                <el-icon><Notebook /></el-icon>
                <p>笔记</p>
              </router-link>
            </li>
            <li>
              <router-link to="/me">
                <el-icon><User /></el-icon>
                <p>关于</p>
              </router-link>
            </li>
            <li>
              <div @click="handleDark()">
                <div v-if="buttomIcon.value !== 'Sunny'">
                  <el-icon><Sunny /></el-icon>
                  <p>夜间</p>
                </div>
                <div v-else>
                  <el-icon><Moon /></el-icon>
                <p>日间</p>
                </div>
              </div>
            </li>
          </ul>
      </div>
    <el-container class="containers">
      <el-container class="">
        <el-main class="right-main view-main">
          <router-view :key="$route.fullPath" class="main view-main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</div>
</template>

<style scoped lang="less">
.boke {
  width: 100%;
  background-image: var(--background-img);
  background-size: cover;
  background-attachment: scroll;
}
.common-layout {
  transition-duration: 1000ms;
  margin: auto;
  height: 100%;
}
.header {
  position: sticky;
  background-color: var(--header-bg-color);
  color: var(--header-font-color);
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 32px;
  height: 64px;
  padding: 16px;
  z-index: 3;
  .title {
    font-size: 24px;
    font-weight: 400;
  }
  ul {
    display: flex;
    li {
      padding-left: 16px;
      padding-right: 16px;
      border-left: 2px solid var(--header-border-color);
      .serach {
        border-radius: 50%;
      }
    }
  }
}
.openmenu,.menu,.menu-close {
  display: none;
}
.containers {
  margin: 0 auto;
  min-width: 768px;
  max-width: 1280px;
  margin-top: 10px;
}
.darkbuttom {
  transition-duration: 1000ms;
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
    display: none;
    width: 100%;
  }
  .openmenu {
    height: 32px;
    width: 32px;
    right: 0px;
    position: absolute;
    display: block;
    .icon {
      height: 32px;
      width: 32px;
    }
  }
  .menu-close {
    display: block;
    z-index: 14;
    right: -100%;
    position: fixed;
    width: 100%;
    height:100%;
  }
  .menu {
    z-index: 15;
    right: -100%; /* 初始位置在屏幕右侧外 */
    display: block;
    position: fixed;
    top: 0;
    width: 60%;
    height:100%;
    padding: 20px;
    background-color: var(--el-bg-color);
    z-index: 9;
    transition: right 0.3s ease-in-out;
    .mycard {
      border-radius: 10px;
      padding: 0;
      background: var(--el-bg-color);
    }
    .me {
      display: flex;
      .userIcon {
        .user {
          border-radius: 10px;
          width: 72px;
          height: 72px;
        }
      }
      .userInfo {
        line-height: 24px;
        h1 {
          font-size: 18px;
        }
        p {
          font-size: 16px;
        }
      }
    }
    .serach {
      padding: 10px;
    }
    ul {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 33%;
        background: var(--el-content-color);
        padding: 5px;
        font-size: 32px;
        text-align: center;
        color: var(--el-box-color);
        border: 1px solid var(--el-border-colors);
        p{
          font-size: 20px;
        }
        .darkbuttom {
          transition-duration: 1000ms;
          .icons {
            font-size: 28px;
          }
        }
      }
    }
  }
  .active {
    right: 0;
    z-index: 15;
  }
  .containers {
    margin: auto;
    width: 100%;
    max-width: 768px;
    min-width: 360px;
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