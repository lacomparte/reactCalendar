import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { setLocalStorage, getLocalStorage } from '@/utils';
import TimeSelectBox from '@/components/common/modal/TimeSelectBox';

const StyledModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
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
  z-index: 20;
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
  height: 32px;
  border-bottom: 1px solid ${({ isError }) => (isError ? 'red' : '#e0e0e0')};
  box-sizing: border-box;

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

const Modal = ({ open, handleClickOpenModal, modalKeyDate }) => {
  const dispatch = useDispatch();

  // 추후 util 로 뺄 예정
  // 기본 시간
  const { date, time } = modalKeyDate;
  const timezoneOffset = new Date(date).getTimezoneOffset() * 60_000;
  const startTimezoneDate = new Date(new Date(date) - timezoneOffset);

  const defaultStart = startTimezoneDate.toISOString().slice(0, 10);

  // 기본 시간으로 부터 30분 후
  const endTimezoneDate = new Date(new Date(startTimezoneDate).getTime() + 1_800_000);
  const defaultEnd = endTimezoneDate.toISOString().slice(0, 10);

  const init = {
    title: '',
    startDate: defaultStart,
    endDate: defaultEnd,
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
      [name]: value,
    });
  };

  const handleClickClose = () => {
    handleClickOpenModal(false);
    setInputData(init);
  };

  const [selectedTime, setSelectedTime] = useState({
    startTime: [],
    endTime: [],
  });

  const handleChangeSelectTime = (type, ...value) => {
    console.log(type, value);
    console.log({ ...selectedTime });
    console.log('modal', selectedTime);
    setSelectedTime(() => ({
      ...selectedTime,
      [type]: [...value],
    }));
    setIsError({
      ...isError,
      [type]: false,
    });
  };

  const handleSubmit = () => {
    const changeError = (key) => {
      setIsError({
        ...isError,
        [key]: true,
      });
    };

    // 제목
    if (!inputData.title.trim()) {
      changeError('title');
      setInputData({
        ...inputData,
        title: '',
      });
      elementRef.current.title.focus();

      return;
    }

    if (!inputData.startDate.trim()) {
      changeError('startDate');
      return;
    }

    if (selectedTime.startTime.length === 0) {
      changeError('startTime');
      return;
    }

    if (!inputData.endDate.trim()) {
      changeError('endDate');
      return;
    }

    if (selectedTime.endTime.length === 0) {
      changeError('endTime');
      return;
    }

    const startDate = `${inputData.startDate} ${selectedTime.startTime[0]
      .toString()
      .padStart(2, 0)}:00:00`;
    const endDate = `${inputData.endDate} ${selectedTime.endTime[0]
      .toString()
      .padStart(2, 0)}:00:00`;

    const isSameTime =
      new Date(`${startDate}`).toISOString() === new Date(`${endDate}`).toISOString();
    if (isSameTime) {
      alert('시작 날짜/시간과 종료 날짜/시간이 같습니다.');
      return;
    }

    const startTimestamp = new Date(`${startDate}`).getTime();
    const endTimestamp = new Date(`${endDate}`).getTime();
    if (startTimestamp - endTimestamp > 0) {
      alert('종료 날짜/시간이 시작 날짜/시간보다 이전입니다.');
      return;
    }

    // NOTE
    // 로컬스토리지 검사해서 같은 날짜, 시간 확인

    const prevResult = getLocalStorage('calendar') ?? [];
    const result = [
      ...prevResult,
      {
        key: new Date(`${startDate}`).getTime(),
        title: inputData.title,
        startDate: new Date(`${startDate}`).toString(),
        endDate: new Date(`${endDate}`).toString(),
      },
    ];
    // add 함수로 따로 set localstorage 저장.
    setLocalStorage('calendar', result);
    handleClickClose();
  };

  return (
    open && (
      <>
        <StyledModalContent>
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
                value={inputData.title}
                onChange={handleChangeInputData}
                isError={isError.title}
                ref={(e) => e && (elementRef.current[`${e.name}`] = e)}
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
                  value={inputData.startDate}
                  onChange={handleChangeInputData}
                  isError={isError.startDate}
                  ref={(e) => e && (elementRef.current[`${e.name}`] = e)}
                />
              </dd>
            </StyledDivision>
            <StyledDivision>
              <StyledContentPlaceholder>시작 시간</StyledContentPlaceholder>
              <dd>
                <TimeSelectBox
                  type="startTime"
                  handleChangeSelectTime={handleChangeSelectTime}
                  selectedTime={selectedTime.startTime}
                  isError={isError.startTime}
                  time={time}
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
                  value={inputData.endDate}
                  onChange={handleChangeInputData}
                  isError={isError.endDate}
                  ref={(e) => e && (elementRef.current[`${e.name}`] = e)}
                />
              </dd>
            </StyledDivision>
            <StyledDivision>
              <StyledContentPlaceholder>종료 시간</StyledContentPlaceholder>
              <dd>
                <TimeSelectBox
                  type="endTime"
                  handleChangeSelectTime={handleChangeSelectTime}
                  selectedTime={selectedTime.endTime}
                  isError={isError.endTime}
                  time={time}
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
        <StyledModalWrap onClick={handleClickClose}></StyledModalWrap>
      </>
    )
  );
};

export default React.memo(Modal);
