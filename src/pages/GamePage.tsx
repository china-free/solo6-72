import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/Card';
import { StatusBar } from '@/components/StatusBar';
import { ResultModal } from '@/components/ResultModal';
import { useGameStore } from '@/store/gameStore';
import { useTimer } from '@/hooks/useTimer';
import { getGridCols } from '@/utils/gameLogic';

export function GamePage() {
  const navigate = useNavigate();
  const cards = useGameStore((state) => state.cards);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const isCompleted = useGameStore((state) => state.isCompleted);
  const difficulty = useGameStore((state) => state.difficulty);
  const flippedCards = useGameStore((state) => state.flippedCards);
  const flipCard = useGameStore((state) => state.flipCard);
  const startGame = useGameStore((state) => state.startGame);

  useTimer();

  useEffect(() => {
    if (!isPlaying && !isCompleted && cards.length === 0) {
      startGame();
    }
  }, [isPlaying, isCompleted, cards.length, startGame]);

  useEffect(() => {
    if (!isPlaying && !isCompleted && cards.length === 0) {
      navigate('/');
    }
  }, [isPlaying, isCompleted, cards.length, navigate]);

  const gridCols = getGridCols(difficulty);

  const gridClass = {
    4: 'grid-cols-2 sm:grid-cols-4',
    6: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
    8: 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8',
  }[gridCols] || 'grid-cols-4';

  const gapClass = {
    4: 'gap-3 sm:gap-4',
    6: 'gap-2 sm:gap-3',
    8: 'gap-1.5 sm:gap-2',
  }[gridCols] || 'gap-3';

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-display text-neon-cyan text-xl animate-pulse">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <StatusBar />

      <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
        <div className={`grid ${gridClass} ${gapClass} w-full animate-scale-in`}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 20}ms`,
              }}
            >
              <Card
                card={card}
                onClick={() => flipCard(card.id)}
                disabled={flippedCards.length >= 2 || card.isFlipped || card.isMatched}
              />
            </div>
          ))}
        </div>
      </div>

      <ResultModal />
    </div>
  );
}
