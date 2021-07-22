import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarType from "@/components/common/CalendarType";
import CalendarMonth from "@/components/month/CalendarMonth";
import CalendarWeek from "@/components/week/CalendarWeek";

const ContainerCalendar = () => {
  const setCalendar = useSelector((state) => state.calendarReducer.calendar);
  const [calendarType, setCalendarType] = useState({
    month: true,
    week: false,
  });

  const handleClickCalendarType = (type) => {
    setCalendarType(() => type);
  };

  return (
    <>
      <CalendarType
        calendarType={calendarType}
        handleClickCalendarType={handleClickCalendarType}
      />
      {calendarType.month ? (
        <CalendarMonth viewCalendar={setCalendar} />
      ) : (
        <CalendarWeek viewCalendar={setCalendar} />
      )}
    </>
  );
};

export default ContainerCalendar;
