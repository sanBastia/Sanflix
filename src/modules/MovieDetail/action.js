import CONSTANT from './constant';
import call from './api';
import { SuccessOrError } from './util';

const successRequestMovieDetail = data => ({
  type: CONSTANT.REQUEST_MOVIE_DETAIL_SUCCESS,
  payload: data,
});

const errorRequestMovieDetail = err => ({
  type: CONSTANT.REQUEST_MOVIE_DETAIL_ERROR,
  payload: err,
});

const requestMovieDetail = movieId => async (dispatch) => {
  dispatch({ type: CONSTANT.REQUEST_MOVIE_DETAIL });

  const response = await call.getMovieDetail(movieId);

  return SuccessOrError(response.status) ? dispatch(successRequestMovieDetail(response)) : dispatch(errorRequestMovieDetail(response));
};

const successRequestMovieCast = data => ({
  type: CONSTANT.REQUEST_MOVIE_CAST_SUCCESS,
  payload: data,
});

const errorRequestMovieCast = err => ({
  type: CONSTANT.REQUEST_MOVIE_CAST_ERROR,
  payload: err,
});

const requestMovieCast = movieId => async (dispatch) => {
  dispatch({ type: CONSTANT.REQUEST_MOVIE_CAST });

  const response = await call.getMovieCast(movieId);

  return SuccessOrError(response.status) ? dispatch(successRequestMovieCast(response)) : dispatch(errorRequestMovieCast(response));
};

const successRequestSimilarMovie = data => ({
  type: CONSTANT.REQUEST_SIMILAR_MOVIE_SUCCESS,
  payload: data,
});

const errorRequestSimilarMovie = err => ({
  type: CONSTANT.REQUEST_SIMILAR_MOVIE_ERROR,
  payload: err,
});

const requestSimilarMovie = movieId => async (dispatch) => {
  dispatch({ type: CONSTANT.REQUEST_SIMILAR_MOVIE });

  const response = await call.getSimilarMovie(movieId);

  return SuccessOrError(response.status) ? dispatch(successRequestSimilarMovie(response)) : dispatch(errorRequestSimilarMovie(response));
};


export {
  requestMovieDetail,
  requestMovieCast,
  requestSimilarMovie,
};
