<template>
    <div class="header" :style="headerStyle">

        <!--导航栏-->
        <div class="navigator-bar-bg">
            <div class="navigator-bar screen-width">
                <ul class="left-menu clear">

                </ul>

                <div class="right-menu clear">
                    <div class="header-portrait" @mouseover="showBlank" @mouseout="hideBlank">
                        <img :src="headerPortrait" />
                    </div>

                    <transition name="fade">
                        <div class="no-login-plank" v-show="blankShow" @mouseover="clearHeaderTimer" @mouseout="hideBlank">
                            <p>登录后你可以:</p>
                            <div class="img">
                                <img :src="unLoginPlankStart" />
                                <img :src="unLoginPlankStart" />
                            </div>
                            <el-button class="login-btn" type="primary">登录</el-button>
                            <p class="reg">首次使用？<router-link tag="span" to="/register">点我去注册</router-link></p>
                        </div>
                    </transition>


                    <p class="createdBtn" @click="create">创作</p>
                </div>
            </div>
        </div>

        <!--搜索区-->
        <div class="search-bar">

        </div>

    </div>
</template>

<script>

    import { mapGetters } from 'vuex';
    import OssImgUrl from '@/assets/js/alibaba-oss/oss-img.js';

    export default {
        name: "Header",
        data(){
           return {
               // 头部背景样式
               headerStyle: {
                   background: "url('" + OssImgUrl.index.headerBgUrl + "')",
                   backgroundSize: "cover",
                   backgroundPosition: "100% 100%"
               },
               //面板展示
               blankShow: false,
               // 头像的定时器
               headerTimer: null,
               unLoginPlankStart : OssImgUrl.index.defaultHeaderUrl,
           }
        },
        computed: {
            ...mapGetters([
                'getUserInfo'
            ]),
            /** 头像*/
            headerPortrait() {
                // 未登录是头像区显示的图标
                let unLoginHeaderUrl = OssImgUrl.index.unLoginHeaderUrl;

                if(this.getUserInfo == null) {
                    return unLoginHeaderUrl;
                }
                // 未设置头像的默认图标
                let defaultHeaderUrl = OssImgUrl.index.defaultHeaderUrl;
                if(this.getUserInfo.headerUrl == null){
                    return defaultHeaderUrl;
                }
                // 返回头像
                return this.getUserInfo.headerUrl;
            },
            /** 是否登录*/
            isLogin() {
                if(this.getUserInfo == null) {
                    return false;
                }

                if(this.getUserInfo.userName == null) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            // 创作
            create() {
                console.log("创作");
            },
            // 面板显示
            showBlank() {
               if(!this.blankShow && !this.headerTimer) {
                   this.blankShow = true;
                   return;
               }
               // 处理用户将鼠标从 面板重新移到了头像，移出面板，移入头像
               if(this.blankShow && this.headerTimer) {
                   this.blankShow = true;
                   clearTimeout(this.headerTimer);
                   this.headerTimer = null;
                   return
               }
            },
            // 面板消失
            hideBlank() {
                this.headerTimer = setTimeout(() => {
                    this.blankShow = false;
                    clearTimeout(this.headerTimer);
                    this.headerTimer = null;
                }, 500);
                return ;
            },
            // 取消面板消失的事件
            clearHeaderTimer() {
                if(this.headerTimer) {
                    this.blankShow = true;
                    clearTimeout(this.headerTimer);
                    this.headerTimer = null;
                }
            },
            test() {
                console.log(1234);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/oss-img";

    .header {
        height: 0.68rem;

        .fade-enter-active, .fade-leave-active {
            transition: opacity .8s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .navigator-bar-bg {
            height: 0.168rem;
            position: relative;
            &:after {
                content: "";
                background: rgba(255, 255, 255, 0.5);
                filter: blur(3px);
                position: absolute;
                z-index: 2;
                height: 0.168rem;
                width: 100vw;
            }

            .navigator-bar {
                height: 100%;
                position: absolute;
                z-index: 3;
                left: 50%;
                // 此处的百分比为自身的
                transform: translate(-50%, 0);
                display: flex;

                .left-menu {
                    height: 100%;
                    width: auto;
                    width: 100%;
                }

                .right-menu {
                    height: 100%;
                    width: auto;
                    display: flex;
                    align-items: center;
                    .header-portrait {
                        width: 0.144rem;
                        height: 0.144rem;
                        border-radius: 50%;
                        background: white;
                        margin-right: 0.072rem;
                        overflow: hidden;
                        &:hover {
                            cursor: pointer;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .createdBtn {
                        height: 0.192rem;
                        background: #409EFF;
                        line-height: 0.192rem;
                        font-size: 0.056rem;
                        color: white;
                        text-align: center;
                        //内容不换行
                        white-space: nowrap;
                        letter-spacing: 0.02rem;
                        border-radius: 0 0 6px 6px;
                        padding-left: 0.03rem;
                        padding-right: 0.01rem;
                        &:hover {
                            cursor: pointer;
                            background: #5fadfef2;
                        }
                    }
                }

                .no-login-plank {
                    background: white;
                    z-index: 10;
                    position: absolute;
                    top: 0.168rem;
                    width: 1.28rem;
                    transform: translate(-50%);
                    border-radius: 0 0 5px 5px;
                    padding: 0.048rem;
                    p {
                        font-size: 0.048rem;
                        color: #6d757a;
                    }
                    .img{
                        height: 0.8rem;
                        @include no-login-plank-img-bg;
                        margin: 0.048rem 0;
                        border-radius: 0.01rem;
                        img:first-child {
                            height: 0.2rem;
                            animation: logo-rotate-one 60s linear  0.2s infinite;
                        }
                        img:nth-child(2) {
                            height: 0.3rem;
                            animation: logo-rotate-two 60s linear  0.2s infinite;
                        }
                    }
                    .login-btn {
                        width: 100%;
                    }
                    .reg {
                        color: #282828;
                        text-align: center;
                        margin-top: 0.032rem;
                        span {
                            color: #00a1d6;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }

        @keyframes logo-rotate-one {
            0% 	    { transform: translate( 50%, 50%) scale(1) rotate(0deg); opacity: 1;}
            50% 	{ transform: translate( 50%, 50%) scale(1.2) rotate(180deg); opacity: 0.8;}
            100% 	{ transform: translate( 50%, 50%) scale(1) rotate(360deg); opacity: 1;}
        }

        @keyframes logo-rotate-two {
            0% 	    { transform: translate(0.6rem, 0.3rem) scale(1) rotate(-30deg); opacity: 1;}
            50% 	{ transform: translate(0.6rem, 0.3rem) scale(1.2) rotate(-210deg); opacity: 0.8;}
            100% 	{ transform: translate(0.6rem, 0.3rem) scale(1) rotate(-390deg); opacity: 1;}
        }
    }
</style>