<template>
  <n-layout-header class="layout-header">
    <div class="header">
      <div class="header-left">
        <hover-container class="hover-container" @click="app.toggleSiderCollapse">
          <div v-if="app.siderCollapse" class="iconfont icon-cebianlanshouqi text-height"></div>
          <div v-else class="iconfont icon-cebianlanzhankai text-height"></div>
        </hover-container>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="header-right">
        <n-popover placement="bottom" trigger="click">
          <template #trigger>
            <hover-container class="hover-container" style="margin-right: 10px">
              <div class="iconfont icon-zhuti text-height theme-color-icon"></div>
            </hover-container>
          </template>
          <div class="theme">
            <div class="theme-grid">
              <div v-for="color in app.themeColorList" :key="color" class="theme-item" @click="app.setThemeColor(color)">
                <div class="theme-item__color" :style="{ backgroundColor: color }">
                  <i class="iconfont icon-zhengque theme-item__icon" :class="color === app.themeColor && 'theme-item__icon--checked'"></i>
                </div>
              </div>
            </div>
            <n-color-picker :value="app.themeColor" :show-alpha="false" @update-value="app.setThemeColor" />
          </div>
        </n-popover>

        <hover-container class="hover-container" style="margin-right: 10px" tooltip-content="主题模式" @click="app.changeDarkTheme">
          <div v-if="app.inverted" class="iconfont icon-taiyang text-height theme-icon"></div>
          <div v-else class="iconfont icon-dark text-height theme-icon"></div>
        </hover-container>
        <hover-container class="hover-container" style="margin-right: 10px" tooltip-content="全屏" @click="toggle">
          <div v-if="isFullscreen" class="iconfont icon-quxiaoquanping_o text-height theme-icon"></div>
          <div v-else class="iconfont icon-quanping_o text-height theme-icon"></div>
        </hover-container>
        <hover-container class="hover-container">
          <n-dropdown :options="options" @select="handleSelect">
            <i class="iconfont icon-touxiang theme-icon"></i>
          </n-dropdown>
        </hover-container>
      </div>
    </div>
  </n-layout-header>
</template>
<script setup>
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore, useAuthStore } from '@/store'
import { useFullscreen } from '@vueuse/core'
import { iconifyRender } from '@/utils/common/icon'

const app = useAppStore()
const { isFullscreen, toggle } = useFullscreen()
const { resetAuthStore } = useAuthStore()
const options = ref([
  {
    label: '用户资料',
    key: 'profile',
    icon: iconifyRender('icon-ziliao'),
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconifyRender('icon-tuichu1'),
  },
])
const handleSelect = e => {
  console.log('选择', e)
  e === 'logout' && resetAuthStore()
}
</script>
<style lang="scss" scoped>
.layout-header {
  z-index: 10;
}
.icon-nav-collapse {
  font-size: 16px;
}
.icon-nav-collapsed {
  font-size: 16px;
}
.hover-container {
  width: 40px;
  height: 100%;
  margin-right: 20px;
}
.header {
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px #00152914;
}
.header-left {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}
.theme-color-icon {
  color: var(--primary-color);
  font-size: 20px;
}
.theme-icon {
  font-size: 20px;
}
.theme {
  // width: 200px;
  &-grid {
    display: grid;
    grid-template-columns: repeat(5, 30px);
    margin-bottom: 10px;
  }
  &-item {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    transition: transform 0.2s;
    &__icon {
      font-size: 24px;
      color: #fff;
      opacity: 0;
      transition: opacity 0.2s;
      &--checked {
        opacity: 1;
      }
    }
    &__color {
      width: 100%;
      height: 100%;
      transform: scale(0.99);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.2s;
    }
    &:hover {
      .theme-item__color {
        transform: scale(0.8);
      }
    }
  }
}
</style>
