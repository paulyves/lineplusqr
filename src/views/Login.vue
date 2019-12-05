<template>
  <div class="login d-flex align-items-center ">
    <div class="container ">
      <div class="row">
        <div class="col"></div>
        <div
          class="col-auto e border shadow mb-5"
        >
          <div class="row">
            <div class="col-6">
              <h3 class="mt-4">
                WARNING: THIS SYSTEM IS FOR AUTHORIZED USERS ONLY
              </h3>
              <p>
                All access, transactions, and files on this PLDT-owned system
                may be monitored, intercepted, recorded, copied, audited,
                inspected, and reported to Company authorities by authorized IT
                Security personnel. Unauthorized access or violations of the
                terms of use may subject you to administrative disciplinary
                action and possible criminal prosecution.
              </p>
              <p>
                By pressing 'Login', you acknowledge and agree to the terms and
                conditions of use stated in the Inter-Company Memorandum No.:
                005-14: Unified Information Technology (IT) Policies which
                includes the PROHIBITION of the following: installation of
                unauthorized connections and devices, violation of software
                licenses, violation of access rights limitations, leakage of
                confidential and proprietary data and information, and sharing
                of user accounts and passwords.
              </p>
              <p>
                * For more information on Inter-Company Memorandum No.: 005-14:
                Unified Information Technology (IT) Policies, please access
                <a
                  class="text-overflow"
                  href="http://pldtinfocentral/sites/ITSecurity/Policies/Forms/AllPages.aspx"
                  >http://pldtinfocentral/sites/ITSecurity/Policies/Forms/AllPages.aspx</a
                >
              </p>
              <p>
                Contact Helpdesk at 620-2700 for further details and inquiries.
              </p>
            </div>
            <div class="col-6">
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
              <div class="row mt-3">
                <div class="col"></div>
              </div>
              <!-- <small class="float-right mt-4">{{ version }}</small> -->
            </div>
          </div>
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
  min-height: 570px;
  border-radius: 0.5rem;
}
</style>
