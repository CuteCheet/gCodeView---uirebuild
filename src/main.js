import { createApp } from 'vue'
import gCodeView from './gCodeView.vue'
import './assets/styles/index.scss'
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
//import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import tooltip from "./directives/v-tooltip/tooltip.js";
import './directives/v-tooltip/tooltip.css';

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

//createApp(gCodeView).mount('#app')
const app = createApp(gCodeView);
app.directive("tooltip",tooltip);
app.use(vuetify)
// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.mount("#app")