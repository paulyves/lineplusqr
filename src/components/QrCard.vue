<template>
  <div
    class="qr-card"
    :class="[extensionNum < getNumOfRg ? 'ringgroup' : 'not-ringgroup']"
  >
    <div class="container-fluid position-rel">
      <div class="row justify-content-center">
        <div class="align-self-center pt-4 pb-2 text-white">
          Hub no: 
          <span class="hub-no">{{ hubNum }}</span>
        </div>
      </div>
      <div class="row justify-content-center ">
        <div class="qr-bg d-flex flex-column position-rel">
          <div class="lock-container" :class="{'locked': isLocked}" @click="toggleLock" @mouseenter="changeImgOnHover" @mouseleave="retainCurrentImg">
            <img :src="getImgPath()" class="locked-icon">
          </div>
          <div :class="`qcode${extensionNum}`" class="qrc"></div>
          <div
            class="loading-container justify-content-center align-items-center d-none">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <small class="align-self-center">Login QR code</small>
        </div>
      </div>
      <img src="@/assets/no_incoming_call.png" class="no-incoming-call" :class="[{'d-none':extensionNum < getNumOfRg},{'lowered':device.length == 0}]" alt="No incoming call">
      <div class="row justify-content-center">
        <span class="extension-text" :class="[device.length == 0 ? 'mt-4': 'mt-2']">{{ extensionNumber }}</span>
      </div>
      <div class="row justify-content-center">
        <span class="extension-label mb-2">Extension Number</span>
      </div>
      <div class="row " :class="{'d-none' : device.length == 0}">
        <div class="reg-col">
          <div class="container-fluid">
            <div class="row justify-content-center mt-2">
              <div class="col-auto">
                <span class="text-white text-center">LAST REGISTERED ON </span>
              </div>
            </div>
            <div class="row">
              <div class="col-auto ">
                <p class="text-white reg-dev-text text-center font-weight-bold mb-0 text-truncate" style="width:265px">
                  {{ device }}
                </p>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                <p class="text-white text-center"><small >Registration Date: {{regDate}} </small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const QRCode = require("easyqrcodejs");
export default {
  name: "qr-card",
  // props: ["extensionNum", "hubNum", "qrCode", "username","device","regDate"],
  props : {
    extensionNum : Number,
    hubNum : String,
    qrCode : String,
    username : String,
    device : String,
    regDate : String,
    isLocked : {
      type: Boolean,
      default : false
    }
  },
  data(){
    return{
      imgPath : "qr_portal_unlock.svg"
    }
  },
  methods: {
    createQr() {
      let options = {
        text: this.qrCode,
        logo: require("@/assets/wavephone.png"),
        colorDark: this.extensionNum < this.getNumOfRg ? "#1946b9" : "#12a74f",
        width: 350,
        height: 350,
        correctLevel: QRCode.CorrectLevel.H,
        backgroundImage: require("../assets/white.jpg"), // Background Image
        backgroundImageAlpha: 1,
        dotScale: 0.8
      };
      new QRCode(
        document.getElementsByClassName(`qcode${this.extensionNum}`)[0],
        options
      );
      document
        .querySelector(`.qcode${this.extensionNum}`)
        .removeAttribute("title");
    },
    toggleLock(){
      this.$emit('toggleLock',{extensionNum: this.extensionNum, isLocked: !this.isLocked})
    },
    getImgPath(){
      this.imgPath = this.isLocked? "qr_portal_locked.svg": "qr_portal_unlock.svg";
      return  require("@/assets/"+ this.imgPath);
    },
    changeImgOnHover(event){
      let tempImg = this.isLocked? "qr_portal_unlock.svg":"qr_portal_locked.svg";
      event.target.children[0].src = require("@/assets/"+ tempImg);
    },
    retainCurrentImg(event){
      let tempImg = this.isLocked? "qr_portal_locked.svg": "qr_portal_unlock.svg";
      event.target.children[0].src = require("@/assets/"+ tempImg);
    }
  },
  mounted() {
    this.createQr();
  },
  updated() {
    document.getElementsByClassName("qrc")[0].innerHTML = "";
    document.getElementsByClassName("qrc")[0].classList.add("d-none");
    document
      .getElementsByClassName("loading-container")[0]
      .classList.replace("d-none", "d-flex");
    this.createQr();
    setTimeout(() => {
      document.getElementsByClassName("qrc")[0].classList.remove("d-none");
      document
        .getElementsByClassName("loading-container")[0]
        .classList.replace("d-flex", "d-none");
    }, 400);
  },
  computed: {
    extensionNumber() {
      return this.username.slice(-2);
    },
    getNumOfRg(){
      return parseInt(process.env.VUE_APP_NUM_OF_RG)
    }
  }
};
</script>

<style>
.qrc > img {
  width: 170px;
  height: 160px;
}
.qrc {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 10px 10px 5px 10px;
}
.qr-card {
  height: 459px;
  width: 297px;
  border-radius: 15px;
}
.ringgroup {
  /* background-color: #d32030; */
  background-color: #1946b9;
}
.not-ringgroup {
  background-color: #0c9347;
}
.qr-bg {
  height: 205px;
  width: 220px;
  background-color: white;
  border-radius: 8px;
}
.extension-text {
  font-size: 4rem;
  color: white;
  font-weight: bold;
  line-height: 0.9;
}
.extension-label {
  font-size: 1rem;
  color: white;
}
.hub-no {
  font-size: 20px;
}
.reg-col {
  height: 96px;
  width: 297px;
  background: #231f20;
  border-radius: 0 0 15px 15px;
}
.lowered{
  top: 309px !important;
  border-radius: 0 0 15px 0;
}
.loading-container {
  height: 100%;
  width: 100%;
}
.no-incoming-call{
  right: 0;
  top: 215px;
  position: absolute;
  height: 150px;
  width: 150px;
  transition-duration: .3s;
}
.position-rel{
  position: relative;
}
.reg-dev-text{
  font-size: 1.2rem;
}
.lock-container{
  cursor: pointer;
  height: 40px;
  width: 40px;
  position: absolute;
  background: #231f20;
  top: -20px;
  right: -20px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: .3s;
}
.locked:hover{
  opacity: 1;
}
.locked{
  height: 100% !important;
  width:100% !important;
  border-radius: 8px !important;
  top: 0 !important;
  right: 0 !important;
  opacity: 0.9;
}
.locked-icon{
  height: 65%;
  width: 65%;
  transition-duration: .3s;
}

.no-incoming-call:hover{
  opacity: 0;
}
</style>
