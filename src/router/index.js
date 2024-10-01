/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-21 17:40:19
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 15:03:33
 * @FilePath: \Isteyft-Boke\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: '/boke/:id',
          name: 'boke',
          component: () => import('@/views/Boke.vue'),
        },
        {
          path: '/image',
          name: 'image',
          component: () => import('@/views/Home.vue'),
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/glbk',
      component: () => import('@/views/Admin.vue'),
      children: [
        {
          path: '/glbk',
          name: 'adminBoke',
          component: () => import('@/views/Glbk.vue'),
        },
        {
          path: '/glpl',
          name: 'adminPl',
          component: () => import('@/views/Glpl.vue'),
        },
        {
          path: '/glimage',
          name: 'adminImage',
          component: () => import('@/views/GlImage.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue'),
    },
    {     
      path: '/:catchAll(.*)',
      redirect: '/404', 
      hidden: true 
    }
  ],
  
  // scrollBehavior(){
  //   return{
  //     top: 0
  //   }
  // }
})

export default router