const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

export default {
  head: {
    title: 'Nuxt.js Template'
  },

  plugins: [],

  modules: ['@nuxtjs/axios'],

  devModules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],

  eslint: {
    fix: true
  },

  netlifyFiles: {
    existingFilesDirectory: './netlify'
  },

  modern: isProd,

  build: {
    parallel: isDev,
    cache: isDev,
    hardSource: isDev
  }
}
