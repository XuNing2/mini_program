<template>
    <div>
        <video
            id="myVideo"
            class="video-js"
            height="500px"
            autoplay="true"
            controls="true"
        >
            <!-- autoplay ="true" -->
            <source :src="videoSrc" type="video/mp4" />
        </video>
        <p class="note-txt">录制教程非常重要，请务必认真观看!</p>
        <div class="to-center" v-if="!showBegin">
            <el-button
                class="bt-begin"
                type="danger"
                disabled
                round
                size="medium"
                >{{ second }}秒后可跳过</el-button
            >
        </div>
        <div class="to-center" v-else>
            <el-button
                @click="beginRecord"
                class="bt-begin"
                type="primary"
                icon="el-icon-video-camera"
                round
                >开始录制视频</el-button
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoSrc:
                "https://6876-hvc-cloud-9ge10myz6e6ceea2-1304550954.tcb.qcloud.la/tutorial_video_small.mp4?sign=e3cfe3686e0a14893b422a167142dce8&t=1620975471",
            showBegin: false,
            second: 5,
        };
    },
    methods: {
        countdown() {
            this.second--;
            if (this.second <= 0) {
                this.showBegin = true;
            }
        },
        beginRecord() {
            this.$router.push({ path: "/record" });
        },
    },
    mounted() {
        this.timer = setInterval(this.countdown, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style>
/* .video-js{
  width: 100%;
  height: 170vw;
} */

.el-button--goon {
    color: #fff;
    background-color: #20b2aa;
    border-color: #20b2aa;
}
.to-center {
    display: flex;
    flex-direction: column;
    align-items: center !important;
}
.note-txt {
    color: red;
    font-weight: bold;
    font-size: 35rpx;
    margin-bottom: 10rpx;
    text-align: center;
}
.bt-begin {
    letter-spacing: 5px;
    margin-bottom: 20px;
}
</style>
