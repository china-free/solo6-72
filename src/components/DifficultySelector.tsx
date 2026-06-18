import { DIFFICULTIES } from '@/utils/themes';
import { useGameStore } from '@/store/gameStore';
import type { DifficultyType } from '@/types';

export function DifficultySelector() {
  const difficulty = useGameStore((state) => state.difficulty);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  return (
    <div className="w-full">
      <h3 className="text-lg font-display font-bold text-neon-pink mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
        选择难度
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.type}
            onClick={() => setDifficulty(d.type as DifficultyType)}
            className={`
              group relative p-5 rounded-xl border-2 transition-all duration-300
              flex flex-col items-center gap-2
              ${difficulty === d.type
                ? 'border-neon-pink bg-neon-pink/10 shadow-neon-pink scale-105'
                : 'border-dark-600 bg-dark-700/50 hover:border-neon-cyan/50 hover:bg-dark-700'
              }
            `}
          >
            <span
              className={`
                font-display font-bold text-2xl
                ${difficulty === d.type ? 'text-neon-pink' : 'text-gray-300 group-hover:text-neon-cyan'}
              `}
            >
              {d.name}
            </span>
            <span
              className={`
                font-display text-lg
                ${difficulty === d.type ? 'text-neon-pink/80' : 'text-gray-400'}
              `}
            >
              {d.description}
            </span>
            <span className="text-xs text-gray-500">{d.pairs} 对卡片</span>
            {difficulty === d.type && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full flex items-center justify-center">
                <span className="text-dark-900 text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
