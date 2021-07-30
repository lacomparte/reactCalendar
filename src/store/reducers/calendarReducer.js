const INITIAL_STATE = {
  currentMonth: new Date(),
};

const setCalendar = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case 'SET_CURRENT_MONTH':
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default setCalendar;
