<template>
  <div class="home">
    <div @click="logout" class="float-right d-none d-md-block logout-link">Log out</div>
    <Desktop :extensions="extensions" class="d-none d-md-block mt-5" v-if="extensions[0]"/>
    <Mobile :extensions="extensions" class="d-block d-md-none" />
    <h2 class="pt-5 d-block d-md-none" v-if="error">{{ errorMsg }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Desktop from "@/components/Desktop";
import Mobile from "@/components/Mobile";
export default {
  name: "home",
  components: {
    Desktop,
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
              act_date: extension.act_date,
              device: extension.device,
              qr: `csc:${extension.username}:${extension.password}@${process.env.VUE_APP_QR_PREFIX}`,
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
    this.getQrs();
  }
};
</script>
<style scoped>
.logout-link{
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  right: 0;
  top:0;
  margin : 20px 20px 0 0;
  
}
</style>
