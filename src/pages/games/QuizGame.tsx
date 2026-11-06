import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { QUIZ_QUESTIONS, QUIZ_SYNTHESIS_RESULTS } from '../../data/quizQuestions';
import { ArrowLeft, Sparkles, Heart, Check, Share2, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const QuizGame: React.FC = () => {
  const { setPage, addCurrency, addAffection, addAlbumCard, recordTaskProgress } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<('A' | 'B')[]>([]);
  const [showingReaction, setShowingReaction] = useState<('A' | 'B') | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [resultProfile, setResultProfile] = useState<typeof QUIZ_SYNTHESIS_RESULTS[0] | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (option: 'A' | 'B') => {
    sound.playPop();
    setShowingReaction(option);

    const updatedAnswers = [...selectedAnswers, option];
    setSelectedAnswers(updatedAnswers);

    setTimeout(() => {
      setShowingReaction(null);
      if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Complete the quiz
        finishQuiz(updatedAnswers);
      }
    }, 1500);
  };

  const finishQuiz = (answers: ('A' | 'B')[]) => {
    sound.playMatchSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Determine result archetype
    const countA = answers.filter(a => a === 'A').length;
    let chosenResult = QUIZ_SYNTHESIS_RESULTS[0];
    if (countA >= 5) {
      chosenResult = QUIZ_SYNTHESIS_RESULTS[0]; // 心有灵犀型
    } else if (countA >= 3) {
      chosenResult = QUIZ_SYNTHESIS_RESULTS[1]; // 互补治愈型
    } else {
      chosenResult = QUIZ_SYNTHESIS_RESULTS[2]; // 浪漫冒险型
    }
    setResultProfile(chosenResult);
    setIsFinished(true);

    // Reward player per PRD: 35 coins + 50 affection
    addCurrency(35, '完成情侣默契问答');
    addAffection(50, '心有灵犀默契测试');
    recordTaskProgress('task_play_game');

    // Add memorial card to album
    addAlbumCard({
      title: `默契测试 · ${chosenResult.type}`,
      quote: chosenResult.quote,
      tag: 'quiz',
      characters: 'yier_bubu_together',
      decorBg: '#EBF4E7',
      description: chosenResult.desc
    });
  };

  const restartQuiz = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setShowingReaction(null);
    setIsFinished(false);
    setResultProfile(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-2 select-none">
      {/* Top Navigation Bar */}
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

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B2925]">
          <span>默契进度:</span>
          <span className="font-mono tabular-nums text-[#C85A53]">
            {isFinished ? '8/8' : `${currentIndex + 1}/8`}
          </span>
        </div>

        <button
          onClick={restartQuiz}
          title="重新测试"
          className="p-1.5 rounded-xl bg-white border border-[#4B2925]/20 text-[#4B2925] active:scale-95 transition-transform cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {!isFinished ? (
        // Active Question View
        <div className="w-full max-w-md flex flex-col items-center py-2 animate-gentle-bounce">
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#E8DACB] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#F6C8C5] to-[#DCA58D] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / 8) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="w-full bg-[#FFF9F3] border-3 border-[#4B2925]/20 rounded-3xl p-5 shadow-sm text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#DCA58D]/20 text-[#8C6D62] text-[11px] font-bold mb-2">
              第 {currentIndex + 1} 题 · {currentQ.subtitle}
            </span>
            <h3 className="text-lg font-extrabold text-[#4B2925] leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="w-full space-y-3 mt-4">
            {/* Option A */}
            <button
              disabled={showingReaction !== null}
              onClick={() => handleSelectOption('A')}
              className={`w-full p-4 rounded-2xl border-2 sm:border-3 text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                showingReaction === 'A'
                  ? 'bg-[#FBEAE7] border-[#C85A53] scale-[1.02] shadow-md'
                  : 'bg-white hover:bg-[#FFF9F3] border-[#4B2925]/15 hover:border-[#DCA58D] shadow-xs active:scale-98'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF3DB] border border-[#4B2925]/10 flex items-center justify-center text-xl shrink-0">
                {currentQ.optionA.icon}
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-[#8C6D62]">选项 A</div>
                <div className="text-sm font-bold text-[#4B2925] mt-0.5">
                  {currentQ.optionA.text}
                </div>
              </div>
            </button>

            {/* Option B */}
            <button
              disabled={showingReaction !== null}
              onClick={() => handleSelectOption('B')}
              className={`w-full p-4 rounded-2xl border-2 sm:border-3 text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                showingReaction === 'B'
                  ? 'bg-[#FBEAE7] border-[#C85A53] scale-[1.02] shadow-md'
                  : 'bg-white hover:bg-[#FFF9F3] border-[#4B2925]/15 hover:border-[#DCA58D] shadow-xs active:scale-98'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF3DB] border border-[#4B2925]/10 flex items-center justify-center text-xl shrink-0">
                {currentQ.optionB.icon}
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-[#8C6D62]">选项 B</div>
                <div className="text-sm font-bold text-[#4B2925] mt-0.5">
                  {currentQ.optionB.text}
                </div>
              </div>
            </button>
          </div>

          {/* Little Bears Reaction Bubble */}
          {showingReaction && (
            <div className="w-full mt-4 p-3.5 bg-white rounded-2xl border-2 border-[#4B2925]/15 shadow-sm animate-gentle-bounce space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <img src="/assets/characters/yier_front.png" alt="一二" className="w-7 h-9 object-contain shrink-0 drop-shadow-xs" />
                <div className="flex-1">
                  <span className="font-bold text-[#C85A53] text-[11px] block">一二心声：</span>
                  <p className="text-[#4B2925] font-medium leading-snug mt-0.5">
                    {showingReaction === 'A' ? currentQ.optionA.yierReaction : currentQ.optionB.yierReaction}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#4B2925]/10">
                <img src="/assets/characters/bubu_front.png" alt="布布" className="w-7 h-9 object-contain shrink-0 drop-shadow-xs" />
                <div className="flex-1">
                  <span className="font-bold text-[#B0703B] text-[11px] block">布布心声：</span>
                  <p className="text-[#4B2925] font-medium leading-snug mt-0.5">
                    {showingReaction === 'A' ? currentQ.optionA.bubuReaction : currentQ.optionB.bubuReaction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Results Summary Card
        <div className="w-full max-w-md flex flex-col items-center py-2 animate-gentle-bounce">
          <div className="w-full bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-6 shadow-md text-center relative overflow-hidden">
            {/* Header Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#F6C8C5]/40 text-[#C85A53] text-xs font-bold mb-2">
              {resultProfile?.badge}
            </div>

            <h3 className="text-xl font-extrabold text-[#4B2925]">
              {resultProfile?.title}
            </h3>

            {/* Bears in love */}
            <div className="flex items-center justify-center -space-x-4 my-2">
              <img src="/assets/characters/yier_front.png" alt="一二" className="w-16 h-20 object-contain drop-shadow-xs" />
              <img src="/assets/characters/bubu_front.png" alt="布布" className="w-16 h-20 object-contain drop-shadow-xs" />
            </div>

            {/* Quote Card */}
            <div className="my-3 p-4 rounded-2xl bg-white border-2 border-[#4B2925]/15 text-xs text-[#4B2925] leading-relaxed italic">
              “{resultProfile?.quote}”
            </div>

            <p className="text-xs text-[#8C6D62] leading-relaxed px-2">
              {resultProfile?.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-[#4B2925]/10 flex items-center justify-between text-xs font-bold text-[#C85A53]">
              <span>获得奖励：</span>
              <span>+35 爱心币 · +50 亲密度</span>
            </div>
          </div>

          <div className="w-full flex items-center gap-2 mt-4">
            <button
              onClick={restartQuiz}
              className="flex-1 py-3 rounded-xl bg-white text-[#4B2925] font-bold text-xs border-2 border-[#4B2925] active:scale-95 transition-transform cursor-pointer"
            >
              重新测试
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setPage('album');
              }}
              className="flex-1 py-3 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] active:scale-95 transition-transform cursor-pointer"
            >
              查看相册卡片
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
