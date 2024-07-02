<script setup>
const subs = [
  [
    {
      label: "Ai Knowledge Navi について",
      icon: "i-mdi-information-slab-circle-outline",
    },
    {
      label: "ヘルプ",
      icon: "i-ic-twotone-help-outline",
    },
    {
      label: "ログアウト",
      icon: "i-mdi-logout",
    },
  ]
];
</script>

<template>
  <UVerticalNavigation
    class="w-full"
    :links="subs"
    :ui="{
      base: `before:hover:hidden py-2`,
      icon: {
        inactive: `group-hover:text-gray-100`
      },
      inactive:`
        t-side-base-text outline-none
        side-menu-bg-hover
        hover:transition hover:duration-150
      `,
    }"
  >
    <template #avatar="{ link }">
      <UAvatar
        v-if="link.avatar"
        v-bind="link.avatar"
        class="size-sm"
        loading="lazy"
      />
    </template>
  </UVerticalNavigation>
</template>
