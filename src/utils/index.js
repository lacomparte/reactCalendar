// month 기준 이전달 return
export const getDate = (year, month, day = 1) => new Date(year, month - 1, day);

export const formattingDate = (date) => {
  const convertToString = typeof date !== "string" ? date.toString() : date;
  return convertToString.slice(0, 15);
};
