import React, { useEffect, useState } from 'react';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarControlButton from '@/components/common/CalendarControlButton';
import GenerateMonth from '@/components/month/GenerateMonth';

const Calendar = ({ handleClickOpenModal, handleChangeViewCalendar, viewCalendar }) => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
  }, [viewCalendar]);

  const handleClickButton = (direction) => {
    const isNext = direction === 'next';
    const currentMonth = new Date(viewCalendar).getMonth();
    const changeMonth = isNext
      ? new Date(viewCalendar).setMonth(currentMonth + 1)
      : new Date(viewCalendar).setMonth(currentMonth - 1);

    handleChangeViewCalendar(new Date(changeMonth));
  };

  return (
    <div>
      <CalendarControlButton
        year={year}
        month={month}
        type="month"
        handleClickButton={handleClickButton}
      />
      <CalendarDays />
      <GenerateMonth year={year} month={month} handleClickOpenModal={handleClickOpenModal} />
    </div>
  );
};

export default Calendar;
