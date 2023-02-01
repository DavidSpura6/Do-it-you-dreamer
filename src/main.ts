import "./style.css";
import "./theme/theme.css";
import "./theme/foundations/foundations.scss";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "./counter";
import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";

const button = Button("Hello World", {
  variant: "outlined",
  onClick: () => console.log("click"),
});
const checkbox = Checkbox();

document.body.appendChild(button);
document.body.appendChild(checkbox);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
