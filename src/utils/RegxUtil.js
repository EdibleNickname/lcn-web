

/** 共用部分 */
const validate = (str, rule) => {
    if (rule.test(str)) {
        return true;
    }
    return false;
};

/** 正则表达式 */
const RegxRule = {
    // 邮箱正则
    emailRegx : /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/,


};

/** 正则方法 */
const RegxUtil = {

    emailValidate(email) {
        let result = validate(email, RegxRule.emailRegx);
        return result;
    }

};

export default RegxUtil;

