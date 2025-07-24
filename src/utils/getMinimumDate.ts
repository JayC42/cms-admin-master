export function getMinimumDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() + 1);
  const cachedDate = today;
  return cachedDate;
}
