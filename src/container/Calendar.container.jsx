import React, { useState } from 'react';
import CalendarType from '@/components/common/CalendarType';
import CalendarMonth from '@/components/month/CalendarMonth';
import CalendarWeek from '@/components/week/CalendarWeek';

const ContainerCalendar = () => {
  const [calendarType, setCalendarType] = useState('month');

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  return (
    <>
      <CalendarType calendarType={calendarType} handleClickCalendarType={handleClickCalendarType} />
      {calendarType === 'month' ? <CalendarMonth /> : <CalendarWeek />}
    </>
  );
};

export default ContainerCalendar;
