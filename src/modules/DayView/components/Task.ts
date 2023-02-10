import style from "./task.module.scss";
import { Checkbox } from "components/Checkbox";
import { createHtml } from "lib/DOM";
import closeIcon from "assets/close.svg?raw";
import { Button } from "components/Button";
import { Task as TaskType, taskStore } from "modules/stores/tasks";

const store = taskStore.getState();

export default function Task(task: TaskType) {
  const checkbox = Checkbox(
    task.heading,
    (isChecked) =>
      store.updateTask({
        id: task.id,
        weekday: task.weekday,
        update: {
          isComplete: isChecked,
        },
      }),
    {
      includeLabel: true,
      checked: task.isComplete,
    }
  );
  checkbox.classList.add(style.checkbox);

  const button = Button("delete", {
    variant: "icon",
    onClick: () =>
      store.deleteTask({
        weekday: task.weekday,
        id: task.id,
      }),
    icon: closeIcon,
  });

  const html = /*html*/ `<div class="${style.task}">
  <div class="${style.container} checkbox_wrapper"></div>
  <div class="${style.close} button_wrapper"></div>
  </div>
  `;

  const element = createHtml(html);
  element.querySelector(".checkbox_wrapper")!.prepend(checkbox);
  element.querySelector(".button_wrapper")!.prepend(button);
  return element;
}
