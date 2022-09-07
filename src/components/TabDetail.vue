<template>
  <div ref="tabRef" class="tabs">
    <div v-for="item in tab.tabs" :key="item.path" class="tabs-item" @click="tab.handleClickTab(item.path)" @contextmenu="handleContextMenu($event, item.path)">
      <div class="tabs-item__dot" :class="{ 'tabs-item__dot--active': tab.activeTab === item.path }"></div>
      <div class="tabs-item__title">{{ item.meta.title }}</div>
      <div v-if="item.path !== tab.homeTab.path" class="tabs-item__close iconfont icon-guanbi" @click.stop="tab.removeTab(item.path)"></div>
    </div>
  </div>
  <context-menu v-model:visible="dropdown.visible" :current-path="dropdown.currentPath" :x="dropdown.x" :y="dropdown.y" />
</template>

<script setup>
import { useEventListener } from '@vueuse/core'
import { useTabStore } from '@/store'
import { setTabRoutes } from '@/utils'
import ContextMenu from './ContextMenu.vue'

const emit = defineEmits(['scroll'])

const tab = useTabStore()

// 获取当前激活的tab的clientX
const tabRef = ref()
async function getActiveTabClientX() {
  await nextTick()
  if (tabRef.value) {
    const activeTabElement = tabRef.value.children[tab.activeTabIndex]
    const { x, width } = activeTabElement.getBoundingClientRect()
    const clientX = x + width / 2
    setTimeout(() => {
      emit('scroll', clientX)
    }, 50)
  }
}

const dropdown = reactive({
  visible: false,
  x: 0,
  y: 0,
  currentPath: '',
})
function showDropdown() {
  dropdown.visible = true
}
function hideDropdown() {
  dropdown.visible = false
}
function setDropdown(x, y, currentPath) {
  Object.assign(dropdown, { x, y, currentPath })
}

/** 点击右键菜单 */
async function handleContextMenu(e, path) {
  e.preventDefault()
  const { clientX, clientY } = e
  hideDropdown()
  setDropdown(clientX, clientY, path)
  await nextTick()
  showDropdown()
}

watch(
  () => tab.activeTabIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)

/** 页面离开时缓存多页签数据 */
useEventListener(window, 'beforeunload', () => {
  setTabRoutes(tab.tabs)
})
</script>
<style scoped lang="scss">
.tabs {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  &-item {
    height: 28px;
    padding: 0 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
    margin-right: 12px;
    cursor: pointer;
    transition: 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
      background-color: rgba(24, 160, 88, 0.16);
    }
    &__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: rgb(247, 247, 250);
      margin-right: 6px;
      transition: 0.3s var(--cubic-bezier-ease-in-out);
      position: relative;
      &::after {
        content: '';
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        background-color: var(--primary-color);
        transition: 0.3s var(--cubic-bezier-ease-in-out);
      }
      &--active {
        &::after {
          content: '';
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background-color: var(--primary-color);
        }
      }
    }
    &__title {
      color: var(--primary-color);
      line-height: 1;
      font-size: 12px;
      transition: 0.3s var(--cubic-bezier-ease-in-out);
    }
    &__close {
      color: var(--primary-color-pressed);
      font-size: 14px;
      line-height: 1;
      margin-left: 4px;
      transition: 0.3s var(--cubic-bezier-ease-in-out);
      &:hover {
        width: 14px;
        height: 14px;
        filter: contrast(200%);
      }
    }
  }
}
</style>
