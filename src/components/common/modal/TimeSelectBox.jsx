import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCaretDown, AiOutlineCheckCircle } from 'react-icons/ai';

const StyledSelectBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  text-align: left;
`;

const StyledSelectedOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border: 1px solid ${({ isError }) => (isError ? 'red' : '#e0e0e0')};
`;

const StyledOptionWrap = styled.div`
  position: absolute;
  top: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  gap: 1px;
  width: 100%;
  height: 300px;
  border: 1px solid #e0e0e0;
  border-top: 0;
  box-sizing: border-box;
  background: #eee;
  z-index: 10;
`;

const StyledOptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding: 0 5px;
  box-sizing: border-box;
  color: ${({ isSelected }) => (isSelected ? 'black' : 'gray')};
  background: white;
`;

const TimeSelectBox = ({ handleChangeSelectTime, selectedTime, isError, type, hour, min }) => {
  const times = Array.from({ length: 12 }, (_, i) => {
    const value = i === 0 ? ['12:00', '12:30'] : [`${i}:00`, `${i}:30`];
    return value;
  }).flat();

  const am = times.map((item) => `AM ${item}`);
  const pm = times.map((item) => `PM ${item}`);
  const timeTable = [...am, ...pm];
  const [isOpen, setIsOpen] = useState(false);

  // NOTE 시작시간이 오후 11시면...?ㅠㅠ
  useEffect(() => {
    const isHalfHour = min > 30 ? 1 : 0;
    const index =
      type === 'startTime' ? Number(hour) * 2 + isHalfHour : Number(hour) * 2 + isHalfHour + 1;
    const defaultTime = timeTable.find((item) => item === timeTable[index]);
    handleChangeSelectTime(type, index, defaultTime);
  }, [type, hour, min]);

  const handleClickSelectBox = () => {
    setIsOpen(!isOpen);
  };

  const handleClickSelectOption = (type, index, time) => {
    handleChangeSelectTime(type, index, time);
    setIsOpen(!isOpen);
  };

  return (
    <StyledSelectBox aria-label="시간 선택" role="combobox" aria-hidden="true" aria-expanded="true">
      <StyledSelectedOption onClick={handleClickSelectBox} isOpen={isOpen} isError={isError}>
        {selectedTime.time}
        <AiFillCaretDown />
      </StyledSelectedOption>
      {isOpen && (
        <StyledOptionWrap>
          {timeTable.map((item, index) => {
            const isSelected = item === selectedTime[1];
            return (
              <StyledOptionButton
                type="button"
                isSelected={isSelected}
                onClick={() => handleClickSelectOption(type, index, item)}
                key={index}
              >
                {item}
                {isSelected && <AiOutlineCheckCircle />}
              </StyledOptionButton>
            );
          })}
        </StyledOptionWrap>
      )}
    </StyledSelectBox>
  );
};

export default TimeSelectBox;
