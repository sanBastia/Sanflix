const SuccessOrError = status => status === 'success';

const PickOnlyDataAndStatus = (payload) => {
  // only pick data inside data object and status from payload
  const { response: { data }, status } = payload;

  // return the data and status
  return ({ data, status });
};

const checkNA = (data, templatedata) => data === 'N/A' ? templatedata : data;


export {
  SuccessOrError,
  PickOnlyDataAndStatus,
  checkNA,
};
