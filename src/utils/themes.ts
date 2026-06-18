import type { ThemeItem, DifficultyItem } from '@/types';

export const THEMES: ThemeItem[] = [
  {
    type: 'numbers',
    name: '数字',
    icon: '123',
    description: '经典数字配对',
  },
  {
    type: 'letters',
    name: '字母',
    icon: 'ABC',
    description: '英文字母配对',
  },
  {
    type: 'animals',
    name: '动物',
    icon: '🐾',
    description: '可爱动物图标',
  },
  {
    type: 'emoji',
    name: 'Emoji',
    icon: '😀',
    description: '趣味表情符号',
  },
  {
    type: 'custom',
    name: '自定义',
    icon: '📷',
    description: '上传自定义图片',
  },
];

export const DIFFICULTIES: DifficultyItem[] = [
  {
    type: '4x4',
    name: '简单',
    pairs: 8,
    description: '4×4 网格',
  },
  {
    type: '6x6',
    name: '中等',
    pairs: 18,
    description: '6×6 网格',
  },
  {
    type: '8x8',
    name: '困难',
    pairs: 32,
    description: '8×8 网格',
  },
];

export const NUMBER_VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'];

export const LETTER_VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f'];

export const ANIMAL_VALUES = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞'];

export const EMOJI_VALUES = ['😀', '😎', '🥳', '😍', '🤩', '😇', '🤠', '🥸', '🤖', '👻', '🎃', '😺', '🌈', '⭐', '🔥', '💎', '🎮', '🎯', '🏆', '🎪', '🎨', '🎭', '🎵', '🚀', '🛸', '⚡', '🌙', '☀️', '🍎', '🍕', '🎂', '🍦'];
