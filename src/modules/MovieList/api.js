import api from '../../common/api';

const call = {
  getNowPlaying: () => api('https://api.themoviedb.org/3/movie/now_playing?api_key=43c1e634411ce9b006232c196b10c30f&page=1&region=ID')
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