import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenerateMonth from "../components/GenerateMonth";
import CalendarType from "../components/CalendarType";

const Header = styled.header`
  display: flex;
`;

const Week = styled.article`
  ul {
    width: 100%;
    list-style-type: none;
    display: flex;
    li {
      flex: 1 1 calc(100% / 7);
    }
  }
`;
const CalendarDays = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <Week aria-label="요일">
        <ul>
          {week.map((day, idx) => (
            <li key={idx}>{day}</li>
          ))}
        </ul>
      </Week>
    </>
  );
};

const Calendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    setViewYear(new Date(viewDate).getFullYear());
    setViewMonth(new Date(viewDate).getMonth() + 1);
  }, [viewDate]);

  const changeDate = (date, isNext) => {
    const dateObject = new Date(`${date}`);
    const currentMonth = new Date(dateObject).getMonth();
    const changeMonth = isNext
      ? new Date(dateObject).setMonth(currentMonth + 1)
      : new Date(dateObject).setMonth(currentMonth - 1);

    // console.log(new Date(changeMonth));
    return new Date(changeMonth);
  };

  const handleClickCalendar = (e) => {
    const isNext = e.target.ariaLabel.includes("다음달");
    const date = new Date(viewDate);

    setViewDate(changeDate(date, isNext));
  };

  return (
    <main>
      <CalendarType />
      <Header>
        <button onClick={(e) => handleClickCalendar(e)} aria-label="이전달">
          &lt;
        </button>
        <h1>
          {viewYear}년 {viewMonth}월
        </h1>
        <button onClick={(e) => handleClickCalendar(e)} aria-label="다음달">
          &gt;
        </button>
      </Header>
      <CalendarDays />
      <GenerateMonth year={viewYear} month={viewMonth} />
    </main>
  );
};

export default Calendar;
