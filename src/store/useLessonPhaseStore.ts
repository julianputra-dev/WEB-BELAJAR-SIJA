// File: src/store/useLessonPhaseStore.ts
import { create } from 'zustand';
import { SimulationPhase } from '@/types/simulation';

interface LessonPhaseStore {
  currentPhase: SimulationPhase;
  errorFeedback: string | null;
  mistakeCount: number;
  systemLogs: string[];
  setPhase: (nextPhase: SimulationPhase, logMessage: string) => void;
  triggerWrongOrderError: (errorMessage: string, logMessage: string) => void;
  clearError: () => void;
  resetLesson: () => void;
}

export const useLessonPhaseStore = create<LessonPhaseStore>((set) => ({
  currentPhase: 'idle',
  errorFeedback: null,
  mistakeCount: 0,
  systemLogs: ['[SYSTEM] Sandbox siap. Silakan jalankan skenario untuk mengamati perilaku sistem.'],

  setPhase: (nextPhase, logMessage) =>
    set((state) => ({
      currentPhase: nextPhase,
      errorFeedback: null,
      systemLogs: [...state.systemLogs, logMessage],
    })),

  triggerWrongOrderError: (errorMessage, logMessage) =>
    set((state) => ({
      errorFeedback: errorMessage,
      mistakeCount: state.mistakeCount + 1,
      systemLogs: [...state.systemLogs, logMessage],
    })),

  clearError: () => set({ errorFeedback: null }),

  resetLesson: () =>
    set({
      currentPhase: 'idle',
      errorFeedback: null,
      mistakeCount: 0,
      systemLogs: ['[SYSTEM] Simulasi direset ke kondisi awal yang bersih.'],
    }),
}));
