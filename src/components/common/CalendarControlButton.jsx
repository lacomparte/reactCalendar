import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarControlButton = ({ year, month, type, handleClickButton }) => {
  return (
    <StyledHeader>
      <StyledButton onClick={handleClickButton} aria-label={type === month ? '이전달' : '이전주'}>
        &lt;
      </StyledButton>
      <h1>
        {year}년 {month} 월
      </h1>
      <StyledButton onClick={handleClickButton} aria-label={type === month ? '다음달' : '다음주'}>
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};

export default CalendarControlButton;
