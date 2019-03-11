import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: {
      avatar: 'http://localhost:1003/images/default.jpg',
      name: 'default',
    },
  },
  mutations: {
    saveAdminInfo(state, adminInfo) {
      state.adminInfo = adminInfo;
    },
  },
  actions: {
    async getAdminData({ commit }) {
      try {
        const res = await http.getAdminInfo();
        if (res.status === 1) {
          commit('saveAdminInfo', res.data);
        } else {
          throw new Error(res.type);
        }
      } catch (err) {
        // console.log(err.message)
      }
    }
  },
});
