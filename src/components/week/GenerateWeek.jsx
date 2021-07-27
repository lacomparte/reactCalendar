import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formattingDate } from "@/utils";

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
  color: ${({ isToday }) => (isToday ? "red" : "black")};
  content: ${({ isToday }) => isToday};
`;

const GenerateWeek = ({ currentDate }) => {
  const [weekCalendar, setWeekCalendar] = useState([]);
  const now = formattingDate(new Date());

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
        const isToday = formattingDate(date) === now;
        return (
          <li key={date}>
            <StyledDate isToday={isToday}>
              {new Date(date).getDate()}
            </StyledDate>
          </li>
        );
      })}
    </StyledDays>
  );
};

export default GenerateWeek;
