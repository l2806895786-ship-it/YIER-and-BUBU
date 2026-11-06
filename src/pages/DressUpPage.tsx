import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterView } from '../components/character/CharacterView';
import { ClothingThumbnail } from '../components/character/ClothingThumbnail';
import { CharacterId, OutfitCategory, CharacterItem } from '../types/game';
import { OUTFITS, OUTFIT_CATEGORIES } from '../data/outfits';
import {
  Check,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Camera,
  HeartHandshake,
  Shirt,
  XCircle,
  Eye,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DressUpPage: React.FC = () => {
  const {
    saveData,
    buyOutfit,
    equipOutfit,
    equipCoupleSet,
    addAlbumCard
  } = useGame();

  const [activeChar, setActiveChar] = useState<CharacterId>('yier');
  const [activeCategory, setActiveCategory] = useState<OutfitCategory>('top');
  const [activeTab, setActiveTab] = useState<'shop' | 'wardrobe' | 'presets'>('shop');

  // Local try-on item state (not yet confirmed)
  const [tryOnItem, setTryOnItem] = useState<CharacterItem | null>(null);

  const currentEquipped = saveData.equippedOutfits[activeChar] || {};

  // Check if an item is owned
  const isItemOwned = (itemId: string) => {
    return (
      saveData.ownedOutfits.includes(itemId) ||
      saveData.ownedOutfits.includes(`${activeChar}_${itemId}`)
    );
  };

  // Compute live preview outfits (merge real equipped with try-on item)
  const previewOutfits = { ...currentEquipped };
  if (tryOnItem) {
    if (tryOnItem.category === 'couple_set') {
      previewOutfits.couple_set = tryOnItem.id;
    } else {
      (previewOutfits as Record<string, string | undefined>)[tryOnItem.category] = tryOnItem.id;
    }
  }

  // Filter outfits for current category and character
  const filteredItems = OUTFITS.filter(
    item =>
      item.category === activeCategory &&
      (item.targetCharacter === 'both' || item.targetCharacter === activeChar)
  );

  // All owned items for this character in wardrobe
  const ownedItemsForChar = OUTFITS.filter(item => isItemOwned(item.id));

  // Handle clicking an item card
  const handleItemClick = (item: CharacterItem) => {
    sound.playPop();
    const owned = isItemOwned(item.id);

    if (owned) {
      // Toggle equip/unequip in wardrobe
      setTryOnItem(null);
      if (item.category === 'couple_set') {
        equipCoupleSet(item.id);
      } else {
        equipOutfit(activeChar, item.category, item.id);
      }
    } else {
      // Start try-on preview!
      setTryOnItem(item);
    }
  };

  // Cancel try-on preview
  const handleCancelTryOn = () => {
    sound.playPop();
    setTryOnItem(null);
  };

  // Confirm purchase of try-on item
  const handleConfirmPurchase = () => {
    if (!tryOnItem) return;
    const success = buyOutfit(tryOnItem.id);
    if (success) {
      if (tryOnItem.category === 'couple_set') {
        equipCoupleSet(tryOnItem.id);
      } else {
        equipOutfit(activeChar, tryOnItem.category, tryOnItem.id);
      }
      setTryOnItem(null);
    }
  };

  // Unequip all clothes on active bear
  const handleUnequipAll = () => {
    sound.playPop();
    setTryOnItem(null);
    OUTFIT_CATEGORIES.forEach(cat => {
      if (currentEquipped[cat.id]) {
        equipOutfit(activeChar, cat.id, '');
      }
    });
  };

  // Preset combo sets for quick test & inspection
  const PRESETS = [
    {
      id: 'preset_warm',
      title: '暖阳小熊日常装 (测试毛衣)',
      desc: '雏菊发卡 + 暖阳小熊软萌毛衣 + 牛仔背带裤 + 暖黄小雨靴',
      items: {
        hat: 'hat_daisy',
        top: 'top_bear_sweater',
        bottom: 'bottom_overalls',
        shoes: 'shoes_boots'
      }
    },
    {
      id: 'preset_winter',
      title: '英伦暖冬学院风',
      desc: '焦糖针织帽 + 圣诞红围巾 + 牛角扣大衣 + 帆布板鞋',
      items: {
        hat: 'hat_knit',
        scarf: 'scarf_red',
        coat: 'coat_duffle',
        shoes: 'shoes_sneakers'
      }
    },
    {
      id: 'preset_sweet',
      title: '甜心草莓元气装',
      desc: '草莓画家帽 + 樱桃短袖 + 奶茶短裤 + 魔法手杖',
      items: {
        hat: 'hat_beret',
        top: 'top_cherry_tshirt',
        bottom: 'bottom_khaki',
        accessory: 'acc_wand'
      }
    }
  ];

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    sound.playPop();
    setTryOnItem(null);
    // Equip all items in the preset
    Object.entries(preset.items).forEach(([cat, id]) => {
      equipOutfit(activeChar, cat as OutfitCategory, id);
    });
  };

  // Take photo to album
  const handleTakeSnapshot = () => {
    sound.playCamera();
    addAlbumCard({
      title: `${activeChar === 'yier' ? '一二' : '布布'}穿搭新造型`,
      quote: '挑选了一身最喜欢的衣裳，小熊身上有阳光的味道！',
      tag: 'dressup',
      characters: activeChar,
      decorBg: '#FFF9F3',
      description: `在衣帽间精心挑选穿搭，真实渲染每一层服装。`
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-1 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
        <div className="flex items-center gap-2">
          <Shirt className="w-4 h-4 text-[#C85A53]" />
          <h2 className="font-extrabold text-[#4B2925] text-base">小熊时尚试衣间 V3.1</h2>
          <span className="text-[10px] bg-[#FAF3EB] border border-[#4B2925]/15 text-[#8C6D62] px-2 py-0.5 rounded-full font-bold">
            2D分层渲染
          </span>
        </div>

        <button
          onClick={handleTakeSnapshot}
          className="px-2.5 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] hover:bg-[#FBEAE7] active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#C85A53]" />
          <span>拍留念照</span>
        </button>
      </div>

      {/* Character Switcher Tabs */}
      <div className="w-full max-w-xs flex items-center bg-[#F2E6D9] p-1 rounded-2xl mb-2.5">
        <button
          onClick={() => {
            sound.playPop();
            setActiveChar('yier');
            setTryOnItem(null);
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChar === 'yier'
              ? 'bg-white text-[#4B2925] shadow-xs'
              : 'text-[#8C6D62] hover:text-[#4B2925]'
          }`}
        >
          <span>🤍</span>
          <span>一二 (小白熊)</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveChar('bubu');
            setTryOnItem(null);
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChar === 'bubu'
              ? 'bg-white text-[#4B2925] shadow-xs'
              : 'text-[#8C6D62] hover:text-[#4B2925]'
          }`}
        >
          <span>🤎</span>
          <span>布布 (小棕熊)</span>
        </button>
      </div>

      {/* Main Fitting Stage */}
      <div className="w-full max-w-sm aspect-square max-h-60 bg-gradient-to-b from-[#FFF5EC] to-[#FBEAE7] rounded-3xl border-3 border-[#4B2925]/20 shadow-inner flex flex-col items-center justify-center relative overflow-hidden mb-2">
        {/* Soft Spotlight */}
        <div className="absolute top-4 inset-x-0 mx-auto w-40 h-40 rounded-full bg-white/70 blur-md pointer-events-none" />

        {/* Live Bear Model with 2D Layered Clothing */}
        <CharacterView
          type={activeChar}
          size={170}
          expression="happy"
          pose="idle"
          outfits={previewOutfits}
        />

        {/* Try-on Status Pill on top of stage */}
        {tryOnItem && (
          <div className="absolute top-2 inset-x-4 mx-auto max-w-xs px-3 py-1 rounded-full bg-[#C85A53] text-white text-xs font-bold flex items-center justify-between shadow-md animate-pulse">
            <div className="flex items-center gap-1.5 truncate">
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">正在试穿: {tryOnItem.name}</span>
            </div>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full shrink-0">未购买</span>
          </div>
        )}

        {/* Unequip all button in stage corner */}
        <button
          onClick={handleUnequipAll}
          className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-white/85 hover:bg-white text-[#8C6D62] hover:text-[#4B2925] border border-[#4B2925]/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          title="一键脱下所有服装，还原自然小熊"
        >
          <RotateCcw className="w-3 h-3" />
          <span>脱下全部</span>
        </button>
      </div>

      {/* Try-on Action Floating Controls */}
      {tryOnItem && (
        <div className="w-full bg-[#FFF9F3] border-2 border-[#DCA58D] rounded-2xl p-2.5 mb-2.5 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <ClothingThumbnail itemId={tryOnItem.id} character={activeChar} size={42} />
            <div>
              <div className="text-xs font-bold text-[#4B2925] flex items-center gap-1">
                <span>{tryOnItem.name}</span>
                <span className="text-[#C85A53] font-black">{tryOnItem.price === 0 ? '免费' : `${tryOnItem.price} 🪙`}</span>
              </div>
              <div className="text-[10px] text-[#8C6D62]">
                当前为实时试穿，点击取消恢复原样，点击购买永久穿戴！
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCancelTryOn}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[11px] font-bold text-[#8C6D62] hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
            >
              <XCircle className="w-3 h-3" />
              <span>取消试穿</span>
            </button>

            <button
              onClick={handleConfirmPurchase}
              className="px-3 py-1.5 rounded-xl bg-[#C85A53] hover:bg-[#b04b45] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>确认购买</span>
            </button>
          </div>
        </div>
      )}

      {/* Section Mode Switcher: 商城 / 我的衣柜 / 推荐套装 */}
      <div className="w-full grid grid-cols-3 gap-1.5 bg-[#F2E6D9] p-1 rounded-2xl mb-2.5">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('shop');
          }}
          className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'shop'
              ? 'bg-white text-[#4B2925] shadow-xs'
              : 'text-[#8C6D62] hover:text-[#4B2925]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>服装商城</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('wardrobe');
          }}
          className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'wardrobe'
              ? 'bg-white text-[#4B2925] shadow-xs'
              : 'text-[#8C6D62] hover:text-[#4B2925]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>已购衣柜 ({ownedItemsForChar.length})</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('presets');
          }}
          className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'presets'
              ? 'bg-white text-[#4B2925] shadow-xs'
              : 'text-[#8C6D62] hover:text-[#4B2925]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>造型示范</span>
        </button>
      </div>

      {/* TAB 1: 服装商城 (Shop) */}
      {activeTab === 'shop' && (
        <div className="w-full flex flex-col">
          {/* 9 Category Tabs */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-thin scrollbar-thumb-[#DCA58D]/40">
            {OUTFIT_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveCategory(cat.id);
                  }}
                  className={`py-1.5 px-3 rounded-2xl border-2 flex items-center gap-1 text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFF9F3] border-[#4B2925] text-[#4B2925] shadow-xs'
                      : 'bg-white/70 border-[#4B2925]/15 text-[#8C6D62] hover:bg-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Shop Item Cards Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filteredItems.map(item => {
              const isOwned = isItemOwned(item.id);
              const isEquipped =
                item.category === 'couple_set'
                  ? currentEquipped.couple_set === item.id
                  : (currentEquipped as Record<string, string | undefined>)[item.category] === item.id;
              const isTryingOn = tryOnItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-[#FFF9F3] border-[#4B2925] shadow-sm ring-2 ring-[#DCA58D]/40'
                      : isTryingOn
                      ? 'bg-[#FEF2F2] border-[#C85A53] shadow-xs'
                      : isOwned
                      ? 'bg-white hover:bg-[#FFF9F3] border-[#4B2925]/15'
                      : 'bg-[#FAF3EB]/60 hover:bg-[#FAF3EB] border-dashed border-[#4B2925]/25'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    {/* Real 2D Clothing Image */}
                    <ClothingThumbnail itemId={item.id} character={activeChar} size={52} />

                    <div className="flex flex-col items-end gap-1">
                      {isEquipped && (
                        <span className="w-5 h-5 rounded-full bg-[#588157] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      {isTryingOn && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#C85A53] text-white text-[9px] font-black">
                          试穿中
                        </span>
                      )}
                      {!isEquipped && !isTryingOn && item.category === 'couple_set' && (
                        <span className="text-[10px] text-[#C85A53] font-bold flex items-center gap-0.5">
                          <HeartHandshake className="w-3 h-3" />
                          <span>双熊同款</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="font-bold text-[#4B2925] text-xs leading-snug">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#8C6D62] line-clamp-1 mt-0.5">
                      {item.description}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-2 pt-2 border-t border-[#4B2925]/10 flex items-center justify-between text-[11px]">
                    {isEquipped ? (
                      <span className="text-[#588157] font-bold text-[10px]">已穿戴 (点击脱下)</span>
                    ) : isTryingOn ? (
                      <span className="text-[#C85A53] font-bold text-[10px]">点击上方购买</span>
                    ) : isOwned ? (
                      <span className="text-[#8C6D62] font-semibold text-[10px]">点击穿戴</span>
                    ) : (
                      <div className="w-full flex items-center justify-between">
                        <span className="font-bold text-[#C85A53]">
                          {item.price === 0 ? '免费' : `${item.price} 🪙`}
                        </span>
                        <span className="text-[10px] bg-[#DCA58D] text-white font-bold px-2 py-0.5 rounded-lg hover:bg-[#C88D74]">
                          试穿
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 已购衣柜 (Wardrobe) */}
      {activeTab === 'wardrobe' && (
        <div className="w-full flex flex-col gap-3">
          <div className="bg-[#FFF9F3] border border-[#DCA58D]/60 p-2.5 rounded-2xl text-xs text-[#8C6D62] flex items-center justify-between">
            <span>当前已为【{activeChar === 'yier' ? '一二' : '布布'}】解锁 {ownedItemsForChar.length} 件服装</span>
            <span className="text-[10px] text-[#A89085]">点击可自由穿戴或脱下</span>
          </div>

          {ownedItemsForChar.length === 0 ? (
            <div className="w-full py-12 text-center text-xs text-[#8C6D62] bg-white/70 rounded-3xl border-2 border-dashed border-[#4B2925]/15">
              <p>衣柜空空如也~ 快去商城挑选可爱的新衣服吧！</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ownedItemsForChar.map(item => {
                const isEquipped =
                  item.category === 'couple_set'
                    ? currentEquipped.couple_set === item.id
                    : (currentEquipped as Record<string, string | undefined>)[item.category] === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isEquipped
                        ? 'bg-[#FFF9F3] border-[#4B2925] shadow-xs ring-2 ring-[#DCA58D]/40'
                        : 'bg-white hover:bg-[#FFF9F3] border-[#4B2925]/15'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <ClothingThumbnail itemId={item.id} character={activeChar} size={50} />
                      {isEquipped && (
                        <span className="w-5 h-5 rounded-full bg-[#588157] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="font-bold text-[#4B2925] text-xs">{item.name}</div>
                      <div className="text-[10px] text-[#8C6D62] mt-0.5 line-clamp-1">{item.description}</div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#4B2925]/10 flex items-center justify-between text-[10px]">
                      <span className="text-[#8C6D62]">{OUTFIT_CATEGORIES.find(c => c.id === item.category)?.name}</span>
                      <span className={`font-bold ${isEquipped ? 'text-[#C85A53]' : 'text-[#588157]'}`}>
                        {isEquipped ? '点击脱下' : '点击穿上'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 造型示范 (Presets / Style Showcase) */}
      {activeTab === 'presets' && (
        <div className="w-full flex flex-col gap-3">
          <div className="bg-[#FFF9F3] border border-[#DCA58D]/60 p-2.5 rounded-2xl text-xs text-[#8C6D62]">
            <span>为方便检查多件服装分层叠加效果，提供 3 套精心搭配的示范组合，点击一键试穿体验：</span>
          </div>

          <div className="space-y-3">
            {PRESETS.map(preset => (
              <div
                key={preset.id}
                className="w-full bg-white rounded-2xl border-2 border-[#4B2925]/15 p-3.5 shadow-xs flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#4B2925] text-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#DCA58D]" />
                      <span>{preset.title}</span>
                    </h3>
                  </div>
                  <p className="text-xs text-[#8C6D62] mt-1 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#4B2925]/10">
                  <div className="flex items-center gap-1.5">
                    {Object.values(preset.items).map(id => (
                      <ClothingThumbnail key={id} itemId={id} character={activeChar} size={36} />
                    ))}
                  </div>

                  <button
                    onClick={() => handleApplyPreset(preset)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-bold text-xs border border-[#4B2925]/20 shadow-xs active:scale-95 transition-transform cursor-pointer"
                  >
                    一键换上此套装
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
