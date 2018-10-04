<template>
    <div class="index">

        <index-header/>

        <div class="content-body screen-width">

            <index-body-top/>
            <div class="content">
                <index-body-left/>
                <index-body-rigth/>
            </div>

        </div>


        <router-link tag="span" to="/login">登录</router-link>
        <div></div>
        <router-link tag="span" to="/register">注册</router-link>
        <div></div>
        <router-link tag="span" to="/completeInfo">个人信息完善页面(注册成功，才点哦)</router-link>
    </div>
</template>

<script>

    import IndexHeader from '@/components/index/IndexHeader';
    import IndexBodyTop from '@/components/index/IndexBodyTop';
    import IndexBodyLeft from '@/components/index/IndexBodyLeft';
    import IndexBodyRigth from '@/components/index/IndexBodyRight';


    export default {
        name: "index",
        date() {
            return {

            }
        },
        components: {
            IndexHeader: IndexHeader,
            IndexBodyTop: IndexBodyTop,
            IndexBodyLeft: IndexBodyLeft,
            IndexBodyRigth: IndexBodyRigth
        }
    }
</script>

<style scoped lang="scss">
    .index {
        .content-body {
            margin: 0 auto;
            .content {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>