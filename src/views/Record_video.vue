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
    <el-row>
      <el-button
        type="warning"
        icon="el-icon-video-camera"
        round
        class="btn-txt"
        @click="onRecord"
      >
        重新录制
      </el-button>
      <el-button
        @click="onSuccess"
        type="success"
        icon="el-icon-success"
        round
        class="btn-txt"
        :loading="showLoading"
        :disabled="disableBtn"
      >
        录制完成
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoading: false,
      disableBtn: false,
      videoSrc: "",
    };
  },
  methods: {
    onRecord() {
      this.$router.push({
        path: "/record_camera",
        query: {
          handId: this.$route.query.handId,
        },
      });
    },
    onSuccess() {
      this.showLoading = true;
      this.disableBtn = true;

      this.uploadFile();

      setTimeout(() => {
        this.$router.push({
          path: "/record",
        });
      }, 3000);

      this.$store.commit('setTrue', this.$route.query.handId)
    },
    uploadFile() {
      console.log("上传文件");
      // this.$alert('假装已上传视频')
      this.$alert('假装已上传视频', '模拟', {
        confirmButtonText: '确认',
        callback: action => {
          
        }
      });
    },
  },
};
</script>

<style>
.btn-txt {
  /* font-size: 35px; */
  color: white;
  font-weight: bold;
}
</style>
