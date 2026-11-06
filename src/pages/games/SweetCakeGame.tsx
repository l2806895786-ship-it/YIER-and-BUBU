import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Sparkles, Heart, Check, Cake, Utensils } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface CakeOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const BASES: CakeOption[] = [
  { id: 'sponge', name: '经典香草戚风胚', icon: '🍰', color: '#FEF08A' },
  { id: 'choco', name: '浓情黑巧蛋糕胚', icon: '🍫', color: '#78350F' },
  { id: 'matcha', name: '宇治浓郁抹茶胚', icon: '🍵', color: '#84CC16' },
  { id: 'redvelvet', name: '浪漫红丝绒蛋糕胚', icon: '🌹', color: '#BE123C' }
];

const CREAMS: CakeOption[] = [
  { id: 'pink_cream', name: '甜心草莓粉奶油', icon: '🍓', color: '#FBCFE8' },
  { id: 'vanilla_cream', name: '特浓香草白奶油', icon: '🥛', color: '#FFFBEB' },
  { id: 'tea_cream', name: '焦糖波波奶茶奶油', icon: '🧋', color: '#FDE68A' },
  { id: 'blue_cream', name: '梦幻星空蓝莓奶油', icon: '🫐', color: '#DDD6FE' }
];

const FRUITS: CakeOption[] = [
  { id: 'strawberry', name: '新鲜红草莓果粒', icon: '🍓', color: '#EF4444' },
  { id: 'mango', name: '香甜黄金芒果粒', icon: '🥭', color: '#F59E0B' },
  { id: 'cherry', name: '晶莹车厘子樱桃', icon: '🍒', color: '#991B1B' },
  { id: 'peach', name: '蜜桃波波果肉', icon: '🍑', color: '#FDA4AF' }
];

const TOPPINGS: CakeOption[] = [
  { id: 'bear_figures', name: '一二布布糖霜小人', icon: '🐾', color: '#DCA58D' },
  { id: 'heart_candles', name: '心心相印爱心蜡烛', icon: '🕯️', color: '#F43F5E' },
  { id: 'macaron', name: '彩色法式甜心马卡龙', icon: '🧁', color: '#C084FC' },
  { id: 'choco_plate', name: '「今天也在一起」巧克力牌', icon: '💌', color: '#4B2925' }
];

