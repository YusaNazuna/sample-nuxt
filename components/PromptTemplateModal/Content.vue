<script setup lang="ts">
import { type PromptItem } from '@/types';
import { usePromptTemplate } from "@/stores/prompt-template";
import MenuButton from "@/components/PromptTemplateModal/MenuButton.vue";
import PostList from "@/components/PromptTemplateModal/PostList.vue";
import PostDetail from "@/components/PromptTemplateModal/PostDetail.vue";

const promptTemplate = usePromptTemplate();
const { close, selectMenu } = promptTemplate;
const { selectedMenu, selectedPostCard } = storeToRefs(promptTemplate);

const mockMenuList = [
  { label: "カテゴリ1", "value": "category1" },
  { label: "カテゴリ2", "value": "category2" },
  { label: "カテゴリ3", "value": "category3" },
  { label: "カテゴリ4", "value": "category4" },
];

const mockPromptCardList: PromptItem[] = [
  {
    id: "00001",
    title: "Card1",
    image: "",
    contents: "# 内容\n ## 内容内容内容",
    contributor: "Minato",
    categoryList: ["category1"],
    lastUpdatedAt: "2024/01/01",
  },
  {
    id: "00002",
    title: "Card2",
    image: "",
    contents: "内容",
    contributor: "Minato",
    categoryList: ["category2"],
    lastUpdatedAt: "2024/01/01",
  },
  {
    id: "00003",
    title: "Card3",
    image: "",
    contents: "内容",
    contributor: "Minato",
    categoryList: ["category3"],
    lastUpdatedAt: "2024/01/01",
  },
  {
    id: "00004",
    title: "Card4",
    image: "",
    contents: "内容",
    contributor: "Minato",
    categoryList: ["category1", "category3"],
    lastUpdatedAt: "2024/01/01",
  },
];

const handleClickMenuButton = ((category: string) => {
  selectedMenu.value === category
    ? selectMenu(undefined)
    : selectMenu(category);
});

</script>

<template>
  <UCard
    class="card w-full"
    :ui="{
      background: `bg-slate-900`,
      ring: `ring-1 ring-blue-800`,
      divide: `divide-y divide-gray-800`,
      body: {
        base: `h-[calc(100%-75px)]`
      },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-slate-200">
          プロンプトテンプレート
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="text-slate-200 hover:text-slate-200 hover:bg-slate-800"
          @click="close"
        />
      </div>
    </template>
    <div class="h-full flex gap-2">
      <div class="menu basis-40">
        <div class="menu-inner">
          <div class="menu-inner-scroll">
            <MenuButton
              v-for="item in mockMenuList"
              :key="item.value"
              :text="item.label"
              :is-active="item.value === selectedMenu"
              @click="handleClickMenuButton(item.value)"
            />
          </div>
        </div>
      </div>
      <PostList v-if="selectedPostCard == null" :post-list="mockPromptCardList" />
      <PostDetail v-else />
    </div>
  </UCard>
</template>

<style lang="scss" scoped>
.card {
  height: 80dvh;
  max-height: 30rem;
  min-height: 10rem;
}
.menu {
  @apply bg-slate-950 p-2;
  @apply ring-1 ring-gray-700 rounded-lg shadow overflow-hidden;
  &-inner {
    @apply relative w-full h-full overflow-y-auto;
    @include attatchScrollbar();
    &-scroll {
      @apply absolute w-full pr-2 flex flex-col gap-1;
    }
  }
}
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
