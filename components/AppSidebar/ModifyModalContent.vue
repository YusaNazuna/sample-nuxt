<script setup lang="ts">
import type { HTMLInputKeyEvent } from "@/types";

const props = defineProps<{
  message?: string | number;
  onClick: (e: HTMLInputKeyEvent) => void;
}>();

const emits = defineEmits<{
  (e: "update:message", v?: string | number): void;
}>();

const computedMessage = computed({
  get: () => props.message,
  set: (v) => emits("update:message", v)
});
</script>

<template>
  <UCard
    class="w-full h-50 flex items-center"
    :ui="{
      background: `bg-slate-900`,
      ring: `ring-1 ring-blue-800`,
      divide: ``,
      body: {
        padding: `py-4 px-4 w-full`
      }
    }"
  >
    <p class="prose text-gray-200 text-lg mb-2">
      名称を変更してEnterキーを押してください
    </p>
    <UInput
      v-model="computedMessage"
      :ui="{
        padding: {
          sm: `py-3`,
        },
        color: {
          white: {
            outline: 'shadow-sm bg-slate-600 text-slate-200 ring-1 ring-slate-900 focus:ring-1 focus:ring-teal-200',
          }
        }
      }"
      @keydown.enter="onClick"
    />
  </UCard>
</template>
