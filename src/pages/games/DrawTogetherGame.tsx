import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Palette, Eraser, CheckCircle2, Sparkles, Heart } from 'lucide-react';

interface PromptItem {
  id: string;
  name: string;
  hint: string;
  bubuGuess: string;
  yierGuess: string;
}

const DRAW_PROMPTS: PromptItem[] = [
  {
    id: 'strawberry',
    name: '草莓甜心',
    hint: '画一颗红红的、带着绿色叶子的小草莓~',
    bubuGuess: '哇！这红扑扑的一定是超级甜的大草莓！我的口水都要流出来啦~ 🍓',
    yierGuess: '一笔一画都好用心，看起来就像从甜品森林里刚摘下来一样诱人！'
  },
  {
    id: 'heart_balloon',
    name: '爱心气球',
    hint: '画一个绑着飘逸细绳的粉红爱心气球~',
    bubuGuess: '是一起牵着到处跑的爱心气球！我们要抓紧不要让它飞走哦~ 🎈',
    yierGuess: '粉嫩嫩的心意飘在空中，就像我们每天在一起的快乐心情！'
  },
  {
    id: 'boba_tea',
    name: '波霸奶茶',
    hint: '画一杯装着黑色珍珠和吸管的温热奶茶~',
    bubuGuess: '是半糖加双份珍珠的奶茶！喝一口整只小熊都要融化在幸福里~ 🧋',
    yierGuess: '杯子里满满都是甜蜜，插上两根吸管我们一起分着喝！'
  },
  {
    id: 'sunflower',
    name: '向日葵花',
    hint: '画一朵金黄色花瓣、大圆花盘的向日葵~',
    bubuGuess: '金灿灿的向日葵！就像一二每天早上笑眯眯叫我起床的样子~ 🌻',
    yierGuess: '迎着阳光绽放的花朵，把整个小木屋都照得好亮好暖！'
  },
  {
    id: 'fish_snack',
    name: '香脆小鱼干',
    hint: '画一条可爱弯弯的小鱼饼干或小鱼干~',
    bubuGuess: '嗅嗅...是香香脆脆的小鱼干！布布要藏在口袋里当下午茶~ 🐟',
    yierGuess: '小鱼在纸上游来游去，笔触真是太生动了，一百分！'
  },
  {
    id: 'rainbow',
    name: '幸福彩虹桥',
    hint: '画一条横跨天际、色彩斑斓的弧形彩虹~',
    bubuGuess: '下过雨后出现的七彩桥！踩在上面肯定像棉花糖一样软乎乎~ 🌈',
    yierGuess: '美丽的彩虹连接着我们的梦境，无论晴天雨天我们都在一起！'
  }
];

const COLORS = [
  '#4B2925', // 深棕
  '#EF4444', // 鲜红
  '#F472B6', // 柔粉
  '#F59E0B', // 暖橙金
  '#10B981', // 翡翠绿
  '#3B82F6', // 晴空蓝
  '#8B5CF6', // 梦幻紫
  '#FFFFFF'  // 橡皮白/白色
];

