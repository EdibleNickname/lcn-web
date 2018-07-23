import axios from 'axios';
import { Message } from 'element-ui';

import Storage from '../utils/storage';

// localStorage存放在token的key值
const TOKEN_KEY = "jwtToken";
// token的装饰
const TOKEN_PREFIX = "lcn";
// 为用户分配的请求jwt
let jwt = null ;

//基础的api部分
axios.defaults.baseURL = "http://localhost:81";
//请求超时时间
axios.defaults.timeout = 5000;
// 默认的json请求
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

/** 请求发出之前处理器 */
axios.interceptors.request.use(
    config => {

        // 尝试到localStorage查询是否有token存在
        if(jwt == null ) {
            jwt = Storage.query(TOKEN_KEY);
        }

        // jwt不为null, token存在了，将其放到请求头中
        if(jwt != null) {
            config.headers.common['Authorization'] = TOKEN_PREFIX + jwt;
        }

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
        // Authorization到了这里变成了小写
        if(response.headers.authorization != null) {
            // 将token放到 localStorage
            Storage.saveWithExpirationTime(TOKEN_KEY, response.headers.authorization, 2592000);
        }
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
        url,
    });
};

export const $post = (url, data) => {
    return axios({
        method: 'post',
        url,
        data: JSON.stringify(data),
    });
};

export const $put = (url, data) => {
    return axios({
        method: 'put',
        url,
        data: JSON.stringify(data),
    });
};

export const $upload = (url, data) => {
    return axios({
        method: 'post',
        url,
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
