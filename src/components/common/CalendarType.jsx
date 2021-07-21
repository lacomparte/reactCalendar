import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: ${(props) => (props.calendarType ? "red" : "blue")};
`;

const CalendarType = ({ calendarType, handleClickCalendarType }) => {
  return (
    <div>
      <StyledButton
        calendarType={calendarType.month}
        onClick={() => handleClickCalendarType({ week: false, month: true })}
        type="button"
        aria-label="월 단위"
      >
        월 단위
      </StyledButton>
      <StyledButton
        calendarType={calendarType.week}
        onClick={() => handleClickCalendarType({ week: true, month: false })}
        type="button"
        aria-label="주 단위"
      >
        주 단위
      </StyledButton>
    </div>
  );
};

export default CalendarType;
