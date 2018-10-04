<template>
    <div class="body-top">

        <div class="left">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide>
                    <div style="background: purple; height: 100%">
                        <font style="color: red; font-size: 0.5rem">1</font>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div style="background: yellowgreen; height: 100%">
                        <font style="color: red; font-size: 0.5rem">2</font>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div style="background: pink; height: 100%">
                        <font style="color: red; font-size: 0.5rem">3</font>
                    </div>
                </swiper-slide>
                <!--向前向后按钮-->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>

                <!--分页-->
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>

        <div class="right">
            <ulr>
                <li>现在完成的功能有：</li>
                <li>1.注册</li>
                <li>2.注册完后，进行个人信息的完善</li>
            </ulr>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        name: "IndexBodyTop",
        data() {
            return{
                swiperOption: {
                    initialSlide: 0,
                    effect: 'slide',
                    autoplay: true,
                    delay: 2000,
                    loop: true,
                    // 向前向后按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    //分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        }
    }
</script>

<style scoped lang="scss">
    .body-top {
        height: 1rem;
        display: flex;
        justify-content: center;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        .left {
            // 宽 ：高 = 3 ： 1
            width: 65%;
            background: #409EFF;
            height: 100%;
            margin-right: 5%;
            border-radius: 0.04rem;
            overflow: hidden;
            .swiper-container {
                height: 1rem;
            }
            .swiper-button-next, .swiper-button-prev {
                height: 0.1rem;
                opacity: 0.4;
                &:hover {
                    opacity: 1;
                }
            }
        }
        .right {
            width: 30%;
            background: gold;
            height: 100%
        }
    }
</style>