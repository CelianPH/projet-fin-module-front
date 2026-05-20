// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  components: [{ path: '~/presentation/components', pathPrefix: false }],
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000',
    },
  },
})