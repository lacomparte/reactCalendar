import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/modal/Modal';
import CalendarType from '@/components/common/CalendarType';
import CalendarMonth from '@/components/month/CalendarMonth';
import CalendarWeek from '@/components/week/CalendarWeek';

const StyledWrap = styled.main`
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  background: #1b1b1b;
`;

const ContainerCalendar = () => {
  const [calendarType, setCalendarType] = useState('month');
  const [openModal, setOpenModal] = useState(false);

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  const handleClickOpenModal = (date) => {
    setOpenModal(date);
  };

  return (
    <StyledWrap>
      <CalendarType calendarType={calendarType} handleClickCalendarType={handleClickCalendarType} />
      {calendarType === 'month' ? (
        <CalendarMonth handleClickOpenModal={handleClickOpenModal} />
      ) : (
        <CalendarWeek handleClickOpenModal={handleClickOpenModal} />
      )}
      <Modal open={openModal} handleClickOpenModal={handleClickOpenModal} />
    </StyledWrap>
  );
};

export default ContainerCalendar;
