import CONSTANT from './constant';
import { PickOnlyDataAndStatus } from './util';

const initialState = {
  data: {},
  status: '',
};

const movieDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_MOVIE_DETAIL: {
      return Object.assign({}, state);
    }
    case CONSTANT.REQUEST_MOVIE_DETAIL_SUCCESS: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }

    case CONSTANT.REQUEST_MOVIE_DETAIL_ERROR: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }
    default: {
      return state;
    }
  }
};

export default movieDetailReducer;
