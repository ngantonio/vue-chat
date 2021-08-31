import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:4000/api';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
