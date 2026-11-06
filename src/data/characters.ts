export interface CharacterProfile {
  id: 'yier' | 'bubu';
  name: string;
  englishName: string;
  role: string;
  description: string;
  colorName: string;
  primaryColor: string;
  blushColor: string;
  personality: string;
  quotes: string[];
}

export const CHARACTERS: Record<'yier' | 'bubu', CharacterProfile> = {
  yier: {
    id: 'yier',
    name: '一二',
    englishName: 'YI ER',
    role: '白色小熊',
    description: '温柔、细腻、偶尔害羞的小白熊，脖子系着精致小领结，最喜欢安静陪伴在布布身边。',
    colorName: '珍珠白',
    primaryColor: '#FFFFFF',
    blushColor: '#F6C8C5',
    personality: '温柔 · 细腻 · 治愈 · 贴心',
    quotes: [
      '今天也想和你待在一起。',
      '被摸摸了，脸颊暖融融的好开心~',
      '再陪我玩一会儿嘛。',
      '布布刚才吃小草莓，鼻尖蹭到了奶油~',
      '天气真好，想和布布一起去公园晒太阳。',
      '只要你在身边，心里就会觉得很安稳。'
    ]
  },
  bubu: {
    id: 'bubu',
    name: '布布',
    englishName: 'BUBU',
    role: '棕色小熊',
    description: '活泼、黏人、喜欢探索的奶茶色小熊，有一条圆滚滚的小尾巴，总是元气满满！',
    colorName: '奶茶棕',
    primaryColor: '#DCA58D',
    blushColor: '#F6D58B',
    personality: '活泼 · 黏人 · 调皮 · 元气',
    quotes: [
      '布布今天也元气满满！',
      '再玩一次嘛，布布还没玩够呢！',
      '今天想和一二一起出门大冒险！',
      '肚子好像咕噜咕噜叫了，想吃蜜桃饼干~',
      '大大的拥抱！给你一个暖烘烘的熊抱！',
      '嘿嘿，今天又是一起创造回忆的好日子！'
    ]
  }
};

export interface GiftItem {
  id: string;
  name: string;
  price: number;
  affectionGain: number;
  icon: string;
  description: string;
}

export const GIFTS: GiftItem[] = [
  {
    id: 'gift_milktea',
    name: '蜜桃波波奶茶',
    price: 15,
    affectionGain: 25,
    icon: '🧋',
    description: '甜甜的蜜桃果香与浓郁奶茶，小熊们的最爱！'
  },
  {
    id: 'gift_cake',
    name: '草莓奶油小蛋糕',
    price: 30,
    affectionGain: 55,
    icon: '🍰',
    description: '点缀着新鲜草莓的手工蛋糕，咬一口幸福感满满。'
  },
  {
    id: 'gift_plush',
    name: '小熊爱心毛绒挂件',
    price: 50,
    affectionGain: 95,
    icon: '🧸',
    description: '软绵绵的治愈玩偶，挂在包包上每天都陪伴着。'
  },
  {
    id: 'gift_starbox',
    name: '星空琉璃糖果盒',
    price: 80,
    affectionGain: 160,
    icon: '✨',
    description: '闪闪发光的梦幻糖果，里面装满了甜蜜的心意。'
  }
];
