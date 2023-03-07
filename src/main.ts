import "./theme/theme.css";
import "./style.scss";
import "./theme/layout.scss";
import "./theme/foundations/foundations.scss";
import { createDayView } from "./modules/DayView";
import { createWeekdays } from "./modules/Weekdays";
import { onAppStart } from "modules/appStart";

onAppStart();
createDayView();
createWeekdays();
