<template>
  <div
    class="mobile custom-height d-flex justify-content-between flex-column"
    :class="[active > 3 ? 'not-ringgroup' : 'in-ringgroup']"
  >
   <div @click="logout" class="logout-link mr-3 mt-2">Log out</div>
    <div class="container-fluid">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @slideChange="currentSlide"
      >
        <swiper-slide v-for="(extension, index) in extensions" :key="index">
          <MobileBlock :extension="extension" :ind="index" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="container-fluid bg-white">
      <img src="@/assets/banner.png" alt="banner" class="mt-2" />
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
  methods: {
    currentSlide() {
      this.active = this.$refs.mySwiper.swiper.activeIndex;
    },
    logout(){
      localStorage.removeItem('l_token');
      this.$router.push({
            name: "login"
      });
    }
  },

};
</script>

<style scoped>

.custom-height {
  height: 90vh;
  width: 100vw;
}
img {
  width: 100%;
}
.in-ringgroup {
  background-color: #1946b9;
}
.not-ringgroup {
  background-color: #12a74f;
}
.logout-link{
  position: absolute;
  right: 0;
  color: white;
  cursor: pointer;
  font-weight: 550;
  z-index: 2;
}
</style>
