import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  PageId,
  GameSaveData,
  CharacterId,
  EquippedOutfits,
  RewardToastInfo,
  AlbumCard,
  GameSettings
} from '../types/game';
import { loadGameSave, saveGameData, clearGameSave, getTodayDateString, exportSaveToFile, importSaveFromFile } from '../utils/storage';
import { sound } from '../utils/audio';
import { CHARACTERS, GIFTS } from '../data/characters';
import { OUTFITS } from '../data/outfits';
import { FURNITURE } from '../data/furniture';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import confetti from 'canvas-confetti';

interface GameContextType {
  saveData: GameSaveData;
  page: PageId;
  setPage: (p: PageId) => void;
  affectionLevel: number;
  affectionLevelName: string;
  affectionProgressPercent: number;
  rewardToasts: RewardToastInfo[];
  dismissToast: (id: string) => void;
  addToast: (text: string, coins?: number, affection?: number, icon?: string) => void;
  addCurrency: (amount: number, reason?: string) => void;
  spendCurrency: (amount: number) => boolean;
  addAffection: (amount: number, reason?: string) => void;
  interactWithCharacter: (char: CharacterId) => { text: string; gainedReward: boolean };
  performHug: () => boolean;
  sendGift: (giftId: string) => boolean;
  buyOutfit: (itemId: string) => boolean;
  equipOutfit: (char: CharacterId, category: keyof EquippedOutfits, itemId: string) => void;
  equipCoupleSet: (setId: string) => void;
  buyFurniture: (itemId: string) => boolean;
  updateRoomConfig: (category: keyof GameSaveData['roomConfig'], itemId: string) => void;
  claimDailyTaskReward: (taskId: string) => void;
  recordTaskProgress: (taskId: string, increment?: number) => void;
  claimAchievementReward: (achId: string) => void;
  addAlbumCard: (card: Omit<AlbumCard, 'id' | 'date'>) => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  resetGame: () => void;
  exportGame: () => void;
  importGame: (file: File) => Promise<boolean>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const AFFECTION_LEVELS = [
  { level: 1, name: '初次见面', min: 0, max: 99 },
  { level: 2, name: '熟悉的朋友', min: 100, max: 249 },
  { level: 3, name: '最好的伙伴', min: 250, max: 499 },
  { level: 4, name: '形影不离', min: 500, max: 899 },
  { level: 5, name: '永远在一起', min: 900, max: Infinity }
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [saveData, setSaveData] = useState<GameSaveData>(() => loadGameSave());
  const [page, setPage] = useState<PageId>('showcase');
  const [rewardToasts, setRewardToasts] = useState<RewardToastInfo[]>([]);

  // Sync sound settings with audio manager
  useEffect(() => {
    sound.setSoundEnabled(saveData.settings.soundEnabled);
    sound.setMusicEnabled(saveData.settings.musicEnabled);
  }, [saveData.settings]);

  // Persist save data on state update
  const updateSave = useCallback((updater: (prev: GameSaveData) => GameSaveData) => {
    setSaveData(prev => {
      const next = updater(prev);
      saveGameData(next);
      return next;
    });
  }, []);

  // Calculate affection level and progress
  const currentAffection = saveData.affection;
  let affectionLevel = 1;
  let affectionLevelName = '初次见面';
  let affectionProgressPercent = 0;

  for (let i = 0; i < AFFECTION_LEVELS.length; i++) {
    const tier = AFFECTION_LEVELS[i];
    if (currentAffection >= tier.min) {
      affectionLevel = tier.level;
      affectionLevelName = tier.name;
      if (tier.max === Infinity) {
        affectionProgressPercent = 100;
      } else {
        const span = tier.max - tier.min + 1;
        const currentInTier = currentAffection - tier.min;
        affectionProgressPercent = Math.min(100, Math.floor((currentInTier / span) * 100));
      }
    }
  }

  // Toast notification helper
  const addToast = useCallback((text: string, coins?: number, affection?: number, icon?: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: RewardToastInfo = { id, text, coins, affection, icon };
    setRewardToasts(prev => [...prev.slice(-3), newToast]); // Keep max 4 toasts
    setTimeout(() => {
      setRewardToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setRewardToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Currency operations
  const addCurrency = useCallback((amount: number, reason?: string) => {
    if (amount <= 0) return;
    sound.playCoin();
    updateSave(prev => ({
      ...prev,
      currency: prev.currency + amount
    }));
    addToast(reason ? `${reason} +${amount} 爱心币` : `+${amount} 爱心币`, amount, undefined, '🪙');

    // Check achievement for 100 coins
    updateSave(prev => {
      if (prev.currency >= 100 && !prev.achievements['ach_coin_100']?.unlocked) {
        return {
          ...prev,
          achievements: {
            ...prev.achievements,
            ach_coin_100: { unlocked: true, unlockedAt: getTodayDateString(), claimed: false }
          }
        };
      }
      return prev;
    });
  }, [updateSave, addToast]);

  const spendCurrency = useCallback((amount: number): boolean => {
    if (amount < 0 || saveData.currency < amount) {
      return false;
    }
    sound.playPop();
    updateSave(prev => ({
      ...prev,
      currency: Math.max(0, prev.currency - amount)
    }));
    return true;
  }, [saveData.currency, updateSave]);

  // Affection operations
  const addAffection = useCallback((amount: number, reason?: string) => {
    if (amount <= 0) return;
    const oldAffection = saveData.affection;
    const newAffection = oldAffection + amount;

    updateSave(prev => ({
      ...prev,
      affection: newAffection
    }));

    addToast(reason ? `${reason} +${amount} 亲密度` : `+${amount} 亲密度`, undefined, amount, '💖');

    // Check for level ups!
    const oldLevel = AFFECTION_LEVELS.filter(l => oldAffection >= l.min).pop()?.level || 1;
    const newLevel = AFFECTION_LEVELS.filter(l => newAffection >= l.min).pop()?.level || 1;

    if (newLevel > oldLevel) {
      sound.playLevelUp();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      const levelTitle = AFFECTION_LEVELS.find(l => l.level === newLevel)?.name || '';
      addToast(`🎉 亲密度升级至 Lv.${newLevel}【${levelTitle}】!`, undefined, undefined, '👑');

      // Check achievement
      if (newLevel >= 2) {
        updateSave(prev => ({
          ...prev,
          achievements: {
            ...prev.achievements,
            ach_friends: { unlocked: true, unlockedAt: getTodayDateString(), claimed: false }
          }
        }));
      }
      if (newLevel >= 5) {
        updateSave(prev => ({
          ...prev,
          achievements: {
            ...prev.achievements,
            ach_forever_together: { unlocked: true, unlockedAt: getTodayDateString(), claimed: false }
          }
        }));
      }
    }
  }, [saveData.affection, updateSave, addToast]);

  // Record daily task progress
  const recordTaskProgress = useCallback((taskId: string, increment = 1) => {
    const today = getTodayDateString();
    updateSave(prev => {
      const taskState = prev.dailyTasksStatus[taskId] || { current: 0, completed: false, claimed: false };
      const newCurrent = taskState.current + increment;
      const completed = newCurrent >= 1;

      return {
        ...prev,
        dailyTasksDate: today,
        dailyTasksStatus: {
          ...prev.dailyTasksStatus,
          [taskId]: {
            ...taskState,
            current: newCurrent,
            completed
          }
        }
      };
    });
  }, [updateSave]);

  // Character Interaction
  const interactWithCharacter = useCallback((char: CharacterId) => {
    sound.playPet();
    const charData = CHARACTERS[char];
    const quotes = charData.quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const today = getTodayDateString();
    const isFirstToday = saveData.statistics.lastInteractionDate !== today || saveData.statistics.todayInteractions === 0;

    // Daily first interaction gives bonus coins & affection
    let gainedReward = false;
    if (isFirstToday) {
      addAffection(15, `与${charData.name}轻触互动`);
      addCurrency(10, '每日暖心摸摸');
      gainedReward = true;
    }

    // Update statistics & daily tasks
    updateSave(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalInteractions: prev.statistics.totalInteractions + 1,
        todayInteractions: prev.statistics.todayInteractions + 1,
        lastInteractionDate: today
      },
      achievements: {
        ...prev.achievements,
        ach_first_touch: { unlocked: true, unlockedAt: today, claimed: prev.achievements['ach_first_touch']?.claimed || false }
      }
    }));

    recordTaskProgress(char === 'yier' ? 'task_pet_yier' : 'task_pet_bubu');

    return { text: randomQuote, gainedReward };
  }, [saveData.statistics, addAffection, addCurrency, updateSave, recordTaskProgress]);

  // Perform Hug
  const performHug = useCallback(() => {
    sound.playHug();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 }
    });

    const today = getTodayDateString();
    const canGetBonus = saveData.statistics.lastInteractionDate !== today || saveData.statistics.totalHugs === 0;

    if (canGetBonus) {
      addAffection(25, '一二与布布甜蜜拥抱');
      addCurrency(15, '拥抱温暖奖励');
    } else {
      addAffection(5, '贴心熊抱');
    }

    updateSave(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalHugs: prev.statistics.totalHugs + 1
      },
      achievements: {
        ...prev.achievements,
        ach_first_hug: { unlocked: true, unlockedAt: today, claimed: prev.achievements['ach_first_hug']?.claimed || false }
      }
    }));

    recordTaskProgress('task_hug');
    return true;
  }, [saveData.statistics, addAffection, addCurrency, updateSave, recordTaskProgress]);

  // Send Gift
  const sendGift = useCallback((giftId: string) => {
    const gift = GIFTS.find(g => g.id === giftId);
    if (!gift) return false;

    if (saveData.currency < gift.price) {
      addToast('爱心币不足，快去玩小游戏赚取吧！', undefined, undefined, '⚠️');
      return false;
    }

    sound.playCoin();
    updateSave(prev => ({
      ...prev,
      currency: prev.currency - gift.price,
      statistics: {
        ...prev.statistics,
        giftsGiven: prev.statistics.giftsGiven + 1
      }
    }));

    addAffection(gift.affectionGain, `赠送【${gift.name}】`);
    return true;
  }, [saveData.currency, updateSave, addAffection, addToast]);

  // Outfits
  const buyOutfit = useCallback((itemId: string) => {
    const outfit = OUTFITS.find(o => o.id === itemId);
    if (!outfit) return false;

    if (saveData.ownedOutfits.includes(itemId)) {
      return true; // Already owned
    }

    if (saveData.currency < outfit.price) {
      addToast('爱心币不足！', undefined, undefined, '⚠️');
      return false;
    }

    sound.playCoin();
    updateSave(prev => ({
      ...prev,
      currency: prev.currency - outfit.price,
      ownedOutfits: [...prev.ownedOutfits, itemId],
      achievements: {
        ...prev.achievements,
        ach_dresser: { unlocked: true, unlockedAt: getTodayDateString(), claimed: prev.achievements['ach_dresser']?.claimed || false }
      }
    }));

    addToast(`成功解锁装扮【${outfit.name}】！`, undefined, 10, '👗');
    return true;
  }, [saveData.ownedOutfits, saveData.currency, updateSave, addToast]);

  const equipOutfit = useCallback((char: CharacterId, category: keyof EquippedOutfits, itemId: string) => {
    sound.playPop();
    updateSave(prev => {
      const currentEquipped = prev.equippedOutfits[char] || {};
      const newCategoryValue = currentEquipped[category] === itemId ? undefined : itemId;

      return {
        ...prev,
        equippedOutfits: {
          ...prev.equippedOutfits,
          [char]: {
            ...currentEquipped,
            [category]: newCategoryValue
          }
        },
        achievements: {
          ...prev.achievements,
          ach_dresser: { unlocked: true, unlockedAt: getTodayDateString(), claimed: prev.achievements['ach_dresser']?.claimed || false }
        }
      };
    });
  }, [updateSave]);

  const equipCoupleSet = useCallback((setId: string) => {
    sound.playPop();
    updateSave(prev => {
      const currentYier = prev.equippedOutfits.yier || {};
      const currentBubu = prev.equippedOutfits.bubu || {};
      const toggleOff = currentYier.couple_set === setId;

      return {
        ...prev,
        equippedOutfits: {
          yier: {
            ...currentYier,
            couple_set: toggleOff ? undefined : setId
          },
          bubu: {
            ...currentBubu,
            couple_set: toggleOff ? undefined : setId
          }
        },
        achievements: {
          ...prev.achievements,
          ach_dresser: { unlocked: true, unlockedAt: getTodayDateString(), claimed: prev.achievements['ach_dresser']?.claimed || false }
        }
      };
    });
  }, [updateSave]);

  // Furniture
  const buyFurniture = useCallback((itemId: string) => {
    const item = FURNITURE.find(f => f.id === itemId);
    if (!item) return false;

    if (saveData.ownedFurniture.includes(itemId)) {
      return true;
    }

    if (saveData.currency < item.price) {
      addToast('爱心币不足！', undefined, undefined, '⚠️');
      return false;
    }

    sound.playCoin();
    updateSave(prev => ({
      ...prev,
      currency: prev.currency - item.price,
      ownedFurniture: [...prev.ownedFurniture, itemId],
      achievements: {
        ...prev.achievements,
        ach_room_designer: { unlocked: true, unlockedAt: getTodayDateString(), claimed: prev.achievements['ach_room_designer']?.claimed || false }
      }
    }));

    addToast(`成功解锁家具【${item.name}】！`, undefined, 10, '🏡');
    return true;
  }, [saveData.ownedFurniture, saveData.currency, updateSave, addToast]);

  const updateRoomConfig = useCallback((category: keyof GameSaveData['roomConfig'], itemId: string) => {
    sound.playPop();
    updateSave(prev => ({
      ...prev,
      roomConfig: {
        ...prev.roomConfig,
        [category]: itemId
      },
      achievements: {
        ...prev.achievements,
        ach_room_designer: { unlocked: true, unlockedAt: getTodayDateString(), claimed: prev.achievements['ach_room_designer']?.claimed || false }
      }
    }));
  }, [updateSave]);

  // Claim Daily Task
  const claimDailyTaskReward = useCallback((taskId: string) => {
    const taskState = saveData.dailyTasksStatus[taskId];
    if (!taskState || !taskState.completed || taskState.claimed) return;

    sound.playCoin();
    const taskDef = {
      task_pet_yier: { coins: 10, affection: 15 },
      task_pet_bubu: { coins: 10, affection: 15 },
      task_hug: { coins: 15, affection: 20 },
      task_play_game: { coins: 20, affection: 25 },
      task_check_album: { coins: 10, affection: 10 }
    }[taskId] || { coins: 10, affection: 10 };

    updateSave(prev => ({
      ...prev,
      currency: prev.currency + taskDef.coins,
      affection: prev.affection + taskDef.affection,
      dailyTasksStatus: {
        ...prev.dailyTasksStatus,
        [taskId]: {
          ...prev.dailyTasksStatus[taskId],
          claimed: true
        }
      }
    }));

    addToast(`每日任务奖励领取成功！+${taskDef.coins} 币 / +${taskDef.affection} 亲密`, taskDef.coins, taskDef.affection, '🎁');
  }, [saveData.dailyTasksStatus, updateSave, addToast]);

  // Claim Achievement
  const claimAchievementReward = useCallback((achId: string) => {
    const achStatus = saveData.achievements[achId];
    if (!achStatus || !achStatus.unlocked || achStatus.claimed) return;

    const achDef = INITIAL_ACHIEVEMENTS.find(a => a.id === achId);
    if (!achDef) return;

    sound.playCoin();
    updateSave(prev => ({
      ...prev,
      currency: prev.currency + achDef.rewardCoins,
      affection: prev.affection + achDef.rewardAffection,
      achievements: {
        ...prev.achievements,
        [achId]: {
          ...prev.achievements[achId],
          claimed: true
        }
      }
    }));

    addToast(`获得成就【${achDef.title}】奖励！+${achDef.rewardCoins} 币`, achDef.rewardCoins, achDef.rewardAffection, '🏆');
  }, [saveData.achievements, updateSave, addToast]);

  // Add Commemorative Album Card
  const addAlbumCard = useCallback((card: Omit<AlbumCard, 'id' | 'date'>) => {
    sound.playShutter();
    const id = `album_${Date.now()}`;
    const newCard: AlbumCard = {
      id,
      date: getTodayDateString(),
      ...card
    };

    updateSave(prev => {
      const updatedAlbum = [newCard, ...prev.album];
      const has5Photos = updatedAlbum.length >= 5;
      return {
        ...prev,
        album: updatedAlbum,
        achievements: {
          ...prev.achievements,
          ach_photo_collector: {
            unlocked: has5Photos || prev.achievements['ach_photo_collector']?.unlocked || false,
            unlockedAt: has5Photos ? getTodayDateString() : prev.achievements['ach_photo_collector']?.unlockedAt,
            claimed: prev.achievements['ach_photo_collector']?.claimed || false
          }
        }
      };
    });

    addToast(`已记录新纪念相片【${card.title}】！`, undefined, 15, '📷');
  }, [updateSave, addToast]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    updateSave(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  }, [updateSave]);

  const resetGame = useCallback(() => {
    clearGameSave();
    const fresh = loadGameSave();
    setSaveData(fresh);
    setPage('start');
    addToast('游戏数据已重置为初始状态', undefined, undefined, '🔄');
  }, [addToast]);

  const exportGame = useCallback(() => {
    exportSaveToFile(saveData);
    addToast('游戏存档已成功导出为备份文件', undefined, undefined, '💾');
  }, [saveData, addToast]);

  const importGame = useCallback(async (file: File): Promise<boolean> => {
    try {
      const imported = await importSaveFromFile(file);
      setSaveData(imported);
      addToast('游戏存档成功恢复！', undefined, undefined, '✨');
      return true;
    } catch (err) {
      console.error(err);
      addToast('存档文件格式有误，无法导入', undefined, undefined, '❌');
      return false;
    }
  }, [addToast]);

  return (
    <GameContext.Provider
      value={{
        saveData,
        page,
        setPage,
        affectionLevel,
        affectionLevelName,
        affectionProgressPercent,
        rewardToasts,
        dismissToast,
        addToast,
        addCurrency,
        spendCurrency,
        addAffection,
        interactWithCharacter,
        performHug,
        sendGift,
        buyOutfit,
        equipOutfit,
        equipCoupleSet,
        buyFurniture,
        updateRoomConfig,
        claimDailyTaskReward,
        recordTaskProgress,
        claimAchievementReward,
        addAlbumCard,
        updateSettings,
        resetGame,
        exportGame,
        importGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
