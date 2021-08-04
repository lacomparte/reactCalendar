import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCalendar } from '@/store/actions';
import CalendarSchedule from './CalendarSchedule';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarControlButton from '@/components/common/CalendarControlButton';
import GenerateWeek from '@/components/week/GenerateWeek';

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledCalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding-left: 50px;
  box-sizing: border-box;
`;

const Calendar = () => {
  const dispatch = useDispatch();
  const viewCalendar = useSelector((state) => state.calendarReducer.currentCalendar);

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [weekCalendar, setWeekCalendar] = useState([]);

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
    setCurrentDate(viewCalendar);
  }, [viewCalendar]);

  useEffect(() => {
    const viewCurrentDate = new Date(currentDate);
    const viewDay = new Date(viewCurrentDate).getDay();
    const viewDate = new Date(viewCurrentDate).getDate();
    const betweenLastDayOfWeek = 7 - viewDay;

    const firstDateToCurrentDate = Array.from(
      { length: viewDay },
      (_, i) => new Date(new Date(viewCurrentDate).setDate(viewDate - (i + 1))),
    ).reverse();

    const lastDateToCurrentDate = Array.from(
      { length: betweenLastDayOfWeek },
      (_, i) => new Date(new Date(viewCurrentDate).setDate(viewDate + i)),
    );

    const weekCalendar = [...firstDateToCurrentDate, ...lastDateToCurrentDate];
    setWeekCalendar(weekCalendar);
  }, [currentDate]);

  const handleClickButton = (direction) => {
    const isNext = direction === 'next';
    const currentDate = new Date(viewCalendar).getDate();
    const changeDate = isNext ? currentDate + 7 : currentDate - 7;
    const newDate = new Date(new Date(viewCalendar).setDate(+changeDate));
    dispatch(setCurrentCalendar({ currentCalendar: new Date(newDate) }));
  };

  console.log(weekCalendar);
  return (
    <>
      <CalendarControlButton
        year={year}
        month={month}
        type="week"
        handleClickButton={handleClickButton}
      />
      <StyledWrap>
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek weekCalendar={weekCalendar} />
        </StyledCalendarWrap>
        <CalendarSchedule weekCalendar={weekCalendar} />
      </StyledWrap>
    </>
  );
};

export default Calendar;

// [
//   {
//     '2021': {
//       '01': {
//         '01' : {
//           'Mon Jan 01 2021 18:00:00 GMT+0900 (한국 표준시)': {
//             task: '밥먹기',
//             duration: 30,
//             isAllDay: false,
//           }.
//           'Mon Jan 01 2021 21:00:00 GMT+0900 (한국 표준시)': {
//             task: '잠자기',
//             duration: 90,
//             isAllDay: false,
//           }.
//           'Mon Jan 01 2021 00:00:00 GMT+0900 (한국 표준시)': {
//             task: '시험준비',
//             duration: null,
//             isAllDay: true,
//           }.
//         }
//       }
//     }
//   }
// ]
