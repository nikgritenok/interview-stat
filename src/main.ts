import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import App from './App.vue'
import Aura from '@primevue/themes/material'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import PrimeVue from 'primevue/config'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import { ToastService } from 'primevue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyB3ymzNr8VCyzM39RgeSbPi2t9PobX01OI',
  authDomain: 'interview-stat.firebaseapp.com',
  projectId: 'interview-stat',
  storageBucket: 'interview-stat.firebasestorage.app',
  messagingSenderId: '486644380981',
  appId: '1:486644380981:web:af938b01b8f6eaa2cfc87c',
  measurementId: 'G-TBGHECJ60R',
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'light',
      cssLayer: false,
    },
  },
})
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress-spinner', ProgressSpinner)
app.component('app-card', Card)

app.mount('#app')
