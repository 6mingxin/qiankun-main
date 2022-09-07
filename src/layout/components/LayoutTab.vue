<template>
  <n-el ref="bsWrapper" tag="div" class="tabs-scroll global-tab">
    <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: canClick }">
      <tab-detail @scroll="handleScroll" />
    </better-scroll>
  </n-el>
</template>

<script setup>
import { useElementBounding } from '@vueuse/core'
import { useTabStore } from '@/store'
import { useDeviceInfo } from '@/utils'
import TabDetail from '@/components/TabDetail.vue'

const route = useRoute()
const tab = useTabStore()
const deviceInfo = useDeviceInfo()

const bsWrapper = ref()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

const bsScroll = ref()

const canClick = Boolean(deviceInfo.device.type)

function handleScroll(clientX) {
  const currentX = clientX - bsWrapperLeft.value
  const deltaX = currentX - bsWrapperWidth.value / 2
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    bsScroll.value?.instance.scrollBy(update, 0, 300)
  }
}

function init() {
  tab.iniTabStore(route)
}

watch(
  () => route.path,
  () => {
    tab.addTab(route)
    tab.setActiveTab(route.path)
  },
)

// 初始化
init()
</script>
<style scoped>
.global-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  z-index: 9;
}
.tabs-scroll {
  height: 46px;
  background-color: var(--card-color);
  transition: 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
