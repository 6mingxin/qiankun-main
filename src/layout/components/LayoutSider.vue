<template>
  <n-layout-sider collapse-mode="width" :collapsed-width="64" :native-scrollbar="false" :width="220" show-trigger="bar" :collapsed="collapsed" class="sider" @update:collapsed="onCollapsed">
    <div class="v-flex logo">
      <img src="/favicon.ico" alt="" />
      <div class="logo__title" :class="{ 'logo__title--collapsed': collapsed }">Vue3 + TS + Naive模板</div>
    </div>
    <n-scrollbar style="height: calc(100vh - 56px)">
      <n-menu :indent="20" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :inverted="false" :value="checked" @update:value="onChange" />
    </n-scrollbar>
  </n-layout-sider>
</template>

<script setup>
import { useRouteStore } from '@/store'
import { useAppStore } from '@/store/app'

const route = useRoute()
const router = useRouter()
const app = useAppStore()
const menuOptions = useRouteStore().menus

const collapsed = computed(() => app.siderCollapse)
const checked = computed(() => route.name)

const onCollapsed = status => {
  app.toggleSiderCollapse()
}

const onChange = (key, item) => {
  router.push({ name: key })
}
</script>
<style lang="scss">
.logo {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &__title {
    // margin-left: 6px;
    white-space: nowrap;
    transition: all 0.3s;
    overflow: hidden;
    transition: 0.3s var(--cubic-bezier-ease-in-out);
    &--collapsed {
      width: 0;
    }
  }
}
.sider {
  box-shadow: 2px 0 8px #1d23290d;
  z-index: 11;
}
</style>
