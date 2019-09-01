const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

export default {
  head: {
    title: 'List App Demo'
  },

  plugins: [],

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],

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
    hardSource: isDev,
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  }
}
