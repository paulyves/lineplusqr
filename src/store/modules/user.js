import axios from 'axios';
const state = {
  serialNumber: "",
  token: localStorage.getItem("l_token") || null,
  extensions: [],
  errorMessage: "",
  axiosSource : axios.CancelToken
};

const getters = {
  getSerialNumber: state => state.serialNumber,
  allExtensions: state => state.extensions,
  getToken : state => state.token,
  isLoggedIn: state => state.token !== null,
  getErrorMessage : state => state.errorMessage,
};

const actions = {
  changeSerialNumber({ commit }, string) {
    commit("setSerialNumber", string);
  },
  retrieveToken({commit}, token) {
    if(token){
      localStorage.setItem('l_token',token);
      commit("retrieveToken", token);
    }
  },
  postQrs({state}){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
    return new Promise(function(resolve,reject){
      axios
      .post(process.env.VUE_APP_API_URL+"/account/qrs",{serialNo:state.serialNumber})
      .then(response => {
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
    });
  },
  updateLockedStatus({state},obj){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
    return new Promise(function(resolve,reject){
      axios
      .put(process.env.VUE_APP_API_URL+"/account/lock",{uname: obj.uname,isLocked:obj.isLocked})
      .then(response => {
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
    });
  },
  postForLockStatus({state},obj){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
    return new Promise(function(resolve,reject){
      axios
      .post(process.env.VUE_APP_API_URL+"/account/lock/status",{uname: obj.uname})
      .then(response => {
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
    });
  },
  // logoutUser({commit,state}){
  //     localStorage.removeItem('l_token');
  //     commit("removeToken");
  //     axios
  //     .post(process.env.VUE_APP_API_URL+"/logout",{device:state.serialNumber})
  //     .then(response => {
  //       // console.log(response);
  //     })
  //     .catch(error =>{
  //       // console.log(error);
  //     });
  // },
  addErrorMsg({commit},string){
    commit('setErrorMsg',string);
  },
  refreshToken({dispatch,commit,state}){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
    return new Promise(function(resolve,reject){
      axios
      .post(process.env.VUE_APP_API_URL+"/refreshToken")
      .then(response => {
        dispatch('retrieveToken',response.data.token)
        dispatch('changeSerialNumber',response.data.sen)
        resolve(response.data.new_token)
      })
      .catch(error =>{
        commit('removeToken');
        reject(error)
      });
    });
    
  },
  login({dispatch},obj){
    return new Promise(function(resolve,reject){
      axios
      .post(process.env.VUE_APP_API_URL+"/portalLogin",{serialNumber : obj.serialNo, password : obj.password})
      .then(response => {
        dispatch('retrieveToken',response.data.token)
        dispatch('changeSerialNumber',response.data.serialNumber)
        resolve(response)
      })
      .catch(error =>{
        reject(error)
      });
    });
  }
};
const mutations = {
  setSerialNumber: (state, string) => {
    state.serialNumber = string;
  },
  retrieveToken: (state, token) => {
    state.token = token;
  },
  removeToken : (state) => state.token = null,
  setErrorMsg: (state,string) =>{
    state.errorMessage = string;
  },
  cancelToken : (state) =>{
    state.axiosSource.source().cancel();
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
