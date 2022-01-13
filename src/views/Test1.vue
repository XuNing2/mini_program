<template>
    <div>
        <div v-if="true">
            <el-upload
                accept="video/*"
                class="upload-demo"
                action=""
                :http-request="upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
                <el-button size="normal" type="primary"
                    >手机端请点击上传</el-button
                >
                <div v-if="hand == 0" slot="tip" class="el-upload__tip">
                    请上传左手的视频
                </div>
                <div v-if="hand == 1" slot="tip" class="el-upload__tip">
                    请上传右手的视频
                </div>
            </el-upload>
        </div>
        <!-- <VideoJSRecord v-if="true"></VideoJSRecord> -->
    </div>
</template>

<script>
// import VideoJSRecord from "../components/VideoJSRecord.vue";
export default {
    name: "Test1",
    data() {
        return {
            fileUrl: "",
            fileList: [],
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
        // uploadUrl() {
        //     return {
        //         left:
        //             "https://z-hand.site/d-video/" +
        //             this.$store.state.gId +
        //             "/upload/left",
        //         // left: "/d-video/6160/upload/left",
        //         right:
        //             "https://z-hand.site/d-video/" +
        //             this.$store.state.gId +
        //             "/upload/right",
        //     };
        // },
    },
    components: {},
    methods: {
        beforeUpload(file) {
            console.log(file.type);
            const isJPG = file.type === "video/*";
            const isLt10M = file.size / 1024 / 1024 < 30;

            // if (!isJPG) {
            //     this.$message.error("上传视频只能是 视频 格式!");
            // }
            if (!isLt10M) {
                this.$message.error("上传视频大小不能超过 30MB!");
            }
            return isLt10M;
        },
        upload(params) {
            let formData = new FormData();
            formData.append("file", params.file);
            this.$axios
                .post(this.url, formData)
                .then((res) => {
                    this.onSuccess();
                })
                .catch((res) => {
                    this.$alert("未上传成功，请重新尝试上传！", "提示", {
                        confirmButtonText: "确认",
                        callback: (action) => {},
                    });
                    console.log("error upload!!!!");
                });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name}？`);
        },
        // 上传成功后
        onSuccess(response, file, fileList) {
            this.$store.commit("setTrue", this.hand);
            console.log("onSuccess!!!");
            this.$router.push({
                path: "/record",
            });
        },
    },
};
</script>

<style>
.bold {
    font-weight: bold;
    display: inline-block;
}
</style>
