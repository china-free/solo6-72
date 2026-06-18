import { Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export function SoundToggle() {
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  return (
    <button
      onClick={toggleSound}
      className={`
        p-3 rounded-xl border-2 transition-all duration-300
        ${soundEnabled
          ? 'border-neon-cyan bg-neon-cyan/10 shadow-neon-cyan'
          : 'border-dark-600 bg-dark-700 hover:border-dark-500'
        }
      `}
      title={soundEnabled ? '关闭音效' : '开启音效'}
    >
      {soundEnabled ? (
        <Volume2 className="w-6 h-6 text-neon-cyan" />
      ) : (
        <VolumeX className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
}
