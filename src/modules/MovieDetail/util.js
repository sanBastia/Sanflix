import { Badge } from 'reactstrap';

const SuccessOrError = status => status === 'success';

const PickOnlyDataAndStatus = (payload) => {
  // only pick data inside data object and status from payload
  const { response: { data }, status } = payload;

  // return the data and status
  return ({ data, status });
};


const GetRatings = async (data) => await data.Ratings;


export {
  SuccessOrError,
  PickOnlyDataAndStatus,
  GetRatings,
};
