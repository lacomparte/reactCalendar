import React from 'react';
import styled from 'styled-components';

const StyledTime = styled.ol`
  width: 50px;
  li {
    width: 50px;
    height: 100px;
    font-weight: bold;
    color: white;
  }
`;

const StyledSchedule = styled.ol`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 1;
  width: 100%;
  color: white;

  li {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
  }
`;

const StyledTimeWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 200px);
`;

const StyledTimeTable = styled.ol`
  li {
    height: 100px;
  }
`;

const TimeTable = ({ weekCalendar }) => {
  const time24 = Array.from({ length: 24 }, (_, i) => i + 1);
  const time12 = Array.from({ length: 24 }, (_, i) => ((i + 11) % 12) + 1);

  const generateDate = (date) => {
    const makeDate = Array.from({ length: 24 }, (_, i) => new Date(date).setHours(i, 0, 0, 0));
    return (
      <StyledTimeTable>
        {makeDate.map((date) => {
          return <li key={new Date(date)}></li>;
        })}
      </StyledTimeTable>
    );
  };

  return (
    <StyledTimeWrap>
      <StyledTime>
        {time12.map((item, idx) => {
          return (
            <li key={idx}>
              <span>{item}</span>
            </li>
          );
        })}
      </StyledTime>
      <StyledSchedule>
        {weekCalendar.map((date) => {
          return <li key={date}>{generateDate(date)}</li>;
        })}
      </StyledSchedule>
    </StyledTimeWrap>
  );
};

export default React.memo(TimeTable);
