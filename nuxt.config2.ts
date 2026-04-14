// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // SOLUCIÓN PARA ERRORES DE CONEXIÓN Y CORS
  devServer: {
    host: '127.0.0.1',  // Asegura que el servidor escuche en localhost
    //  mismo puerto que se abre en navegador (3000)
    port: 3000, 
    https: false, // Desactivar HTTPS en desarrollo local
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css', // íconos
    '~/assets/css/main.css' // Incluye main.css (que a su vez importa variables.css)
  ],
  build: {
    transpile: ['vuetify']
  },
  modules: ['@nuxt/image', 
    '@nuxt/ui', 
    '@pinia/nuxt',
    '@nuxt/eslint',
    
  ],
 
  // Configuración de runtimeConfig para usar las variables de .env
  runtimeConfig: {
    public: {
      apiBaseUrl: '', // Se llenará desde NUXT_PUBLIC_API_BASE_URL
      apiAuthToken: '', // Se llenará desde NUXT_PUBLIC_API_AUTH_TOKEN
      userToken: '' // Se llenará desde NUXT_PUBLIC_USER_TOKEN
    }
  },
})