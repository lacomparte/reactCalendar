const INITIAL_STATE = {
  calendar: new Date().getMonth() + 1,
};

const viewCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "VIEW_CALENDAR":
      return [...state, actions.payload];
    default:
      return state;
  }
};

export default viewCalendar;
