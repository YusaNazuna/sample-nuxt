<script setup lang="ts">
import type { HTMLInputKeyEvent, ConversationListResponseItem } from "@/types";
import { useToastStore } from "@/stores/toast";
import { Toast, SideMenuDateType } from "@/types";
import LayoutLogo from "@/components/AppSidebar/LayoutLogo.vue";
import LayoutTemplateButton from "@/components/AppSidebar/LayoutTemplateButton.vue";
import LayoutCard from "@/components/AppSidebar/LayoutCard.vue";
import LayoutOtherMenu from "@/components/AppSidebar/LayoutOtherMenu.vue";
import LayoutAccount from "@/components/AppSidebar/LayoutAccount.vue";
import LayoutDivider from "@/components/AppSidebar/LayoutDivider.vue";
import CardMenuButton from "@/components/AppSidebar/CardMenuButton.vue";
import LoadingSkelton from "@/components/AppSidebar/LoadingSkelton.vue";
import ModifyModalContent from "@/components/AppSidebar/ModifyModalContent.vue";
import PromptTemplateModal from "@/components/PromptTemplateModal.vue";
import { usePromptTemplate } from "@/stores/prompt-template";

const router = useRouter();

const promptTemplate = usePromptTemplate();
const { open: openTemplatePromptModal } = promptTemplate;

// [ Modal ]
const isOpenModifyModal = ref(false);
const tempMessage = ref<string | number>();
const tempTalkId = ref<string>();

// [ Toast ]
const toastStore = useToastStore();
const { push: pushToast } = toastStore;

const { data: sideData, pending: sidePending, refresh: sideRefresh } = await useLazyFetch("/api/conversation/list");

/**
 * メニュー押下時
 */
const handleClickCardMenuButton = (item: ConversationListResponseItem) => {
  router.push({ path: `/talk/${item.id}` });
};

/**
 * 変更ボタン押下時
 */
const handleClickModifyButton = (item: ConversationListResponseItem) => {
  isOpenModifyModal.value = true;
  tempMessage.value = item.title;
  tempTalkId.value = item.id;
};

/**
 * 変更入力ボックスでエンターキー押下時
 */
const handleClickModifyInputEnter = async (e: HTMLInputKeyEvent) => {
  try {
    await $fetch("/api/conversation/update-title", {
      method: "post",
      body: {
        "id": tempTalkId.value,
        "title": e.target.value,
      }
    });
    pushToast(Toast.Success);
    sideRefresh();
  } catch (e) {
    pushToast(Toast.Error);
  } finally {
    isOpenModifyModal.value = false;
  }

};

const handleClickTemplatePromptButton = async () => {
  openTemplatePromptModal();
};
</script>

<template>
  <aside class="w-64 p-2 t-site-bg">
    <div class="h-full flex flex-col relative">
      <LayoutLogo class="pt-8 pb-6" />
      <LayoutTemplateButton class="mb-2" @click="handleClickTemplatePromptButton" />
      <LayoutCard class="flex-1">
        <LoadingSkelton v-if="sidePending" />
        <div v-else class="flex flex-col gap-8 py-4">
          <template v-for="side, sideKey in sideData" :key="sideKey">
            <section v-if="side.length" class="t-side-base-text">
              <p class="text-xs px-4">
                {{ SideMenuDateType[sideKey] }}
              </p>
              <div class="flex flex-col pt-2">
                <CardMenuButton
                  v-for="(item, index) in side"
                  :key="index"
                  :title="item.title"
                  @custom-click="handleClickModifyButton(item)"
                  @click.stop="handleClickCardMenuButton(item)"
                />
              </div>
            </section>
          </template>
        </div>
      </LayoutCard>
      <LayoutDivider class="pt-6 pb-4 px-2" />
      <LayoutOtherMenu />
      <LayoutAccount class="pt-10" />
    </div>
  </aside>
  <UModal
    v-model="isOpenModifyModal"
    class="flex fcenter"
    :ui="{
      container: `flex min-h-full fcenter`,
      overlay: {
        background: `bg-slate-900/75`
      }
    }"
  >
    <ModifyModalContent :message="tempMessage" :on-click="handleClickModifyInputEnter" />
  </UModal>
  <PromptTemplateModal />
</template>
