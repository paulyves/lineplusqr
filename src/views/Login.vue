<template>
  <div class="login d-flex align-items-center ">
    <div class="container ">
      <div class="row">
        <div class="col"></div>
        <div class="col-10 col-md-10 col-lg-6 e border shadow mb-5 d-flex flex-column justify-content-between">
          <div class="row">
            <div class="col-md-12 col-12">
              <div class="row justify-content-center mt-2">
                <img
                  src="../assets/login_logo.png"
                  class="img-fluid"
                  alt="Responsive image"
                />
              </div>
              <div class="row">
                <form class="container col-10">
                  <div class="form-group text-center">
                    <label for="senumber">Serial Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="senumber"
                      v-model="serialNumber"
                      :maxlength="19"
                    />
                  </div>
                  <div class="form-group text-center">
                    <label for="inputPasswd">Password</label>
                    <PasswordToggle
                      v-model="password"
                      aria-describedby="passwdHelp"
                      :maxlength="19"
                      id="inputPasswd"
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      type="submit"
                      class="btn btn-primary center"
                      @click.prevent="authorize"
                      v-if="!isLoading"
                    >
                      Login
                    </button>
                    <button
                      v-else
                      class="btn btn-primary"
                      type="button"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  </div>
                </form>
              </div>
              <div class="row justify-content-center mt-3">
                <div class="col col-10">
                  <div
                    class="alert alert-danger text-center mb-0"
                    role="alert"
                    v-if="getErrorMessage || notif"
                  >
                    {{ getErrorMessage || notif }}
                  </div>
                </div>
              </div>
            </div>
          </div>
           <small class="align-self-end mb-2">{{ version }}</small>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PasswordToggle from "../components/PasswordToggle.vue";

export default {
  name: "login",
  components: {
    PasswordToggle
  },
  props: ["params"],
  data() {
    return {
      password: "5F64Bb711f",
      serialNumber: "DD17-1218-0365-0470",
      notif: "",
      version: process.env.VUE_APP_VERSION,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["getErrorMessage"])
  },
  methods: {
    ...mapActions(["login", "addErrorMsg"]),
    authorize() {
      this.isLoading = true;
      this.login({ serialNo: this.serialNumber, password: this.password })
        .then(response => {
          this.isLoading = false;
          if (response.status == 200 && response.data.token) {
            this.$router.push({
              name: "home"
            });
          }
        })
        .catch(error => {
          this.isLoading = false;
          this.addErrorMsg(error.response.data.error);
        });
    },
    setSerial() {
      this.changeSerialNumber(this.serialNumber);
    }
  },
  mounted() {
    if (this.params) {
      let credentials = this.params.split(":");
      if (credentials.length == 2) {
        this.addErrorMsg("");
        this.serialNumber = credentials[0];
        this.password = credentials[1];
        this.authorize();
      } else {
        this.$router.push({
          name: "login"
        });
      }
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  background-image: url("~@/assets/login_screen_bg.jpg");
  background-size: cover;
  
  /* background: url('@assets/login_screen_bg.jpg') */
}

.border {
  background: white;
}

img {
  height: 200px;
}

.btn {
  width: 150px;
}
.e {
  min-height: 580px;
  border-radius: 0.5rem;
}
</style>
