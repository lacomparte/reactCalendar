import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCalendar } from '@/store/actions';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarControlButton from '@/components/common/CalendarControlButton';
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
  const dispatch = useDispatch();
  const viewCalendar = useSelector((state) => state.calendarReducer.currentCalendar);

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

  const handleClickButton = (direction) => {
    const isNext = direction === 'next';
    const currentDate = new Date(viewCalendar).getDate();
    const changeDate = isNext ? currentDate + 7 : currentDate - 7;
    const newDate = new Date(new Date(viewCalendar).setDate(+changeDate));
    dispatch(setCurrentCalendar({ currentCalendar: new Date(newDate) }));
  };

  const TimeTable = () => {
    return (
      <StyledTime>
        {time12.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </StyledTime>
    );
  };

  return (
    <div>
      <CalendarControlButton
        year={year}
        month={month}
        type="week"
        handleClickButton={handleClickButton}
      />
      <StyledWrap>
        {TimeTable()}
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek currentDate={currentDate} />
        </StyledCalendarWrap>
      </StyledWrap>
    </div>
  );
};

export default Calendar;
