import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { InteractiveRoom } from '../components/character/InteractiveRoom';
import { ExpressionType, PoseType, IntimateActionType } from '../types/game';
import { GIFTS } from '../data/characters';
import {
  HeartHandshake,
  Gift,
  Gamepad2,
  Camera,
  Paintbrush,
  Sparkles,
  Heart,
  Music,
  Moon,
  Utensils,
  Smile,
  ArrowUp,
  Lock
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HomePageProps {
  onOpenTasks: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
}

interface ActionConfig {
  id: IntimateActionType;
  name: string;
  icon: string;
  minLevel: number;
  levelName: string;
  coins: number;
  affection: number;
  yierQuote: string;
  bubuQuote: string;
}

const INTIMATE_ACTIONS: ActionConfig[] = [
  {
    id: 'pat_head',
    name: '温柔摸头',
    icon: '👋',
    minLevel: 1,
    levelName: 'Lv.1 初见',
    coins: 5,
    affection: 8,
    yierQuote: '摸摸头，今天所有的疲惫都被一二揉散啦~',
    bubuQuote: '唔...好舒服呀！小熊的毛发都要被摸得软乎乎的啦~'
  },
  {
    id: 'high_five',
    name: '默契击掌',
    icon: '✋',
    minLevel: 1,
    levelName: 'Lv.1 初见',
    coins: 6,
    affection: 10,
    yierQuote: '啪！今天的我们也是默契百分百！',
    bubuQuote: '耶！小熊爪爪碰一碰，快乐翻个大跟头！'
  },
  {
    id: 'hold_hands',
    name: '甜蜜牵手',
    icon: '🤝',
    minLevel: 1,
    levelName: 'Lv.1 初见',
    coins: 8,
    affection: 12,
    yierQuote: '牵着你的爪爪，走到哪里都是心安的方向。',
    bubuQuote: '小手被牵住了，心跳怎么扑通扑通跳得这么快呢~'
  },
  {
    id: 'hug',
    name: '深情拥抱',
    icon: '🫂',
    minLevel: 2,
    levelName: 'Lv.2 熟悉',
    coins: 10,
    affection: 18,
    yierQuote: '世界上最安全的地方，就是这个暖烘烘的怀抱。',
    bubuQuote: '好暖和的熊抱！一二身上有淡淡的牛奶甜香~'
  },
  {
    id: 'eat',
    name: '一起吃饭',
    icon: '🍮',
    minLevel: 2,
    levelName: 'Lv.2 熟悉',
    coins: 12,
    affection: 20,
    yierQuote: '第一口草莓布丁给你吃，甜在嘴里，暖在心底。',
    bubuQuote: '嚼嚼嚼...好好吃！只要和一二一起吃，就是人间至味！'
  },
  {
    id: 'dance',
    name: '欢快跳舞',
    icon: '💃',
    minLevel: 3,
    levelName: 'Lv.3 挚友',
    coins: 15,
    affection: 25,
    yierQuote: '跟着轻快的小曲旋转，小熊裙角都在随风飞舞~',
    bubuQuote: '左一步右一步，踩着小熊圆滚滚的节拍扭呀扭！'
  },
  {
    id: 'take_photo',
    name: '合拍留念',
    icon: '📸',
    minLevel: 3,
    levelName: 'Lv.3 挚友',
    coins: 15,
    affection: 25,
    yierQuote: '三、二、一，茄子！把此刻的笑容永久定格在相册里！',
    bubuQuote: '咔嚓！快看快看，照片上的我们俩笑得多甜呀~'
  },
  {
    id: 'lift_high',
    name: '举高高',
    icon: '🚀',
    minLevel: 4,
    levelName: 'Lv.4 形影不离',
    coins: 20,
    affection: 35,
    yierQuote: '一二用尽吃奶的力气把你举得高高的，像在云朵上飞翔！',
    bubuQuote: '哇啊啊！布布飞起来啦！整个小木屋都被我尽收眼底~'
  },
  {
    id: 'kiss',
    name: '心动亲亲',
    icon: '💋',
    minLevel: 4,
    levelName: 'Lv.4 形影不离',
    coins: 25,
    affection: 40,
    yierQuote: '碰一碰额头，亲一亲脸颊，永远做最偏爱你的小熊。',
    bubuQuote: '脸颊热乎乎的...就像偷吃了刚出炉的热可可曲奇一样甜！'
  },
  {
    id: 'sleep',
    name: '甜甜梦境',
    icon: '🌙',
    minLevel: 5,
    levelName: 'Lv.5 永远在一起',
    coins: 30,
    affection: 50,
    yierQuote: '盖好被子，闭上眼睛，今晚的梦里也全都是你。晚安我的小熊。',
    bubuQuote: '呼噜噜...布布已经在梦里追着蜂蜜罐子和一二奔跑啦~'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onOpenTasks,
  onOpenAchievements,
  onOpenSettings
}) => {
  const {
    saveData,
    setPage,
    interactWithCharacter,
    performHug,
    sendGift,
    addAlbumCard,
    affectionLevel,
    affectionLevelName,
    addCurrency,
    addAffection,
    recordTaskProgress
  } = useGame();

  const [yierExpression, setYierExpression] = useState<ExpressionType>('normal');
  const [bubuExpression, setBubuExpression] = useState<ExpressionType>('normal');
  const [yierPose, setYierPose] = useState<PoseType>('idle');
  const [bubuPose, setBubuPose] = useState<PoseType>('idle');
  const [activeAction, setActiveAction] = useState<IntimateActionType | null>(null);
  const [bubbleText, setBubbleText] = useState<{ character: 'yier' | 'bubu'; text: string } | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Clear speech bubble after 3.8 seconds
  const showBubble = (character: 'yier' | 'bubu', text: string) => {
    setBubbleText({ character, text });
    setTimeout(() => {
      setBubbleText(prev => (prev?.text === text ? null : prev));
    }, 4000);
  };

  // Handle clicking Yi Er directly
  const handleYierClick = () => {
    setYierExpression('happy');
    setYierPose('bounce');
    const res = interactWithCharacter('yier');
    showBubble('yier', res.text);

    setTimeout(() => {
      setYierExpression('normal');
      setYierPose('idle');
    }, 1800);
  };

  // Handle clicking Bubu directly
  const handleBubuClick = () => {
    setBubuExpression('happy');
    setBubuPose('bounce');
    const res = interactWithCharacter('bubu');
    showBubble('bubu', res.text);

    setTimeout(() => {
      setBubuExpression('normal');
      setBubuPose('idle');
    }, 1800);
  };

  // Trigger any of the 10 intimate interactions
  const triggerIntimateAction = (action: ActionConfig) => {
    if (affectionLevel < action.minLevel) {
      sound.playPop();
      showBubble('bubu', `需要亲密度达到 ${action.levelName} 才能解锁【${action.name}】哦，一起玩小游戏提升亲密度吧！`);
      return;
    }

    sound.playHug();
    setActiveAction(action.id);

    // Confetti for higher intimacy actions
    if (action.minLevel >= 3) {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.65 }
      });
    }

    // Award currency and affection
    addCurrency(action.coins, `【${action.name}】互动奖励`);
    addAffection(action.affection, `双熊${action.name}`);
    recordTaskProgress('task_hug');

    // Trigger dialogue
    const isYierSpeaking = Math.random() > 0.5;
    showBubble(
      isYierSpeaking ? 'yier' : 'bubu',
      isYierSpeaking ? action.yierQuote : action.bubuQuote
    );

    // Save album card for special moments
    if (action.id === 'take_photo' || action.id === 'kiss' || action.id === 'sleep') {
      sound.playCamera();
      addAlbumCard({
        title: `心动瞬间 · ${action.name}`,
        quote: action.yierQuote,
        tag: 'interaction',
        characters: 'both',
        decorBg: '#FFF5EC',
        description: `一二与布布在小屋进行了【${action.name}】亲密互动，心意更加靠近了一步。`
      });
    }

    // Reset action state after duration
    setTimeout(() => {
      setActiveAction(null);
      setYierExpression('happy');
      setBubuExpression('happy');
    }, 3200);

    setTimeout(() => {
      setYierExpression('normal');
      setBubuExpression('normal');
    }, 4500);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-1 select-none">
      {/* Top Banner Status Strip */}
      <div className="w-full flex items-center justify-between text-xs font-medium text-[#8C6D62] px-2 py-1 mb-2">
        <div className="flex items-center gap-1.5">
          <span>🏡 一二与布布的治愈小屋</span>
          <span className="text-[10px] bg-[#DCA58D]/20 text-[#8C6D62] px-2 py-0.5 rounded-full font-bold">
            {affectionLevelName} (Lv.{affectionLevel})
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span>今日互动: {saveData.statistics.todayInteractions}次</span>
        </div>
      </div>

      {/* Main Interactive Room Scene */}
      <div className="w-full">
        <InteractiveRoom
          roomConfig={saveData.roomConfig}
          equippedOutfits={saveData.equippedOutfits}
          yierExpression={yierExpression}
          bubuExpression={bubuExpression}
          yierPose={yierPose}
          bubuPose={bubuPose}
          onYierClick={handleYierClick}
          onBubuClick={handleBubuClick}
          bubbleText={bubbleText}
          activeAction={activeAction}
        />
      </div>

      {/* 10 Intimacy Interactions Control Cluster */}
      <div className="w-full mt-3 bg-white/90 border-2 border-[#4B2925]/15 rounded-3xl p-3 shadow-xs">
        <div className="text-[11px] font-bold text-[#8C6D62] px-1 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#C85A53]">
            <Heart className="w-3.5 h-3.5 fill-[#C85A53]" />
            <span className="font-extrabold text-[#4B2925]">亲密双熊互动 (10种动作)</span>
          </div>
          <span className="text-[10px] text-[#A89F91]">提升等级解锁专属互动</span>
        </div>

        {/* 10 Action Buttons Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {INTIMATE_ACTIONS.map(act => {
            const isUnlocked = affectionLevel >= act.minLevel;
            const isCurrent = activeAction === act.id;

            return (
              <button
                key={act.id}
                onClick={() => triggerIntimateAction(act)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-[#FBEAE7] border-[#C85A53] scale-105 shadow-xs'
                    : isUnlocked
                    ? 'bg-[#FFF9F3] hover:bg-[#FBEAE7] border-[#4B2925]/15 active:scale-95'
                    : 'bg-gray-100/80 border-gray-200 text-gray-400 opacity-80'
                }`}
                title={isUnlocked ? `${act.name} (+${act.affection}💖)` : `需达到 ${act.levelName}`}
              >
                {!isUnlocked && (
                  <span className="absolute top-1 right-1 text-gray-400">
                    <Lock className="w-2.5 h-2.5" />
                  </span>
                )}
                <span className="text-lg mb-0.5">{act.icon}</span>
                <span className={`text-[10px] font-bold truncate max-w-full ${
                  isUnlocked ? 'text-[#4B2925]' : 'text-gray-400'
                }`}>
                  {act.name}
                </span>
                <span className="text-[9px] text-[#C85A53] font-semibold">
                  {isUnlocked ? `+${act.affection}💖` : act.levelName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls Footer Bar */}
        <div className="grid grid-cols-4 gap-2 mt-2.5 pt-2 border-t border-[#4B2925]/10">
          {/* Quick Play */}
          <button
            onClick={() => {
              sound.playPop();
              setPage('games');
            }}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#FFF9F3] hover:bg-[#FDF6EE] border border-[#4B2925]/15 text-xs font-bold text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#C85A53]" />
            <span>小游戏</span>
          </button>

          {/* Quick Dressup */}
          <button
            onClick={() => {
              sound.playPop();
              setPage('dressup');
            }}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#FFF9F3] hover:bg-[#FDF6EE] border border-[#4B2925]/15 text-xs font-bold text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DCA58D]" />
            <span>试衣间</span>
          </button>

          {/* Quick Decorate Room */}
          <button
            onClick={() => {
              sound.playPop();
              setPage('room');
            }}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#FFF9F3] hover:bg-[#FDF6EE] border border-[#4B2925]/15 text-xs font-bold text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
          >
            <Paintbrush className="w-3.5 h-3.5 text-[#588157]" />
            <span>布置房间</span>
          </button>

          {/* Send Gift */}
          <button
            onClick={() => {
              sound.playPop();
              setShowGiftModal(true);
            }}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#F6D58B]/30 hover:bg-[#F6D58B]/50 border border-[#4B2925]/15 text-xs font-bold text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-[#B0703B]" />
            <span>送礼物</span>
          </button>
        </div>
      </div>

      {/* Gift Modal Sheet */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-5 shadow-2xl animate-gentle-bounce">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#4B2925]/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <h3 className="font-bold text-[#4B2925] text-base">为小熊挑选礼物</h3>
              </div>
              <button
                onClick={() => setShowGiftModal(false)}
                className="w-7 h-7 rounded-full bg-white border border-[#4B2925]/20 flex items-center justify-center text-xs font-bold text-[#4B2925] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-3 space-y-2.5">
              {GIFTS.map(gift => (
                <div
                  key={gift.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white border-2 border-[#4B2925]/15"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{gift.icon}</span>
                    <div>
                      <div className="font-bold text-[#4B2925] text-xs">{gift.name}</div>
                      <div className="text-[10px] text-[#8C6D62] mt-0.5">{gift.description}</div>
                      <div className="text-[10px] font-semibold text-[#C85A53] mt-0.5">
                        +{gift.affectionGain} 亲密度
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (sendGift(gift.id)) {
                        setShowGiftModal(false);
                        setYierExpression('happy');
                        setBubuExpression('happy');
                        showBubble('bubu', `太棒啦！收到【${gift.name}】，小熊们超开心！`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#DCA58D] hover:bg-[#C88D74] text-white text-xs font-bold border-2 border-[#4B2925] active:scale-95 transition-transform flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>{gift.price}</span>
                    <span>🪙</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-[#8C6D62] pt-2">
              当前拥有爱心币：<span className="font-bold text-[#4B2925]">{saveData.currency} 🪙</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
