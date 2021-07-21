import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarDays from "@/components/common/CalendarDays";
import GenerateMonth from "@/components/month/GenerateMonth";

const Calendar = ({ viewCalendar }) => {
  console.log(viewCalendar);
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

    return new Date(changeMonth);
  };

  return (
    <main>
      <CalendarDays />
      <GenerateMonth year={viewYear} month={viewMonth} />
    </main>
  );
};

export default Calendar;
