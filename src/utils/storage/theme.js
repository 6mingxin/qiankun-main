/**
 * 缓存主题颜色
 * @param color
 */
export function setThemeColor(color) {
  window.localStorage.setItem('theme-color', color)
}

/**
 * 获取缓存的主题颜色
 */
export function getThemeColor() {
  return window.localStorage.getItem('theme-color')
}
