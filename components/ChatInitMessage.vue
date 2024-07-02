<script setup>
</script>

<template>
  <div class="flex items-center justify-center inset-0 absolute">
    <div class="justify-center items-center gap-2 fadeup" flex="~ col">
      <NuxtImg
        width="50"
        height="50"
        format="webp"
        src="/img/logo.png"
        alt="AI Knowledge Navi"
      />
      <p>こんにちは。探したいファイルについて質問してください。</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fadeup {
  @apply animate-fade-up animate-once;
}
</style>
