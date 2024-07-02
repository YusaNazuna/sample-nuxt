module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  rules: {
    "semi": ["error", "always"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 2
      },
      "multiline": {
        "max": 1
      }
    }]
  }
};
