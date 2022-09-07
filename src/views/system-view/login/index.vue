<template>
  <div class="login">
    <!-- <dark-mode-switch  class="absolute left-48px top-24px z-3 text-20px" /> -->
    <n-card :bordered="false" size="large" class="login-card">
      <div class="login-box">
        <header class="login-header">
          <!-- <div class="w-70px h-70px rounded-35px overflow-hidden">
            <system-logo class="text-70px text-primary" :fill="true" />
          </div> -->
          <n-gradient-text type="primary" :size="28">{{ 'Vue3后台模板' }}</n-gradient-text>
        </header>
        <main class="login-main">
          <h3 class="login-main__label">{{ activeModule.label }}</h3>
          <div class="login-main__form">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg :theme-color="bgThemeColor" />
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import { getColorPalette, mixColor } from '@/utils'
import { LoginBg, PwdLogin, Register } from './components'

const route = useRoute()
console.log('当前路由信息', route.params)
const theme = useAppStore()

const modules = [
  { key: 'pwd-login', label: '账号登录', component: PwdLogin },
  // { key: 'code-login', label: 'code-login', component: CodeLogin },
  { key: 'register', label: '账号注册', component: Register },
  // { key: 'reset-pwd', label: 'reset-pwd', component: ResetPwd },
  // { key: 'bind-wechat', label: 'bind-wechat', component: BindWechat },
]

const activeModule = computed(() => {
  const active = { ...modules[0] }
  const module = route.params.module
  const findItem = modules.find(item => item.key === module)
  if (findItem) {
    Object.assign(active, findItem)
  }
  return active
})

const bgThemeColor = computed(() => (theme.inverted ? getColorPalette(theme.themeColor, 7) : theme.themeColor))

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff'
  const ratio = theme.inverted ? 0.5 : 0.2
  return mixColor(COLOR_WHITE, theme.themeColor, ratio)
})
</script>
<style scoped lang="scss">
.login {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &-card {
    z-index: 4;
    width: auto !important;
    border-radius: 20px;
    box-shadow: var(--n-box-shadow);
  }
  &-box {
    width: 360px;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-main {
    padding-top: 24px;
    &__label {
      color: var(--primary-color);
      margin: 0;
      font-size: 18px;
      line-height: 1;
      font-weight: 500;
    }
    &__form {
      padding-top: 24px;
    }
  }
}
</style>
