import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "AI Knowledge Navi"
    }
  },

  build: {
    transpile: [
      '@nuxt/ui',
      '@unocss/nuxt'
    ]
  },

  imports: {
    dirs: ["types/*.ts", "types/**/*.ts"]
  },

  components: [{
    path: '@/components',
    pathPrefix: false,
    preload: true
  }],

  future: {
    typescriptBundlerResolution: true,
  },

  features: {
    inlineStyles: false
  },

  experimental: {
    watcher: "parcel",
  },

  typescript: {
    shim: false,
    strict: true,
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@unocss/nuxt",
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/devtools"
  ],

  plugins: [
    "@/plugins/dompurify-html"
  ],

  colorMode: {
    preference: "light",
  },

  css: [
    "ress",
    "@/assets/scss/style.scss"
  ],

  sourcemap: {
    server: true,
    client: true
  },

  ssr: false,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/scss/mixin.scss' as *;",
        },
      },
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
});
