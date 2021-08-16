import React from 'react';
import styled from 'styled-components';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const StyledButton = styled.button`
  width: 30px;
  height: 40px;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
`;

const StyledTitle = styled.h1`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  font-size: 20px;
`;

const CalendarControlButton = ({ year, month, type, handleClickButton }) => {
  return (
    <StyledHeader>
      <StyledButton
        onClick={() => handleClickButton('prev')}
        aria-label={type === month ? '이전달' : '이전주'}
      >
        <AiFillCaretLeft color="white" />
      </StyledButton>
      <StyledTitle>
        {year}년 {month}월
      </StyledTitle>
      <StyledButton
        onClick={() => handleClickButton('next')}
        aria-label={type === month ? '다음달' : '다음주'}
      >
        <AiFillCaretRight color="white" />
      </StyledButton>
    </StyledHeader>
  );
};

export default React.memo(CalendarControlButton);
