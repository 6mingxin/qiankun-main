import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
async function setupApp() {
  const app = createApp(App)
  // 挂载pinia状态
  await setupStore(app)
  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载 App
  app.mount('#app')
}

setupApp()
