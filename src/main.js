import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VCalendar } from 'vuetify/labs/VCalendar'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createPinia } from 'pinia'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const vuetify = createVuetify({
  components: {
    ...components,
    VCalendar,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  directives,
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
