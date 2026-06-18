import type { BestRecord, DifficultyType } from '@/types';

const BEST_RECORDS_KEY = 'memory_game_best_records';
const SOUND_PREF_KEY = 'memory_game_sound_enabled';
const CUSTOM_IMAGES_KEY = 'memory_game_custom_images';

export function saveBestRecord(difficulty: DifficultyType, time: number, moves: number): void {
  try {
    const allRecords = getAllBestRecords();
    const existing = allRecords[difficulty];

    if (!existing || time < existing.time || (time === existing.time && moves < existing.moves)) {
      allRecords[difficulty] = {
        difficulty,
        time,
        moves,
        date: new Date().toISOString(),
      };
      localStorage.setItem(BEST_RECORDS_KEY, JSON.stringify(allRecords));
    }
  } catch (e) {
    console.error('Failed to save best record:', e);
  }
}

export function getBestRecord(difficulty: DifficultyType): BestRecord | null {
  try {
    const allRecords = getAllBestRecords();
    return allRecords[difficulty] || null;
  } catch (e) {
    console.error('Failed to get best record:', e);
    return null;
  }
}

export function getAllBestRecords(): Record<DifficultyType, BestRecord | null> {
  try {
    const data = localStorage.getItem(BEST_RECORDS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to get all best records:', e);
  }
  return {
    '4x4': null,
    '6x6': null,
    '8x8': null,
  };
}

export function isNewRecord(difficulty: DifficultyType, time: number, moves: number): boolean {
  const existing = getBestRecord(difficulty);
  if (!existing) return true;
  return time < existing.time || (time === existing.time && moves < existing.moves);
}

export function saveSoundPreference(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_PREF_KEY, JSON.stringify(enabled));
  } catch (e) {
    console.error('Failed to save sound preference:', e);
  }
}

export function getSoundPreference(): boolean {
  try {
    const data = localStorage.getItem(SOUND_PREF_KEY);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to get sound preference:', e);
  }
  return true;
}

export function saveCustomImages(images: string[]): void {
  try {
    localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(images));
  } catch (e) {
    console.error('Failed to save custom images:', e);
  }
}

export function getCustomImages(): string[] {
  try {
    const data = localStorage.getItem(CUSTOM_IMAGES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to get custom images:', e);
  }
  return [];
}
