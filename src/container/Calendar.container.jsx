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
  const [viewCalendar, setViewCalendar] = useState(new Date());

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  const handleClickOpenModal = (date) => {
    setOpenModal(date);
  };

  const handleChangeViewCalendar = (viewMonth) => {
    setViewCalendar(viewMonth);
  };

  return (
    <StyledWrap>
      <CalendarType
        handleChangeViewCalendar={handleChangeViewCalendar}
        calendarType={calendarType}
        handleClickCalendarType={handleClickCalendarType}
      />
      {calendarType === 'month' ? (
        <CalendarMonth
          viewCalendar={viewCalendar}
          handleChangeViewCalendar={handleChangeViewCalendar}
          handleClickOpenModal={handleClickOpenModal}
        />
      ) : (
        <CalendarWeek
          viewCalendar={viewCalendar}
          handleChangeViewCalendar={handleChangeViewCalendar}
          handleClickOpenModal={handleClickOpenModal}
        />
      )}
      <Modal open={openModal} handleClickOpenModal={handleClickOpenModal} />
    </StyledWrap>
  );
};

export default ContainerCalendar;
