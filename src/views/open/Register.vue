<template>
    <div class="register">
        <!--用户信息输入区-->
        <div class="content">
           <!--logo和注册的标题-->
           <div class="header">
               <img src="../../assets/logo.png"/>
               <span>注册</span>
           </div>

           <!--注册填的内容 -->
           <div class="msg" @keydown="registerSubmit($event)">

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>用户名</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input v-model="newUser.userName" placeholder="请输入用户名" v-validate="'required|min:3|max:10'" name="username"
                                @blur="checkUserNameUnique('02')" @focus="checkUserNameUnique('01')"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="errors.has('username')">{{errors.first('username')}}</span>
                       <span v-if="unique.userNameUnique">用户名已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>邮箱</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input v-model="newUser.email" type="email" v-validate="'required|email'" name="email" placeholder="请输入您的邮箱"
                                @blur="checkEmailUnique('02')" @focus="checkEmailUnique('01')"/>
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="errors.has('email')">{{errors.first('email') }}</span>
                       <span v-if="unique.emailUnique">邮箱已被注册了</span>
                   </div>
               </div>

               <div class="input-wrapper">

                   <el-row type="flex">
                       <el-col :span="5">
                           <label>密码</label>
                       </el-col>
                       <el-col :span="19">
                           <el-input v-model="newUser.password" type="password" v-validate="'min:6|required'" name="password" placeholder="请输入您的密码" />
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="errors.has('password')">{{errors.first('password')}}</span>
                   </div>

               </div>

               <div class="input-wrapper">
                   <el-row type="flex">
                       <el-col :span="5">
                           <label>重复密码</label>
                       </el-col>
                       <el-col :span="19">
                           <!--这里有个bug , confirmed：target 不会自动验证的，只能讲通过这种方式对输入的值和v-model的值进行比较，而不是属性-->
                           <el-input v-model="newUser.confirmPwd" type="password" v-validate="`required|confirmed:${newUser.password}`" name="confirmPwd" placeholder="再输一次密码吧" />
                       </el-col>
                   </el-row>
                   <div class="error-hint">
                       <span v-if="errors.has('confirmPwd')">2次密码不一样哦</span>
                   </div>

               </div>

               <div class="auth-code-wrapper">
                   <el-row type="flex" justify="end">
                       <el-col :span="11">
                           <el-input v-model="newUser.authCode" v-validate="'required|length:6'" name="authCode" placeholder="验证码" />
                       </el-col>
                       <el-col :span="8">
                           <el-button v-if="captcha.showTimer" type="primary" @click="dialogToggle('02')">获取验证码</el-button>
                           <el-button v-else type="info" disabled>{{captcha.time}} s</el-button>
                       </el-col>
                   </el-row>

                   <div class="error-hint">
                       <span v-if="errors.has('authCode')">{{errors.first("authCode")}}</span>
                   </div>

               </div>

               <div class="btn">
                   <el-button>取消</el-button>
                   <el-button type="primary" @click="register">提交</el-button>
               </div>
           </div>

       </div>

        <!--弹窗-->
        <div class="captcha-dialog" @keydown="captchaSubmit($event)">
            <el-dialog :visible.sync="captcha.dialogVisible" width="30%" center>
                <span slot="title" class="el-dialog__title">
                    <div class="title">
                        <span class="line"></span>
                        <span>请输入验证码</span>
                    </div>
                </span>
                <div class="body">
                    <img :src="captcha.img"/>
                    <transition name="slide-fade">
                        <div v-show="captcha.captchaResult">验证码错误</div>
                    </transition>
                    <div class="replace" @click="getCaptcha">换一张</div>
                    <input type="text"  v-model="captcha.answer" placeholder="请输入图片中的内容" @focus="cleanHint"/>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogToggle('01')">取 消</el-button>
                    <el-button type="primary" @click="captchaConfirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import Storage from '../../utils/storage';

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
                    eMailRedisKey: "",
                },
                /** 用户名和密码唯一 */
                unique: {
                    userNameUnique: false,
                    emailUnique: false,
                },

                /** 验证码操作*/
                captcha: {
                    /** 控制弹弹窗的消失或出现*/
                    dialogVisible: false,
                    /**加载验证码的等待图片*/
                    img: require("../../assets/img/common/loading.gif"),
                    /** redis存放验证码答案对应的key */
                    redisKey: "",
                    /**控制错误提示框的出现消失*/
                    captchaResult: false,
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

            /** 用户名是否唯一
             *  type : 01 取消验证  02 开始验证
             */
            async checkUserNameUnique(type){

                if(type == '01') {
                    if(this.unique.userNameUnique) {
                        this.unique.userNameUnique = false;
                    }
                    return;
                }

                if(this.newUser.userName.length<3 || this.newUser.userName.length> 10) {
                    return;
                }
                // 拼接验证用户名是否存在的api
                let url = "/open/register/queryUserNameIsExist/"+ this.newUser.userName;
                const data = await this.$get(url);
                this.unique.userNameUnique = Boolean(data);
            },

            /**
             *  验证邮箱是否唯一
             *  type : 01 取消验证  02 开始验证
             */
            async checkEmailUnique(type){
                if(type == '01') {
                    if(this.unique.emailUnique) {
                        this.unique.emailUnique = false;
                    }
                    return;
                }

                let emailRegx = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
                if(!emailRegx.test(this.newUser.email)){
                    // 邮箱格式错误不验证
                    return;
                }
                let url = "/open/register/"+encodeURIComponent(this.newUser.email)+"/queryEmailIsExist";
                const data = await this.$get(url);
                this.unique.emailUnique = Boolean(data);
            },

            /** 获取验证码 */
            getCaptcha() {
                let url = "/open/captcha/generateCaptcha";
                this.$get(url).then(
                    resp => {
                        this.captcha.img = 'data:image/jpeg;base64,'+resp.captchaImg;
                        this.captcha.redisKey = resp.redisKey;
                    }
                );
            },

            /** 验证码验证 */
            captchaConfirm() {
                // 输入的验证码的长度不对
                if(this.captcha.answer.length != this.captcha.length) {
                    this.captcha.captchaResult = true;
                    return;
                }
                // 验证码格式 大小写数字4位数
                var regx = /^([a-zA-Z]|\d){4}$/;
                if(!regx.test(this.captcha.answer)) {
                    this.captcha.captchaResult = true;
                    return;
                }
                let url = "/open/register/validCaptcha/"+ this.captcha.answer +"/"+ encodeURIComponent(this.newUser.email) + "/" + this.captcha.redisKey;
                this.$get(url).then(
                    resp => {
                        if(resp.answer != "success") {
                            this.captcha.captchaResult = true;
                            this.getCaptcha();
                            return;
                        }
                        // 验证码验证通过
                        this.captcha.dialogVisible = false;
                        this.captcha.answer = "";
                        this.captcha.showTimer = false;
                        this.newUser.eMailRedisKey = resp.eMailRedisKey;
                        this.captchaTimer();
                        this.showMessage('02', '验证码已发送到您的邮箱，请注意查收');
                    }
                );
            },

            /** 业务方法 */
            register(){

                // 用户名重复了
                if(this.unique.userNameUnique) {
                    return;
                }

                // 邮箱重复了
                if(this.unique.emailUnique) {
                    return;
                }

                this.$validator.validate().then((result) => {
                    if(!result) {
                        // 有参数未填或格式出错
                        return;
                    }

                    if(this.captcha.eMailCaptcha) {
                        this.showMessage("01", "您的验证码已过期，重新获取一个吧");
                        return;
                    }

                    // 请求参数
                    let data = {
                        userName : this.newUser.userName,
                        password : this.newUser.password,
                        email : encodeURIComponent(this.newUser.email),
                        authCode : this.newUser.authCode,
                        emailRedisKey: this.newUser.eMailRedisKey,
                    };

                    let url = "/open/register/registerUser";
                    this.$post(url, data).then( resp => {
                        // 验证成功
                        if(resp.answer != "success") {
                            this.showMessage('01', resp.hint);
                            this.newUser.authCode = "";
                            return;
                        }
                        let userInfo = {
                            userName:  this.newUser.userName,
                            userId: resp.userId,
                        };
                        // 将用户名保存进容器
                        this.userInfoOperate({type : '01', userInfo});
                        // 将用户名保存进localStorage，有效期30天
                        Storage.saveWithExpirationTime("userInfo", userInfo, 2592000);
                        // 跳转
                        this.$router.push({ name : 'Index'});
                    });
                });
            },

            /**
             * 用户点击了enter,确定提交
             */
            registerSubmit(ev) {
                if(ev.keyCode !=13){
                    return
                }
                console.log("111");
                this.register();
            },

            /**
             * 用户点击了enter, 确定提交验证码
             */
            captchaSubmit(ev) {
                if(ev.keyCode !=13){
                    return
                }

                this.captchaConfirm();
            },

            /** 弹窗开关
             *  type : 01 弹窗消失    02开启弹窗
             */
            dialogToggle(type) {
                if(type == '01') {
                    if( this.captcha.dialogVisible == true) {
                        this.captcha.dialogVisible = false;
                        this.captcha.answer = "";
                    }
                    return;
                }

                //需要先确定邮箱填过了，才能在验证码验证通过后，发送邮件到邮箱
                Promise.all([this.$validator.validate('username'), this.$validator.validate('email')])
                    .then( result => {

                        // 用户验证不通过
                       if(!result[0]) {
                           return;
                       }
                       // 邮箱验证不通过
                       if (!result[1]) {
                           return;
                       }

                        //获取验证码
                        this.getCaptcha();
                        this.captcha.dialogVisible = true;
                    });
            },

            /** 去除验证码错误的提示*/
            cleanHint() {
                if(this.captcha.captchaResult) {
                    this.captcha.captchaResult = false;
                    this.captcha.answer = "";
                }
            },

            /** 验证码有效期计时器*/
            captchaTimer() {
                this.captcha.time = 60;
                let timer = setInterval(()=>{
                    if(this.captcha.time == 0) {
                        this.captcha.showTimer = true;
                        this.captcha.eMailCaptcha = true;
                        clearInterval(timer);
                    }
                    this.captcha.time-- ;
                }, 1000);
            },

            /** 用户提示
             *  type: 提示的类型: 01 错误， 02 成功
             *  msg： 提示的内容
             */
            showMessage(type, msg) {
                // 错误提示
                if (type == '01') {
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: 'warning',
                    });
                    return;
                }

                if(this.captcha.eMailCaptcha) {
                    // 邮箱验证码设值为未过期
                    this.captcha.eMailCaptcha = false;
                }
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success',
                    duration: 3000,
                });
            },

            ...mapMutations([
                'userInfoOperate'
            ]),
        },
        mounted() {
            Storage.clear();
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/common";

    /**页面样式*/
    .register {
        background: url("../../assets/img/register/register-bg.png") no-repeat fixed;
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
                    overflow: hidden;
                }

                // 提示验证码错误的动画
                .slide-fade-enter-active {
                    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
                }
                .slide-fade-leave-active {
                    transition: all .8s cubic-bezier(1.0, 0.8, 0.5, 1.0);
                }
                .slide-fade-enter, .slide-fade-leave-to {
                    transform: translateY(-10px);
                    opacity: 0;
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