// month 기준 이전달 return
export const getDate = (year, month, day = 1) => new Date(year, month - 1, day);
