import { $get, $post} from '../../api.js';

const loginRequest = {

    // 用户登录
    login(captcha, redisKey, userName, password) {
        let url = "/open/login/userLogin/"+ captcha + "/" + redisKey + "/" + userName + "/" + password;
        console.log(url);

        let resp = $get(url);
        return resp;
    }
};

export default loginRequest;