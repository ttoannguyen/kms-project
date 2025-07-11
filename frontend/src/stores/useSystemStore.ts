import { create } from "zustand";

interface SystemState {
  maintenance: boolean;
  message: string;
  setStatus: (status: { maintenance: boolean; message: string }) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  maintenance: false,
  message: "",
  setStatus: (status) => set(status),
}));
