import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setMaxWeek } from "@/store/actions";
import { getDate } from "@/utils";

const StyledDays = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;

  li {
    flex: 1 1 calc(100% / 7);
  }
`;

const GenerateWeek = ({ weekIndex, setYear, setMonth }) => {
  const dispatch = useDispatch();

  // 이번달 첫번째 날짜
  const currentMonthFirstFullDate = getDate(setYear, setMonth, 1);

  // 이번달 마지막 날짜
  const currentMonthLastFullDate = getDate(setYear, setMonth + 1, 0);

  // 이번달 첫번째 요일
  const currentMonthFirstDay = currentMonthFirstFullDate.getDay();

  // 이번달 마지막 요일
  const currentMonthLastDay = currentMonthLastFullDate.getDay();

  // length: 생성할 배열의 길이를 정함
  // cb: length 만큼 실행할 함수
  const currentMonth = Array.from(
    { length: currentMonthLastFullDate.getDate() },
    (_, i) => getDate(setYear, setMonth, i + 1)
  );

  /**
   * 이전달 배열 만들기
   **/
  // 이전달 마지막 날짜
  const prevMonthLastFullDate = getDate(setYear, setMonth, 0);

  // 이전달 마지막 날
  const prevMonthLastDate = prevMonthLastFullDate.getDate();

  // 이전달 마지막 요일
  const prevMonthLastDay = prevMonthLastFullDate.getDay();

  const prevMonth = Array.from({ length: currentMonthFirstDay }, (_, i) =>
    getDate(setYear, setMonth - 1, prevMonthLastDate - i)
  ).reverse();

  /**
   * 다음달 배열 만들기
   **/
  const nextMonth = Array.from(
    { length: 7 - (currentMonthLastDay + 1) },
    (_, i) => getDate(setYear, setMonth + 1, i + 1)
  );

  const viewMonth = [...prevMonth, ...currentMonth, ...nextMonth];

  const weekCalendar = Array.from(
    { length: Math.ceil(viewMonth.length / 7) },
    (_, i) => {
      const divide = i * 7;
      return viewMonth.slice(divide, divide + 7);
    }
  );

  dispatch(setMaxWeek({ maxWeek: weekCalendar.length }));

  return (
    <StyledDays>
      {weekCalendar[weekIndex]?.map((date) => {
        return (
          <li key={date}>
            <span>{new Date(date).getDate()}</span>
          </li>
        );
      })}
    </StyledDays>
  );
};

export default GenerateWeek;
