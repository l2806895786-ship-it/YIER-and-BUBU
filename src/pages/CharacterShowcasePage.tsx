import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterView } from '../components/character/CharacterView';
import { CharacterFacing, ExpressionType } from '../types/game';
import { Sparkles, CheckCircle2, Sliders, Eye, ArrowRight, ShieldCheck, Maximize2, Shirt } from 'lucide-react';
import { sound } from '../utils/audio';

export const CharacterShowcasePage: React.FC = () => {
  const { setPage } = useGame();

  const [bgMode, setBgMode] = useState<'checker' | 'cream' | 'white' | 'pink' | 'dark'>('checker');
  const [spriteSize, setSpriteSize] = useState<number>(180);
  const [activeExpression, setActiveExpression] = useState<ExpressionType>('normal');
  const [showOriginalArt, setShowOriginalArt] = useState(false);

  // Background style map
  const bgStyles = {
    checker: {
      backgroundImage: `linear-gradient(45deg, #e5e5e5 25%, transparent 25%), 
                        linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #e5e5e5 75%), 
                        linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)`,
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      backgroundColor: '#f8f8f8'
    },
    cream: { backgroundColor: '#FFF9F3' },
    white: { backgroundColor: '#FFFFFF' },
    pink: { backgroundColor: '#FBEAE7' },
    dark: { backgroundColor: '#2C2725' }
  };

  const expressions: { id: ExpressionType; label: string; icon: string }[] = [
    { id: 'normal', label: '原图标准', icon: '🐾' },
    { id: 'happy', label: '开心跳跃', icon: '✨' },
    { id: 'blink', label: '眨眼闭目', icon: '😴' },
    { id: 'blush', label: '害羞腮红', icon: '🌸' },
    { id: 'love', label: '心动喜欢', icon: '💖' }
  ];

  const handleCharClick = () => {
    sound.playPet();
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF3EB] text-[#4B2925] p-4 sm:p-6 pb-20 select-none">
      {/* Top Banner / Announcement */}
      <header className="max-w-4xl mx-auto mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCA58D]/25 text-[#8C6D62] text-xs font-bold mb-2">
          <ShieldCheck className="w-4 h-4 text-[#588157]" />
          <span>第一阶段验收 · 角色模型与原图 1:1 绝对一致性校准</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4B2925] tracking-tight">
          《一二布布》官方角色模型独立验收台
        </h1>
        <p className="text-xs sm:text-sm text-[#8C6D62] mt-1 max-w-xl mx-auto leading-relaxed">
          直接基于上传的原图 <span className="font-mono font-semibold">IMG_3850_61747c17.jpg</span> 逐帧拆分与高精透明通道化处理，彻底去除任何失真与自行设计的变形。
        </p>

        {/* Global Action Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          <button
            onClick={() => {
              sound.playPop();
              setShowOriginalArt(true);
            }}
            className="px-4 py-2 rounded-xl bg-white border-2 border-[#4B2925]/20 text-xs font-bold text-[#4B2925] hover:bg-[#FFF9F3] active:scale-95 transition-transform flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#C87961]" />
            <span>查看原始参考图对照</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setPage('home');
            }}
            className="px-5 py-2 rounded-xl bg-[#588157] hover:bg-[#487342] text-white text-xs font-bold border-2 border-[#4B2925] active:scale-95 transition-transform flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>形象确认无误 · 进入小屋与游戏</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Control Console (Background, Size, Expression) */}
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xs border-2 border-[#4B2925]/15 rounded-3xl p-4 sm:p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Background switcher */}
          <div>
            <label className="text-xs font-bold text-[#8C6D62] block mb-1.5">
              1. 底色透光检测（检验边缘无黑白杂边）
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'checker', label: '棋盘透明' },
                { id: 'cream', label: '奶油暖底' },
                { id: 'white', label: '纯白底' },
                { id: 'pink', label: '粉嫩底' },
                { id: 'dark', label: '深色底' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setBgMode(item.id as typeof bgMode)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                    bgMode === item.id
                      ? 'bg-[#4B2925] text-white border-[#4B2925]'
                      : 'bg-white text-[#8C6D62] border-[#4B2925]/20 hover:bg-[#FFF9F3]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#8C6D62] mb-1.5">
              <span>2. 局部放大微距观察</span>
              <span className="font-mono text-[#4B2925]">{spriteSize}px</span>
            </div>
            <input
              type="range"
              min="130"
              max="280"
              step="10"
              value={spriteSize}
              onChange={e => setSpriteSize(Number(e.target.value))}
              className="w-full accent-[#DCA58D] cursor-pointer"
            />
          </div>

          {/* Expression switch */}
          <div>
            <label className="text-xs font-bold text-[#8C6D62] block mb-1.5">
              3. 动态微表情与呼吸测试
            </label>
            <div className="flex flex-wrap items-center gap-1">
              {expressions.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExpression(exp.id)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                    activeExpression === exp.id
                      ? 'bg-[#DCA58D] text-white border-[#4B2925]'
                      : 'bg-white text-[#8C6D62] border-[#4B2925]/20 hover:bg-[#FFF9F3]'
                  }`}
                >
                  <span>{exp.icon}</span>
                  <span>{exp.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* ============================================================== */}
        {/* CHARACTER 1: 一二 (YI ER) - WHITE BEAR */}
        {/* ============================================================== */}
        <section className="bg-white rounded-3xl border-3 border-[#4B2925]/20 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-[#4B2925]/10 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-white border-2 border-[#4B2925] flex items-center justify-center text-sm shadow-xs">
                🤍
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-[#4B2925]">一二 (YI ER) · 白色小熊</h2>
                  <span className="text-[10px] font-bold bg-[#F6C8C5]/50 text-[#C85A53] px-2 py-0.5 rounded-full">
                    标准 4 视角素材
                  </span>
                </div>
                <p className="text-xs text-[#8C6D62] mt-0.5">
                  特征：纯白圆润头身 · 深棕色小圆耳 · 两个小圆点眼睛 · 极简波浪嘴 · 两侧圆粉腮红 · 颈间深棕色领结
                </p>
              </div>
            </div>
          </div>

          {/* 4 Viewports (Front, Back, Left, Right) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Front */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="front"
                  size={spriteSize * 0.78}
                  expression={activeExpression}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">一二 · 正面</span>
                <span className="text-[10px] text-[#8C6D62]">领结、波浪嘴与粉腮红</span>
              </div>
            </div>

            {/* 2. Back */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="back"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">一二 · 背面</span>
                <span className="text-[10px] text-[#8C6D62]">居中深棕圈圆圆小尾巴</span>
              </div>
            </div>

            {/* 3. Left Side */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="side_left"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">一二 · 左侧面</span>
                <span className="text-[10px] text-[#8C6D62]">侧向微翘小圆脸</span>
              </div>
            </div>

            {/* 4. Right Side */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="side_right"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">一二 · 右侧面</span>
                <span className="text-[10px] text-[#8C6D62]">右侧视角与小背部</span>
              </div>
            </div>
          </div>

          {/* Specifications Checklist */}
          <div className="mt-4 pt-3 border-t border-[#4B2925]/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#4B2925]">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>纯白圆润大头与短肢</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>深棕色实心耳朵</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>双圆点眼睛与极简嘴</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>颈间特征深棕领结</span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CHARACTER 2: 布布 (BUBU) - BROWN BEAR */}
        {/* ============================================================== */}
        <section className="bg-white rounded-3xl border-3 border-[#4B2925]/20 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-[#4B2925]/10 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#DCA58D] border-2 border-[#4B2925] flex items-center justify-center text-sm shadow-xs">
                🤎
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-[#4B2925]">布布 (BUBU) · 棕色小熊</h2>
                  <span className="text-[10px] font-bold bg-[#F6D58B]/50 text-[#8C6D62] px-2 py-0.5 rounded-full">
                    标准 4 视角素材
                  </span>
                </div>
                <p className="text-xs text-[#8C6D62] mt-0.5">
                  特征：浅奶茶棕色身体 · 圆形同心圆耳朵 · 两个小圆点眼睛 · 浅黄色圆形腮红 · 背面明显小圆尾巴
                </p>
              </div>
            </div>
          </div>

          {/* 4 Viewports (Front, Back, Left, Right) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Front */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="bubu"
                  facing="front"
                  size={spriteSize * 0.78}
                  expression={activeExpression}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">布布 · 正面</span>
                <span className="text-[10px] text-[#8C6D62]">奶茶毛色、黄色圆腮红</span>
              </div>
            </div>

            {/* 2. Back */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="bubu"
                  facing="back"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">布布 · 背面</span>
                <span className="text-[10px] text-[#8C6D62]">圆滚滚小尾巴与同心耳朵</span>
              </div>
            </div>

            {/* 3. Left Side */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="bubu"
                  facing="side_left"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">布布 · 左侧面</span>
                <span className="text-[10px] text-[#8C6D62]">侧望活泼可爱神态</span>
              </div>
            </div>

            {/* 4. Right Side */}
            <div className="flex flex-col items-center">
              <div
                className="w-full aspect-[3/4] rounded-2xl border-2 border-[#4B2925]/20 flex items-center justify-center p-2 relative overflow-hidden transition-all shadow-inner"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="bubu"
                  facing="side_right"
                  size={spriteSize * 0.78}
                  onClick={handleCharClick}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-extrabold text-[#4B2925] block">布布 · 右侧面</span>
                <span className="text-[10px] text-[#8C6D62]">对称平滑侧身模型</span>
              </div>
            </div>
          </div>

          {/* Specifications Checklist */}
          <div className="mt-4 pt-3 border-t border-[#4B2925]/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#4B2925]">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>浅奶茶棕色纯正质感</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>同心圆深色内耳</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>浅黄色标志性圆腮红</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
              <span>背面标志性圆润小尾巴</span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: 并肩站立互动测试 (PAIR STANDING DEMO) */}
        {/* ============================================================== */}
        <section className="bg-white rounded-3xl border-3 border-[#4B2925]/20 p-5 shadow-sm text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FBEAE7] text-[#C85A53] text-xs font-bold mb-2">
            💕 双熊站姿协同测试
          </div>
          <h3 className="text-base font-extrabold text-[#4B2925]">
            一二与布布并排站立效果
          </h3>
          <p className="text-xs text-[#8C6D62] mt-0.5">
            两只小熊比例、线条粗细与绘画风格完全统一，点击小熊可听到专属互动音效
          </p>

          <div
            className="w-full max-w-lg mx-auto aspect-[16/9] max-h-64 rounded-2xl border-2 border-[#4B2925]/20 my-4 flex items-end justify-center gap-4 pb-4 overflow-hidden shadow-inner"
            style={bgStyles[bgMode]}
          >
            <CharacterView
              type="yier"
              facing="front"
              size={135}
              expression={activeExpression}
              onClick={handleCharClick}
            />
            <CharacterView
              type="bubu"
              facing="front"
              size={135}
              expression={activeExpression}
              onClick={handleCharClick}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                setPage('home');
              }}
              className="py-3 px-8 rounded-2xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-extrabold text-sm border-2 border-[#4B2925] shadow-md active:scale-95 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>角色已验收，开启游戏世界</span>
            </button>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: V3.1 服装分层系统重点验收 (3套实装示范展示) */}
        {/* ============================================================== */}
        <section className="bg-white rounded-3xl border-3 border-[#4B2925]/20 p-5 shadow-sm text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EBF4E7] text-[#487342] text-xs font-bold mb-2">
            👗 V3.1 真实服装分层叠加测试
          </div>
          <h3 className="text-base font-extrabold text-[#4B2925]">
            一二分别穿着三套完整服装效果展示
          </h3>
          <p className="text-xs text-[#8C6D62] mt-0.5 max-w-xl mx-auto leading-relaxed">
            彻底去除文字标签占位，衣身、袖子、领口、衣摆、发卡、围巾与鞋子均采用独立透明2D素材分层覆盖，保留小熊圆润脸庞与身体轮廓。
          </p>

          {/* 3 Outfits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-4">
            {/* Outfit 1: 暖阳小熊毛衣套装 (重点测试) */}
            <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#4B2925]/20 p-3 shadow-xs flex flex-col items-center">
              <span className="text-[11px] font-black text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full mb-1">
                测试重点 · 暖阳毛衣套装
              </span>
              <div
                className="w-full aspect-[3/4] max-h-52 rounded-xl border border-[#4B2925]/15 flex items-center justify-center p-2 relative overflow-hidden"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="front"
                  size={140}
                  expression="happy"
                  outfits={{
                    hat: 'hat_daisy',
                    top: 'top_bear_sweater',
                    bottom: 'bottom_overalls',
                    shoes: 'shoes_boots'
                  }}
                />
              </div>
              <div className="mt-2 text-left w-full text-[11px] text-[#4B2925] space-y-0.5">
                <div className="font-bold text-xs text-[#78350F]">暖阳学院风</div>
                <div className="text-[10px] text-[#8C6D62]">🌼 向阳小雏菊发卡</div>
                <div className="text-[10px] text-[#D97706] font-bold">🤎 暖阳小熊软萌毛衣 (衣身+双袖+领口+小熊绣花)</div>
                <div className="text-[10px] text-[#8C6D62]">👖 经典牛仔背带裤</div>
                <div className="text-[10px] text-[#8C6D62]">👢 暖黄色小雨靴</div>
              </div>
            </div>

            {/* Outfit 2: 草莓画家套装 */}
            <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#4B2925]/20 p-3 shadow-xs flex flex-col items-center">
              <span className="text-[11px] font-black text-[#BE185D] bg-[#FCE7F3] px-2.5 py-0.5 rounded-full mb-1">
                元气夏日 · 草莓画家装
              </span>
              <div
                className="w-full aspect-[3/4] max-h-52 rounded-xl border border-[#4B2925]/15 flex items-center justify-center p-2 relative overflow-hidden"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="front"
                  size={140}
                  expression="happy"
                  outfits={{
                    hat: 'hat_beret',
                    top: 'top_cherry_tshirt',
                    bottom: 'bottom_khaki',
                    accessory: 'acc_wand'
                  }}
                />
              </div>
              <div className="mt-2 text-left w-full text-[11px] text-[#4B2925] space-y-0.5">
                <div className="font-bold text-xs text-[#BE185D]">草莓画家风</div>
                <div className="text-[10px] text-[#8C6D62]">🍓 草莓波波画家帽</div>
                <div className="text-[10px] text-[#8C6D62]">🍒 甜心樱桃纯白短袖</div>
                <div className="text-[10px] text-[#8C6D62]">🩳 奶茶色休闲小短裤</div>
                <div className="text-[10px] text-[#8C6D62]">🪄 心动爱心魔法手杖</div>
              </div>
            </div>

            {/* Outfit 3: 英伦暖冬大衣套装 */}
            <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#4B2925]/20 p-3 shadow-xs flex flex-col items-center">
              <span className="text-[11px] font-black text-[#991B1B] bg-[#FEE2E2] px-2.5 py-0.5 rounded-full mb-1">
                温暖秋冬 · 英伦大衣装
              </span>
              <div
                className="w-full aspect-[3/4] max-h-52 rounded-xl border border-[#4B2925]/15 flex items-center justify-center p-2 relative overflow-hidden"
                style={bgStyles[bgMode]}
              >
                <CharacterView
                  type="yier"
                  facing="front"
                  size={140}
                  expression="happy"
                  outfits={{
                    hat: 'hat_knit',
                    scarf: 'scarf_red',
                    coat: 'coat_duffle',
                    shoes: 'shoes_sneakers'
                  }}
                />
              </div>
              <div className="mt-2 text-left w-full text-[11px] text-[#4B2925] space-y-0.5">
                <div className="font-bold text-xs text-[#991B1B]">英伦暖冬风</div>
                <div className="text-[10px] text-[#8C6D62]">🧶 焦糖毛球暖冬针织帽</div>
                <div className="text-[10px] text-[#8C6D62]">🧣 温暖粗棒针圣诞红围巾</div>
                <div className="text-[10px] text-[#8C6D62]">🧥 牛角扣学院风大衣</div>
                <div className="text-[10px] text-[#8C6D62]">👟 经典红白帆布板鞋</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() => {
                sound.playPop();
                setPage('dressup');
              }}
              className="py-2.5 px-6 rounded-2xl bg-[#C85A53] hover:bg-[#b04b45] text-white font-extrabold text-xs border border-[#4B2925]/20 shadow-xs active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
            >
              <Shirt className="w-4 h-4" />
              <span>进入试衣商城体验自由试穿 & 购买</span>
            </button>
          </div>
        </section>
      </div>

      {/* Modal: View Raw Master Reference Image */}
      {showOriginalArt && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9F3] border-3 border-[#4B2925] rounded-3xl p-5 shadow-2xl animate-gentle-bounce flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#4B2925]/15">
              <span className="font-extrabold text-xs text-[#4B2925]">
                用户上传的原始参考图 (IMG_3850_61747c17.jpg)
              </span>
              <button
                onClick={() => setShowOriginalArt(false)}
                className="w-7 h-7 rounded-full bg-white border border-[#4B2925]/20 flex items-center justify-center text-xs font-bold text-[#4B2925] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-[70vh] overflow-y-auto rounded-2xl border-2 border-[#4B2925]/20 bg-white p-2">
              <img
                src="/assets/aistudio/IMG_3850_61747c17.jpg"
                alt="一二与布布原始参考图"
                className="w-full rounded-xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-[11px] text-[#8C6D62] text-center mt-2 leading-relaxed">
              当前展示的一二与布布全部正面、背面、侧面素材，均精确裁剪并提取自此原图！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
