import { iconifyRender } from '@/utils/common/icon'
/** 路由不转换菜单 */
function hideInMenu(route) {
  return Boolean(route.meta.hide)
}

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(routes) {
  const globalMenu = []
  routes.forEach(route => {
    const { name, path, meta } = route
    const routeName = name
    let menuChildren = undefined
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children)
    }
    const menuItem = addPartialProps(
      {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
      },
      meta?.icon,
      menuChildren,
    )

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem)
    }
  })

  return globalMenu
}

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(activeKey, menus) {
  const keys = menus.map(menu => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1)
  return keys
}

function getActiveKeyPathsOfMenu(activeKey, menu) {
  const keys = []
  if (activeKey.includes(menu.routeName)) {
    keys.push(menu.routeName)
  }
  if (menu.children) {
    keys.push(...menu.children.map(item => getActiveKeyPathsOfMenu(activeKey, item)).flat(1))
  }
  return keys
}

/** 给菜单添加可选属性 */
function addPartialProps(menuItem, icon, children) {
  const item = { ...menuItem }
  if (icon) {
    Object.assign(item, { icon: iconifyRender(icon) })
  }
  if (children) {
    Object.assign(item, { children })
  }
  return item
}
