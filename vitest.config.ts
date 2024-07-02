import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
  },
  optimizeDeps: {
    noDiscovery: true,
    include: []
  },
  build: {
    commonjsOptions: {
      include: []
    }
  },
  plugins: [

  ]
});
