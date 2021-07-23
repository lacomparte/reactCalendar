import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarType from "@/components/common/CalendarType";
import CalendarMonth from "@/components/month/CalendarMonth";
import CalendarWeek from "@/components/week/CalendarWeek";

const ContainerCalendar = () => {
  const setMonth = useSelector((state) => {
    console.log(state);
    return state.calendarReducer.month;
  });
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
        <CalendarMonth viewCalendar={setMonth} />
      ) : (
        <CalendarWeek viewCalendar={setMonth} />
      )}
    </>
  );
};

export default ContainerCalendar;
