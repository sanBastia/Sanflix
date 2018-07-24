import CONSTANT from './constant';
import call from './api';
import SuccessOrError from './util';

const successRequestMovieDetail = data => ({
  type: CONSTANT.REQUEST_MOVIE_DETAIL_SUCCESS,
  payload: data,
});

const errorRequestMovieDetail = err => ({
  type: CONSTANT.REQUEST_MOVIE_DETAIL_ERROR,
  payload: err,
});

const requestMovieDetail = () => async (dispatch) => {
  dispatch({ type: CONSTANT.REQUEST_MOVIE_DETAIL });

  const response = await call.getMovieDetail();

  return SuccessOrError(response.status) ? dispatch(successRequestMovieDetail(response)) : dispatch(errorRequestMovieDetail(response));
};


export default requestMovieDetail;
