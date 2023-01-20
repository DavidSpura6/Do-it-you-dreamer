import { persist } from "src/lib/store/persist";
import { createStore } from "src/lib/store/createStore";

// type State = {
//   name: string;
//   date: Date;
//   page: number;
//   setName: (name: string) => void;
// };

// export const auth = createStore<State>(
//   persist(
//     (set, get, api) => ({
//       name: "Dejvik",
//       date: new Date(),
//       page: 1,
//       setName: (name: string) => {
//         set({ name });
//       },
//     }),
//     {
//       name: "auth",
//     }
//   )
// );

export { createStore, persist };
