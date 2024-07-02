<script setup lang="ts">
import { useTextareaStore } from "@/stores/ChatTextarea/textarea";
import type { HTMLTextareaKeyEvent } from "@/types";
defineProps<{
  placeholder: string
}>();

const textareaStore = useTextareaStore();
const { pushed } = textareaStore;

const handleClickEnterKey = ((e: HTMLTextareaKeyEvent) => {
  if (e.shiftKey || !e.target.value) {
    return;
  }
  e.preventDefault();
  pushed();
});
</script>

<template>
  <UTextarea
    v-model="textareaStore.textarea"
    class="textarea"
    :rows="1"
    autoresize
    :ui="{
      wrapper: `bg-white`,
      base: `w-full focus:ring-0 max-h-30`,
      form: `focus:border-none focus:outline-none`,
      color: {
        white: {
          outline: ``
        }
      },
      padding: {
        sm: `py-3 pr-16`,
      },
      variant: {
        outline: `ring-1 ring-slate-300 focus:ring-1 focus:ring-slate-300`
      }
    }"
    :placeholder="placeholder"
    @keydown.enter="handleClickEnterKey"
  />
</template>

<style lang="scss" scoped>
.textarea {
  &:deep(textarea) {
    @include attatchScrollbar(light);
  }
}
</style>
