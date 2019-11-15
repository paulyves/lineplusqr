<template>
  <div class="qrs">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-auto">
      <div class="row align-items-center">
        <div class="col-xs-1">
          <i class="material-icons align-middle" @click="prev">arrow_back_ios</i>
        </div>
        <div class="col-auto">
          <QrBlock v-for="(extension, index) in extensions" :key="index" :extension="extension" :activeCard ="active == index" />
        </div>
        <div class="col-xs-1" @click="next">
          <i class="material-icons">arrow_forward_ios</i>
        </div>
      </div>
    </div>
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
      active : 0
    };
  },
  methods : {
    next(){
      if(this.active + 1 != this.extensions.length)
        this.active++
      else
        this.active = 0
    },
    prev(){
      if(this.active != 0)
        this.active--
      else
        this.active = this.extensions.length -1
    }
  }

};
</script>
