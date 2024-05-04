import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'mapbox-gl/dist/mapbox-gl.css'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import * as echarts from 'echarts'
import vcharts from 'vue-echarts'
export const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-chart',vcharts)
app.mount('#app')
