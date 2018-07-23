import CONSTANT from './constant';

const initialState = {
  home: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_HOME: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default homeReducer;
