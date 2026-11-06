import { GameSaveData, AlbumCard } from '../types/game';
import { DEFAULT_OWNED_OUTFITS } from '../data/outfits';
import { DEFAULT_OWNED_FURNITURE, DEFAULT_ROOM_CONFIG } from '../data/furniture';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { DAILY_TASKS_TEMPLATE } from '../data/dailyTasks';

const SAVE_KEY = 'yier_bubu_game_save_v1';

export function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function createDefaultSaveData(): GameSaveData {
  const initialAchievementsMap: Record<string, { unlocked: boolean; unlockedAt?: string; claimed: boolean }> = {};
  INITIAL_ACHIEVEMENTS.forEach(ach => {
    initialAchievementsMap[ach.id] = {
      unlocked: ach.unlocked,
      unlockedAt: ach.unlocked ? getTodayDateString() : undefined,
      claimed: ach.claimed
    };
  });

  const today = getTodayDateString();
  const initialTasksMap: Record<string, { current: number; completed: boolean; claimed: boolean }> = {};
  DAILY_TASKS_TEMPLATE.forEach(task => {
    initialTasksMap[task.id] = { current: 0, completed: false, claimed: false };
  });

  const initialAlbum: AlbumCard[] = [
    {
      id: 'album_first_meet',
      title: '初遇一二与布布',
      date: today,
      quote: '世界很吵闹，但我们在这里，今天也在一起。',
      tag: 'milestone',
      characters: 'yier_bubu_together',
      decorBg: '#FFF9F3',
      description: '初次踏入小熊温馨小屋的纪念留影。'
    }
  ];

  return {
    version: 1,
    currency: 50, // Initial generous starter coins
    affection: 30, // Initial starter affection
    ownedOutfits: [...DEFAULT_OWNED_OUTFITS],
    equippedOutfits: {
      yier: { head: 'head_flower', body: 'body_default', accessory: '' },
      bubu: { head: '', body: 'body_default', accessory: '' }
    },
    ownedFurniture: [...DEFAULT_OWNED_FURNITURE],
    roomConfig: { ...DEFAULT_ROOM_CONFIG },
    achievements: initialAchievementsMap,
    dailyTasksDate: today,
    dailyTasksStatus: initialTasksMap,
    album: initialAlbum,
    statistics: {
      totalInteractions: 0,
      totalHugs: 0,
      memoryWins: 0,
      memoryBestFlips: 0,
      catchBestScore: 0,
      catchTotalPlayed: 0,
      quizCompleted: 0,
      collectorWins: 0,
      catchBearWins: 0,
      puzzleWins: 0,
      cakeBaked: 0,
      drawWins: 0,
      giftsGiven: 0,
      todayInteractions: 0,
      lastInteractionDate: today
    },
    settings: {
      musicEnabled: false,
      soundEnabled: true,
      animationsEnabled: true,
      language: 'zh-CN'
    }
  };
}

export function loadGameSave(): GameSaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      const fresh = createDefaultSaveData();
      saveGameData(fresh);
      return fresh;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.currency !== 'number') {
      console.warn('Corrupted game save detected, resetting to safe defaults');
      const fresh = createDefaultSaveData();
      saveGameData(fresh);
      return fresh;
    }

    // Merge with defaults to guarantee all schema fields exist
    const defaultData = createDefaultSaveData();
    const today = getTodayDateString();

    // Check if daily tasks need a daily refresh
    let taskDate = parsed.dailyTasksDate || today;
    let tasksStatus = parsed.dailyTasksStatus || {};
    let todayInteractions = parsed.statistics?.todayInteractions || 0;

    if (taskDate !== today) {
      taskDate = today;
      tasksStatus = {};
      DAILY_TASKS_TEMPLATE.forEach(task => {
        tasksStatus[task.id] = { current: 0, completed: false, claimed: false };
      });
      todayInteractions = 0;
    }

    const merged: GameSaveData = {
      ...defaultData,
      ...parsed,
      currency: Math.max(0, parsed.currency ?? 50),
      affection: Math.max(0, parsed.affection ?? 30),
      ownedOutfits: Array.isArray(parsed.ownedOutfits) ? Array.from(new Set([...defaultData.ownedOutfits, ...parsed.ownedOutfits])) : defaultData.ownedOutfits,
      equippedOutfits: {
        yier: { ...defaultData.equippedOutfits.yier, ...(parsed.equippedOutfits?.yier || {}) },
        bubu: { ...defaultData.equippedOutfits.bubu, ...(parsed.equippedOutfits?.bubu || {}) }
      },
      ownedFurniture: Array.isArray(parsed.ownedFurniture) ? Array.from(new Set([...defaultData.ownedFurniture, ...parsed.ownedFurniture])) : defaultData.ownedFurniture,
      roomConfig: { ...defaultData.roomConfig, ...(parsed.roomConfig || {}) },
      achievements: { ...defaultData.achievements, ...(parsed.achievements || {}) },
      dailyTasksDate: taskDate,
      dailyTasksStatus: { ...defaultData.dailyTasksStatus, ...tasksStatus },
      album: Array.isArray(parsed.album) && parsed.album.length > 0 ? parsed.album : defaultData.album,
      statistics: {
        ...defaultData.statistics,
        ...(parsed.statistics || {}),
        todayInteractions,
        lastInteractionDate: today
      },
      settings: { ...defaultData.settings, ...(parsed.settings || {}) }
    };

    return merged;
  } catch (err) {
    console.error('Failed to load save from localStorage:', err);
    return createDefaultSaveData();
  }
}

export function saveGameData(data: GameSaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save game data:', err);
  }
}

export function clearGameSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    console.error('Failed to clear game save:', err);
  }
}

export function exportSaveToFile(data: GameSaveData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yier_bubu_backup_${getTodayDateString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importSaveFromFile(file: File): Promise<GameSaveData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object' || typeof parsed.currency !== 'number') {
          throw new Error('无效的存档文件格式');
        }
        // Save and return
        saveGameData(parsed);
        resolve(parsed as GameSaveData);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsText(file);
  });
}
