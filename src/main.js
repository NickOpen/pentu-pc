import Vue from 'vue';
import './config/index';
import routerConfig from './router/index';
import store from './store';

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	router: routerConfig,
  store,
  render: h => h(App),
}).$mount('#app')
