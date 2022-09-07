<template>
  <n-breadcrumb>
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown v-if="breadcrumb.hasChildren" :options="breadcrumb.children" @select="dropdownSelect">
          <span>
            <component :is="breadcrumb.icon" class="breadcrumb-icon" />
            <span>{{ breadcrumb.label }}</span>
          </span>
        </n-dropdown>
        <template v-else>
          <component :is="breadcrumb.icon" class="breadcrumb-icon" />
          <span>{{ breadcrumb.label }}</span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script setup>
import { useRouteStore } from '@/store'
import { getBreadcrumbByRouteKey } from '@/utils'
const route = useRoute()
const router = useRouter()
const routeStore = useRouteStore()
const breadcrumbs = computed(() => getBreadcrumbByRouteKey(route.name, routeStore.menus, '/'))

const dropdownSelect = key => router.push({ name: key })
</script>
<style scoped lang="scss">
.breadcrumb-icon {
  display: inline-block;
  margin-right: 4px;
  font-size: 16px;
  line-height: 1;
  vertical-align: text-bottom;
}
</style>
