import { defineStore } from 'pinia'
import { constantRoutes } from '@/router/dynamic-router'
import { handleRouter } from '@/router/routerFun'
import { useTabStore } from './tabs'
import { getUserInfo, transformAuthRouteToMenu, handleRouterData, getPathPrefix } from '@/utils'
import { microApplicationAllList } from '@/utils/qiankun'

export const useRouteStore = defineStore('route-store', {
  state: () => ({
    isInitedAuthRoute: false,
    routeHomeName: 'dashboard_analysis',
    menus: [],
    searchMenus: [],
    cacheRouters: new Map([]), // 已经注册的微应用列表
    routeAll: [],
  }),
  actions: {
    // 设置微应用程序列表
    setMicroApplicationList({ key, value }) {
      this.cacheRouters.set(key, value)
    },
    // 通过路径获取微应用配置
    getFindMicroConfig(path) {
      return microApplicationAllList.find(e => getPathPrefix(path, '/') === getPathPrefix(e.activeRule, '/'))
    },

    /**
     * 处理权限路由
     * @param routes - 权限路由
     * @param router - 路由实例
     */
    handleAuthRoutes(routes, router) {
      this.menus = transformAuthRouteToMenu(routes)
      const vueRoutes = handleRouter(routes)
      this.routeAll = vueRoutes
      vueRoutes.forEach(route => {
        router.addRoute(route)
        router.options.routes.push(route)
      })
    },
    /**
     * 初始化动态路由
     * @param router - 路由实例
     */
    async initDynamicRoute(router) {
      // const { userId } = getUserInfo()
      // const { data } = await fetchUserRoutes(userId)
      const data = handleRouterData(constantRoutes)
      console.log(data)
      if (data) {
        this.handleAuthRoutes(data, router)
      }
    },
    /**
     * 初始化权限路由
     * @param router - 路由实例
     */
    async initAuthRoute(router) {
      const { initHomeTab } = useTabStore()
      const { userId } = getUserInfo()
      if (!userId) return false
      try {
        await this.initDynamicRoute(router)
      } catch (error) {
        return false
      }

      initHomeTab(this.routeHomeName, router)
      this.isInitedAuthRoute = true
      return true
    },
  },
})
