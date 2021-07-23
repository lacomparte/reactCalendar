export const setMonth = (month) => {
  return {
    type: "SET_MONTH",
    payload: month,
  };
};

export const setMaxWeek = (maxWeek) => {
  return {
    type: "SET_MAX_WEEK",
    payload: maxWeek,
  };
};
