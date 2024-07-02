<script setup lang="ts">
import { TalkMessageType } from "@/types";
import type { ConversationTalkResponseItem } from "@/types";
import { useTextareaStore } from "@/stores/ChatTextarea/textarea";

definePageMeta({
  layout: "default"
});

const router = useRouter();

// [ Toast ]
const toastStore = useToastStore();
const { push: pushToast } = toastStore;

// [ Textarea ]
const textareaStore = useTextareaStore();
const { reset: resetTextarea, resetPush } = textareaStore;
const { textarea, isPush } = storeToRefs(textareaStore);

// [ NewTalkList ]
const newTalkList = ref<ConversationTalkResponseItem[]>([]);

const scrollBottom = (async (behavior = false) => {
  await setTimeout(() => {
    const element = document.querySelector(".container-inner-scroll");
    element?.scrollIntoView(behavior && {
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
  }, 0);
});

onMounted(async() => {
  resetTextarea();
});

watch(isPush, async () => {
  if (!isPush.value) {
    return;
  }

  newTalkList.value?.push({
    id: "new_talk",
    type: TalkMessageType.Input,
    message: String(textarea.value),
    links: [],
  });

  await scrollBottom(true);

  try {
    const response = await $fetch("/api/conversation/query", {
      method: "post",
      body: {
        "userId": 0,
        "talkId": "new_talk",
        "message": textarea.value
      }
    });

    newTalkList.value.push(response);
    await scrollBottom(true);
    resetTextarea();

    // TODO: query後にサイドメニューの取得項目が増える場合、ここにsideRefresh()をコールすること

    // TODO: Mockの現状、同期が取れていないのでいきなり履歴が見えるようになる違和感。導通した時に要調整
    router.replace({ path: `/talk/${response.id}` });

  } catch (e) {
    pushToast(Toast.Error);
    resetPush();
  }
});
</script>

<template>
  <div class="h-full flex flex-col px-6">
    <div class="h-21" />
    <div class="flex-1">
      <UContainer class="container">
        <ChatInitMessage v-if="!newTalkList.length" />
        <div v-else class="container-inner">
          <div class="container-inner-scroll">
            <TalkMessage
              v-for="item in newTalkList"
              :key="item.id"
              v-bind="item"
            />
          </div>
        </div>
      </UContainer>
    </div>
    <div class="py-8">
      <ChatTextarea placeholder="質問する" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @apply h-full bg-white p-2 relative;
  @apply ring-1 ring-slate-200 rounded-lg overflow-hidden;
  &-inner {
    @apply relative w-full h-full flex flex-col;
    @apply overflow-y-auto rounded-lg;
    @include attatchScrollbar(light);
    &-scroll {
      @apply w-full absolute pr-2;
    }
  }
}
</style>
