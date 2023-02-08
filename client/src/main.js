import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

// Import Bootstrap and BootstrapVue CSS files (order is important)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

// Make BootstrapVue available throughout your project
// Optionally install the BootstrapVue icon components plugin

createApp(App).use(router).mount('#app')
