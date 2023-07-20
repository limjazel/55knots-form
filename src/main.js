import './assets/base.css'

import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const DEFAULT_TITLE = "Page";
router.afterEach((to) => { nextTick(() => { document.title = to.meta.title || DEFAULT_TITLE; }); });

app.use(createPinia())
app.use(router)

app.mount('#app')
