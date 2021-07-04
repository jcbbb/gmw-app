export function diffInDays(start, end) {
  const start_date = new Date(start);
  const end_date = new Date(end);
  return Math.floor((end_date - start_date) / (1000 * 3600 * 24));
}
