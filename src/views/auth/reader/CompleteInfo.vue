<template>
    <div class="completeInfo" style="display: flex">
        <div class="container">
            <personal-info
                :userProfile="getUserInfo"
                :userNameEditable="true"
                :defaultUrl="defaultHeaderPortraitUrl"
                @save="save"/>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapMutations } from 'vuex';
    import PersonalInfo from '@/components/common/PersonalInfo';
    import request from '@/api/request/auth/reader/CompleteInfoRequest.js';
    import OssImgUrl from '@/assets/js/alibaba-oss/oss-img.js';

    export default {
        name: "CompleteInfo",
        data() {
            return {
                defaultHeaderPortraitUrl: OssImgUrl.index.defaultHeaderUrl,
            }
        },
        components: {
            personalInfo: PersonalInfo,
        },
        computed: {
            ...mapGetters([
                'getUserInfo'
            ])
        },
        methods: {
            // 保存信息
            save(baseData, isUploadImg, blob) {

                if(!isUploadImg) {
                    //  没有上传图片
                    request.updateUserInfo(baseData.userName, baseData.birthday, baseData.selfIntroduction, baseData.sex, isUploadImg)
                        .then( resp => {
                            if(resp.isSuccess != "1") {
                                // 提示
                                this.$message({
                                    showClose: true,
                                    message: "更新用户信息失败",
                                    type: 'warning',
                                });
                                return;
                            }

                            let info = {
                                userId: resp.userId,
                            };

                            this.updateUserInfo(info);
                            this.$router.push({ name : 'Index'});
                        });
                    return;
                }

                // 上传了图片
                request.updateUserInfo(baseData.userName, baseData.birthday, baseData.selfIntroduction, baseData.sex, isUploadImg)
                    .then( resp => {
                        console.log(resp);
                        if( resp.isSuccess != "1") {
                            // 提示
                            this.$message({
                                showClose: true,
                                message: "更新用户信息失败",
                                type: 'warning',
                            });
                            return;
                        }

                        request.uploadFile(blob, baseData.userName + ".jpg", resp.redisKey)
                            .then( resp => {

                                if(resp.isSuccess != "1") {
                                    // 提示
                                    this.$message({
                                        showClose: true,
                                        message: "更新用户信息失败",
                                        type: 'warning',
                                    });
                                    return;
                                }

                                let info = {
                                    headerUrl: this.urlAddTimestamp(resp.path),
                                    userId: resp.userId,
                                };
                                this.updateUserInfo(info);
                                this.$router.push({ name : 'index'});
                            });
                    });

                return;
            },

            // 给用户的头像url添加一个当前的时间戳，防止缓存
            urlAddTimestamp(url) {
                let timestamp = (new Date()).valueOf();
                let newUrl = url + "?timestamp=" + timestamp;
                return newUrl;
            },
            ...mapMutations([
                'updateUserInfo'
            ]),
        },
    }
</script>

<style scoped lang="scss">

    @import "../../../assets/css/oss-img";

    .completeInfo{
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
            z-index: 1;
        }

        .container {
            position: absolute;
            margin-top: 0.2rem;
            z-index: 2;
            width: 60%;
            left: 20%;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 0.05rem;
            color: white;
        }
    }
</style>