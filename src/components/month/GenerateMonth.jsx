import React, { useState, useEffect } from 'react';
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
  font-weight: bold;
  color: ${({ isToday }) => (isToday ? 'red' : 'white')};
  opacity: ${({ isCurrent }) => !isCurrent && '0.5'};
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const GenerateMonth = ({ year, month, handleClickOpenModal }) => {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
  }, [year, month]);
  const now = formattingDate(new Date());
  // 이번달 첫번째 날짜
  const currentMonthFirstFullDate = getDate(year, month, 1);

  // 이번달 마지막 날짜
  const currentMonthLastFullDate = getDate(year, month + 1, 0);
  // 이번달 첫번째 요일
  const currentMonthFirstDay = currentMonthFirstFullDate.getDay();
  // 이번달 마지막 요일
  const currentMonthLastDay = currentMonthLastFullDate.getDay();

  const currentMonth = Array.from({ length: currentMonthLastFullDate.getDate() }, (_, i) => {
    return {
      date: getDate(year, month, i + 1),
      current: true,
    };
  });

  /**
   * 이전달 배열 만들기
   **/
  // 이전달 마지막 날짜
  const prevMonthLastFullDate = getDate(year, month, 0);
  // 이전달 마지막 날
  const prevMonthLastDate = prevMonthLastFullDate.getDate();
  // 이전달 마지막 요일
  const prevMonthLastDay = prevMonthLastFullDate.getDay();

  const prevMonth = Array.from({ length: currentMonthFirstDay }, (_, i) => {
    return {
      date: getDate(year, month - 1, prevMonthLastDate - i),
      current: false,
    };
  }).reverse();

  /**
   * 다음달 배열 만들기
   **/
  const nextMonthLength = 42 - [...prevMonth, ...currentMonth].length;
  const nextMonth = Array.from({ length: nextMonthLength }, (_, i) => {
    return {
      date: getDate(year, month + 1, i + 1),
      current: false,
    };
  });

  /**
   * 이전달, 이번달, 다음달 달력 합치기
   */
  const viewMonth = [...prevMonth, ...currentMonth, ...nextMonth];

  return (
    <>
      {isFetching && (
        <StyledCalendarList>
          {viewMonth.map(({ date, current }) => {
            const isToday = formattingDate(date) === now;
            return (
              <li key={date}>
                <StyledButton onClick={() => handleClickOpenModal(date, true)}>
                  <StyledDate isCurrent={current} isToday={isToday}>
                    {new Date(date).getDate()}일
                  </StyledDate>
                </StyledButton>
              </li>
            );
          })}
        </StyledCalendarList>
      )}
    </>
  );
};

export default GenerateMonth;
