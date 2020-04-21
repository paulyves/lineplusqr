<template>
  <div
    class="mobile custom-height d-flex justify-content-between flex-column"
    :class="[active > getNumOfRg - 1 ? 'not-ringgroup' : 'in-ringgroup']"
  >
    <div @click="logout" class="logout-link mr-3 mt-2">Log out</div>
    <div class="container-fluid">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @slideChange="currentSlide"
      >
        <swiper-slide v-for="(extension, index) in extensions" :key="index">
          <MobileBlock :extension="extension" :ind="index" :isActive="index==active" :isReg ="extension.act_date" :isLocked="extension.isLocked" @toggleLock="toggleLock"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="reg-con container" :class="{'invi' : getDeviceInfo.length == 0}">
      <div class="row " :class="{'d-none' : getDeviceInfo.length == 0}">
        <!-- <div class="reg-col"> -->
          <div class="container-fluid">
            <div class="row justify-content-center mt-2">
              <div class="col-auto">
                <span class="text-white text-center">LAST REGISTERED ON </span>
              </div>
            </div>
            <div class="row justify-content-center">
                <p class="text-white reg-dev-text text-center font-weight-bold mb-0 text-truncate" style="width:265px">
                  {{ getDeviceInfo }}
                </p>
            </div>
            <div class="row justify-content-center">
              <div class="col-auto">
                <p class="text-white text-center"><small >Registration Date: {{getRegDate}} </small></p>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
       <img
        src="@/assets/no_incoming_call.png"
        alt="no incoming call"
        srcset=""
        class="no-incoming-call-m"
        :class="{ 'd-none': active < getNumOfRg }"
      />
    </div>
  </div>
</template>

<script>
import MobileBlock from "@/components/MobileBlock";
export default {
  name: "mobile",
  components: {
    MobileBlock
  },
  props: ["extensions"],
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      active: 0
    };
  },
  computed:{
    getDeviceInfo(){
      if(this.extensions[this.active]){
        return this.extensions[this.active].device;
      }
      return "";
    },
    getRegDate(){
       if(this.extensions[this.active]){
        return this.extensions[this.active].act_date;
      }
      return "";
    },
    getNumOfRg(){
      return parseInt(process.env.VUE_APP_NUM_OF_RG)
    }
  },
  mounted(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
  methods: {
    currentSlide() {
      this.active = this.$refs.mySwiper.swiper.activeIndex;
    },
    toggleLock(data){
      this.$emit('toggleLock',data)
    },
    logout() {
      localStorage.removeItem("l_token");
      this.$router.push({
        name: "login"
      });
    }
  },
  watch: {
    active: function (value) {
     this.$emit('getLockStatus',{uname: this.extensions[value].username, ind : value});
    }
  }
};
</script>

<style scoped>
.custom-height {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  
}
img {
  width: 100%;
}
.in-ringgroup {
  background-color: #d32030;
  /* background-color: #1946b9; */
}
.not-ringgroup {
  background-color: #12a74f;
}
.logout-link {
  position: absolute;
  right: 0;
  color: white;
  cursor: pointer;
  font-weight: 550;
  z-index: 2;
}
.invi{
  background-color: transparent !important;
}
.reg-con {
  background: #231f20;
  height: 150px;
  position: relative;
}
.no-incoming-call-m {
  right: 0;
  bottom: 0;
  position: absolute;
  height: 150px;
  width: 150px;
}
</style>
