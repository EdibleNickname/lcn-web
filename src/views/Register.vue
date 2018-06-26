<template>
    <div class="register">
       <div class="content">

           <!--logo和注册的标题-->
           <div class="header">
               <img src="../assets/logo.png"/>
               <span>注册</span>
           </div>

           <!--注册填的内容 -->
           <div class="msg">

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>用户名</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input placeholder="请输入用户名" v-model.trim="newUser.userName" @blur="changeUserNameFirstStatus"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="userNameRequired">用户名不能为空哦</span>
                       <span v-if="!$v.newUser.userName.minLength">用户名的长度需要大于{{$v.newUser.userName.$params.minLength.min}}哦</span>
                       <span class="none">用户名已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>邮箱</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  placeholder="请输入您的邮箱" v-model.trim="newUser.email" @blur="changeEmailFirstStatus"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="emailRequired">邮箱不能为空哦</span>
                       <span v-if="!$v.newUser.email.email" >邮箱的格式出错了</span>
                       <span class="none">邮箱已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">

                   <el-row type="flex">
                       <el-col :span="5">
                           <label>密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input type="password" placeholder="请输入您的密码"
                                     v-model.trim="newUser.password"
                                     @blur="changePasswordFirstStatus"/>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="passwordRequired">密码不能为空哦</span>
                       <span v-if="!$v.newUser.password.minLength" >密码的长度需要大于{{$v.newUser.password.$params.minLength.min}}哦</span>
                   </div>

               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>重复密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  type="password" placeholder="再输一次密码吧"
                                      v-model.trim="newUser.confirmPwd"
                                      @focus="stopVerifyConfirmPwd"
                                      @blur="startVerifyConfirmPwd"/>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="confirmPwdSameAs">2次密码不一样哦</span>
                   </div>

               </div>

               <div class="auth-code-wrapper">
                   <el-row type="flex" justify="end">
                       <el-col :span="11">
                           <el-input  placeholder="验证码" v-model.trim="newUser.authCode" @blur="changeAuthCodeFirstStatus"/>
                       </el-col>
                       <el-col :span="8">
                           <el-button type="primary">获取验证码</el-button>
                       </el-col>
                       <el-col :span="8" class="none">
                           <el-button type="info" disabled>60 s</el-button>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="authCodeRequired">验证码不能为空哦</span>
                   </div>

               </div>

               <div class="btn">
                   <el-button>取消</el-button>
                   <el-button type="primary" @click="register($v.newUser)">提交</el-button>
               </div>

           </div>

       </div>
    </div>
</template>

