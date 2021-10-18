import CONSTANT from './constant';
import call from './api';
import { SuccessOrError } from './util';

const successRequestNowPlaying = data => ({
  type: CONSTANT.REQUEST_NOW_PLAYING_SUCCESS,
  payload: data,
});

const errorRequestNowPlaying = err => ({
  type: CONSTANT.REQUEST_NOW_PLAYING_ERROR,
  payload: err,
});

const requestNowPlaying = (query) => async (dispatch) => {
  dispatch({ type: CONSTANT.REQUEST_NOW_PLAYING });

  const response = await call.getNowPlaying(query);

  return SuccessOrError(response.status) ? dispatch(successRequestNowPlaying(response)) : dispatch(errorRequestNowPlaying(response));
};


export default requestNowPlaying;
