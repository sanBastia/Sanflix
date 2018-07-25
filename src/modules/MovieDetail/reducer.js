import CONSTANT from './constant';
import { PickOnlyDataAndStatus } from './util';

const initialMovieDetailState = {
  data: {},
  status: '',

  // this state is for loading progressbar
  activeRequests: 0,
};

const movieDetailReducer = (state = initialMovieDetailState, action) => {
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


const initialMovieCastState = {
  data: {},
  status: '',

};

const movieCastReducer = (state = initialMovieCastState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_MOVIE_CAST: {
      return Object.assign({}, state);
    }
    case CONSTANT.REQUEST_MOVIE_CAST_SUCCESS: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }
    case CONSTANT.REQUEST_MOVIE_CAST_ERROR: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }
    default: {
      return state;
    }
  }
};

const initialSimilarMovieState = {
  data: {},
  status: '',

};

const similarMovieReducer = (state = initialSimilarMovieState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_SIMILAR_MOVIE: {
      return Object.assign({}, state);
    }
    case CONSTANT.REQUEST_SIMILAR_MOVIE_SUCCESS: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }
    case CONSTANT.REQUEST_SIMILAR_MOVIE_ERROR: {
      return Object.assign({}, state, PickOnlyDataAndStatus(action.payload));
    }
    default: {
      return state;
    }
  }
};

export {
  movieCastReducer,
  movieDetailReducer,
  similarMovieReducer,
};
