import React from 'react';
import { PageId } from '../../types/game';
import { Home, Gamepad2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const tabs = [
    { id: 'home' as PageId, label: '小屋', icon: Home, emoji: '🏡' },
    { id: 'games' as PageId, label: '游戏', icon: Gamepad2, emoji: '🎮' },
    { id: 'dressup' as PageId, label: '装扮', icon: Sparkles, emoji: '👗' },
    { id: 'album' as PageId, label: '相册', icon: ImageIcon, emoji: '📸' }
  ];

  const handleTabClick = (pageId: PageId) => {
    sound.playPop();
    onNavigate(pageId);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#FFF9F3]/95 backdrop-blur-md border-t-2 border-[#4B2925]/15 px-3 py-2 select-none shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around gap-1">
        {tabs.map(tab => {
          const isActive = currentPage === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#FBEAE7] text-[#4B2925] scale-105 font-bold shadow-xs border border-[#F6C8C5]'
                  : 'text-[#8C6D62] hover:text-[#4B2925] hover:bg-black/5 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-2 text-[10px] animate-bounce">
                    ✨
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
