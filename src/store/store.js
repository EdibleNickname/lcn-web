import Vue from 'vue'
import Vuex from 'vuex'

import CommonModule from './common/CommonModule'

Vue.use(Vuex);

// 是否开启严格模式
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    modules: {
        CommonModule,
    },
    strict: debug,
});

export default store;
