export const setSchedule = ({ schedule }) => {
  console.log(schedule);
  return {
    type: 'SET_SCHEDULE',
    payload: schedule,
  };
};
