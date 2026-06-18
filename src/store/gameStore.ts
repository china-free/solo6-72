import { create } from 'zustand';
import type { Card, ThemeType, DifficultyType } from '@/types';
import { generateCards, checkMatch, hasEnoughCustomImages, getPairCount } from '@/utils/gameLogic';
import {
  playFlipSound,
  playMatchSound,
  playMismatchSound,
  playWinSound,
} from '@/utils/soundManager';
import {
  getSoundPreference,
  saveSoundPreference,
  getCustomImages,
  saveCustomImages,
  saveBestRecord,
  isNewRecord,
} from '@/utils/storage';

interface GameStore {
  theme: ThemeType;
  difficulty: DifficultyType;
  cards: Card[];
  flippedCards: string[];
  moves: number;
  startTime: number | null;
  endTime: number | null;
  elapsedTime: number;
  isPlaying: boolean;
  isCompleted: boolean;
  soundEnabled: boolean;
  customImages: string[];
  matchedPairs: number;
  totalPairs: number;
  isNewRecord: boolean;

  setTheme: (theme: ThemeType) => void;
  setDifficulty: (difficulty: DifficultyType) => void;
  startGame: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  updateElapsedTime: () => void;
  toggleSound: () => void;
  addCustomImage: (imageData: string) => void;
  removeCustomImage: (index: number) => void;
  clearCustomImages: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  theme: 'emoji',
  difficulty: '4x4',
  cards: [],
  flippedCards: [],
  moves: 0,
  startTime: null,
  endTime: null,
  elapsedTime: 0,
  isPlaying: false,
  isCompleted: false,
  soundEnabled: getSoundPreference(),
  customImages: getCustomImages(),
  matchedPairs: 0,
  totalPairs: 8,
  isNewRecord: false,

  setTheme: (theme) => set({ theme }),

  setDifficulty: (difficulty) => set({ difficulty }),

  startGame: () => {
    const { theme, difficulty, customImages } = get();

    if (theme === 'custom' && !hasEnoughCustomImages(difficulty, customImages)) {
      const required = getPairCount(difficulty);
      console.error(`图片不足：${difficulty} 难度需要 ${required} 张图片，但只有 ${customImages.length} 张`);
      return;
    }

    const cards = generateCards(theme, difficulty, customImages);
    const pairCount = cards.length / 2;

    if (pairCount === 0) {
      console.error('无法生成卡片，卡片数量为0');
      return;
    }

    set({
      cards,
      flippedCards: [],
      moves: 0,
      startTime: Date.now(),
      endTime: null,
      elapsedTime: 0,
      isPlaying: true,
      isCompleted: false,
      matchedPairs: 0,
      totalPairs: pairCount,
      isNewRecord: false,
    });
  },

  flipCard: (cardId) => {
    const state = get();
    const { cards, flippedCards, soundEnabled, isPlaying, isCompleted, moves, matchedPairs, totalPairs, difficulty } = state;

    if (!isPlaying || isCompleted) return;
    if (flippedCards.length >= 2) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    playFlipSound(soundEnabled);

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    const newFlippedCards = [...flippedCards, cardId];

    if (newFlippedCards.length === 1) {
      set({
        cards: newCards,
        flippedCards: newFlippedCards,
      });
    } else if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId)!;
      const secondCard = newCards.find((c) => c.id === secondId)!;
      const newMoves = moves + 1;

      set({
        cards: newCards,
        flippedCards: newFlippedCards,
        moves: newMoves,
      });

      if (checkMatch(firstCard, secondCard)) {
        setTimeout(() => {
          playMatchSound(soundEnabled);
          const currentState = get();
          const newMatchedPairs = currentState.matchedPairs + 1;
          const isCompletedNow = newMatchedPairs >= currentState.totalPairs;

          let finalEndTime: number | null = null;
          let finalElapsed = 0;
          let newRecord = false;

          if (isCompletedNow) {
            finalEndTime = Date.now();
            finalElapsed = Math.floor((finalEndTime - (currentState.startTime || Date.now())) / 1000);
            newRecord = isNewRecord(difficulty, finalElapsed, newMoves);
            if (newRecord) {
              saveBestRecord(difficulty, finalElapsed, newMoves);
            }
            playWinSound(soundEnabled);
          }

          set({
            cards: currentState.cards.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            ),
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            isCompleted: isCompletedNow,
            isPlaying: !isCompletedNow,
            endTime: finalEndTime,
            elapsedTime: finalElapsed || currentState.elapsedTime,
            isNewRecord: newRecord,
          });
        }, 500);
      } else {
        setTimeout(() => {
          playMismatchSound(soundEnabled);
          const currentState = get();
          set({
            cards: currentState.cards.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            ),
            flippedCards: [],
          });
        }, 1000);
      }
    }
  },

  resetGame: () => {
    set({
      cards: [],
      flippedCards: [],
      moves: 0,
      startTime: null,
      endTime: null,
      elapsedTime: 0,
      isPlaying: false,
      isCompleted: false,
      matchedPairs: 0,
      isNewRecord: false,
    });
  },

  updateElapsedTime: () => {
    const { startTime, isPlaying, isCompleted } = get();
    if (startTime && isPlaying && !isCompleted) {
      set({
        elapsedTime: Math.floor((Date.now() - startTime) / 1000),
      });
    }
  },

  toggleSound: () => {
    const newState = !get().soundEnabled;
    saveSoundPreference(newState);
    set({ soundEnabled: newState });
  },

  addCustomImage: (imageData) => {
    const newImages = [...get().customImages, imageData];
    saveCustomImages(newImages);
    set({ customImages: newImages });
  },

  removeCustomImage: (index) => {
    const newImages = get().customImages.filter((_, i) => i !== index);
    saveCustomImages(newImages);
    set({ customImages: newImages });
  },

  clearCustomImages: () => {
    saveCustomImages([]);
    set({ customImages: [] });
  },
}));
