import { loadMicroApp } from 'qiankun'
import * as store from '@/store'
import { qiankunRoute } from '@/utils'

export const microApplicationAllList = [
  {
    name: 'qiankun-sub', // 应用的名字 必填 唯一
    entry: 'http://172.16.2.73:8081', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: '#container', // 挂载具体容器 ID
    // 3. 根据路由匹配，激活的子应用
    activeRule: '/qiankun-sub',
    props: {},
  },
  {
    name: 'qiankun-micro', // 应用的名字 必填 唯一
    entry: 'http://172.16.2.73:8082', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: '#container', // 挂载具体容器 ID
    // 3. 根据路由匹配，激活的子应用
    activeRule: '/qiankun-micro',
    props: {},
  },
]

// 加载微应用方法

export async function microApplicationLoading(path) {
  const routeStore = store.useRouteStore()
  // 1. 根据路由地址加载当前应用配置

  let currentActiveMicroConfig = routeStore.getFindMicroConfig(path)
  currentActiveMicroConfig.props['store'] = store
  currentActiveMicroConfig.props['routerList'] = qiankunRoute(routeStore.routeAll, currentActiveMicroConfig.activeRule)
  currentActiveMicroConfig.props['window'] = window
  // 2.获取缓存的微应用列表
  const microApplicationList = routeStore.cacheRouters

  // 3. 如果没有匹配应用配置则代表跳转的不是微应用 or 微应用配置不需要路由启动的属性
  console.log('这里挂了', currentActiveMicroConfig, currentActiveMicroConfig.isRouteStart)
  if (!currentActiveMicroConfig) {
    return
  }

  // 4. 根据应用配置 获取缓存的应用
  const cacheMicro = microApplicationList.get(currentActiveMicroConfig.activeRule)

  // 5. 判断当前挂载的是否有内容
  const containerNode = getContainerNode(currentActiveMicroConfig.container)
  const isNoTNodeContents = containerNode !== -1 && containerNode

  // 6. 如果没有dom节点 or 没有缓存应用配置 注册一下
  if (isNoTNodeContents || !cacheMicro) {
    // 如果有缓存应用配置，但是容器没有应用挂载，先卸载缓存应用再注册微应用
    if (cacheMicro) {
      cacheMicro.unmount()
      cacheMicro.unmountPromise.then(() => {
        loadRouterMicroApp(currentActiveMicroConfig, routeStore)
      })
      return
    }
    // 加载应用
    loadRouterMicroApp(currentActiveMicroConfig, routeStore)
  }
}

// 加载微应用
export function loadRouterMicroApp(currentApp, routeStore) {
  const micro = loadMicroApp(currentApp)
  micro.mountPromise.then(() => {
    // 挂载完成 设置一下vuex微应用列表
    routeStore.setMicroApplicationList({
      key: currentApp.activeRule,
      value: micro,
    })
  })
}

// 获取容器节点
export function getContainerNode(container) {
  const containerNode = container && document.querySelector(container)

  if (containerNode) {
    return containerNode.childNodes.length
  }

  return -1
}
