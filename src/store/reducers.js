import { combineReducers } from 'redux';

import nowPlayingReducer from '../modules/MovieList/reducer';
import { movieDetailReducer } from '../modules/MovieDetail/reducer';


const rootReducer = combineReducers({
  nowPlayingReducer,
  movieDetailReducer,

});

export default rootReducer;
