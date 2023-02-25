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
      // includeLabel: true,
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
  <div class="${style.container} checkbox_wrapper"> <span class="task_heading_select ${style.task_heading}">${task.heading}</span></div>
  <div class="${style.close} button_wrapper"></div>
  </div>
  `;

  const element = createHtml(html);
  element.querySelector(".checkbox_wrapper")!.prepend(checkbox);
  element.querySelector(".button_wrapper")!.prepend(button);

  const taskHeadingEL = element.querySelector(
    ".task_heading_select"
  ) as HTMLSpanElement;

  taskHeadingEL.addEventListener("dblclick", (e) => {
    const el = e.currentTarget as HTMLSpanElement;
    el.contentEditable = "true";
    el.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);

    function handleEdit(e: MouseEvent) {
      const shouldCancelEdit = e.target !== el;
      if (shouldCancelEdit) {
        el.contentEditable = "false";
        window.removeEventListener("click", handleEdit);

        store.updateTask({
          id: task.id,
          weekday: task.weekday,
          update: {
            heading: taskHeadingEL.innerHTML,
          },
        });
      }
    }

    window.addEventListener("click", handleEdit);
  });

  return element;
}
