import { Badge } from 'reactstrap';

const SuccessOrError = status => status === 'success';

const PickOnlyDataAndStatus = (payload) => {
  // only pick data inside data object and status from payload
  const { response: { data }, status } = payload;

  // return the data and status
  return ({ data, status });
};

const GetPrices = (rate) => {
  if (rate > 1 && rate < 3) {
    return 'Rp. 3.500';
  }
  if (rate > 3 && rate < 6) {
    return 'Rp. 8.250';
  }

  if (rate > 6 && rate < 8) {
    return 'Rp. 16.350';
  }
  if (rate > 8 && rate < 10) {
    return 'Rp. 21.250';
  }
  return 'Coming Soon';
};


export {
  SuccessOrError,
  PickOnlyDataAndStatus,
  GetPrices,
};
