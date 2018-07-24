import axios from 'axios';

const api = (path, method = 'GET', data = null) => {
  if (method === 'GET') {
    return axios.get(path);
  }
  return axios.post(path, data);
};

export default api;
