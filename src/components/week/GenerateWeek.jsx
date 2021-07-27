import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const GenerateWeek = ({ currentDate }) => {
  const [weekCalendar, setWeekCalendar] = useState([]);

  useEffect(() => {
    const today = new Date(currentDate);
    const todayDay = new Date(today).getDay();
    const todayDate = new Date(today).getDate();
    const betweenLastDayOfWeek = 7 - todayDay;

    const firstDateToCurrentDate = Array.from(
      { length: todayDay },
      (_, i) => new Date(new Date(today).setDate(todayDate - (i + 1)))
    ).reverse();

    const lastDateToCurrentDate = Array.from(
      { length: betweenLastDayOfWeek },
      (_, i) => new Date(new Date(today).setDate(todayDate + i))
    );

    const weekCalendar = [...firstDateToCurrentDate, ...lastDateToCurrentDate];
    setWeekCalendar(weekCalendar);
  }, [currentDate]);

  return (
    <StyledDays>
      {weekCalendar.map((date) => {
        return (
          <li key={date}>
            <span>{new Date(date).getDate()}</span>
          </li>
        );
      })}
    </StyledDays>
  );
};

export default GenerateWeek;
