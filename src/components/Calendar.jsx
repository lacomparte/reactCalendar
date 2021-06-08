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

const CalendarDates = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  /*
  [
    [30, 31, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 1, 2, 3]
  ]
  */ 
  let days = [];

  // 이전달 full date
  const prevMonthLastFullDate = new Date(year, month, 0);
  // 이번달 full date
  const currentMonthLastFullDate = new Date(year, month + 1, 0);

  // 이전달 마지막 날
  const prevLastDate = prevMonthLastFullDate.getDate();
  // 이전달 마지막 요일
  const prevLastDay = prevMonthLastFullDate.getDay();

  // 이전달 마지막 날 - 이전달 마지막 요일
  const prevDays = prevLastDate - prevLastDay;

  for(let i = prevDays; i <= prevLastDate; i++) {
    days.push(i);
  }

  // 이번달 마지막 날
  const currentDate = currentMonthLastFullDate.getDate();
  // 이번달 마지막 요일
  const currentDay = currentMonthLastFullDate.getDay();

  for(let j = 1; j <= currentDate; j++) {
    days.push(j);
  }

  // 이번달 weeks
  const currentWeeks = Math.ceil(days.length / 7);

  const create2DepthDate = days.reduce((acc, cur, index) => {
    const multiple = ((index ) / 7);
    const arrayIndex = Math.floor(multiple);
    acc[arrayIndex][index] = cur;
    return acc;
  }, Array.from(Array(currentWeeks), () => Array(7)));

  console.log('create2DepthDate = ',create2DepthDate);

  // 다음달
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  

  return (
    <article aria-label="날짜">
      
    </article>
  );
}

const Calendar = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

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
      <CalendarDates />
    </main>
  );
};

export default Calendar;
