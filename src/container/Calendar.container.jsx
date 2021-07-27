import React, { useState } from "react";
import { useSelector } from "react-redux";
import CalendarType from "@/components/common/CalendarType";
import CalendarMonth from "@/components/month/CalendarMonth";
import CalendarWeek from "@/components/week/CalendarWeek";

const ContainerCalendar = () => {
  const viewCalendar = useSelector((state) => state.calendarReducer.month);
  const [calendarType, setCalendarType] = useState("month");

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  return (
    <>
      <CalendarType
        calendarType={calendarType}
        handleClickCalendarType={handleClickCalendarType}
      />
      {calendarType === "month" ? (
        <CalendarMonth viewCalendar={viewCalendar} />
      ) : (
        <CalendarWeek viewCalendar={viewCalendar} />
      )}
    </>
  );
};

export default ContainerCalendar;
