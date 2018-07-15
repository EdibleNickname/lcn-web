import Vue from 'vue';
import Router from 'vue-router';

/** 页面 */
import Index from '@/views/Index.vue';
const Login = r=> require.ensure([], ()=> r(require('@/views/Login.vue')), 'login');
const Register = r=> require.ensure([], ()=> r(require('@/views/Register.vue')), 'register');


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
        }
    ]

})
