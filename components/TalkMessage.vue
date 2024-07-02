<script setup lang="ts">
import { marked } from "marked";
import { TalkMessageType } from "@/types";

const props = defineProps<{
  id: string;
  type: TalkMessageType;
  message: string;
  links: string[];
}>();

const avatar = {
  1: {
    url: "https://avatars.githubusercontent.com/u/92169042?v=4",
    name: "あなた",
  },
  2: {
    url: "/img/logo.png",
    name: "Ai Navi",
  }
}[props.type];

const attachments = props.links.map((filePath) => {
  const fileName = filePath.split("\\").slice(-1)[0];
  return {
    name: fileName,
    path: filePath,
    handleClick: async () => {
      try {
        const response: Blob = await $fetch("/api/download", {
          method: "POST",
          body: {
            path: filePath
          }
        });
        const url = window.URL.createObjectURL(response);
        const element = document.createElement("a");
        element.href = url;
        element.download = filePath;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch (e) {
        console.error(e);
      }
    }
  };
});
</script>

<template>
  <div
    role="talk-message"
    class="w-full flex mt-6 rounded-xl p-2 pb-3 gap-2 text-gray-950"
    :class="{ 'bg-bluegray-100': type === 2 }"
  >
    <div class="fcenter flex flex-col relative items-end w-8 h-8 rounded-full">
      <UAvatar :src="avatar?.url" size="xs" />
    </div>
    <div class="pt-1 flex-1">
      <p class="font-bold">
        {{ avatar?.name }}
      </p>
      <div v-dompurify-html="marked.parse(message)" class="break-words markdown" />
      <div class="attachment">
        <div
          v-for="(item, i) in attachments"
          :key="i"
          @click="item.handleClick"
        >
          <UIcon name="i-ic-outline-insert-drive-file" />
          <UTooltip
            :text="`「${item.path}」をダウンロード`"
            :ui="{
              color: `text-white`,
              background: `bg-yellow-400`,
              ring: `ring-0`
            }"
          >
            <span>{{ item.name }}</span>
          </UTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attachment {
  @apply flex flex-wrap gap-2 cursor-pointer;

  > div {
    @apply text-sm text-blue-500 bg-white px-3 pt-1 pb-1 border rounded-full flex items-center gap-2;
  }
}

div {

  // markdown to HTMLに後付している為、deepでないとスタイル認識されない
  :deep(.markdown) {
    @apply prose prose-gray;
  }
}
</style>
