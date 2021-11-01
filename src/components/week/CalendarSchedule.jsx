import React from 'react';
import styled from 'styled-components';
import CurrentDaySchedule from '@/components/common/CurrentDaySchedule';
import { getCurrentData } from '@/utils';

const StyledTime = styled.ol`
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  gap: 1px;
  width: 50px;

  li {
    width: 50px;
    height: 100px;
    font-weight: bold;
    color: white;
  }
`;

const StyledScheduleOl = styled.ol`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  width: 100%;
  color: white;

  li {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    background: #3c3c3c;
  }
`;

const StyledTimeWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 200px);
`;

const StyledTimeTable = styled.ol`
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  gap: 1px;
  background: black;

  li {
    height: 100px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const StyledSchedule = styled.div`
  position: absolute;
  top: 30px;
  left: 3px;
  right: 3px;
  overflow: hidden;
  overflow-y: auto;
  max-height: calc(100% - 30px);
`;

const CalendarSchedule = ({ weekCalendar, handleClickOpenModal, data }) => {
  const time24 = Array.from({ length: 24 }, (_, i) => i + 1);
  const time12 = Array.from({ length: 24 }, (_, i) => ((i + 11) % 12) + 1);
  // console.log(data);

  const generateDate = (date) => {
    const makeDate = Array.from({ length: 24 }, (_, i) => new Date(date).setHours(i, 0, 0, 0));
    return (
      <StyledTimeTable aria-label={date}>
        {makeDate.map((date, index) => {
          const convertedDateFormat = (date) => new Date(date).setHours(index, 0, 0);
          const existData = getCurrentData(data, date);
          const modalProps = {
            title: existData.title || '',
            startDate: date,
            endDate: date,
          };
          // console.log(existData);
          return (
            <li aria-label={`${index} 시`} key={new Date(convertedDateFormat(date))}>
              <StyledButton
                type="button"
                onClick={() => handleClickOpenModal(true, modalProps)}
              ></StyledButton>
              {existData.length > 0 && (
                <StyledSchedule>
                  <CurrentDaySchedule
                    handleClickOpenModal={handleClickOpenModal}
                    existData={existData}
                    type="week"
                  />
                </StyledSchedule>
              )}
            </li>
          );
        })}
      </StyledTimeTable>
    );
  };

  return (
    <StyledTimeWrap>
      <StyledTime>
        {time12.map((item, idx) => {
          return (
            <li key={idx} aria-label={idx}>
              <span>{item}</span>
            </li>
          );
        })}
      </StyledTime>
      <StyledScheduleOl>
        {weekCalendar.map((date) => {
          return <li key={date}>{generateDate(date)}</li>;
        })}
      </StyledScheduleOl>
    </StyledTimeWrap>
  );
};

export default React.memo(CalendarSchedule);
