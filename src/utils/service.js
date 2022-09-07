/**
 * 获取api文件下的请求函数
 * @returns 请求函数
 */
export const getApi = funName => {
  // const api = import.meta.globEager('../api/*.js')
  //递归获取 components 文件夹下的所有index.vue文件（校验规则根据自己的项目情况）
  const files = require.context('@/api', true, /\*.js$/)
  console.log('files', files)
  let api = {}
  files.keys().forEach(key => {
    api[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  })

  let apiFunc = null
  for (const key in api) {
    if (Object.prototype.hasOwnProperty.call(api, key)) {
      for (const a in api[key]) {
        // apiFuncs[a] = api[key][a]
        if (funName === a) {
          apiFunc = api[key][a]
        }
      }
    }
  }
  return apiFunc
}
