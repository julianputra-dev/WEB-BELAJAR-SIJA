// File: src/services/progressService.ts
import { MalwareType } from '@/types/simulation';

export interface ModuleProgressRecord {
  malwareType: MalwareType;
  infectionObserved: boolean;
  mitigationCompleted: boolean;
  mistakeCount: number;
  updatedAt: string;
}

const STORAGE_KEY = 'sija_security_lab_progress';

export const ProgressService = {
  async saveModuleProgress(record: ModuleProgressRecord): Promise<void> {
    if (typeof window === 'undefined') return;

    // FASE SEKARANG: Simpan di LocalStorage
    const rawData = localStorage.getItem(STORAGE_KEY);
    const allProgress: Record<string, ModuleProgressRecord> = rawData ? JSON.parse(rawData) : {};
    allProgress[record.malwareType] = {
      ...record,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));

    // FASE MASA DEPAN (SUPABASE):
    // Cukup ganti blok di atas dengan pemanggilan API database:
    // await supabase.from('student_progress').upsert({ user_id, ...record });
  },

  async getAllProgress(): Promise<Record<string, ModuleProgressRecord>> {
    if (typeof window === 'undefined') return {};
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : {};
  },

  async getProgressByMalware(malwareType: MalwareType): Promise<ModuleProgressRecord | null> {
    if (typeof window === 'undefined') return null;
    const allProgress = await this.getAllProgress();
    return allProgress[malwareType] || null;
  },

  async clearAllProgress(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
