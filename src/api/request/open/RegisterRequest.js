import { $get, $post} from '../../api.js';

const registerRequest = {
    // 查询用户名是否存在的url
    userNameIsExist(userName) {
        let url = "/open/register/queryUserNameIsExist/"+ userName;
        let resp = $get(url);
        return resp;
    },
    // 查询邮箱是否注册过的url
    emailIsExist(email) {
        let url = "/open/register/"+encodeURIComponent(email)+"/queryEmailIsExist";
        let resp = $get(url);
        return resp;
    },
    // 获取验证码
    getCaptcha() {
        let url = "/open/captcha/generateCaptcha";
        let resp = $get(url);
        return resp;
    },

    // 验证验证码是否正确
    validCaptcha(answer, email, redisKey) {
        let url = "/open/register/validCaptcha/"+ answer +"/"+ encodeURIComponent(email) + "/" + redisKey;
        let resp = $get(url);
        return resp;
    },

    /** ---------------------------------------------------- */

    // 注册用户
    registerUser(userName, password, email, authCode, emailRedisKey) {
        let url = "/open/register/registerUser";
        // 请求参数
        let data = {
            userName,
            password,
            email,
            authCode,
            emailRedisKey
        };

        let resp = $post(url, data);
        return resp;

    }

};

export default registerRequest;