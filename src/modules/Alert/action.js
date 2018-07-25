import CONSTANT from './constant';

const RequestEarlyBalance = () => ({
  type: CONSTANT.REQUEST_EARLY_BALANCE,

});

const RequestBonusBalance = () => ({
  type: CONSTANT.REQUEST_BONUS_BALANCE,
});

const RequestPurchase = price => ({
  type: CONSTANT.REQUEST_PURCHASE,
  payload: price,
});


export {
  RequestEarlyBalance,
  RequestBonusBalance,
  RequestPurchase,
};