export const DrawTogetherGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [promptIndex, setPromptIndex] = useState(0);
  const [color, setColor] = useState('#4B2925');
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPrompt = DRAW_PROMPTS[promptIndex];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoordinates(e);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = useCallback(() => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsRevealed(false);
  }, []);

  const changePrompt = () => {
    sound.playPop();
    setPromptIndex((prev) => (prev + 1) % DRAW_PROMPTS.length);
    clearCanvas();
  };

  const handleGuess = () => {
    if (!hasDrawn || isRevealed) return;
    sound.playWin();
    setIsRevealed(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    const rewardCoins = 35;
    const rewardAffection = 25;
    addCurrency(rewardCoins, '一起画画默契猜猜大成功');
    addAffection(rewardAffection, '心有灵犀共创画作');
    recordTaskProgress('task_minigame');

    // Save snapshot to album
    const canvas = canvasRef.current;
    if (canvas) {
      addAlbumCard({
        title: `心有灵犀画【${currentPrompt.name}】`,
        quote: currentPrompt.bubuGuess,
        tag: 'draw',
        characters: 'both',
        decorBg: '#FFF5EC',
        description: `一二和布布一眼就猜出了画的是《${currentPrompt.name}》，亲密度大幅提升！`
      });
    }
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] font-bold text-xs hover:bg-[#FBEAE7] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回大厅</span>
        </button>

        <div className="flex items-center gap-1.5 text-sm font-black text-[#4B2925]">
          <Palette className="w-4 h-4 text-[#C85A53]" />
          <span>一起画画 · 默契猜猜</span>
        </div>

        <button
          onClick={changePrompt}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] text-xs font-bold hover:bg-[#FAF3EB] cursor-pointer"
          title="换一个题目"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#8C6D62]" />
          <span>换题</span>
        </button>
      </div>

      {/* Prompt Banner */}
      <div className="w-full bg-[#FFF9F3] border-2 border-[#DCA58D] rounded-2xl p-3 mb-2.5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#C85A53] text-white">
              今日命题
            </span>
            <span className="font-black text-[#4B2925] text-sm">
              {currentPrompt.name}
            </span>
          </div>
          <div className="text-[11px] text-[#8C6D62] mt-0.5">
            {currentPrompt.hint}
          </div>
        </div>

        <button
          onClick={changePrompt}
          className="text-[11px] font-bold text-[#C85A53] hover:underline cursor-pointer"
        >
          换一个题目 →
        </button>
      </div>

      {/* Canvas Area */}
      <div className="w-full aspect-square max-h-[340px] bg-white rounded-3xl border-3 border-[#4B2925]/25 shadow-md overflow-hidden relative touch-none flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair block"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4">
            <Sparkles className="w-7 h-7 text-[#DCA58D] animate-bounce mb-1" />
            <p className="text-xs font-bold text-[#8C6D62]">
              在画布上描绘你心中最可爱的【{currentPrompt.name}】吧！
            </p>
            <p className="text-[10px] text-[#A89085] mt-0.5">
              支持触控与鼠标画线
            </p>
          </div>
        )}
      </div>

      {/* Palette & Tools Toolbar */}
      <div className="w-full bg-white/95 rounded-2xl border-2 border-[#4B2925]/15 p-2 mt-2.5 shadow-xs flex flex-col gap-2">
        {/* Colors Row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  sound.playPop();
                  setColor(c);
                  setIsEraser(false);
                }}
                style={{ backgroundColor: c }}
                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                  !isEraser && color === c
                    ? 'border-[#4B2925] scale-120 shadow-xs ring-2 ring-[#DCA58D]'
                    : 'border-[#4B2925]/20 hover:scale-110'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sound.playPop();
                setIsEraser((prev) => !prev);
              }}
              className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                isEraser
                  ? 'bg-[#C85A53] text-white border-[#C85A53]'
                  : 'bg-[#FAF3EB] text-[#4B2925] border-[#4B2925]/20 hover:bg-[#FBEAE7]'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">橡皮</span>
            </button>

            <button
              onClick={clearCanvas}
              className="p-1.5 rounded-xl bg-[#FAF3EB] border border-[#4B2925]/20 text-[#8C6D62] text-xs font-bold hover:bg-[#FBEAE7] hover:text-[#4B2925] cursor-pointer"
              title="清空画板"
            >
              清空
            </button>
          </div>
        </div>

        {/* Brush Size Adjustment */}
        <div className="flex items-center justify-between px-2 pt-1 border-t border-[#4B2925]/10 text-xs">
          <span className="text-[#8C6D62] font-semibold text-[11px]">笔触粗细:</span>
          <div className="flex items-center gap-2">
            {[3, 6, 12].map((size) => (
              <button
                key={size}
                onClick={() => {
                  sound.playPop();
                  setBrushSize(size);
                }}
                className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                  brushSize === size
                    ? 'bg-[#4B2925] text-white font-bold'
                    : 'bg-[#FAF3EB] text-[#8C6D62] hover:bg-[#F2E6D9]'
                }`}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: size, height: size }}
                />
              </button>
            ))}
          </div>

          {/* Submit Guess Button */}
          <button
            onClick={handleGuess}
            disabled={!hasDrawn}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              hasDrawn
                ? 'bg-gradient-to-r from-[#DCA58D] to-[#C85A53] text-white hover:brightness-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>让布布一二猜猜！</span>
          </button>
        </div>
      </div>

      {/* Bears' Interactive Guessing Reactions */}
      {isRevealed && (
        <div className="w-full mt-3 bg-gradient-to-b from-[#FFF5EC] to-[#FFF9F3] border-2 border-[#DCA58D] rounded-3xl p-3 shadow-md animate-fadeIn flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#4B2925]/15">
            <div className="flex items-center gap-1 text-[#C85A53] font-black text-xs">
              <Sparkles className="w-4 h-4" />
              <span>猜中啦！心有灵犀大默契 ✨</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-[#588157]">
              <span>🪙 +35</span>
              <span>💖 +25</span>
            </div>
          </div>

          {/* Bubu reaction */}
          <div className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-[#4B2925]/10">
            <img
              src="/assets/characters/bubu_front.png"
              alt="布布"
              className="w-10 h-10 object-contain drop-shadow-xs shrink-0"
            />
            <div className="flex-1">
              <div className="text-[11px] font-black text-[#8C6D62] flex items-center gap-1">
                <span>布布 (小棕熊)</span>
                <Heart className="w-3 h-3 text-[#C85A53] fill-[#C85A53]" />
              </div>
              <p className="text-xs text-[#4B2925] mt-0.5 leading-relaxed font-medium">
                {currentPrompt.bubuGuess}
              </p>
            </div>
          </div>

          {/* Yi Er reaction */}
          <div className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-[#4B2925]/10">
            <img
              src="/assets/characters/yier_front.png"
              alt="一二"
              className="w-10 h-10 object-contain drop-shadow-xs shrink-0"
            />
            <div className="flex-1">
              <div className="text-[11px] font-black text-[#8C6D62] flex items-center gap-1">
                <span>一二 (小白熊)</span>
                <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              </div>
              <p className="text-xs text-[#4B2925] mt-0.5 leading-relaxed font-medium">
                {currentPrompt.yierGuess}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={changePrompt}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] text-xs font-bold hover:bg-[#FAF3EB] cursor-pointer"
            >
              再画一张
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setPage('album');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#588157] text-white text-xs font-bold hover:bg-[#466a45] cursor-pointer shadow-xs"
            >
              查看相册纪念
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
