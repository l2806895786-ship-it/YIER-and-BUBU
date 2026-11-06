import React from 'react';
import { useGame } from '../context/GameContext';
import { Modal } from '../components/common/Modal';
import { DAILY_TASKS_TEMPLATE } from '../data/dailyTasks';
import { Check, Gift, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface DailyTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyTasksModal: React.FC<DailyTasksModalProps> = ({ isOpen, onClose }) => {
  const { saveData, claimDailyTaskReward, setPage } = useGame();

  const handleClaim = (taskId: string) => {
    claimDailyTaskReward(taskId);
  };

  const handleGoTask = (taskId: string) => {
    sound.playPop();
    onClose();
    if (taskId === 'task_play_game') {
      setPage('games');
    } else if (taskId === 'task_check_album') {
      setPage('album');
    } else {
      setPage('home');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="每日日常任务"
      subtitle={`今日日期：${saveData.dailyTasksDate} · 每日0点自动刷新`}
      icon="📅"
    >
      <div className="space-y-2.5">
        {DAILY_TASKS_TEMPLATE.map(task => {
          const status = saveData.dailyTasksStatus[task.id] || { current: 0, completed: false, claimed: false };
          const isCompleted = status.completed;
          const isClaimed = status.claimed;

          return (
            <div
              key={task.id}
              className="p-3 rounded-2xl bg-white border-2 border-[#4B2925]/15 flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-[#4B2925] text-xs">{task.title}</h4>
                  <span className="text-[10px] text-[#8C6D62] bg-[#F2E6D9] px-2 py-0.5 rounded-full font-mono">
                    {Math.min(status.current, task.target)}/{task.target}
                  </span>
                </div>
                <p className="text-[10px] text-[#8C6D62] mt-0.5">{task.description}</p>
                <div className="text-[10px] font-bold text-[#C85A53] mt-1 flex items-center gap-1.5">
                  <span>+{task.rewardCoins} 🪙</span>
                  <span>·</span>
                  <span>+{task.rewardAffection} 💖</span>
                </div>
              </div>

              {isClaimed ? (
                <span className="px-3 py-1.5 rounded-xl bg-[#E8DACB]/40 text-[#8C6D62] text-xs font-bold shrink-0">
                  已领取
                </span>
              ) : isCompleted ? (
                <button
                  onClick={() => handleClaim(task.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#588157] text-white text-xs font-bold border-2 border-[#4B2925] shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0 animate-bounce"
                >
                  领取奖励
                </button>
              ) : (
                <button
                  onClick={() => handleGoTask(task.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#DCA58D] hover:bg-[#C88D74] text-white text-xs font-bold border-2 border-[#4B2925] active:scale-95 transition-transform flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>去完成</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
