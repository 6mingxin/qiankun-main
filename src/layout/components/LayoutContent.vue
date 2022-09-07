<template>
  <n-layout-content content-style="padding: 16px;" :class="inverted ? 'content-bg--dark' : 'content-bg'">
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <transition name="fade-slide" mode="out-in" appear>
      <view id="container" class="container-sub" />
    </transition>
  </n-layout-content>
</template>
<script setup>
import { useAppStore } from '@/store'

const app = useAppStore()
const inverted = computed(() => app.inverted)
</script>
<style lang="scss">
.content-bg {
  background-color: #f6f9f8;
}
.content-bg--dark {
  background-color: #101014;
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
