import { getCurrentWeek } from "utils/weekdays";
import { get } from "lib/DOM";
import Weekday from "./components/Weekday";

const container = get("#weekdays");

const week = getCurrentWeek();

week.forEach((day) => {
  container.append(Weekday(day));
});
