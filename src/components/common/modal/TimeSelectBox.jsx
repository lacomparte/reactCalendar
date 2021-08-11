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

const TimeSelectBox = ({ type, handleChangeSelectTime, selectedTime, isError, time }) => {
  console.log(1111111);
  const times = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const am = times.map((item) => `AM ${item}`);
  const pm = times.map((item) => `PM ${item}`);
  const timeTable = [...am, ...pm];
  const [isOpen, setIsOpen] = useState(false);

  const isWeek = time !== null;

  // 월은 지금 시간
  useEffect(() => {
    console.log('-------------------------------');
    console.log(type, time, isWeek);
    if (isWeek) {
      const index = type === 'startTime' ? Number(time) : Number(time) + 1;
      const defaultTime = timeTable.find((item, idx) => item[idx] === item[index]);
      const value = [index, defaultTime];
      handleChangeSelectTime(type, ...value);
    }
  }, [type]);

  // useEffect(() => {
  //   console.log(selectedTime);
  // }, [selectedTime]);

  const handleClickSelectBox = () => {
    setIsOpen(!isOpen);
  };

  const handleClickSelectOption = (type, value) => {
    handleChangeSelectTime(type, ...value);
    setIsOpen(!isOpen);
  };

  return (
    <StyledSelectBox aria-label="시간 선택" role="combobox" aria-hidden="true" aria-expanded="true">
      <StyledSelectedOption onClick={handleClickSelectBox} isOpen={isOpen} isError={isError}>
        {time ? selectedTime[1] : selectedTime[1] || '선택'}
        <AiFillCaretDown />
      </StyledSelectedOption>
      {isOpen && (
        <StyledOptionWrap>
          {timeTable.map((item, index) => {
            const isSelected = item === selectedTime;
            return (
              <StyledOptionButton
                type="button"
                isSelected={isSelected}
                onClick={() => handleClickSelectOption(type, [index, item])}
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
