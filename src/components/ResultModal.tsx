import { Trophy, Clock, MousePointerClick, Star, RotateCcw, Home } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { formatTime } from '@/utils/gameLogic';
import { useNavigate } from 'react-router-dom';

export function ResultModal() {
  const navigate = useNavigate();
  const isCompleted = useGameStore((state) => state.isCompleted);
  const elapsedTime = useGameStore((state) => state.elapsedTime);
  const moves = useGameStore((state) => state.moves);
  const isNewRecord = useGameStore((state) => state.isNewRecord);
  const difficulty = useGameStore((state) => state.difficulty);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!isCompleted) return null;

  const handlePlayAgain = () => {
    startGame();
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 border-2 border-neon-green/50 shadow-neon-green animate-scale-in overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-neon-cyan/5" />

        <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-green/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          {isNewRecord ? (
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Trophy className="w-20 h-20 text-neon-yellow animate-float drop-shadow-lg" />
                <div className="absolute -top-2 -right-2">
                  <Star className="w-8 h-8 text-neon-yellow fill-neon-yellow animate-pulse" />
                </div>
              </div>
              <h2 className="mt-4 font-display font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-green">
                🎉 新纪录！
              </h2>
              <p className="mt-1 text-gray-400">太棒了！你打破了最佳记录！</p>
            </div>
          ) : (
            <div className="flex flex-col items-center mb-6">
              <div className="p-4 rounded-full bg-neon-cyan/10">
                <Trophy className="w-16 h-16 text-neon-cyan" />
              </div>
              <h2 className="mt-4 font-display font-bold text-3xl text-neon-cyan">
                恭喜完成！
              </h2>
              <p className="mt-1 text-gray-400">你成功配对了所有卡片！</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-dark-800/80 border border-dark-600 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-neon-cyan" />
                <span className="text-sm text-gray-400">用时</span>
              </div>
              <div className="font-display font-bold text-2xl text-neon-cyan">
                {formatTime(elapsedTime)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-800/80 border border-dark-600 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MousePointerClick className="w-5 h-5 text-neon-pink" />
                <span className="text-sm text-gray-400">翻牌次数</span>
              </div>
              <div className="font-display font-bold text-2xl text-neon-pink">
                {moves}
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-sm font-display">
              难度：{difficulty}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePlayAgain}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-neon-green bg-neon-green/10 hover:bg-neon-green/20 hover:shadow-neon-green transition-all duration-300 group"
            >
              <RotateCcw className="w-5 h-5 text-neon-green group-hover:animate-spin" />
              <span className="font-display font-bold text-neon-green">再玩一次</span>
            </button>

            <button
              onClick={handleHome}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-dark-600 bg-dark-700 hover:border-neon-cyan hover:bg-dark-600 transition-all duration-300"
            >
              <Home className="w-5 h-5 text-gray-300" />
              <span className="font-display font-bold text-gray-300">返回主页</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
