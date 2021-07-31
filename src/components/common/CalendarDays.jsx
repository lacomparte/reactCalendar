import React from 'react';
import styled from 'styled-components';

const Week = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  width: 100%;
  margin-bottom: 1px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-weight: bold;
    color: white;
    background: #252525;
  }
`;

const CalendarDays = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Week aria-label="요일">
      {days.map((day, idx) => (
        <li key={idx}>{day}</li>
      ))}
    </Week>
  );
};

export default React.memo(CalendarDays);
