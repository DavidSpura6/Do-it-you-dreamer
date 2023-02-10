import styles from "./dayview.module.scss";
import addIcon from "assets/add_24.svg?raw";
import { get, createHtml, create } from "lib/DOM";
import { taskStore } from "modules/stores/tasks";
import { Button } from "components/Button";
import Task from "./components/Task";
import { getSimpleDate } from "utils/simpeDate";

const store = taskStore.getState();

const container = get("#day_view");
const taskContainer = create("div");

function updateTaskList() {
  taskContainer.innerHTML = "";
  const todaySimpleDate = getSimpleDate(new Date());
  if (store.getHasTasksForWeekday(todaySimpleDate)) {
    Object.values(store.getTasksForWeekday(todaySimpleDate)).forEach((task) => {
      const el = Task(task);
      taskContainer.append(el);
    });
  }
}

function createGUI() {
  const headingHtml = /*html*/ `<div style="padding-left:16px; padding-right:16px;" >
<h2>Today's tasks</h2>
<h4>Sunday 4. 2.</h4>
</div>
`;

  const heading = createHtml(headingHtml);
  taskContainer.classList.add(styles.task_container);

  const todaySimpleDate = getSimpleDate(new Date());
  const addButton = Button("Add", {
    variant: "icon",
    icon: addIcon,
    onClick: () => {
      store.addTask({
        weekday: getSimpleDate(new Date()),
        task: {
          id:
            Object.keys(
              taskStore.getState().getTasksForWeekday(todaySimpleDate) || {}
            ).length + 1,
          date: new Date(),
          heading: "New Task",
          text: "Some description",
          isComplete: false,
          isDeleted: false,
          time: undefined,
          weekday: todaySimpleDate,
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

createGUI();
taskStore.subscribe((store, prevStore) => {
  const currentTasks = JSON.stringify(store.tasks);
  const newTasks = JSON.stringify(prevStore.tasks);

  if (currentTasks !== newTasks) updateTaskList();
});
