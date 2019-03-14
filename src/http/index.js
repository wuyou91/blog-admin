import axios from 'axios';
import config from '@/config';

axios.defaults.withCredentials = true;

export default {
  login(data) {
    return axios.post(`${config.API_BASE}/admin/login`, data);
  },
  getAdminInfo() {
    return axios.get(`${config.API_BASE}/admin/getInfo`);
  },
  getArticleList(data) {
    return axios.get(`${config.API_BASE}/article/articleList`, data);
  },
};
