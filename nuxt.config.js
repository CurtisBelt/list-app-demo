const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

export default {
  head: {
    title: 'Nuxt.js Template'
  },

  plugins: [],

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

  devModules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],

  eslint: {
    fix: true
  },

  generate: {
    fallback: true
  },

  loading: false,

  netlifyFiles: {
    existingFilesDirectory: './netlify'
  },

  axios: {
    proxy: true
  },
  proxy: {
    '/.netlify/functions': 'http://localhost:9000'
  },

  modern: isProd,

  build: {
    parallel: isDev,
    cache: isDev,
    hardSource: isDev
  }
}
