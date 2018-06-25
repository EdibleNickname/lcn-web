<template>
    <div class="register">
       <div class="content">

           <!--logo和注册的标题 -->
           <div class="header">
               <img src="../assets/logo.png"/>
               <span>注册</span>
           </div>

           <!--注册填的内容-->
           <div class="msg">
               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>用户名</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  placeholder="请输入您的昵称"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span class="none">昵称不能为空</span>
                       <span class="none">昵称的长度需要大于2哦</span>
                       <span class="none">昵称已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>邮箱</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  placeholder="请输入您的邮箱"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span class="none">邮箱不能为空哦</span>
                       <span class="none">邮箱的格式出错了</span>
                       <span class="none">邮箱已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">

                   <el-row type="flex">
                       <el-col :span="5">
                           <label>密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  placeholder="请输入您的密码"/>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span class="none">密码不能为空</span>
                       <span class="none">密码的长度需要大于6哦</span>
                   </div>

               </div>

               <div class="input-wrapper">

                   <el-row type="flex">
                       <el-col :span="5">
                           <label>重复密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  placeholder="再输一次密码吧"/>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span class="none">2次密码不一样哦</span>
                   </div>

               </div>

               <div class="auth-code-wrapper">
                   <el-row type="flex" justify="end">
                       <el-col :span="11">
                           <el-input  placeholder="验证码"/>
                       </el-col>
                       <el-col :span="8">
                           <el-button type="primary">获取验证码</el-button>
                       </el-col>
                       <el-col :span="8" class="none">
                           <el-button type="info" disabled>60 s</el-button>
                       </el-col>
                   </el-row>
               </div>

               <div class="btn">
                   <el-button>取消</el-button>
                   <el-button type="primary">提交</el-button>
               </div>
           </div>

       </div>
    </div>
</template>

<script>
    import { required,minLength,between,email } from 'vuelidate/lib/validators';
    export default {
        name: "register",
        data() {
            return{
                newUser: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPwd: "",
                },
                authCode: "",
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/common.scss";

    /** element-ui重置*/
    .el-input {
        height: 0.2rem;
    }
    .el-col{
        height: 0.15rem;
    }
    .el-row {
        height: 0.15rem;
    }

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
            50% 	{ transform: scale(0.7) rotate(30deg); opacity: 0.8;}
            100% 	{ transform: scale(1) rotate(-30deg); opacity: 1;}
        }
    }
</style>