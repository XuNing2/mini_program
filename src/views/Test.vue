<template>
    <div>
        <div v-if="true">
            <el-upload
                accept="video/*"
                class="upload-demo"
                :action="url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
                <el-button size="normal" type="primary">点击上传</el-button>
                <div v-if="hand == 0" slot="tip" class="el-upload__tip">
                    请上传左手的视频
                </div>
                <div v-if="hand == 1" slot="tip" class="el-upload__tip">
                    请上传右手的视频
                </div>
            </el-upload>

            <el-upload
                v-if="false"
                accept="video/*"
                class="upload-demo"
                :action="uploadUrl.right"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传右手的视频</div>
                <!-- <button @click="handleUpload">test</button> -->
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileUrl: "",

            fileList: [],
        };
    },
    computed: {
        hand() {
            return this.$route.query.handId;
        },
        url() {
            return this.hand == 0
                ? "api/d-video/" + this.$store.state.gId + "/upload/left"
                : "api/d-video/" + this.$store.state.gId + "/upload/right";
        },
        uploadUrl() {
            return {
                left:
                    "https://z-hand.site/d-video/" +
                    this.$store.state.gId +
                    "/upload/left",
                // left: "/d-video/6160/upload/left",
                right:
                    "https://z-hand.site/d-video/" +
                    this.$store.state.gId +
                    "/upload/right",
            };
        },
    },
    methods: {
        beforeUpload(file) {
            const self = this;
            const isSize = new Promise(function (resolve, reject) {
                let _URL = window.URL || window.webkitURL;
                let url = URL.createObjectURL(file);
                let videoElement = document.createElement("video");
                // // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。 元数据包括：时长、尺寸（仅视频）以及文本轨道。
                videoElement.addEventListener(
                    "loadedmetadata",
                    function (_event) {
                        let width = videoElement.videoWidth;
                        let height = videoElement.videoHeight;
                        console.log(Math.ceil(file.size / 1024 / 1024));
                        var valid = true;
                        if (Math.ceil(file.size / 1024 / 1024) <= 10) {
                            valid = true;
                        } else {
                            valid = false;
                            self.$message.error(
                                "错误提示：请上传小于10Mb的视频"
                            );
                            self.handleRemove(file);

                            return;
                        }
                        if (
                            // videoElement.duration > 14 ||
                            videoElement.duration < 10.5
                        ) {
                            valid = false;
                            self.$message.error("视频时长低于10秒，请重新录制");
                        }
                        valid ? resolve() : reject();
                    }
                );
                videoElement.src = _URL.createObjectURL(file);
            }).then(
                () => {
                    return file;
                },
                () => {
                    return Promise.reject();
                }
            );
            return isSize;
        },
        upload(param) {
            console.log(param);
            // let config = {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // };
            this.$axios.post(this.url, { file: param.file }).then((res) => {});
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        // 上传成功后
        onSuccess(response, file, fileList) {
            this.$store.commit("setTrue", this.$route.query.handId);
            console.log(response);
            this.$router.push({
                id: this.$store.state.gId,
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
