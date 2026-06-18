import { Trophy, Clock, MousePointerClick } from 'lucide-react';
import { getAllBestRecords } from '@/utils/storage';
import { formatTime } from '@/utils/gameLogic';
import { DIFFICULTIES } from '@/utils/themes';
import type { DifficultyType } from '@/types';
import { useState, useEffect } from 'react';

export function BestRecords() {
  const [records, setRecords] = useState(getAllBestRecords());

  useEffect(() => {
    const updateRecords = () => setRecords(getAllBestRecords());
    window.addEventListener('storage', updateRecords);
    const interval = setInterval(updateRecords, 1000);
    return () => {
      window.removeEventListener('storage', updateRecords);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-display font-bold text-neon-yellow mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" />
        最佳记录
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DIFFICULTIES.map((d) => {
          const record = records[d.type as DifficultyType];
          return (
            <div
              key={d.type}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300
                ${record
                  ? 'border-neon-yellow/30 bg-neon-yellow/5'
                  : 'border-dark-600 bg-dark-700/50'
                }
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-neon-yellow">{d.name}</span>
                <span className="text-xs text-gray-500">{d.description}</span>
              </div>

              {record ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-cyan" />
                    <span className="font-display text-neon-cyan">
                      {formatTime(record.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-neon-pink" />
                    <span className="font-display text-neon-pink">{record.moves} 次</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.date).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm italic">
                  暂无记录
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
