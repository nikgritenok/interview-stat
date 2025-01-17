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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import { ToastService } from 'primevue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import ConfirmDialog from 'primevue/confirmdialog'
import router from './router'
import ConfirmationService from 'primevue/confirmationservice'
import Message from 'primevue/message'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import RadioButton from 'primevue/radiobutton'

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
app.use(ConfirmationService)
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
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', Message)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-datepicker', DatePicker)
app.component('app-radiobutton', RadioButton)

app.mount('#app')
