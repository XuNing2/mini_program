<template>
  <div>
    <!-- <v-easy-camera v-model="picture"></v-easy-camera> -->
    <hr />
    <div class="cd-font" v-if="!isRecording">
      请先调整手掌位置<br />倒计时结束后将开始录制
    </div>
    <!-- <button @click="getCompetence()">打开摄像头</button> -->
    <div class="time" v-if="!isRecording">
      <div class="countdown">{{ time }}</div>
    </div>
    <img
      v-if="!isRecording"
      class="hand-img"
      :src="require('../assets/hand/' + handImg + '.png')"
      alt="hand"
    />

    <div class="vd-font" v-if="isRecording">录制中</div>

    <div v-if="isRecording" class="video-duration">{{ time }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count:1,
      handImg: "",
      isRecording: false,
      picture: "",
      time: 0,
    };
  },
  methods: {
    getCompetence() {},
    countdown() {
      let THIS = this;
      THIS.time--;
    },
  },
  mounted() {
    console.log("mounted");
    const leftHandImg = "left_thin";
    const rightHandImg = "right_thin";
    this.handImg = this.$route.query.handId == 0 ? leftHandImg : rightHandImg;
    let This = this;
    (This.time = 5), (this.timer = setInterval(this.countdown, 1000));
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    time(newVal) {
      if (newVal == 0&&this.count==1) {
        this.count--;
        this.isRecording = true;
        // clearInterval(this.timer);
        this.time = 11;
      }else if(newVal==0){
        clearInterval(this.timer);
        // this.$router.push({
        //   path:'/record',
        //   query:{
        //     checkLeft:true
        //   }
        // })
        this.$router.push({
          path:'/record_video',
          query:{
            handId: this.$route.query.handId
          }
        })
      }
    },
  },
};
</script>

<style>
.notation {
  margin-top: 30rpx;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.time {
  margin-top: 83vh;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin-bottom: 30rpx;
}

.time2 {
  margin-top: 20vh;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin-bottom: 30rpx;
}

.countdown {
  color: #fe2e2e;
  font-size: 10vh;
  text-align: center;
  margin-bottom: 0%;
}

.cd-font {
  color: #fe2e2e;
  font-size: 20px;
  text-align: center;
  letter-spacing: 5px;
  margin-top: 5px;
}

.video-duration {
  color: #33cc33;
  font-size: 40vh;
  text-align: center;
  opacity: 0.7;
}

.vd-font {
  color: #33cc33;
  font-size: 10vh;
  text-align: center;
  letter-spacing: 5px;
  margin-top: 5px;
}

.img-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  position: fixed;
  top: 140rpx;
  right: 0rpx;
  left: 0rpx;
}

.hand-img {
  margin-top: 0%;
  height: 60vh;
  width: 40vh;
  opacity: 0.6;
  margin-bottom: 10vh;
}
</style>
