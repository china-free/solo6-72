import { Timer, MousePointerClick, Volume2, VolumeX, RotateCcw, Home } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { formatTime } from '@/utils/gameLogic';
import { useNavigate } from 'react-router-dom';

export function StatusBar() {
  const navigate = useNavigate();
  const elapsedTime = useGameStore((state) => state.elapsedTime);
  const moves = useGameStore((state) => state.moves);
  const matchedPairs = useGameStore((state) => state.matchedPairs);
  const totalPairs = useGameStore((state) => state.totalPairs);
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const handleRestart = () => {
    startGame();
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-dark-800/80 border border-dark-600 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-neon-cyan/10">
              <Timer className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <div className="text-xs text-gray-500">用时</div>
              <div className="font-display font-bold text-xl text-neon-cyan">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-neon-pink/10">
              <MousePointerClick className="w-5 h-5 text-neon-pink" />
            </div>
            <div>
              <div className="text-xs text-gray-500">翻牌次数</div>
              <div className="font-display font-bold text-xl text-neon-pink">
                {moves}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-neon-green/10">
              <span className="text-neon-green text-lg">✓</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">已配对</div>
              <div className="font-display font-bold text-xl text-neon-green">
                {matchedPairs}/{totalPairs}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-3 rounded-xl border-2 border-dark-600 bg-dark-700 hover:border-neon-cyan hover:bg-dark-600 transition-all duration-300"
            title={soundEnabled ? '关闭音效' : '开启音效'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-neon-cyan" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-neon-yellow/50 bg-dark-700 hover:border-neon-yellow hover:bg-neon-yellow/10 transition-all duration-300 group"
          >
            <RotateCcw className="w-5 h-5 text-neon-yellow group-hover:animate-spin" />
            <span className="font-display font-bold text-neon-yellow">重新开始</span>
          </button>

          <button
            onClick={handleHome}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dark-600 bg-dark-700 hover:border-neon-purple hover:bg-dark-600 transition-all duration-300"
          >
            <Home className="w-5 h-5 text-gray-400" />
            <span className="font-display font-bold text-gray-400">主页</span>
          </button>
        </div>
      </div>
    </div>
  );
}
