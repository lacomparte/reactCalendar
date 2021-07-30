import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMonth } from '@/store/actions';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarControlButton from '@/components/common/CalendarControlButton';
import GenerateMonth from '@/components/month/GenerateMonth';

const Calendar = () => {
  const viewCalendar = useSelector((state) => state.calendarReducer.currentMonth);
  const dispatch = useDispatch();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
  }, [viewCalendar]);

  const handleClickButton = (e) => {
    const isNext = e.target.ariaLabel.includes('다음');
    const currentMonth = new Date(viewCalendar).getMonth();
    const changeMonth = isNext
      ? new Date(viewCalendar).setMonth(currentMonth + 1)
      : new Date(viewCalendar).setMonth(currentMonth - 1);

    dispatch(setCurrentMonth({ currentMonth: new Date(changeMonth) }));
  };
  return (
    <main>
      <CalendarControlButton
        year={year}
        month={month}
        type="month"
        handleClickButton={handleClickButton}
      />
      <CalendarDays />
      <GenerateMonth year={year} month={month} />
    </main>
  );
};

export default Calendar;
