import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: JSON.parse(localStorage.getItem('adminInfo')),
  },
  mutations: {
    saveAdminInfo(state, data) {
      state.adminInfo = data;
    },
  },
  actions: {
    getAdminInfo({ commit }) {
      return new Promise((resolve,reject) => {
        http.getAdminInfo().then((res) => {
          if (res.data.status === 1) {
            commit('saveAdminInfo', res.data.data);
            localStorage.setItem('adminInfo',JSON.stringify(res.data.data))
            resolve()
          } else {
            reject('获取用户信息失败')
          }  
        })
      })
    }
  },
});
