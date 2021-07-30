import React from 'react';
import styled from 'styled-components';
import { setCurrentMonth } from '@/store/actions';
import { useDispatch } from 'react-redux';

const StyledButton = styled.button`
  color: ${({ calendarType }) => (calendarType ? 'red' : 'blue')};
`;

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLeft = styled.div``;

const StyledRight = styled.div``;

const StyledTodayButton = styled.button``;

const CalendarType = ({ calendarType, handleClickCalendarType }) => {
  const dispatch = useDispatch();

  const handleClickToday = () => {
    dispatch(setCurrentMonth({ currentMonth: new Date() }));
  };
  return (
    <StyledWrap>
      <StyledLeft>
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
      </StyledLeft>
      <StyledRight>
        <StyledTodayButton onClick={handleClickToday}>오늘</StyledTodayButton>
      </StyledRight>
    </StyledWrap>
  );
};

export default CalendarType;
