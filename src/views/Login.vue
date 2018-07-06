<template>
    <div class="login">
        <h1>登录</h1>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog :visible.sync="dialogVisible" width="30%" center>
            <span slot="title" class="el-dialog__title">
                <div class="title">
                    <span class="line"></span>
                    <span>请输入验证码</span>
                </div>
            </span>
            <div class="content">
                <img :src="img"/>
                <div v-if="captchaResult">{{captchaHint}}</div>
                <div class="replace">换一张</div>
                <input type="text"  v-model="captcha" placeholder="请输入图片中的内容"/>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                dialogVisible: false,
                img: require("../assets/img/common/loading.gif"),
                captchaResult: true,
                redisKey: "",
                captcha: "",
                captchaHint: "验证码错误",
            }
        },
        method: {
            captchaConfirm() {
                if(this.captcha.length < 5) {
                    this.captchaResult = true;
                    return;
                }
                let url = "/open/captcha/validCaptcha"+this.captcha+"/"+this.redisKey;
                this.$get(url).then(
                    resp => {

                    },
                    err => {

                    }
                );
            }
        },
        mounted() {
            let url = "/open/captcha/generateCaptcha";
            let _this= this;
            this.$get(url).then(
                resp => {
                    _this.img = 'data:image/jpeg;base64,'+resp.result.captchaImg;
                    _this.redisKey = resp.result.redisKey;
                }
            );
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/css/common.scss";

    .login {
        .title {
            display: flex;
            .line {
                width: 0.01rem;
                @include theme-background;
                margin-right: 0.05rem;
            }
        }
        .content {
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
</style>