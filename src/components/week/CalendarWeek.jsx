import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarSchedule from './CalendarSchedule';
import CalendarDays from '@/components/common/CalendarDays';
import CalendarControlButton from '@/components/common/CalendarControlButton';
import GenerateWeek from '@/components/week/GenerateWeek';

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledCalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding-left: 50px;
  box-sizing: border-box;
`;

const CalendarWeek = ({
  viewCalendar,
  handleChangeViewCalendar,
  handleClickOpenModal,
  separateData,
}) => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setDate] = useState([]);
  const [weekCalendar, setWeekCalendar] = useState([]);

  useEffect(() => {
    setYear(new Date(`${viewCalendar}`).getFullYear());
    setMonth(new Date(`${viewCalendar}`).getMonth() + 1);
    setDate(separateData?.[year]?.[month]);
    setCurrentDate(viewCalendar);
  }, [viewCalendar, separateData]);

  useEffect(() => {
    const viewDay = new Date(currentDate).getDay();
    const viewDate = new Date(currentDate).getDate();
    const betweenLastDayOfWeek = 7 - viewDay;

    const firstDateToCurrentDate = Array.from(
      { length: viewDay },
      (_, i) => new Date(currentDate.setDate(viewDate - (i + 1))),
    ).reverse();

    const lastDateToCurrentDate = Array.from(
      { length: betweenLastDayOfWeek },
      (_, i) => new Date(currentDate.setDate(viewDate + i)),
    );

    const weekCalendar = [...firstDateToCurrentDate, ...lastDateToCurrentDate];
    setWeekCalendar(weekCalendar);
  }, [currentDate]);

  const handleClickButton = (direction) => {
    const isNext = direction === 'next';
    const currentDate = new Date(viewCalendar).getDate();
    const changeDate = isNext ? currentDate + 7 : currentDate - 7;
    const newDate = new Date(new Date(viewCalendar).setDate(+changeDate));

    handleChangeViewCalendar(new Date(newDate));
  };

  return (
    <>
      <CalendarControlButton
        year={year}
        month={month}
        type="week"
        handleClickButton={handleClickButton}
      />
      <StyledWrap>
        <StyledCalendarWrap>
          <CalendarDays />
          <GenerateWeek weekCalendar={weekCalendar} />
        </StyledCalendarWrap>
        <CalendarSchedule
          handleClickOpenModal={handleClickOpenModal}
          weekCalendar={weekCalendar}
          data={data}
        />
      </StyledWrap>
    </>
  );
};

export default CalendarWeek;
