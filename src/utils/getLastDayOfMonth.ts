import { format } from 'date-fns';

export function getLastDayOfMonth(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1, 0);
  return format(date, 'yyyy-MM-dd');
}
