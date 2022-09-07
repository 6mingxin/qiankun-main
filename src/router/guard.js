import { createPermissionGuard } from './permission'
import { microApplicationLoading } from '@/utils/qiankun'

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start()
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next, router)
  })
  router.afterEach(to => {
    // 设置document title
    if (to.meta.title) window.document.title = to.meta.title
    // 1. 全局后置钩子调用微应用加载方法
    // 为什么笔者会在这里调用呢，其实是笔者利用了JavaScript机制的宏任务，目的就是为了在路由页获取是微应用的容器是否挂载了微应用，因为有时候微应用会因为作者系统的路由切换而被替换掉，所以用这个方式解决

    setTimeout(async () => {
      await microApplicationLoading(to.path) // 把当前跳转的路径传入
      // 结束 loadingBar
      window.$loadingBar?.finish()
    })
  })
}
