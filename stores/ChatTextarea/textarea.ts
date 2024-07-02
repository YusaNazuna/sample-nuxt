import { defineStore } from "pinia";

/**
 * [ State ]
 * isPush: 入力が確定したか否か
 *
 * [ Action ]
 * resetPush: 通知を受け取ったことを手動コールするもの
 * reset: 確定した入力情報は破棄して関連情報をクリアするもの
 */
export const useTextareaStore = defineStore("textarea", () => {
  // [ State ]
  const textarea = ref<string | number>();
  const history = ref<number[]>([]);
  const isPush = computed(() => {
    const { value } = history;
    if (!value.length) {
      return false;
    }
    if (value.length === 1) {
      return !!value[0];
    }
    return !!value[0] && value[0] !== value[1];
  });

  // [ Action ]
  const pushed = (() => {
    if (history.value.length) {
      const v = history.value[0];
      history.value.unshift(v + 1);
    } else {
      history.value.unshift(1);
    }
  });
  const update = ((v: string) => textarea.value = v);
  const reset = (() => {
    textarea.value = undefined;
    history.value.unshift(0);
  });

  const resetPush = (() => {
    history.value.unshift(0);
  });

  return {
    textarea,
    isPush,
    history,
    pushed,
    update,
    reset,
    resetPush
  };
});
