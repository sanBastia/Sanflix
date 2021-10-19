import api from '../../common/api';
const apikey = 'ccb80c6c';
const call = {
  getNowPlaying: (query,page) => api(`https://omdbapi.com/?apikey=${apikey}&s=${query}&page=${page}`)
    .then(res => ({
      status: 'success',
      response: res,
    }))
    .catch(err => ({
      status: 'error',
      response: err,
    })),
};

export default call;