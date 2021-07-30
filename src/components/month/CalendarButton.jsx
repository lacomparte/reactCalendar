import React from 'react';
import styled from 'styled-components';
import { setCurrentMonth } from '@/store/actions';
import { useDispatch } from 'react-redux';

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarButton = ({ viewCalendar, year, month }) => {
  const dispatch = useDispatch();
  const handleClickButton = (e) => {
    const isNext = e.target.ariaLabel.includes('다음달');
    const date = new Date(viewCalendar);
    const currentMonth = new Date(date).getMonth();
    const changeMonth = isNext
      ? new Date(date).setMonth(currentMonth + 1)
      : new Date(date).setMonth(currentMonth - 1);

    console.log(new Date(changeMonth));
    dispatch(setCurrentMonth({ currentMonth: new Date(changeMonth) }));
  };

  return (
    <StyledHeader>
      <StyledButton onClick={(e) => handleClickButton(e)} aria-label="이전달">
        &lt;
      </StyledButton>
      <h1>
        {year}년 {month}월
      </h1>
      <StyledButton onClick={(e) => handleClickButton(e)} aria-label="다음달">
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};

export default CalendarButton;
