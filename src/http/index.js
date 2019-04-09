import axios from 'axios';
import config from '@/config';

axios.defaults.withCredentials = true;

export default {
  login(data) {
    return axios.post(`${config.API_BASE}/admin/login`, data);
  },
  singout() {
    return axios.get(`${config.API_BASE}/admin/singout`);
  },
  getAdminInfo() {
    return axios.get(`${config.API_BASE}/admin/getInfo`);
  },
  getAdminList(data) {
    return axios.get(`${config.API_BASE}/admin/list`);
  },
  getArticleList(data) {
    return axios.get(`${config.API_BASE}/article/articleList`, { params: data });
  },
  getVisitor(data) {
    return axios.get(`${config.API_BASE}/admin/visitor`, { params: data });
  },
  blogInfo(){
    return axios.get(`${config.API_BASE}/admin/blogInfo`);
  },
  addArticle(data) {
    return axios.post(`${config.API_BASE}/article/addArticle`, data);
  },
  deleteArticle(data) {
    return axios.get(`${config.API_BASE}/article/deleteArticle`, { params: data });
  },
  getArticle(data) {
    return axios.get(`${config.API_BASE}/article/${data}`);
  },
  updateArticle(data) {
    return axios.post(`${config.API_BASE}/article/updateArticle`, data);
  },
  getPhotoList(data) {
    return axios.get(`${config.API_BASE}/photo/list`, { params: data });
  }
};
