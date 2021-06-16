import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: ${(props) => (props.isActive ? "red" : "blue")};
`;

const CalendarType = () => {
  const [isMonthActive, setIsMonthActive] = useState(true);
  const [isWeekActive, setIsWeekActive] = useState(false);

  const handleClickChangeType = () => {};

  return (
    <div>
      <StyledButton type="button" aria-label="월 단위">
        월 단위
      </StyledButton>
      <StyledButton type="button" aria-label="주 단위">
        주 단위
      </StyledButton>
    </div>
  );
};

export default CalendarType;
