import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'
import "material-icons/iconfont/material-icons.css";
import store from './store'

Vue.use(VueAwesomeSwiper)
Vue.use(BootstrapVue)
Vue.use(VueClipboard)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: "login"
      });
    } else {
      store
        .commit("cancelToken")
      store
        .dispatch("refreshToken")
        .then(() => {
          next();
        })
        .catch(error => {
          if (
            error.response.status == 401 &&
            error.response.data.error == "token_expired"
          ){
            store.dispatch("addErrorMsg", "Session Timeout");
          }
          next({
            name: "login"
          });
          //
        });
    }
  } else {
    next(); // make sure to always call next()!
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
