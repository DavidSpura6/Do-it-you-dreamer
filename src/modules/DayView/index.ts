import { nanoid } from "nanoid";
import addIcon from "assets/add_24.svg?raw";
import { get, createHtml, create } from "lib/DOM";
import { taskStore } from "modules/stores/tasks";
import { Button } from "components/Button";
import {
  getDateFromSimpleDate,
  getSimpleDate,
  getWeekDayNameFromSimpleDate,
} from "utils/simpeDate";
import Task from "./components/Task";
import styles from "./dayview.module.scss";
import { getTranslation } from "modules/localization/i18n";

const store = taskStore.getState();
const { t } = getTranslation();

const container = get("#day_view");
const taskContainer = create("div");

function updateTaskList() {
  taskContainer.innerHTML = "";
  const currentWeekDay = taskStore.getState().currentWeekday;

  if (store.getHasTasksForWeekday(currentWeekDay)) {
    Object.values(store.getTasksForWeekday(currentWeekDay)).forEach((task) => {
      const el = Task(task);
      taskContainer.append(el);
    });
  }
}

function getHeadingStrings() {
  const currentSimpleDate = taskStore.getState().currentWeekday;
  const todayDate = getDateFromSimpleDate(currentSimpleDate);
  const isToday = currentSimpleDate === getSimpleDate(new Date());

  const todayDayName = getWeekDayNameFromSimpleDate(currentSimpleDate);
  const title = isToday ? t("weekDayTitle") : todayDayName;
  const subtitle = `${todayDayName} ${todayDate.getDate()}. ${
    todayDate.getMonth() + 1
  }.`;

  return { title, subtitle };
}

function updateHeading() {
  const titleEl = get("#day_view_title");
  const subtitleEl = get("#day_view_subtitle");

  const { title, subtitle } = getHeadingStrings();
  titleEl.innerHTML = title;
  subtitleEl.innerHTML = subtitle;
}

function createGUI() {
  const { title, subtitle } = getHeadingStrings();

  const headingHtml = /*html*/ `<div style="padding-left:16px; padding-right:16px;" >
<h2 id="day_view_title">${title}</h2>
<h4 id="day_view_subtitle">${subtitle}</h4>
</div>
`;

  const heading = createHtml(headingHtml);
  taskContainer.classList.add(styles.task_container);

  const addButton = Button("Add", {
    variant: "icon",
    icon: addIcon,
    onClick: () => {
      const currentWeekday = taskStore.getState().currentWeekday;
      store.addTask({
        weekday: currentWeekday,
        task: {
          id: nanoid(),
          date: getDateFromSimpleDate(currentWeekday),
          heading: "New Task",
          text: "Some description",
          isComplete: false,
          isDeleted: false,
          time: undefined,
          weekday: currentWeekday,
        },
      });
    },
  });
  addButton.classList.add(styles.add_icon);

  container.append(heading);
  container.append(taskContainer);
  container.append(addButton);
  updateTaskList();
}

export function createDayView() {
  createGUI();
  taskStore.subscribe((store, prevStore) => {
    const currentWeekDay = store.currentWeekday;
    const prevCurrentWeekDay = prevStore.currentWeekday;

    const currentTasks = JSON.stringify(store.tasks);
    const newTasks = JSON.stringify(prevStore.tasks);

    const tasksChanged = currentTasks !== newTasks;
    const weekDayChanged = currentWeekDay !== prevCurrentWeekDay;

    if (tasksChanged || weekDayChanged) updateTaskList();
    if (weekDayChanged) updateHeading();
  });
}
