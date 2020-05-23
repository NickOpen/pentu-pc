import Vue from 'vue';
import './config/index';
import './assets/style/global.less';
import './assets/style/variables.less';
import routerConfig from './router/index';
import {store} from './store/index';

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	router: routerConfig,
  store,
  render: h => h(App),
}).$mount('#app')
