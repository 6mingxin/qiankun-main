/** 固定的路由 */
export const constantRoutes = [
  {
    name: 'root',
    path: '/',
    redirect: 'qiankun-sub/dashboard/analysis',
    meta: {
      title: 'Root',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/system-view/login/index.vue'),
    meta: {
      title: '登录',
    },
  },

  {
    name: 'not-found',
    path: '/not-found',
    component: () => import('@/views/system-view/not-found/index.vue'),
    meta: {
      title: '未找到',
    },
  },
  // 匹配无效路径的路由
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/system-view/not-found-page/index.vue'),
    meta: {
      title: '未找到',
    },
  },
]
