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
                            <span class="font">男</span>
                        </el-radio>
                        <el-radio :label="1">
                            <span class="font">女</span>
                        </el-radio>
                        <el-radio :label="2">
                            <span class="font">保密</span>
                        </el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>

        <!--头像-->
        <div class="headerPortrait">
            <p class="title">来，选一个头像吧</p>

            <div class="horizontalLine"></div>

            <div class="image">

                <div class="area">
                    <div class="container">
                        <croppa
                            v-model="croppa"
                            :canvas-color="croppaStyle.canvasColor"
                            :width="croppaStyle.width"
                            :height="croppaStyle.height"
                            :prevent-white-space="croppaStyle.preventWhiteSpace"
                            :zoom-speed="croppaStyle.zoomSpeed"
                            :quality="croppaStyle.quality"
                            :placeholder="croppaStyle.placeholder"
                            @new-image-drawn="updatePreviewImage"
                            @image-remove="removeImage"/>
                    </div>
                </div>

                <div class="clapboard"></div>

                <div class="area">
                    <div class="container">
                        <img :src="headerPortrait"/>
                        <p>当前头像</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="btn">
            <el-button type="primary" @click="save">
                <div class="save">保存</div>
            </el-button>
        </div>

    </div>
</template>

<script>

    import OssImgUrl from '@/assets/js/alibaba-oss/oss-img.js';

    export default {
        name: "personalInfo",
        props: {
            userProfile: {
                type: Object,
                default: ()=> {
                    return {
                        userName: "",
                        headerPortrait: "",
                        birthday: "",
                        sex: "",
                        selfIntroduction: "",
                    }
                }
            },
            defaultUrl : {
                type: String,
                default: OssImgUrl.index.defaultHeaderUrl,
            },
            userNameEditable: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                userInfo: {
                    userName: this.userProfile.userName ? this.userProfile.userName : "",
                    selfIntroduction: this.userProfile.userName ? this.userProfile.selfIntroduction : "",
                    birthday: this.userProfile.birthday ? this.userProfile.birthday : "",
                    sex: this.userProfile.sex ? this.userProfile.sex : 2,
                },
                // 用户的头像
                headerPortrait: this.defaultUrl,
                pickerOptions: {
                    // 时间选择期，无法选择大于当前的时间
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                croppa : {
                },
                // 是否正在生成缩略图中
                generatingFlag: false,
                // cropp的样式
                croppaStyle : {
                    width: 180,
                    height: 180,
                    canvasColor: '#f1f2f5',
                    zoomSpeed: 20,
                    quality: 1,
                    preventWhiteSpace: true,
                    placeholder: "请选择您的头像"
                },
            }
        },
        watch: {
            // 实时观察croppa.imagData的变化
            'croppa.imgData': {
                handler(){
                    if(!this.generatingFlag){
                        this.updatePreviewImage();
                    }
                },
                deep: true
            }
        },
        methods: {
            save() {
                this.croppa.generateBlob( blob => {

                    if(!blob) {
                        this.$emit("save", this.userInfo, false);
                        return;
                    }

                    this.$emit("save", this.userInfo, true, blob);
                    return;
                }, "image/jpg");
            },
            // 实时更新预览
            updatePreviewImage() {
                this.generatingFlag = true;
                this.croppa.generateBlob( blob => {
                    if(blob){
                        let url = URL.createObjectURL(blob);
                        this.headerPortrait = url;
                        this.generatingFlag = false;
                    }
                });
            },
            // 删除了头像
            removeImage() {
                this.headerPortrait = this.defaultUrl;
            }
        }
    }
</script>

<style scoped lang="scss">

    .personalInfo {
        padding-top: 0.1rem;

        .input-wrapper {
            margin-bottom: 0.1rem;
            display: block;
            p {
                font-size: 0.08rem;
                text-align: right;
                padding-right: 0.1rem;
                margin-top: 0.02rem;
                text-shadow: 1px 1px black;
            }
            span {
                font-size: 0.07rem;
                line-height: 0.07rem;
                color: white;
                text-shadow: 1px 1px black;
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
            .horizontalLine {
                background: #c0c0c0;
                height: 2px;
                margin: 0.04rem 0.08rem;
            }
            .image {
                padding-top: 0.02rem;
                display: flex;
                justify-content: center;
                position: relative;

                .area {
                    width: 40%;
                    min-width: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &:last-child .container {
                        margin: 10% auto;
                    }

                    @media screen and (max-width: 1100px) {
                        &:last-child .container {
                            margin: 15% auto;
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        &:last-child .container {
                            margin: 20% auto;
                        }
                    }

                    .container {
                        height: 100%;
                        padding-right: 0.2rem;
                        img {
                            width: 0.4rem;
                            height: 0.4rem;
                            border: 0.008rem solid gray;
                            border-radius: 50%;
                        }
                        p {
                            text-align: center;
                            margin-top: 0.04rem;
                            font-size: 0.07rem;
                        }
                    }
                }

                .clapboard {
                    background: #e5e9ef;
                    width: 2px;
                    margin: 0.04rem 0 0.2rem 0;
                }
            }
        }

        .btn {
            display: flex;
            justify-content: center;
            margin-bottom: 0.1rem;
            .save {
                padding: 0 0.1rem;
            }
        }
    }
</style>