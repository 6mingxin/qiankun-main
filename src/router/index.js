import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './default'

import { createRouterGuard } from './guard'

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export async function setupRouter(app) {
  app.use(router)
  createRouterGuard(router) //路由守卫
  await router.isReady() //路由是否挂载完成
}

export * from './routerFun'
