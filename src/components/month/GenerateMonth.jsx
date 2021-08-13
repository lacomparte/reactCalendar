import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDate, formattingDate } from '@/utils';

const StyledCalendarList = styled.ol`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;

  li {
    position: relative;
    height: 100px;
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
  padding: 5px;
  box-sizing: border-box;
`;

const StyledSchedule = styled.div`
  position: absolute;
  top: 30px;
  left: 3px;
  right: 3px;
  bottom: 0;
`;

const StyledScheduledItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 3px;
  color: white;
  text-align: left;

  &:: before {
    flex: 0 0 4px;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    margin: 0 5px;
    background: ${({ itemColor }) => itemColor};
    content: '';
  }

  & + p {
    margin-top: 4px;
  }
`;

const StyledScheduledBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GenerateMonth = ({ year, month, handleClickOpenModal, data }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
  }, [year, month, data]);

  const now = formattingDate(new Date());
  const hour = new Date().getHours();
  const min = new Date().getMinutes();

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
      date: getDate(year, month, i + 1, hour, min),
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
      date: getDate(year, month - 1, prevMonthLastDate - i, hour, min),
      current: false,
    };
  }).reverse();

  /**
   * 다음달 배열 만들기
   **/
  const nextMonthLength = 42 - [...prevMonth, ...currentMonth].length;
  const nextMonth = Array.from({ length: nextMonthLength }, (_, i) => {
    return {
      date: getDate(year, month + 1, i + 1, hour, min),
      current: false,
    };
  });

  /**
   * 이전달, 이번달, 다음달 달력 합치기
   */
  const viewMonth = [...prevMonth, ...currentMonth, ...nextMonth];

  const CurrentDaySchedule = (date) => {
    if (!data) return;

    const filtered = data.filter(
      (item) => new Date(item.key).getDate() === new Date(date).getDate(),
    );
    const randomColor = '#' + Math.random().toString(16).substr(-6);

    return filtered.map((item, idx) => {
      return (
        <StyledScheduledItemButton key={idx} itemColor={randomColor}>
          <StyledScheduledBox>{item.title}</StyledScheduledBox>
        </StyledScheduledItemButton>
      );
    });
  };

  return (
    <>
      {isFetching && (
        <StyledCalendarList>
          {viewMonth.map(({ date, current }) => {
            const isToday = formattingDate(date) === now;
            const hour = new Date(date).getHours();
            const min = new Date(date).getMinutes();

            return (
              <li key={date}>
                <StyledButton onClick={() => handleClickOpenModal(true, date, hour, min)}>
                  <StyledDate isCurrent={current} isToday={isToday}>
                    {new Date(date).getDate()}일
                  </StyledDate>
                </StyledButton>
                <StyledSchedule>{CurrentDaySchedule(date)}</StyledSchedule>
              </li>
            );
          })}
        </StyledCalendarList>
      )}
    </>
  );
};

export default GenerateMonth;
