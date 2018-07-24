import CONSTANT from './constant';
import { pickOnlyDataAndStatus } from './utils';

const initialState = {
  data: {},
  status: '',
};

const nowPlayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_NOW_PLAYING: {
      return state;
    }
    case CONSTANT.REQUEST_NOW_PLAYING_SUCCESS: {
      return Object.assign({}, state, pickOnlyDataAndStatus(action.payload));
    }

    case CONSTANT.REQUEST_NOW_PLAYING_ERROR: {
      return Object.assign({}, state, pickOnlyDataAndStatus(action.payload));
    }
    default: {
      return state;
    }
  }
};

export default nowPlayingReducer;
