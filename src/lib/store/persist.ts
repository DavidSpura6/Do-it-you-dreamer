import { StateCreator } from "./createStore";

type StateStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
};

type StorageValue<S> = {
  state: S;
};

type PersistStorage<S> = {
  getItem: (name: string) => StorageValue<S> | null;
  setItem: (name: string, value: StorageValue<S>) => void;
  removeItem: (name: string) => void;
};

type PersistOptions<S, PersistedState = S> = {
  name: string;
  storage?: PersistStorage<PersistedState>;
  partialize?: (state: S) => PersistedState;
};
type Persist = <T>(
  storeInitializer: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

function createJSONStorage<S>(
  getStorage: () => StateStorage
): PersistStorage<S> {
  const storage = getStorage();

  const parse = (str: string | null) => {
    if (str === null) {
      return null;
    }
    return JSON.parse(str) as StorageValue<S>;
  };

  const persistStorage: PersistStorage<S> = {
    getItem: (name) => {
      const str = storage.getItem(name) ?? null;
      return parse(str);
    },
    setItem: (name, newValue) => {
      storage.setItem(name, JSON.stringify(newValue));
    },
    removeItem: (name) => storage.removeItem(name),
  };
  return persistStorage;
}

export const persist: Persist = (config, baseOptions) => (set, get, api) => {
  type S = ReturnType<typeof config>;
  const options = {
    storage: createJSONStorage<S>(() => localStorage),
    partialize: (state: S) => state,
    merge: (persistedState: unknown, currentState: S) => ({
      ...currentState,
      ...(persistedState as object),
    }),
    ...baseOptions,
  };

  const setItem = () => {
    const state = options.partialize({ ...get() });
    return options.storage.setItem(options.name, {
      state,
    });
  };
  const savedSetState = api.setState;

  api.setState = (state) => {
    savedSetState(state);
    setItem();
  };

  const configResult = config(
    (...args) => {
      set(...args);
      setItem();
    },
    get,
    api
  );

  let stateFromStorage: S | undefined;

  const hydrate = () => {
    const foundState = options.storage.getItem(options.name)?.state as S;
    stateFromStorage = options.merge(foundState as S, get() ?? configResult);

    set(stateFromStorage);
    setItem();
  };

  hydrate();

  const r = stateFromStorage || configResult;
  return r;
};
