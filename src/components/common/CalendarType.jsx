import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 4px 10px;
  margin-right: 10px;
  border-radius: 4px;
  font-weight: ${({ calendarType }) => (calendarType ? 'bold' : 'normal')};
  color: ${({ calendarType }) => (calendarType ? 'white' : '#808080')};
`;

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledTodayButton = styled.button`
  padding: 4px 10px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
`;

const CalendarType = ({ calendarType, handleClickCalendarType, handleChangeViewCalendar }) => {
  const handleClickToday = () => {
    handleChangeViewCalendar(new Date());
  };
  return (
    <StyledWrap>
      <div>
        <StyledButton
          calendarType={calendarType === 'month'}
          onClick={() => handleClickCalendarType('month')}
          type="button"
          aria-label="월 단위"
        >
          월 단위
        </StyledButton>
        <StyledButton
          calendarType={calendarType === 'week'}
          onClick={() => handleClickCalendarType('week')}
          type="button"
          aria-label="주 단위"
        >
          주 단위
        </StyledButton>
      </div>
      <div>
        <StyledTodayButton onClick={handleClickToday}>오늘</StyledTodayButton>
      </div>
    </StyledWrap>
  );
};

export default React.memo(CalendarType);
