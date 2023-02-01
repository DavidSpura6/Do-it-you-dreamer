export function getCurrentWeek() {
  const week: {
    name: string;
    date: string;
    dayIndex: number;
  }[] = [];
  const today = new Date();
  const dayIndex = today.getUTCDay() || 7;
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayIndex + 1
  );
  for (let i = 0; i < 7; i++) {
    const day = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + i
    );
    week.push({
      name: day.toLocaleString(navigator.language, { weekday: "long" }),
      date: day.toLocaleDateString(),
      dayIndex: i + 1,
    });
  }
  return week;
}
