import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowLeft, RotateCcw, Timer, Eye, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface PuzzlePiece {
  id: number;
  currentPos: number;
  correctPos: number;
}

export const CouplePuzzleGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const totalPieces = gridSize * gridSize;

  // Initialize and shuffle
  const initPuzzle = (size: 3 | 4 = gridSize) => {
    sound.playPop();
    const count = size * size;
    const initial: PuzzlePiece[] = [];

    // Create sorted positions
    const positions = Array.from({ length: count }, (_, i) => i);
    // Shuffle positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    for (let i = 0; i < count; i++) {
      initial.push({
        id: i,
        correctPos: i,
        currentPos: positions[i]
      });
    }

    setPieces(initial);
    setSelectedPiece(null);
    setMoves(0);
    setSeconds(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    initPuzzle(gridSize);
  }, [gridSize]);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  // Handle piece click (click two pieces to swap)
  const handlePieceClick = (pieceId: number) => {
    if (isCompleted) return;
    sound.playPop();

    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else {
      if (selectedPiece === pieceId) {
        setSelectedPiece(null);
        return;
      }

      // Swap positions of selectedPiece and pieceId
      const newPieces = pieces.map(p => {
        if (p.id === selectedPiece) {
          const target = pieces.find(x => x.id === pieceId);
          return { ...p, currentPos: target ? target.currentPos : p.currentPos };
        }
        if (p.id === pieceId) {
          const src = pieces.find(x => x.id === selectedPiece);
          return { ...p, currentPos: src ? src.currentPos : p.currentPos };
        }
        return p;
      });

      setPieces(newPieces);
      setSelectedPiece(null);
      setMoves(m => m + 1);

      // Check win
      const won = newPieces.every(p => p.currentPos === p.correctPos);
      if (won) {
        handleWin();
      }
    }
  };

  const handleWin = () => {
    setIsCompleted(true);
    sound.playMatchSuccess();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    const coins = gridSize === 3 ? 30 : 50;
    const affection = gridSize === 3 ? 40 : 65;

    addCurrency(coins, `双人拼图[${gridSize}×${gridSize}]通关`);
    addAffection(affection, '双熊拼图大圆满');
    recordTaskProgress('task_play_game');

    addAlbumCard({
      title: `双熊专属插画拼图 (${gridSize}×${gridSize})`,
      quote: `用了 ${moves + 1} 步拼接完成！完整的爱意就像拼好的每一块记忆。`,
      tag: 'puzzle',
      characters: 'yier_bubu_together',
      decorBg: '#FFF9F3',
      description: '一二与布布合影插画拼图大圆满。'
    });
  };

  // Sort pieces by current position for display
  const displayGrid = Array.from({ length: totalPieces }, (_, pos) => {
    return pieces.find(p => p.currentPos === pos);
  });

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

        <div className="flex items-center gap-3 text-xs font-bold text-[#4B2925]">
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-[#C87961]" />
            <span className="font-mono tabular-nums">{seconds}s</span>
          </div>
          <div>步数: <span className="font-mono">{moves}</span></div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] active:scale-95 cursor-pointer"
            title="原图预览"
          >
            <Eye className="w-4 h-4 text-[#8C6D62]" />
          </button>
          <button
            onClick={() => initPuzzle(gridSize)}
            className="p-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] active:scale-95 cursor-pointer"
            title="重新洗牌"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Difficulty Switch */}
      <div className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#F2E6D9] p-1 rounded-2xl mb-3">
        <button
          onClick={() => setGridSize(3)}
          className={`flex-1 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            gridSize === 3 ? 'bg-white text-[#4B2925] shadow-xs' : 'text-[#8C6D62]'
          }`}
        >
          简单 (3×3)
        </button>
        <button
          onClick={() => setGridSize(4)}
          className={`flex-1 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            gridSize === 4 ? 'bg-white text-[#4B2925] shadow-xs' : 'text-[#8C6D62]'
          }`}
        >
          进阶 (4×4)
        </button>
      </div>

      {/* Puzzle Board (320px x 320px) */}
      <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden border-4 border-[#4B2925]/30 shadow-md bg-white">
        {/* Full Image background slices */}
        <div
          className="w-full h-full grid gap-1 p-1 bg-[#E8DACB]"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {displayGrid.map((piece, pos) => {
            if (!piece) return <div key={pos} />;

            const isSelected = selectedPiece === piece.id;
            const isCorrect = piece.currentPos === piece.correctPos;

            // Background offset for the puzzle image slice
            const col = piece.correctPos % gridSize;
            const row = Math.floor(piece.correctPos / gridSize);
            const xPercent = (col / (gridSize - 1)) * 100;
            const yPercent = (row / (gridSize - 1)) * 100;

            return (
              <div
                key={pos}
                onClick={() => handlePieceClick(piece.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-4 ring-rose-500 scale-95 shadow-lg z-10'
                    : 'hover:brightness-105 active:scale-95'
                }`}
                style={{
                  backgroundImage: `url('/assets/aistudio/IMG_3850_61747c17.jpg')`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${xPercent}% ${yPercent}%`
                }}
              >
                {/* Number hint */}
                <span className="absolute top-1 left-1.5 text-[9px] font-bold text-white bg-black/40 px-1 rounded-sm font-mono">
                  {piece.correctPos + 1}
                </span>
                {isCorrect && isCompleted && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute bottom-1 right-1 bg-white rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Thumbnail Preview Overlay */}
        {showPreview && (
          <div
            onClick={() => setShowPreview(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20 cursor-pointer"
          >
            <div className="w-56 h-56 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
              <img
                src="/assets/aistudio/IMG_3850_61747c17.jpg"
                alt="原图参考"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white text-xs font-bold mt-2">点击任意处返回拼图</span>
          </div>
        )}

        {/* Victory Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-5 text-center z-20 animate-gentle-bounce">
            <span className="text-4xl mb-1">🧩🎉</span>
            <h3 className="text-lg font-extrabold text-[#4B2925]">拼图大成功！</h3>
            <p className="text-xs text-[#8C6D62] mt-0.5">完美的拼图见证了一二与布布的默契！</p>
            <div className="my-3 p-3 bg-[#FFF9F3] rounded-2xl border-2 border-[#4B2925]/15 w-full text-xs">
              <div>用时：<span className="font-mono font-bold">{seconds}s</span> · 步数：<span className="font-mono font-bold">{moves}步</span></div>
              <div className="text-rose-600 font-bold mt-1">
                获得奖励：+{gridSize === 3 ? '30' : '50'} 🪙 · +{gridSize === 3 ? '40' : '65'} 💖
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => initPuzzle(gridSize)}
                className="flex-1 py-2.5 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
              >
                再拼一次
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

      <div className="text-[11px] text-[#8C6D62] mt-3">
        💡 提示：点击两张碎片即可互换位置，将图片完整拼接起来！
      </div>
    </div>
  );
};
