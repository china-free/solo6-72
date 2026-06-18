import { THEMES } from '@/utils/themes';
import { useGameStore } from '@/store/gameStore';
import type { ThemeType } from '@/types';

export function ThemeSelector() {
  const theme = useGameStore((state) => state.theme);
  const setTheme = useGameStore((state) => state.setTheme);

  return (
    <div className="w-full">
      <h3 className="text-lg font-display font-bold text-neon-cyan mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
        选择主题
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {THEMES.map((t) => (
          <button
            key={t.type}
            onClick={() => setTheme(t.type as ThemeType)}
            className={`
              group relative p-4 rounded-xl border-2 transition-all duration-300
              flex flex-col items-center gap-2
              ${theme === t.type
                ? 'border-neon-cyan bg-neon-cyan/10 shadow-neon-cyan scale-105'
                : 'border-dark-600 bg-dark-700/50 hover:border-neon-pink/50 hover:bg-dark-700'
              }
            `}
          >
            <span className="text-3xl">{t.icon}</span>
            <span
              className={`
                font-display font-bold text-sm
                ${theme === t.type ? 'text-neon-cyan' : 'text-gray-300 group-hover:text-neon-pink'}
              `}
            >
              {t.name}
            </span>
            <span className="text-xs text-gray-500 text-center">{t.description}</span>
            {theme === t.type && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full flex items-center justify-center">
                <span className="text-dark-900 text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
