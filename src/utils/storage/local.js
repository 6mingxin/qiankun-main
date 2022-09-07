import { encrypto, decrypto } from '../crypto'

/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export function setLocal(key, value, expire = DEFAULT_CACHE_TIME) {
  const storageData = { value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null }
  const json = encrypto(storageData)
  window.localStorage.setItem(key, json)
}

export function getLocal(key) {
  const json = window.localStorage.getItem(key)
  if (json) {
    let storageData = null
    try {
      storageData = decrypto(json)
    } catch {
      // 防止解析失败
    }
    if (storageData) {
      const { value, expire } = storageData
      // 在有效期内直接返回
      if (expire === null || expire >= Date.now()) {
        return value
      }
    }
    removeLocal(key)
    return null
  }
  return null
}

export function removeLocal(key) {
  window.localStorage.removeItem(key)
}

export function clearLocal() {
  window.localStorage.clear()
}
