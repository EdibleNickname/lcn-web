<template>
    <div class="register">
        <!--用户信息输入区-->
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
                           <el-input placeholder="请输入用户名" />
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="true">用户名不能为空哦</span>
                       <span v-if="true">用户名的长度需要大于3哦</span>
                       <span v-if="true">用户名已被注册了</span>
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
                       <span v-if="true">邮箱不能为空哦</span>
                       <span v-if="true">邮箱的格式出错了</span>
                       <span v-if="true">邮箱已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">

                   <el-row type="flex">
                       <el-col :span="5">
                           <label>密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input type="password" placeholder="请输入您的密码" />
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="true">密码不能为空哦</span>
                       <span v-if="true" >密码的长度需要大于6哦</span>
                   </div>

               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>重复密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input  type="password" placeholder="再输一次密码吧" />
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="true">2次密码不一样哦</span>
                   </div>

               </div>

               <div class="auth-code-wrapper">
                   <el-row type="flex" justify="end">
                       <el-col :span="11">
                           <el-input  placeholder="验证码" />
                       </el-col>
                       <el-col :span="8">
                           <el-button v-if="captcha.showTimer" type="primary" @click="showDialog">获取验证码</el-button>
                           <el-button v-else type="info" disabled>{{captcha.time}} s</el-button>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="true">验证码不能为空哦</span>
                   </div>

               </div>

               <div class="btn">
                   <el-button>取消</el-button>
                   <el-button type="primary" @click="register($v.newUser)">提交</el-button>
               </div>

           </div>

       </div>

        <!--弹窗-->
        <div class="captcha-dialog">
            <el-dialog :visible.sync="captcha.dialogVisible" width="30%" center>
                <span slot="title" class="el-dialog__title">
                    <div class="title">
                        <span class="line"></span>
                        <span>请输入验证码</span>
                    </div>
                </span>
                <div class="body">
                    <img :src="captcha.img"/>
                    <div v-if="captcha.captchaResult">{{captcha.captchaHint}}</div>
                    <div class="replace" @click="getCaptcha">换一张</div>
                    <input type="text"  v-model="captcha.answer" placeholder="请输入图片中的内容" @focus="cleanHint"/>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelDialog">取 消</el-button>
                    <el-button type="primary" @click="captchaConfirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return{
                /** 业务数据 */
                newUser: {
                    userName: "",
                    email: "licanxin@eigpay.net",
                    password: "",
                    confirmPwd: "",
                    authCode: "",
                    eMailRedisKey: "",
                },
                /** 验证码操作*/
                captcha: {
                    /** 控制弹弹窗的消失或出现*/
                    dialogVisible: false,
                    /**加载验证码的等待图片*/
                    img: require("../assets/img/common/loading.gif"),
                    /** redis存放验证码答案对应的key */
                    redisKey: "",
                    /**控制错误提示框的出现消失*/
                    captchaResult: false,
                    /** 验证码错误提示*/
                    captchaHint: "验证码错误",
                    /**用户输入的验证码答案*/
                    answer: "",
                    /** 验证码的长度*/
                    length: 4,
                    /** 展示倒计时 */
                    showTimer : true,
                    /** 倒计时时间*/
                    time : 60,
                    /** 邮箱验证码是否过期了*/
                    eMailCaptcha: true,
                },
            }
        },
        methods : {
            /** 验证码弹窗*/
            showDialog(){
                //需要先确定邮箱填过了，才能在验证码验证通过后，发送邮件到邮箱
                let emailRegx = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
                if(!emailRegx.test(this.newUser.email)){
                    // 提示邮箱需要输入
                    return;
                }
                //获取验证码
                this.getCaptcha();
                this.captcha.dialogVisible = true;
            },

            /** 验证码弹窗消失*/
            cancelDialog() {
                this.captcha.dialogVisible = false;
                this.captcha.answer = "";
            },

            /** 去除验证码错误的提示*/
            cleanHint() {
                if(this.captcha.captchaResult) {
                    this.captcha.captchaResult = false;
                    this.captcha.answer = "";
                }
            },

            /**验证码提交*/
            captchaConfirm() {
                if(this.captcha.answer.length != this.captcha.length) {
                    this.captcha.captchaResult = true;
                    return;
                }
                var regx = /^([a-zA-Z]|\d){4}$/;
                if(!regx.test(this.captcha.answer)) {
                    this.captcha.captchaResult = true;
                    return;
                }
                let url = "/open/register/validCaptcha/"+ this.captcha.answer +"/"+ encodeURIComponent(this.newUser.email) + "/" + this.captcha.redisKey;
                let _this = this;
                this.$get(url).then(
                    resp => {
                        if(resp.answer != "success") {
                            _this.captcha.captchaResult = true;
                            _this.getCaptcha();
                            return;
                        }
                        // 验证码验证通过
                        _this.captcha.dialogVisible = false;
                        _this.captcha.answer = "";
                        _this.captcha.showTimer = false;
                        _this.newUser.eMailRedisKey = resp.eMailRedisKey;
                        _this.captchaTimer();
                        _this.showSuccessHint();
                    }
                );

            },

            /** 验证码有效期计时器*/
            captchaTimer() {
                this.captcha.time = 60;
                let _this = this;
                let timer = setInterval(()=>{
                    if(_this.captcha.time == 0) {
                        _this.captcha.showTimer = true;
                        _this.captcha.eMailCaptcha = true;
                        clearInterval(timer);
                    }
                    _this.captcha.time -- ;
                }, 1000);
            },

            /** 获取验证码*/
            getCaptcha() {
                let url = "/open/captcha/generateCaptcha";
                let _this= this;
                this.$get(url).then(
                    resp => {
                        _this.captcha.img = 'data:image/jpeg;base64,'+resp.captchaImg;
                        _this.captcha.redisKey = resp.redisKey;
                    }
                );
            },

            /** 业务方法 */
            register(value){
                // 邮箱验证码已过期
                if(this.captcha.eMailCaptcha) {
                    this.showErrorHint("您的验证码已过期，重新获取一个吧");
                    return;
                }

                // 请求参数
                let data = {
                    userName : this.newUser.userName,
                    password : this.newUser.password,
                    eMail : this.newUser.email,
                    authCode : this.newUser.authCode,
                    eMailRedisKey: this.newUser.eMailRedisKey,
                };

                let url = "/open/register/registerUser";
                let _this = this;
                this.$post(url, data).then(
                    resp => {
                        console.log(resp);
                        // 失败
                        if (resp.answer != "success") {
                            _this.showErrorHint(resp.hint);
                            return;
                        }
                        // 注册成功
                        console.log("成功");

                    },
                );
                //验证成功了
                console.log("验证成功")
            },

            /** 成功提示*/
            showSuccessHint() {

                if(this.captcha.eMailCaptcha) {
                    // 邮箱验证码设值为未过期
                    this.captcha.eMailCaptcha = false;
                }

                this.$message({
                    showClose: true,
                    message: "验证码已发送到您的邮箱，请注意查收",
                    type: 'success',
                    duration: 3000,
                });
            },

            /** 失败提示 */
            showErrorHint(hint) {
                this.$message({
                    showClose: true,
                    message: hint,
                    type: 'warning',
                });
            },
        },
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
            z-index: 3;
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

        .captcha-dialog {
            .body {
                flex-direction: column;
                @include layout-center;
                img {
                    margin-bottom: 10px;
                    height: 0.16rem;
                    width: 0.48rem;
                }
                div {
                    color: red;
                    margin-bottom: 0.02rem;
                }
                .replace {
                    @include theme-color;
                    font-size: 0.06rem;
                    margin-bottom: 0.05rem;
                    &:hover {
                        cursor: pointer;
                        color: deepskyblue;
                    }
                }
                input {
                    border: none;
                    outline: none;
                    border-bottom: 1px solid #ddd;
                    padding: 0.01rem;
                    height: 0.1rem;
                    text-align: center;
                    color: #a5a5a5;
                    font-weight: 500;
                    font-size: 0.06rem;
                }
            }

            .dialog-footer {
                button {
                    width: 0.4rem;
                }
                button:first-child{
                    margin-right: 0.5rem;
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