<template>
  <div class="mobile-block">
    <div class="row pt-5 justify-content-center">
      <div class="col-auto text-white">
        Hub No: {{ extension.number }}
      </div>
    </div>
    <div class="row justify-content-center well pt-2">
      <div
        class="col-8 p-3 rounded bg-white d-flex justify-content-center flex-column"
      >
        <div class="badge-con" :class="[{'active':isActive},{'d-none':!isReg}]">
          <img src="@/assets/check.png" alt="" srcset="" class="check-img" />
        </div>
        <div :class="`qr${ind}`" class="qr"></div>
        <small class="align-self-center">Login QR code</small>
      </div>
    </div>
    <div class="row justify-content-center pt-2">
      <h1 class="text-white text-bold">{{ extensionNumber }}</h1>
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
          <img
            src="@/assets/copy_white.png"
            alt=""
            srcset=""
            class="align-self-center"
          />
        </button>
      </div>
      <div class="col-10  text-white d-flex justify-content-between py-2">
        <span class="text-truncate"
          >Password: {{ extension.password | passwordify }}</span
        >
        <b-button
          variant="outline-light"
          size="sm"
          ref="pw"
          @click="doCopy('pw', extension.password)"
        >
          <img
            src="@/assets/copy_white.png"
            alt=""
            srcset=""
            class="align-self-center"
        /></b-button>
      </div>
    </div>
  </div>
</template>

<script>
const QRCode = require("easyqrcodejs");
export default {
  name: "mobile-block",
  props: ["extension", "ind", "isActive","isReg"],
  mounted() {
    let options = {
      text: this.extension.qr,
      logo: require("@/assets/pldt.png"),
      // colorDark: this.selected == "PLDT" ? "#d32030" : "#0047ba",
      colorDark: this.ind < this.getNumOfRg ? "#d32030" : "#12a74f",
      width: 350,
      height: 350,
      correctLevel: QRCode.CorrectLevel.H,
      backgroundImage: require("../assets/white.jpg"), // Background Image
      backgroundImageAlpha: 1,
      dotScale: 0.8
    };
    new QRCode(document.getElementsByClassName(`qr${this.ind}`)[0], options);
    document.querySelector(`.qr${this.ind}`).removeAttribute("title");
  },
  filters: {
    passwordify(string) {
      return string.replace(/./g, "•");
    }
  },
  methods: {
    doCopy(ref, string) {
      this.$copyText(string).then(
        () => {
          this.refreshText();
          this.$refs[ref].classList.add = "active";
        },
        () => {
          this.$refs[ref].classList.remove = "active";
        }
      );
    },
    refreshText() {
      let buttons = document.querySelectorAll("button");
      buttons.forEach(element => {
        element.classList.remove = "active";
      });
    }
  },
  computed: {
    extensionNumber() {
      return this.extension.username.slice(-2);
    },
    getNumOfRg(){
      return parseInt(process.env.VUE_APP_NUM_OF_RG)
    }
  }
};
</script>

<style>
.qr {
  display: flex;
  justify-content: center;
}
.qr img {
  width: 90%;
  height: 100%;
}

/* badge */
.badge-con {
  /* display: none; */
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background: #b75861;
  border: 2px solid #965052;
  position: absolute;
  right: -20px;
  top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.badge-con.active {
  background: #98101d;
  border: 2px solid #680507;
}
.check-img {
  height: 65%;
  width: 65%;
}
</style>
