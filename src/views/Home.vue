<template>
  <div class="home">
    <Qrs :extensions="extensions" class="d-none d-md-block" />
    {{log}}
    <Mobile :extensions="extensions" class="d-block d-md-none" />
  </div>
</template>

<script>
// @ is an alias to /src
import Qrs from "@/components/Qrs";
import Mobile from "@/components/Mobile";
// import axios from "axios";
const axios = require("axios");
export default {
  name: "home",
  components: {
    Qrs,
    Mobile
  },
  data() {
    return {
      extensions: [],
      log : ""
    };
  },
  methods: {
    getQrs() {
      axios
        .post(process.env.VUE_APP_REST_API, {
          serialNo: "DD17-1218-0365-0576"
        },{
    headers: { 'Content-Type' : 'application/json'}})
        .then(response => {
          // const hub = response.data.static.waveNumber;
          this.log = response.data;
          // response.data.extensions.forEach(extension => {
          //   this.extensions.push({
          //     number: hub,
          //     username: extension.username,
          //     password: extension.password,
          //     qr: `csc:${extension.username}:${extension.password}@${process.env.VUE_APP_QR_PREFIX}`
          //   });
          // });

        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getQrs();
  }
};
</script>
