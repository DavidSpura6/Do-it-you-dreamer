import { createStore, persist } from "store";
import { getSimpleDate } from "utils/simpeDate";

export type Task = {
  date: Date;
  weekday: string;
  heading: string;
  text: string;
  time?: string;
  isDeleted: boolean;
  isComplete: boolean;
  id: string;
};

type TaskStore = {
  currentWeekday: string;
  tasks: {
    [weekday: string]: { [id: string]: Task };
  };
  addTask({ weekday, task }: { weekday: string; task: Task }): void;
  updateTask({
    weekday,
    id,
    update,
  }: {
    weekday: string;
    id: string;
    update: Partial<Task>;
  }): void;
  deleteTask({ weekday, id }: { weekday: string; id: string }): void;
  getTasksForWeekday(weekday: string): { [id: string]: Task };
  getHasTasksForWeekday(weekday: string): boolean;
};

export const taskStore = createStore<TaskStore>(
  persist(
    (set, get) => ({
      currentWeekday: getSimpleDate(new Date()),
      tasks: {},
      addTask({ weekday, task }) {
        set(({ tasks }) => ({
          tasks: {
            ...tasks,
            [weekday]: {
              ...tasks[weekday],
              [task.id]: task,
            },
          },
        }));
      },
      updateTask({ weekday, id, update }) {
        set(({ tasks }) => ({
          tasks: {
            ...tasks,
            [weekday]: {
              ...tasks[weekday],
              [id]: {
                ...tasks[weekday][id],
                ...update,
              },
            },
          },
        }));
      },
      deleteTask({ weekday, id }) {
        const { [id]: _, ...filtered } = get().tasks[weekday];
        set(({ tasks }) => ({
          tasks: {
            ...tasks,
            [weekday]: filtered,
          },
        }));
      },
      getTasksForWeekday(weekday) {
        return get().tasks[weekday];
      },
      getHasTasksForWeekday(weekday) {
        return Object.keys(get().tasks[weekday] || {}).length > 0;
      },
    }),
    {
      name: "task-store",
    }
  )
);
