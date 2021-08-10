import React, { useState } from 'react';
import styled from 'styled-components';
import { getLocalStorage } from '@/utils';
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
  const [modalKeyDate, setModalKeyDate] = useState('');

  const handleClickCalendarType = (type) => {
    setCalendarType(type);
  };

  const handleClickOpenModal = (date, isOpen) => {
    setModalKeyDate(date.toString());
    setOpenModal(isOpen);
  };

  const handleChangeViewCalendar = (viewMonth) => {
    setViewCalendar(viewMonth);
  };

  const data = getLocalStorage('calendar') ?? [];
  console.log(data);
  // 연도 별로 자르기
  const separateData = data.reduce((acc, cur) => {
    const year = new Date(cur.key).getFullYear();
    const month = new Date(cur.key).getMonth() + 1;

    console.log(cur);
    const test = acc[year][month] ?? [];
    acc = {
      ...acc,
      [year]: {
        ...acc[year],
        [month]: [{ ...test }, { ...cur }],
      },
    };
    console.log(acc[year][month]);
    return acc;
  }, []);

  console.log('separateData => ', separateData);

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
      {openModal && (
        <Modal
          open={openModal}
          handleClickOpenModal={handleClickOpenModal}
          modalKeyDate={modalKeyDate}
        />
      )}
    </StyledWrap>
  );
};

export default ContainerCalendar;
