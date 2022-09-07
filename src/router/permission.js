import { useRouteStore } from '@/store'
// import { routeName } from '@/router';
import { useAuthStore } from '@/store'
import { exeStrategyActions, getToken } from '@/utils'

import { createDynamicRouteGuard } from './dynamic'

/** 处理路由页面的权限 */
export async function createPermissionGuard(to, from, next, router) {
  // 动态路由
  const route = useRouteStore()
  const [permission, isInitedAuthRoute] = await createDynamicRouteGuard(to, from, next, router)
  const auth = useAuthStore()
  const isLogin = Boolean(getToken())
  // const isLogin = true
  const needLogin = Boolean(to.meta?.requiresAuth)
  // const hasPermission = !permissions.length || permissions.includes(auth.userInfo.userRole)

  //动态路由挂载完成，去路由地址的页面
  if (!permission && isInitedAuthRoute && (!needLogin || isLogin)) {
    next({ ...to, replace: true })
    return
  }
  // 如果当前路由挂载失败了或者在这次路由跳转之前路由就挂载完成了，不在执行下面的代码
  if (!permission && !isInitedAuthRoute) return

  // 外链路由, 从新标签打开，返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href)
    next({ path: from.fullPath, replace: true, query: from.query })

    return
  }

  const actions = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.name === 'login',
      () => {
        next({ name: 'root' })
      },
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next()
      },
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath
        next({ name: 'login', query: { redirect } })
      },
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin,
      () => {
        next()
      },
    ],
    // [
    //   // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
    //   isLogin && needLogin && !hasPermission,
    //   () => {
    //     next({ name: 'no-permission' })
    //   },
    // ],
  ]

  exeStrategyActions(actions)
}
