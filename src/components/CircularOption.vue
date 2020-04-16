<template>
  <div class="circle">
    <div class="badge-container" :class="[{ active: status || hover },{'d-none':!isReg}]">
      <img src="@/assets/check.png" alt="" srcset="" class="check-img" />
    </div>
    <div
      class="option"
      @click="toggleStatus"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="[
        extensionNum < getNumOfRg ? 'ringgroup-cir' : 'not-ringgroup-cir',
        { active: status || hover }
      ]"
    >
      {{ extensionNum + 12 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "circular-option",
  props: ["extensionNum", "status","isReg"],
  data(){
    return {
      hover: false
    }
  },
  computed:{
    getNumOfRg(){
      return parseInt(process.env.VUE_APP_NUM_OF_RG)
    }
  },
  methods: {
    toggleStatus() {
      this.$emit("setActive", this.extensionNum);
    }
  }
};
</script>

<style>
.option {
  height: 60px;
  width: 60px;
  border-radius: 7px;
  color: white;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.circle {
  margin: 10px 15px 10px 5px;
  position: relative;
}
.ringgroup-cir {
  background-color: #d2daf1;
}
.not-ringgroup-cir {
  background-color: #cee9da;
}
.ringgroup-cir.active {
  background-color: #1946b9;
  border: 3px solid black;
}
.not-ringgroup-cir.active {
  background-color: #0c9347;
  border: 3px solid #231f20;
}

/* badge */
.badge-container {
  /* display: none; */
  border-radius: 50%;
  height: 28px;
  width: 28px;
  background: #b75861;
  border: 2px solid #965052;
  position: absolute;
  right: -12px;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.badge-container.active {
  background: #98101d;
  border: 2px solid #680507;
}
.check-img {
  height: 65%;
  width: 65%;
}
</style>
