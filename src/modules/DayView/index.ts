import { create, get } from "lib/DOM";
import Task from "./components/Task";

const container = get("#day_view");

const headingContent = /*html*/ `
<h1>Todays tasks</h1>
<h5>Sunday 4. 2.</h5>
`;
const heading = create("div");
heading.style.cssText = `padding-left:16px; padding-right:16px;`;
heading.innerHTML = headingContent;
container.append(heading);
container.append(Task());
