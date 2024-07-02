import dateAndTime from "date-and-time";

export const formatDateToString = ((date: Date): string => {
  return dateAndTime.format(date, "YYYY/MM/DD");
});

export const formatToJst = (d: Date) => {
  const add = dateAndTime.addHours(d, 9);
  return dateAndTime.format(add, "YYYY/MM/DD HH:mm:ss");
};

export const subtract = (subject: Date, base=new Date()) => {
  const baseString = formatDateToString(base);
  const subjectString = formatDateToString(subject);
  return dateAndTime.subtract(new Date(baseString), new Date(subjectString)).toDays();
};

export const isToday = ((date: Date) => subtract(date) === 0);
export const isYesterday = ((date: Date) => subtract(date) === 1);
export const isLastWeek = ((date: Date) => subtract(date) >= 7);
