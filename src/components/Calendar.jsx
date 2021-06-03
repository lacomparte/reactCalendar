// https://jerryjerryjerry.tistory.com/26
// https://bigtop.tistory.com/64?category=827794
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

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
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

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
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  // 
  const prevMonthLastDay = new Date(year, month, 0);
  const currentMonthLastDay = new Date(year, month + 1, 0);

  const prevDate = prevMonthLastDay.getDate();
  const prevDay = prevMonthLastDay.getDay();

  const currentDate = currentMonthLastDay.getDate();
  const currentDay = currentMonthLastDay.getDay();

  console.log(prevDate, prevDay, currentDate, currentDay);
  return (
    <main>
      <Header>
        <button>&lt;</button>
        <h1>
          {year}년 {month}월
        </h1>
        <button>&gt;</button>
      </Header>
      <CalendarDays />
      <article aria-label="날짜"></article>
    </main>
  );
};

export default Calendar;
