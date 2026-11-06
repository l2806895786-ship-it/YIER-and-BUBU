import React from 'react';
import { useGame } from '../context/GameContext';
import { Modal } from '../components/common/Modal';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { Trophy, CheckCircle2, Lock } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const { saveData, claimAchievementReward } = useGame();

  const unlockedCount = Object.values(saveData.achievements).filter(a => a.unlocked).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="荣誉成就殿堂"
      subtitle={`已达成 ${unlockedCount}/${INITIAL_ACHIEVEMENTS.length} 个成就`}
      icon="🏆"
    >
      <div className="space-y-2.5">
        {INITIAL_ACHIEVEMENTS.map(ach => {
          const status = saveData.achievements[ach.id] || { unlocked: false, claimed: false };
          const isUnlocked = status.unlocked;
          const isClaimed = status.claimed;

          return (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 shadow-xs transition-colors ${
                isUnlocked ? 'bg-white border-[#4B2925]/15' : 'bg-[#FAF3EB]/50 border-dashed border-[#4B2925]/20 opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                    isUnlocked
                      ? 'bg-[#FFF3DB] border-[#F6D58B]'
                      : 'bg-[#E8DACB]/40 border-transparent text-gray-400'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-4 h-4 text-[#8C6D62]" />}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-[#4B2925] text-xs">{ach.title}</h4>
                    {isUnlocked && (
                      <span className="text-[10px] text-[#588157] font-bold">已达成</span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8C6D62] mt-0.5">{ach.description}</p>
                  <div className="text-[10px] font-bold text-[#C85A53] mt-0.5">
                    奖励：+{ach.rewardCoins} 🪙 · +{ach.rewardAffection} 💖
                  </div>
                </div>
              </div>

              <div>
                {isClaimed ? (
                  <span className="px-3 py-1.5 rounded-xl bg-[#E8DACB]/40 text-[#8C6D62] text-xs font-bold shrink-0">
                    已领取
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => claimAchievementReward(ach.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#588157] text-white text-xs font-bold border-2 border-[#4B2925] shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0 animate-bounce"
                  >
                    领奖励
                  </button>
                ) : (
                  <span className="text-[11px] text-[#A89F91] font-semibold">未解锁</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
