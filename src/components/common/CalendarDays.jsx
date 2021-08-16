import React from 'react';
import styled from 'styled-components';

const StyledWeekWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  width: 100%;
  margin-bottom: 1px;
`;

const SwyledWeekLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-weight: bold;
  color: ${({ isSunday, isSaturday }) => (isSunday ? 'red' : isSaturday ? '#6c6cff' : 'white')};
  background: #252525;
`;

const CalendarDays = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <StyledWeekWrap aria-label="요일">
      {days.map((day, idx) => (
        <SwyledWeekLi isSunday={day === '일'} isSaturday={day === '토'} key={idx}>
          {day}
        </SwyledWeekLi>
      ))}
    </StyledWeekWrap>
  );
};

export default React.memo(CalendarDays);
