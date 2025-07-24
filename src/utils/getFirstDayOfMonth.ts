import { format } from 'date-fns';

export function getFirstDayOfMonth(): string {
  const date = new Date();
  date.setDate(1);
  return format(date, 'yyyy-MM-dd');
}
