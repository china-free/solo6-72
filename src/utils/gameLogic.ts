import type { Card, ThemeType, DifficultyType } from '@/types';
import { NUMBER_VALUES, LETTER_VALUES, ANIMAL_VALUES, EMOJI_VALUES } from './themes';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getPairCount(difficulty: DifficultyType): number {
  switch (difficulty) {
    case '4x4': return 8;
    case '6x6': return 18;
    case '8x8': return 32;
    default: return 8;
  }
}

export function getGridCols(difficulty: DifficultyType): number {
  switch (difficulty) {
    case '4x4': return 4;
    case '6x6': return 6;
    case '8x8': return 8;
    default: return 4;
  }
}

export function getRequiredImageCount(difficulty: DifficultyType): number {
  return getPairCount(difficulty);
}

export function hasEnoughCustomImages(difficulty: DifficultyType, customImages: string[]): boolean {
  return customImages.length >= getRequiredImageCount(difficulty);
}

function getThemeValues(theme: ThemeType, customImages?: string[]): string[] {
  switch (theme) {
    case 'numbers':
      return NUMBER_VALUES;
    case 'letters':
      return LETTER_VALUES;
    case 'animals':
      return ANIMAL_VALUES;
    case 'emoji':
      return EMOJI_VALUES;
    case 'custom':
      return customImages && customImages.length > 0 ? customImages : EMOJI_VALUES;
    default:
      return EMOJI_VALUES;
  }
}

export function generateCards(
  theme: ThemeType,
  difficulty: DifficultyType,
  customImages?: string[]
): Card[] {
  const pairCount = getPairCount(difficulty);
  const allValues = getThemeValues(theme, customImages);

  let selectedValues: string[];

  if (theme === 'custom' && customImages) {
    if (!hasEnoughCustomImages(difficulty, customImages)) {
      console.warn(`自定义图片数量不足：需要 ${pairCount} 张，实际只有 ${customImages.length} 张`);
      selectedValues = customImages.slice(0, Math.min(customImages.length, pairCount));
    } else {
      selectedValues = customImages.slice(0, pairCount);
    }
  } else {
    selectedValues = allValues.slice(0, Math.min(pairCount, allValues.length));

    while (selectedValues.length < pairCount) {
      selectedValues.push(allValues[selectedValues.length % allValues.length]);
    }
  }

  const cardPairs: Card[] = [];
  selectedValues.forEach((value, index) => {
    for (let i = 0; i < 2; i++) {
      cardPairs.push({
        id: `${index}-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        value,
        isFlipped: false,
        isMatched: false,
      });
    }
  });

  return shuffleArray(cardPairs);
}

export function checkMatch(card1: Card, card2: Card): boolean {
  return card1.value === card2.value;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
