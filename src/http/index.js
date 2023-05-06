import axios from 'axios';
import { MessageBox } from 'element-ui';

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true;

axios.interceptors.response.use(res => {
  if (res.data.status == 1) {
    return Promise.resolve(res)
  } else if (res.data.status == 49){
    MessageBox.alert(res.data.message)
    localStorage.clear()
    location.href = '/'
  } else {
    MessageBox.alert(res.data.message)
    return Promise.reject(res);

  }
}, err => {
  MessageBox.alert("请求出错！")
  return Promise.reject(err);
})

export default {
  login(data) {
    return axios.post(`/admin/login`, data);
  },
  register(data) {
    return axios.post(`/admin/register`, data);
  },
  singout() {
    return axios.get(`/admin/singout`);
  },
  getAdminInfo() {
    return axios.get(`/admin/getInfo`);
  },
  getAdminList(data) {
    return axios.get(`/admin/list`);
  },
  getArticleList(data) {
    return axios.get(`/article/articleList`, { params: data });
  },
  getVisitor(data) {
    return axios.get(`/admin/visitor`, { params: data });
  },
  blogInfo(){
    return axios.get(`/admin/blogInfo`);
  },
  addArticle(data) {
    return axios.post(`/article/addArticle`, data);
  },
  deleteArticle(data) {
    return axios.get(`/article/deleteArticle`, { params: data });
  },
  recoveryArticle(data) {
    return axios.get(`/article/recoveryArticle`, { params: data });
  },
  getArticle(data) {
    return axios.get(`/article/${data}`);
  },
  updateArticle(data) {
    return axios.post(`/article/updateArticle`, data);
  },
  getPhotoList(data) {
    return axios.get(`/photo/list`, { params: data });
  },
  getHistoryPhoto(data) {
    return axios.post(`/photo/getHistoryPhoto`, data);
  },
  changePhotoClassify(data) {
    return axios.post(`/photo/changePhotoClassify`, data);
  },
  getTagList() {
    return axios.get(`/tag/tagList`)
  }
};
