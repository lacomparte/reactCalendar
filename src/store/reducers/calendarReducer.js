const INITIAL_STATE = {
  schedule: {},
};

const setSchedule = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case 'SET_SCHEDULE':
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default setSchedule;
