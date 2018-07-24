import { combineReducers } from 'redux';

import nowPlayingReducer from '../modules/MovieList/reducer';

const rootReducer = combineReducers({
  nowPlayingReducer,
});

export default rootReducer;
