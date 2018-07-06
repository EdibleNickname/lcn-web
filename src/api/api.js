import axios from 'axios';
import qs from 'qs';

import { Message } from 'element-ui';

//基础的api部分
axios.defaults.baseURL = "http://localhost:81";
//请求超时时间
axios.defaults.timeout = 5000;

/** 请求发出之前处理器 */
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        console.log("网络出错了");
        console.log(err);
        Message.error({message: '请求超时 !'});
    }
);

/** 响应的拦截处理器 */
axios.interceptors.response.use(
    response => {
        return response.data.result;
    },
    err => {
        console.log("网络异常");
        Message.error({message: '网络出错了!'});
    }
);

export const $get = (url) => {
    return axios({
        method: 'get',
        url: `${url}`,
    });
};