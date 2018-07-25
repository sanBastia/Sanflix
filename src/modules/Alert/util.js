const convertToInteger = (price) => {
  const res = price.split(" ")[1].split(".").join("");
  return res;
};

export {
  convertToInteger,
};
