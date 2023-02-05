import style from "./task.module.scss";
import { Checkbox } from "components/Checkbox";
import { create } from "lib/DOM";
import closeIcon from "assets/close.svg?raw";

export default function Task() {
  const checkbox = Checkbox("task_check");
  checkbox.classList.add(style.checkbox);
  const title = create("p");
  title.innerText = "Watch a movie";

  const task = create("div");
  task.classList.add(style.container);
  task.append(checkbox, title);

  const close = create("div");
  close.classList.add(style.close);
  close.innerHTML = closeIcon;

  const wrapper = create("div");
  wrapper.append(task, close);
  wrapper.classList.add(style.task);
  return wrapper;
}
