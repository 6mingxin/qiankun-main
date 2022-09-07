import { useRouteStore } from '@/store'
import { getToken } from '@/utils'

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(to, _from, next, router) {
  const route = useRouteStore()
  const isLogin = Boolean(getToken())
  let is = [true, true]
  // 初始化权限路由
  if (!route.isInitedAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.name === 'login') {
        next()
      } else {
        const redirect = to.fullPath
        next({ name: 'login', query: { redirect } })
      }
      return [false, false]
    }

    await route.initAuthRoute(router)

    if (route.isInitedAuthRoute) {
      // next({ ...to, replace: true })
      is = [false, route.isInitedAuthRoute]
    }

    if (to.name === 'not-found-page') {
      // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
      next({ path: to.fullPath, replace: true, query: to.query })
      return [false, false]
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到not-found
  if (to.name === 'not-found-page') {
    next({ name: 'not-found', replace: true })
    return [false, false]
  }

  return is
}
