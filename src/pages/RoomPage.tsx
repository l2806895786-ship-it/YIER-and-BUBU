import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { InteractiveRoom } from '../components/character/InteractiveRoom';
import { FURNITURE } from '../data/furniture';
import { FurnitureItem } from '../types/game';
import { Paintbrush, Check, Camera, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const RoomPage: React.FC = () => {
  const {
    saveData,
    buyFurniture,
    updateRoomConfig,
    addAlbumCard
  } = useGame();

  const [activeCategory, setActiveCategory] = useState<FurnitureItem['category']>('wallpaper');

  const categories = [
    { id: 'wallpaper' as const, name: '墙面' },
    { id: 'flooring' as const, name: '地板' },
    { id: 'carpet' as const, name: '地毯' },
    { id: 'sofa' as const, name: '沙发' },
    { id: 'lamp' as const, name: '灯具' },
    { id: 'plant' as const, name: '绿植' },
    { id: 'decor' as const, name: '挂饰' }
  ];

  const filteredFurniture = FURNITURE.filter(f => f.category === activeCategory);

  const handleSelectFurniture = (item: FurnitureItem) => {
    const isOwned = saveData.ownedFurniture.includes(item.id);
    if (isOwned) {
      updateRoomConfig(item.category, item.id);
    } else {
      buyFurniture(item.id);
    }
  };

  const handleTakeRoomPhoto = () => {
    addAlbumCard({
      title: '小屋新装落成纪念',
      quote: '换上了喜欢的装饰，每一寸空间都写满了属于我们的小确幸。',
      tag: 'room',
      characters: 'yier_bubu_together',
      decorBg: '#FFF9F3',
      description: '记录亲手为一二和布布布置专属小屋的一天。'
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-1 select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
        <div className="flex items-center gap-2">
          <Paintbrush className="w-4 h-4 text-[#DCA58D]" />
          <h2 className="font-extrabold text-[#4B2925] text-base">小屋装扮工坊</h2>
        </div>

        <button
          onClick={handleTakeRoomPhoto}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] hover:bg-[#FBEAE7] active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#8C6D62]" />
          <span>合影留念</span>
        </button>
      </div>

      {/* Live Room Preview */}
      <div className="w-full max-w-md mb-3">
        <InteractiveRoom
          roomConfig={saveData.roomConfig}
          equippedOutfits={saveData.equippedOutfits}
          yierExpression="happy"
          bubuExpression="happy"
          yierPose="idle"
          bubuPose="idle"
          onYierClick={() => { sound.playPet(); }}
          onBubuClick={() => { sound.playPet(); }}
        />
      </div>

      {/* Category Pills Bar */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#4B2925] text-white border-[#4B2925] shadow-xs'
                  : 'bg-white text-[#8C6D62] border-[#4B2925]/15 hover:bg-[#FFF9F3]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Furniture Catalog Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {filteredFurniture.map(item => {
          const isOwned = saveData.ownedFurniture.includes(item.id);
          const isEquipped = saveData.roomConfig[item.category] === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectFurniture(item)}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isEquipped
                  ? 'bg-[#FFF9F3] border-[#4B2925] shadow-sm ring-2 ring-[#DCA58D]/40'
                  : isOwned
                  ? 'bg-white hover:bg-[#FFF9F3] border-[#4B2925]/15'
                  : 'bg-[#FAF3EB]/60 hover:bg-[#FAF3EB] border-dashed border-[#4B2925]/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-6 h-6 rounded-full border border-[#4B2925]/20 shadow-xs"
                  style={{ backgroundColor: item.colorOrStyle }}
                />
                {isEquipped && (
                  <span className="w-5 h-5 rounded-full bg-[#588157] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <div className="mt-2">
                <div className="font-bold text-[#4B2925] text-xs leading-snug">
                  {item.name}
                </div>
                <div className="text-[10px] text-[#8C6D62] line-clamp-1 mt-0.5">
                  {item.description}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#4B2925]/10 flex items-center justify-between text-[11px]">
                {isEquipped ? (
                  <span className="text-[#588157] font-bold text-[10px]">使用中</span>
                ) : isOwned ? (
                  <span className="text-[#8C6D62] font-semibold text-[10px]">点击应用</span>
                ) : (
                  <span className="font-bold text-[#C85A53] flex items-center gap-0.5">
                    <span>{item.price}</span>
                    <span>🪙 解锁</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
