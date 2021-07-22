import React, { useEffect, useState } from "react";
import CalendarDays from "@/components/common/CalendarDays";
import CalendarButton from "@/components/month/CalendarButton";
import GenerateMonth from "@/components/month/GenerateMonth";

const Calendar = ({ viewCalendar }) => {
  const [viewYear, setViewYear] = useState();
  const [viewMonth, setViewMonth] = useState();

  useEffect(() => {
    setViewYear(new Date(`${viewCalendar}`).getFullYear());
    setViewMonth(new Date(`${viewCalendar}`).getMonth() + 1);
  }, [viewCalendar]);

  return (
    <main>
      <CalendarButton
        viewCalendar={viewCalendar}
        viewYear={viewYear}
        viewMonth={viewMonth}
      />
      <CalendarDays />
      <GenerateMonth setYear={viewYear} setMonth={viewMonth} />
    </main>
  );
};

export default Calendar;
