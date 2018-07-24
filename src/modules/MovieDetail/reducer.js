import CONSTANT from './constant';
import { PickOnlyDataAndStatus } from './util';

const initialState = {
  data: {},
  status: '',

  // this state is for loading progressbar
  activeRequests: 0,
};

const movieDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_MOVIE_DETAIL: {
      return Object.assign({}, state, { activeRequests: state.activeRequests + 1 });
    }
    case CONSTANT.REQUEST_MOVIE_DETAIL_SUCCESS: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload), { activeRequests: state.activeRequests - 1 });
    }

    case CONSTANT.REQUEST_MOVIE_DETAIL_ERROR: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload), { activeRequests: state.activeRequests - 1 });
    }
    default: {
      return state;
    }
  }
};

export default movieDetailReducer;
