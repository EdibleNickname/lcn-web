import Vue from 'vue';
import router from './router/router';
import store from './store/store';

import 'element-ui/lib/theme-chalk/index.css';
/** 需要放在element-ui的后面，否则放在App.vue里面的样式无法覆盖上面的样式*/
import App from './App.vue';


/** element UI界面 */
import ElementUI from 'element-ui';
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
