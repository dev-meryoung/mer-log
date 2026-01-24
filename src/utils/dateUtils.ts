import { format } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return format(dateObj, 'yyyy년 MM월 dd일');
};

export const compareDatesDescending = (
  a: string | undefined,
  b: string | undefined
): number => {
  const timeA = a ? new Date(a).getTime() : 0;
  const timeB = b ? new Date(b).getTime() : 0;
  return timeB - timeA;
};
