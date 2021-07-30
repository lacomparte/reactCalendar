import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarType from '@/components/common/CalendarType';
import CalendarMonth from '@/components/month/CalendarMonth';
import CalendarWeek from '@/components/week/CalendarWeek';

const StyledWrap = styled.main`
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  background: #1b1b1b;
`;

const ContainerCalendar = () => {
  const [calendarType, setCalendarType] = useState('month');

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  return (
    <StyledWrap>
      <CalendarType calendarType={calendarType} handleClickCalendarType={handleClickCalendarType} />
      {calendarType === 'month' ? <CalendarMonth /> : <CalendarWeek />}
    </StyledWrap>
  );
};

export default ContainerCalendar;
