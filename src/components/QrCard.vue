<template>
  <div
    class="qr-card"
    :class="[extensionNum < 6 ? 'ringgroup' : 'not-ringgroup']"
  >
    <div class="row justify-content-center">
      <div class="align-self-center py-4 text-white">
        Hub no: <span class="hub-no">{{hubNum}}</span>
      </div>
    </div>
    <div class="row justify-content-center ">
      <div class="qr-bg d-flex flex-column">
        <div :class="`qcode${extensionNum}`" class="qrc"></div>
        <small class="align-self-center">Login QR code</small>
      </div>
    </div>
    <div class="row justify-content-center">
      <span class="extension-text">{{ extensionNumber }}</span>
    </div>
    <div class="row justify-content-center">
      <span class="extension-label">Extension Number</span>
    </div>
  </div>
</template>

<script>
const QRCode = require("easyqrcodejs");
export default {
  name: "qr-card",
  props: ["extensionNum", "hubNum", "qrCode","username"],
  methods: {
    createQr() {
      let options = {
        text: this.qrCode,
        // text: "asasdasdasasdasdas4d1a54sd5as84d89as4dad",
        logo: require("@/assets/pldt.png"),
        // colorDark: this.selected == "PLDT" ? "#d32030" : "#0047ba",
        colorDark: this.extensionNum < 6 ? "#d32030" : "#12a74f",
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
  mounted(){
    this.createQr();
  },
  updated(){
    document.getElementsByClassName("qrc")[0].innerHTML = "";
    this.createQr();
  },
  computed : {
    extensionNumber(){
      return this.username.slice(-2);
    }
  }
};
</script>

<style>
.qrc > img {
  width: 90%;
  height: 100%;
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
  font-size: 4.5rem;
  margin-top: 45px;
  color: white;
  font-weight: bold;
  line-height: 1;
}
.extension-label {
  font-size: 1rem;
  color: white;
}
.hub-no{
  font-size: 20px;
}
</style>
