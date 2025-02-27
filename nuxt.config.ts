// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["./assets/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
  ],
  plugins:['~/plugins/toast.ts'],
  compatibilityDate: "2025-02-23",
});