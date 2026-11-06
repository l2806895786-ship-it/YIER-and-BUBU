import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterView } from '../components/character/CharacterView';
import { Sparkles, Heart, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const StartPage: React.FC = () => {
  const { setPage, saveData } = useGame();
  const [showIntro, setShowIntro] = useState(false);

  const handleStart = () => {
    sound.playPop();
    setPage('home');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#FFF9F3] via-[#FDF6EE] to-[#FBEAE7] overflow-hidden select-none">
      {/* Decorative Floating Background Shapes */}
      <div className="absolute top-12 -left-8 w-36 h-36 rounded-full bg-[#F6C8C5]/25 blur-xl pointer-events-none" />
      <div className="absolute bottom-24 -right-10 w-48 h-48 rounded-full bg-[#F6D58B]/30 blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 right-8 text-2xl animate-breathing pointer-events-none opacity-40">✨</div>
      <div className="absolute top-2/3 left-8 text-2xl animate-breathing pointer-events-none opacity-40" style={{ animationDelay: '1s' }}>🌸</div>

      {/* Top Header / Brand Lockup */}
      <header className="w-full max-w-md pt-4 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6C8C5]/30 text-[#C85A53] text-xs font-semibold tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#C85A53]" />
          <span>治愈系双熊休闲陪伴</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4B2925] mt-1 drop-shadow-xs">
          一二布布
        </h1>
        <p className="text-sm font-medium text-[#8C6D62] mt-1 tracking-wider">
          今天也在一起 · YI ER & BUBU
        </p>
      </header>

      {/* Centerpiece: Yi Er and Bubu swaying side by side */}
      <main className="w-full max-w-md my-auto flex flex-col items-center z-10">
        <div className="relative flex items-end justify-center -space-x-4 sm:space-x-2 py-4">
          {/* Yi Er (White bear) */}
          <div className="flex flex-col items-center animate-breathing">
            <CharacterView
              type="yier"
              size={175}
              expression="happy"
              pose="idle"
              outfits={saveData.equippedOutfits.yier}
            />
            <span className="text-xs font-bold text-[#4B2925] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#4B2925]/15 mt-1 shadow-xs">
              🤍 一二
            </span>
          </div>

          {/* Center Floating Sweet Heart */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-2xl animate-float-heart z-20 pointer-events-none">
            💕
          </div>

          {/* Bubu (Brown bear) */}
          <div className="flex flex-col items-center animate-breathing" style={{ animationDelay: '0.6s' }}>
            <CharacterView
              type="bubu"
              size={175}
              expression="wink"
              pose="idle"
              outfits={saveData.equippedOutfits.bubu}
            />
            <span className="text-xs font-bold text-[#4B2925] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#4B2925]/15 mt-1 shadow-xs">
              🤎 布布
            </span>
          </div>
        </div>

        {/* Start Game CTA */}
        <div className="w-full max-w-xs mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => {
              sound.playPop();
              setPage('showcase');
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#588157] hover:bg-[#487342] text-white font-extrabold text-base shadow-md border-3 border-[#4B2925] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🐻 角色形象独立验收台 (V2.0)</span>
          </button>

          <button
            onClick={handleStart}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-extrabold text-base shadow-md border-3 border-[#4B2925] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>进入小屋 · 开始游戏</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setShowIntro(!showIntro);
            }}
            className="text-xs font-medium text-[#8C6D62] hover:text-[#4B2925] flex items-center justify-center gap-1.5 py-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>关于一二与布布</span>
          </button>
        </div>
      </main>

      {/* About Drawer / Info Modal */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-5 shadow-2xl animate-gentle-bounce">
            <h3 className="text-lg font-bold text-[#4B2925] mb-2 text-center">
              🐾 认识两只可爱小熊
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#4B2925]">
              <div className="p-3 rounded-2xl bg-white border border-[#4B2925]/15">
                <span className="font-bold text-[#C85A53]">🤍 一二（白色小熊）：</span>
                <p className="text-[#8C6D62] mt-0.5">
                  拥有圆嘟嘟的白润脑袋、深棕色小圆耳、粉扑扑的腮红和精致的颈间小领结。性格温柔细腻，害羞时脸颊会变红。
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#4B2925]/15">
                <span className="font-bold text-[#B0703B]">🤎 布布（棕色小熊）：</span>
                <p className="text-[#8C6D62] mt-0.5">
                  全身是暖烘烘的奶茶棕色，耳朵有深色同心圆，脸颊是暖黄色的腮红，身后有一颗圆滚滚的小尾巴。活泼元气，最黏一二！
                </p>
              </div>

              {/* Mentioning user canonical reference photo */}
              <div className="p-2.5 rounded-xl bg-[#F6D58B]/20 border border-[#F6D58B] flex items-center gap-2">
                <span className="text-base">📸</span>
                <p className="text-[11px] text-[#7A531A]">
                  严格忠实还原用户上传的官方手绘设定图，支持换装、布置与纪念留影！
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                setShowIntro(false);
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#DCA58D] text-white font-bold text-xs border-2 border-[#4B2925] cursor-pointer"
            >
              我知道啦
            </button>
          </div>
        </div>
      )}

      {/* Footer Version & Tag */}
      <footer className="w-full max-w-md flex items-center justify-between text-[11px] text-[#A89F91] pt-2 z-10 border-t border-[#4B2925]/10">
        <span>治愈系休闲单机 · 本地自动保存</span>
        <span>Version 1.0</span>
      </footer>
    </div>
  );
};
