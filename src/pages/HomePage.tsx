import { Play, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeSelector } from '@/components/ThemeSelector';
import { DifficultySelector } from '@/components/DifficultySelector';
import { BestRecords } from '@/components/BestRecords';
import { ImageUploader } from '@/components/ImageUploader';
import { SoundToggle } from '@/components/SoundToggle';
import { useGameStore } from '@/store/gameStore';

export function HomePage() {
  const navigate = useNavigate();
  const theme = useGameStore((state) => state.theme);
  const customImages = useGameStore((state) => state.customImages);
  const startGame = useGameStore((state) => state.startGame);

  const canStart = theme !== 'custom' || customImages.length >= 8;

  const handleStart = () => {
    if (!canStart) return;
    startGame();
    navigate('/game');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 border border-neon-cyan/30">
              <Brain className="w-10 h-10 text-neon-cyan animate-float" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink animate-gradient bg-[length:200%_200%]">
                记忆翻牌游戏
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                挑战你的记忆力，配对所有卡片！
              </p>
            </div>
          </div>
          <SoundToggle />
        </div>

        <div className="space-y-6">
          <ThemeSelector />

          {theme === 'custom' && <ImageUploader />}

          <DifficultySelector />

          <BestRecords />

          <div className="pt-4">
            <button
              onClick={handleStart}
              disabled={!canStart}
              className={`
                w-full py-5 px-8 rounded-2xl font-display font-bold text-xl
                flex items-center justify-center gap-3
                transition-all duration-300 transform
                ${canStart
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-pink text-dark-900 shadow-neon-cyan hover:shadow-neon-pink hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-dark-700 text-gray-500 cursor-not-allowed border-2 border-dark-600'
                }
              `}
            >
              <Play className="w-7 h-7" />
              {canStart ? '开始游戏' : theme === 'custom' ? '请上传至少 8 张图片' : '开始游戏'}
            </button>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-600 text-sm">
          <p>玩法提示：翻开两张卡片，找到相同的配对。尽量用最少的步数和最短的时间完成！</p>
        </div>
      </div>
    </div>
  );
}
