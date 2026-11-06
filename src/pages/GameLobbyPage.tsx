import React from 'react';
import { useGame } from '../context/GameContext';
import { PageId } from '../types/game';
import { Sparkles, Trophy, Play, Heart, Layers, MessageCircleHeart, Users, Cake, Palette, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

export const GameLobbyPage: React.FC = () => {
  const { setPage, saveData } = useGame();

  const handleStartGame = (page: PageId) => {
    sound.playPop();
    setPage(page);
  };

  const games = [
    {
      id: 'memory' as PageId,
      title: '翻牌记忆 · 甜蜜成对日常',
      category: '经典益智 · 3种难度',
      icon: Layers,
      emoji: '🃏',
      bgColor: 'bg-[#FFF3DB]',
      desc: '支持 2x3(简单)、3x4(普通)、4x4(困难) 三种难度，翻转手绘卡牌寻找相同的一二与布布，连击得分翻倍！',
      rewards: '奖励：20 ~ 50 🪙 + 亲密度',
      record: saveData.statistics.memoryWins > 0
        ? `通关 ${saveData.statistics.memoryWins} 次 · 最少步数: ${saveData.statistics.memoryBestFlips || 12}步`
        : '三种难度随心选 · 快来挑战吧！'
    },
    {
      id: 'collector' as PageId,
      title: '一起收集爱心 · 双熊同心合作',
      category: '双人合作 · 60秒同屏',
      icon: Users,
      emoji: '💞',
      bgColor: 'bg-[#FBEAE7]',
      desc: '一二与布布牵手同步奔跑，60秒内避开滚石障碍，收集金色大爱心与加速星星，考验两人同频默契！',
      rewards: '奖励：30 ~ 70 🪙 + 40 💖',
      record: saveData.statistics.collectorWins > 0
        ? `累计携手丰收 ${saveData.statistics.collectorWins} 次`
        : '全新双熊同屏玩法 · 点击启程'
    },
    {
      id: 'catch_bear' as PageId,
      title: '接住布布 · 蹦床救援行动',
      category: '敏捷救援 · 35秒急救',
      icon: ShieldAlert,
      emoji: '🧸',
      bgColor: 'bg-[#EBF4E7]',
      desc: '布布从高空蹦床掉落啦！控制一二手举软绵绵爱心垫左右接住布布，连续稳稳接住触发亲密熊抱！',
      rewards: '奖励：25 ~ 55 🪙 + 亲密度',
      record: saveData.statistics.catchBearWins > 0
        ? `成功营救 ${saveData.statistics.catchBearWins} 次`
        : '不要让软萌小棕熊着地哦！'
    },
    {
      id: 'puzzle' as PageId,
      title: '甜蜜拼图 · 还原心动瞬间',
      category: '拼图益智 · 3x3 / 4x4',
      icon: Heart,
      emoji: '🧩',
      bgColor: 'bg-[#F3E8FF]',
      desc: '滑动拼图块还原一二与布布相遇相伴的经典画面，内置原图对照与计时器，通关解锁专属相册相片！',
      rewards: '奖励：35 🪙 + 30 💖 + 专属相片',
      record: saveData.statistics.puzzleWins > 0
        ? `成功拼合 ${saveData.statistics.puzzleWins} 幅温馨画卷`
        : '静心治愈 · 拼凑甜蜜记忆'
    },
    {
      id: 'cake' as PageId,
      title: '甜蜜烘焙 · DIY草莓小蛋糕',
      category: '生活手工 · 4步烘焙',
      icon: Cake,
      emoji: '🎂',
      bgColor: 'bg-[#FFF1F2]',
      desc: '从挑选蛋糕胚、涂抹双色奶油、铺满新鲜草莓与水果，到插上爱心糖果蜡烛，最后两只小熊快乐分吃！',
      rewards: '奖励：30 🪙 + 25 💖 + 甜蜜大餐',
      record: saveData.statistics.cakeBaked > 0
        ? `烘焙了 ${saveData.statistics.cakeBaked} 个爱心蛋糕`
        : '为今天烤一个香甜小蛋糕吧'
    },
    {
      id: 'draw' as PageId,
      title: '一起画画 · 默契猜猜看',
      category: '画板互动 · 创意表达',
      icon: Palette,
      emoji: '🎨',
      bgColor: 'bg-[#FEF9C3]',
      desc: '在专属白板上挥毫作画，8色调色盘自由描绘今日命题，让一二和布布来猜，看看谁最懂你的笔触！',
      rewards: '奖励：35 🪙 + 25 💖 + 留存相册',
      record: saveData.statistics.drawWins > 0
        ? `创作了 ${saveData.statistics.drawWins} 幅心动画作`
        : '拿起画笔，画出你眼中的甜蜜'
    },
    {
      id: 'quiz' as PageId,
      title: '情侣默契问答 · 8道心灵默契题',
      category: '情感共鸣 · 深度测试',
      icon: MessageCircleHeart,
      emoji: '💭',
      bgColor: 'bg-[#E0F2FE]',
      desc: '8 道关于旅行、约会习惯、暖心安慰与浪漫未来的选择题，测测两只小熊同频心跳指数！',
      rewards: '奖励：35 🪙 + 50 💖 + 契合卡片',
      record: saveData.statistics.quizCompleted > 0
        ? `已完成 ${saveData.statistics.quizCompleted} 次默契答题`
        : '探索彼此内心的温柔想法'
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 pb-24 pt-1 select-none">
      {/* Header Banner */}
      <div className="w-full text-center py-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6C8C5]/30 text-[#C85A53] text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>休闲小游戏合集 V3.0</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#4B2925]">
          和小熊一起玩耍吧
        </h2>
        <p className="text-xs text-[#8C6D62] mt-0.5">
          7款完全可操作的双人治愈小游戏，赢取爱心币与亲密度
        </p>
      </div>

      {/* Game Cards List */}
      <div className="w-full space-y-3">
        {games.map((game) => {
          return (
            <div
              key={game.id}
              className={`w-full rounded-3xl p-3.5 border-3 border-[#4B2925]/20 shadow-xs ${game.bgColor} flex flex-col justify-between transition-transform duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/90 border-2 border-[#4B2925]/15 flex items-center justify-center text-2xl shadow-xs shrink-0">
                  {game.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#8C6D62] bg-white/70 px-2 py-0.5 rounded-full">
                      {game.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#4B2925] mt-1">
                    {game.title}
                  </h3>
                  <p className="text-xs text-[#6B4E47] leading-relaxed mt-1">
                    {game.desc}
                  </p>
                </div>
              </div>

              {/* Record & CTA Bar */}
              <div className="mt-3 pt-2.5 border-t border-[#4B2925]/10 flex items-center justify-between gap-2">
                <div className="flex flex-col text-[11px] text-[#8C6D62]">
                  <span className="font-medium text-[#C85A53]">{game.rewards}</span>
                  <span className="text-[10px] text-[#A89F91] flex items-center gap-1 mt-0.5">
                    <Trophy className="w-3 h-3 text-[#DCA58D]" />
                    {game.record}
                  </span>
                </div>

                <button
                  onClick={() => handleStartGame(game.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#DCA58D] hover:bg-[#C88D74] text-white font-bold text-xs border-2 border-[#4B2925] shadow-xs active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>开始游玩</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
