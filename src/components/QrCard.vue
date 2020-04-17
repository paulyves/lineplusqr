<template>
  <div
    class="qr-card"
    :class="[extensionNum < getNumOfRg ? 'ringgroup' : 'not-ringgroup']"
  >
    <div class="container-fluid position-rel">
      <div class="row justify-content-center">
        <div class="align-self-center pt-4 pb-2 text-white">
          <small class="font-weight-bold">Wavephone No: </small>
          <span class="hub-no">{{ hubNum }}</span>
        </div>
      </div>
      <div class="row justify-content-center ">
        <div class="qr-bg d-flex flex-column">
          <div :class="`qcode${extensionNum}`" class="qrc"></div>
          <div
            class="loading-container justify-content-center align-items-center d-none"
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <small class="align-self-center">Login QR code</small>
        </div>
      </div>
      <img src="@/assets/no_incoming_call.png" class="no-incoming-call" :class="{'d-none':extensionNum < getNumOfRg}" alt="No incoming call">
      <div class="row justify-content-center">
        <span class="extension-text mt-2">{{ extensionNumber }}</span>
      </div>
      <div class="row justify-content-center">
        <span class="extension-label mb-2">Extension Number</span>
      </div>
      <div class="row">
        <div class="reg-col">
          <div class="container-fluid">
            <div class="row">
              <div class="col-auto mt-3">
                <h5 class="text-white font-weight-bold mb-0 text-truncate" style="width:265px">
                  Device: {{ device }}
                </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-auto">
                <small class="text-white">Registration Date: {{regDate}} </small>
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
  props: ["extensionNum", "hubNum", "qrCode", "username","device","regDate"],
  methods: {
    createQr() {
      let options = {
        text: this.qrCode,
        logo: require("@/assets/wavephone.png"),
        colorDark: this.extensionNum < this.getNumOfRg ? "#d32030" : "#12a74f",
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
  width: 180px;
  height: 160px;
}
.qrc {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.qr-card {
  height: 459px;
  width: 297px;
  border-radius: 15px;
}
.ringgroup {
  background-color: #d32030;
  /* background-color: #1946b9; */
}
.not-ringgroup {
  background-color: #0c9347;
}
.qr-bg {
  height: 205px;
  width: 200px;
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
  border-radius: 0 0 8px 8px;
}
.loading-container {
  height: 180px;
  width: 200px;
}
.no-incoming-call{
  right: 0;
  top: 215px;
  position: absolute;
  height: 150px;
  width: 150px;
}
.position-rel{
  position: relative;
}
</style>
