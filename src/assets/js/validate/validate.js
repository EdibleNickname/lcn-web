import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';
// 导入中文语音包
import zh_CN from 'vee-validate/dist/locale/zh_CN';

// 自定义提示进行覆盖
const dictionary = {
    zh_CN : {
        messages: {
            email: (field) => `${field}的格式出错了`,
            required: (field) => `${field}不能为空`,
            min: (field, [length]) => `${field}的长度必须大于${length}哦`,
            max: (field, [length]) => `${field}的长度不能大于${length}哦`,
            length: (field, [length]) => `${field}的长度为${length}哦`
        },
        // 属性转为什么单词
        attributes: {
            username: "用户名",
            email: "邮箱",
            password: "密码",
            authCode: "验证码"
        }
    }
};

// 提示为中文
Validator.localize('zh_CN', zh_CN);

const config = {
    // 什么事件触发是进行验证
    event: 'input',
    // 多少毫秒进行一次验证
    delay: 0,
    // 自定义字典，覆盖默认的
    dictionary,
};

Vue.use(VeeValidate,config);