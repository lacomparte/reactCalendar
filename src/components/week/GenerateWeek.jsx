import React from "react";
import { getDate } from "@/utils";

const GenerateWeek = ({ year, month }) => {
  // 이번달 첫번째 날짜
  const currentMonthFirstFullDate = getDate(year, month, 1);

  // 이번달 마지막 날짜
  const currentMonthLastFullDate = getDate(year, month + 1, 0);

  // 이번달 첫번째 요일
  const currentMonthFirstDay = currentMonthFirstFullDate.getDay();

  // 이번달 마지막 요일
  const currentMonthLastDay = currentMonthLastFullDate.getDay();

  // length: 생성할 배열의 길이를 정함
  // cb: length 만큼 실행할 함수
  const currentMonth = Array.from(
    { length: currentMonthLastFullDate.getDate() },
    (_, i) => getDate(year, month, i + 1)
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
    getDate(year, month - 1, prevMonthLastDate - i)
  ).reverse();

  /**
   * 다음달 배열 만들기
   **/
  const nextMonth = Array.from(
    { length: 7 - (currentMonthLastDay + 1) },
    (_, i) => getDate(year, month + 1, i + 1)
  );

  const viewMonth = [...prevMonth, ...currentMonth, ...nextMonth];

  const viewCalendar = Array.from(
    { length: Math.ceil(viewMonth.length / 7) },
    (_, i) => {
      const divide = i * 7;
      return viewMonth.slice(divide, divide + 7);
    }
  );

  return (
    <>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 0,
          margin: 0,
          listStyleType: "none",
        }}
      >
        {viewCalendar.flat().map((date) => {
          return (
            <li
              style={{
                flex: "1 1 calc(100% / 7)",
              }}
              key={date}
            >
              {new Date(date).getDate()}
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default GenerateWeek;
