<template>
  <div class="qr-block">
    <div
      class="shadow-sm e rounded mb-3"
      :class="[
        isRingGroup ? 'in-ringgroup' : 'not-ringgroup'
      ]"
    >
      <div class="row pt-3 justify-content-center">
        <div class="col-auto text-white pr-0"><small>Hub No: </small></div>
        <div class="col-auto text-white pl-0">{{ extension.number }}</div>
      </div>
      <div class="row justify-content-center well pt-1">
        <div class="col-auto p-3 rounded bg-white d-flex justify-content-center flex-column">
          <div :class="`qrb${ind}`" class="qrb"></div>
          <span class="align-self-center">Login QR code</span>
        </div>
      </div>
      <div class="row justify-content-center pt-1">
        <h1 class="text-white ext-num">{{ extensionNumber }}</h1>
      </div>

      <div class="row justify-content-center ">
        <div class="col-10 text-white d-flex justify-content-between">
          <span class="text-truncate text align-self-baseline"><small>Username:</small> {{ extension.username }}</span>
          <button
            type="button"
            class="btn btn-outline-light btn-sm align-self-baseline"
            ref="uname"
            @click="doCopy('uname', extension.username)"
          >
            Copy
          </button>
        </div>
        <div class="col-10  text-white d-flex justify-content-between py-1">
          <span class="text-truncate text align-self-baseline"><small>Password:</small> {{ extension.password | passwordify }}</span>
          <b-button
            variant="outline-light"
            class="align-self-baseline"
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
      colorDark: this.ind < 5 ? "#d32030" : "#12a74f",
      width: 350,
      height: 350,
      correctLevel: QRCode.CorrectLevel.H,
      backgroundImage: require("../assets/white.jpg"), // Background Image
      backgroundImageAlpha: 1,
      dotScale: 0.8
    };
    new QRCode(document.getElementsByClassName(`qrb${this.ind}`)[0], options);
    document.querySelector(`.qrb${this.ind}`).removeAttribute('title');
    
  },
  filters:{
    passwordify(string){
      return string.replace(/./g, '•');
    }
  },
  computed: {
    extensionNumber() {
      return this.extension.username.slice(-2);
    }
  },
  methods : {
    doCopy(ref, string) {
      this.$copyText(string).then(
        () => {
          this.refreshText();
          this.$refs[ref].innerText = "Copied";
        },
        () => {
          this.$refs[ref].innerText = "Copy";
        }
      );
    },
    refreshText() {
      let buttons = document.querySelectorAll("button");
      buttons.forEach(element => {
        element.innerText = "Copy";
      });
    }
  }
};
</script>

<style>

.qrb img{
  width: 100%;
  height: 100%;
}
.qrb{
  height: 130px;
  width: 130px;
}
.bg-white span {
  font-size: .75rem;
}
.in-ringgroup {
  background-color: #d32030;
}
.not-ringgroup {
  background-color: #12a74f;
}
.e {
  height: 380px;
  width: 220px;
}
.ext-num{
  font-weight: bold;
}
.text{
  font-size: .95rem;
}
</style>
