<template>
  <div class="circle">
    <div class="option" @click="toggleStatus" :class="[extensionNum < 6?'ringgroup-cir':'not-ringgroup-cir',{'active':status}]">
      {{extensionNum + 12}}
    </div>
  </div>
</template>

<script>
export default {
  name: "circular-option",
  props:['extensionNum','status'],
  methods: {
    toggleStatus(){
      this.$emit('setActive',this.extensionNum);
    }
  }
}
</script>

<style>
.option{
  height: 45px;
  width: 45px;
  border-radius: 75px;
  color: white;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
}
.circle{
  margin: 0 10px 10px 0px;
}
.ringgroup-cir{
  background-color: #f6d2d6;
}
.not-ringgroup-cir {
  background-color: #cee9da;
}
.ringgroup-cir.active{
  background-color: #d32030;
}
.not-ringgroup-cir.active{
  background-color: #0c9347;
}
</style>