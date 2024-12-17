import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import babel from 'vite-plugin-babel';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    babel(),  // 添加 Babel 插件
    // babel({
    //   presets: ['@babel/preset-env'],
    //   plugins: ['@babel/plugin-transform-runtime'], // 添加必要的 Babel 插件
    // }),
    // legacy({
    //   targets: ['ie >= 11'], // 根据需要指定浏览器版本
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    // }),
  ],
  // build: {
  //   target: 'es2015', // 根据实际需求调整这个值，比如设置为"es5"
  // },
  build: {
    target: 'es2015',  // 根据实际需求调整这个值
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8088', // 确保目标地址是完整的 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''), // 重写路径，移除前缀'/v1'
      }
    }
  }
});