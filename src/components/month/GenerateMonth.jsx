import React from 'react';
import styled from 'styled-components';
import { getDate, formattingDate } from '@/utils';

const StyledCalendarList = styled.ol`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;

  li {
    padding: 5px;
    height: 100px;
    box-sizing: border-box;
    text-align: right;
    background: #252525;
  }
`;

const StyledDate = styled.span`
  color: ${({ isToday }) => (isToday ? 'red' : 'white')};
  content: ${({ isToday }) => isToday};
`;

const GenerateMonth = ({ year, month }) => {
  const now = formattingDate(new Date());

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
        const isToday = formattingDate(date) === now;
        return (
          <li key={date}>
            <StyledDate isToday={isToday}>{new Date(date).getDate()}일</StyledDate>
          </li>
        );
      })}
    </StyledCalendarList>
  );
};

export default GenerateMonth;
