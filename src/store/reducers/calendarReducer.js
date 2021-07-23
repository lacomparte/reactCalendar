const INITIAL_STATE = {
  month: new Date(),
  maxWeek: 0,
};

const setCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "SET_MONTH":
      return { ...state, ...actions.payload };
    case "SET_MAX_WEEK":
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default setCalendar;
