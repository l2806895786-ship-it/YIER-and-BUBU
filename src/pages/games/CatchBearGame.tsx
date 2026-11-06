import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Timer, Heart, Trophy, Play } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface FallingBubu {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const CatchBearGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(35);
  const [hugEvent, setHugEvent] = useState(false);

  // Yi Er position (bottom)
  const [yierX, setYierX] = useState(140);
  const targetXRef = useRef(140);
  const bubusRef = useRef<FallingBubu[]>([]);
  const nextIdRef = useRef(1);
  const lastSpawnRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  const STAGE_WIDTH = 340;
  const STAGE_HEIGHT = 420;
  const YIER_WIDTH = 64;
  const BUBU_SIZE = 48;

  const startGame = () => {
    sound.playPop();
    setScore(0);
    setTimeLeft(35);
    setYierX(STAGE_WIDTH / 2 - YIER_WIDTH / 2);
    targetXRef.current = STAGE_WIDTH / 2 - YIER_WIDTH / 2;
    bubusRef.current = [];
    nextIdRef.current = 1;
    lastSpawnRef.current = Date.now();
    setHugEvent(false);
    setGameState('PLAYING');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
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
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setGameState('GAME_OVER');
    sound.playMatchSuccess();

    setScore(finalScore => {
      const coins = Math.min(42, 18 + Math.floor(finalScore * 2));
      const affection = Math.min(50, 20 + Math.floor(finalScore * 1.5));

      addCurrency(coins, '接住布布大考验');
      addAffection(affection, '双熊温暖拥抱');
      recordTaskProgress('task_play_game');

      if (finalScore >= 10) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      addAlbumCard({
        title: '接住布布的温暖一刻',
        quote: `无论跌落何方，一二总会伸开双臂稳稳接住你。`,
        tag: 'catch_bear',
        characters: 'yier_bubu_together',
        decorBg: '#FFF9F3',
        description: '在接住布布小游戏中成功接住空中跳跃的布布。'
      });

      return finalScore;
    });
  };

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 60fps Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Update Yi Er movement
      const speed = 360 * dt;
      if (keysRef.current.left) {
        targetXRef.current = Math.max(10, targetXRef.current - speed);
      }
      if (keysRef.current.right) {
        targetXRef.current = Math.min(STAGE_WIDTH - YIER_WIDTH - 10, targetXRef.current + speed);
      }

      setYierX(prev => {
        const next = prev + (targetXRef.current - prev) * 0.28;
        return Math.max(10, Math.min(STAGE_WIDTH - YIER_WIDTH - 10, next));
      });

      // Spawn Bubu
      const now = Date.now();
      const spawnInterval = Math.max(900, 1600 - (35 - timeLeft) * 20);
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        bubusRef.current.push({
          id: nextIdRef.current++,
          x: Math.random() * (STAGE_WIDTH - BUBU_SIZE - 40) + 20,
          y: -20,
          vx: (Math.random() - 0.5) * 40,
          vy: 140 + (35 - timeLeft) * 3
        });
      }

      // Update Bubu positions and collision with Yi Er cushion
      const yierTop = STAGE_HEIGHT - 75;
      const remaining: FallingBubu[] = [];

      bubusRef.current.forEach(b => {
        b.y += b.vy * dt;
        b.x += b.vx * dt;

        // Collision with Yi Er
        const hitX = b.x >= targetXRef.current - 20 && b.x <= targetXRef.current + YIER_WIDTH + 10;
        const hitY = b.y >= yierTop - 15 && b.y <= yierTop + 35;

        if (hitX && hitY) {
          sound.playHug();
          setScore(s => s + 1);
          setHugEvent(true);
          setTimeout(() => setHugEvent(false), 500);
        } else if (b.y < STAGE_HEIGHT + 20) {
          remaining.push(b);
        }
      });
      bubusRef.current = remaining;

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, timeLeft]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - YIER_WIDTH / 2;
    targetXRef.current = Math.max(10, Math.min(STAGE_WIDTH - YIER_WIDTH - 10, x));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Top Header */}
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
            <span>接住次数:</span>
            <span className="font-mono tabular-nums text-sm text-rose-600">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-[#C87961]" />
            <span className={`font-mono tabular-nums ${timeLeft <= 5 ? 'text-red-500 animate-pulse font-extrabold' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <span className="text-[10px] text-[#8C6D62]">左右移动接住</span>
      </div>

      {/* Game Stage */}
      <div
        onPointerMove={handlePointerMove}
        className="relative w-full max-w-[340px] aspect-[340/420] rounded-3xl overflow-hidden border-4 border-[#4B2925]/25 shadow-md bg-gradient-to-b from-[#EFF6FF] via-[#FDF2F8] to-[#FFF7ED] cursor-ew-resize"
      >
        {/* Soft clouds */}
        <div className="absolute top-4 left-6 text-2xl opacity-60">☁️</div>
        <div className="absolute top-12 right-6 text-xl opacity-60">☁️</div>

        {/* Falling Bubus */}
        {bubusRef.current.map(b => (
          <div
            key={b.id}
            className="absolute pointer-events-none flex flex-col items-center"
            style={{ left: b.x, top: b.y, width: BUBU_SIZE }}
          >
            <span className="text-sm -mb-1 animate-bounce">🎈</span>
            <img
              src="/assets/characters/bubu_front.png"
              alt="下落的布布"
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
        ))}

        {/* Catcher: Yi Er holding cozy cushion */}
        <div
          className="absolute bottom-4 flex flex-col items-center pointer-events-none transition-transform"
          style={{ left: yierX, width: YIER_WIDTH }}
        >
          {hugEvent && (
            <div className="text-xl animate-float-heart absolute -top-8 text-rose-500 font-extrabold">
              💖 稳稳接住!
            </div>
          )}
          {/* Cushion */}
          <div className="w-16 h-5 rounded-full bg-rose-200 border-2 border-rose-400 shadow-sm flex items-center justify-center -mb-2 z-10">
            <span className="text-[9px] font-bold text-rose-700">暖暖软垫</span>
          </div>
          <img
            src="/assets/characters/yier_front.png"
            alt="一二接住"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* IDLE Start */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-4xl mb-2">🧸🎈</span>
            <h3 className="text-lg font-extrabold text-[#4B2925]">接住布布！</h3>
            <p className="text-xs text-[#8C6D62] mt-1.5 leading-relaxed">
              布布系着小气球从空中欢快跳跃而下！操控下方的一二左右移动，用软绵绵的暖垫接住布布，触发甜蜜拥抱！
            </p>
            <button
              onClick={startGame}
              className="mt-4 py-3 px-8 rounded-2xl bg-[#DCA58D] text-white font-extrabold text-xs border-2 border-[#4B2925] shadow-md active:scale-95 cursor-pointer"
            >
              开始挑战 (35秒)
            </button>
          </div>
        )}

        {/* GAME OVER */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 animate-gentle-bounce">
            <span className="text-4xl mb-1">🎉</span>
            <h3 className="text-lg font-extrabold text-[#4B2925]">大考验完成！</h3>
            <p className="text-xs text-[#8C6D62] mt-0.5">一二稳稳地接住了每一次跳跃的布布！</p>
            <div className="my-3 p-3.5 bg-[#FFF9F3] rounded-2xl border-2 border-[#4B2925]/15 w-full">
              <div className="text-2xl font-mono font-extrabold text-rose-600">{score} 次安全接住</div>
              <div className="text-xs font-bold text-[#588157] mt-1">
                奖励：+{Math.min(42, 18 + score * 2)} 🪙 · +35 💖
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

      {/* Mobile buttons */}
      <div className="w-full max-w-[340px] flex items-center justify-between gap-3 mt-3">
        <button
          onClick={() => {
            targetXRef.current = Math.max(10, targetXRef.current - 45);
          }}
          className="flex-1 py-3 bg-white rounded-xl border-2 border-[#4B2925]/20 font-bold text-xs text-[#4B2925] active:bg-orange-50 cursor-pointer shadow-xs"
        >
          ⬅️ 向左接
        </button>
        <button
          onClick={() => {
            targetXRef.current = Math.min(STAGE_WIDTH - YIER_WIDTH - 10, targetXRef.current + 45);
          }}
          className="flex-1 py-3 bg-white rounded-xl border-2 border-[#4B2925]/20 font-bold text-xs text-[#4B2925] active:bg-orange-50 cursor-pointer shadow-xs"
        >
          向右接 ➡️
        </button>
      </div>
    </div>
  );
};
