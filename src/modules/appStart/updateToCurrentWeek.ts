import { taskStore } from "modules/stores/tasks";
import { getSimpleDate } from "utils/simpeDate";
import { getCurrentWeek } from "utils/weekdays";

export function updateToCurrentWeek() {
  const currentWeek = getCurrentWeek();
  const storedDate = taskStore.getState().currentWeekday;

  let isInCurrentWeek = false;
  currentWeek.forEach((day) => {
    const dayDate = getSimpleDate(day.date);
    if (dayDate === storedDate) isInCurrentWeek = true;
  });

  if (!isInCurrentWeek) {
    const today = getSimpleDate(new Date());
    taskStore.getState().setCurrentWeekday(today);
  }
}
