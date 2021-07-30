const INITIAL_STATE = {
  currentCalendar: new Date(),
};

const setCurrentCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case 'SET_CURRENT_CALENDAR':
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default setCurrentCalendar;
