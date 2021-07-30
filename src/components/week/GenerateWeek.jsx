import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formattingDate } from '@/utils';

const StyledDays = styled.ol`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;

  li {
    flex: 1 1 calc(100% / 7);
    text-align: center;
  }
`;

const StyledDate = styled.span`
  background: white;
  color: ${({ isToday }) => (isToday ? 'red' : 'black')};
  content: ${({ isToday }) => isToday};
`;

const GenerateWeek = ({ currentDate }) => {
  const [weekCalendar, setWeekCalendar] = useState([]);
  const now = formattingDate(new Date());

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

  return (
    <StyledDays>
      {weekCalendar.map((date) => {
        const isToday = formattingDate(date) === now;
        return (
          <li key={date}>
            <StyledDate isToday={isToday}>{new Date(date).getDate()}</StyledDate>
          </li>
        );
      })}
    </StyledDays>
  );
};

export default GenerateWeek;
