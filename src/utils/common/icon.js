import { h } from 'vue'

/**
 * 动态渲染iconify
 * @param icon - 图标名称
 * @param color - 图标颜色
 * @param size - 图标大小
 */
export function iconifyRender(icon, color, size) {
  const style = {}
  if (color) {
    style.color = color
  }
  if (size) {
    style.size = `${size}px`
  }
  return () => h('i', { class: 'iconfont ' + icon, style })
}
