// store/index.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false, // 初始状态为非暗色模式
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
});