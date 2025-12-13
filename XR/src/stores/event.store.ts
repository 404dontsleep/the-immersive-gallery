import { create } from 'zustand';

interface UserEventStore {
  orbitControlsMap: Map<string, boolean>;
  setOrbitControls: (id: string, isEnabled: boolean) => void;
}

export const useUserEventStore = create<UserEventStore>()((set) => ({
  orbitControlsMap: new Map(),
  setOrbitControls: (id: string, isEnabled: boolean) =>
    set((state) => {
      const newMap = new Map(state.orbitControlsMap);
      newMap.set(id, isEnabled);
      return { orbitControlsMap: newMap };
    }),
}));
