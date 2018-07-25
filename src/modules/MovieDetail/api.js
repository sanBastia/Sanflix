import api from '../../common/api';

const call = {
  getMovieDetail: movieId => api(`https://api.themoviedb.org/3/movie/${movieId}?api_key=43c1e634411ce9b006232c196b10c30f&language=en-US`)
    .then(res => ({
      status: 'success',
      response: res,
    }))
    .catch(err => ({
      status: 'error',
      response: err,
    })),

  getMovieCast: movieId => api(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=43c1e634411ce9b006232c196b10c30f`)
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
