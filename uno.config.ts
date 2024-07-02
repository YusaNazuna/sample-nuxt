// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Noto+Sans+JP:400,600"
      }
    })
  ],
  transformers: [
    transformerDirectives()
  ],
  rules: [
    ["fcenter", { display: "flex", "align-items": "center", "justify-content": "center" }],
  ]
});
