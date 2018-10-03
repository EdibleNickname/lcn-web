import Vue from 'vue';
import router from './router/router';
import store from './store/store';

/** element UI界面 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/** 图像预览  */
import Croppa from 'vue-croppa';
Vue.use(Croppa);

/** 需要放在element-ui的后面，否则放在App.vue里面的样式无法覆盖上面的样式*/
import App from './App.vue';

/** 校验 */
import "./assets/js/validate/validate.js";

/** 打印启动的错误日志 */
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
