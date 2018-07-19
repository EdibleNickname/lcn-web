import Vue from 'vue';
import Router from 'vue-router';

/** 页面 */
import Index from '@/views/Index.vue';
const Login = r=> require.ensure([], ()=> r(require('@/views/open/Login.vue')), 'login');
const Register = r=> require.ensure([], ()=> r(require('@/views/open/Register.vue')), 'register');
const CompleteInfo = r=> require.ensure([], ()=> r(require('@/views/auth/reader/CompleteInfo')), 'completeInfo');

Vue.use(Router);

export default new Router({
    routes : [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/completeInfo',
            name: 'completeInfo',
            component : CompleteInfo
        }
    ]

})
