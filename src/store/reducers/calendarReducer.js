const INITIAL_STATE = {
  calendar: new Date(),
};

const setCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "SET_CALENDAR":
      return { ...actions.payload };
    default:
      return state;
  }
};

export default setCalendar;
