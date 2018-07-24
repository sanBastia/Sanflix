import CONSTANT from './constant';
import { pickOnlyDataAndStatus } from './utils';

const initialState = {
  data: {},
  status: '',

  // this state is for loading progressbar
  activeRequests: 0,
};

const nowPlayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_NOW_PLAYING: {
      return Object.assign({}, state, { activeRequests: state.activeRequests + 1 });
    }
    case CONSTANT.REQUEST_NOW_PLAYING_SUCCESS: {
      return Object.assign({}, state, pickOnlyDataAndStatus(action.payload));
    }

    case CONSTANT.REQUEST_NOW_PLAYING_ERROR: {
      return Object.assign({}, state, pickOnlyDataAndStatus(action.payload), { activeRequests: state.activeRequests - 2 });
    }
    default: {
      return state;
    }
  }
};

export default nowPlayingReducer;
