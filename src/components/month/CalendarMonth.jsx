import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarButton from '@/components/month/CalendarButton';
import GenerateMonth from '@/components/month/GenerateMonth';

const Calendar = () => {
  const viewCalendar = useSelector((state) => state.calendarReducer.currentMonth);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
  }, [viewCalendar]);

  return (
    <main>
      <CalendarButton viewCalendar={viewCalendar} year={year} month={month} />
      <CalendarDays />
      <GenerateMonth year={year} month={month} />
    </main>
  );
};

export default Calendar;
