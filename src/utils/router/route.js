import { useRouter } from 'vue-router'
import { router as globalRouter } from '@/router'
import { microApplicationAllList } from '@/utils/qiankun'

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  function routerPush(to, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
    } else {
      router.push(to)
    }
  }

  /** 返回上一级路由 */
  function routerBack() {
    router.go(-1)
  }

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toHome(newTab = false) {
    routerPush({ name: 'root' }, newTab)
  }

  /**
   * 跳转登录页面
   * @param loginModule - 展示的登录模块
   * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
   */
  function toLogin(loginModule, redirectUrl) {
    const module = loginModule || 'pwd-login'
    const routeLocation = {
      name: 'login',
      params: { module },
    }
    const redirect = redirectUrl || route.value.fullPath
    Object.assign(routeLocation, { query: { redirect } })
    routerPush(routeLocation)
  }

  /**
   * 登录页切换其他模块
   * @param module - 切换后的登录模块
   */
  function toLoginModule(module) {
    const { query } = route.value
    routerPush({ name: 'login', params: { module }, query })
  }

  /**
   * 登录成功后跳转重定向的地址
   */
  function toLoginRedirect() {
    const { query } = route.value
    console.log('登录后跳转的位置', route.value)

    if (query?.redirect) {
      routerPush(query.redirect)
    } else {
      toHome()
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLogin,
    toLoginModule,
    toLoginRedirect,
  }
}

/**
 * 将后端数据清洗为router格式
 */
export const handleRouterData = data => {
  return data.map(e => {
    let { path, children, ...meta } = e

    const item = {
      name: path.substring(1, path.length).replace(new RegExp('/', 'g'), '_'),
      meta,
      path: `/${meta.microNmae}${path}`,
    }
    if (children?.length) item.children = handleRouterData(children)
    if (children && children.length) item.redirect = item.children[0].path
    return item
  })
}

export const qiankunRoute = (route, activeRule) => {
  const router = route.map(e => {
    if (!e?.path.startsWith(activeRule)) {
      return undefined
    }
    if (e.children && e.children.length) e.children = qiankunRoute(e.children, activeRule)
    e.children = e?.children?.filter(e => e)
    return e
  })
  return router.filter(e => e)
}
