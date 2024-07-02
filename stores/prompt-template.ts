import { defineStore } from "pinia";
import { type PromptItem } from '@/types';

export const usePromptTemplate = defineStore("prompt-template", () => {
  // [ State ]
  const isOpen = ref<boolean>(false);
  const selectedMenu = ref<string>();
  const selectedPostCard = ref<PromptItem>();

  // [ Action ]
  const open = (() => isOpen.value = true);
  const close = (() => {
    isOpen.value = false;
    setTimeout(() => {
      selectedMenu.value = undefined;
      selectedPostCard.value = undefined;
    }, 300);
  });
  const selectMenu = ((menu?: string) => selectedMenu.value = menu);
  const selectPostCard = ((item?: PromptItem) => selectedPostCard.value = item);

  return { isOpen, selectedMenu, selectedPostCard, open, close, selectMenu, selectPostCard };
});
