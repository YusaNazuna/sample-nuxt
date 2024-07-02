<script setup lang="ts">
defineProps<{
  text: string;
  isActive: boolean;
}>();
</script>

<template>
  <div
    class="menuButton rounded-sm py-1 px-2 text-slate-300 bg-slate-700 cursor-pointer hover:bg-slate-600 hover:text-slate-200 text-sm truncate"
    :class="{'active': isActive}"
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.menuButton {
  &.active {
    @apply bg-slate-500;
  }
}
</style>
