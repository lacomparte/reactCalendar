import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setMonth } from "@/store/actions";
import CalendarDays from "@/components/common/CalendarDays";
import CalendarButton from "@/components/week/CalendarButton";
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
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendarReducer);
  console.log(state);
  const [viewYear, setViewYear] = useState();
  const [viewMonth, setViewMonth] = useState();
  const [weekIndex, setWeekIndex] = useState(0);

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

  const handleClickControlButton = (isNext) => {
    if (isNext) {
      if (weekIndex === 0) {
        setWeekIndex();
      }
    }
  };

  return (
    <main>
      <p>주단위</p>
      <CalendarButton
        viewCalendar={viewCalendar}
        viewYear={viewYear}
        viewMonth={viewMonth}
        weekIndex={weekIndex}
        handleClickControlButton={() => handleClickControlButton}
      />
      <StyledWrap>
        {TimeTable()}
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek
            setYear={viewYear}
            setMonth={viewMonth}
            weekIndex={weekIndex}
          />
        </StyledCalendarWrap>
      </StyledWrap>
    </main>
  );
};

export default Calendar;
