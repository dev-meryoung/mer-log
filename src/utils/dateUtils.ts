import { format } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return format(dateObj, 'yyyy년 MM월 dd일');
};

export const compareDatesDesc = (
  a: string | undefined,
  b: string | undefined
): number => new Date(b || '').getTime() - new Date(a || '').getTime();
