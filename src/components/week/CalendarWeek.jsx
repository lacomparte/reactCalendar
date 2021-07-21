import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarDays from "@/components/common/CalendarDays";
import GenerateWeek from "@/components/week/GenerateWeek";

const Header = styled.header`
  display: flex;
`;

const Calendar = () => {
  return (
    <main>
      <Header>
        <button aria-label="이전주">&lt;</button>
        <h1>{/* {viewYear}년{viewMonth}월 */}</h1>
        <button aria-label="다음주">&gt;</button>
      </Header>
      <CalendarDays />
      {/* <GenerateWeek year={viewYear} month={viewMonth} /> */}
    </main>
  );
};

export default Calendar;
