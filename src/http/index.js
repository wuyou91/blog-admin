import axios from 'axios';

const api = 'http://localhost:1003';

export default {
  login(data) {
    return axios.post(`${api}/admin/login`, data);
  },
};
