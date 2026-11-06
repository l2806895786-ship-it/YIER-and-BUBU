import React from 'react';
import { useGame } from '../../context/GameContext';

export const RewardToastContainer: React.FC = () => {
  const { rewardToasts, dismissToast } = useGame();

  if (rewardToasts.length === 0) return null;

  return (
    <div className="fixed top-14 inset-x-0 z-50 flex flex-col items-center pointer-events-none gap-2 px-4">
      {rewardToasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className="pointer-events-auto bg-[#FFF9F3]/95 border-2 border-[#4B2925]/20 shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2.5 animate-gentle-bounce cursor-pointer active:scale-95 transition-transform"
        >
          {toast.icon && <span className="text-xl">{toast.icon}</span>}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#4B2925]">{toast.text}</span>
          </div>
          {toast.coins && (
            <span className="bg-[#F6D58B]/50 text-[#7A531A] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +{toast.coins} 🪙
            </span>
          )}
          {toast.affection && (
            <span className="bg-[#F6C8C5]/50 text-[#C85A53] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +{toast.affection} 💖
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
