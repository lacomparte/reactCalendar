import React from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarButton = () => {
  const handleClickCalendar = (e) => {
    const isNext = e.target.ariaLabel.includes("다음달");
    const date = new Date(viewDate);

    setViewDate(changeDate(date, isNext));
  };
  return (
    <StyledHeader>
      <StyledButton onClick={(e) => handleClickCalendar(e)} aria-label="이전달">
        &lt;
      </StyledButton>
      <h1>
        {viewYear}년 {viewMonth}월
      </h1>
      <StyledButton onClick={(e) => handleClickCalendar(e)} aria-label="다음달">
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};
