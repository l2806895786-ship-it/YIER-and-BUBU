/**
 * Game Types for 《一二布布：今天也在一起》 V3.0
 */

export type PageId =
  | 'showcase'
  | 'start'
  | 'home'
  | 'games'
  | 'memory'
  | 'catch'
  | 'quiz'
  | 'collector'
  | 'catch_bear'
  | 'puzzle'
  | 'cake'
  | 'draw'
  | 'dressup'
  | 'room'
  | 'album'
  | 'interaction';

export type CharacterId = 'yier' | 'bubu';

export type CharacterFacing = 'front' | 'back' | 'side_left' | 'side_right';

export type ExpressionType = 'normal' | 'happy' | 'blink' | 'blush' | 'hug' | 'love' | 'wink' | 'sleep';

export type PoseType = 'idle' | 'bounce' | 'wave' | 'hug' | 'celebrate' | 'dance' | 'sleep' | 'lift';

export type OutfitCategory =
  | 'top'
  | 'bottom'
  | 'dress'
  | 'coat'
  | 'hat'
  | 'shoes'
  | 'scarf'
  | 'accessory'
  | 'couple_set';

export interface CharacterItem {
  id: string;
  name: string;
  category: OutfitCategory;
  targetCharacter: 'both' | 'yier' | 'bubu';
  price: number;
  description: string;
  icon: string;
  previewColor?: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'wallpaper' | 'flooring' | 'carpet' | 'sofa' | 'lamp' | 'plant' | 'decor';
  price: number;
  description: string;
  colorOrStyle: string;
}

export interface EquippedOutfits {
  hat?: string;
  top?: string;
  bottom?: string;
  dress?: string;
  coat?: string;
  shoes?: string;
  scarf?: string;
  accessory?: string;
  couple_set?: string;
  // Legacy aliases for backward compatibility
  head?: string;
  body?: string;
}

export interface RoomConfiguration {
  wallpaper: string;
  flooring: string;
  carpet: string;
  sofa: string;
  lamp: string;
  plant: string;
  decor: string;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  claimed: boolean;
  rewardCoins: number;
  rewardAffection: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  rewardAffection: number;
  unlocked: boolean;
  unlockedAt?: string;
  claimed: boolean;
  icon: string;
}

export interface AlbumCard {
  id: string;
  title: string;
  date: string;
  quote: string;
  tag: 'memory' | 'catch' | 'quiz' | 'collector' | 'catch_bear' | 'puzzle' | 'cake' | 'draw' | 'milestone' | 'dressup' | 'room' | 'interaction';
  characters: string;
  decorBg: string;
  description?: string;
}

export interface GameStatistics {
  totalInteractions: number;
  totalHugs: number;
  memoryWins: number;
  memoryBestFlips: number;
  catchBestScore: number;
  catchTotalPlayed: number;
  quizCompleted: number;
  collectorWins: number;
  catchBearWins: number;
  puzzleWins: number;
  cakeBaked: number;
  drawWins: number;
  giftsGiven: number;
  todayInteractions: number;
  lastInteractionDate: string;
}

export interface GameSettings {
  musicEnabled: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  language: 'zh-CN' | 'en';
}

export interface GameSaveData {
  version: number;
  currency: number;
  affection: number;
  ownedOutfits: string[];
  equippedOutfits: {
    yier: EquippedOutfits;
    bubu: EquippedOutfits;
  };
  ownedFurniture: string[];
  roomConfig: RoomConfiguration;
  achievements: Record<string, { unlocked: boolean; unlockedAt?: string; claimed: boolean }>;
  dailyTasksDate: string;
  dailyTasksStatus: Record<string, { current: number; completed: boolean; claimed: boolean }>;
  album: AlbumCard[];
  statistics: GameStatistics;
  settings: GameSettings;
}

export interface RewardToastInfo {
  id: string;
  text: string;
  coins?: number;
  affection?: number;
  icon?: string;
}

export type IntimateActionType =
  | 'hug'
  | 'hold_hands'
  | 'kiss'
  | 'pat_head'
  | 'lift_high'
  | 'dance'
  | 'sleep'
  | 'high_five'
  | 'eat'
  | 'take_photo';
