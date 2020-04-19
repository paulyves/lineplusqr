<template>
  <div class="desktop">
    <div class="container-fluid">
      <div class="row justify-content-md-center">
        <div class="col-lg-8 col-xl-6 mt-5">
          <div class="row">
            <div class="col-6 align-self-center">
              <div class="row justify-content-center">
                <div class="col-auto">
                  <img src="@/assets/desktop-banner.png" alt="" srcset="" />
                </div>
              </div>
              <div class="row justify-content-center mt-4">
                <div class="col-10 px-4">
                  <div class="text-muted font-weight-bold pl-2">
                    Select Extension Number
                  </div>
                </div>
              </div>
              <div class="row justify-content-center ">
                <div class="container-buttons pt-2">
                  <div class="row justify-content-center">
                    <CircularOption
                      v-for="(extension, index) in extensions"
                      :key="index"
                      :extensionNum="index"
                      :status="active == index"
                      :isReg ="extension.act_date"
                      @setActive="setActive"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <QrCard
                :extensionNum="active"
                :qrCode="extensions[active].qr"
                :hubNum="extensions[active].number"
                :username="extensions[active].username"
                :regDate="extensions[active].act_date"
                :device="extensions[active].device"
                :isLocked="extensions[active].isLocked"
                @toggleLock="toggleLock"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-6 offset-6">
              <div class="row pl-3 mb-1">
                <div
                  class="input-grey rounded-sm text-secondary text-truncate"
                >
                  <span> Username: {{ username }} </span>
                </div>
                <div
                  class="copy-block rounded-sm text-secondary d-flex justify-content-center ml-2"
                  :class="{'not-rg' : active > getNumOfRg + 1}"
                  @click="doCopy('uname', extensions[active].username)"
                  ref="uname"
                >
                  <img
                    src="@/assets/copy.png"
                    alt=""
                    srcset=""
                    class="align-self-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2 mb-4">
            <div class="col-6 offset-6">
              <div class="row pl-3">
                <div class="input-grey rounded-sm text-secondary ">
                  <span> Password: {{ password }}</span>
                </div>
                <div
                  class="copy-block rounded-sm text-secondary d-flex justify-content-center ml-2"
                  :class="{'not-rg' : active > getNumOfRg + 1}"
                  @click="doCopy('passwd', extensions[active].password)"
                  ref="passwd"
                >
                  <img
                    src="@/assets/copy.png"
                    alt=""
                    srcset=""
                    class="align-self-center "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CircularOption from "@/components/CircularOption";
import QrCard from "@/components/QrCard";
export default {
  name: "desktop",
  props: ["extensions"],
  data() {
    return {
      active: 0
    };
  },
  components: {
    CircularOption,
    QrCard
  },
  computed: {
    username() {
      return this.extensions[this.active].username;
    },
    password() {
      return this.extensions[this.active].password.replace(/./g, "•");
    },
    getNumOfRg(){
      return parseInt(process.env.VUE_APP_NUM_OF_RG)
    }
  },
  methods: {
    
    setActive(extension) {
      this.refreshBtns();
      this.active = extension;
    },
    toggleLock(data){
      this.$emit('toggleLock',data)
    },
    /**
     * Called by click event in copy icon button.
     * @params {string, string} 
     * ref = vue props ref
     * string = string to be copied
     */
    doCopy(ref, string) {
      /** vue clipboard copy function */
      this.$copyText(string).then(
        () => {
          this.refreshBtns();
          this.$refs[ref].classList.add("active");
        },
        () => {
          this.refreshBtns();
        }
      );
    },
    /**
     * remove active class (hightlight for copy button)
     */
    refreshBtns() {
      let buttons = document.querySelectorAll(".copy-block");
      buttons.forEach(element => {
        element.classList.remove("active");
      });
    }
  }
};
</script>

<style scoped>
.container-buttons {
  width: 350px;
  border-top: 1px solid #b3b3b3;
}
.input-grey {
  background-color: #e6e6e6;
  padding: 3px;
  width: 250px;
}
.copy-block {
  background-color: #e6e6e6;
  width: 36px;
  height: 30px;
  cursor: pointer;
}
.copy-block:hover {
  background-color: #b3b3b3;
}
.copy-block.active {
  background-color: #d2daf1;
}
.copy-block.not-rg.active {
  background-color: #cee9da;
}
/* background-color: #b3b3b3; */
.text-secondary span{
  padding-left: 15px;
  font-size: 0.95rem;
}
.text-muted{
  color: #b3b3b3 !important; 
}

</style>
