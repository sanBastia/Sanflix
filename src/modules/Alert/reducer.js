import CONSTANT from './constant';

const initialState = {
  balance: 0,
  status: true,
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANT.REQUEST_EARLY_BALANCE: {
      return Object.assign({}, state);
    }
    case CONSTANT.REQUEST_BONUS_BALANCE: {
      return Object.assign({}, state, { balance: 100000, status: false });
    }
    case CONSTANT.REQUEST_PURCHASE: {
      const res = state.balance - action.payload;
      console.log(typeof action.payload, 'type of price')
      console.log(typeof state.balance, 'type of balance')
      return Object.assign({}, state, { balance: res, status: false });
    }
    default: {
      return state;
    }
  }
};

export default balanceReducer;
