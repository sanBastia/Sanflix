import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';


let middleware = [
  thunk,
];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

const finalCreateStore = composeWithDevTools(applyMiddleware(...middleware))(createStore);

const store = finalCreateStore(rootReducer);

export default store;
