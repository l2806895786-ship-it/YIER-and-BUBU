import { FurnitureItem } from '../types/game';

export const FURNITURE: FurnitureItem[] = [
  // --- Wallpapers ---
  {
    id: 'wall_cream',
    name: '经典暖奶油墙面',
    category: 'wallpaper',
    price: 0,
    description: '温润柔和的浅米奶油色，透着午后阳光的惬意。',
    colorOrStyle: '#FFF9F3'
  },
  {
    id: 'wall_pink',
    name: '浪漫浅粉波点墙面',
    category: 'wallpaper',
    price: 25,
    description: '少女心爆棚的治愈浅粉，缀以若隐若现的白波点。',
    colorOrStyle: '#FDEAE6'
  },
  {
    id: 'wall_brown',
    name: '复古奶茶格子墙面',
    category: 'wallpaper',
    price: 35,
    description: '经典英伦风格的奶茶暖棕格子，温馨耐看。',
    colorOrStyle: '#F3E5D8'
  },
  {
    id: 'wall_mint',
    name: '清爽薄荷森林墙面',
    category: 'wallpaper',
    price: 40,
    description: '如同林间微风吹拂的淡绿，治愈一整天的疲惫。',
    colorOrStyle: '#EBF4E7'
  },

  // --- Flooring ---
  {
    id: 'floor_wood',
    name: '自然浅橡木地板',
    category: 'flooring',
    price: 0,
    description: '带有天然木纹的浅色实木地板，踩上去温润舒适。',
    colorOrStyle: '#EADBC8'
  },
  {
    id: 'floor_honey',
    name: '蜜糖暖棕拼木地板',
    category: 'flooring',
    price: 25,
    description: '深浅交织的蜜糖色鱼骨拼木，格调雅致。',
    colorOrStyle: '#DCBE9B'
  },
  {
    id: 'floor_tatami',
    name: '日式编织草席地板',
    category: 'flooring',
    price: 45,
    description: '散发草本清香的编织席面，适合随时席地而坐。',
    colorOrStyle: '#D7DFBF'
  },

  // --- Carpets ---
  {
    id: 'carpet_circle',
    name: '原色毛绒小圆毯',
    category: 'carpet',
    price: 0,
    description: '柔软圆润的奶白色地毯，小熊们最喜欢在上面打滚。',
    colorOrStyle: '#FFF3E2'
  },
  {
    id: 'carpet_heart',
    name: '心心相印爱心地毯',
    category: 'carpet',
    price: 20,
    description: '甜甜的心形粉色长毛地毯，充满相爱的温度。',
    colorOrStyle: '#F6C8C5'
  },
  {
    id: 'carpet_star',
    name: '星光闪闪小黄毯',
    category: 'carpet',
    price: 30,
    description: '萌萌的五角星造型，踩上去软绵绵的。',
    colorOrStyle: '#F9E4A6'
  },

  // --- Sofas / Seating ---
  {
    id: 'sofa_biscuit',
    name: '饼干夹心双人沙发',
    category: 'sofa',
    price: 0,
    description: '像威化饼干一样圆润饱满的暖杏色小沙发。',
    colorOrStyle: '#E6C2A7'
  },
  {
    id: 'sofa_beanbag',
    name: '大白熊懒人云朵沙发',
    category: 'sofa',
    price: 35,
    description: '整个人陷进去就不想起来的云朵触感沙发。',
    colorOrStyle: '#FFFFFF'
  },
  {
    id: 'sofa_vintage',
    name: '焦糖摩卡绒面软椅',
    category: 'sofa',
    price: 50,
    description: '触感细腻的高级灯芯绒单椅，配有小抱枕。',
    colorOrStyle: '#B57C58'
  },

  // --- Lamps ---
  {
    id: 'lamp_floor',
    name: '暖光蘑菇落地灯',
    category: 'lamp',
    price: 0,
    description: '散发柔和黄光的蘑菇罩落地灯，夜晚最温馨的灯光。',
    colorOrStyle: '#F6D58B'
  },
  {
    id: 'lamp_star',
    name: '梦幻垂挂星月串灯',
    category: 'lamp',
    price: 30,
    description: '像小精灵散落的星星彩灯，一闪一闪如梦似幻。',
    colorOrStyle: '#FFE682'
  },

  // --- Plants ---
  {
    id: 'plant_pot',
    name: '圆叶龟背竹陶盆',
    category: 'plant',
    price: 0,
    description: '生机盎然的观叶植物，给房间注入满满绿意。',
    colorOrStyle: '#82A776'
  },
  {
    id: 'plant_tulip',
    name: '琉璃花瓶郁金香',
    category: 'plant',
    price: 25,
    description: '新鲜采摘的橙粉郁金香，空气里都是花香。',
    colorOrStyle: '#FA8072'
  },

  // --- Wall Decors ---
  {
    id: 'decor_photo',
    name: '一二布布甜蜜合影框',
    category: 'decor',
    price: 0,
    description: '挂着两只小熊初次拍照留念的精致原木画框。',
    colorOrStyle: '#4B2925'
  },
  {
    id: 'decor_banner',
    name: '永远在一起彩旗挂饰',
    category: 'decor',
    price: 30,
    description: '挂在窗边摇曳的派对小彩旗，天天都是好心情。',
    colorOrStyle: '#F7A7A6'
  }
];

export const DEFAULT_OWNED_FURNITURE = [
  'wall_cream',
  'floor_wood',
  'carpet_circle',
  'sofa_biscuit',
  'lamp_floor',
  'plant_pot',
  'decor_photo'
];

export const DEFAULT_ROOM_CONFIG = {
  wallpaper: 'wall_cream',
  flooring: 'floor_wood',
  carpet: 'carpet_circle',
  sofa: 'sofa_biscuit',
  lamp: 'lamp_floor',
  plant: 'plant_pot',
  decor: 'decor_photo'
};
