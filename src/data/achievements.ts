import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first_meet',
    title: '初次见面',
    description: '踏入一二与布布的小世界',
    rewardCoins: 20,
    rewardAffection: 30,
    unlocked: true, // Automatically unlocked on first visit
    claimed: false,
    icon: '🐾'
  },
  {
    id: 'ach_first_touch',
    title: '第一次互动',
    description: '轻触抚摸小熊，感受软萌体温',
    rewardCoins: 15,
    rewardAffection: 20,
    unlocked: false,
    claimed: false,
    icon: '👋'
  },
  {
    id: 'ach_first_hug',
    title: '暖洋洋的熊抱',
    description: '让一二与布布紧紧相拥',
    rewardCoins: 20,
    rewardAffection: 35,
    unlocked: false,
    claimed: false,
    icon: '🫂'
  },
  {
    id: 'ach_memory_master',
    title: '记忆大师',
    description: '顺利通关一局小熊日常记忆翻牌',
    rewardCoins: 30,
    rewardAffection: 45,
    unlocked: false,
    claimed: false,
    icon: '🃏'
  },
  {
    id: 'ach_catch_hearts',
    title: '爱心神捕手',
    description: '在接住爱心小游戏中接住至少 20 颗爱心',
    rewardCoins: 30,
    rewardAffection: 45,
    unlocked: false,
    claimed: false,
    icon: '🧺'
  },
  {
    id: 'ach_quiz_partner',
    title: '默契百分百',
    description: '完成一整轮情侣与伙伴默契问答',
    rewardCoins: 35,
    rewardAffection: 50,
    unlocked: false,
    claimed: false,
    icon: '💭'
  },
  {
    id: 'ach_dresser',
    title: '穿搭小达人',
    description: '首次为小熊更换一件新装扮或配饰',
    rewardCoins: 25,
    rewardAffection: 40,
    unlocked: false,
    claimed: false,
    icon: '👗'
  },
  {
    id: 'ach_room_designer',
    title: '小屋设计师',
    description: '首次调整布置小屋的家具或墙面',
    rewardCoins: 25,
    rewardAffection: 40,
    unlocked: false,
    claimed: false,
    icon: '🏡'
  },
  {
    id: 'ach_photo_collector',
    title: '回忆收藏家',
    description: '纪念相册中收藏达到 5 张相片',
    rewardCoins: 40,
    rewardAffection: 60,
    unlocked: false,
    claimed: false,
    icon: '📸'
  },
  {
    id: 'ach_coin_100',
    title: '爱心富豪',
    description: '累计拥有超过 100 枚爱心币',
    rewardCoins: 50,
    rewardAffection: 80,
    unlocked: false,
    claimed: false,
    icon: '🪙'
  },
  {
    id: 'ach_friends',
    title: '熟悉的朋友',
    description: '与小熊们的亲密度达到 100 点 (Lv.2)',
    rewardCoins: 30,
    rewardAffection: 50,
    unlocked: false,
    claimed: false,
    icon: '🤝'
  },
  {
    id: 'ach_forever_together',
    title: '永远在一起',
    description: '达成最高亲密度等级 Lv.5 (900+ 点)',
    rewardCoins: 100,
    rewardAffection: 150,
    unlocked: false,
    claimed: false,
    icon: '👑'
  }
];
