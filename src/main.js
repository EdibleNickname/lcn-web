import Vue from 'vue';
import router from './router/router';
import store from './store/store';

/** element UI界面 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/** 校验 */
import "./assets/js/validate/validate.js";

/** 需要放在element-ui的后面，否则放在App.vue里面的样式无法覆盖上面的样式*/
import App from './App.vue';

/** 网络请求 */
import {$get, $post} from './api/api.js';
/** 全局挂载*/
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;


/** 打印启动的错误日志 */
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
