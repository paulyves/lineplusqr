<template>
  <div class="home">
    <Qrs :extensions="extensions" class="d-none d-md-block" />
    <Mobile :extensions="extensions" class="d-block d-md-none" />
    <!-- <h1 class="display-4 pt-5 d-none d-md-block" v-if="error">
      {{ errorMsg }}
    </h1> -->
    <h2 class="pt-5 d-block d-md-none" v-if="error">{{ errorMsg }}</h2>
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
  props: ["serial"],
  data() {
    return {
      extensions: [
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
        {
          number: 1008909,
          username: "pldt-line-plus-63-2-1008909-12",
          password: "DsqrAxarwzS",
          qr: `csc:pldt-line-plus-63-2-1008909-12:DsqrAxarwzS@${process.env.VUE_APP_QR_PREFIX}`
        },
      ],
      error: true,
      errorMsg: ""
    };
  },
  methods: {
    getQrs() {
      const serial = {
        serialNo: this.serial
      };
      axios
        .post(process.env.VUE_APP_REST_API, serial)
        .then(response => {
          this.error = false;
          const hub = response.data.static.waveNumber;
          response.data.extensions.forEach(extension => {
            this.extensions.push({
              number: hub,
              username: extension.username,
              password: extension.password,
              qr: `csc:${extension.username}:${extension.password}@${process.env.VUE_APP_QR_PREFIX}`
            });
          });
        })
        .catch(error => {
          this.error = true;
          if (
            error.response.status == 401 &&
            error.response.data.error == "Invalid serial number"
          ) {
            this.errorMsg = "Invalid Input";
          } else if (
            error.response.status == 402 &&
            error.response.data.error == "Invalid Network"
          ) {
            this.errorMsg = "Please connect to the same router as your device.";
          } else this.errorMsg = "Access Denied";
        });
    }
  },
  mounted() {
    // this.getQrs();
  }
};
</script>
