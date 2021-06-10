// https://jerryjerryjerry.tistory.com/26
// https://bigtop.tistory.com/64?category=827794
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import GenerateMonth from './GenerateMonth';

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

  const convertUnixToDate = (unix) => {
    console.log(unix);
    return new Date(unix)
  };
  console.log('viewDate = ',viewDate);

  useEffect(() => {
    setViewYear(
      viewDate.getFullYear()
    );
    setViewMonth(
      viewDate.getMonth() + 1
    );
  }, [viewDate]);

  const handleClickCalendar = (e) => {
    const isNext = e.target.ariaLabel.includes('다음달');
    const date = new Date(viewDate);
    setViewDate(
      isNext
      ? date.getDate() + 1
      : date.getDate() - 1
    );
  }

  return (
    <main>
      <Header>
        <button onClick={(e) => handleClickCalendar(e)} aria-label="이전달">
          &lt;
        </button>
        <h1>
          {viewDate.toString()}
        </h1>
        <button onClick={(e) => handleClickCalendar(e)} aria-label="다음달">
          &gt;
        </button>
      </Header>
      <CalendarDays />
      <GenerateMonth
        year={viewYear}
        month={viewMonth}
       />
    </main>
  );
};

export default Calendar;
