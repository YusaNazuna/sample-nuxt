<script setup lang="ts">
import { type PromptItem } from '@/types';
import { usePromptTemplate } from "@/stores/prompt-template";
import PromptCard from "@/components/PromptTemplateModal/PromptCard.vue";

const props = defineProps<{
  postList: PromptItem[]
}>();

const promptTemplate = usePromptTemplate();
const { selectPostCard } = promptTemplate;
const { selectedMenu } = storeToRefs(promptTemplate);

const filteredMenuList = computed(() => {
  const value = selectedMenu.value;
  if (value == null) return props.postList;
  return props.postList.filter((item) => item.categoryList.includes(value));
});

</script>

<template>
  <div class="list">
    <div class="list-inner">
      <div class="list-inner-scroll">
        <PromptCard
          v-for="item in filteredMenuList"
          :key="item.id"
          class="w-[calc(33%-4px)] h-[calc(50%-4px)]"
          v-bind="item"
          @click="selectPostCard(item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  @apply w-full bg-slate-950 p-2;
  &-inner {
    @apply relative w-full h-full overflow-y-auto;
    @include attatchScrollbar();
    &-scroll {
      @apply absolute w-full h-full pr-2 flex flex-wrap gap-2;
    }
  }
}
</style>
