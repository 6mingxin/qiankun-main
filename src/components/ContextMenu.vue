<template>
  <n-dropdown :show="dropdownVisible" :options="options" placement="bottom-start" :x="x" :y="y" @clickoutside="hide" @select="handleDropdown" />
</template>

<script setup>
import { useAppStore, useTabStore } from '@/store'
import { iconifyRender } from '@/utils'

const props = defineProps({
  visible: {
    /** 右键菜单可见性 */ type: Boolean,
    default: false,
  },
  currentPath: {
    /** 当前路由路径 */ type: String,
    default: '',
  },
  x: {
    /** 鼠标x坐标 */ type: Number,
    default: 0,
  },
  y: {
    /** 鼠标y坐标 */ type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:visible'])

const app = useAppStore()
const tab = useTabStore()

const dropdownVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

function hide() {
  dropdownVisible.value = false
}

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: props.currentPath !== tab.activeTab,
    icon: iconifyRender('ant-design:reload-outlined'),
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: props.currentPath === tab.homeTab.path,
    icon: iconifyRender('ant-design:close-outlined'),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: iconifyRender('ant-design:column-width-outlined'),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: iconifyRender('mdi:format-horizontal-align-left'),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: iconifyRender('mdi:format-horizontal-align-right'),
  },
])

const actionMap = new Map([
  [
    'reload-current',
    () => {
      // app.reloadPage()
    },
  ],
  [
    'close-current',
    () => {
      tab.removeTab(props.currentPath)
    },
  ],
  [
    'close-other',
    () => {
      tab.clearTab([props.currentPath])
    },
  ],
  [
    'close-left',
    () => {
      tab.clearLeftTab(props.currentPath)
    },
  ],
  [
    'close-right',
    () => {
      tab.clearRightTab(props.currentPath)
    },
  ],
])

function handleDropdown(optionKey) {
  const key = optionKey
  const actionFunc = actionMap.get(key)
  if (actionFunc) {
    actionFunc()
  }
  hide()
}
</script>
<style scoped></style>
