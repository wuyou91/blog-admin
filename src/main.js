import Vue from 'vue';
import ElementUI from 'element-ui';
import VueParticles from 'vue-particles';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.use(ElementUI);
Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
