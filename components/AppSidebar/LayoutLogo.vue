<script setup lang="ts">
const router = useRouter();

</script>
<template>
  <UButton
    class="
      relative group bg-hidden hover:bg-hidden
      flex justify-center items-center gap-4 px-2
    "
  >
    <p
      class="text-gray-100 text-3xl transition ease-in-out duration-200"
      @click="router.push({path: '/'})"
    >
      Ai Navi
    </p>
    <UButton
      class="
        outline-none t-accent-bg
        transition ease-in-out duration-200
      "
      icon="i-ic-baseline-edit-note"
      @click="router.push({path: '/'})"
    />
  </UButton>
</template>
