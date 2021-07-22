import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarDays from "@/components/common/CalendarDays";
import CalendarButton from "@/components/month/CalendarButton";
import GenerateWeek from "@/components/week/GenerateWeek";

const Header = styled.header`
  display: flex;
`;

const StyledTime = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledWrap = styled.div`
  display: flex;
`;

const StyledCalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Calendar = ({ viewCalendar }) => {
  const [viewYear, setViewYear] = useState();
  const [viewMonth, setViewMonth] = useState();

  useEffect(() => {
    setViewYear(new Date(`${viewCalendar}`).getFullYear());
    setViewMonth(new Date(`${viewCalendar}`).getMonth() + 1);
  }, [viewCalendar]);

  const time24 = Array.from({ length: 24 }, (_, i) => i + 1);
  const time12 = Array.from({ length: 24 }, (_, i) => ((i + 11) % 12) + 1);

  const TimeTable = () => {
    return (
      <StyledTime>
        {time12.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </StyledTime>
    );
  };

  return (
    <main>
      <CalendarButton
        viewCalendar={viewCalendar}
        viewYear={viewYear}
        viewMonth={viewMonth}
      />
      <StyledWrap>
        {TimeTable()}
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek setYear={viewYear} setMonth={viewMonth} />
        </StyledCalendarWrap>
      </StyledWrap>
    </main>
  );
};

export default Calendar;
