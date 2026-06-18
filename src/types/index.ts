export type ThemeType = 'numbers' | 'letters' | 'animals' | 'emoji' | 'custom';

export type DifficultyType = '4x4' | '6x6' | '8x8';

export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BestRecord {
  difficulty: DifficultyType;
  time: number;
  moves: number;
  date: string;
}

export interface ThemeItem {
  type: ThemeType;
  name: string;
  icon: string;
  description: string;
}

export interface DifficultyItem {
  type: DifficultyType;
  name: string;
  pairs: number;
  description: string;
}
