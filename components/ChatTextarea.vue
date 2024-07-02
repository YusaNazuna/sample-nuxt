<script setup lang="ts">
/**
 * ChatTextarea
 *
 * [ 用途 ]
 * - 入力した内容をuseTextareaStoreで管理するシンプルなコンポーネントです。
 * - よって入力内容をどう扱うかは使う側が決めることとします。
 */
import TheTextarea from "@/components/ChatTextarea/TheTextarea.vue";
import { useTextareaStore } from "@/stores/ChatTextarea/textarea";

defineProps<{
  placeholder: string
}>();

const textareaStore = useTextareaStore();
const { pushed } = textareaStore;
const { textarea } = storeToRefs(textareaStore);
</script>

<template>
  <div class="relative">
    <TheTextarea :placeholder="placeholder" />
    <UButton
      v-show="!!textarea"
      class="floatButton t-accent-bg"
      label="送信"
      @click="() => pushed()"
    />
  </div>
</template>

<style lang="scss" scoped>
.floatButton {
  @apply absolute bottom-1.5 right-3;
  @apply animate-fade animate-duration-300;
}
</style>
