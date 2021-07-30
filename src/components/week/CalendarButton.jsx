import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarButton = ({ handleClickButton, year, month }) => {
  return (
    <StyledHeader>
      <StyledButton onClick={handleClickButton} aria-label="이전주">
        &lt;
      </StyledButton>
      <h1>
        {year}년 {month} 월
      </h1>
      <StyledButton onClick={handleClickButton} aria-label="다음주">
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};

export default CalendarButton;
