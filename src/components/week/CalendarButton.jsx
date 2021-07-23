import React from "react";
import styled from "styled-components";
import { setCalendar } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarButton = ({ viewCalendar, viewYear, viewMonth }) => {
  const dispatch = useDispatch();

  const handleClickButton = (e) => {
    const isNext = e.target.ariaLabel.includes("다음주");
    // const date = new Date(viewCalendar);
    // const currentMonth = new Date(date).getMonth();
    // const changeMonth = isNext
    //   ? new Date(date).setMonth(currentMonth + 1)
    //   : new Date(date).setMonth(currentMonth - 1);

    // dispatch(setCalendar({ calendar: new Date(changeMonth) }));
  };

  return (
    <StyledHeader>
      <StyledButton onClick={(e) => handleClickButton(e)} aria-label="이전주">
        &lt;
      </StyledButton>
      <h1>
        {viewYear}년 {viewMonth}월
      </h1>
      <StyledButton onClick={(e) => handleClickButton(e)} aria-label="다음주">
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};

export default CalendarButton;
