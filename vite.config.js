/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-21 17:40:19
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-09-24 11:16:34
 * @FilePath: \Isteyft-Boke\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 对以 /api 开头的请求进行代理
      '/v1': {
        target: 'localhost:8081', // 目标服务器地址
        changeOrigin: true, // 改变请求的源至目标URL
        // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，移除前缀'/api'
      }
    }
  }
})
