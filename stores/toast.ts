import { defineStore } from "pinia";
import { Toast } from "@/types";

export const useToastStore = defineStore("toast", () => {
  // [ State ]
  const toasts = ref<Toast[]>([]);
  const toast = computed(() => toasts.value?.[0]);
  const isShow = ref<boolean>(false);

  // [ Action ]
  const push = ((v:Toast) => {
    toasts.value?.push(v);
    isShow.value = true;
  });

  watch(toasts, (newToasts) => {
    if (!newToasts) return;
    // 残り1件でこの後0件になるとき、非表示制御を先にする意図
    if (toasts.value.length === 1) {
      setTimeout(() => {
        isShow.value = false;
      }, 1500);
    }
    setTimeout(() => {
      toasts.value?.shift();
      }, 3000);
  }, {deep: true});

  return { toasts, toast, isShow, push };
});
