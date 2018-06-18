import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

/** element UI界面 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/** 参数验证 */
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
