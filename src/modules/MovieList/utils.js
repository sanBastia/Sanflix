const SuccessOrError = status => status === 'success';

const pickOnlyDataAndStatus = (payload) => {
  // only pick data inside data object and status from payload
  const { response: { data }, status } = payload;

  // return the data and status
  return ({ data, status });
};
export {
  SuccessOrError,
  pickOnlyDataAndStatus,
};
