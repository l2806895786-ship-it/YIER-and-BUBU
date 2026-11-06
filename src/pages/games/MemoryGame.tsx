import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, RotateCcw, Timer, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface MemoryCardItem {
  uid: number;
  pairId: string;
  name: string;
  image?: string;
  icon?: string;
  bg: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const ALL_CARD_PAIRS = [
  { pairId: 'yier', name: '一二小熊', image: '/assets/characters/yier_front.png', bg: '#FFF9F3' },
  { pairId: 'bubu', name: '布布小熊', image: '/assets/characters/bubu_front.png', bg: '#FDF6EE' },
  { pairId: 'heart', name: '心心相印', icon: '💖', bg: '#FEE2E2' },
  { pairId: 'cake', name: '草莓小蛋糕', icon: '🍰', bg: '#FFEDD5' },
  { pairId: 'gift', name: '甜蜜礼物', icon: '🎁', bg: '#FEF08A' },
  { pairId: 'star', name: '闪烁星星', icon: '⭐', bg: '#FEF9C3' },
  { pairId: 'bow', name: '蝴蝶结', icon: '🎀', bg: '#FCE7F3' },
  { pairId: 'milktea', name: '波波奶茶', icon: '🧋', bg: '#EDE9FE' }
];

export const MemoryGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [flipsCount, setFlipsCount] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Total pairs depending on difficulty
  const pairsCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 6 : 8;

  // Initialize and shuffle deck
  const initializeGame = (diff: Difficulty = difficulty) => {
    sound.playPop();
    const count = diff === 'easy' ? 3 : diff === 'medium' ? 6 : 8;
    const pool = ALL_CARD_PAIRS.slice(0, count);

    const deck: MemoryCardItem[] = [];
    let uid = 0;

    pool.forEach(item => {
      // 2 cards per pair
      deck.push({
        uid: uid++,
        pairId: item.pairId,
        name: item.name,
        image: item.image,
        icon: item.icon,
        bg: item.bg,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        uid: uid++,
        pairId: item.pairId,
        name: item.name,
        image: item.image,
        icon: item.icon,
        bg: item.bg,
        isFlipped: false,
        isMatched: false
      });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setSelectedCards([]);
    setIsChecking(false);
    setFlipsCount(0);
    setMatchedPairs(0);
    setGameWon(false);
    setSecondsElapsed(0);
    setCombo(0);
    setMaxCombo(0);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    initializeGame(difficulty);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    sound.playFlip();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);
    setFlipsCount(prev => prev + 1);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstIdx, secondIdx] = newSelected;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          sound.playMatchSuccess();
          const matchedDeck = [...cards];
          matchedDeck[firstIdx].isMatched = true;
          matchedDeck[secondIdx].isMatched = true;
          setCards(matchedDeck);
          setSelectedCards([]);
          setIsChecking(false);

          const newCombo = combo + 1;
          setCombo(newCombo);
          if (newCombo > maxCombo) setMaxCombo(newCombo);

          const newMatched = matchedPairs + 1;
          setMatchedPairs(newMatched);

          // Check Victory
          if (newMatched === pairsCount) {
            handleVictory(newCombo);
          }
        }, 300);
      } else {
        // MISMATCH: Wait exactly 0.8s per PRD
        setTimeout(() => {
          setCombo(0);
          const revertedDeck = [...cards];
          revertedDeck[firstIdx].isFlipped = false;
          revertedDeck[secondIdx].isFlipped = false;
          setCards(revertedDeck);
          setSelectedCards([]);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  const handleVictory = (finalCombo: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameWon(true);

    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 }
    });

    const baseCoins = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35;
    let extraCoins = 0;
    if (secondsElapsed <= 20) extraCoins += 8;
    if (flipsCount <= pairsCount * 2 + 2) extraCoins += 7;
    if (finalCombo >= 3) extraCoins += 5;
    const totalCoins = baseCoins + extraCoins;
    const affectionReward = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 35 : 50;

    addCurrency(totalCoins, `记忆翻牌[${difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '普通' : '困难'}]通关`);
    addAffection(affectionReward, '双熊记忆挑战');
    recordTaskProgress('task_play_game');

    addAlbumCard({
      title: `记忆翻牌大圆满 (${difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '普通' : '困难'})`,
      quote: `用了 ${flipsCount + 2} 步与 ${secondsElapsed} 秒，全部找到啦！`,
      tag: 'memory',
      characters: 'yier_bubu_together',
      decorBg: '#FFF3DB',
      description: '一二和布布专属卡片全部配对成功。'
    });
  };

  // Grid style
  const gridColsClass =
    difficulty === 'easy'
      ? 'grid-cols-3 max-w-xs'
      : difficulty === 'medium'
      ? 'grid-cols-3 sm:grid-cols-4 max-w-md'
      : 'grid-cols-4 max-w-lg';

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Top Navigation & Status Bar */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
        <button
          onClick={() => {
            sound.playPop();
            setPage('games');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回大厅</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-bold text-[#4B2925]">
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-[#C87961]" />
            <span className="font-mono tabular-nums">{secondsElapsed}s</span>
          </div>
          <div className="flex items-center gap-1">
            <span>步数:</span>
            <span className="font-mono tabular-nums">{flipsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>配对:</span>
            <span className="font-mono tabular-nums text-[#588157]">{matchedPairs}/{pairsCount}</span>
          </div>
          {combo > 1 && (
            <div className="flex items-center gap-0.5 text-[#E85D56] font-extrabold animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-[#E85D56]" />
              <span>x{combo}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => initializeGame(difficulty)}
          title="重新洗牌"
          className="p-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Difficulty Switcher */}
      <div className="w-full max-w-xs flex items-center justify-center gap-1.5 bg-[#F2E6D9] p-1 rounded-2xl mb-3">
        {[
          { id: 'easy' as Difficulty, label: '简单 (2×3)' },
          { id: 'medium' as Difficulty, label: '普通 (3×4)' },
          { id: 'hard' as Difficulty, label: '困难 (4×4)' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (difficulty !== item.id) {
                setDifficulty(item.id);
              }
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              difficulty === item.id
                ? 'bg-white text-[#4B2925] shadow-xs'
                : 'text-[#8C6D62] hover:text-[#4B2925]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Card Grid with Foolproof 3D Flip */}
      <div className={`w-full grid gap-2.5 sm:gap-3 py-2 ${gridColsClass}`}>
        {cards.map((card, idx) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.uid}
              onClick={() => handleCardClick(idx)}
              className="aspect-[3/4] relative cursor-pointer select-none"
              style={{ perspective: '1000px' }}
            >
              <div
                className="w-full h-full relative rounded-2xl transition-transform duration-400"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* 1. CARD BACK (Shown when unrevealed) */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 sm:border-3 border-[#4B2925]/20 bg-gradient-to-br from-[#FFF5EC] to-[#FBEAE7] shadow-sm flex flex-col items-center justify-center p-2"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#DCA58D]/30 border border-[#4B2925]/15 flex items-center justify-center text-lg mb-1 shadow-xs">
                    🐾
                  </div>
                  <span className="text-[10px] font-extrabold text-[#8C6D62]">一二布布</span>
                  <div className="w-6 h-0.5 bg-[#4B2925]/20 rounded-full mt-1" />
                </div>

                {/* 2. CARD FRONT (Shown when flipped) */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 sm:border-3 border-[#4B2925]/30 shadow-md flex flex-col items-center justify-center p-2 ${
                    card.isMatched ? 'bg-[#D8E6D1]/60' : 'bg-white'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: card.isMatched ? '#E8F5E9' : card.bg || '#FFFFFF'
                  }}
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-12 h-16 sm:w-14 sm:h-18 object-contain filter drop-shadow-xs pointer-events-none"
                    />
                  ) : (
                    <span className="text-3xl sm:text-4xl filter drop-shadow-xs animate-gentle-bounce">
                      {card.icon}
                    </span>
                  )}
                  <span className="text-[11px] font-extrabold text-[#4B2925] mt-1 text-center leading-tight">
                    {card.name}
                  </span>
                  {card.isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-[#588157] absolute top-1.5 right-1.5 bg-white rounded-full shadow-xs" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {gameWon && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-6 shadow-2xl animate-gentle-bounce text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-extrabold text-[#4B2925]">太棒啦！全数配对成功！</h3>
            <p className="text-xs text-[#8C6D62] mt-1">一二和布布为你欢呼庆祝！</p>

            {/* Victory Bears Animation */}
            <div className="flex items-center justify-center -space-x-4 my-3">
              <img src="/assets/characters/yier_front.png" alt="一二" className="w-14 h-18 object-contain animate-bounce" />
              <img src="/assets/characters/bubu_front.png" alt="布布" className="w-14 h-18 object-contain animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Score Breakdown */}
            <div className="my-3 p-3.5 bg-white rounded-2xl border-2 border-[#4B2925]/15 space-y-1.5 text-xs text-[#4B2925]">
              <div className="flex justify-between">
                <span className="text-[#8C6D62]">难度模式：</span>
                <span className="font-bold text-[#C87961]">
                  {difficulty === 'easy' ? '简单 (2×3)' : difficulty === 'medium' ? '普通 (3×4)' : '困难 (4×4)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6D62]">通关耗时：</span>
                <span className="font-mono font-bold">{secondsElapsed} 秒</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6D62]">翻牌次数：</span>
                <span className="font-mono font-bold">{flipsCount} 步</span>
              </div>
              {maxCombo > 1 && (
                <div className="flex justify-between text-[#E85D56]">
                  <span>最大连续连击：</span>
                  <span className="font-mono font-bold">x{maxCombo} Combo!</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#4B2925]/10 flex justify-between font-bold text-[#C85A53]">
                <span>获得奖励：</span>
                <span>+{difficulty === 'easy' ? '20' : difficulty === 'medium' ? '30~38' : '40~48'} 🪙 · +35 💖</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => initializeGame(difficulty)}
                className="flex-1 py-3 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] active:scale-95 transition-transform cursor-pointer"
              >
                再玩一次
              </button>
              <button
                onClick={() => {
                  sound.playPop();
                  setPage('games');
                }}
                className="flex-1 py-3 rounded-xl bg-white text-[#4B2925] font-bold text-xs border-2 border-[#4B2925] active:scale-95 transition-transform cursor-pointer"
              >
                返回大厅
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
