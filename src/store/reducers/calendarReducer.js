const INITIAL_STATE = {
  month: new Date(),
};

const setCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "SET_MONTH":
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default setCalendar;
