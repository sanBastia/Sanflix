import api from '../../common/api';

const apikey = 'ccb80c6c';
const call = {
  getMovieDetail: movieId => api(`https://omdbapi.com/?apikey=${apikey}&t=${movieId}&plot=full`)
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

