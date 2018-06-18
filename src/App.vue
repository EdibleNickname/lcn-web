<template>
    <div id="content-wrapper">
        <router-view />
    </div>
</template>

<script>
    import Lodash from 'lodash';
    export default {
        name: "App",
        data() {
            return {
                designResolution : [ 6.4, 9.8, 14],
                rootHTML : document.getElementsByTagName('html')[0],
            }
        },
        mounted() {
            /** 动态设置html的font-size的值
             *  此处假设设计图的分辨率: 640px, 980px 和 1400px
             *  低于 980的， 以640进行设计
             *  980-1400 之间 以980的设计图进行开发，
             *  超过 1400的以 1400的设计图进行开发,
             *  (实际计算时，需要除以100)
             */
            let that = this;
            /** 窗口第一次加载的时候 */
            window.onload = () => {
                return (()=>{
                    that.resizeHtmlFontSize(that);
                })();
            };
            /** 窗口改变的时候  _.debounce 是一个通过 lodash 限制操作频率的函数。*/
            window.onresize = _.debounce(()=>{
                that.resizeHtmlFontSize(that);
            }, 400);

        },
        methods: {
            resizeHtmlFontSize(obj) {
                let deviceWidth = document.documentElement.clientWidth;
                let nowDesignResolution = 0;
                if ( deviceWidth < 980) {
                    nowDesignResolution = obj.designResolution[0];
                } else if (deviceWidth >= 980 && deviceWidth <= 1400) {
                    nowDesignResolution = obj.designResolution[1];
                } else {
                    nowDesignResolution = obj.designResolution[2];
                }
                obj.rootHTML.style.fontSize = deviceWidth/nowDesignResolution + 'px';
                console.log(deviceWidth/nowDesignResolution + 'px');
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/css/base.scss";
</style>
