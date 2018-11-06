<template>
    <div class="login">

        <div class="content">
            <!--logo和登录的标题-->
            <div class="header">
                <img src="../../assets/logo.png"/>
                <span>登录</span>
            </div>

            <!--登录填的内容 -->
            <div class="msg">

                <p class="login-hint" v-show="showErrorHint"><i class="el-icon-info"></i>{{errorHint}}</p>

                <el-input placeholder="请输入用户名" v-model="userInfo.userName"/>

                <el-input type="password" placeholder="请输入您的密码" v-model="userInfo.password"/>

                <div class="captcha-wrapper">
                    <el-col :span="14">
                        <el-input placeholder="验证码你在哪" v-model="userInfo.captchaAnswer"/>
                    </el-col>
                    <el-col :span="10">
                        <el-button v-if="captcha.showCaptcha" type="primary" @click="getCaptcha">验证码</el-button>
                        <div v-else class="captcha-img" @click="getCaptcha">
                            <img :src="captcha.captchaImg"/>
                        </div>
                    </el-col>
                </div>

                <div class="btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>

                <div class="other-operation">
                    <a>找回密码</a>
                    <router-link tag="a" to="/register">立即注册</router-link>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import Storage from '../../utils/Storage';
    import request from '../../api/request/open/RegisterRequest';
    import loginRequest from '../../api/request/open/LoginRequest';
    import regxUtil from '../../utils/RegxUtil';

    export default {
        name: "login",
        data() {
            return {
                errorHint: "出错了",
                showErrorHint: false,
                // 输出错误的次数
                errorNum: 0,
                captcha: {
                    showCaptcha: true,
                    captchaImg: "",
                    redisKey: "",
                },
                userInfo: {
                    userName: "",
                    password: "",
                    captchaAnswer: ""
                }

            }
        },
        methods: {
            // 获取验证码
            async getCaptcha() {
                const data = await request.getCaptcha();
                this.captcha.captchaImg = 'data:image/jpeg;base64,' + data.captchaImg;
                this.captcha.redisKey = data.redisKey;
                if(this.captcha.showCaptcha) {
                   this.captcha.showCaptcha = !this.captcha.showCaptcha;
                }
            },
            async login() {
                if(!this.userInfo.userName) {
                    this.errorHint = "用户名不能为空";
                    this.showErrorHint = true;
                    return;
                }

                if(!this.userInfo.password) {
                    this.errorHint = "密码不能为空";
                    this.showErrorHint = true;
                    return
                }

                // 验证码的格式出错了
                if(!regxUtil.captchaValidate(this.userInfo.captchaAnswer)) {
                    this.captcha.captchaResult = true;
                    this.errorHint = "验证码错误";
                    return;
                }
                console.log("请求开始");
                // 开始登录
                const  resp = await loginRequest.login(this.userInfo.captchaAnswer, this.captcha.redisKey, this.userInfo.userName, this.userInfo.password);
                
                if(resp.answer != "success") {
                    this.errorNum ++;
                    this.errorHint = resp.hint;
                    this.showErrorHint = true;
                    this.getCaptcha();
                    return;
                }

                // TODO: 2018/10/7 登录成功的处理
                alert("登录成功");

            },
            ...mapMutations([
                'userInfoOperate'
            ]),
        },
        mounted() {
            Storage.remove("userInfo");
        }
    }
</script>

<style scoped lang="scss">

    @import "../../assets/css/common";
    @import "../../assets/css/oss-img";

    .login {
        @include register-bg;
        background-size: 100% 100%;
        position: relative;
        &:after {
            content: "";
            height: 100vh;
            width: 100vw;
            // inherit :属性继承， 前面为继承的父级属性
            background: inherit;
            position: absolute;
            filter: blur(3px);
            z-index: 2;
        }

        .content {
            position: absolute;
            z-index: 3;
            width: 24%;
            background: rgba(255, 255, 255, 0.4);
            margin-left: 38%;
            margin-top: 0.5rem;
            border-radius: 0.05rem;
            padding: 0.06rem 0.06rem 0.1rem 0.04rem;

            .header {
                display: flex;
                justify-content: space-between;
                height: 0.1rem;
                margin-bottom: 0.1rem;
                img {
                    width: 0.2rem;
                    animation: login-animation 30s linear  0.2s infinite;
                }
                span {
                    align-self: center;
                    @include theme-color;
                    flex-grow: 1;
                    text-align: center;
                    text-shadow: 1px 01px rgba(255,255,255, 0.4);
                }
            }

            .msg {
                padding: 0 0.1rem;

                .login-hint {
                    color: red;
                    font-size: 0.06rem;
                    padding-left: 0.03rem;
                    margin-bottom: 0.02rem;
                    i {
                        padding-right: 0.03rem;
                    }
                }

                .captcha-wrapper {
                    .el-input {
                        input {
                            vertical-align: top;
                        }
                    }
                    .el-button {
                        vertical-align: top;
                        width: 80%;
                        margin-left: 20%;
                        font-size: 0.06rem;
                    }

                    .captcha-img {
                        width: 80%;
                        margin-left: 20%;
                        height: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            }

            .btn {
                margin-top: 0.2rem;
                .el-button {
                    width: 100%;
                }
            }

            .other-operation {
                display: flex;
                justify-content: flex-end;
                margin-top: 0.02rem;

                a {
                    color: #00a1d6;
                    font-size: 0.05rem;
                    cursor: pointer;
                    margin-left: 0.1rem;
                    &:hover {
                        color: red;
                        text-decoration: underline;
                    }
                }
            }
        }

        @keyframes login-animation {
            0% 	    { transform: scale(1) rotate(0deg); opacity: 1;}
            50% 	{ transform: scale(1.2) rotate(30deg); opacity: 0.5;}
            100% 	{ transform: scale(1) rotate(-30deg); opacity: 1;}
        }
    }
</style>