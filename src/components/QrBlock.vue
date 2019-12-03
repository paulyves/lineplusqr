<template>
  <div class="mobile-block">
    <div
      class="shadow-sm e rounded"
      :class="[
        isRingGroup ? 'in-ringgroup' : 'not-ringgroup',
        ind > 3 ? 'mt-4' : ''
      ]"
    >
      <div class="row pt-5 justify-content-center">
        <div class="col-auto text-white">Hub No: {{ extension.number }}</div>
      </div>
      <div class="row justify-content-center well pt-2">
        <div class="col-8 p-3 rounded bg-white">
          <div :class="`qr${ind}`" class="qr"></div>
          <small>Login QR code</small>
        </div>
      </div>
      <div class="row justify-content-center pt-2">
        <h1 class="text-white">{{ ind }}</h1>
      </div>

      <div class="row justify-content-center pt-2">
        <div class="col-10 text-white d-flex justify-content-between">
          <span class="text-truncate">Username: {{ extension.username }}</span>
          <button
            type="button"
            class="btn btn-outline-light btn-sm"
            ref="uname"
            @click="doCopy('uname', extension.username)"
          >
            Copy
          </button>
        </div>
        <div class="col-10  text-white d-flex justify-content-between py-2">
          <span class="text-truncate">Password: {{ extension.password }}</span>
          <b-button
            variant="outline-light"
            size="sm"
            ref="pw"
            @click="doCopy('pw', extension.password)"
            >Copy</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const QRCode = require("easyqrcodejs");
export default {
  name: "mobile-block",
  props: ["extension", "ind", "isRingGroup"],
  mounted() {
    let options = {
      text: this.extension.qr,
      logo: require("@/assets/pldt.png"),
      // colorDark: this.selected == "PLDT" ? "#d32030" : "#0047ba",
      colorDark: this.ind < 4 ? "#d32030" : "#12a74f",
      width: 350,
      height: 350,
      correctLevel: QRCode.CorrectLevel.H,
      backgroundImage: require("../assets/white.jpg"), // Background Image
      backgroundImageAlpha: 1,
      dotScale: 0.8
    };
    new QRCode(document.getElementsByClassName(`qrb${this.ind}`)[0], options);
  },
  computed: {
    extensionNumber() {
      return this.extension.username.slice(-2);
    }
  }
};
</script>

<style>
.qrb img {
  width: 90%;
}
.bg-white img {
  width: 100%;
}
.in-ringgroup {
  background-color: #d32030;
}
.not-ringgroup {
  background-color: #12a74f;
}
.e {
  height: 350px;
  width: 250px;
}
</style>
