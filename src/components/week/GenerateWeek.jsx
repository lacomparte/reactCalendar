import React from 'react';
import styled from 'styled-components';
import { formattingDate } from '@/utils';

const StyledDays = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  width: 100%;

  li {
    flex: 1 1 calc(100% / 7);
    padding: 5px;
    height: 30px;
    box-sizing: border-box;
    text-align: right;
    background: #252525;
  }
`;

const StyledDate = styled.span`
  font-weight: bold;
  color: ${({ isToday }) => (isToday ? 'red' : 'white')};
`;

const GenerateWeek = ({ weekCalendar }) => {
  const now = formattingDate(new Date());

  return (
    <StyledDays>
      {weekCalendar.map((date) => {
        const isToday = formattingDate(date) === now;
        return (
          <li key={date}>
            <StyledDate isToday={isToday}>{new Date(date).getDate()}일</StyledDate>
          </li>
        );
      })}
    </StyledDays>
  );
};

export default GenerateWeek;

// const GenerateWeek = ({ currentDate }) => {
//   const [weekCalendar, setWeekCalendar] = useState([]);
//   const now = formattingDate(new Date());

//   useEffect(() => {
//     const viewCurrentDate = new Date(currentDate);
//     const viewDay = new Date(viewCurrentDate).getDay();
//     const viewDate = new Date(viewCurrentDate).getDate();
//     const betweenLastDayOfWeek = 7 - viewDay;

//     const firstDateToCurrentDate = Array.from(
//       { length: viewDay },
//       (_, i) => new Date(new Date(viewCurrentDate).setDate(viewDate - (i + 1))),
//     ).reverse();

//     const lastDateToCurrentDate = Array.from(
//       { length: betweenLastDayOfWeek },
//       (_, i) => new Date(new Date(viewCurrentDate).setDate(viewDate + i)),
//     );

//     const weekCalendar = [...firstDateToCurrentDate, ...lastDateToCurrentDate];
//     setWeekCalendar(weekCalendar);
//   }, [currentDate]);

//   return (
//     <StyledDays>
//       {weekCalendar.map((date) => {
//         const isToday = formattingDate(date) === now;
//         return (
//           <li key={date}>
//             <StyledDate isToday={isToday}>{new Date(date).getDate()}</StyledDate>
//           </li>
//         );
//       })}
//     </StyledDays>
//   );
// };

// export default GenerateWeek;
