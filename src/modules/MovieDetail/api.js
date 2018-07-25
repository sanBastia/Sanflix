import api from '../../common/api';

const apiKey = '43c1e634411ce9b006232c196b10c30f';
const call = {
  getMovieDetail: movieId => api(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(res => ({
      status: 'success',
      response: res,
    }))
    .catch(err => ({
      status: 'error',
      response: err,
    })),

  getMovieCast: movieId => api(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
    .then(res => ({
      status: 'success',
      response: res,
    }))
    .catch(err => ({
      status: 'error',
      response: err,
    })),

  getSimilarMovie: movieId => api(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`)
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

