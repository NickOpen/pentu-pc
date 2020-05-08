/**
 * Vue 全局使用配置
 */
import Vue from 'vue';
import VueStorage from 'vue-ls';
import _ from 'lodash';

import ElementUI, {Notification, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const  storageOptions = {
	namespace: 'cb_huanghe__', // key prefix
	name: 'ls', // name variable Vue.[ls] or this.[$ls],
	storage: 'local' // storage name session, local, memory
}


Vue.use(VueStorage, storageOptions);
Vue.use(ElementUI);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$lodash = _ ;