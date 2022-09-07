// 获取当前的基础路径  如: getPathPrefix('/user/age/xxx', '/') => '/user'
export function getPathPrefix(path, prefix = '') {
  if (!path) return
  const pathArray = String(path)
    .split('/')
    .filter(item => item)
  const basePath = prefix + pathArray[0]
  return basePath
}
