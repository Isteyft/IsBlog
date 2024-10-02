/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-21 17:40:19
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-02 02:22:52
 * @FilePath: \Isteyft-Boke\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/less/index.less'
import '@/assets/dark/css-vars.css'
import {useThemeStore} from '@/stores/dark'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(router)
 
const pinia = createPinia() //创建pinia实例
pinia.use(piniaPluginPersistedstate) //将插件添加到 pinia 实例上
app.use(pinia)
// 获取主题 Store
const themeStore = useThemeStore();

// 初始化主题
themeStore.initializeTheme = function () {
  if (localStorage.getItem('theme') === 'dark') {
    this.isDarkMode = true;
  }
};

// 初始化主题状态
themeStore.initializeTheme();

// 订阅主题变更
themeStore.$subscribe((mutation, state) => {
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});


app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
