<template>
    <div>
        <el-main
            ><video
                id="myVideo"
                class="video-js vjs-default-skin"
                playsinline
            ></video>
            <div class="note-txt">请录制10-12秒的手部抓握视频</div>
            <el-button type="primary" size="default" @click="upload" round
                >上传视频</el-button
            ><Directupload></Directupload
        ></el-main>
        <Test1></Test1>
    </div>
</template>

<script>
/* eslint-disable */
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";

import "webrtc-adapter";
import RecordRTC from "recordrtc";

import Record from "videojs-record/dist/videojs.record.js";
import Test1 from "./Test1.vue";

export default {
    data() {
        return {
            player: "",
            options: {
                maxLength: false,
                controls: true,
                autoplay: false,
                fluid: false,
                // fill: true,
                loop: false,
                width: 640,
                height: 480,
                bigPlayButton: false,
                controlBar: {
                    volumePanel: false,
                },
                plugins: {
                    // configure videojs-record plugin
                    record: {
                        audio: false,
                        video: true,
                        debug: true,
                    },
                },
            },
        };
    },
    computed: {
        hand() {
            return this.$store.state.gHand;
        },
        url() {
            return this.hand == 0
                ? "/d-video/" + this.$store.state.gId + "/upload/left"
                : "/d-video/" + this.$store.state.gId + "/upload/right";
        },
    },
    components: {
        Test1,
    },
    mounted() {
        /* eslint-disable no-console */
        this.player = videojs("#myVideo", this.options, () => {
            // print version information at startup
            var msg =
                "Using video.js " +
                videojs.VERSION +
                " with videojs-record " +
                videojs.getPluginVersion("record") +
                " and recordrtc " +
                RecordRTC.version;
            videojs.log(msg);
        });

        // device is ready
        this.player.on("deviceReady", () => {
            console.log("device is ready!");
        });

        // user clicked the record button and started recording
        this.player.on("startRecord", () => {
            console.log("started recording!");
        });

        // user completed recording and stream is available
        this.player.on("finishRecord", () => {
            // the blob object contains the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log("finished recording: ", this.player.recordedData);
        });

        // error handling
        this.player.on("error", (element, error) => {
            console.warn(error);
        });

        this.player.on("deviceError", () => {
            console.error("device error:", this.player.deviceErrorCode);
            this.$alert("找不到摄像头！", "", {
                confirmButtonText: "确定",
                callback: (action) => {},
            });
        });
    },
    methods: {
        upload() {
            let formData = new FormData();
            formData.append("file", this.player.recordedData);
            this.$axios
                .post(this.url, formData)
                .then((res) => {})
                .catch((res) => {
                    console.log("error upload!!!!");
                });
            this.$store.commit("setTrue", this.hand);

            this.$router.push({ path: "/record" });
        },
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>
<style scoped>
.el-main {
    text-align: center;
    line-height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#myVideo {
    /* text-align: center; */
    /* margin-left: 40%; */
}
.note-txt {
    color: red;
    font-weight: bold;
    font-size: 35rpx;
    margin-bottom: 10rpx;
    text-align: center;
}
</style>
