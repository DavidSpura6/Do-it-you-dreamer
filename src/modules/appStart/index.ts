import { updateToCurrentWeek } from "./updateToCurrentWeek";

export function onAppStart() {
  updateToCurrentWeek();
}
