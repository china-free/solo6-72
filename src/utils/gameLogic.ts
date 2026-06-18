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

export interface CardGenerationStrategy {
  getRequiredPairCount(difficulty: DifficultyType): number;
  canGenerate(difficulty: DifficultyType, customImages?: string[]): boolean;
  generateValues(difficulty: DifficultyType, customImages?: string[]): string[];
  getValidationInfo(difficulty: DifficultyType, customImages?: string[]): {
    required: number;
    current: number;
    isSufficient: boolean;
    hint: string;
  };
}

class DefaultThemeStrategy implements CardGenerationStrategy {
  private valuePool: string[];

  constructor(valuePool: string[]) {
    this.valuePool = valuePool;
  }

  getRequiredPairCount(difficulty: DifficultyType): number {
    return getPairCount(difficulty);
  }

  canGenerate(difficulty: DifficultyType): boolean {
    const required = this.getRequiredPairCount(difficulty);
    return this.valuePool.length > 0 && required > 0;
  }

  generateValues(difficulty: DifficultyType): string[] {
    const pairCount = this.getRequiredPairCount(difficulty);
    const selectedValues = this.valuePool.slice(0, Math.min(pairCount, this.valuePool.length));

    while (selectedValues.length < pairCount) {
      selectedValues.push(this.valuePool[selectedValues.length % this.valuePool.length]);
    }

    return selectedValues;
  }

  getValidationInfo(difficulty: DifficultyType): {
    required: number;
    current: number;
    isSufficient: boolean;
    hint: string;
  } {
    const required = this.getRequiredPairCount(difficulty);
    const current = this.valuePool.length;
    const isSufficient = this.canGenerate(difficulty);

    return {
      required,
      current,
      isSufficient,
      hint: isSufficient
        ? `已加载 ${current} 个备选值，可生成 ${required} 对`
        : `需要 ${required} 对，当前值池不足`,
    };
  }
}

class CustomImageStrategy implements CardGenerationStrategy {
  getRequiredPairCount(difficulty: DifficultyType): number {
    return getPairCount(difficulty);
  }

  canGenerate(difficulty: DifficultyType, customImages?: string[]): boolean {
    if (!customImages || customImages.length === 0) return false;
    const required = this.getRequiredPairCount(difficulty);
    return customImages.length >= required;
  }

  generateValues(difficulty: DifficultyType, customImages?: string[]): string[] {
    const pairCount = this.getRequiredPairCount(difficulty);

    if (!customImages || customImages.length === 0) {
      console.warn('自定义图片为空，使用 Emoji 作为备用');
      return EMOJI_VALUES.slice(0, pairCount);
    }

    if (!this.canGenerate(difficulty, customImages)) {
      console.warn(
        `自定义图片数量不足：需要 ${pairCount} 张，实际只有 ${customImages.length} 张，仅生成 ${Math.min(customImages.length, pairCount)} 对`
      );
      return customImages.slice(0, Math.min(customImages.length, pairCount));
    }

    return customImages.slice(0, pairCount);
  }

  getValidationInfo(difficulty: DifficultyType, customImages?: string[]): {
    required: number;
    current: number;
    isSufficient: boolean;
    hint: string;
  } {
    const required = this.getRequiredPairCount(difficulty);
    const current = customImages?.length || 0;
    const isSufficient = this.canGenerate(difficulty, customImages);

    return {
      required,
      current,
      isSufficient,
      hint: isSufficient
        ? `图片数量充足（${current}/${required}），可以开始游戏`
        : `还需要上传 ${required - current} 张图片（当前 ${current}/${required}）`,
    };
  }
}

const strategyCache = new Map<ThemeType, CardGenerationStrategy>();

export function getCardGenerationStrategy(theme: ThemeType): CardGenerationStrategy {
  if (strategyCache.has(theme)) {
    return strategyCache.get(theme)!;
  }

  let strategy: CardGenerationStrategy;

  switch (theme) {
    case 'numbers':
      strategy = new DefaultThemeStrategy(NUMBER_VALUES);
      break;
    case 'letters':
      strategy = new DefaultThemeStrategy(LETTER_VALUES);
      break;
    case 'animals':
      strategy = new DefaultThemeStrategy(ANIMAL_VALUES);
      break;
    case 'emoji':
      strategy = new DefaultThemeStrategy(EMOJI_VALUES);
      break;
    case 'custom':
      strategy = new CustomImageStrategy();
      break;
    default:
      strategy = new DefaultThemeStrategy(EMOJI_VALUES);
  }

  strategyCache.set(theme, strategy);
  return strategy;
}

export function getRequiredImageCount(difficulty: DifficultyType): number {
  return getPairCount(difficulty);
}

export function hasEnoughCustomImages(difficulty: DifficultyType, customImages: string[]): boolean {
  const strategy = getCardGenerationStrategy('custom');
  return strategy.canGenerate(difficulty, customImages);
}

export function generateCards(
  theme: ThemeType,
  difficulty: DifficultyType,
  customImages?: string[]
): Card[] {
  const strategy = getCardGenerationStrategy(theme);
  const selectedValues = strategy.generateValues(difficulty, customImages);

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
