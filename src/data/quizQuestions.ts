export interface QuizOption {
  text: string;
  icon: string;
  yierReaction: string;
  bubuReaction: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  optionA: QuizOption;
  optionB: QuizOption;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '一起出去玩，你更喜欢去哪里？',
    subtitle: '放飞心情的悠闲假日',
    optionA: {
      text: '海边看浪花与晚霞',
      icon: '🌊',
      yierReaction: '吹着海风听海浪的声音，一二很喜欢~',
      bubuReaction: '可以在沙滩上踩脚印，抓小螃蟹！'
    },
    optionB: {
      text: '山里看森林与星空',
      icon: '🌲',
      yierReaction: '静悄悄的绿意让人很安心。',
      bubuReaction: '深呼吸一口新鲜空气，大声呼唤山风！'
    }
  },
  {
    id: 2,
    question: '你更憧憬哪一种理想约会？',
    subtitle: '属于两只小熊的特别时光',
    optionA: {
      text: '窝在家里看电影吃零食',
      icon: '🍿',
      yierReaction: '裹着软软的毛毯，靠在一起最暖了。',
      bubuReaction: '吃爆米花！边看边讨论超级惬意！'
    },
    optionB: {
      text: '出门漫步探索城市街角',
      icon: '🗺️',
      yierReaction: '打卡藏在巷子里的小小甜品店。',
      bubuReaction: '走街串巷，去没去过的新奇地方！'
    }
  },
  {
    id: 3,
    question: '收到礼物时，你更喜欢哪一种？',
    subtitle: '承载心意的温暖惊喜',
    optionA: {
      text: '每天都能用到的实用小物件',
      icon: '☕',
      yierReaction: '比如一个保温杯，每次喝水都想到你。',
      bubuReaction: '实用又贴心，时刻带在身边！'
    },
    optionB: {
      text: '满载纪念意义的心意礼物',
      icon: '💌',
      yierReaction: '亲手写的卡片，一二会好好收藏在盒子里。',
      bubuReaction: '独一无二的纪念，看一眼就超级感动！'
    }
  },
  {
    id: 4,
    question: '美好的周末清晨，更想做什么？',
    subtitle: '不被打扰的慢节奏生活',
    optionA: {
      text: '拉上窗帘睡到自然醒',
      icon: '🛌',
      yierReaction: '在蓬松的被窝里多赖一会儿床~',
      bubuReaction: '呼噜噜~梦里都是甜甜的蜂蜜草莓！'
    },
    optionB: {
      text: '起个大早准备自制早午餐',
      icon: '🥞',
      yierReaction: '煎松饼、烤吐司，满屋都是香气。',
      bubuReaction: '我来摆盘！还要淋上厚厚的枫糖浆！'
    }
  },
  {
    id: 5,
    question: '你更喜欢哪种特别的天气氛围？',
    subtitle: '大自然温柔的情绪',
    optionA: {
      text: '阳光洒满窗台的明媚晴天',
      icon: '☀️',
      yierReaction: '把毛毯拿出来晒晒，有阳光的味道。',
      bubuReaction: '踩着草地奔跑，影子也在跳舞！'
    },
    optionB: {
      text: '雨滴敲打玻璃的温柔雨天',
      icon: '🌧️',
      yierReaction: '撑一把大伞，两只小熊紧紧靠在一起走。',
      bubuReaction: '滴滴答答的雨声，最好睡觉啦！'
    }
  },
  {
    id: 6,
    question: '遇到不顺心的事情时，最希望对方怎么做？',
    subtitle: '心灵彼此靠近的时刻',
    optionA: {
      text: '不用说话，只要静静陪在身边',
      icon: '🤲',
      yierReaction: '一个无声的摸头和依靠，就能融化所有难过。',
      bubuReaction: '布布会把毛茸茸的大脑袋贴过来蹭蹭你！'
    },
    optionB: {
      text: '认真倾听，一起吐槽并安慰',
      icon: '👂',
      yierReaction: '听你把心事慢慢倒出来，分担你的重量。',
      bubuReaction: '布布跟你站在一边，绝对最挺你！'
    }
  },
  {
    id: 7,
    question: '最珍视的纪念回忆方式是什么？',
    subtitle: '留住流淌的时光',
    optionA: {
      text: '随手拍下搞怪又甜蜜的照片',
      icon: '📸',
      yierReaction: '定格下每一帧真诚的笑容。',
      bubuReaction: '做鬼脸！比剪刀手！还要洗出来贴在墙上！'
    },
    optionB: {
      text: '用文字或纪念册写下点滴感受',
      icon: '📖',
      yierReaction: '翻开泛黄的手账，往事依旧鲜活明亮。',
      bubuReaction: '像寻宝日记一样，记录我们每一个第一次！'
    }
  },
  {
    id: 8,
    question: '最想和对方一起实现的愿望？',
    subtitle: '关于未来的温柔期许',
    optionA: {
      text: '牵着手环游世界，去看极光与花海',
      icon: '✈️',
      yierReaction: '走遍每一个想去的地方，身边始终是你。',
      bubuReaction: '背着小背包，看遍全世界的美丽风景！'
    },
    optionB: {
      text: '用心装扮属于彼此的温馨小屋',
      icon: '🏡',
      yierReaction: '在暖黄灯光下煮汤，平凡而充实的每一天。',
      bubuReaction: '摆满我们喜欢的玩偶，永远热气腾腾！'
    }
  }
];

export const QUIZ_SYNTHESIS_RESULTS = [
  {
    type: '心有灵犀型',
    title: '如春风般温柔的默契伙伴',
    quote: '两颗心就像互相映衬的小熊，即使不说话，也有同频的心跳。',
    badge: '🌸 灵魂共振',
    desc: '你们对生活有着同样细腻浪漫的感知，喜欢在细水长流中品味日常的甜。'
  },
  {
    type: '互补治愈型',
    title: '一动一静的完美小熊组合',
    quote: '一个带来温暖的安宁，一个点燃探索的热忱，凑在一起刚刚好！',
    badge: '🍯 绝配组合',
    desc: '一个像温柔的一二，一个像元气的布布，互相给予力量与依赖。'
  },
  {
    type: '浪漫冒险型',
    title: '眼里满是星光的生活探险家',
    quote: '世界那么大，但最想看的风景，永远是有你在身旁的每一处。',
    badge: '⭐ 共同漫步',
    desc: '渴望携手经历每一个春夏秋冬，无论晴天雨天，都有无限好心情。'
  }
];
