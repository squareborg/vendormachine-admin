require('dotenv').config();

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css', integrity: 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay', crossorigin: 'anonymous' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#5DE7FF' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/sass/app.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/api.js',
    '~/plugins/globals.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'nuxt-svg-loader',
    ['vue-currency-input/nuxt', { globalOptions: { currency: 'GBP' }}],
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL,
    timeout: 5000,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': process.env.API_DOMAIN,
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Accept,Origin,Content-Type,X-LS-CORS-Template,X-LS-Auth-Token,X-LS-Auth-User-Token,Content-Type,X-LS-Sync-Result,X-LS-Sequence,token',
      'Content-Type': 'application/json',
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token', timeout: 5000 },
          user: { url: '/me', method: 'get', propertyName: '' },
          logout: false
        },
        tokenType: 'Bearer'
      }
    },
    plugins: ['~/plugins/auth.js'],
    resetOnError: true,
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  toast: {
    position: 'bottom-right',
    theme: "toasted-custom",
    duration: 3000,
  },

  router: {
    middleware: ['auth', 'verified']
  }
}
