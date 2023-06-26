import { createApp } from 'vue'
import gCodeView from './gCodeView.vue'
import './assets/styles/index.scss'
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
//import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import tooltip from "./directives/v-tooltip/tooltip.js";
import './directives/v-tooltip/tooltip.css';
//import 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css';

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi} from 'vuetify/lib/iconsets/mdi.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
const vuetify = createVuetify({
    components,
    directives,
})

//createApp(gCodeView).mount('#app')
const app = createApp(gCodeView);
app.directive("tooltip",tooltip);
app.use(vuetify, {
    iconfont:'mdi'
})
  
app.mount("#app")