<script>
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
    export default {
        name: "register",
        data() {
            return{
                /** 业务数据 */
                newUser: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPwd: "",
                    authCode: "",
                },

                /** 为了验证时，第一次不显示错误信息 */
                firstStatus: {
                    userNameFirst: false,
                    emailFirst: false,
                    passwordFirst: false,
                    authCodeFirst: false,
                },
                verifyConfirmPwdSameAs: false,
            }
        },
        computed: {
            userNameRequired() {
                if(!this.firstStatus.userNameFirst) {
                    return this.firstStatus.userNameFirst;
                }
               return  !this.$v.newUser.userName.required;
            },
            emailRequired() {
                if(!this.firstStatus.emailFirst) {
                    return this.firstStatus.emailFirst;
                }
                return  !this.$v.newUser.email.required;
            },
            passwordRequired() {
                if(!this.firstStatus.passwordFirst) {
                    return this.firstStatus.passwordFirst;
                }
                return  !this.$v.newUser.password.required;
            },
            confirmPwdSameAs() {
                if(!this.verifyConfirmPwdSameAs){
                    return this.verifyConfirmPwdSameAs;
                }
                return !this.$v.newUser.confirmPwd.sameAsPassword;
            },
            authCodeRequired() {
                if(!this.firstStatus.authCodeFirst){
                    return this.firstStatus.authCodeFirst;
                }
                return !this.firstStatus.authCodeFirst.required;
            }
        },
        validations: {
            newUser: {
                userName: {
                    required,
                    minLength: minLength(2),
                },
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    minLength: minLength(6),
                },
                confirmPwd: {
                    required,
                    sameAsPassword: sameAs('password'),
                }
            }
        },
        methods : {
            /** 业务方法 */
            register(value){
                // 去掉自定义的变量，避免影响vuelidate的验证
                this.firstStatus.userNameFirst = true;
                this.firstStatus.emailFirst = true;
                this.firstStatus.passwordFirst = true;
                this.verifyConfirmPwdSameAs = true;
                this.firstStatus.authCodeFirst = true;

                // 对所有的值进行验证
                value.$touch();
                if(value.$error){
                    // 验证失败了
                    this.firstStatus.userNameFirst = false;
                    this.firstStatus.emailFirst = false;
                    this.firstStatus.passwordFirst = false;
                    this.verifyConfirmPwdSameAs = false;
                    this.firstStatus.authCodeFirst = false;
                    return;
                }

                //验证成功了
                console.log("验证成功");

            },

            /** 为了验证时，第一次不显示错误信息 */
            changeUserNameFirstStatus() {
                if (!this.firstStatus.userNameFirst) {
                    this.firstStatus.userNameFirst = true;
                }
            },
            changeEmailFirstStatus() {
                if (!this.firstStatus.emailFirst) {
                    this.firstStatus.emailFirst = true;
                }
            },
            changePasswordFirstStatus() {
                if (!this.firstStatus.passwordFirst) {
                    this.firstStatus.passwordFirst = true;
                }
            },
            changeAuthCodeFirstStatus() {
                if (!this.firstStatus.authCodeFirst) {
                    this.firstStatus.authCodeFirst = true;
                }
            },

            startVerifyConfirmPwd() {
                if(!this.verifyConfirmPwdSameAs){
                    this.verifyConfirmPwdSameAs = true;
                }
            },
            stopVerifyConfirmPwd() {
                if(this.verifyConfirmPwdSameAs){
                    this.verifyConfirmPwdSameAs = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/common.scss";

    /**页面样式*/
    .register {
        height: 100vh;
        widht: 100vw;
        background: url("../assets/img/register/register-bg.png") no-repeat fixed;
        background-size: 100% 100%;
        position: relative;
        z-index: 1;
        &:after {
            content: "";
            width: 100vw;
            height: 100vh;
            /* inherit :属性继承， 前面为继承的父级属性*/
            background: inherit;
            position: absolute;
            filter: blur(3px);
            z-index: 2;
        }
        .content {
            position: absolute;
            z-index:3;
            width: 30%;
            background: rgba(255, 255, 255, 0.4);
            margin-left: 35%;
            margin-top: 0.2rem;
            border-radius: 0.05rem;
            padding: 0.06rem 0.06rem  0.2rem 0.04rem;

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

            .input-wrapper {
                margin-bottom: 0.1rem;
                label {
                    font-size: 0.07rem;
                    color: white;
                    padding-left: 0.14rem;
                    text-shadow: 1px 1px black;
                }
                .error-hint {
                    display: flex;
                    justify-content: flex-end;
                    margin: 0.02rem 0.04rem 0 0;
                    span {
                        color: red;
                        font-size: 0.05rem;
                        margin-left: 0.05rem;
                        margin-top: 0.02rem;
                    }
                }
                &:first-child {
                    label {
                        padding-left: 0.07rem;
                    }
                }

                &:nth-last-child(3) {
                    label {
                        padding-left: 0;
                    }
                }
            }

            .auth-code-wrapper {
                .el-button {
                    width: 80%;
                    margin-left: 15%;
                }

                .time {
                    background: orange;
                    text-align: center;
                }

                .error-hint {
                    display: flex;
                    justify-content: flex-end;
                    margin: 0.02rem 0.04rem 0 0;
                    span {
                        color: red;
                        font-size: 0.05rem;
                        margin-left: 0.05rem;
                        margin-top: 0.02rem;
                    }
                }
            }

            .btn {
                margin-top: 0.2rem;
                display: flex;
                justify-content: center;
                button {

                    &:first-child {
                        margin-right: 0.2rem;
                        margin-left: 0.2rem;
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