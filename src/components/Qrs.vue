<template>
  <div class="qrs">
    <div class="container con d-flex align-items-center">
      <div class="row x d-flex justify-content-between mb-5">
      <QrBlock v-for="(extension, index) in extensions" :key="index" :ind="index" :extension="extension"/>
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
.con{
  min-height: 100vh;
}
.x{
  height: 700px;
  width: 1040px;
}
</style>
