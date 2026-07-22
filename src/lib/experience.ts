const COMPLETED_NON_OVERLAPPING_MONTHS = 37;
const CURRENT_ROLE_START = new Date(2026, 2, 1);

const fullMonthsBetween = (start: Date, end: Date) => {
  const monthDifference = (end.getFullYear() - start.getFullYear()) * 12
    + end.getMonth()
    - start.getMonth();

  return Math.max(0, monthDifference - (end.getDate() < start.getDate() ? 1 : 0));
};

export const getExperienceDuration = (today = new Date()) => {
  const totalMonths = COMPLETED_NON_OVERLAPPING_MONTHS + fullMonthsBetween(CURRENT_ROLE_START, today);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    totalMonths,
    label: `${years} yr${years === 1 ? '' : 's'} ${months} mo${months === 1 ? '' : 's'}`,
  };
};
