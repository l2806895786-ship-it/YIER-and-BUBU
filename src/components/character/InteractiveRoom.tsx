import React from 'react';
import { CharacterView } from './CharacterView';
import { RoomConfiguration, EquippedOutfits, ExpressionType, PoseType, IntimateActionType } from '../../types/game';
import { FURNITURE } from '../../data/furniture';

interface InteractiveRoomProps {
  roomConfig: RoomConfiguration;
  equippedOutfits: {
    yier: EquippedOutfits;
    bubu: EquippedOutfits;
  };
  yierExpression: ExpressionType;
  bubuExpression: ExpressionType;
  yierPose: PoseType;
  bubuPose: PoseType;
  onYierClick: () => void;
  onBubuClick: () => void;
  bubbleText?: {
    character: 'yier' | 'bubu';
    text: string;
  } | null;
  activeAction?: IntimateActionType | null;
}

export const InteractiveRoom: React.FC<InteractiveRoomProps> = ({
  roomConfig,
  equippedOutfits,
  yierExpression,
  bubuExpression,
  yierPose,
  bubuPose,
  onYierClick,
  onBubuClick,
  bubbleText,
  activeAction = null
}) => {
  // Find current active furniture configurations
  const wall = FURNITURE.find(f => f.id === roomConfig.wallpaper) || FURNITURE[0];
  const floor = FURNITURE.find(f => f.id === roomConfig.flooring) || FURNITURE[4];
  const carpet = FURNITURE.find(f => f.id === roomConfig.carpet) || FURNITURE[7];
  const sofa = FURNITURE.find(f => f.id === roomConfig.sofa) || FURNITURE[10];
  const lamp = FURNITURE.find(f => f.id === roomConfig.lamp) || FURNITURE[13];
  const decor = FURNITURE.find(f => f.id === roomConfig.decor) || FURNITURE[17];

  return (
    <div className="relative w-full aspect-[4/3] max-h-[460px] rounded-3xl overflow-hidden border-4 border-[#4B2925]/15 shadow-sm select-none flex flex-col justify-end">
      {/* --- WALLPAPER BACKGROUND (Top 68%) --- */}
      <div
        className="absolute inset-x-0 top-0 h-[68%] transition-colors duration-500 overflow-hidden"
        style={{ backgroundColor: wall.colorOrStyle }}
      >
        {/* Subtle wallpaper pattern */}
        {wall.id === 'wall_pink' && (
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(#FFF 2px, transparent 2px)',
            backgroundSize: '24px 24px'
          }} />
        )}
        {wall.id === 'wall_brown' && (
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(#4B2925 1px, transparent 1px), linear-gradient(90deg, #4B2925 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }} />
        )}

        {/* Window with sunlight and cozy cloud */}
        <div className="absolute top-4 left-6 w-24 h-32 rounded-t-full bg-[#E8F3F9] border-4 border-[#4B2925]/25 shadow-inner overflow-hidden flex flex-col items-center">
          <div className="w-full h-full bg-gradient-to-b from-[#BDE0FE] to-[#F1F8FD] relative">
            <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-[#FDE047]/60 blur-xs" />
            <div className="absolute inset-x-0 top-1/2 h-[3px] bg-[#4B2925]/30" />
            <div className="absolute inset-y-0 left-1/2 w-[3px] bg-[#4B2925]/30" />
            <div className="absolute top-5 left-2 w-8 h-4 bg-white/90 rounded-full shadow-xs" />
          </div>
        </div>

        {/* Wall Decor Item */}
        {decor.id === 'decor_photo' && (
          <div className="absolute top-6 right-8 bg-[#FAF3EB] p-2 rounded-xl border-3 border-[#4B2925]/40 shadow-sm rotate-2">
            <div className="w-16 h-12 bg-[#F6C8C5]/30 rounded-lg flex items-center justify-center border border-[#4B2925]/15 overflow-hidden">
              <span className="text-sm">🐾💕</span>
            </div>
            <div className="text-[10px] text-center font-medium text-[#4B2925] mt-1">一二 & 布布</div>
          </div>
        )}

        {decor.id === 'decor_banner' && (
          <div className="absolute top-2 inset-x-12 flex justify-around pointer-events-none">
            {['#F7A7A6', '#F6D58B', '#D8E6D1', '#BDE0FE', '#F6C8C5'].map((c, i) => (
              <div
                key={i}
                className="w-4 h-6 border-b border-[#4B2925]/20"
                style={{
                  backgroundColor: c,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                }}
              />
            ))}
          </div>
        )}

        {/* Baseboard divider line */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#D2B59D] border-t-2 border-[#4B2925]/20" />
      </div>

      {/* --- FLOORING (Bottom 32%) --- */}
      <div
        className="relative h-[32%] w-full border-t border-[#4B2925]/20 flex items-center justify-center transition-colors duration-500 overflow-hidden"
        style={{ backgroundColor: floor.colorOrStyle }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(90deg, #4B2925 1.5px, transparent 1.5px)',
          backgroundSize: '48px 100%'
        }} />

        {/* Cozy Carpet */}
        <div
          className={`absolute bottom-2 transition-all duration-300 shadow-sm ${
            carpet.id === 'carpet_circle'
              ? 'w-64 h-24 rounded-[50%] border-2 border-[#4B2925]/15'
              : carpet.id === 'carpet_heart'
              ? 'w-60 h-24 rounded-full border-2 border-[#4B2925]/20'
              : 'w-64 h-24 rounded-3xl border-2 border-[#4B2925]/15'
          }`}
          style={{ backgroundColor: carpet.colorOrStyle }}
        />

        {/* Sofa/Chair */}
        <div
          className="absolute -top-12 left-4 w-28 h-20 rounded-2xl border-3 border-[#4B2925]/30 shadow-md flex items-center justify-center"
          style={{ backgroundColor: sofa.colorOrStyle }}
        >
          <div className="w-20 h-10 rounded-xl bg-white/20 border border-[#4B2925]/15" />
        </div>

        {/* Floor Lamp */}
        <div className="absolute -top-28 right-5 flex flex-col items-center pointer-events-none z-10">
          <div
            className="w-12 h-10 rounded-t-full border-2 border-[#4B2925]/30 shadow-md relative"
            style={{ backgroundColor: lamp.colorOrStyle }}
          >
            <div className="absolute -inset-2 bg-yellow-200/30 rounded-full blur-sm -z-10" />
          </div>
          <div className="w-1.5 h-28 bg-[#4B2925]/50" />
          <div className="w-10 h-3 rounded-full bg-[#4B2925]/70" />
        </div>
      </div>

      {/* --- SPEECH / REACTION BUBBLE --- */}
      {bubbleText && (
        <div
          className={`absolute top-10 z-30 max-w-[240px] px-4 py-2.5 rounded-2xl bg-white/95 text-[#4B2925] border-2 border-[#4B2925]/25 shadow-lg text-xs font-semibold leading-relaxed transition-all duration-300 animate-gentle-bounce ${
            bubbleText.character === 'yier' ? 'left-12' : 'right-12'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-0.5 text-[11px] font-bold text-[#C87961]">
            <span>{bubbleText.character === 'yier' ? '🤍 一二' : '🤎 布布'}</span>
          </div>
          <p>{bubbleText.text}</p>
          <div
            className={`absolute -bottom-2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#4B2925]/25 transform rotate-45 ${
              bubbleText.character === 'yier' ? 'left-8' : 'right-8'
            }`}
          />
        </div>
      )}

      {/* --- ACTION SCENE PROPS & SPECIAL OVERLAYS --- */}
      {/* 1. Sleep: Quilted Blanket & Floating Zzz */}
      {activeAction === 'sleep' && (
        <div className="absolute inset-x-0 bottom-0 z-25 flex flex-col items-center pointer-events-none">
          <div className="text-xl font-bold text-[#60A5FA] animate-float-heart mb-16 ml-12">
            Zzz...
          </div>
          <div className="w-72 h-20 bg-gradient-to-t from-[#BEE1E6] to-[#E2ECE9] border-t-3 border-x-3 border-[#4B2925]/25 rounded-t-3xl shadow-md relative -bottom-2 flex items-center justify-around px-4">
            <span className="text-sm opacity-50">⭐</span>
            <span className="text-xs font-bold text-[#4B2925]/60">一二 & 布布 暖暖梦乡</span>
            <span className="text-sm opacity-50">🌙</span>
          </div>
        </div>
      )}

      {/* 2. Eat: Dining Table with Sweet Pudding & Strawberry Cake */}
      {activeAction === 'eat' && (
        <div className="absolute inset-x-0 bottom-2 z-25 flex flex-col items-center pointer-events-none animate-bounce">
          <div className="bg-[#FAF3EB] border-3 border-[#4B2925] px-6 py-2 rounded-2xl shadow-lg flex items-center gap-3">
            <span className="text-2xl animate-spin-slow">🍰</span>
            <div className="flex flex-col text-center">
              <span className="text-xs font-black text-[#4B2925]">双熊下午茶</span>
              <span className="text-[10px] text-[#C85A53] font-bold">草莓布丁 + 蜂蜜曲奇</span>
            </div>
            <span className="text-2xl animate-spin-slow">🍮</span>
          </div>
        </div>
      )}

      {/* 3. Dance: Floating Musical Notes */}
      {activeAction === 'dance' && (
        <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center">
          <div className="absolute top-16 left-20 text-2xl animate-bounce text-[#C85A53]">🎵</div>
          <div className="absolute top-20 right-20 text-3xl animate-bounce text-[#F59E0B]" style={{ animationDelay: '0.2s' }}>🎶</div>
          <div className="absolute top-12 text-2xl animate-bounce text-[#8B5CF6]" style={{ animationDelay: '0.4s' }}>✨</div>
        </div>
      )}

      {/* 4. Kiss: Love Hearts Shower */}
      {activeAction === 'kiss' && (
        <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-center">
          <div className="absolute top-14 text-3xl animate-bounce">💋</div>
          <div className="absolute top-10 -left-4 text-xl animate-float-heart">💖</div>
          <div className="absolute top-10 right-4 text-xl animate-float-heart" style={{ animationDelay: '0.3s' }}>💕</div>
        </div>
      )}

      {/* 5. High Five: Impact Star */}
      {activeAction === 'high_five' && (
        <div className="absolute inset-x-0 bottom-24 z-25 pointer-events-none flex items-center justify-center">
          <div className="text-4xl animate-ping text-[#F59E0B]">⭐</div>
        </div>
      )}

      {/* 6. Pat Head: Gentle hands */}
      {activeAction === 'pat_head' && (
        <div className="absolute inset-x-0 bottom-36 z-25 pointer-events-none flex items-center justify-center gap-12">
          <div className="text-3xl animate-bounce">👋✨</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>👋✨</div>
        </div>
      )}

      {/* --- CHARACTERS STAGE --- */}
      <div className="absolute inset-x-0 bottom-4 flex items-end justify-center z-20">
        {activeAction === 'hug' ? (
          // Sweet Hugging Animation: Two bears pressed together
          <div className="relative flex items-center justify-center animate-wiggle">
            <div className="absolute -top-10 text-2xl animate-float-heart">💖</div>
            <div className="absolute -top-6 -left-4 text-xl animate-float-heart" style={{ animationDelay: '0.2s' }}>💕</div>
            <div className="absolute -top-6 -right-4 text-xl animate-float-heart" style={{ animationDelay: '0.4s' }}>✨</div>

            <div className="flex items-center -space-x-8">
              <CharacterView
                type="yier"
                size={160}
                expression="hug"
                pose="hug"
                outfits={equippedOutfits.yier}
                showShadow={false}
              />
              <CharacterView
                type="bubu"
                size={160}
                expression="hug"
                pose="hug"
                outfits={equippedOutfits.bubu}
                showShadow={false}
              />
            </div>
          </div>
        ) : activeAction === 'kiss' ? (
          // Kiss: Facing each other closely
          <div className="relative flex items-center justify-center -space-x-4">
            <CharacterView
              type="yier"
              size={155}
              facing="side_right"
              expression="blush"
              pose="idle"
              outfits={equippedOutfits.yier}
              showShadow={false}
            />
            <CharacterView
              type="bubu"
              size={155}
              facing="side_left"
              expression="blush"
              pose="idle"
              outfits={equippedOutfits.bubu}
              showShadow={false}
            />
          </div>
        ) : activeAction === 'hold_hands' ? (
          // Holding Hands: Closely standing with hearts
          <div className="relative flex items-center justify-center -space-x-2">
            <div className="absolute -top-6 text-xl animate-float-heart">💞</div>
            <CharacterView
              type="yier"
              size={155}
              expression="happy"
              pose="wave"
              outfits={equippedOutfits.yier}
              showShadow={false}
            />
            <CharacterView
              type="bubu"
              size={155}
              expression="happy"
              pose="wave"
              outfits={equippedOutfits.bubu}
              showShadow={false}
            />
          </div>
        ) : activeAction === 'lift_high' ? (
          // Lift High: Yi Er lifts Bubu high in the air
          <div className="relative flex flex-col items-center">
            <div className="text-xl animate-bounce -mb-4">🎉</div>
            <div className="animate-bounce" style={{ animationDuration: '0.8s' }}>
              <CharacterView
                type="bubu"
                size={135}
                expression="happy"
                pose="celebrate"
                outfits={equippedOutfits.bubu}
                showShadow={false}
              />
            </div>
            <div className="-mt-8">
              <CharacterView
                type="yier"
                size={165}
                expression="happy"
                pose="lift"
                outfits={equippedOutfits.yier}
                showShadow={true}
              />
            </div>
          </div>
        ) : activeAction === 'sleep' ? (
          // Sleeping peacefully
          <div className="relative flex items-center justify-center gap-4">
            <CharacterView
              type="yier"
              size={155}
              expression="sleep"
              pose="sleep"
              outfits={equippedOutfits.yier}
              showShadow={false}
            />
            <CharacterView
              type="bubu"
              size={155}
              expression="sleep"
              pose="sleep"
              outfits={equippedOutfits.bubu}
              showShadow={false}
            />
          </div>
        ) : (
          // Standard Side-by-side Interactive Standing
          <div className="flex items-end justify-center gap-2 sm:gap-6">
            <div className="group relative flex flex-col items-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-[#4B2925]/80 text-white px-2 py-0.5 rounded-full mb-1">
                点击摸摸一二
              </div>
              <CharacterView
                type="yier"
                size={155}
                expression={yierExpression}
                pose={yierPose}
                outfits={equippedOutfits.yier}
                onClick={onYierClick}
              />
            </div>

            <div className="group relative flex flex-col items-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-[#4B2925]/80 text-white px-2 py-0.5 rounded-full mb-1">
                点击摸摸布布
              </div>
              <CharacterView
                type="bubu"
                size={155}
                expression={bubuExpression}
                pose={bubuPose}
                outfits={equippedOutfits.bubu}
                onClick={onBubuClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
