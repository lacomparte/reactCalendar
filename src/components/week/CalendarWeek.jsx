import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCurrentMonth } from '@/store/actions';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarButton from '@/components/week/CalendarButton';
import GenerateWeek from '@/components/week/GenerateWeek';

const StyledTime = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledWrap = styled.div`
  display: flex;
  width: 100%;
`;

const StyledCalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Calendar = () => {
  const viewCalendar = useSelector((state) => state.calendarReducer.currentMonth);
  const dispatch = useDispatch();

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
    setCurrentDate(viewCalendar);
  }, [viewCalendar]);

  const time24 = Array.from({ length: 24 }, (_, i) => i + 1);
  const time12 = Array.from({ length: 24 }, (_, i) => ((i + 11) % 12) + 1);

  const TimeTable = () => {
    return (
      <StyledTime>
        {time12.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </StyledTime>
    );
  };

  const handleClickButton = (e) => {
    const isNext = e.target.ariaLabel === '다음주';
    const _date = new Date(currentDate).getDate();
    const changeDate = isNext ? _date + 7 : _date - 7;

    const date = new Date(new Date(currentDate).setDate(+changeDate));
    dispatch(setCurrentMonth({ currentMonth: new Date(date) }));
  };

  return (
    <main>
      <CalendarButton year={year} month={month} handleClickButton={handleClickButton} />
      <StyledWrap>
        {TimeTable()}
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek currentDate={currentDate} />
        </StyledCalendarWrap>
      </StyledWrap>
    </main>
  );
};

export default Calendar;
