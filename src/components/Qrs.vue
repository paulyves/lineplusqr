<template>
  <div class="qrs">
    <div class="d-flex flex-column justify-content-between">
      <div class="container con d-flex justify-content-center pt-3">
        <div class="row x d-flex justify-content-between">
          <QrBlock
            v-for="(extension, index) in extensions"
            :key="index"
            :ind="index"
            :extension="extension"
            :isRingGroup="index < 6"
          />
        </div>
      </div>
      <div class="container d-flex justify-content-center">
        <img src="@/assets/banner.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import QrBlock from "@/components/QrBlock";
export default {
  name: "qrs",
  props: ["extensions"],
  components: {
    QrBlock
  },
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
    }
  }
};
</script>
<style scoped>
.con {
  /* min-height: 100vh; */
  width: 930px;
}
</style>
