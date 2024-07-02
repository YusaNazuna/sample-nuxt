<script setup>
const account = [
  [
    {
      label: "中川湊",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/92169042?v=4"
      }
    }
  ]
];
</script>

<template>
  <UVerticalNavigation
    w-full
    :links="account"
    :ui="{
      active: `ease-out`,
      inactive: `
        text-gray-400
        hover:text-gray-200
        hover:before:bg-slate-800 hover:before:transition hover:before:duration-150
      `,
    }"
  >
    <template #avatar="{ link }">
      <UAvatar
        v-if="link.avatar"
        v-bind="link.avatar"
        size="sm"
        loading="lazy"
      />
    </template>
  </UVerticalNavigation>
</template>
