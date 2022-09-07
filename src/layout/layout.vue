<template>
  <n-layout has-sider>
    <LayoutSider></LayoutSider>
    <div class="mian">
      <LayoutHeader></LayoutHeader>
      <LayoutTab></LayoutTab>
      <LayoutContent style="flex: 1; overflow: hidden"> </LayoutContent>
    </div>
  </n-layout>
</template>
<script setup>
import { LayoutHeader, LayoutContent, LayoutSider, LayoutTab } from './components'
</script>
<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}
.mian {
  flex: 1;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
