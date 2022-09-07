import { views } from '@/views'
/** 路由名称 */
// export const routeName = (key) => key

/** 路由路径 */
export function routePath(key) {
  const rootPath = '/'
  if (key === 'root') return rootPath
  const splitMark = '_'
  const pathSplitMark = '/'
  const path = key.split(splitMark).join(pathSplitMark)
  return pathSplitMark + path
}

/**
 * 路由表中的路由与文件实例映射
 * @param routers
 * @returns
 */
export function handleRouter(routers) {
  let routes = []
  // addRoute
  routes = routers.map(e => {
    e.component = views[e.name] || (() => import('@/layout/layout.vue'))
    if (e.children && e.children.length) handleRouter(e.children)
    return e
  })
  return routes
}
