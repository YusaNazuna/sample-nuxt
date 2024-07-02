<template>
  <div class="flex flex-col gap-8 py-4">
    <section>
      <p class="text-cool-400 text-xs px-4">
        <USkeleton
          class="w-8 h-3"
          :ui="{
            background: 'bg-slate-600'
          }"
        />
      </p>
      <ul class="text-cool-200 flex flex-col pt-2">
        <li
          v-for="(_, i) in 10"
          :key="i"
          class="flex gap-3 p-3"
        >
          <div>
            <USkeleton
              class="w-5 h-4"
              :ui="{
                rounded: 'rounded-full', background: 'bg-slate-600'
              }"
            />
          </div>
          <USkeleton
            class="w-full h-4"
            :ui="{
              background: 'bg-slate-600'
            }"
          />
        </li>
      </ul>
    </section>
  </div>
</template>
