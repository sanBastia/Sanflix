import { combineReducers } from 'redux';

import homeReducer from '../modules/Home/reducer';

const rootReducer = combineReducers({
  homeReducer,
});

export default rootReducer;
