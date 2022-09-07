import { unref } from 'vue'
import { defineStore } from 'pinia'
import { router as globalRouter } from '@/router'
import { useRouterPush } from '@/utils'
import { fetchLogin, fetchUserInfo } from '@/api/auth'
import { getUserInfo, getToken, setUserInfo, setToken, setRefreshToken, clearAuthStorage } from '@/utils'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoding: false,
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false)
      const route = unref(globalRouter.currentRoute)
      console.log('重置状态')

      clearAuthStorage()
      this.$reset()

      toLogin()
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken) {
      const { toLoginRedirect } = useRouterPush(false)

      // 先把token存储到缓存中
      const { token, refreshToken } = backendToken
      setToken(token)
      setRefreshToken(refreshToken)

      // 获取用户信息
      const data = await fetchUserInfo()
      if (data) {
        // 成功后把用户信息存储到缓存中
        setUserInfo(data)

        // 更新状态
        Object.assign(this, { userInfo: data, token })

        // 跳转登录后的地址
        toLoginRedirect()

        // 登录成功弹出欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${data.userName}!`,
          duration: 3000,
        })
      } else {
        // 不成功则重置状态
        this.resetAuthStore()
      }
    },
    /**
     * 登录
     * @param phone - 手机号
     * @param pwdOrCode - 密码或验证码
     * @param type - 登录方式: pwd - 密码登录; sms - 验证码登录
     */
    async login(phone, pwdOrCode, type) {
      this.loginLoding = true
      const data = await fetchLogin(phone, pwdOrCode, type)
      console.log('有值吗？', data)

      if (data) {
        await this.loginByToken(data)
      }
      this.loginLoding = false
    },
  },
})
