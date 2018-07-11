import Vue from 'vue';
import router from './router/router';
import store from './store/store';
/** element UI界面 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/** 需要放在element-ui的后面，否则放在App.vue里面的样式无法覆盖上面的样式*/
import App from './App.vue';
/** 参数验证 */
import Vuelidate from 'vuelidate';
/** 网络请求 */
import {$get, $post} from './api/api.js';

/** 打印启动的错误日志 */
Vue.config.productionTip = true;

Vue.use(Vuelidate);
Vue.use(ElementUI);

/** 全局挂账get请求方法*/
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
