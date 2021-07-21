import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewCalendar } from "@/store/actions";
import CalendarType from "@/components/common/CalendarType";
import CalendarMonth from "@/components/month/CalendarMonth";
import CalendarWeek from "@/components/week/CalendarWeek";

const ContainerCalendar = () => {
  const dispatch = useDispatch();
  const viewCalendar = useSelector((state) => state.calendarReducer);

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
        <CalendarMonth viewCalendar={viewCalendar} />
      ) : (
        <CalendarWeek viewCalendar={viewCalendar} />
      )}
    </>
  );
};

export default ContainerCalendar;
