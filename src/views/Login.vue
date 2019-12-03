<template>
  <div class="login d-flex align-items-center ">
    <div class="container ">
      <div class="row">
        <div class="col"></div>
        <div
          class="col-md-6 col-sm-6 col-10 col-lg-5 col-xl-5 e border shadow mb-5"
        >
          <div class="row justify-content-center mt-2">
            <img
              src="../assets/login_logo.png"
              class="img-fluid"
              alt="Responsive image"
            />
          </div>
          <div class="row">
            <form class="container col-10">
              <div class="form-group">
                <label for="senumber">Serial Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="senumber"
                  v-model="serialNumber"
                  :maxlength="19"
                />
              </div>
              <div class="form-group">
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
                  @click.prevent="login"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div class="row justify-content-center mt-3">
            <div class="col">
              <!-- <div
                class="alert alert-danger text-center mb-0"
                role="alert"
                v-if="getErrorMessage||notif"
              >{{ getErrorMessage||notif}}</div> -->
            </div>
          </div>
          <small class="float-right mt-4">{{ version }}</small>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require("axios");
import PasswordToggle from "../components/PasswordToggle.vue";

export default {
  name: "login",
  components: {
    PasswordToggle
  },
  data() {
    return {
      password: "",
      serialNumber: "",
      notif: "",
      version: process.env.VUE_APP_VERSION
    };
  },
  methods: {
    // ...mapActions("retrieveToken", "addErrorMsg"),
    login() {
      this.setSerial();
      // const data = {
      //   serial_number: this.serialNumber.toUpperCase(),
      //   password: this.password
      // };

      // this.addErrorMsg("");
      // axios
      //   .post(process.env.VUE_APP_API_URL+"/login", data)
      //   .then(response => {
      //     if (response.data.token) {
      //       this.retrieveToken(response.data.token);
      //       this.$router.push({
      //         path: "home"
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     if(error.response.status != 422){
      //       this.notif = "Invalid credentials";
      //     }
      //   });
    },
    setSerial() {
      // this.addErrorMsg("");
      this.changeSerialNumber(this.serialNumber);
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
  min-height: 500px;
  border-radius: 0.5rem;
}
</style>
