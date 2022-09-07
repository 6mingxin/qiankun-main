<template>
  <div class="flex-col-center wh-full">
    <div class="text-400px text-primary">
      <!-- <icon-custom-no-permission v-if="type === '403'" />
      <icon-custom-not-found v-if="type === '404'" />
      <icon-custom-service-error v-if="type === '500'" /> -->
    </div>
    <router-link :to="{ name: '/' }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: '',
  },
})
</script>
<style scoped></style>
