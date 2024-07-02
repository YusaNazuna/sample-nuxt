<template>
  <div class="layoutCard t-side-layout-card-bg t-side-layout-card-ring">
    <div class="layoutCard-inner">
      <div class="layoutCard-inner-scroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layoutCard {
  @apply h-full flex-1 pt-1 pr-1 ring-1 ring-gray-700 rounded-lg shadow overflow-hidden;
  &-inner {
    @apply relative w-full h-full overflow-y-auto;
    @include attatchScrollbar();
    &-scroll {
      @apply absolute w-full pr-2;
    }
  }
}
</style>
