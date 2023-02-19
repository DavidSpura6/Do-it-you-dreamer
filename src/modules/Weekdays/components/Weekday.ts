import { create } from "lib/DOM";
import style from "./weekday.module.scss";
import { taskStore } from "modules/stores/tasks";
import { getSimpleDate } from "utils/simpeDate";

const store = taskStore.getState();

export default function Weekday(day: {
  name: string;
  date: Date;
  dayIndex: number;
}) {
  const weekday = create("div");
  weekday.classList.add(style.container);

  const dayName = create("div");
  dayName.classList.add(style.dayName);
  dayName.innerHTML = day.name;

  const taskCompletion = create("div");
  taskCompletion.classList.add(style.taskCompletion);
  taskCompletion.innerHTML = "0/4";

  weekday.append(dayName, taskCompletion);

  const wrapper = create("div");
  wrapper.classList.add(style.wrapper);
  wrapper.append(weekday);
  wrapper.addEventListener("click", () => {
    const currentWeekday = getSimpleDate(new Date(day.date));
    store.setCurrentWeekday(currentWeekday);
  });
  return wrapper;
}
