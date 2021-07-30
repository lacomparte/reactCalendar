import React from 'react';
import styled from 'styled-components';
import { getDate } from '@/utils';

const StyledCalendarList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;

  li {
    flex: 1 1 calc(100% / 7);
    padding: 5px;
    box-sizing: border-box;
    text-align: right;
  }
`;

const GenerateMonth = ({ year, month }) => {
  // 이번달 첫번째 날짜
  const currentMonthFirstFullDate = getDate(year, month, 1);

  // 이번달 마지막 날짜
  const currentMonthLastFullDate = getDate(year, month + 1, 0);
  // 이번달 첫번째 요일
  const currentMonthFirstDay = currentMonthFirstFullDate.getDay();
  // 이번달 마지막 요일
  const currentMonthLastDay = currentMonthLastFullDate.getDay();

  const currentMonth = Array.from({ length: currentMonthLastFullDate.getDate() }, (_, i) =>
    getDate(year, month, i + 1),
  );

  /**
   * 이전달 배열 만들기
   **/
  // 이전달 마지막 날짜
  const prevMonthLastFullDate = getDate(year, month, 0);
  // 이전달 마지막 날
  const prevMonthLastDate = prevMonthLastFullDate.getDate();
  // 이전달 마지막 요일
  const prevMonthLastDay = prevMonthLastFullDate.getDay();

  const prevMonth = Array.from({ length: currentMonthFirstDay }, (_, i) =>
    getDate(year, month - 1, prevMonthLastDate - i),
  ).reverse();

  /**
   * 다음달 배열 만들기
   **/
  const nextMonth = Array.from({ length: 7 - (currentMonthLastDay + 1) }, (_, i) =>
    getDate(year, month + 1, i + 1),
  );

  /**
   * 이전달, 이번달, 다음달 달력 합치기
   */
  const viewMonth = [...prevMonth, ...currentMonth, ...nextMonth];

  return (
    <StyledCalendarList>
      {viewMonth.map((date) => {
        return (
          <li key={date}>
            <button type="button">{new Date(date).getDate()}</button>
          </li>
        );
      })}
    </StyledCalendarList>
  );
};

export default GenerateMonth;
