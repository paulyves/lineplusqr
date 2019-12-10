<template>
  <div class="home">
    <div @click="logout" class="float-right mt-2 mr-3 d-none d-md-block logout-link">Log out</div>
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
import { mapActions, mapGetters } from "vuex";
import Qrs from "@/components/Qrs";
import Mobile from "@/components/Mobile";
// import axios from "axios";
export default {
  name: "home",
  components: {
    Qrs,
    Mobile
  },
  props: ["serial"],
  data() {
    return {
      extensions: [],
      error: true,
      errorMsg: ""
    };
  },
 computed: {
    ...mapGetters(["allExtensions"])
  },
  methods: {
    ...mapActions(["postQrs","addErrorMsg"]),
    getQrs() {
      this.postQrs()
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
          if (
            error.response.status == 401 &&
            error.response.data.error == "token_expired"
          ){
            this.addErrorMsg("Session Timeout");
          }
          this.$router.push({
            name: "login"
          });
        });
    },
    logout(){
      localStorage.removeItem('l_token');
      this.$router.push({
            name: "login"
      });
    }
  },
  mounted() {
    // this.getQrs();
  }
};
</script>
<style scoped>
.logout-link{
  cursor: pointer;
  font-weight: bold;
}
</style>
