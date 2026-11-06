import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Star, Sparkles, UserCheck } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  type: 'heart' | 'star';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface FloatingScore {
  id: number;
  x: number;
  y: number;
  text: string;
  alpha: number;
}

export const CatchHeartsGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress, saveData } = useGame();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedBear, setSelectedBear] = useState<'bubu' | 'yier'>('bubu');

  // Preloaded bear sprites
  const bubuImgRef = useRef<HTMLImageElement | null>(null);
  const yierImgRef = useRef<HTMLImageElement | null>(null);

  // Character basket position
  const playerXRef = useRef(150);
  const playerTargetXRef = useRef(150);
  const itemsRef = useRef<FallingItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingsRef = useRef<FloatingScore[]>([]);
  const nextItemIdRef = useRef(1);
  const nextFloatIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const keysDownRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Canvas dimensions
  const CANVAS_WIDTH = 360;
  const CANVAS_HEIGHT = 460;
  const BASKET_WIDTH = 72;
  const BASKET_HEIGHT = 38;

  // Preload character images
  useEffect(() => {
    const bImg = new Image();
    bImg.src = '/assets/characters/bubu_front.png';
    bubuImgRef.current = bImg;

    const yImg = new Image();
    yImg.src = '/assets/characters/yier_front.png';
    yierImgRef.current = yImg;
  }, []);

  const spawnParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 30;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
        alpha: 1,
        color,
        size: Math.random() * 4 + 2
      });
    }
  };

  const spawnFloatingScore = (x: number, y: number, text: string) => {
    floatingsRef.current.push({
      id: nextFloatIdRef.current++,
      x,
      y,
      text,
      alpha: 1
    });
  };

  const startGame = useCallback(() => {
    sound.playPop();
    setScore(0);
    setTimeLeft(30);
    playerXRef.current = CANVAS_WIDTH / 2 - BASKET_WIDTH / 2;
    playerTargetXRef.current = playerXRef.current;
    itemsRef.current = [];
    particlesRef.current = [];
    floatingsRef.current = [];
    nextItemIdRef.current = 1;
    lastSpawnTimeRef.current = Date.now();
    setGameState('PLAYING');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleGameOver = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    setGameState('GAME_OVER');
    sound.playMatchSuccess();

    setScore(finalScore => {
      let coins = 12;
      if (finalScore >= 15) coins += 10;
      if (finalScore >= 25) coins += 10;
      if (finalScore >= 35) coins += 5;
      const totalCoins = Math.min(38, coins);
      const affectionReward = Math.min(45, 18 + Math.floor(finalScore * 0.8));

      addCurrency(totalCoins, '接住爱心挑战');
      addAffection(affectionReward, '默契捕心奖励');
      recordTaskProgress('task_play_game');

      if (finalScore >= 20) {
        confetti({ particleCount: 55, spread: 65, origin: { y: 0.6 } });
      }

      addAlbumCard({
        title: '30秒爱心神捕手',
        quote: `收获了满满 ${finalScore} 颗爱心，今天也是被爱意包围的日子！`,
        tag: 'catch',
        characters: 'yier_bubu_together',
        decorBg: '#FBEAE7',
        description: '在限时爱心雨中和小熊一起接住漫天爱心。'
      });

      return finalScore;
    });
  }, [addCurrency, addAffection, addAlbumCard, recordTaskProgress]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysDownRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysDownRef.current.right = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysDownRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysDownRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Main 60fps Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      // Update Player Position
      const moveSpeed = 380 * dt;
      if (keysDownRef.current.left) {
        playerXRef.current = Math.max(8, playerXRef.current - moveSpeed);
      }
      if (keysDownRef.current.right) {
        playerXRef.current = Math.min(CANVAS_WIDTH - BASKET_WIDTH - 8, playerXRef.current + moveSpeed);
      }

      // Smooth touch lerp
      playerXRef.current += (playerTargetXRef.current - playerXRef.current) * 0.28;
      playerXRef.current = Math.max(8, Math.min(CANVAS_WIDTH - BASKET_WIDTH - 8, playerXRef.current));

      // Difficulty ramp
      const currentElapsed = 30 - timeLeft;
      const baseSpeed = currentElapsed < 10 ? 170 : currentElapsed < 20 ? 230 : 290;
      const spawnInterval = currentElapsed < 10 ? 620 : currentElapsed < 20 ? 460 : 340;

      // Spawn falling items
      const now = Date.now();
      if (now - lastSpawnTimeRef.current > spawnInterval) {
        lastSpawnTimeRef.current = now;
        const isStar = Math.random() < 0.24;
        itemsRef.current.push({
          id: nextItemIdRef.current++,
          x: Math.random() * (CANVAS_WIDTH - 44) + 22,
          y: -20,
          speed: baseSpeed * (0.85 + Math.random() * 0.35),
          size: isStar ? 26 : 24,
          type: isStar ? 'star' : 'heart'
        });
      }

      // Basket collision rect
      const basketY = CANVAS_HEIGHT - 65;
      const remainingItems: FallingItem[] = [];

      itemsRef.current.forEach(item => {
        item.y += item.speed * dt;

        const inBasketX = item.x >= playerXRef.current - 12 && item.x <= playerXRef.current + BASKET_WIDTH + 12;
        const inBasketY = item.y >= basketY && item.y <= basketY + BASKET_HEIGHT;

        if (inBasketX && inBasketY) {
          sound.playCatchHeart();
          const pointVal = item.type === 'star' ? 3 : 1;
          setScore(prev => prev + pointVal);
          spawnParticles(item.x, item.y, item.type === 'star' ? '#F6D58B' : '#F6C8C5');
          spawnFloatingScore(item.x, item.y - 10, item.type === 'star' ? '+3' : '+1');
        } else if (item.y < CANVAS_HEIGHT + 20) {
          remainingItems.push(item);
        }
      });
      itemsRef.current = remainingItems;

      // Update Particles
      particlesRef.current.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= dt * 2.2;
      });
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);

      // Update Floating scores
      floatingsRef.current.forEach(f => {
        f.y -= 35 * dt;
        f.alpha -= dt * 1.5;
      });
      floatingsRef.current = floatingsRef.current.filter(f => f.alpha > 0);

      // --- RENDER SCENE ---
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      skyGrad.addColorStop(0, '#FFF6EE');
      skyGrad.addColorStop(0.65, '#FBEAE7');
      skyGrad.addColorStop(1, '#F6D3CA');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Fluffy clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.arc(60, 70, 26, 0, Math.PI * 2);
      ctx.arc(88, 65, 32, 0, Math.PI * 2);
      ctx.arc(114, 70, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(260, 100, 22, 0, Math.PI * 2);
      ctx.arc(285, 95, 28, 0, Math.PI * 2);
      ctx.arc(308, 100, 20, 0, Math.PI * 2);
      ctx.fill();

      // Render Falling Hearts & Stars
      itemsRef.current.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.type === 'star' ? '⭐' : '💖', 0, 0);
        ctx.restore();
      });

      // Render Floor
      ctx.fillStyle = '#E8DACB';
      ctx.fillRect(0, CANVAS_HEIGHT - 22, CANVAS_WIDTH, 22);

      // Render Particles
      particlesRef.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Floating +1 / +3 Scores
      floatingsRef.current.forEach(f => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.fillStyle = '#C85A53';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(f.text, f.x, f.y);
        ctx.restore();
      });

      // Render Player Character & Woven Basket
      const pX = playerXRef.current;
      const pY = basketY;
      const activeImg = selectedBear === 'bubu' ? bubuImgRef.current : yierImgRef.current;

      ctx.save();
      // Draw authentic Bear sprite peering from behind the basket!
      if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
        const spriteW = 56;
        const spriteH = Math.round(spriteW * 1.35);
        ctx.drawImage(activeImg, pX + (BASKET_WIDTH - spriteW) / 2, pY - spriteH + 20, spriteW, spriteH);
      }

      // Draw Basket
      ctx.fillStyle = '#EADBC8';
      ctx.strokeStyle = '#4B2925';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(pX, pY + 12, BASKET_WIDTH, 26, 8);
      ctx.fill();
      ctx.stroke();

      // Basket weave lines
      ctx.strokeStyle = '#CBB69E';
      ctx.lineWidth = 1.5;
      for (let x = pX + 8; x < pX + BASKET_WIDTH; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, pY + 12);
        ctx.lineTo(x, pY + 38);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, timeLeft, selectedBear]);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    playerTargetXRef.current = Math.max(8, Math.min(CANVAS_WIDTH - BASKET_WIDTH - 8, touchX - BASKET_WIDTH / 2));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    playerTargetXRef.current = Math.max(8, Math.min(CANVAS_WIDTH - BASKET_WIDTH - 8, mouseX - BASKET_WIDTH / 2));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Top Navigation & Status */}
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
            <Heart className="w-4 h-4 fill-[#E85D56] text-[#E85D56]" />
            <span>得分:</span>
            <span className="font-mono tabular-nums text-sm text-[#C85A53]">{score}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>倒计时:</span>
            <span className={`font-mono tabular-nums text-sm ${timeLeft <= 5 ? 'text-[#DC3545] animate-pulse font-extrabold' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {gameState === 'PLAYING' ? (
          <button
            onClick={() => {
              sound.playPop();
              setGameState('PAUSED');
              if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            }}
            className="p-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] active:scale-95 cursor-pointer"
            title="暂停"
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : gameState === 'PAUSED' ? (
          <button
            onClick={() => {
              sound.playPop();
              setGameState('PLAYING');
              timerIntervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
              }, 1000);
            }}
            className="p-1.5 rounded-xl bg-[#DCA58D] text-white border border-[#4B2925]/20 active:scale-95 cursor-pointer"
            title="继续"
          >
            <Play className="w-4 h-4 fill-white" />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Game Stage Area */}
      <div
        className="relative w-full max-w-[360px] aspect-[360/460] rounded-3xl overflow-hidden border-4 border-[#4B2925]/25 shadow-md flex items-center justify-center bg-[#FBEAE7]"
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block"
        />

        {/* Start / Rules Overlay */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#F6C8C5] flex items-center justify-center text-3xl mb-2 shadow-inner">
              🧺
            </div>
            <h3 className="text-xl font-extrabold text-[#4B2925]">接住爱心 · 30秒考验</h3>
            <p className="text-xs text-[#8C6D62] mt-1.5 leading-relaxed px-4">
              天空中将飘落满满的爱心与小星星！左右滑动屏幕或使用键盘 A/D 键移动小熊的花篮，接住尽可能多的爱心！
            </p>

            {/* Select which Bear to play */}
            <div className="my-3 flex items-center gap-2">
              <span className="text-xs font-bold text-[#8C6D62]">出战小熊：</span>
              <button
                onClick={() => setSelectedBear('bubu')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  selectedBear === 'bubu'
                    ? 'bg-[#DCA58D] text-white border-[#4B2925] shadow-xs'
                    : 'bg-white text-[#8C6D62] border-[#4B2925]/20'
                }`}
              >
                <span>🤎 布布</span>
              </button>
              <button
                onClick={() => setSelectedBear('yier')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  selectedBear === 'yier'
                    ? 'bg-[#FFF9F3] text-[#4B2925] border-[#4B2925] shadow-xs font-extrabold'
                    : 'bg-white text-[#8C6D62] border-[#4B2925]/20'
                }`}
              >
                <span>🤍 一二</span>
              </button>
            </div>

            <div className="flex items-center gap-4 my-2 text-xs font-semibold text-[#4B2925]">
              <div className="flex items-center gap-1">💖 +1分</div>
              <div className="flex items-center gap-1">⭐ +3分</div>
            </div>

            <button
              onClick={startGame}
              className="w-48 py-3.5 rounded-2xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-extrabold text-sm border-2 border-[#4B2925] shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>开始挑战</span>
            </button>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20 text-white">
            <h4 className="text-xl font-extrabold mb-4">游戏已暂停</h4>
            <button
              onClick={() => {
                sound.playPop();
                setGameState('PLAYING');
                timerIntervalRef.current = window.setInterval(() => {
                  setTimeLeft(prev => {
                    if (prev <= 1) {
                      handleGameOver();
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#DCA58D] text-white font-bold text-sm border-2 border-white shadow-md active:scale-95 cursor-pointer mb-2"
            >
              继续游戏
            </button>
            <button
              onClick={startGame}
              className="text-xs font-bold text-white/80 hover:text-white underline cursor-pointer"
            >
              重新开始
            </button>
          </div>
        )}

        {/* Game Over Summary Modal */}
        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 animate-gentle-bounce">
            <div className="text-4xl mb-1">🎉</div>
            <h3 className="text-xl font-extrabold text-[#4B2925]">时间到！挑战结束！</h3>
            <p className="text-xs text-[#8C6D62] mt-0.5">
              {selectedBear === 'bubu' ? '布布' : '一二'}的小花篮已经被爱心装满啦！
            </p>

            <div className="my-4 p-4 w-full bg-[#FFF9F3] rounded-2xl border-2 border-[#4B2925]/20 text-center">
              <div className="text-[11px] font-bold text-[#8C6D62]">本局最终捕获积分</div>
              <div className="text-3xl font-extrabold text-[#C85A53] my-1 font-mono">
                {score} <span className="text-base">分</span>
              </div>
              <div className="text-[11px] font-semibold text-[#588157]">
                奖励结算：+{score >= 25 ? '30~38' : score >= 15 ? '22' : '15'} 🪙 · +30 💖
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <button
                onClick={startGame}
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
        )}
      </div>

      {/* On-screen Touch Controls for mobile */}
      <div className="w-full max-w-[360px] flex items-center justify-between gap-4 mt-3">
        <button
          onPointerDown={() => { keysDownRef.current.left = true; }}
          onPointerUp={() => { keysDownRef.current.left = false; }}
          onPointerLeave={() => { keysDownRef.current.left = false; }}
          className="flex-1 py-3 rounded-2xl bg-white border-2 border-[#4B2925]/20 shadow-xs active:bg-[#FBEAE7] text-base font-extrabold text-[#4B2925] flex items-center justify-center gap-1 cursor-pointer select-none"
        >
          <span>👈</span>
          <span className="text-xs">向左移</span>
        </button>

        <button
          onPointerDown={() => { keysDownRef.current.right = true; }}
          onPointerUp={() => { keysDownRef.current.right = false; }}
          onPointerLeave={() => { keysDownRef.current.right = false; }}
          className="flex-1 py-3 rounded-2xl bg-white border-2 border-[#4B2925]/20 shadow-xs active:bg-[#FBEAE7] text-base font-extrabold text-[#4B2925] flex items-center justify-center gap-1 cursor-pointer select-none"
        >
          <span className="text-xs">向右移</span>
          <span>👉</span>
        </button>
      </div>
    </div>
  );
};
