<template>
    <div class="personalInfo">

        <!-- 用户名 -->
        <div class="input-wrapper">
            <el-row type="flex">
                <el-col :span="5">
                    <p>用户名 :</p>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="userInfo.userName" :disabled="userNameEditable"/>
                </el-col>
            </el-row>
        </div>

        <!--自我介绍-->
        <div class="input-wrapper">
            <el-row type="flex">
                <el-col :span="5">
                    <p>我的签名 :</p>
                </el-col>
                <el-col :span="16">
                    <el-input type="textarea"
                              :rows="2"
                              resize="none"
                              placeholder="来段自我介绍吧(最多50个字哦)"
                              :clearable="true"
                              v-model="userInfo.selfIntroduction"
                              :maxlength="50" />
                </el-col>
            </el-row>
        </div>

        <!--生日-->
        <div class="input-wrapper">
            <el-row type="flex">
                <el-col :span="5">
                    <p>出生日期 :</p>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                        v-model="userInfo.birthday"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="选择日期"/>
                </el-col>
            </el-row>
        </div>

        <!--性别-->
        <div class="input-wrapper">
            <el-row type="flex">
                <el-col :span="5">
                    <p>性别 :</p>
                </el-col>
                <el-col :span="19">
                    <el-radio-group v-model="userInfo.sex">
                        <el-radio :label="0">
                            <span class="sexFont">男</span>
                        </el-radio>
                        <el-radio :label="1">
                            <span class="sexFont">女</span>
                        </el-radio>
                        <el-radio :label="2">
                            <span class="sexFont">保密</span>
                        </el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>

        <!--头像-->
        <div class="headerPortrait">
            <p class="title">来，选一个头像吧</p>

            <div class="image">

                <div class="area">
                    <p>裁剪</p>
                    <div class="container">
                        <croppa
                            v-model="croppa"
                            :canvas-color="croppStyle.canvasColor"
                            :width="croppStyle.width"
                            :height="croppStyle.height"
                            :prevent-white-space="croppStyle.preventWhiteSpace"
                            :zoom-speed="croppStyle.zoomSpeed"
                            :quality="croppStyle.quality"
                            :placeholder="croppStyle.placeholder" />
                    </div>
                </div>

                <div class="clapboard"></div>

                <div class="area">
                    <p>当前头像</p>
                    <div class="container">

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "personalInfo",
        props: {
            defaultUrl : {
                type: String,
                default: "https://s1.ax1x.com/2018/07/17/Pl4n81.png",
            },
            userNameEditable: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                userInfo: {
                    userName: "1234",
                    selfIntroduction: "",
                    birthday: "",
                    sex: 0
                },
                // 用户的头像
                headerPortrait: "",
                pickerOptions: {
                    // 时间选择期，无法选择大于当前的时间
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                croppa : {
                },
                // cropp的样式
                croppStyle : {
                    width: 180,
                    height: 180,
                    canvasColor: '#f1f2f5',
                    zoomSpeed: 20,
                    quality: 1,
                    preventWhiteSpace: true,
                    placeholder: "请选择您的头像"
                },
            }
        }
    }
</script>

<style scoped lang="scss">

    .personalInfo {
        padding-left: 0.8rem;
        border: 1px solid black;
        padding-top: 0.1rem;
        margin-top: 100px;

        .input-wrapper {
            margin-bottom: 0.1rem;
            display: block;
            p {
                font-size: 0.08rem;
                text-align: right;
                padding-right: 0.1rem;
                margin-top: 0.02rem;
            }
            .sexFont {
                font-size: 0.07rem;
                line-height: 0.07rem;
            }
        }

        .input-wrapper:nth-child(3) {
            margin-top: 0.15rem;
        }

        @media screen and (max-width: 1100px) {
            .input-wrapper:nth-child(3) {
                margin-top: 0.23rem;
            }
        }

        @media screen and (max-width: 1024px) {
            .input-wrapper:nth-child(3) {
                margin-top: 0.25rem;
            }
        }

        @media screen and (max-width: 980px) {
            .input-wrapper:nth-child(3) {
                margin-top: 0.27rem;
            }
        }

        .headerPortrait {
            margin-top: 0.2rem;
            .title {
                text-align: right;
                border-right: 3px solid #409EFF;
                font-size: 0.08rem;
                margin-right: 12%;
                padding-right: 0.04rem;
            }
            .image {

            }
        }

    }
</style>