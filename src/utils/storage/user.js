import { enums } from '@/settings'
import { setLocal, getLocal, removeLocal } from '.'

/** 设置token */
export function setToken(token) {
  setLocal(enums.token, token)
}

/** 获取token */
export function getToken() {
  return getLocal(enums.token) || ''
}

/** 去除token */
export function removeToken() {
  removeLocal(enums.token)
}

/** 获取refresh token */
export function getRefreshToken() {
  return getLocal(enums['refresh-token']) || ''
}

/** 设置refresh token */
export function setRefreshToken(token) {
  setLocal(enums['refresh-token'], token)
}

/** 去除refresh token */
export function removeRefreshToken() {
  removeLocal(enums['refresh-token'])
}

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo = {
    userId: '',
    userName: '',
    userPhone: '',
    userRole: 'test',
  }
  const userInfo = getLocal(enums['user-info']) || emptyInfo
  return userInfo
}

/** 设置用户信息 */
export function setUserInfo(userInfo) {
  setLocal(enums['user-info'], userInfo)
}

/** 去除用户信息 */
export function removeUserInfo() {
  removeLocal(enums['user-info'])
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken()
  removeRefreshToken()
  removeUserInfo()
}
