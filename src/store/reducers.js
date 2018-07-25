import { combineReducers } from 'redux';

import nowPlayingReducer from '../modules/MovieList/reducer';
import { movieDetailReducer, movieCastReducer, similarMovieReducer } from '../modules/MovieDetail/reducer';
import balanceReducer from '../modules/Alert/reducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
  movieDetailReducer,
  movieCastReducer,
  balanceReducer,
  similarMovieReducer,
});

export default rootReducer;
