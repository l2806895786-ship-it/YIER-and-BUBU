import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Timer, Heart, Sparkles, HandMetal } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface GameHeart {
  id: number;
  x: number;
  y: number;
  type: 'single' | 'dual';
  pulse: number;
}

export const HeartCollectorGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isHoldingHands, setIsHoldingHands] = useState(false);
  const [showHugEffect, setShowHugEffect] = useState(false);

  // Character positions on 360x420 stage
  const [yierPos, setYierPos] = useState({ x: 90, y: 220 });
  const [bubuPos, setBubuPos] = useState({ x: 230, y: 220 });
  const [hearts, setHearts] = useState<GameHeart[]>([]);

  const keysDownRef = useRef<{ [key: string]: boolean }>({});
  const timerIntervalRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const STAGE_WIDTH = 350;
  const STAGE_HEIGHT = 400;
  const BEAR_SIZE = 56;

  // Initialize hearts
  const spawnHearts = () => {
    const newHearts: GameHeart[] = [];
    for (let i = 0; i < 6; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * (STAGE_WIDTH - 60) + 30,
        y: Math.random() * (STAGE_HEIGHT - 80) + 30,
        type: i % 2 === 0 ? 'dual' : 'single',
        pulse: 0
      });
    }
    setHearts(newHearts);
  };

  const startGame = () => {
    sound.playPop();
    setScore(0);
    setTimeLeft(60);
    setYierPos({ x: 100, y: 220 });
    setBubuPos({ x: 220, y: 220 });
    setIsHoldingHands(false);
    setShowHugEffect(false);
    spawnHearts();
    setGameState('PLAYING');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setGameState('GAME_OVER');
    sound.playMatchSuccess();

    setScore(finalScore => {
      const coins = Math.min(45, 20 + Math.floor(finalScore * 1.5));
      const affection = Math.min(50, 25 + Math.floor(finalScore * 1.2));

      addCurrency(coins, '一起收集爱心挑战');
      addAffection(affection, '双熊合作收集爱心');
      recordTaskProgress('task_play_game');

      if (finalScore >= 15) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      addAlbumCard({
        title: '双熊爱心大冒险',
        quote: `并肩作战收集了 ${finalScore} 颗爱心，牵手的瞬间最温暖！`,
        tag: 'collector',
        characters: 'yier_bubu_together',
        decorBg: '#FBEAE7',
        description: '一二与布布牵手共同收集地图爱心。'
      });

      return finalScore;
    });
  };

  // Keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysDownRef.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysDownRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Game update loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const speed = 190 * dt;

      // Yi Er moves via WASD or Arrow Keys
      let dxY = 0, dyY = 0;
      let dxB = 0, dyB = 0;

      const keys = keysDownRef.current;
      if (keys['w'] || keys['W']) dyY -= speed;
      if (keys['s'] || keys['S']) dyY += speed;
      if (keys['a'] || keys['A']) dxY -= speed;
      if (keys['d'] || keys['D']) dxY += speed;

      // Bubu moves via Arrows, or follows Yi Er if holding hands!
      if (keys['ArrowUp']) dyB -= speed;
      if (keys['ArrowDown']) dyB += speed;
      if (keys['ArrowLeft']) dxB -= speed;
      if (keys['ArrowRight']) dxB += speed;

      setYierPos(prevY => {
        setBubuPos(prevB => {
          let nextY = {
            x: Math.max(10, Math.min(STAGE_WIDTH - BEAR_SIZE - 10, prevY.x + dxY)),
            y: Math.max(10, Math.min(STAGE_HEIGHT - BEAR_SIZE - 10, prevY.y + dyY))
          };
          let nextB = {
            x: Math.max(10, Math.min(STAGE_WIDTH - BEAR_SIZE - 10, prevB.x + dxB)),
            y: Math.max(10, Math.min(STAGE_HEIGHT - BEAR_SIZE - 10, prevB.y + dyB))
          };

          // Distance between bears
          const dist = Math.hypot(nextY.x - nextB.x, nextY.y - nextB.y);
          const handRange = 55;

          if (dist < handRange) {
            setIsHoldingHands(true);
            // If one moves, pull the other gently
            if ((dxY !== 0 || dyY !== 0) && dxB === 0 && dyB === 0) {
              nextB.x += (nextY.x - nextB.x + 36) * 0.12;
              nextB.y += (nextY.y - nextB.y) * 0.12;
            }
          } else {
            setIsHoldingHands(false);
          }

          // Check collisions with hearts
          setHearts(currentHearts => {
            const uncollected: GameHeart[] = [];

            currentHearts.forEach(h => {
              const distToY = Math.hypot(nextY.x + 20 - h.x, nextY.y + 25 - h.y);
              const distToB = Math.hypot(nextB.x + 20 - h.x, nextB.y + 25 - h.y);

              if (h.type === 'single') {
                if (distToY < 35 || distToB < 35) {
                  sound.playCatchHeart();
                  setScore(s => s + 1);
                } else {
                  uncollected.push(h);
                }
              } else {
                // Dual heart requires BOTH bears close or holding hands!
                if (distToY < 48 && distToB < 48) {
                  sound.playHug();
                  setShowHugEffect(true);
                  setTimeout(() => setShowHugEffect(false), 900);
                  setScore(s => s + 3);
                } else {
                  uncollected.push(h);
                }
              }
            });

            // If hearts get low, replenish
            if (uncollected.length < 3) {
              for (let i = 0; i < 4; i++) {
                uncollected.push({
                  id: Date.now() + Math.random(),
                  x: Math.random() * (STAGE_WIDTH - 60) + 30,
                  y: Math.random() * (STAGE_HEIGHT - 80) + 30,
                  type: Math.random() > 0.45 ? 'dual' : 'single',
                  pulse: 0
                });
              }
            }

            return uncollected;
          });

          return nextB;
        });
        return {
          x: Math.max(10, Math.min(STAGE_WIDTH - BEAR_SIZE - 10, prevY.x + dxY)),
          y: Math.max(10, Math.min(STAGE_HEIGHT - BEAR_SIZE - 10, prevY.y + dyY))
        };
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Touch pad for mobile: Move both toward direction
  const handleVirtualMove = (dx: number, dy: number) => {
    setYierPos(y => ({
      x: Math.max(10, Math.min(STAGE_WIDTH - BEAR_SIZE - 10, y.x + dx)),
      y: Math.max(10, Math.min(STAGE_HEIGHT - BEAR_SIZE - 10, y.y + dy))
    }));
    setBubuPos(b => ({
      x: Math.max(10, Math.min(STAGE_WIDTH - BEAR_SIZE - 10, b.x + dx)),
      y: Math.max(10, Math.min(STAGE_HEIGHT - BEAR_SIZE - 10, b.y + dy))
    }));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Top Bar */}
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

        <div className="flex items-center gap-3 text-xs font-bold text-[#4B2925]">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>积分:</span>
            <span className="font-mono tabular-nums text-sm text-rose-600">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-[#C87961]" />
            <span className={`font-mono tabular-nums ${timeLeft <= 10 ? 'text-red-500 animate-pulse font-extrabold' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {isHoldingHands ? (
          <span className="bg-rose-100 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-bounce">
            🤝 牵手合力中!
          </span>
        ) : (
          <span className="text-[10px] text-[#8C6D62]">靠拢即可牵手</span>
        )}
      </div>

      {/* Main Play Arena */}
      <div
        className="relative w-full max-w-[350px] aspect-[350/400] rounded-3xl overflow-hidden border-4 border-[#4B2925]/25 shadow-md bg-gradient-to-b from-[#FFF7ED] via-[#FDF2E9] to-[#FCE7F3]"
      >
        {/* Grassland / Path decorative floor */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#DCA58D 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Hug Celebration Pop */}
        {showHugEffect && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 animate-gentle-bounce">
            <span className="text-4xl">🫂💖</span>
            <span className="bg-white/90 text-rose-600 font-extrabold text-xs px-3 py-1 rounded-full shadow-md mt-1 border border-rose-200">
              双熊默契合体 +3分!
            </span>
          </div>
        )}

        {/* Scattered Hearts */}
        {hearts.map(h => (
          <div
            key={h.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            style={{ left: h.x, top: h.y }}
          >
            {h.type === 'dual' ? (
              <div className="flex flex-col items-center animate-bounce">
                <span className="text-2xl filter drop-shadow-sm">💖</span>
                <span className="text-[8px] font-bold bg-rose-500 text-white px-1 rounded-full -mt-1 shadow-xs">
                  双熊吃
                </span>
              </div>
            ) : (
              <span className="text-xl filter drop-shadow-xs animate-breathing">💗</span>
            )}
          </div>
        ))}

        {/* Yi Er (White Bear) */}
        <div
          className="absolute transition-transform duration-75 pointer-events-none"
          style={{
            left: yierPos.x,
            top: yierPos.y,
            width: BEAR_SIZE,
            height: Math.round(BEAR_SIZE * 1.35)
          }}
        >
          <img
            src="/assets/characters/yier_front.png"
            alt="一二"
            className="w-full h-full object-contain drop-shadow-xs"
          />
          <div className="text-[9px] font-bold text-center text-[#4B2925] bg-white/80 rounded-full -mt-1 border border-[#4B2925]/20">
            一二
          </div>
        </div>

        {/* Bubu (Brown Bear) */}
        <div
          className="absolute transition-transform duration-75 pointer-events-none"
          style={{
            left: bubuPos.x,
            top: bubuPos.y,
            width: BEAR_SIZE,
            height: Math.round(BEAR_SIZE * 1.35)
          }}
        >
          <img
            src="/assets/characters/bubu_front.png"
            alt="布布"
            className="w-full h-full object-contain drop-shadow-xs"
          />
          <div className="text-[9px] font-bold text-center text-[#4B2925] bg-white/80 rounded-full -mt-1 border border-[#4B2925]/20">
            布布
          </div>
        </div>

        {/* IDLE Start Screen */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-4xl mb-2">🤝💕</span>
            <h3 className="text-lg font-extrabold text-[#4B2925]">一起收集爱心</h3>
            <p className="text-xs text-[#8C6D62] mt-1.5 leading-relaxed">
              控制一二与布布一同漫步收集爱心！两只小熊靠近时可以牵手同步移动；遇见大爱心时两熊同时吃可获得更高分！
            </p>
            <div className="text-[11px] text-[#A89F91] my-3">
              键盘：WASD 控制一二 · 方向键控制布布
            </div>
            <button
              onClick={startGame}
              className="py-3 px-8 rounded-2xl bg-[#DCA58D] text-white font-extrabold text-xs border-2 border-[#4B2925] shadow-md active:scale-95 cursor-pointer"
            >
              开始游戏 (60秒)
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 animate-gentle-bounce">
            <span className="text-4xl mb-1">🎉</span>
            <h3 className="text-lg font-extrabold text-[#4B2925]">挑战完成！</h3>
            <p className="text-xs text-[#8C6D62] mt-0.5">两只小熊手牵手收集了满满的甜蜜爱心！</p>
            <div className="my-3 p-3 bg-[#FFF9F3] rounded-2xl border-2 border-[#4B2925]/15 w-full">
              <div className="text-2xl font-mono font-extrabold text-rose-600">{score} 颗爱心</div>
              <div className="text-xs font-bold text-[#588157] mt-1">
                奖励：+{Math.min(45, 20 + Math.floor(score * 1.5))} 🪙 · +35 💖
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={startGame}
                className="flex-1 py-2.5 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
              >
                再玩一次
              </button>
              <button
                onClick={() => setPage('games')}
                className="flex-1 py-2.5 rounded-xl bg-white text-[#4B2925] font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
              >
                返回大厅
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch Direction Controls */}
      <div className="w-full max-w-[350px] flex items-center justify-center gap-2 mt-3">
        <button
          onClick={() => handleVirtualMove(-30, 0)}
          className="w-14 h-12 bg-white rounded-xl border-2 border-[#4B2925]/20 flex items-center justify-center font-bold text-lg active:bg-orange-50 cursor-pointer shadow-xs"
        >
          ⬅️
        </button>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => handleVirtualMove(0, -30)}
            className="w-14 h-11 bg-white rounded-xl border-2 border-[#4B2925]/20 flex items-center justify-center font-bold text-lg active:bg-orange-50 cursor-pointer shadow-xs"
          >
            ⬆️
          </button>
          <button
            onClick={() => handleVirtualMove(0, 30)}
            className="w-14 h-11 bg-white rounded-xl border-2 border-[#4B2925]/20 flex items-center justify-center font-bold text-lg active:bg-orange-50 cursor-pointer shadow-xs"
          >
            ⬇️
          </button>
        </div>
        <button
          onClick={() => handleVirtualMove(30, 0)}
          className="w-14 h-12 bg-white rounded-xl border-2 border-[#4B2925]/20 flex items-center justify-center font-bold text-lg active:bg-orange-50 cursor-pointer shadow-xs"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};
