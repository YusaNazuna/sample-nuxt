<script setup lang="ts">
import { usePromptTemplate } from "@/stores/prompt-template";
import CopyIconButton from "@/components/Buttons/CopyIconButton.vue";
import BackIconButton from "@/components/Buttons/BackIconButton.vue";
const promptTemplate = usePromptTemplate();
const { selectPostCard } = promptTemplate;
const { selectedPostCard: item } = storeToRefs(promptTemplate);

const handleClickBackButton = (() => {
  selectPostCard(undefined);
});

const handleClickCopyButton = (() => {
  if (!item.value) return;
  navigator.clipboard.writeText(item.value?.contents);
});
</script>

<template>
  <div class="postDetail text-slate-200 pl-2 flex flex-col grow-1">
    <div class="postDetail-title text-xl font-bold">
      {{ item?.title }}
    </div>
    <div class="postDetail-sub text-xs w-max ml-auto">
      <p>投稿者: {{ item?.contributor }}</p>
      <p>最終更新日時: {{ item?.lastUpdatedAt }}</p>
    </div>
    <div class="postDetail-content mt-2 p-2 relative text-sm text-slate-900 bg-slate-100 rounded-md h-full break-words whitespace-pre-wrap">
      {{ item?.contents }}
      <CopyIconButton class="postDetail-content-copy" @click="handleClickCopyButton" />
    </div>
    <div class="postDetail-bottom pt-1">
      <BackIconButton @click="handleClickBackButton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.postDetail {
  &-content {
    &-copy {
      position: absolute;
      bottom:0;
      right: 0;
    }
  }
}
</style>
