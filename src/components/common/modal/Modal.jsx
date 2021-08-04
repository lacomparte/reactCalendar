import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';

const StyledModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const StyledModalContent = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  padding: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  background: white;
  transform: translate(-50%, -50%);
`;

const StyledModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
`;

const StyledModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const StyledModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 20px;
`;

const StyledModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 48%;
  height: 40px;
  border-radius: 4px;
  color: ${({ isSubmit }) => (isSubmit ? 'white' : 'black')};
  background: ${({ isSubmit }) => (isSubmit ? 'black' : '#f3f3f3')};
`;

const StyledContentDl = styled.dl`
  display: flex;
  flex-direction: ${({ isFull }) => (isFull ? 'column' : 'row')};
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border-bottom: 2px solid ${({ isError }) => (isError ? 'red' : '#e0e0e0')};

  &[type='time']::-webkit-calendar-picker-indicator {
    display: none;
`;

const StyledContentPlaceholder = styled.dt`
  font-size: 12px;
  color: #828282;
`;

const StyledDivision = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 48%;
`;

const Modal = ({ open, handleClickOpenModal }) => {
  // 추후 util 로 뺄 예정
  // 기본 시간
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const startTimezoneDate = new Date(Date.now() - timezoneOffset);
  const defaultStart = startTimezoneDate.toISOString().slice(0, 10);
  const defaultStartTime = startTimezoneDate.toISOString().slice(11, 16);

  // 기본 시간으로 부터 30분 후
  const endTimezoneDate = new Date(new Date(startTimezoneDate).getTime() + 1800000);
  const defaultEnd = endTimezoneDate.toISOString().slice(0, 10);
  const defaultEndTime = endTimezoneDate.toISOString().slice(11, 16);

  const init = {
    title: {
      content: '',
      key: 0,
    },
    startDate: {
      content: defaultStart,
      key: 1,
    },
    startTime: {
      content: defaultStartTime,
      key: 2,
    },
    endDate: {
      content: defaultEnd,
      key: 3,
    },
    endTime: {
      content: defaultEndTime,
      key: 4,
    },
  };

  const [inputData, setInputData] = useState(init);
  const [isError, setIsError] = useState({
    title: false,
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  });

  const elementRef = useRef([]);

  const handleChangeInputData = (e) => {
    const { value, name } = e.currentTarget;

    setIsError({
      ...isError,
      [name]: false,
    });
    setInputData({
      ...inputData,
      [name]: {
        ...inputData[name],
        content: value,
      },
    });
  };

  const handleClickClose = () => {
    handleClickOpenModal(false);
    setInputData(init);
  };

  const handleSubmit = () => {
    // 입력 필드 validation
    const arrangeData = Object.entries(inputData).sort((a, b) => inputData[a] - inputData[b]);
    const isRemainField = arrangeData.some((item) => {
      const key = item[1].key;

      if (!item[1].content.trim()) {
        setIsError({
          ...isError,
          [item[0]]: true,
        });

        if (item[0] === 'title') {
          item[1].content = '';
        }

        elementRef.current[key].focus();
      }

      return !item[1].content.trim();
    });

    if (isRemainField) return;

    const { startDate, startTime, endDate, endTime } = inputData;
    const start = new Date(`${startDate.content} ${startTime.content}`);
    const end = new Date(`${endDate.content} ${endTime.content}`);
    const isSameTime = start.toISOString() === end.toISOString();
    if (isSameTime) {
      alert('시작 날짜/시간과 종료 날짜/시간이 같습니다.');
      return;
    }

    const startTimestamp = new Date(start).getTime();
    const endTimestamp = new Date(end).getTime();
    if (startTimestamp - endTimestamp > 0) {
      alert('종료 날짜/시간이 시작 날짜/시간보다 이전입니다.');
      return;
    }

    if (endTimestamp - startTimestamp < 1800000) {
      alert('시작 시간과 종료 시간의 차이는 최소 30분 입니다.');
      return;
    }

    console.log({
      title: inputData.title.content,
      startDate: new Date(`${inputData.startDate.content} ${inputData.startTime.content}`),
      endDate: new Date(`${inputData.endDate.content} ${inputData.endTime.content}`),
    });
  };

  return open ? (
    <StyledModalWrap onClick={handleClickClose}>
      <StyledModalContent onClick={(e) => e.stopPropagation()}>
        <StyledModalHeader>
          <h2>일정 만들기</h2>
          <StyledModalCloseButton type="button" onClick={handleClickClose}>
            <AiFillCloseCircle color="black" />
          </StyledModalCloseButton>
        </StyledModalHeader>
        <StyledContentDl isFull={true}>
          <StyledContentPlaceholder>일정의 제목을 입력하세요</StyledContentPlaceholder>
          <dd>
            <StyledInput
              type="text"
              name="title"
              value={inputData.title.content}
              onChange={handleChangeInputData}
              isError={isError.title}
              ref={(item) => (elementRef.current[inputData.title.key] = item)}
            />
          </dd>
        </StyledContentDl>
        <StyledContentDl>
          <StyledDivision>
            <StyledContentPlaceholder>시작 날짜</StyledContentPlaceholder>
            <dd>
              <StyledInput
                type="date"
                name="startDate"
                value={inputData.startDate.content}
                onChange={handleChangeInputData}
                isError={isError.startDate}
                ref={(item) => (elementRef.current[inputData.startDate.key] = item)}
              />
            </dd>
          </StyledDivision>
          <StyledDivision>
            <StyledContentPlaceholder>시작 시간</StyledContentPlaceholder>
            <dd>
              <StyledInput
                type="time"
                name="startTime"
                step="1800"
                value={inputData.startTime.content}
                onChange={handleChangeInputData}
                isError={isError.startTime}
                ref={(item) => (elementRef.current[inputData.startTime.key] = item)}
              />
            </dd>
          </StyledDivision>
        </StyledContentDl>
        <StyledContentDl>
          <StyledDivision>
            <StyledContentPlaceholder>종료 날짜</StyledContentPlaceholder>
            <dd>
              <StyledInput
                type="date"
                name="endDate"
                value={inputData.endDate.content}
                onChange={handleChangeInputData}
                isError={isError.endDate}
                ref={(item) => (elementRef.current[inputData.endDate.key] = item)}
              />
            </dd>
          </StyledDivision>
          <StyledDivision>
            <StyledContentPlaceholder>종료 시간</StyledContentPlaceholder>
            <dd>
              <StyledInput
                type="time"
                name="endTime"
                step="1800"
                value={inputData.endTime.content}
                onChange={handleChangeInputData}
                isError={isError.endTime}
                ref={(item) => (elementRef.current[inputData.endTime.key] = item)}
              />
            </dd>
          </StyledDivision>
        </StyledContentDl>
        <StyledModalFooter>
          <StyledModalButton isSubmit={false} onClick={handleClickClose}>
            취소
          </StyledModalButton>
          <StyledModalButton isSubmit={true} onClick={handleSubmit}>
            저장
          </StyledModalButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledModalWrap>
  ) : null;
};

export default React.memo(Modal);
