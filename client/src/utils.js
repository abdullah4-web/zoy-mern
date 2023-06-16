export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const toFixed = (num, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return (Math.round(num * factor) / factor).toFixed(decimalPlaces);
};
