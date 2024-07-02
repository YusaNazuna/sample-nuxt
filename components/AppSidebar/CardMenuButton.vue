<script setup lang="ts">
defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "custom-click"): void;
}>();
</script>

<template>
  <div
    class="
        w-full relative truncate group text-sm flex gap-3 items-center cursor-pointer p-3 side-card-menu-bg-hover rounded-r-lg
        transition-colors ease-out duration-300
      "
  >
    <div>
      <UIcon name="i-mdi-chat-outline" class="text-lg" />
    </div>
    <p>
      {{ title }}
    </p>
    <UPopover class="absolute right-2" :popper="{ placement: 'bottom-end' }">
      <UButton
        class="
          opacity-0 group-hover:opacity-100
           group-hover:bg-slate-900
        "
        size="sm"
        icon="i-ic-baseline-more-horiz"
      />
      <template #panel="{ close }">
        <div class="w-40 p-1.5 bg-slate-800">
          <UButton
            icon="i-ic-round-edit-note"
            label="変更"
            class="
              w-full outline-none text-gray-200 bg-slate-800 before:rounded-md
              hover:before:bg-gray-50 hover:bg-slate-700 hover:transition hover:duration-150"
            @click.stop="() => {
              close();
              $emit('custom-click');
            }"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>
