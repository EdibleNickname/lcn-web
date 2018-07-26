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
    import PersonalInfo from '@/components/PersonalInfo';
    export default {
        name: "CompleteInfo",
        data() {
            return {
                defaultHeaderPortraitUrl: "https://s1.ax1x.com/2018/07/17/Pl4n81.png",
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

                // 基础信息更新url
                let baseDataUrl = "/info/uploadBaseData";

                // 头像上传url
                let headerPortraitUrl ="/info/uploadHeaderPortrait";

                let putData = {
                    userName: baseData.userName,
                    birthday: baseData.birthday,
                    introduce: baseData.selfIntroduction,
                    sex: baseData.sex,
                    isModify: isUploadImg ? 1 : 0,
                };
                if(!isUploadImg) {
                  //  没有上传图片
                    this.$put(baseDataUrl, putData).then(resp => {
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
                        console.log("更新成功");
                        this.$router.push({ name : 'Index'});

                    });
                    return;
                }
                // 上传了图片
                this.$put(baseDataUrl, putData).then(
                    resp => {
                        if(resp.isSuccess != "1") {
                            // 提示
                            this.$message({
                                showClose: true,
                                message: "更新用户信息失败",
                                type: 'warning',
                            });
                            return;
                        }

                        let fd = new FormData();

                        fd.append("file", blob, baseData.userName+".jpg");
                        fd.append("redisKey", resp.redisKey);
                        this.$upload(headerPortraitUrl, fd).then(
                            resp => {
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
                            }
                        );

                });
                return;
            },

            // 给用户的头像url添加一个当前的时间戳，防止缓存
            urlAddTimestamp(url) {
                let timestamp = (new Date()).valueOf();
                let newUrl = url + "?timestamp" + timestamp;
                return newUrl;
            },
            ...mapMutations([
                'updateUserInfo'
            ]),
        },
    }
</script>

<style scoped lang="scss">
    .completeInfo{
        background: url("../../../assets/img/register/register-bg.png") no-repeat fixed;
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