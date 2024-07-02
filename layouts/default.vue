<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
const toastStore = useToastStore();
const { toast, isShow } = storeToRefs(toastStore);
</script>
<template>
  <main class="w-full h-full t-site-bg flex relative">
    <AppSidebar />
    <div
      class="t-chat-wrapper-bg
        flex-1 ml-2 mr-4 my-4
        rounded-xl overflow-hidden"
    >
      <slot />
    </div>
    <Teleport to="body">
      <TheToast
        v-show="isShow"
        :name="toast"
        class="absolute top-4 right-10"
      />
    </Teleport>
  </main>
</template>
