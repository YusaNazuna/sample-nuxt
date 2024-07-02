<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: number;
  }>(), {
  name: 0
}
);

const icon = [
  {
    "icon": "i-ic-outline-check-circle",
    "message": "更新に成功しました。"
  },
  {
    "icon": "i-ic-outline-check-circle",
    "message": "更新に失敗しました。"
  }
];
</script>

<template>
  <Transition appear>
    <div
      class="w-full flex items-center max-w-xs p-4 space-x-4 text-slate-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x"
      role="alert"
    >
      <UIcon
        :name="icon[name]['icon']"
        color="teal"
        class="text-xl"
      />
      <div class="ps-4 text-sm font-normal">
        {{ icon[name]["message"] }}
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
div {
  @include fadeTransition();
}
</style>
