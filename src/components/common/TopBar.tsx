import React from 'react';
import { useGame, AFFECTION_LEVELS } from '../../context/GameContext';
import { Settings, CalendarCheck, Trophy, Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TopBarProps {
  onOpenTasks: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenTasks,
  onOpenAchievements,
  onOpenSettings
}) => {
  const {
    saveData,
    page,
    setPage,
    affectionLevel,
    affectionLevelName,
    affectionProgressPercent,
    updateSettings
  } = useGame();

  // Check if any daily tasks can be claimed
  const hasClaimableTasks = Object.values(saveData.dailyTasksStatus).some(
    t => t.completed && !t.claimed
  );

  // Check if any achievements can be claimed
  const hasClaimableAchievements = Object.values(saveData.achievements).some(
    a => a.unlocked && !a.claimed
  );

  return (
    <header className="w-full max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2 z-30 select-none">
      {/* --- AFFECTION BADGE & BAR --- */}
      <div className="flex items-center gap-2 bg-[#FFF9F3]/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border-2 border-[#4B2925]/15 shadow-xs">
        <div className="w-8 h-8 rounded-full bg-[#F6C8C5] flex items-center justify-center text-sm shadow-inner shrink-0">
          💖
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B2925]">
            <span className="text-[#C87961]">Lv.{affectionLevel}</span>
            <span className="text-[11px] text-[#4B2925]/80">{affectionLevelName}</span>
          </div>
          {/* Progress track */}
          <div className="w-20 sm:w-24 h-1.5 bg-[#E8DACB] rounded-full overflow-hidden mt-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#F6C8C5] to-[#F67280] rounded-full transition-all duration-500"
              style={{ width: `${affectionProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* --- HEART COINS --- */}
      <div className="flex items-center gap-1.5 bg-[#FFF9F3]/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border-2 border-[#4B2925]/15 shadow-xs">
        <span className="text-base">🪙</span>
        <span className="font-mono tabular-nums font-bold text-[#4B2925] text-sm">
          {saveData.currency}
        </span>
      </div>

      {/* --- QUICK ACTION BUTTONS --- */}
      <div className="flex items-center gap-1.5">
        {/* Character Showcase Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            setPage(page === 'showcase' ? 'home' : 'showcase');
          }}
          title={page === 'showcase' ? "返回小熊小屋" : "查看角色模型验收台"}
          className={`px-2.5 py-1.5 rounded-xl border-2 border-[#4B2925]/20 flex items-center gap-1 text-xs font-bold transition-transform active:scale-90 shadow-xs cursor-pointer ${
            page === 'showcase' ? 'bg-[#588157] text-white' : 'bg-[#FFF9F3] text-[#4B2925] hover:bg-[#FBEAE7]'
          }`}
        >
          <span>🐻</span>
          <span className="hidden sm:inline">{page === 'showcase' ? '返回小屋' : '模型验收'}</span>
        </button>
        {/* Daily Tasks Button */}
        <button
          onClick={onOpenTasks}
          title="每日任务"
          className="relative w-9 h-9 rounded-xl bg-[#FFF9F3] hover:bg-[#FBEAE7] border-2 border-[#4B2925]/15 flex items-center justify-center text-[#4B2925] transition-transform active:scale-90 shadow-xs cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4 text-[#8C6D62]" />
          {hasClaimableTasks && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E85D56] ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Achievements Button */}
        <button
          onClick={onOpenAchievements}
          title="成就系统"
          className="relative w-9 h-9 rounded-xl bg-[#FFF9F3] hover:bg-[#FBEAE7] border-2 border-[#4B2925]/15 flex items-center justify-center text-[#4B2925] transition-transform active:scale-90 shadow-xs cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-[#C98B2C]" />
          {hasClaimableAchievements && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E85D56] ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Music Quick Toggle */}
        <button
          onClick={() => updateSettings({ musicEnabled: !saveData.settings.musicEnabled })}
          title={saveData.settings.musicEnabled ? "静音背景音乐" : "开启背景音乐"}
          className={`w-9 h-9 rounded-xl border-2 border-[#4B2925]/15 flex items-center justify-center transition-transform active:scale-90 shadow-xs cursor-pointer ${
            saveData.settings.musicEnabled ? 'bg-[#F6D58B]/40 text-[#4B2925]' : 'bg-[#FFF9F3] text-[#A89F91]'
          }`}
        >
          <Music className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="游戏设置"
          className="w-9 h-9 rounded-xl bg-[#FFF9F3] hover:bg-[#FBEAE7] border-2 border-[#4B2925]/15 flex items-center justify-center text-[#4B2925] transition-transform active:scale-90 shadow-xs cursor-pointer"
        >
          <Settings className="w-4 h-4 text-[#8C6D62]" />
        </button>
      </div>
    </header>
  );
};
