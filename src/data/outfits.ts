import { CharacterItem, OutfitCategory } from '../types/game';

export const OUTFIT_CATEGORIES: { id: OutfitCategory; name: string; icon: string }[] = [
  { id: 'hat', name: '帽子', icon: '🧢' },
  { id: 'top', name: '上衣', icon: '👕' },
  { id: 'bottom', name: '裤子', icon: '🩳' },
  { id: 'dress', name: '连衣裙', icon: '👗' },
  { id: 'coat', name: '外套', icon: '🧥' },
  { id: 'shoes', name: '鞋子', icon: '👟' },
  { id: 'scarf', name: '围巾', icon: '🧣' },
  { id: 'accessory', name: '配饰', icon: '🪄' },
  { id: 'couple_set', name: '情侣套装', icon: '💞' }
];

export const OUTFITS: CharacterItem[] = [
  // --- 1. 帽子 (hat) ---
  {
    id: 'hat_daisy',
    name: '向阳小雏菊发卡',
    category: 'hat',
    targetCharacter: 'both',
    price: 0,
    description: '嫩黄色的手作小雏菊，别在耳旁可爱度翻倍！',
    icon: '🌼',
    previewColor: '#FDE047'
  },
  {
    id: 'hat_beret',
    name: '草莓波波画家帽',
    category: 'hat',
    targetCharacter: 'both',
    price: 25,
    description: '带着嫩绿小叶子的草莓红色贝雷帽，文艺满满。',
    icon: '🍓',
    previewColor: '#EF4444'
  },
  {
    id: 'hat_party',
    name: '欢庆生日派对尖顶帽',
    category: 'hat',
    targetCharacter: 'both',
    price: 30,
    description: '顶着毛绒绒小球的派对帽，今天也是开心的一天！',
    icon: '🎉',
    previewColor: '#F472B6'
  },
  {
    id: 'hat_knit',
    name: '焦糖毛球暖冬针织帽',
    category: 'hat',
    targetCharacter: 'both',
    price: 35,
    description: '厚实又软萌的绒线小帽，耳朵暖烘烘的。',
    icon: '🧶',
    previewColor: '#D97706'
  },

  // --- 2. 上衣 (top) ---
  {
    id: 'top_striped',
    name: '经典蓝白条纹海魂衫',
    category: 'top',
    targetCharacter: 'both',
    price: 0,
    description: '清新舒适的棉质条纹衫，充满夏日海风气息。',
    icon: '👕',
    previewColor: '#60A5FA'
  },
  {
    id: 'top_bear_sweater',
    name: '暖阳小熊软萌毛衣',
    category: 'top',
    targetCharacter: 'both',
    price: 30,
    description: '胸口绣着爱心的小毛衣，手感超级软糯。',
    icon: '🤎',
    previewColor: '#FBBF24'
  },
  {
    id: 'top_cherry_tshirt',
    name: '甜心樱桃纯白短袖',
    category: 'top',
    targetCharacter: 'both',
    price: 20,
    description: '印有一对双生小樱桃的宽松T恤，元气满满。',
    icon: '🍒',
    previewColor: '#F43F5E'
  },

  // --- 3. 裤子 (bottom) ---
  {
    id: 'bottom_overalls',
    name: '经典工装牛仔背带裤',
    category: 'bottom',
    targetCharacter: 'both',
    price: 0,
    description: '带有小小口袋的背带短裤，走起路来晃晃悠悠超可爱。',
    icon: '👖',
    previewColor: '#3B82F6'
  },
  {
    id: 'bottom_khaki',
    name: '奶茶色休闲小短裤',
    category: 'bottom',
    targetCharacter: 'both',
    price: 20,
    description: '清爽透气的工装短裤，适合出去探险踩水坑。',
    icon: '🩳',
    previewColor: '#D97706'
  },

  // --- 4. 连衣裙 (dress) ---
  {
    id: 'dress_sailor',
    name: '元气蓝白水手海军裙',
    category: 'dress',
    targetCharacter: 'both',
    price: 35,
    description: '帅气又乖巧的海军翻领配飘带，甜美度爆表！',
    icon: '⚓',
    previewColor: '#2563EB'
  },
  {
    id: 'dress_princess',
    name: '草莓泡泡袖洛丽塔裙',
    category: 'dress',
    targetCharacter: 'both',
    price: 50,
    description: '层叠花边与蕾丝缎带，像童话里走出来的小可爱。',
    icon: '👗',
    previewColor: '#EC4899'
  },

  // --- 5. 外套 (coat) ---
  {
    id: 'coat_duffle',
    name: '牛角扣学院风大衣',
    category: 'coat',
    targetCharacter: 'both',
    price: 45,
    description: '焦糖暖棕配经典木质牛角扣，小熊也有英伦范。',
    icon: '🧥',
    previewColor: '#B45309'
  },
  {
    id: 'coat_fleece',
    name: '毛茸茸小羊羔绒马甲',
    category: 'coat',
    targetCharacter: 'both',
    price: 40,
    description: '像小绵羊一样软蓬蓬的保暖马甲，圆滚滚的。',
    icon: '🐑',
    previewColor: '#E2E8F0'
  },

  // --- 6. 鞋子 (shoes) ---
  {
    id: 'shoes_boots',
    name: '暖黄色小雨靴',
    category: 'shoes',
    targetCharacter: 'both',
    price: 0,
    description: '踩水扑腾专用亮黄色小短靴，下雨天也元气满满！',
    icon: '👢',
    previewColor: '#EAB308'
  },
  {
    id: 'shoes_sneakers',
    name: '经典红白帆布板鞋',
    category: 'shoes',
    targetCharacter: 'both',
    price: 25,
    description: '轻便贴脚的运动帆布鞋，跑跑跳跳不累脚。',
    icon: '👟',
    previewColor: '#EF4444'
  },

  // --- 7. 围巾 (scarf) ---
  {
    id: 'scarf_red',
    name: '温暖粗棒针圣诞红围巾',
    category: 'scarf',
    targetCharacter: 'both',
    price: 25,
    description: '厚实软糯的红白流苏长围巾，把下巴舒服地藏在里面。',
    icon: '🧣',
    previewColor: '#DC2626'
  },
  {
    id: 'scarf_plaid',
    name: '苏格兰黄绿格子围脖',
    category: 'scarf',
    targetCharacter: 'both',
    price: 30,
    description: '文艺复古的经典格纹，围在脖子上一整天都暖融融。',
    icon: '🧣',
    previewColor: '#16A34A'
  },

  // --- 8. 配饰 (accessory) ---
  {
    id: 'acc_wand',
    name: '心动爱心魔法手杖',
    category: 'accessory',
    targetCharacter: 'both',
    price: 20,
    description: '挥舞就会洒下粉色微光的小手杖，施展快乐魔法！',
    icon: '💖',
    previewColor: '#F472B6'
  },
  {
    id: 'acc_balloon',
    name: '微笑星星漂浮气球',
    category: 'accessory',
    targetCharacter: 'both',
    price: 30,
    description: '金灿灿的星星气球，跟着小熊的脚步轻轻晃动。',
    icon: '⭐',
    previewColor: '#F59E0B'
  },
  {
    id: 'acc_camera',
    name: '复古挂颈小拍立得',
    category: 'accessory',
    targetCharacter: 'both',
    price: 45,
    description: '随时记录彼此笑容的随身迷你相机，咔嚓一张留念！',
    icon: '📷',
    previewColor: '#78716C'
  },

  // --- 9. 情侣套装 (couple_set) ---
  {
    id: 'set_pajamas',
    name: '甜蜜梦乡波点睡衣套',
    category: 'couple_set',
    targetCharacter: 'both',
    price: 60,
    description: '印着暖黄星星扣子的情侣连体居家睡衣，两只小熊一起甜甜入梦。',
    icon: '🧸',
    previewColor: '#FEF08A'
  },
  {
    id: 'set_honey_date',
    name: '蜜糖午后约会情侣服',
    category: 'couple_set',
    targetCharacter: 'both',
    price: 85,
    description: '一二的浅粉荷叶边与布布的奶茶色英伦格纹，同频心跳的绝配穿搭！',
    icon: '🍯',
    previewColor: '#FB923C'
  }
];

export const DEFAULT_OWNED_OUTFITS = [
  'hat_daisy',
  'top_striped',
  'bottom_overalls',
  'shoes_boots'
];
