import { useState, useEffect } from 'react';
import type { Card as CardType } from '@/types';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  const [showMismatch, setShowMismatch] = useState(false);
  const [prevMatched, setPrevMatched] = useState(card.isMatched);

  useEffect(() => {
    if (!prevMatched && card.isMatched) {
    }
    setPrevMatched(card.isMatched);
  }, [card.isMatched, prevMatched]);

  useEffect(() => {
    if (!card.isFlipped && !card.isMatched && prevMatched !== undefined) {
      setShowMismatch(true);
      const timer = setTimeout(() => setShowMismatch(false), 500);
      return () => clearTimeout(timer);
    }
  }, [card.isFlipped, card.isMatched, prevMatched]);

  const isImageValue = card.value.startsWith('data:image') || card.value.startsWith('http');

  return (
    <div
      className={`
        relative cursor-pointer perspective-1000
        aspect-square w-full
        transition-transform duration-200
        ${disabled ? 'pointer-events-none' : 'hover:scale-105'}
      `}
      onClick={onClick}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500 transform-style-3d
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className={`
            absolute inset-0 rounded-xl backface-hidden
            bg-gradient-to-br from-dark-700 to-dark-800
            border-2 border-neon-cyan/30
            flex items-center justify-center
            transition-all duration-300
            hover:border-neon-cyan hover:shadow-neon-cyan
            ${showMismatch ? 'animate-shake border-neon-red shadow-neon-red' : ''}
          `}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-neon-cyan text-4xl font-display font-bold opacity-50">
            ?
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/5 to-neon-pink/5" />
        </div>

        <div
          className={`
            absolute inset-0 rounded-xl backface-hidden
            bg-gradient-to-br from-dark-600 to-dark-700
            border-2
            flex items-center justify-center overflow-hidden
            transition-all duration-500
            ${card.isMatched
              ? 'border-neon-green shadow-neon-green animate-win-glow'
              : 'border-neon-pink/50 shadow-neon-pink'
            }
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {isImageValue ? (
            <img
              src={card.value}
              alt="card"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span
              className={`
                font-display font-bold select-none
                ${card.value.length > 2 ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'}
                ${card.isMatched ? 'text-neon-green' : 'text-neon-cyan'}
                drop-shadow-lg
              `}
            >
              {card.value}
            </span>
          )}
          {card.isMatched && (
            <div className="absolute inset-0 rounded-xl bg-neon-green/10 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
