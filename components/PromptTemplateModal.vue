<script setup lang="ts">
/**
 * Layoutコンポーネント
 */
import { usePromptTemplate } from "@/stores/prompt-template";
import PromptTemplateModalContent from "@/components/PromptTemplateModal/Content.vue";

const promptTemplate = usePromptTemplate();
const { isOpen } = storeToRefs(promptTemplate);
</script>

<template>
  <UModal
    v-model="isOpen"
    prevent-close
    class="flex fcenter"
    :ui="{
      container: `flex min-h-full fcenter`,
      width: `w-full sm:max-w-3xl`,
      overlay: {
        background: `bg-slate-900/75`
      }
    }"
  >
    <PromptTemplateModalContent />
  </UModal>
</template>
