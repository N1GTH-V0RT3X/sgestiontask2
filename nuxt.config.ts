// Reconfigurado para trabajar con Nuxt 3 y evitar errores de conexión y CORS y NODEJS

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    host: '127.0.0.1',
    port: 3000,
    https: false
  },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/eslint'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001'
    }
  }
});