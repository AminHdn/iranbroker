// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },
  css: ["~/assets/css/index.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/colors.scss" as *;'
        }
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss', "tailwindcss",
  ],

 
})