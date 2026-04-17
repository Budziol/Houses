import { create } from "zustand";

interface LoadingState {
  isSceneReady: boolean;
  setSceneReady: (ready: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isSceneReady: false,
  setSceneReady: (ready) => set({ isSceneReady: ready }),
}));
