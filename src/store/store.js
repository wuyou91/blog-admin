import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adminInfo: {
      avatar: 'http://10.10.60.65:1003/images/default.jpg',
      name: 'default',
    },
  },
  mutations: {
    saveAdminInfo(state, data) {
      state.adminInfo = data;
    },
  },
  actions: {
    async getAdminInfo({ commit }) {
      try {
        const res = await http.getAdminInfo();
        if (res.data.status === 1) {
          commit('saveAdminInfo', res.data.data);
          console.log(`成功获取${res.data.data}`);
        } else {
          console.log('获取失败');
        }
      } catch (err) {
        // console.log(err.message)
      }
    }
  },
});
