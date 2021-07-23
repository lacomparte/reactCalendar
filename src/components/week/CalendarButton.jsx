import React from "react";
import styled from "styled-components";
import { setMonth } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";

const StyledButton = styled.button``;

const StyledHeader = styled.header`
  display: flex;
`;

const CalendarButton = ({ weekIndex, setWeekIndex, viewYear, viewMonth }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendarReducer);

  console.log(state);

  const handleClickButton = (e) => {
    const isNext = e.target.ariaLabel.includes("다음주");
    if (isNext) {
      if (weekIndex === state.maxWeek) {
        setWeekIndex(0);
        dispatch(setMonth({}));
      } else {
        setWeekIndex(weekIndex + 1);
      }
    } else {
    }
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
        {viewYear}년 {viewMonth} 월 {weekIndex + 1}주
      </h1>
      <StyledButton onClick={(e) => handleClickButton(e)} aria-label="다음주">
        &gt;
      </StyledButton>
    </StyledHeader>
  );
};

export default CalendarButton;
