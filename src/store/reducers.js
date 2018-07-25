import { combineReducers } from 'redux';

import nowPlayingReducer from '../modules/MovieList/reducer';
import { movieDetailReducer, movieCastReducer } from '../modules/MovieDetail/reducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
  movieDetailReducer,
  movieCastReducer,
});

export default rootReducer;
