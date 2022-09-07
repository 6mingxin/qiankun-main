const request = { post: () => {} }

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone) {
  // return request.post<boolean>('/getSmsCode', { phone })
}

/**
 * 登录
 * @param phone - 手机号
 * @param pwdOrCode - 密码或验证码
 * @param type - 登录方式: pwd - 密码登录; sms - 验证码登录
 */
export function fetchLogin(phone, pwdOrCode, type) {
  // if (type === 'pwd') {
  //   return mockRequest.post<ApiAuth.Token>('/loginByPwd', { phone, pwd: pwdOrCode })
  // }
  // return mockRequest.post<ApiAuth.Token>('/loginByCode', { phone, code: pwdOrCode })
  return new Promise((resolve, reject) => {
    resolve({
      token: 'sag3hadgaa',
      refreshToken: 'sag3hadgaa11',
    })
  })
}

/** 获取用户信息 */
export function fetchUserInfo() {
  // return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo')
  return new Promise((resolve, reject) => {
    resolve({
      userPhone: '15170283876',
      userName: '后台管理员',
      userId: '1',
      userRole: 'super',
    })
  })
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId) {
  // return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId })
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken) {
  // return mockRequest.post<ApiAuth.Token>('/updateToken', { refreshToken })
}
