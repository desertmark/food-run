export const today = (): number => {
  const now = new Date();
  return now.setHours(0, 0, 0, 0);
};
