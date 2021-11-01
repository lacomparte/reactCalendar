// month 기준 이전달 return
export const getDate = (year, month, day = 1, hour = 0, min = 0) =>
  new Date(year, month - 1, day, hour, min);

export const formattingDate = (date) => {
  const convertToString = typeof date !== 'string' ? date.toISOString() : date;
  return convertToString.slice(0, 10);
};

export const getCurrentData = (data, date) => {
  console.log(data, date);
  return data
    ? data.reduce((acc, cur) => {
        if (new Date(date).toDateString() === new Date(cur.key).toDateString()) {
          acc.push(cur);
        }
        return acc;
      }, [])
    : [];
};

export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
export const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
export const removeLocalStorage = (key) => window.localStorage.removeItem(key);
