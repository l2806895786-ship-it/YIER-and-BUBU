import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AlbumCard } from '../types/game';
import { CharacterView } from '../components/character/CharacterView';
import { Image as ImageIcon, Download, X, Heart, Calendar, Filter, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const AlbumPage: React.FC = () => {
  const { saveData } = useGame();
  const [activeFilter, setActiveFilter] = useState<'all' | 'game' | 'studio' | 'milestone'>('all');
  const [selectedCard, setSelectedCard] = useState<AlbumCard | null>(null);
  const [showOriginalArtModal, setShowOriginalArtModal] = useState(false);

  const filterTabs = [
    { id: 'all' as const, label: '全部相片' },
    { id: 'game' as const, label: '小游戏挑战' },
    { id: 'studio' as const, label: '装扮与小屋' },
    { id: 'milestone' as const, label: '温馨里程碑' }
  ];

  const filteredAlbum = saveData.album.filter(card => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'game') return card.tag === 'memory' || card.tag === 'catch' || card.tag === 'quiz';
    if (activeFilter === 'studio') return card.tag === 'dressup' || card.tag === 'room';
    if (activeFilter === 'milestone') return card.tag === 'milestone';
    return true;
  });

  const handleCardClick = (card: AlbumCard) => {
    sound.playPop();
    setSelectedCard(card);
  };

  const handleDownloadCard = () => {
    sound.playShutter();
    // Simple prompt/notification for card save
    alert(`已生成纪念卡片「${selectedCard?.title}」！在手机或浏览器上长按或截图即可永久珍藏。`);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-1 select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#C85A53]" />
          <h2 className="font-extrabold text-[#4B2925] text-base">小熊纪念相册</h2>
        </div>

        {/* Button to view the canonical reference sheet uploaded by user */}
        <button
          onClick={() => {
            sound.playPop();
            setShowOriginalArtModal(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[11px] font-bold text-[#8C6D62] hover:bg-[#FBEAE7] active:scale-95 transition-transform cursor-pointer"
        >
          <span>📜 原作设定手稿</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none">
        {filterTabs.map(tab => {
          const isActive = activeFilter === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#DCA58D] text-white border-[#DCA58D] shadow-xs'
                  : 'bg-white text-[#8C6D62] border-[#4B2925]/15 hover:bg-[#FFF9F3]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3:4 Cards Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredAlbum.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="aspect-[3/4] bg-white rounded-2xl border-2 sm:border-3 border-[#4B2925]/20 p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#DCA58D] transition-all cursor-pointer active:scale-98 relative overflow-hidden group"
          >
            {/* Top Tag & Date */}
            <div className="flex items-center justify-between text-[10px] text-[#8C6D62]">
              <span className="font-mono">{card.date}</span>
              <Heart className="w-3 h-3 text-[#F6C8C5] fill-[#F6C8C5]" />
            </div>

            {/* Illustration Area */}
            <div
              className="my-auto w-full aspect-square rounded-xl flex items-center justify-center p-2 relative overflow-hidden border border-[#4B2925]/10"
              style={{ backgroundColor: card.decorBg || '#FFF9F3' }}
            >
              <div className="flex items-end justify-center -space-x-3">
                <CharacterView
                  type="yier"
                  size={76}
                  expression="happy"
                  pose="idle"
                  outfits={saveData.equippedOutfits.yier}
                  showShadow={false}
                />
                <CharacterView
                  type="bubu"
                  size={76}
                  expression="happy"
                  pose="idle"
                  outfits={saveData.equippedOutfits.bubu}
                  showShadow={false}
                />
              </div>
            </div>

            {/* Title & Preview Quote */}
            <div>
              <div className="font-extrabold text-[#4B2925] text-xs truncate">
                {card.title}
              </div>
              <div className="text-[10px] text-[#8C6D62] line-clamp-1 italic mt-0.5">
                “{card.quote}”
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-5 shadow-2xl animate-gentle-bounce flex flex-col items-center">
            {/* Header with Close */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/10">
              <span className="text-xs font-mono font-bold text-[#8C6D62]">
                {selectedCard.date}
              </span>
              <button
                onClick={() => setSelectedCard(null)}
                className="w-7 h-7 rounded-full bg-white border border-[#4B2925]/20 flex items-center justify-center text-xs font-bold text-[#4B2925] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Commemorative Portrait (3:4 ratio) */}
            <div
              className="w-full aspect-[3/4] max-h-72 rounded-2xl border-2 border-[#4B2925]/20 p-4 flex flex-col justify-between items-center relative overflow-hidden shadow-inner my-2"
              style={{ backgroundColor: selectedCard.decorBg || '#FFF9F3' }}
            >
              <div className="text-[11px] font-extrabold text-[#C87961] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#4B2925]/15">
                一二 & 布布 · 拍照记
              </div>

              {/* Characters Illustration */}
              <div className="flex items-end justify-center -space-x-4">
                <CharacterView
                  type="yier"
                  size={110}
                  expression="happy"
                  pose="idle"
                  outfits={saveData.equippedOutfits.yier}
                />
                <CharacterView
                  type="bubu"
                  size={110}
                  expression="wink"
                  pose="idle"
                  outfits={saveData.equippedOutfits.bubu}
                />
              </div>

              {/* Tender Quote Banner */}
              <div className="w-full bg-white/95 rounded-xl p-2.5 border border-[#4B2925]/15 text-center shadow-xs">
                <div className="font-extrabold text-[#4B2925] text-xs">
                  {selectedCard.title}
                </div>
                <div className="text-[11px] text-[#8C6D62] italic mt-1 leading-snug">
                  “{selectedCard.quote}”
                </div>
              </div>
            </div>

            {selectedCard.description && (
              <p className="text-[11px] text-[#8C6D62] text-center px-2 mt-1">
                {selectedCard.description}
              </p>
            )}

            {/* Download / Share Button */}
            <button
              onClick={handleDownloadCard}
              className="w-full mt-3 py-2.5 rounded-xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-bold text-xs border-2 border-[#4B2925] active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>保存珍藏相片</span>
            </button>
          </div>
        </div>
      )}

      {/* User Original Hand-Drawn Reference Modal */}
      {showOriginalArtModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-5 shadow-2xl animate-gentle-bounce flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/10">
              <h3 className="font-bold text-[#4B2925] text-xs">
                🎨 原作设定标准形象参考
              </h3>
              <button
                onClick={() => setShowOriginalArtModal(false)}
                className="w-7 h-7 rounded-full bg-white border border-[#4B2925]/20 flex items-center justify-center text-xs font-bold text-[#4B2925] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-80 overflow-y-auto rounded-2xl border-2 border-[#4B2925]/20 bg-white p-2">
              <img
                src="/assets/aistudio/IMG_3850_61747c17.jpg"
                alt="一二与布布设定原图"
                className="w-full rounded-xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-[11px] text-[#8C6D62] text-center mt-2 leading-relaxed">
              本作角色外观比例、耳朵颜色、腮红与特征领结完全依据此图严格精细绘制。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
