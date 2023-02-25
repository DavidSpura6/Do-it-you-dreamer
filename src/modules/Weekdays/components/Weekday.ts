import { create } from "lib/DOM";
import { taskStore } from "modules/stores/tasks";
import { getSimpleDate } from "utils/simpeDate";
import style from "./weekday.module.scss";

const store = taskStore.getState();

export default function Weekday(day: {
  name: string;
  date: Date;
  dayIndex: number;
}) {
  const currentWeekday = getSimpleDate(new Date(day.date));

  const weekday = create("div");
  weekday.classList.add(style.container);

  const dayName = create("div");
  dayName.classList.add(style.dayName);
  dayName.innerHTML = day.name;

  const taskCompletion = create("div");
  taskCompletion.classList.add(style.taskCompletion);

  const tasks = taskStore.getState().tasks[currentWeekday];
  if (tasks) {
    const numberOfCompletedTasks = Object.values(tasks).filter(
      (task) => task.isComplete
    );
    taskCompletion.innerHTML = `${numberOfCompletedTasks.length}/${
      Object.keys(tasks).length
    }`;
  } else {
    taskCompletion.innerHTML = `0/0`;
  }

  weekday.append(dayName, taskCompletion);

  const button = create("button");
  button.type = "button";
  button.id = `date_${currentWeekday}`;
  button.classList.add(style.button);
  button.append(weekday);
  button.addEventListener("click", () => {
    store.setCurrentWeekday(currentWeekday);
  });

  if (taskStore.getState().currentWeekday === currentWeekday) {
    button.classList.add(style.active);
  }

  addReactivity({
    activeEl: button,
    numberEl: taskCompletion,
    currentWeekday,
  });
  return button;
}

function addReactivity({
  activeEl,
  numberEl,
  currentWeekday,
}: {
  activeEl: HTMLButtonElement;
  numberEl: HTMLDivElement;
  currentWeekday: string;
}) {
  taskStore.subscribe((state, prevState) => {
    if (state.currentWeekday === currentWeekday) {
      activeEl.classList.add(style.active);
    } else {
      activeEl.classList.remove(style.active);
    }

    const tasks = state.tasks[currentWeekday];
    if (!tasks) return;
    const numberOfCurrentTasks = Object.keys(tasks).length;
    const numberOfCompletedTasks = Object.values(tasks).filter(
      (task) => task.isComplete
    );
    numberEl.innerHTML = `${numberOfCompletedTasks.length}/${numberOfCurrentTasks}`;
  });
}
