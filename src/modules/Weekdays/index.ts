import { getCurrentWeek } from "utils/weekdays";
import { get } from "lib/DOM";
import Weekday from "./components/Weekday";

const container = get("#weekdays") as Element;

const week = getCurrentWeek();

const render = () => {
  week.forEach((day) => {
    container.append(Weekday(day));
  });
};

render();
