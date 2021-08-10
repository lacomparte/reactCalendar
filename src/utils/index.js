// month 기준 이전달 return
export const getDate = (year, month, day = 1) => new Date(year, month - 1, day);

export const formattingDate = (date = new Date().toString()) => {
  const convertToString = typeof date !== 'string' ? date.toString() : date;
  return convertToString.slice(0, 15);
};

export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
export const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key) => window.localStorage.removeItem(key);
