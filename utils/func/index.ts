import dayjs from "dayjs";

export const truncateText = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + "...";
};

export const determineGroupBy = (
  from: string,
  to: string
): "monthly" | "daily" | "annual" => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  const diffInDays = toDate.diff(fromDate, "day");

  if (diffInDays <= 31) {
    return "daily";
  } else if (diffInDays > 31 && diffInDays < 365) {
    return "monthly";
  } else {
    return "annual";
  }
};

export const isAllZero = (array: number[]): boolean => {
  return array.every((value) => value === 0);
};
