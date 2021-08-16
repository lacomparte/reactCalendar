import React from 'react';
import styled from 'styled-components';

const StyledScheduledItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 3px;
  color: white;
  text-align: left;

  &:: before {
    flex: 0 0 4px;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    margin: 0 5px;
    background: ${({ itemColor }) => itemColor};
    content: '';
  }

  & + p {
    margin-top: 4px;
  }
`;

const StyledScheduledBox = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CurrentDaySchedule = ({ existData, handleClickOpenModal }) => {
  const randomColor = '#' + Math.random().toString(16).substr(-6);
  const handleClickSchedule = (existData) => {
    handleClickOpenModal(true, existData);
  };

  return existData.map((item, idx) => {
    return (
      <StyledScheduledItemButton
        key={idx}
        itemColor={randomColor}
        onClick={() => handleClickSchedule(existData[idx])}
      >
        <StyledScheduledBox>{item.title}</StyledScheduledBox>
      </StyledScheduledItemButton>
    );
  });
};

export default React.memo(CurrentDaySchedule);
