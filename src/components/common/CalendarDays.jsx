import React from "react";
import styled from "styled-components";

const Week = styled.article`
  ul {
    width: 100%;
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
    text-align: center;
    li {
      flex: 1 1 calc(100% / 7);
    }
  }
`;

const CalendarDays = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <Week aria-label="요일">
        <ul>
          {days.map((day, idx) => (
            <li key={idx}>{day}</li>
          ))}
        </ul>
      </Week>
    </>
  );
};

export default CalendarDays;