export const SweetCakeGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedCream, setSelectedCream] = useState(CREAMS[0]);
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[0]);
  const [selectedTopping, setSelectedTopping] = useState(TOPPINGS[0]);
  const [isFeasting, setIsFeasting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleFinishCake = () => {
    sound.playLevelUp();
    setIsFeasting(true);
    setHasCompleted(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    addCurrency(35, '烘焙甜心双熊蛋糕');
    addAffection(45, '甜蜜烘焙时光');
    recordTaskProgress('task_play_game');

    addAlbumCard({
      title: '甜蜜烘焙 · 专属双熊手工蛋糕',
      quote: `底胚: ${selectedBase.name} · 顶饰: ${selectedTopping.name}，两只小熊幸福地吃得满嘴奶油！`,
      tag: 'cake',
      characters: 'yier_bubu_together',
      decorBg: '#FFF3DB',
      description: '一二与布布亲手合力烘焙定制的手工蛋糕。'
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
        <button
          onClick={() => {
            sound.playPop();
            setPage('games');
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回大厅</span>
        </button>

        <div className="flex items-center gap-1.5 font-bold text-xs text-[#4B2925]">
          <Cake className="w-4 h-4 text-rose-500" />
          <span>双熊烘焙工坊</span>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            setIsFeasting(false);
            setHasCompleted(false);
            setActiveStep(1);
          }}
          className="px-2.5 py-1 text-xs font-bold bg-white rounded-xl border border-[#4B2925]/20 text-[#8C6D62] cursor-pointer"
        >
          重新烘焙
        </button>
      </div>

      {/* Live Cake Stand & Bears Preview */}
      <div className="w-full max-w-md aspect-[16/10] bg-gradient-to-b from-[#FFFDF9] to-[#FDF4EB] rounded-3xl border-3 border-[#4B2925]/20 shadow-sm p-4 relative flex flex-col items-center justify-between overflow-hidden mb-3">
        {/* Soft Background Banner */}
        <div className="text-[11px] font-extrabold text-[#8C6D62] bg-white/80 px-3 py-0.5 rounded-full border border-[#4B2925]/10">
          {hasCompleted ? '🎉 蛋糕大功告成！两只小熊开始分享！' : '🍰 正在与一二布布精心制作蛋糕...'}
        </div>

        {/* Stage Center: Assembled Cake & Bears */}
        <div className="w-full flex items-end justify-center gap-3 my-auto">
          {/* Yi Er on the Left */}
          <div className={`flex flex-col items-center ${isFeasting ? 'animate-wiggle' : 'animate-breathing'}`}>
            <img
              src="/assets/characters/yier_front.png"
              alt="一二"
              className="w-16 h-20 object-contain drop-shadow-xs"
            />
            {isFeasting && (
              <span className="text-xs -mt-1 font-bold text-rose-600 bg-white/90 px-1.5 rounded-full border border-rose-200">
                好甜呀~😋
              </span>
            )}
          </div>

          {/* The Assembled Layer Cake Stand */}
          <div className="flex flex-col items-center -space-y-1 z-10">
            {/* Top Topping */}
            <div className="text-3xl animate-bounce z-20">
              {selectedTopping.icon}
            </div>

            {/* Fruits Row */}
            <div className="flex items-center justify-center gap-1 -mb-1 z-10 text-base">
              <span>{selectedFruit.icon}</span>
              <span>{selectedFruit.icon}</span>
              <span>{selectedFruit.icon}</span>
            </div>

            {/* Cream Layer */}
            <div
              className="w-28 h-6 rounded-t-2xl border-2 border-[#4B2925]/30 shadow-xs flex items-center justify-center transition-colors"
              style={{ backgroundColor: selectedCream.color }}
            >
              <div className="w-full h-1 bg-white/40 rounded-full mx-2" />
            </div>

            {/* Cake Base Layer */}
            <div
              className="w-36 h-12 rounded-b-xl border-2 border-[#4B2925]/30 shadow-md flex items-center justify-center transition-colors"
              style={{ backgroundColor: selectedBase.color }}
            >
              <span className="text-[10px] font-bold text-white/90 drop-shadow-xs">
                {selectedBase.name}
              </span>
            </div>

            {/* Porcelain Plate */}
            <div className="w-44 h-3.5 bg-white rounded-full border-2 border-[#4B2925]/20 shadow-xs -mt-1" />
          </div>

          {/* Bubu on the Right */}
          <div className={`flex flex-col items-center ${isFeasting ? 'animate-wiggle' : 'animate-breathing'}`} style={{ animationDelay: '0.4s' }}>
            <img
              src="/assets/characters/bubu_front.png"
              alt="布布"
              className="w-16 h-20 object-contain drop-shadow-xs"
            />
            {isFeasting && (
              <span className="text-xs -mt-1 font-bold text-amber-700 bg-white/90 px-1.5 rounded-full border border-amber-200">
                布布还要吃!🧁
              </span>
            )}
          </div>
        </div>

        {/* Floating crumbs and sparkles if feasting */}
        {isFeasting && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-around">
            <span className="text-xl animate-float-heart">✨</span>
            <span className="text-xl animate-float-heart" style={{ animationDelay: '0.3s' }}>💖</span>
            <span className="text-xl animate-float-heart" style={{ animationDelay: '0.6s' }}>🍓</span>
          </div>
        )}
      </div>

      {/* 4 Steps Selector Tabs */}
      {!hasCompleted ? (
        <div className="w-full max-w-md space-y-3">
          {/* Step Navigation */}
          <div className="grid grid-cols-4 gap-1.5 bg-[#F2E6D9] p-1 rounded-2xl">
            {[
              { step: 1, label: '1.蛋糕胚' },
              { step: 2, label: '2.抹奶油' },
              { step: 3, label: '3.夹水果' },
              { step: 4, label: '4.插装扮' }
            ].map(s => (
              <button
                key={s.step}
                onClick={() => {
                  sound.playPop();
                  setActiveStep(s.step as typeof activeStep);
                }}
                className={`py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeStep === s.step
                    ? 'bg-white text-[#4B2925] shadow-xs'
                    : 'text-[#8C6D62] hover:text-[#4B2925]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Options Grid for current step */}
          <div className="grid grid-cols-2 gap-2">
            {activeStep === 1 &&
              BASES.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedBase(b);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedBase.id === b.id
                      ? 'bg-rose-50 border-rose-500 shadow-xs'
                      : 'bg-white border-[#4B2925]/15 hover:bg-[#FFF9F3]'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#4B2925]">{b.name}</div>
                    <div className="text-[10px] text-[#8C6D62]">选用此底胚</div>
                  </div>
                </button>
              ))}

            {activeStep === 2 &&
              CREAMS.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedCream(c);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedCream.id === c.id
                      ? 'bg-rose-50 border-rose-500 shadow-xs'
                      : 'bg-white border-[#4B2925]/15 hover:bg-[#FFF9F3]'
                  }`}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#4B2925]">{c.name}</div>
                    <div className="text-[10px] text-[#8C6D62]">涂抹此奶油</div>
                  </div>
                </button>
              ))}

            {activeStep === 3 &&
              FRUITS.map(f => (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedFruit(f);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedFruit.id === f.id
                      ? 'bg-rose-50 border-rose-500 shadow-xs'
                      : 'bg-white border-[#4B2925]/15 hover:bg-[#FFF9F3]'
                  }`}
                >
                  <span className="text-2xl">{f.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#4B2925]">{f.name}</div>
                    <div className="text-[10px] text-[#8C6D62]">点缀此水果</div>
                  </div>
                </button>
              ))}

            {activeStep === 4 &&
              TOPPINGS.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTopping(t);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedTopping.id === t.id
                      ? 'bg-rose-50 border-rose-500 shadow-xs'
                      : 'bg-white border-[#4B2925]/15 hover:bg-[#FFF9F3]'
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#4B2925]">{t.name}</div>
                    <div className="text-[10px] text-[#8C6D62]">插上此顶饰</div>
                  </div>
                </button>
              ))}
          </div>

          {/* Action Button: Next Step or Finish */}
          <div className="pt-2">
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  sound.playPop();
                  setActiveStep((s => (s + 1) as typeof activeStep));
                }}
                className="w-full py-3 rounded-2xl bg-[#DCA58D] text-white font-extrabold text-xs border-2 border-[#4B2925] shadow-xs active:scale-95 cursor-pointer"
              >
                下一步装饰 ➔
              </button>
            ) : (
              <button
                onClick={handleFinishCake}
                className="w-full py-3.5 rounded-2xl bg-[#588157] text-white font-extrabold text-sm border-2 border-[#4B2925] shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>完成制作 · 和小熊一起开吃蛋糕！</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed Result Card */
        <div className="w-full max-w-md bg-white rounded-3xl border-3 border-[#4B2925]/20 p-5 shadow-sm text-center animate-gentle-bounce">
          <span className="text-3xl mb-1">🍰✨</span>
          <h3 className="text-lg font-extrabold text-[#4B2925]">分享蛋糕成功！</h3>
          <p className="text-xs text-[#8C6D62] mt-0.5">
            两只小熊靠在一起美滋滋地吃完了你们一起制作的专属蛋糕！
          </p>

          <div className="my-3 p-3 bg-[#FFF9F3] rounded-2xl border border-[#4B2925]/15 text-xs text-[#4B2925]">
            <div className="font-bold text-rose-600">获得爱心与金币奖励：+35 🪙 · +45 💖</div>
            <div className="text-[10px] text-[#8C6D62] mt-1">专属烘焙回忆已自动收入小熊相册中！</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                sound.playPop();
                setHasCompleted(false);
                setIsFeasting(false);
                setActiveStep(1);
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
            >
              再做一款新蛋糕
            </button>
            <button
              onClick={() => setPage('album')}
              className="flex-1 py-2.5 rounded-xl bg-white text-[#4B2925] font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
            >
              查看相册回忆
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
