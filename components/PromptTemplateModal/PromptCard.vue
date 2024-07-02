<script setup lang="ts">
import { type PromptItem } from '@/types';
defineProps<PromptItem>();
</script>

<template>
  <div class="promptCard cursor-pointer">
    <div class="promptCard-header" />
    <div class="promptCard-body p-2">
      <div class="promptCard-body-title">
        {{ title }}
      </div>
      <div class="promptCard-body-text">
        投稿者: {{ contributor }}
      </div>
      <div class="promptCard-body-text">
        最終更新日: {{ lastUpdatedAt }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promptCard {
  @apply flex flex-col bg-slate-200 text-slate-900 rounded-lg overflow-hidden;
  &-header {
    width: 100%;
    flex-grow: 1;
    background-size: cover;
    background-image: url('https://www.s-hoshino.com/wall/natu/001/001_1024_768.jpg');
  }
  &-body {
    @apply text-sm flex flex-col gap-1;
    &-title {
      @apply text-sm font-bold;
    }
    &-text {
      @apply text-xs;
    }
  }
}
</style>
