<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div class="v-flex v-flex-center tooltip" :class="contentClass">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="v-flex v-flex-center tooltip" :class="contentClass">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  /** tooltip显示文本 */
  tooltipContent: {
    type: String,
    default: '',
  },
  /** tooltip的位置 */
  placement: {
    type: String,
    default: 'bottom',
  },
  /** class类 */
  contentClass: {
    type: String,
    default: '',
  },
})

const showTooltip = computed(() => Boolean(props.tooltipContent))
</script>
<style scoped lang="scss">
.tooltip {
  height: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--n-color);
    filter: contrast(90%);
  }
}
</style>
