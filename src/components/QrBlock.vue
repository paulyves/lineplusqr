<template>
  <div class="qr-block">
      <div class="block mx-auto" :class="{'d-none': !activeCard }">{{extension.number}}</div>
  </div>
</template>

<script>
export default {
  name: "qr-block",
  props: ["extension", "activeCard"]
};
</script>

<style scoped>
.block {
  height: 600px;
  width: 550px;
  border: 1px solid black;
}
</style>