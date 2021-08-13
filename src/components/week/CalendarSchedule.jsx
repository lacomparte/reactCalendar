import React from 'react';
import styled from 'styled-components';

const StyledTime = styled.ol`
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  gap: 1px;
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
  gap: 1px;
  width: 100%;
  color: white;

  li {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    background: #3c3c3c;
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
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  gap: 1px;
  background: black;

  li {
    height: 100px;
  }
`;

const CalendarSchedule = ({ weekCalendar, handleClickOpenModal }) => {
  const time24 = Array.from({ length: 24 }, (_, i) => i + 1);
  const time12 = Array.from({ length: 24 }, (_, i) => ((i + 11) % 12) + 1);

  const generateDate = (date) => {
    const makeDate = Array.from({ length: 24 }, (_, i) => new Date(date).setHours(i, 0, 0, 0));
    return (
      <StyledTimeTable>
        {makeDate.map((date, index) => {
          const convertedDateFormat = (date) => new Date(date).setHours(index, 0, 0);
          return <li aria-label={`${index} 시`} key={new Date(convertedDateFormat(date))}></li>;
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
          return (
            <li
              onClick={(e) => {
                const hour = e.target.ariaLabel.replace(/[^0-9]/g, '');
                handleClickOpenModal(true, date, hour);
              }}
              key={date}
            >
              {generateDate(date)}
            </li>
          );
        })}
      </StyledSchedule>
    </StyledTimeWrap>
  );
};

export default React.memo(CalendarSchedule);
