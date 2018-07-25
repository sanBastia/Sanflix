import CONSTANT from './constant';

const RequestEarlyBalance = () => ({
  type: CONSTANT.REQUEST_EARLY_BALANCE,

});

const RequestBonusBalance = () => ({
  type: CONSTANT.REQUEST_BONUS_BALANCE,

});


export {
  RequestEarlyBalance,
  RequestBonusBalance,
};
