import { format } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return format(dateObj, 'yyyy년 MM월 dd일');
};

export const compareDatesDesc = (a: string, b: string): number => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return dateB.getTime() - dateA.getTime();
};
