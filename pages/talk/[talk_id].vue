<script setup lang="ts">
import { TalkMessageType } from "@/types";
import type { ConversationTalkResponseItem } from "@/types";
import { useTextareaStore } from "@/stores/ChatTextarea/textarea";

definePageMeta({
  layout: "default"
});

const route = useRoute();
const talkId = route.params.talk_id as string;

// [ Toast ]
const toastStore = useToastStore();
const { push: pushToast } = toastStore;

// [ Textarea ]
const textareaStore = useTextareaStore();
const { reset: resetTextarea, resetPush } = textareaStore;
const { textarea, isPush } = storeToRefs(textareaStore);

// [ NewTalkList ]
const newTalkList = ref<ConversationTalkResponseItem[]>([]);

const { data: talkList } = await useAsyncData(`talk:${talkId}`, async () => {
  return $fetch(`/api/conversation/talk/${talkId}`);
});

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
  await scrollBottom();
});

watch(isPush, async () => {
  if (!isPush.value) {
    return;
  }

  newTalkList.value?.push({
    id: talkId,
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
        "talkId": talkId,
        "message": textarea.value
      }
    });

    newTalkList.value.push(response);
    await scrollBottom(true);

    resetTextarea();
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
        <div class="container-inner">
          <div class="container-inner-scroll">
            <TalkMessage
              v-for="(item, i) in talkList"
              :key="`${item.id}-${i}`"
              v-bind="item"
            />
            <template v-if="newTalkList.length">
              <TalkMessage
                v-for="(item, i) in newTalkList"
                :key="`${item.id}-${i}`"
                v-bind="item"
              />
            </template>
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
  @apply h-full bg-white p-2;
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
