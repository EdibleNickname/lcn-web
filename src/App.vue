<template>
    <div id="content-wrapper">
        <transition name="slide-fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style lang="scss">
    @import "assets/css/base.scss";
    @import "assets/css/element-ui";
    @import "assets/css/croppa";

    html{
        // 防止动画时出现滚动条
       /* overflow-x: hidden ;*/
        #content-wrapper {
            // 准备进入和准备离开时的样式
            .slide-fade-enter, .slide-fade-leave-to {
                opacity: 0;
            }
            // 进入中的样式变化
            .slide-fade-enter-active {
                transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
            }
            ///离开时的样式变化
            .slide-fade-leave-active {
                transition: all 0.1s cubic-bezier(1.0, 0.8, 0.5, 1.0);
            }
        }
    }


</style>
